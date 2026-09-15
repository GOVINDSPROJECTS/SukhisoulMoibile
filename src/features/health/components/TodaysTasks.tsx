import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Droplet, Check, CheckCircle2 } from 'lucide-react-native';
import { colors } from '@/theme';

export const TodaysTasks: React.FC = () => {
  const [isWaterCompleted, setIsWaterCompleted] = useState<boolean>(false);
  const [allCompleted, setAllCompleted] = useState<boolean>(false);
  const [currentXp, setCurrentXp] = useState<number>(0);

  const toggleWaterTask = () => {
    const nextState = !isWaterCompleted;
    setIsWaterCompleted(nextState);
    setCurrentXp((prev) => (nextState ? prev + 5 : Math.max(0, prev - 5)));
  };

  const handleCompleteAllTasks = () => {
    if (!allCompleted) {
      setIsWaterCompleted(true);
      setAllCompleted(true);
      setCurrentXp(50);
      Alert.alert(
        'Tasks Completed! 🎉',
        'Congratulations! You earned 50 XP for completing all of today’s wellness tasks.',
        [{ text: 'Awesome!' }]
      );
    } else {
      setIsWaterCompleted(false);
      setAllCompleted(false);
      setCurrentXp(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText style={styles.sectionTitle} weight="extraBold" family='primary'>
          Today's Tasks
        </AppText>
        <AppText style={styles.xpTotalText} weight="semiBold">
          {currentXp > 0 ? `${currentXp} / 50 XP Total` : '50 XP Total'}
        </AppText>
      </View>

      {/* Main Task Card */}
      <View style={styles.taskCard}>
        {/* Next Indicator */}
        <AppText style={styles.nextLabel} weight="regular" family='secondary'>
          Next
        </AppText>

        {/* Task Item Row */}
        <TouchableOpacity
          style={styles.taskRow}
          activeOpacity={0.8}
          onPress={toggleWaterTask}
        >
          {/* Water Icon Circle */}
          <View style={styles.waterIconCircle}>
            <Image
              source={require('../assets/ico-water.png')}
              style={{ width: normalize(18), height: normalize(28) }}
              resizeMode="contain"
            />
          </View>

          {/* Task Info */}
          <View style={styles.taskInfo}>
            <AppText
              style={[
                styles.taskTitle,
                isWaterCompleted && styles.taskTitleCompleted,
              ]}
              weight="bold"
              family='secondary'
            >
              Drink Water Goal
            </AppText>
            <AppText style={styles.taskSubtitle} weight="regular">
              Drink 8 glasses of water
            </AppText>
          </View>

          {/* XP & Checkbox */}
          <View style={styles.xpAndCheckContainer}>
            <AppText style={styles.taskXp} weight="semiBold">
              +5 XP
            </AppText>
            <TouchableOpacity
              style={[
                styles.checkbox,
                isWaterCompleted && styles.checkboxActive,
              ]}
              activeOpacity={0.7}
              onPress={toggleWaterTask}
            >
              {isWaterCompleted && (
                <Check size={normalize(13)} color="#FFFFFF" strokeWidth={3} />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <AppText style={styles.footerPrompt} weight="regular">
            {isWaterCompleted
              ? 'Great work! Keep hydrated.'
              : 'Complete all tasks to earn 50 XP!'}
          </AppText>

          <TouchableOpacity
            style={[
              styles.completeButton,
              allCompleted && styles.completedButtonActive,
            ]}
            activeOpacity={0.85}
            onPress={handleCompleteAllTasks}
          >
            <AppText style={styles.completeButtonText} weight="bold">
              {allCompleted ? 'Completed ✓' : 'Complete Tasks'}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(32),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#064E3B',
  },
  xpTotalText: {
    fontSize: normalize(12),
    color: '#059669',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  nextLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor['Dark 2'],
    marginBottom: normalize(12),
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  waterIconCircle: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskSubtitle: {
    fontSize: normalize(11),
    color: '#9CA3AF',
  },
  xpAndCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  taskXp: {
    fontSize: normalize(11),
    color: '#059669',
  },
  checkbox: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(14),
  },
  footerPrompt: {
    fontSize: normalize(11),
    color: '#64748B',
    flex: 1,
    paddingRight: normalize(8),
  },
  completeButton: {
    backgroundColor: '#1E5692',
    paddingVertical: normalize(9),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButtonActive: {
    backgroundColor: '#0D9488',
  },
  completeButtonText: {
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
});
