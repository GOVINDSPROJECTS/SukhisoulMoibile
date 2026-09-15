import { useState, useEffect, useCallback } from 'react';
import { dailyTaskService, DailyTasksResponse, TaskItemData, CategoryKey } from '../api/dailyTaskService';

export const useDailyTasks = () => {
  const [data, setData] = useState<DailyTasksResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const res = await dailyTaskService.fetchDailyTasks();
      setData(res);
    } catch (err: any) {
      console.error('[useDailyTasks] Failed to load tasks:', err);
      setError(err?.message || 'Failed to load tasks');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Optimistically toggle task completion and award/deduct points
   */
  const toggleTask = useCallback(async (taskId: string) => {
    if (!data) return;

    // Find the task to toggle
    const currentTask = data.tasks.find(t => t.id === taskId);
    if (!currentTask) return;

    const willBeCompleted = !currentTask.completed;
    const pointDelta = willBeCompleted ? currentTask.points : -currentTask.points;

    // Apply optimistic update
    setData(prev => {
      if (!prev) return prev;

      const updatedTasks = prev.tasks.map(t =>
        t.id === taskId ? { ...t, completed: willBeCompleted, status: willBeCompleted ? 'completed' : 'pending' } : t
      );

      const completedCount = updatedTasks.filter(t => t.completed).length;
      const totalCount = updatedTasks.length;
      const newGoalsMet = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      const newTodayEarnings = updatedTasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
      const newPointsCanEarn = Math.max(0, updatedTasks.filter(t => !t.completed).reduce((sum, t) => sum + t.points, 0) + 300);

      const newBalance = Math.max(0, (prev.account?.balance || 0) + pointDelta);
      const newTotalEarned = willBeCompleted
        ? (prev.account?.total_earned || 0) + pointDelta
        : (prev.account?.total_earned || 0);

      return {
        ...prev,
        tasks: updatedTasks,
        today_earnings: newTodayEarnings,
        points_can_earn: newPointsCanEarn,
        goals_met_percentage: newGoalsMet,
        account: {
          ...prev.account,
          balance: newBalance,
          total_earned: newTotalEarned,
        },
      };
    });

    // Call API in background
    try {
      const response = await dailyTaskService.toggleTask(taskId);
      // Sync with server values
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          account: response.account,
        };
      });
    } catch (err: any) {
      console.error('[useDailyTasks] Failed to toggle task on backend:', err);
      // Revert on error
      loadTasks();
    }
  }, [data, loadTasks]);

  return {
    data,
    tasks: data?.tasks || [],
    categoryCounts: data?.category_counts || { dailyTasks: 0, psychologist: 0, health: 0 },
    todayEarnings: data?.today_earnings ?? 0,
    pointsCanEarn: data?.points_can_earn ?? 500,
    goalsMetPercentage: data?.goals_met_percentage ?? 0,
    streakDays: data?.streak_days ?? 12,
    overallProgress: data?.overall_progress ?? 78,
    sevenDayProgress: data?.seven_day_progress || [],
    account: data?.account || {
      balance: 950,
      total_earned: 950,
      max_points: 1200,
      expiring_points: 120,
      tier: 'bronze',
    },
    user: data?.user || {
      id: 1,
      name: 'Atharva',
      first_name: 'Atharva',
      email: '',
    },
    isLoading,
    isRefreshing,
    error,
    refreshTasks: () => loadTasks(true),
    toggleTask,
  };
};
