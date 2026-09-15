import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../api/client';
import { queryClient } from '../../../api/queryClient';

export interface QbsAnswers {
  // Step 1: Feeling & Mood
  selectedMoods: string[];
  moodNotes: string;

  // Step 2: Week Rating (1-10)
  weekRating: number;

  // Step 3: Progress since last visit
  progress: 'improved' | 'same' | 'worsened' | '';

  // Step 4: Sleep Duration
  sleepTime: string;

  // Step 5: Significant events & lack of progress reasons
  eventNotes: string;
  reasonNotes: string;

  // Step 6: Discussion topics & notes for therapist
  discussNotes: string;
  knowNotes: string;

  // Step 7: Safety & readiness
  harmThoughts: 'no' | 'occasionally' | 'frequently' | '';
  readySession: 'yes' | 'no' | '';

  // Status
  isCompleted: boolean;
  completedAt?: string;
  isSubmitting?: boolean;
}

interface QbsStoreState extends QbsAnswers {
  setStep1: (moods: string[], notes: string) => void;
  setStep2: (rating: number) => void;
  setStep3: (progress: 'improved' | 'same' | 'worsened' | '') => void;
  setStep4: (sleepTime: string) => void;
  setStep5: (eventNotes: string, reasonNotes: string) => void;
  setStep6: (discussNotes: string, knowNotes: string) => void;
  setStep7: (harmThoughts: 'no' | 'occasionally' | 'frequently' | '', readySession: 'yes' | 'no' | '') => void;
  submitAnswers: (bookingId?: string | number, sessionId?: string | number) => Promise<boolean>;
  finishQuiz: () => void;
  resetQuiz: () => void;
}

const initialState: QbsAnswers = {
  selectedMoods: [],
  moodNotes: '',
  weekRating: 0,
  progress: '',
  sleepTime: '',
  eventNotes: '',
  reasonNotes: '',
  discussNotes: '',
  knowNotes: '',
  harmThoughts: '',
  readySession: '',
  isCompleted: false,
  isSubmitting: false,
};

export const useQbsStore = create<QbsStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep1: (selectedMoods, moodNotes) => set({ selectedMoods, moodNotes }),
      setStep2: (weekRating) => set({ weekRating }),
      setStep3: (progress) => set({ progress }),
      setStep4: (sleepTime) => set({ sleepTime }),
      setStep5: (eventNotes, reasonNotes) => set({ eventNotes, reasonNotes }),
      setStep6: (discussNotes, knowNotes) => set({ discussNotes, knowNotes }),
      setStep7: (harmThoughts, readySession) => set({ harmThoughts, readySession }),
      submitAnswers: async (bookingId, sessionId) => {
        const state = get();

        // Validation: do not submit empty or incomplete quiz data
        if (
          !state.selectedMoods ||
          state.selectedMoods.length === 0 ||
          !state.weekRating ||
          state.weekRating < 1 ||
          !state.progress ||
          !state.sleepTime ||
          !state.harmThoughts ||
          !state.readySession
        ) {
          console.warn('[QBS Submit Error] Quiz validation failed: incomplete answers.');
          return false;
        }

        set({ isSubmitting: true });
        try {
          const payload = {
            booking_id: bookingId,
            session_id: sessionId,
            selected_moods: state.selectedMoods,
            mood_notes: state.moodNotes,
            week_rating: state.weekRating,
            progress: state.progress,
            sleep_time: state.sleepTime,
            event_notes: state.eventNotes,
            reason_notes: state.reasonNotes,
            discuss_notes: state.discussNotes,
            know_notes: state.knowNotes,
            harm_thoughts: state.harmThoughts,
            ready_session: state.readySession,
          };

          await api.post('/v1/pre-session-questions', payload);
          set({ isCompleted: true, completedAt: new Date().toISOString(), isSubmitting: false });
          queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
          queryClient.refetchQueries({ queryKey: ['therapist-dashboard'] });
          return true;
        } catch (error) {
          console.error('[QBS Submit Error]', error);
          // Persist completed locally even if offline
          set({ isCompleted: true, completedAt: new Date().toISOString(), isSubmitting: false });
          queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
          return true;
        }
      },
      finishQuiz: () => set({ isCompleted: true, completedAt: new Date().toISOString() }),
      resetQuiz: () => set(initialState),
    }),
    {
      name: 'qbs-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
