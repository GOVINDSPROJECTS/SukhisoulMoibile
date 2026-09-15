import { api } from '../../../api/client';

export type CategoryKey = 'dailyTasks' | 'psychologist' | 'health';

export interface TaskItemData {
  id: string;
  db_id?: number;
  title: string;
  description?: string;
  category: CategoryKey;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  duration: string;
  points: number;
  completed: boolean;
  status?: string;
  due_date?: string;
  completed_at?: string | null;
}

export interface SevenDayItem {
  label: string;
  completed: boolean;
  isToday: boolean;
}

export interface UserAccountData {
  balance: number;
  total_earned: number;
  max_points: number;
  expiring_points: number;
  tier: string;
}

export interface DailyTasksResponse {
  tasks: TaskItemData[];
  category_counts: Record<CategoryKey, number>;
  today_earnings: number;
  points_can_earn: number;
  goals_met_percentage: number;
  streak_days: number;
  overall_progress: number;
  seven_day_progress: SevenDayItem[];
  user: {
    id: number;
    name: string;
    first_name: string;
    email: string;
  };
  account: UserAccountData;
}

export interface HabitDataResponse {
  current_routine: {
    name: string;
    until: string;
    date_str: string;
    active_habit: string;
  };
  next_routine: {
    name: string;
    time: string;
  };
  daily_progress: {
    percentage: number;
    completed_tasks: number;
    total_tasks: number;
    screen_time: string;
    screen_time_target: string;
    screen_time_pct: number;
    water_intake: string;
    water_target: string;
    water_pct: number;
  };
}

export const dailyTaskService = {
  /**
   * Fetch all daily tasks, metrics, streak, and user points
   */
  async fetchDailyTasks(): Promise<DailyTasksResponse> {
    const response = await api.get('/v1/daily-tasks');
    return response.data?.data || response.data;
  },

  /**
   * Toggle completion state of a task
   */
  async toggleTask(taskId: string): Promise<{
    task: TaskItemData;
    points_awarded: number;
    account: UserAccountData;
    message: string;
  }> {
    const response = await api.post(`/v1/daily-tasks/${taskId}/toggle`);
    return response.data?.data || response.data;
  },

  /**
   * Fetch habit circle routines & daily analytical progress
   */
  async fetchHabitData(): Promise<HabitDataResponse> {
    const response = await api.get('/v1/wellness/habits');
    return response.data?.data || response.data;
  },
};
