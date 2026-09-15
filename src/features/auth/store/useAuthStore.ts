import { create } from 'zustand';
import { getAuth, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  laravelToken: string | null;
  isNewUser: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;

  // Actions
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setLaravelToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initialize: () => () => void;
  logout: () => Promise<void>;
  completeProfile: (data: { name: string; email: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  laravelToken: null,
  isNewUser: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  setUser: (user) => set({ user, isInitializing: false }),
  setLaravelToken: (laravelToken) => set({ laravelToken }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  /**
   * Initializes the auth listener.
   * Returns a cleanup function.
   */
  initialize: () => {
    const subscriber = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        set({ user, isInitializing: false });
        try {
          const idToken = await user.getIdToken();
          const { authService } = require('../services/authService');
          const data = await authService.syncWithBackend(idToken);
          const token = data?.access_token || data?.data?.token || data?.token || null;
          const isNewUser = !!(data?.is_new_user ?? data?.data?.is_new_user);
          set({ 
            laravelToken: token,
            isNewUser: isNewUser 
          });
        } catch (error) {
          console.error('Initial Backend Sync Failed:', error);
        }
      } else {
        set({ user: null, laravelToken: null, isNewUser: false, isInitializing: false });
      }
    });
    return subscriber;
  },
  logout: async () => {
    const { authService } = require('../services/authService');
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, laravelToken: null, isNewUser: false });
  },
  completeProfile: async (data) => {
    const { authService } = require('../services/authService');
    set({ isLoading: true, error: null });
    try {
      const response = await authService.updateProfile(data);
      set({ user: response.user, isNewUser: false });
    } catch (error: any) {
      const serverMessage = error.response?.data?.message || error.message;
      const validationErrors = error.response?.data?.errors;
      let detailedError = serverMessage;
      if (validationErrors) {
        detailedError = Object.values(validationErrors).flat().join('\n');
      }
      set({ error: detailedError });
      throw new Error(detailedError);
    } finally {
      set({ isLoading: false });
    }
  },
}));
