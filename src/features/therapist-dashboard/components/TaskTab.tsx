import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CheckCircle2, Circle, Clock, Share2, ChevronRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Task {
    id: string;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
    iconColor: string;
    iconBg: string;
    iconImg: any;
    iconType: 'breathing' | 'journal' | 'reframe';
}

const TASKS: Task[] = [
    {
        id: '1',
        title: '5-Min Breathing Practice',
        description: 'Complete before sleeping tonight',
        duration: '5 MIN',
        completed: false,
        iconColor: '#FAF5FF',
        iconBg: '#FAF5FF',
        iconImg: require('../assets/task-icon-1.png'),
        iconType: 'breathing',
    },
    {
        id: '2',
        title: 'Mood Journal Entry',
        description: 'Write 3 feelings you noticed today',
        duration: '3 MIN',
        completed: false,
        iconColor: '#EFF6FF',
        iconBg: '#EFF6FF',
        iconImg: require('../assets/task-icon-2.png'),
        iconType: 'journal',
    },
    {
        id: '3',
        title: 'Thought Reframe Exercise',
        description: 'Replace one negative thought gently',
        duration: '7 MIN',
        completed: true,
        iconColor: '#FEF2F2',
        iconBg: '#FEF2F2',
        iconImg: require('../assets/task-icon-3.png'),
        iconType: 'reframe',
    },
];

// ─── Task Item ─────────────────────────────────────────────────────────────────

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
    const { borderRadius } = useTheme();
    return (
        <View style={[styles.taskItem, { borderRadius: normalize(28) }]}>
            <View style={[styles.taskIconWrapper, { backgroundColor: task.iconBg, borderRadius: borderRadius.l }]}>
                <Image
                    source={task.iconImg}
                    style={styles.taskIconImg}
                />
            </View>
            <View style={styles.taskInfo}>
                <AppText variant="body" family='secondary' weight="bold" style={styles.taskTitle}>
                    {task.title}
                </AppText>
                <AppText variant="caption" family='secondary' weight="regular" style={styles.taskDesc}>
                    {task.description}
                </AppText>
                <View style={styles.taskDurationRow}>
                    <Clock size={normalize(10)} strokeWidth={2.5} color={colors.blue[400]} />
                    <AppText variant="caption" family='secondary' weight="regular" style={styles.taskDuration}>
                        {task.duration}
                    </AppText>
                </View>
            </View>
            <TouchableOpacity onPress={() => onToggle(task.id)} activeOpacity={0.7}>
                {task.completed ? (
                    <CheckCircle2 size={normalize(29)} color={colors.appThemeColor[700]} fill={colors.blue[700]} stroke="#fff" />
                ) : (
                    <Circle size={normalize(24)} color={colors.blue[300]} />
                )}
            </TouchableOpacity>
        </View>
    );
};

// ─── Task Tab ─────────────────────────────────────────────────────────────────

export const TaskTab: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { borderRadius } = useTheme();
    const [tasks, setTasks] = useState<Task[]>(TASKS);

    const handleToggle = (id: string) => {
        setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskHistoryContainer}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <AppText variant="h3" family='secondary' weight="extraBold" style={styles.title}>
                            Therapist Tasks
                        </AppText>
                        <AppText variant="caption" family='secondary' weight="regular" style={styles.subtitle}>
                            Given by psychologist specially for you
                        </AppText>
                    </View>
                    <TouchableOpacity style={[styles.checkAllBtn, { borderRadius: borderRadius.full }]}>
                        <Image
                            source={require('../assets/checkmark.png')}
                            style={styles.checkAllIcon}
                            tintColor={colors.appThemeColor[700]}
                        />
                    </TouchableOpacity>
                </View>

                {/* Today Label */}
                <AppText variant="caption" family='secondary' weight="bold" style={styles.dayLabel}>
                    Today's Task
                </AppText>

                {/* Tasks */}
                <View style={styles.taskList}>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                    ))}
                </View>


            </View>

            {/* Task History */}
            <TouchableOpacity style={styles.historyRow} activeOpacity={0.75} onPress={() => navigation.navigate('TaskHistory')}>
                <AppText variant="body" family='secondary' weight="bold" style={styles.historyText}>
                    Task History
                </AppText>
                <ChevronRight size={normalize(18)} color={colors.appThemeColor[400]} />
            </TouchableOpacity>

            {/* Share CTA */}
            <View style={[styles.shareCard]}>
                <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                    <Share2 size={normalize(16)} color={colors.appThemeColor[700]} />
                    <AppText variant="body" family='secondary' weight="semiBold" style={styles.shareText}>
                        Share task details to psychologist
                    </AppText>
                </TouchableOpacity>
                <AppText variant="caption" family='secondary' weight="regular" style={styles.shareNote}>
                    Note - Your task will be directly shared to therapist to check your progress
                </AppText>
            </View>
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        backgroundColor: "#ffffff"
    },
    taskHistoryContainer: {
        backgroundColor: '#F5F7FF',
        borderTopEndRadius: normalize(32),
        borderTopLeftRadius: normalize(32),
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        marginHorizontal: normalize(-20),
        marginTop: normalize(15)
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: normalize(16),
    },
    title: {
        color: colors.appThemeColor[950],
    },
    subtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    checkAllBtn: {
        width: normalize(36),
        height: normalize(36),
        backgroundColor: colors.blue[100],
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkAllIcon: {
        width: normalize(17),
        height: normalize(20),
    },
    dayLabel: {
        color: "#1A1F36",
        marginBottom: normalize(10),
        fontSize: normalize(13)
    },
    taskList: {
        gap: normalize(10),
        marginBottom: normalize(16),
    },
    taskItem: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: normalize(12),
        gap: normalize(12),
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
    },
    taskIconWrapper: {
        width: normalize(40),
        height: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskIconImg: {
        width: normalize(22),
        height: normalize(22),
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        color: colors.appThemeColor[950],
        fontSize: normalize(13),
    },
    taskDesc: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    taskDurationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(3),
        marginTop: normalize(4),
    },
    taskDuration: {
        color: colors.blue[400],
        fontSize: normalize(10),
        marginLeft: normalize(2)
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: normalize(12),
        marginBottom: normalize(16),
        backgroundColor: '#F1F4F2',
        borderRadius: normalize(6),
        paddingLeft: normalize(18)
    },
    historyText: {
        color: '#375EA4',
        fontSize: normalize(13),
    },
    shareCard: {
        backgroundColor: '#F1F4F2',
        padding: normalize(14),
        alignItems: 'center',
        gap: normalize(8),
        borderRadius: normalize(6)
    },
    shareBtn: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: normalize(8),
    },
    shareText: {
        color: colors.appThemeColor[700],
        fontSize: normalize(13),
    },
    shareNote: {
        color: colors.colorPalet['Color 5'],
        fontSize: normalize(10),
        textAlign: 'center',
        lineHeight: normalize(15),
    },
});
