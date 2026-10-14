import { create } from 'zustand';
import { api } from '@api/client';
import { queryClient } from '@api/queryClient';

export interface NutqState {
  // Step 1: Issues
  selectedIssues: string[];
  mainIssue: string;

  // Step 2: Areas
  selectedAreas: string[];

  // Step 3: Duration
  selectedDuration: string;

  // Step 4: History
  attendedTherapy: string;
  healthProblems: string;

  // Step 5: Preferences
  genderPref: string;
  sessionPref: string;

  // Step 6: Safety
  harmThoughts: string;
  importantInfo: string;

  // Step 7: Goals
  selectedGoals: string[];

  // Submission state
  isSubmitting: boolean;
  error: string | null;

  // Actions
  setIssues: (issues: string[], mainIssue: string) => void;
  setAreas: (areas: string[]) => void;
  setDuration: (duration: string) => void;
  setHistory: (attended: string, health: string) => void;
  setPreferences: (gender: string, session: string) => void;
  setSafety: (harm: string, info: string) => void;
  setGoals: (goals: string[]) => void;
  submitQuestionnaire: (consentAccepted: boolean) => Promise<boolean>;
  resetQuestionnaire: () => void;
}

const initialState = {
  selectedIssues: [],
  mainIssue: '',
  selectedAreas: [],
  selectedDuration: '',
  attendedTherapy: '',
  healthProblems: '',
  genderPref: '',
  sessionPref: '',
  harmThoughts: '',
  importantInfo: '',
  selectedGoals: [],
  isSubmitting: false,
  error: null,
};

export const useNutqStore = create<NutqState>((set, get) => ({
  ...initialState,

  setIssues: (selectedIssues, mainIssue) => set({ selectedIssues, mainIssue }),
  setAreas: (selectedAreas) => set({ selectedAreas }),
  setDuration: (selectedDuration) => set({ selectedDuration }),
  setHistory: (attendedTherapy, healthProblems) => set({ attendedTherapy, healthProblems }),
  setPreferences: (genderPref, sessionPref) => set({ genderPref, sessionPref }),
  setSafety: (harmThoughts, importantInfo) => set({ harmThoughts, importantInfo }),
  setGoals: (selectedGoals) => set({ selectedGoals }),

  submitQuestionnaire: async (consentAccepted: boolean) => {
    const s = get();
    set({ isSubmitting: true, error: null });

    const payload = {
      selected_moods: s.selectedIssues.length > 0 ? s.selectedIssues : ['General Wellness'],
      mood_notes: `Main Concern: ${s.mainIssue || 'Not specified'}. Focus Areas: ${s.selectedAreas.join(', ') || 'General'}.`,
      week_rating: 6,
      progress: `Experiencing issue for: ${s.selectedDuration || 'Not specified'}. Prior therapy: ${s.attendedTherapy || 'No'}.`,
      sleep_time: 'Average',
      event_notes: s.healthProblems || 'No specific health problems noted.',
      reason_notes: `Client goals: ${s.selectedGoals.join(', ') || 'Personal growth'}.`,
      discuss_notes: `Preferred session style: ${s.sessionPref || 'Standard'}.`,
      know_notes: `Therapist gender preference: ${s.genderPref || 'No preference'}. Additional background: ${s.importantInfo || 'None'}.`,
      harm_thoughts: s.harmThoughts || 'No thoughts of self-harm reported',
      ready_session: consentAccepted ? 'Ready for session' : 'Consent limited',
    };

    try {
      // 1. Submit pre-session clinical questionnaire
      await api.post('/v1/pre-session-questions', payload);

      // 2. Sync profile preferences
      try {
        await api.put('/v1/users/me', {
          therapy_preferences: {
            preferred_gender: s.genderPref,
            session_style: s.sessionPref,
            intake_completed: true,
          },
        });
      } catch (profileErr) {
        console.log('[Nutq profile sync note]:', profileErr);
      }

      queryClient.invalidateQueries({ queryKey: ['pre-session-questions'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });

      set({ isSubmitting: false });
      return true;
    } catch (err: any) {
      console.error('[Nutq submit error]:', err?.message, err?.response?.data);
      set({ isSubmitting: false, error: err?.response?.data?.message || err?.message || 'Submission failed' });
      return false;
    }
  },

  resetQuestionnaire: () => set(initialState),
}));
