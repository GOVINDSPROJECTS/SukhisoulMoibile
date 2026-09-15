import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    ChevronUp,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { TherapistContactCard } from '../components/TherapistContactCard';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

// ─── Types ────────────────────────────────────────────────────────────────────

type WeekStatus = 'completed' | 'current' | 'upcoming';

interface Week {
    id: number;
    label: string;
    status: WeekStatus;
    goal?: string;
    tasks?: string[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const WEEKS: Week[] = [
    {
        id: 1,
        label: 'WEEK 1',
        status: 'completed',
        goal: 'Weekly Goal – Build a daily mindfulness habit',
        tasks: [
            'Spend 5 minutes on deep breathing each morning.',
            'Write down one thing you are grateful for.',
            'Avoid screen time 30 minutes before sleep.',
        ],
    },
    {
        id: 2,
        label: 'WEEK 2',
        status: 'completed',
        goal: 'Weekly Goal – Notice recurring thoughts and situations',
        tasks: [
            'Complete a thought journal.',
            'Identify one common trigger.',
            'Reflect at the end of the week.',
        ],
    },
    {
        id: 3,
        label: 'WEEK 3',
        status: 'current',
        goal: 'Weekly Goal – Reduce self – critical thoughts',
        tasks: [
            'Write one kind statement to yourself daily.',
            'Replace one negative thought with a balanced one.',
            'Celebrate one small win each evening.',
        ],
    },
    {
        id: 4,
        label: 'WEEK 4',
        status: 'upcoming',
        goal: 'Weekly Goal – Practice assertive communication',
        tasks: [
            'Express one need or boundary clearly this week.',
            'Role-play a difficult conversation in your journal.',
            'Note how it felt to speak up.',
        ],
    },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: WeekStatus }> = ({ status }) => {
    const config = {
        completed: { label: 'COMPLETED', color: colors.green[500], bg: colors.green[50] },
        current: { label: 'CURRENT', color: colors.typographyColor['Dark 2'], bg: colors.appThemeColor[100] },
        upcoming: { label: 'UPCOMING', color: colors.typographyColor.Medium, bg: colors.tintsGrey[50] },
    }[status];

    return (
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <AppText variant="caption" family="secondary" weight="medium" style={[styles.badgeText, { color: config.color }]}>
                {config.label}
            </AppText>
        </View>
    );
};

// ─── Week Row ─────────────────────────────────────────────────────────────────

const WeekRow: React.FC<{ week: Week; isExpanded: boolean; onToggle: () => void }> = ({
    week,
    isExpanded,
    onToggle,
}) => {
    const isCurrent = week.status === 'current';

    return (
        <View style={[styles.weekCard, isCurrent && styles.weekCardCurrent]}>
            <TouchableOpacity
                style={styles.weekHeader}
                onPress={onToggle}
                activeOpacity={0.8}
            >
                <View style={[styles.weekNumCircle, isCurrent && styles.weekNumCircleCurrent]}>
                    <AppText
                        variant="caption"
                        family="secondary"
                        weight="bold"
                        style={[styles.weekNum, isCurrent && styles.weekNumCurrent]}
                    >
                        {week.id}
                    </AppText>
                </View>

                <AppText
                    variant="body"
                    family="secondary"
                    weight={isCurrent ? 'extraBold' : 'bold'}
                    style={[styles.weekLabel, isCurrent && styles.weekLabelCurrent]}
                >
                    {week.label}
                </AppText>

                <StatusBadge status={week.status} />

                {isExpanded
                    ? <ChevronUp size={normalize(18)} color={isCurrent ? colors.typographyColor['Dark 2'] : colors.typographyColor.Medium} />
                    : <ChevronDown size={normalize(18)} color={isCurrent ? colors.blue[700] : colors.typographyColor.Medium} />
                }
            </TouchableOpacity>

            {/* Expanded body */}
            {isExpanded && week.goal && (
                <View style={styles.weekBody}>
                    <AppText variant="body" family="secondary" weight="semiBold" style={styles.goalTitle}>
                        {week.goal}
                    </AppText>
                    <View style={styles.taskList}>
                        {week.tasks?.map((task, idx) => (
                            <View key={idx} style={styles.taskRow}>
                                <View style={styles.bullet} />
                                <AppText variant="caption" family="secondary" weight="regular" style={styles.taskText}>
                                    {task}
                                </AppText>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export const WeeklyGoal: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([3])); // week 3 open by default
    const { data: dashboardData } = useTherapistDashboard();
    const therapist = dashboardData?.therapist;

    const toggleWeek = (id: number) => {
        setExpandedWeeks(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: '#ffffff' }]}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
            <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

            {/* Header */}
            <LinearGradient
                colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
                </TouchableOpacity>
                <AppText variant="h4" weight="bold" style={styles.headerTitle}>
                    Weekly Goals
                </AppText>
                <View style={styles.headerSpacer} />
            </LinearGradient>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Last Session Info Card */}
                <View style={styles.sessionCard}>
                    <View style={styles.sessionIconWrapper}>
                        <Calendar size={normalize(20)} color={colors.typographyColor['Dark 2']} />
                    </View>
                    <View style={styles.sessionInfo}>
                        <AppText variant="body" family="secondary" weight="semiBold" style={styles.sessionLabel}>
                            Your Last Session
                        </AppText>
                        <AppText variant="caption" family="secondary" weight="regular" style={styles.sessionDate}>
                            June 18, 2025 • 4:00 PM
                        </AppText>
                        <AppText variant="caption" family="secondary" weight="regular" style={styles.sessionDoctor}>
                            {`with ${therapist?.name ?? 'Dr. Sameer Joshi'}`}
                        </AppText>
                    </View>
                </View>

                {/* Week Counter Card */}
                <View style={styles.weekCounterCard}>
                    <View style={styles.daysBlock}>
                        <View style={styles.sessionIconWrapper2}>
                            <Calendar size={normalize(16)} color={colors.typographyColor['Dark 2']} />
                        </View>
                        <View>
                            <AppText variant="h2" family="secondary" weight="extraBold" style={styles.daysNumber}>
                                15 days
                            </AppText>
                            <AppText variant="caption" family="secondary" weight="regular" style={styles.daysLabel}>
                                since your last session
                            </AppText>
                        </View>
                    </View>
                    {/* <View style={styles.divider} /> */}
                    <View style={styles.weekBlock}>
                        <AppText variant="caption" family="secondary" weight="medium" style={styles.youAreIn}>
                            YOU ARE CURRENTLY IN
                        </AppText>
                        <AppText variant="h3" family="secondary" weight="extraBold" style={styles.weekCurrent}>
                            Week 3
                        </AppText>
                        <AppText variant="caption" family="secondary" weight="regular" style={styles.weekFlow}>
                            of your weekly flow
                        </AppText>
                    </View>
                </View>

                {/* Weekly Flow Title */}
                <View style={styles.sectionHeader}>
                    <AppText variant="h4" family="secondary" weight="extraBold" style={styles.sectionTitle}>
                        Your Weekly Flow
                    </AppText>
                    <AppText variant="caption" family="secondary" weight="light" style={styles.sectionSubtitle}>
                        Complete your daily tasks to stay on track
                    </AppText>
                </View>

                {/* Week List */}
                <View style={styles.weekList}>
                    {WEEKS.map((week) => (
                        <WeekRow
                            key={week.id}
                            week={week}
                            isExpanded={expandedWeeks.has(week.id)}
                            onToggle={() => toggleWeek(week.id)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(14),
    },
    backBtn: {
        width: normalize(36),
        height: normalize(36),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(17),
        color: colors.typographyColor['Color 2'],
    },
    headerSpacer: { width: normalize(36) },
    scroll: { flex: 1 },
    scrollContent: {
        paddingTop: normalize(20),
        paddingBottom: normalize(40),
        gap: normalize(0),
    },

    // Session Card
    sessionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(14),
        backgroundColor: '#FFFFFF',
        marginHorizontal: normalize(20),
        borderRadius: normalize(24),
        padding: normalize(20),
        marginBottom: normalize(30),
        borderWidth: 1,
        borderColor: colors.tintsGrey[50],
    },
    sessionIconWrapper: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(16),
        backgroundColor: colors.lightAppTheme[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    sessionInfo: { flex: 1 },
    sessionLabel: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
        letterSpacing: 0.3,
    },
    sessionDate: {
        color: colors.typographyColor.Light,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },
    sessionDoctor: {
        color: colors.typographyColor.Light,
        fontSize: normalize(12),
        marginTop: normalize(1),
    },

    // Week Counter
    weekCounterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: normalize(20),
        borderRadius: normalize(24),
        padding: normalize(20),
        marginBottom: normalize(30),
        gap: normalize(14),
        borderWidth: 1,
        borderColor: colors.tintsGrey[50],
    },
    sessionIconWrapper2: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(16),
        backgroundColor: colors.lightAppTheme[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    daysBlock: { display: 'flex', flexDirection: 'row', gap: normalize(10), width: '50%' },
    daysNumber: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(20),
    },
    daysLabel: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(9),
        marginTop: normalize(2),
    },
    divider: {
        width: 1,
        height: normalize(50),
        backgroundColor: colors.tintsGrey[50],

    },
    weekBlock: { paddingLeft: normalize(10), width: '50%' },
    youAreIn: {
        color: colors.typographyColor.Light,
        fontSize: normalize(9),
        letterSpacing: 0.6,
    },
    weekCurrent: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(18),
        marginTop: normalize(2),
    },
    weekFlow: {
        color: colors.typographyColor.Light,
        fontSize: normalize(9),
    },

    // Section header
    sectionHeader: {
        paddingHorizontal: normalize(20),
        marginBottom: normalize(14),
    },
    sectionTitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(16),
    },
    sectionSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(0),
    },

    // Week list
    weekList: {
        paddingHorizontal: normalize(20),
        gap: normalize(10),
        marginBottom: normalize(24),
    },
    weekCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(14),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.tintsGrey[50],
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
    },
    weekCardCurrent: {
        borderColor: colors.appThemeColor[200],
        backgroundColor: colors.appThemeColor[50],
    },
    weekHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(16),
    },
    weekNumCircle: {
        width: normalize(28),
        height: normalize(28),
        borderRadius: normalize(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekNumCircleCurrent: {
        backgroundColor: colors.typographyColor['Dark 2'],
    },
    weekNum: {
        fontSize: normalize(12),
        color: colors.typographyColor.Medium,
    },
    weekNumCurrent: {
        color: '#FFFFFF',
    },
    weekLabel: {
        flex: 1,
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
    },
    weekLabelCurrent: {
        color: colors.typographyColor['Dark 2'],
    },
    badge: {
        borderRadius: normalize(4),
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(3),
    },
    badgeText: {
        fontSize: normalize(9),
        letterSpacing: 0.4,
    },
    weekBody: {
        paddingHorizontal: normalize(16),
        paddingBottom: normalize(16),
    },
    goalTitle: {
        color: colors.blue[700],
        fontSize: normalize(13),
        marginTop: normalize(12),
        marginBottom: normalize(10),
    },
    taskList: {
        gap: normalize(6),
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: normalize(8),
    },
    bullet: {
        width: normalize(5),
        height: normalize(5),
        borderRadius: normalize(99),
        backgroundColor: colors.blue[500],
        marginTop: normalize(6),
    },
    taskText: {
        flex: 1,
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        lineHeight: normalize(18),
    },
});
