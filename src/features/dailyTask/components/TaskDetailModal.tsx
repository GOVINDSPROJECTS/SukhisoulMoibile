import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import {
  X,
  Check,
  Clock,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  UserCheck,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TaskItemData } from '../api/dailyTaskService';

interface TaskDetailModalProps {
  visible: boolean;
  task: TaskItemData | null;
  onClose: () => void;
  onToggle: (taskId: string) => void;
}

const CATEGORY_META: Record<string, { label: string; icon: string; bg: string; text: string }> = {
  psychologist: {
    label: 'Psychologist Homework',
    icon: '🧘',
    bg: '#EFF6FF',
    text: '#1D4ED8',
  },
  health: {
    label: 'Health & Wellness',
    icon: '🏃',
    bg: '#F0FDF4',
    text: '#15803D',
  },
  dailyTasks: {
    label: 'Daily Routine',
    icon: '🎯',
    bg: '#FAF5FF',
    text: '#7E22CE',
  },
};

const DIFFICULTY_COLORS: Record<string, { text: string; bg: string }> = {
  EASY: { text: '#16A34A', bg: '#DCFCE7' },
  MEDIUM: { text: '#D97706', bg: '#FEF3C7' },
  HARD: { text: '#DC2626', bg: '#FEE2E2' },
};

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  task,
  onClose,
  onToggle,
}) => {
  if (!task) return null;

  const catMeta = CATEGORY_META[task.category] || CATEGORY_META.dailyTasks;
  const diffMeta = DIFFICULTY_COLORS[task.difficulty] || DIFFICULTY_COLORS.EASY;

  const handleToggleAndClose = () => {
    onToggle(task.id);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.sheetContainer}>
              {/* Grab handle */}
              <View style={styles.handleBar} />

              {/* Header */}
              <View style={styles.header}>
                <View style={[styles.catBadge, { backgroundColor: catMeta.bg }]}>
                  <AppText style={styles.catEmoji}>{catMeta.icon}</AppText>
                  <AppText
                    variant="caption"
                    weight="bold"
                    style={[styles.catText, { color: catMeta.text }]}
                  >
                    {catMeta.label}
                  </AppText>
                </View>

                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeBtn}
                  activeOpacity={0.7}
                >
                  <X size={normalize(18)} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollBody}
              >
                {/* Title */}
                <AppText
                  variant="h3"
                  weight="extraBold"
                  color="#1E293B"
                  style={styles.taskTitle}
                >
                  {task.title}
                </AppText>

                {/* Points & Status Banner */}
                <LinearGradient
                  colors={
                    task.completed
                      ? ['#DCFCE7', '#F0FDF4']
                      : ['#FEF3C7', '#FFFBEB']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.pointsBanner}
                >
                  <View style={styles.pointsLeft}>
                    <View
                      style={[
                        styles.coinCircle,
                        { backgroundColor: task.completed ? '#16A34A' : '#F59E0B' },
                      ]}
                    >
                      {task.completed ? (
                        <Check size={normalize(16)} color="#FFFFFF" strokeWidth={normalize(3)} />
                      ) : (
                        <Sparkles size={normalize(16)} color="#FFFFFF" />
                      )}
                    </View>
                    <View>
                      <AppText
                        variant="caption"
                        weight="bold"
                        color={task.completed ? '#166534' : '#92400E'}
                      >
                        {task.completed ? 'COMPLETED TASK' : 'REWARD AVAILABLE'}
                      </AppText>
                      <AppText
                        variant="h4"
                        weight="extraBold"
                        color={task.completed ? '#15803D' : '#D97706'}
                      >
                        +{task.points} Sukhi Points
                      </AppText>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor: task.completed
                          ? '#BBF7D0'
                          : '#FDE68A',
                      },
                    ]}
                  >
                    <AppText
                      variant="caption"
                      weight="extraBold"
                      color={task.completed ? '#166534' : '#78350F'}
                      style={{ fontSize: normalize(10) }}
                    >
                      {task.completed ? 'Done' : 'Pending'}
                    </AppText>
                  </View>
                </LinearGradient>

                {/* Metadata Grid */}
                <View style={styles.metaGrid}>
                  {/* Difficulty */}
                  <View style={styles.metaCard}>
                    <View style={styles.metaIconWrap}>
                      <Award size={normalize(14)} color={diffMeta.text} />
                    </View>
                    <AppText variant="caption" weight="medium" color="#64748B">
                      Difficulty
                    </AppText>
                    <AppText
                      variant="caption"
                      weight="bold"
                      color={diffMeta.text}
                      style={{ marginTop: normalize(2) }}
                    >
                      {task.difficulty}
                    </AppText>
                  </View>

                  {/* Duration */}
                  <View style={styles.metaCard}>
                    <View style={styles.metaIconWrap}>
                      <Clock size={normalize(14)} color="#2563EB" />
                    </View>
                    <AppText variant="caption" weight="medium" color="#64748B">
                      Est. Time
                    </AppText>
                    <AppText
                      variant="caption"
                      weight="bold"
                      color="#1E293B"
                      style={{ marginTop: normalize(2) }}
                    >
                      {task.duration || '10 mins'}
                    </AppText>
                  </View>

                  {/* Due Date */}
                  <View style={styles.metaCard}>
                    <View style={styles.metaIconWrap}>
                      <Calendar size={normalize(14)} color="#7C3AED" />
                    </View>
                    <AppText variant="caption" weight="medium" color="#64748B">
                      Due Date
                    </AppText>
                    <AppText
                      variant="caption"
                      weight="bold"
                      color="#1E293B"
                      style={{ marginTop: normalize(2) }}
                    >
                      {task.due_date ? task.due_date : 'Today'}
                    </AppText>
                  </View>
                </View>

                {/* Assigned By (if psychologist) */}
                {task.category === 'psychologist' && (
                  <View style={styles.therapistCard}>
                    <View style={styles.therapistAvatar}>
                      <UserCheck size={normalize(18)} color="#1D4ED8" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <AppText variant="caption" weight="bold" color="#1E40AF">
                        Assigned by Dr. Sameer Joshi
                      </AppText>
                      <AppText variant="caption" weight="regular" color="#3B82F6" style={{ fontSize: normalize(10.5) }}>
                        Senior Clinical Psychologist • Verified Care Plan
                      </AppText>
                    </View>
                  </View>
                )}

                {/* Instructions / Description */}
                <View style={styles.section}>
                  <View style={styles.sectionTitleRow}>
                    <BookOpen size={normalize(14)} color="#475569" />
                    <AppText variant="caption" weight="bold" color="#475569" style={styles.sectionTitle}>
                      {task.category === 'psychologist' ? 'Clinical Instructions' : 'Task Details'}
                    </AppText>
                  </View>
                  <View style={styles.descBox}>
                    <AppText
                      variant="body"
                      weight="regular"
                      color="#334155"
                      style={styles.descText}
                    >
                      {task.description && task.description.trim().length > 0
                        ? task.description
                        : 'Practice this daily wellness habit consistently to enhance mindfulness, reduce anxiety, and build emotional resilience.'}
                    </AppText>
                  </View>
                </View>

                {/* Pro Tip */}
                <View style={styles.tipBox}>
                  <Sparkles size={normalize(14)} color="#F59E0B" style={{ marginTop: normalize(2) }} />
                  <AppText variant="caption" weight="medium" color="#78350F" style={styles.tipText}>
                    Complete this activity today to maintain your {task.points} pts streak and boost your weekly mental health score!
                  </AppText>
                </View>
              </ScrollView>

              {/* Action Button */}
              <View style={styles.footer}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleToggleAndClose}
                  style={[
                    styles.actionBtn,
                    task.completed ? styles.actionBtnCompleted : styles.actionBtnPending,
                  ]}
                >
                  <View style={styles.btnContent}>
                    {task.completed ? (
                      <>
                        <Check size={normalize(18)} color="#FFFFFF" strokeWidth={normalize(3)} />
                        <AppText variant="body" weight="bold" color="#FFFFFF">
                          Completed • Tap to Mark Incomplete
                        </AppText>
                      </>
                    ) : (
                      <>
                        <Sparkles size={normalize(18)} color="#FFFFFF" />
                        <AppText variant="body" weight="bold" color="#FFFFFF">
                          Mark as Completed (+{task.points} pts)
                        </AppText>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(28),
    borderTopRightRadius: normalize(28),
    maxHeight: '85%',
    paddingBottom: normalize(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  handleBar: {
    width: normalize(44),
    height: normalize(5),
    borderRadius: normalize(3),
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginTop: normalize(12),
    marginBottom: normalize(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  catBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(5),
    borderRadius: normalize(20),
    gap: normalize(6),
  },
  catEmoji: {
    fontSize: normalize(12),
  },
  catText: {
    fontSize: normalize(11),
  },
  closeBtn: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(16),
  },
  taskTitle: {
    fontSize: normalize(20),
    lineHeight: normalize(26),
    marginTop: normalize(6),
    marginBottom: normalize(14),
  },
  pointsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: normalize(18),
    padding: normalize(14),
    marginBottom: normalize(16),
  },
  pointsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  coinCircle: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(12),
  },
  metaGrid: {
    flexDirection: 'row',
    gap: normalize(10),
    marginBottom: normalize(16),
  },
  metaCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(14),
    padding: normalize(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  metaIconWrap: {
    marginBottom: normalize(4),
  },
  therapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: normalize(16),
    padding: normalize(12),
    gap: normalize(10),
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  therapistAvatar: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: normalize(14),
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginBottom: normalize(6),
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: normalize(10.5),
  },
  descBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(14),
    padding: normalize(14),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  descText: {
    fontSize: normalize(13),
    lineHeight: normalize(19),
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: normalize(14),
    padding: normalize(12),
    gap: normalize(8),
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: normalize(10),
  },
  tipText: {
    flex: 1,
    fontSize: normalize(11),
    lineHeight: normalize(15),
  },
  footer: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
  },
  actionBtn: {
    borderRadius: normalize(16),
    paddingVertical: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnPending: {
    backgroundColor: '#1E5AF0',
  },
  actionBtnCompleted: {
    backgroundColor: '#16A34A',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
});
