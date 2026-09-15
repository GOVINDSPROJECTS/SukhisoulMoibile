import { Platform } from 'react-native';
import { api } from './client';

export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  phone_number?: string | null;
  avatar_path?: string | null;
  avatar_url?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  created_at?: string;
  profile?: {
    bio?: string;
    goals?: string[];
    mental_health_history?: string[];
    preferred_session_type?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    emergency_contact_relation?: string;
    education?: string;
    relationship?: string;
    location?: string;
  } | null;
  preference?: {
    language?: string;
    theme?: string;
    notifications_enabled?: boolean;
    email_notifications?: boolean;
    sms_notifications?: boolean;
    push_notifications?: boolean;
    general_permissions?: Record<string, string>;
    media_playback_settings?: Record<string, any>;
    auto_clear_cache_weekly?: boolean;
    notification_preferences?: Record<string, any>;
  } | null;
}

export interface RewardAccountData {
  id: number;
  user_id: number;
  balance: number;
  total_earned: number;
  total_redeemed: number;
  tier: string;
}

export interface RewardResponse {
  account: RewardAccountData;
  transactions: Array<{
    id: number;
    amount: number;
    type: string;
    description: string;
    created_at: string;
  }>;
}

export interface PaymentOrderItem {
  id: number;
  uuid: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  booking?: {
    id: number;
    notes_for_professional?: string;
    session_type?: string;
    professional_profile?: {
      user?: {
        name?: string;
      };
    };
  };
}

/**
 * Fetch authenticated user profile & preferences from Laravel backend
 */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await api.get<{ success: boolean; data: UserProfileResponse }>('/v1/users/me');
  return response.data.data;
};

/**
 * Update authenticated user profile fields
 */
export const updateUserProfile = async (
  data: Partial<{
    name: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    timezone: string;
    locale: string;
    bio: string;
    goals: string[];
    mental_health_history: string[];
    preferred_session_type: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    emergency_contact_relation: string;
    education: string;
    relationship: string;
    location: string;
    preferred_language: string;
    language: string;
  }>
): Promise<UserProfileResponse> => {
  const response = await api.put<{ success: boolean; data: UserProfileResponse }>('/v1/users/me', data);
  return response.data.data;
};

/**
 * Fetch authenticated user reward points and account tier
 */
export const fetchUserRewards = async (): Promise<RewardResponse> => {
  const response = await api.get<{ success: boolean; data: RewardResponse }>('/v1/rewards');
  return response.data.data;
};

/**
 * Fetch authenticated user payment history
 */
export const fetchUserPayments = async (): Promise<PaymentOrderItem[]> => {
  try {
    const response = await api.get<any>('/v1/payments/history');
    const rootData = response.data?.data ?? response.data;
    if (Array.isArray(rootData)) return rootData;
    if (rootData && Array.isArray(rootData.data)) return rootData.data;
    return [];
  } catch (err) {
    console.log('[API] Error fetching payments:', err);
    return [];
  }
};

/**
 * Upload authenticated user avatar photo
 */
export const uploadUserAvatar = async (
  fileUri: string
): Promise<{ avatar_path: string; avatar_url: string }> => {
  const formData = new FormData();
  const filename = fileUri.split('/').pop() || `avatar_${Date.now()}.jpg`;
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1].toLowerCase() : 'jpg';
  const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

  formData.append('avatar', {
    uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''),
    name: filename,
    type: mimeType,
  } as any);

  const response = await api.post<{
    success: boolean;
    data: { avatar_path: string; avatar_url: string };
  }>('/v1/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

/**
 * Delete / soft-delete authenticated user account
 */
export const deleteUserAccount = async (): Promise<void> => {
  await api.delete('/v1/users/me');
};

/**
 * Update authenticated user preferences (notifications, theme, general permissions, etc.)
 */
export const updateUserPreferences = async (
  preferences: Record<string, any>
): Promise<any> => {
  const response = await api.put<{ success: boolean; data: any }>('/v1/users/me/preferences', preferences);
  return response.data.data;
};

/**
 * Ping backend API for network diagnostics and latency measurement
 */
export const pingServer = async (): Promise<{ latencyMs: number; status: string }> => {
  const start = Date.now();
  try {
    await api.get('/v1/ping', { timeout: 5000 });
    const latencyMs = Date.now() - start;
    return { latencyMs, status: 'CONNECTED' };
  } catch (error) {
    return { latencyMs: -1, status: 'OFFLINE' };
  }
};

