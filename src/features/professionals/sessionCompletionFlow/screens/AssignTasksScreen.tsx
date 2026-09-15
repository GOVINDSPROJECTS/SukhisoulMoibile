import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { AssignHomeworkCard } from '../components/AssignHomeworkCard';
import { SuggestedTasksCard, TaskItem, INITIAL_TASKS } from '../components/SuggestedTasksCard';
import { AddedTasksCard } from '../components/AddedTasksCard';

export const AssignTasksScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [selectedDueDate, setSelectedDueDate] = useState('Next Session');
  const [suggestedTasks, setSuggestedTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [customTasks, setCustomTasks] = useState<TaskItem[]>([]);

  const handleToggleTask = (id: string) => {
    setSuggestedTasks(prev => prev.map(t => (t.id === id ? { ...t, selected: !t.selected } : t)));
  };

  const handleAddCustomTask = (newTask: TaskItem) => {
    // Add ONLY to Added Tasks, NOT to suggested tasks
    setCustomTasks(prev => [...prev, newTask]);
  };

  const handleRemoveTask = (id: string) => {
    // Uncheck in suggested tasks if present
    setSuggestedTasks(prev => prev.map(t => (t.id === id ? { ...t, selected: false } : t)));
    // Remove from custom tasks if present
    setCustomTasks(prev => prev.filter(t => t.id !== id));
  };

  const addedTasks = [
    ...suggestedTasks.filter(t => t.selected),
    ...customTasks,
  ];

  const handleSaveAndContinue = () => {
    navigation.navigate('ScheduleNextSessionScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Task
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[
            colors.tintsBlue[400],
            colors.appThemeColor[75],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.1 }}
          style={styles.gradientBg}
        >
          {/* Assign Homework / Tasks Card */}
          <AssignHomeworkCard
            selectedDueDate={selectedDueDate}
            onDueDateChange={setSelectedDueDate}
          />

          {/* Suggested Tasks Card with interactive checkboxes */}
          <SuggestedTasksCard
            tasks={suggestedTasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddCustomTask}
          />

          {/* Added Tasks Card */}
          <AddedTasksCard
            addedTasks={addedTasks}
            onRemoveTask={handleRemoveTask}
          />

          {/* Action Button */}
          <TouchableOpacity
            style={styles.saveContinueBtn}
            onPress={handleSaveAndContinue}
            activeOpacity={0.8}
          >
            <AppText family="primary" weight="bold" style={styles.saveContinueBtnText}>
              Save & Continue
            </AppText>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    // paddingHorizontal: normalize(16),
    // paddingTop: normalize(16),
    // paddingBottom: normalize(48),
  },
  gradientBg: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },
  saveContinueBtn: {
    backgroundColor: colors.typographyColor['Dark 2'],
    paddingVertical: normalize(15),
    borderRadius: normalize(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
  },
  saveContinueBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
});
