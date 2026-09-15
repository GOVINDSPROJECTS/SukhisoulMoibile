import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import {
  Minus,
  BookOpen,
  Lightbulb,
  Clock,
  Check,
  Plus,
  Sparkles,
  Sun
} from 'lucide-react-native';
import { AddMoreTaskModal } from './AddMoreTaskModal';
import { colors } from '@/theme';

export interface TaskItem {
  id: string;
  title: string;
  addedTitle?: string;
  description: string;
  duration: string;
  iconType: 'breathing' | 'journal' | 'thought' | 'custom';
  iconBg: string;
  iconColor: string;
  selected: boolean;
}

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    title: '5–Min Breathing Practice',
    description: 'Complete a short breathing exercise',
    duration: '5 Min',
    iconType: 'breathing',
    iconBg: '#FDF2F8',
    iconColor: '#EC4899',
    selected: false,
  },
  {
    id: '2',
    title: 'Mood Journal Entry',
    description: 'Write a brief journal about today',
    duration: '5 Min',
    iconType: 'journal',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    selected: true,
  },
  {
    id: '3',
    title: 'Drink Water',
    addedTitle: 'Thought Reframe Exercise',
    description: 'Identify and reframe 2 negative thoughts today',
    duration: '10 Min',
    iconType: 'thought',
    iconBg: '#FFF7ED',
    iconColor: '#F97316',
    selected: true,
  },
];

interface SuggestedTasksCardProps {
  tasks?: TaskItem[];
  onToggleTask?: (id: string) => void;
  onAddTask?: (task: TaskItem) => void;
}

export const SuggestedTasksCard: React.FC<SuggestedTasksCardProps> = ({
  tasks: controlledTasks,
  onToggleTask,
  onAddTask,
}) => {
  const [internalTasks, setInternalTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [modalVisible, setModalVisible] = useState(false);

  const tasks = controlledTasks ?? internalTasks;

  const handleToggle = (id: string) => {
    if (onToggleTask) {
      onToggleTask(id);
    } else {
      setInternalTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
      );
    }
  };

  const handleCreateTaskFromModal = ({ title, description }: { title: string; description: string }) => {
    const durationMatch = title.match(/(\d+\s*(?:min|mins|minutes|hr|hours))/i);
    const duration = durationMatch ? durationMatch[1] : '10 Min';

    const newTask: TaskItem = {
      id: Date.now().toString(),
      title,
      description,
      duration,
      iconType: 'custom',
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      selected: true,
    };

    if (onAddTask) {
      onAddTask(newTask);
    } else {
      setInternalTasks((prev) => [...prev, newTask]);
    }
  };

  const renderIcon = (type: TaskItem['iconType'], color: string) => {
    switch (type) {
      case 'breathing':
        return <Sun size={normalize(22)} color={color} />;
      case 'journal':
        return <BookOpen size={normalize(22)} color={color} />;
      case 'thought':
        return <Lightbulb size={normalize(22)} color={color} />;
      case 'custom':
      default:
        return <Sparkles size={normalize(22)} color={color} />;
    }
  };

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Minus size={normalize(22)} color="#FFFFFF" strokeWidth={3} />
        </View>
        <View style={styles.headerTextCol}>
          <AppText family="secondary" weight="semiBold" style={styles.title}>
            Suggested Tasks
          </AppText>
          <AppText family="secondary" weight="light" style={styles.subtitle}>
            Select tasks from the list below.
          </AppText>
        </View>
      </View>

      {/* Task List */}
      <View style={styles.taskList}>
        {tasks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.taskItem}
            activeOpacity={0.7}
            onPress={() => handleToggle(item.id)}
          >
            {/* Left Icon Container */}
            <View style={[styles.taskIconWrapper, { backgroundColor: item.iconBg }]}>
              {renderIcon(item.iconType, item.iconColor)}
            </View>

            {/* Task Info Col */}
            <View style={styles.taskContentCol}>
              <AppText family="secondary" weight="semiBold" style={styles.taskTitle}>
                {item.title}
              </AppText>
              <AppText family="secondary" weight="regular" style={styles.taskDesc} numberOfLines={2}>
                {item.description}
              </AppText>
              <View style={styles.durationRow}>
                <Clock size={normalize(11)} color={colors.blue[500]} style={styles.clockIcon} />
                <AppText family="secondary" weight="medium" style={styles.durationText}>
                  {item.duration}
                </AppText>
              </View>
            </View>

            {/* Checkbox */}
            <View
              style={[
                styles.checkbox,
                item.selected ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {item.selected && <Check size={normalize(13)} color="#FFFFFF" strokeWidth={3} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add More Task Button */}
      <TouchableOpacity
        style={styles.addMoreBtn}
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={normalize(16)} color="#2563EB" style={styles.plusIcon} />
        <AppText family="secondary" weight="medium" style={styles.addMoreBtnText}>
          Add more task
        </AppText>
      </TouchableOpacity>

      {/* Add More Task Modal matching requested popup style */}
      <AddMoreTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={handleCreateTaskFromModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  iconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: colors.typographyColor['Dark 2'],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: normalize(15),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  subtitle: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(15),
  },
  taskList: {
    marginBottom: normalize(16),
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  taskIconWrapper: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
  },
  taskContentCol: {
    flex: 1,
    paddingRight: normalize(8),
  },
  taskTitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(0),
  },
  taskDesc: {
    fontSize: normalize(11),
    color: colors.tintsGrey[600],
    lineHeight: normalize(15),
    marginBottom: normalize(4),
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: normalize(4),
  },
  durationText: {
    fontSize: normalize(11),
    color: colors.blue[500],
  },
  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(8),
  },
  checkboxUnchecked: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: colors.blue[400],
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  plusIcon: {
    marginRight: normalize(6),
  },
  addMoreBtnText: {
    fontSize: normalize(13),
    color: colors.typographyColor['Dark 2'],
  },
});
