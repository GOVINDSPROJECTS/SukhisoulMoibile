import { api } from './client';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProfessionalUser {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar_path: string | null;
  professional_type: string | null;
}

export interface Professional {
  id: number;
  uuid: string;
  user_id: number;
  user: ProfessionalUser;
  gender: string;
  highest_qualification: string;
  university_name: string;
  years_experience: number;
  expertise: string[];
  languages_spoken: string[];
  consultation_fee: string;
  session_rate_video: string;
  session_rate_audio: string;
  session_rate_text: string;
  bio: string;
  profile_image_path: string | null;
  rating: string;
  total_sessions: number;
  total_reviews: number;
  is_featured: boolean;
  available_for_crisis: boolean;
  offers_free_intro_session: boolean;
  session_duration_minutes: number;
  currency: string;
  status: string;
}

export interface ProfessionalPaginatedResponse {
  data: Professional[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// ─── API helpers ──────────────────────────────────────────────────────────────

/** GET /api/v1/professionals — public, no auth required */
export const fetchProfessionals = async (params?: {
  per_page?: number;
  filter?: {
    specialization?: string;
    gender?: string;
    city?: string;
    is_featured?: boolean;
  };
  sort?: string;
}): Promise<ProfessionalPaginatedResponse> => {
  const response = await api.get<ProfessionalPaginatedResponse>(
    '/v1/professionals',
    { params },
  );
  return response.data;
};

export interface ReviewData {
  id: number | string;
  uuid?: string;
  rating: number;
  review_text: string;
  is_anonymous?: boolean;
  created_at?: string;
  user?: {
    id?: number;
    name: string;
    avatar_path?: string | null;
  };
}

export interface ReviewsResponse {
  data: ReviewData[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/** GET /api/v1/professionals/:uuid — public detail */
export const fetchProfessionalById = async (
  uuid: string,
): Promise<{ data: Professional }> => {
  const response = await api.get<{ data: Professional }>(
    `/v1/professionals/${uuid}`,
  );
  return response.data;
};

/** GET /api/v1/professionals/:uuid/reviews — public reviews */
export const fetchProfessionalReviews = async (
  uuidOrId: string,
  params?: { per_page?: number },
): Promise<ReviewsResponse> => {
  const response = await api.get<ReviewsResponse>(
    `/v1/professionals/${uuidOrId}/reviews`,
    { params },
  );
  return response.data;
};

/** POST /api/v1/professionals/:uuid/reviews — submit patient review */
export const submitProfessionalReview = async (
  uuidOrId: string,
  data: {
    rating: number;
    review_text: string;
    is_anonymous?: boolean;
  },
): Promise<{ success: boolean; data: ReviewData; message?: string }> => {
  const response = await api.post(
    `/v1/professionals/${uuidOrId}/reviews`,
    data,
  );
  return response.data;
};

export interface SlotItem {
  id: number;
  uuid: string;
  time: string;
  starts_at: string;
  ends_at: string;
  status: 'available' | 'booked' | 'passed' | 'locked';
  is_available: boolean;
}

export interface ProfessionalSlotsData {
  date: string;
  date_formatted: string;
  professional_id: number;
  slots: SlotItem[];
  available_times: string[];
  total_available: number;
}

export interface ProfessionalSlotsResponse {
  success: boolean;
  data: ProfessionalSlotsData;
}

/** GET /api/v1/professionals/:uuidOrId/slots?date=YYYY-MM-DD — real-time availability */
export const fetchProfessionalSlots = async (
  uuidOrId: string | number,
  date?: string
): Promise<ProfessionalSlotsData> => {
  const response = await api.get<ProfessionalSlotsResponse>(
    `/v1/professionals/${uuidOrId}/slots`,
    { params: date ? { date } : undefined }
  );
  return response.data.data;
};

export interface TherapyPlanItem {
  id: string | number;
  uuid?: string;
  title: string;
  name?: string;
  description?: string;
  category?: string;
  total_sessions: number;
  sessions_label?: string;
  price_per_session?: number;
  total_price: number;
  formatted_price?: string;
  currency?: string;
  is_most_popular?: boolean;
  savings_percentage?: number;
  savings_label?: string | null;
}

export interface TherapyPlansResponse {
  success: boolean;
  data: TherapyPlanItem[];
}

/** GET /api/v1/professionals/:uuidOrId/therapy-plans — real-time therapy plans */
export const fetchProfessionalTherapyPlans = async (
  uuidOrId: string | number,
  doctorName?: string,
): Promise<TherapyPlanItem[]> => {
  const response = await api.get<TherapyPlansResponse>(
    `/v1/professionals/${uuidOrId}/therapy-plans`,
    {
      params: doctorName ? { doctor_name: doctorName } : undefined,
    }
  );
  return response.data.data;
};

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Helper to resolve image paths (both absolute HTTP URLs and local storage paths)
 * so they load correctly on both physical devices and emulators.
 */
export const resolveImageUrl = (path?: string | null): string => {
  if (!path) return '';
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    if (path.includes('127.0.0.1:8000') || path.includes('localhost:8000')) {
      const apiHost = (api.defaults.baseURL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
      return path.replace(/^https?:\/\/(127\.0\.0\.1|localhost):8000/, apiHost);
    }
    return path;
  }

  const clean = path.replace(/^\/?(storage\/)?/, '');
  const apiHost = (api.defaults.baseURL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
  return `${apiHost}/storage/${clean}`;
};

export const getProfessionalAvatar = (pro: Professional): string => {
  if (pro.profile_image_path) {
    return resolveImageUrl(pro.profile_image_path);
  }
  if (pro.user?.avatar_path) {
    return resolveImageUrl(pro.user.avatar_path);
  }
  // Deterministic fallback based on gender
  return pro.gender === 'female'
    ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150';
};

/** Get the first expertise tag for a badge display */
export const getPrimaryExpertise = (pro: Professional): string => {
  return pro.expertise?.[0] ?? 'Mental Wellness';
};

/** Format years experience string */
export const getExperienceLabel = (pro: Professional): string => {
  const yrs = pro.years_experience;
  return yrs ? `${yrs}+ Yrs Exp.` : 'Experienced';
};
