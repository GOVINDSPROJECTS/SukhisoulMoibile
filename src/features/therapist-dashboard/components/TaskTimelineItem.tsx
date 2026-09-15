import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, AlertCircle, Pencil, CheckCircle, Clock1, Clock10, Ellipse, Menu, EllipsisVertical } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { TaskHistoryItem, TaskStatus } from '../screens/TaskHistory';

// ─── Status Config ────────────────────────────────────────────────────────────

interface StatusConfig {
    label: string;
    color: string;
    bgColor: string;
    iconColor: string;
    Icon: React.ComponentType<{ size: number; color: string; strokeWidth?: number }>;
    dotColor: string;
}

const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
    completed: {
        label: 'Completed',
        color: colors.colorPalet['Color 9'],
        bgColor: '#ffffff',
        iconColor: colors.colorPalet['Color 9'],
        Icon: Clock,
        dotColor: colors.typographyColor['Dark 2'],
    },
    pending: {
        label: 'Pending',
        color: '#D97706',
        bgColor: colors.yellow[100],
        iconColor: '#D97706',
        Icon: Clock,
        dotColor: colors.typographyColor['Dark 2'],
    },
    in_progress: {
        label: 'In Progress',
        color: colors.colorPalet.Color,
        bgColor: '#ffffff',
        iconColor: colors.colorPalet['Color 2'],
        Icon: Pencil,
        dotColor: colors.typographyColor['Dark 2'],
    },
    missed: {
        label: 'Missed',
        color: colors.colorPalet['Color 6'],
        bgColor: colors.lightTints.redLightTint[50],
        iconColor: colors.colorPalet['Color 6'],
        Icon: Clock,
        dotColor: colors.tintsGrey[300],
    },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskTimelineItemProps {
    item: TaskHistoryItem;
    isLast: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TaskTimelineItem: React.FC<TaskTimelineItemProps> = ({ item, isLast }) => {
    const config = STATUS_CONFIG[item.status];
    const { Icon } = config;

    return (
        <View style={styles.row}>
            {/* Timeline dot + line */}
            <View style={styles.timelineTrack}>
                <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
                <View style={styles.line} />
            </View>

            {/* Card */}
            <View style={styles.card}>
                <View style={[styles.taskIconWrapper, { backgroundColor: "#ffffff" }]}>
                    <Icon size={normalize(19)} color={config.iconColor} strokeWidth={2} />
                </View>
                <View style={{ marginLeft: normalize(12), flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Date / Time / Status / Menu */}
                    <View style={styles.cardHeader}>
                        <AppText variant="caption" family="secondary" weight="medium" style={styles.dateText}>
                            {item.date} • {item.time}
                        </AppText>
                        <View style={styles.headerRight}>
                            <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
                                <AppText
                                    variant="caption"
                                    family="secondary"
                                    weight="semiBold"
                                    style={[styles.statusText, { color: config.color }]}
                                >
                                    {config.label}
                                </AppText>
                            </View>
                            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ marginLeft: 'auto', cursor: 'pointer', marginRight: 0 }}>
                                <AppText style={styles.menuDots}>
                                    <EllipsisVertical size={normalize(18)} color={'#000000'} strokeWidth={2} />
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Title row */}
                    <View style={styles.titleRow}>
                        <AppText variant="body" family="secondary" weight="extraBold" style={styles.title}>
                            {item.title}
                        </AppText>
                    </View>

                    {/* Subtitle */}
                    <AppText variant="caption" family="secondary" weight="medium" style={styles.subtitle}>
                        {item.subtitle}
                    </AppText>

                    {/* Description */}
                    <AppText variant="caption" family="secondary" weight="regular" style={styles.description}>
                        {item.description}
                    </AppText>
                </View>
            </View>
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: normalize(4),
    },

    // Timeline
    timelineTrack: {
        width: normalize(20),
        alignItems: 'center',
        marginTop: normalize(6),
    },
    dot: {
        width: normalize(10),
        height: normalize(10),
        borderRadius: normalize(5),
        marginBottom: normalize(0),
    },
    line: {
        width: normalize(2),
        flex: 1,
        backgroundColor: colors.tintsGrey[100],
        marginTop: normalize(4),
        marginBottom: normalize(0),
        minHeight: normalize(30),
    },

    // Card
    card: {
        flex: 1,
        marginLeft: normalize(0),
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(16),
        padding: normalize(14),
        marginBottom: normalize(16),
        flexDirection: 'row',
        display: 'flex'
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(10),
    },
    dateText: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
    },
    statusBadge: {
        borderRadius: normalize(99),
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(3),
    },
    statusText: {
        fontSize: normalize(10),
    },
    menuDots: {
        fontSize: normalize(18),
        color: colors.typographyColor.Medium,
        lineHeight: normalize(20),
    },

    // Title
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
        marginBottom: normalize(4),
    },
    taskIconWrapper: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(8),
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    },
    title: {
        color: colors.typographyColor.Black,
        fontSize: normalize(14),
        flex: 1,
    },
    subtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginBottom: normalize(2),
    },
    description: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11),
        lineHeight: normalize(16),
    },
});
