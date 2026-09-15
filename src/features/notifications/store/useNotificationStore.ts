import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationStoreState {
  readNotificationIds: string[];
  markAsRead: (id: string) => void;
  markAllAsRead: (ids: string[]) => void;
  clearRead: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set) => ({
      readNotificationIds: [],
      markAsRead: (id: string) =>
        set((state) => ({
          readNotificationIds: state.readNotificationIds.includes(id)
            ? state.readNotificationIds
            : [...state.readNotificationIds, id],
        })),
      markAllAsRead: (ids: string[]) =>
        set((state) => ({
          readNotificationIds: Array.from(new Set([...state.readNotificationIds, ...ids])),
        })),
      clearRead: () => set({ readNotificationIds: [] }),
    }),
    {
      name: 'sukhi-notifications-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
