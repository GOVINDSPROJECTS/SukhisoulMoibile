import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { DailyTaskHeader } from '../components/DailyTaskHeader';
import { TaskTabBar } from '../components/TaskTabBar';
import { TaskList } from '../components/TaskList';
import { EarnedPointsContent } from '../components/EarnedPointsContent';
import { SevenDayProgress } from '../components/SevenDayProgress';
import { WeeklyStats } from '../components/WeeklyStats';
import { OverallProgress } from '../components/OverallProgress';
import { ActiveRewards } from '../components/ActiveRewards';
import { UnlockMoreRewards } from '../components/UnlockMoreRewards';
import { GetMorePoints } from '../components/GetMorePoints';
import { useDailyTasks } from '../hooks/useDailyTasks';

type TabKey = 'dailyTask' | 'earnedPoints';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const DailyTaskScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('dailyTask');
  const [showRewardsView, setShowRewardsView] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const {
    tasks,
    categoryCounts,
    todayEarnings,
    pointsCanEarn,
    goalsMetPercentage,
    streakDays,
    overallProgress,
    sevenDayProgress,
    account,
    user,
    isRefreshing,
    refreshTasks,
    toggleTask,
  } = useDailyTasks();

  const handleTabChange = (tab: TabKey) => {
    const toValue = tab === 'dailyTask' ? 0 : -SCREEN_WIDTH;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
    setActiveTab(tab);
    // Reset sub-view when switching tabs
    if (tab === 'dailyTask') setShowRewardsView(false);
  };

  const handleOpenRewards = () => {
    // Switch to Earned Points tab first, then show rewards view
    handleTabChange('earnedPoints');
    setShowRewardsView(true);
  };

  const handleBackFromRewards = () => {
    setShowRewardsView(false);
  };

  return (
    <View style={styles.root}>
      {/* Tab Bar — always visible */}
      <TaskTabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Sliding Content Area */}
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[
            styles.slidingRow,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* ── Daily Task Tab ── */}
          <ScrollView
            style={styles.tabPage}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshTasks}
                colors={['#1E5AF0']}
                tintColor="#1E5AF0"
              />
            }
          >
            <DailyTaskHeader
              userName={user.first_name || user.name || 'Atharva'}
              currentPoints={account.balance}
              maxPoints={account.max_points || 1200}
              expiringPoints={account.expiring_points || 120}
              onRedeemPress={() => {}}
            />

            <TaskList
              tasks={tasks}
              categoryCounts={categoryCounts}
              streakDays={streakDays}
              onToggleTask={toggleTask}
            />

            <View style={styles.sectionGroup}>
              <SevenDayProgress
                days={sevenDayProgress}
                onViewRewards={handleOpenRewards}
              />
              <WeeklyStats
                todayEarnings={todayEarnings}
                pointsCanEarn={pointsCanEarn}
                goalsMetPercentage={goalsMetPercentage}
              />
              <OverallProgress
                progressPercent={overallProgress}
                streakDays={streakDays}
              />
            </View>
          </ScrollView>

          {/* ── Earned Points Tab ── */}
          <ScrollView
            style={styles.tabPage}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshTasks}
                colors={['#1E5AF0']}
                tintColor="#1E5AF0"
              />
            }
          >
            {showRewardsView ? (
              /* Inline Rewards Unlocked sub-view */
              <>
                <ActiveRewards />
                <UnlockMoreRewards />
                <GetMorePoints />
              </>
            ) : (
              /* Default Earned Points content — passes callback for Rewards Unlocked card */
              <EarnedPointsContent onOpenRewards={handleOpenRewards} />
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sectionGroup: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  slidingRow: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 2,
    flex: 1,
  },
  tabPage: {
    width: SCREEN_WIDTH,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});