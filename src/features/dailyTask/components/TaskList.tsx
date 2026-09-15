import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Clock, Check, ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CategoryKey, TaskItemData } from '../api/dailyTaskService';

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'dailyTasks', label: 'Daily Tasks' },
  { key: 'psychologist', label: 'Psychologist' },
  { key: 'health', label: 'Health' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: '#16A34A',
  MEDIUM: '#F59E0B',
  HARD: '#EF4444',
};

const DIFFICULTY_COLORS_BG: Record<string, string> = {
  EASY: '#F0FDF4',
  MEDIUM: '#fef1d4',
  HARD: '#ffdcdc',
};

const TaskItem: React.FC<{ task: TaskItemData; onToggle?: () => void }> = ({
  task,
  onToggle,
}) => {
  const diffColor = DIFFICULTY_COLORS[task.difficulty] || DIFFICULTY_COLORS.EASY;
  const diffBgColor = DIFFICULTY_COLORS_BG[task.difficulty] || DIFFICULTY_COLORS_BG.EASY;

  return (
    <TouchableOpacity
      style={styles.taskCard}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      {/* Check circle */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggle}
        style={[
          styles.checkCircle,
          task.completed && styles.checkCircleCompleted,
        ]}
      >
        {task.completed && (
          <View style={styles.checkmark}>
            <Check size={normalize(15)} color={"#ffffff"} strokeWidth={normalize(3)} />
          </View>
        )}
      </TouchableOpacity>

      {/* Task Info */}
      <View style={styles.taskInfo}>
        <AppText
          variant="body"
          weight="bold"
          family="secondary"
          color={task.completed ? '#64748B' : '#27272A'}
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
          ]}
        >
          {task.title}
        </AppText>
        <View style={styles.taskMeta}>
          <AppText
            variant="caption"
            weight="bold"
            family="secondary"
            color={diffColor}
            style={{
              backgroundColor: diffBgColor,
              paddingHorizontal: normalize(6),
              paddingVertical: normalize(1),
              borderRadius: normalize(4),
              textAlign: 'center',
              fontSize: normalize(11),
            }}
          >
            {task.difficulty}
          </AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: normalize(2) }}>
            <Clock size={normalize(11)} color={colors.typographyColor.Medium} />
            <AppText
              variant="caption"
              weight="regular"
              family="secondary"
              color={"#71717A"}
              style={styles.metaText}
            >
              {task.duration}
            </AppText>
          </View>
          <AppText
            variant="caption"
            weight="bold"
            family="secondary"
            color={task.completed ? '#16A34A' : '#FB923C'}
            style={{ fontSize: normalize(11), lineHeight: normalize(14) }}
          >
            {task.completed ? 'Earned ' : '+'}{task.points} pts
          </AppText>
        </View>
      </View>

      {/* Arrow */}
      <View style={styles.arrowContainer}>
        <ArrowRight
          size={normalize(18)}
          color={'rgba(76,70,57,0.4)'}
        />
      </View>
    </TouchableOpacity>
  );
};

interface TaskListProps {
  tasks?: TaskItemData[];
  categoryCounts?: Record<CategoryKey, number>;
  streakDays?: number;
  onToggleTask?: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  categoryCounts,
  streakDays = 12,
  onToggleTask,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('dailyTasks');

  const computedCounts: Record<CategoryKey, number> = categoryCounts || {
    dailyTasks: tasks.filter(t => t.category === 'dailyTasks').length,
    psychologist: tasks.filter(t => t.category === 'psychologist').length,
    health: tasks.filter(t => t.category === 'health').length,
  };

  const filteredTasks = tasks.filter(t => t.category === activeCategory);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <AppText
            variant="h4"
            weight="extraBold"
            family="primary"
            color={"#27272A"}
          >
            Today's Tasks
          </AppText>
          <AppText
            variant="caption"
            weight="light"
            family="secondary"
            color={colors.typographyColor.Medium}
          >
            {dayName}, {dateStr}
          </AppText>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <AppText style={styles.fire}>🔥</AppText>
          <AppText
            variant="caption"
            weight="extraBold"
            color="#27272A"
          >
            Streak {streakDays} Days
          </AppText>
        </View>
      </View>

      {/* Category Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.key;
          const count = computedCounts[cat.key] ?? 0;

          const Content = (
            <>
              <AppText
                variant="caption"
                weight="bold"
                color={isActive ? colors.typographyColor['Dark 2'] : "#71717A"}
                style={{ fontSize: normalize(10) }}
              >
                {cat.label}
              </AppText>

              <View
                style={[
                  styles.countBadge,
                  isActive
                    ? styles.countBadgeActive
                    : styles.countBadgeInactive,
                ]}
              >
                <AppText
                  variant="caption"
                  weight="bold"
                  color={'#FFFFFF'}
                  style={styles.countText}
                >
                  {count}
                </AppText>
              </View>
            </>
          );

          return (
            <TouchableOpacity
              key={cat.key}
              activeOpacity={0.8}
              onPress={() => setActiveCategory(cat.key)}
            >
              {isActive ? (
                <LinearGradient
                  colors={[
                    colors.lightTints.blueLightTint[100],
                    colors.lightTints.blueLightTint[50],
                  ]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryTab}
                >
                  {Content}
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.categoryTab,
                    { backgroundColor: colors.appThemeColor[50] },
                  ]}
                >
                  {Content}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Task Items */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => onToggleTask && onToggleTask(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.taskListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderBottomEndRadius: normalize(24),
    borderBottomLeftRadius: normalize(24),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    gap: normalize(4),
  },
  fire: {
    fontSize: normalize(14),
  },
  categoryRow: {
    flexDirection: 'row',
    gap: normalize(8),
    marginBottom: normalize(16),
    marginTop: normalize(-12),
    paddingTop: normalize(20),
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(10),
    gap: normalize(4),
  },
  countBadge: {
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    right: normalize(0),
    fontSize: normalize(10),
    top: normalize(-7),
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(7),
    borderWidth: 1.2,
    borderColor: "#ffffff",
    minWidth: normalize(18),
  },
  countBadgeActive: {
    backgroundColor: colors.typographyColor.Dark,
  },
  countBadgeInactive: {
    backgroundColor: colors.appThemeColor['500'],
  },
  countText: {
    fontSize: normalize(10),
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(14),
    borderWidth: 1,
    borderColor: "#B2C2D9",
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  checkCircle: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(15),
    borderWidth: 2,
    borderColor: colors.lightTints.greenLightTint['300 2'],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  checkCircleCompleted: {
    backgroundColor: colors.green['700'],
    borderWidth: 1.5,
    borderColor: colors.lightTints.greenLightTint['300 2'],
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(4),
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  metaText: {
    marginLeft: normalize(2),
  },
  arrowContainer: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    backgroundColor: 'rgba(229,226,219,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(8),
  },
  separator: {
    height: normalize(10),
  },
  taskListContent: {
    paddingBottom: normalize(16),
  },
});
