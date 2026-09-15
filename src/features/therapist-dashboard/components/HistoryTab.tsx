import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, XCircle, Play, Download, Lightbulb, Check, X, Clock, Calendar } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

// ─── Session History Item ─────────────────────────────────────────────────────

interface SessionHistoryItem {
    id: string;
    sessionNumber: number;
    date: string;
    time?: string;
    topic: string;
    status: 'upcoming' | 'completed' | 'missed' | 'approval_pending' | string;
    raw_status?: string;
}

const HistoryItem: React.FC<{ item: SessionHistoryItem }> = ({ item }) => {
    const { borderRadius } = useTheme();
    const status = item.status || 'completed';

    const getStatusConfig = () => {
        switch (status) {
            case 'upcoming':
                return {
                    label: 'Upcoming',
                    color: '#0066CC',
                    bgColor: '#EBF4FF',
                    iconBg: '#0066CC',
                    icon: <Clock size={normalize(13)} color={colors.typographyColor.White} strokeWidth={2.5} />
                };
            case 'approval_pending':
                return {
                    label: 'Pending',
                    color: '#D97706',
                    bgColor: '#FEF3C7',
                    iconBg: '#F59E0B',
                    icon: <Clock size={normalize(13)} color={colors.typographyColor.White} strokeWidth={2.5} />
                };
            case 'missed':
                return {
                    label: 'Missed',
                    color: colors.typographyColor.Medium,
                    bgColor: colors.lightTints.redLightTint2[50],
                    iconBg: colors.colorPalet['Color 5'],
                    icon: <X size={normalize(13)} color={colors.typographyColor.White} strokeWidth={3} />
                };
            case 'completed':
            default:
                return {
                    label: 'Completed',
                    color: colors.typographyColor['Color 2'],
                    bgColor: 'rgba(191,237,209,0.3)',
                    iconBg: colors.green[500],
                    icon: <Check size={normalize(13)} color={colors.typographyColor.White} strokeWidth={3} />
                };
        }
    };

    const config = getStatusConfig();

    return (
        <View style={[styles.historyItem, { borderRadius: borderRadius.l }]}>
            <View style={[styles.checkIcon, { backgroundColor: config.bgColor }]}>
                <View style={{ backgroundColor: config.iconBg, borderRadius: normalize(99), padding: normalize(4) }}>
                    {config.icon}
                </View>
            </View>
            <View style={styles.historyInfo}>
                <AppText variant="body" weight="bold" style={styles.historySessionLabel}>
                    Session {item.sessionNumber} • {item.date}{item.time ? ` at ${item.time}` : ''}
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.historyTopic}>
                    {item.topic}
                </AppText>
            </View>
            <AppText
                variant="caption"
                weight="semiBold"
                style={[
                    styles.historyStatus,
                    { color: config.color },
                ]}
            >
                {config.label}
            </AppText>
        </View>
    );
};

// ─── History Tab ─────────────────────────────────────────────────────────────

export const HistoryTab: React.FC = () => {
    const { borderRadius } = useTheme();
    const { data: dashboardData } = useTherapistDashboard();

    const historyItems: SessionHistoryItem[] = dashboardData?.recentSessions && dashboardData.recentSessions.length > 0
        ? dashboardData.recentSessions
        : (dashboardData?.nextSession ? [{
            id: String(dashboardData.nextSession.id || '1'),
            sessionNumber: 1,
            date: dashboardData.nextSession.dateFormatted || 'Scheduled',
            topic: dashboardData.progress?.planName || '1:1 Video Session',
            status: 'completed',
        }] : []);

    return (
        <View style={styles.container}>
            {/* Progress Header */}
            <View style={styles.progressHeader}>
                <AppText variant="h4" weight="extraBold" style={styles.progressTitle}>
                    YOUR PROGRESS
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.progressSubtitle}>
                    Session History & Personal Replays
                </AppText>
            </View>

            {/* Session History */}
            <View style={[styles.sectionCard]}>
                <AppText variant="h4" weight="extraBold" style={styles.sectionTitle}>
                    Session History
                </AppText>
                <View style={styles.historyList}>
                    {historyItems.length === 0 ? (
                        <View style={{ paddingVertical: normalize(20), alignItems: 'center' }}>
                            <AppText variant="caption" style={{ color: colors.typographyColor.Medium }}>
                                No session history recorded yet.
                            </AppText>
                        </View>
                    ) : (
                        historyItems.map((item, idx) => (
                            <React.Fragment key={item.id}>
                                <HistoryItem item={item} />
                                {idx < historyItems.length - 1 && <View style={styles.separator} />}
                            </React.Fragment>
                        ))
                    )}
                </View>
            </View>

            {/* Session Recording */}
            <View style={[styles.sectionCard]}>
                <AppText variant="h4" weight="extraBold" style={styles.sectionTitle}>
                    Session Recording
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.sectionSubtitle}>
                    Replay approved session audio and notes.
                </AppText>

                <View style={[styles.recordingRow, { borderRadius: normalize(6) }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.blue[700], colors.lightTints.blueLightTint[200]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0.5 }}
                            style={[styles.playBtn, { borderRadius: normalize(99) }]}
                        >
                            <Play size={normalize(20)} color="#fff" fill="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.recordingInfo}>
                        <AppText variant="body" family='secondary' weight="semiBold" style={styles.recordingTitle}>
                            Session 4 Recording
                        </AppText>
                        <AppText variant="caption" family='secondary' weight="regular" style={styles.recordingMeta}>
                            32:40 min • Private
                        </AppText>
                    </View>
                    <TouchableOpacity activeOpacity={0.75}>
                        <Download size={normalize(20)} color={colors.typographyColor.Medium} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Wellness Insight */}
            <View style={[styles.insightCard, { borderRadius: normalize(32) }]}>
                <View style={[styles.insightIconWrapper, { borderRadius: normalize(99) }]}>
                    <Lightbulb size={normalize(22)} color={'#3E6752'} />
                </View>
                <View style={styles.insightTextBlock}>
                    <AppText variant="body" weight="extraBold" style={styles.insightTitle}>
                        Wellness Insight
                    </AppText>
                    <AppText variant="caption" weight="regular" style={styles.insightText}>
                        Reviewing your anxiety trigger session (May 15) can help reinforce the calming techniques we discussed.
                    </AppText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        gap: normalize(30),
        backgroundColor: "#ffffff"
    },
    progressHeader: {
        marginTop: normalize(20),
        marginBottom: normalize(4),
    },
    progressTitle: {
        color: colors.appThemeColor[950],
        fontSize: normalize(18),
        letterSpacing: 0.5,
    },
    progressSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },

    // Section Card
    sectionCard: {
        boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.06)',
        borderBottomEndRadius: normalize(32),
        borderBottomStartRadius: normalize(32),
        padding: normalize(15),
    },
    sectionTitle: {
        color: colors.appThemeColor[950],
        fontSize: normalize(16),
        marginBottom: normalize(0),
    },
    sectionSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginBottom: normalize(12),
    },

    // History List
    historyList: {
        gap: 0,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        paddingVertical: normalize(15),
    },
    historyInfo: {
        flex: 1,
    },
    historySessionLabel: {
        color: colors.typographyColor.Black,
        fontSize: normalize(13),
    },
    historyTopic: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(-1),
    },
    historyStatus: {
        fontSize: normalize(11),
    },
    separator: {
        // height: 1,
        // backgroundColor: colors.appThemeColor[50],
    },

    checkIcon: {
        borderRadius: 99, height: normalize(48), width: normalize(48), justifyContent: 'center', alignItems: 'center'
    },

    // Recording Row
    recordingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        backgroundColor: "#F1F4F2",
        padding: normalize(20),
    },
    playBtn: {
        width: normalize(44),
        height: normalize(44),
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingInfo: {
        flex: 1,
    },
    recordingTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(13),
    },
    recordingMeta: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },

    // Insight Card
    insightCard: {
        backgroundColor: colors.green[100],
        padding: normalize(20),
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: normalize(14),
        borderWidth: 1,
        borderColor: colors.green[100],
        marginBottom: normalize(20)
    },
    insightIconWrapper: {
        width: normalize(22),
        height: normalize(42),
        justifyContent: 'center',
        alignItems: 'center',
    },
    insightTextBlock: {
        flex: 1,
    },
    insightTitle: {
        color: "#315A45",
        fontSize: normalize(14),
        marginBottom: normalize(4),
    },
    insightText: {
        color: 'rgba(49,90,69,0.8)',
        fontSize: normalize(11),
        lineHeight: normalize(17),
    },
});
