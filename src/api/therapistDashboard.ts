import { api } from './client';

export interface TherapistProfileData {
  id: number;
  uuid?: string;
  name: string;
  designation: string;
  experience: string;
  imageUrl: string;
  rating?: number;
  total_sessions?: number;
}

export interface SessionSummaryData {
  sessionsDone: number;
  sessionsLeft: number;
  totalBookings?: number;
  nextSessionDate: string;
}

export interface NextSessionData {
  id?: number | null;
  uuid?: string;
  sessionType: string;
  dateTime: string;
  dateFormatted?: string;
  duration: string;
  status: string;
  raw_status?: string;
  rescheduleInProgress: boolean;
  rescheduleProgress: number;
  canJoin: boolean;
  daily_room_url?: string | null;
  doctorName?: string;
  is_qbs_completed?: boolean;
}

export interface TherapyProgressData {
  planName: string;
  progressLabel: string;
  progress: number;
}

export interface SessionHistoryItemData {
  id: string;
  sessionNumber: number;
  date: string;
  time?: string;
  topic: string;
  status: 'upcoming' | 'completed' | 'missed' | 'approval_pending' | string;
  raw_status?: string;
  amount?: number;
}

export interface ActivePlanDetailsData {
  id: number;
  planName: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorExperience: string;
  doctorRating: string;
  doctorReviewsCount: number;
  doctorAvatarUri: string;
  sessionsCompleted: number;
  totalSessions: number;
  nextSessionDate: string;
  nextSessionTime: string;
  planStartDate: string;
  planValidTill: string;
}

export interface DynamicTherapyPlanItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  iconType: 'starter' | 'premium';
  isCurrent?: boolean;
  features: Array<{ text: string; included: boolean }>;
}

export interface DynamicSavedPlanItem {
  id: string;
  planTitle: string;
  doctorName: string;
  price: string;
  avatarUri: string;
}

export interface TherapistDashboardSummary {
  has_booking?: boolean;
  has_active_booking?: boolean;
  therapist?: TherapistProfileData | null;
  summary: SessionSummaryData;
  nextSession: NextSessionData | null;
  progress: TherapyProgressData;
  recentSessions?: SessionHistoryItemData[];
  activePlanDetails?: ActivePlanDetailsData;
  availablePlans?: DynamicTherapyPlanItem[];
  savedPlans?: DynamicSavedPlanItem[];
}

export const fetchTherapistDashboardSummary = async (): Promise<TherapistDashboardSummary> => {
  const response = await api.get<{ success: boolean; data: TherapistDashboardSummary }>(
    '/v1/therapist-dashboard/summary'
  );
  return response.data.data;
};
