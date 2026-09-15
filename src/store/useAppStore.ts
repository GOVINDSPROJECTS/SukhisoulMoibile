import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  hasCompletedOnboarding: boolean;
  themeMode: 'light' | 'dark' | 'system';
  setHasCompletedOnboarding: (value: boolean) => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      themeMode: 'system',
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      setThemeMode: (mode) => set({ themeMode: mode }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
