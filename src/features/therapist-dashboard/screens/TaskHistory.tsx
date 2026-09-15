import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Animated,
    Modal,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    Clock,
    TrendingUp,
    MoreVertical,
    History,
    FileText,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

// ─── Sub-components ──────────────────────────────────────────────────────────
import { TaskDayStrip } from '../components/TaskDayStrip';
import { TaskTimelineItem } from '../components/TaskTimelineItem';
import { TaskPeriodDropdown } from '../components/TaskPeriodDropdown';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskStatus = 'completed' | 'pending' | 'in_progress' | 'missed';

export interface TaskHistoryItem {
    id: string;
    date: string;
    time: string;
    title: string;
    subtitle: string;
    description: string;
    status: TaskStatus;
    totalTasks: number;
    completedTasks: number;
}

export interface DayProgress {
    day: string;
    label: string;
    completed: number;
    total: number;
    isToday?: boolean;
    isHighlighted?: boolean;
    isWeekend?: boolean;
    isSunday?: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const WEEK_DATA: DayProgress[] = [
    { day: 'Mon', label: 'Mon', completed: 8, total: 8 },
    { day: 'Tue', label: 'Tue', completed: 8, total: 8 },
    { day: 'Wed', label: 'Wed', completed: 8, total: 8 },
    { day: 'Thu', label: 'Thu', completed: 8, total: 8, isToday: true, isHighlighted: true },
    { day: 'Fri', label: 'Fri', completed: 8, total: 8 },
    { day: 'Sat', label: 'Sat', completed: 8, total: 8, isWeekend: true },
    { day: 'Sun', label: 'Sun', completed: 8, total: 8, isSunday: true },
];

const TASK_HISTORY: TaskHistoryItem[] = [
    {
        id: '1',
        date: 'May 12, 2026',
        time: '10:30 AM',
        title: '8/8 Task Done',
        subtitle: 'Meditate for 15 minutes',
        description: 'Felt more relaxed and focused after meditation.',
        status: 'completed',
        completedTasks: 8,
        totalTasks: 8,
    },
    {
        id: '2',
        date: 'May 11, 2026',
        time: '09:15 PM',
        title: '7/8 Task Pending',
        subtitle: 'Write 10 positive things',
        description: 'Will do it before going to bed.',
        status: 'pending',
        completedTasks: 7,
        totalTasks: 8,
    },
    {
        id: '3',
        date: 'May 10, 2026',
        time: '08:45 PM',
        title: '7/8 Task In Progress',
        subtitle: 'Upload gratitude photo',
        description: 'Need to capture and upload today.',
        status: 'in_progress',
        completedTasks: 7,
        totalTasks: 8,
    },
    {
        id: '4',
        date: 'May 9, 2026',
        time: '11:59 PM',
        title: '7/8 Task Missed',
        subtitle: 'Describe repeated thoughts',
        description: "Couldn't complete due to busy schedule.",
        status: 'missed',
        completedTasks: 7,
        totalTasks: 8,
    },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export const TaskHistory: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [selectedPeriod, setSelectedPeriod] = useState('This week');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Loader button animation
    const loaderScale = useRef(new Animated.Value(1)).current;

    const handleViewAllMoodHistory = useCallback(() => {
        if (isLoadingMore) return;
        setIsLoadingMore(true);

        Animated.sequence([
            Animated.timing(loaderScale, { toValue: 0.96, duration: 100, useNativeDriver: true }),
            Animated.timing(loaderScale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();

        setTimeout(() => {
            setIsLoadingMore(false);
        }, 5000);
    }, [isLoadingMore, loaderScale]);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: "#FFFFFF" }]}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

            {/* Top Safe Area */}
            <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

            {/* Header */}
            <LinearGradient
                colors={[
                    colors.lightTints.blueLightTint[50],
                    colors.lightTints.blueLightTint[100],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => [
                        styles.backBtn,
                        pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50] },
                    ]}
                >
                    <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
                </Pressable>
                <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
                    Task History
                </AppText>
                <View style={styles.headerSpacer} />
            </LinearGradient>

            {/* Content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Patient Info + Period Picker Row */}
                <View style={styles.infoRow}>
                    <View style={styles.patientInfo}>
                        <View style={styles.patientIconWrapper}>
                            <FileText size={normalize(18)} color={colors.blue[700]} />
                        </View>
                        <View>
                            <AppText variant="caption" family="secondary" weight="regular" style={styles.patientLabel}>
                                Task Journey of
                            </AppText>
                            <AppText variant="body" family="secondary" weight="bold" style={styles.patientName}>
                                Prathmesh Deokar
                            </AppText>
                        </View>
                    </View>

                    {/* Period Dropdown */}
                    <TaskPeriodDropdown
                        selected={selectedPeriod}
                        visible={dropdownVisible}
                        onToggle={() => setDropdownVisible(v => !v)}
                        onSelect={(p) => {
                            setSelectedPeriod(p);
                            setDropdownVisible(false);
                        }}
                    />
                </View>

                {/* Overall Progress Label */}
                <AppText variant="caption" family="secondary" weight="medium" style={styles.overallLabel}>
                    Overall Task Completes in percentage last week
                </AppText>

                {/* Progress Bar */}
                <View style={styles.progressBarWrapper}>
                    <View style={styles.barTrack}>
                        <LinearGradient
                            colors={[colors.typographyColor['Color 2'], colors.blue[600]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.barFill, { width: `80%` }]}
                        />
                    </View>

                </View>

                {/* Day Strip */}
                <TaskDayStrip days={WEEK_DATA} />

                {/* Last Task Alert */}
                <View style={styles.alertRow}>
                    <TrendingUp size={normalize(19)} color={colors.blue[400]} />
                    <AppText variant="caption" family="secondary" weight="regular" style={styles.alertText}>
                        Last task was not done on 26/06/2026
                    </AppText>
                </View>

                {/* Timeline */}
                <View style={styles.timeline}>
                    {TASK_HISTORY.map((item, idx) => (
                        <TaskTimelineItem
                            key={item.id}
                            item={item}
                            isLast={idx === TASK_HISTORY.length - 1}
                        />
                    ))}
                </View>

                {/* View All Mood History — sticky bottom */}
                <Animated.View style={[styles.bottomBar, { transform: [{ scale: loaderScale }] }]}>
                    <TouchableOpacity
                        style={styles.viewAllBtn}
                        onPress={handleViewAllMoodHistory}
                        activeOpacity={0.8}
                    >
                        {isLoadingMore ? (
                            <>
                                <ActivityIndicator
                                    size="small"
                                    color={colors.blue[600]}
                                    style={styles.loaderIcon}
                                />
                                <AppText variant="body" family="secondary" weight="semiBold" style={styles.viewAllText}>
                                    Loading...
                                </AppText>
                            </>
                        ) : (
                            <>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: normalize(8), justifyContent: 'space-between', width: '100%', paddingHorizontal: normalize(20) }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: normalize(8) }}>
                                        <Clock size={normalize(17)} color={colors.blue[600]} />
                                        <AppText variant="body" family="secondary" weight="medium" style={styles.viewAllText}>
                                            View All Mood History
                                        </AppText>
                                    </View>
                                    <ChevronDown size={normalize(16)} color={colors.typographyColor.Light} />
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>


        </SafeAreaView>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    headerSpacer: {
        width: normalize(36),
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: normalize(25),
        paddingTop: normalize(30),
        paddingBottom: normalize(100),
    },

    // Patient Info Row
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(18),
    },
    patientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    patientIconWrapper: {
        width: normalize(42),
        height: normalize(42),
        borderRadius: normalize(99),
        backgroundColor: colors.blue[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientLabel: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11),
    },
    patientName: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(14),
    },

    // Progress
    overallLabel: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginBottom: normalize(8),
    },
    progressBarWrapper: {
        marginBottom: normalize(18),
    },
    barTrack: {
        height: normalize(8),
        backgroundColor: colors.appThemeColor[75],
        borderRadius: normalize(99),
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: normalize(99),
    },

    // Alert
    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        backgroundColor: colors.tintsGrey[50],
        borderRadius: normalize(10),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(10),
        marginBottom: normalize(24),
        alignSelf: 'stretch',
        marginHorizontal: normalize(15)
    },
    alertText: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11.5),
        flex: 1,
    },

    // Timeline
    timeline: {
        paddingLeft: normalize(4),
    },

    // Bottom bar
    bottomBar: {

    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(8),
        backgroundColor: colors.tintsGrey[50],
        borderRadius: normalize(12),
        paddingVertical: normalize(16),
    },
    loaderIcon: {
        marginRight: normalize(2),
    },
    viewAllText: {
        color: colors.blue[600],
        fontSize: normalize(14),
    },
});
