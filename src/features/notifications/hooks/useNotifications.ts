import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../api/client';
import { useNotificationStore } from '../store/useNotificationStore';

export interface DynamicNotificationItem {
  id: string;
  category: 'appointments' | 'tasks' | 'offers' | 'all';
  title: string;
  body: string;
  highlight?: string;
  time: string;
  timestamp: string;
  section: 'today' | 'yesterday' | 'earlier';
  icon: string;
  icon_bg?: string;
  is_read: boolean;
}

export interface NotificationsResponse {
  today: DynamicNotificationItem[];
  yesterday: DynamicNotificationItem[];
  earlier: DynamicNotificationItem[];
  all: DynamicNotificationItem[];
  unread_count: number;
  counts: {
    all: number;
    appointments: number;
    tasks: number;
    offers: number;
  };
}

export const NOTIFICATIONS_QUERY_KEY = ['notifications'];

export const useNotifications = () => {
  const readNotificationIds = useNotificationStore((s) => s.readNotificationIds);

  return useQuery<NotificationsResponse>({
    queryKey: [...NOTIFICATIONS_QUERY_KEY, readNotificationIds],
    queryFn: async () => {
      const response = await api.get('/v1/notifications');
      return response.data?.data ?? {
        today: [],
        yesterday: [],
        earlier: [],
        all: [],
        unread_count: 0,
        counts: { all: 0, appointments: 0, tasks: 0, offers: 0 },
      };
    },
    select: (data) => {
      const mapItem = (item: DynamicNotificationItem) => ({
        ...item,
        is_read: readNotificationIds.includes(item.id) || item.is_read,
      });

      const today = (data.today || []).map(mapItem);
      const yesterday = (data.yesterday || []).map(mapItem);
      const earlier = (data.earlier || []).map(mapItem);
      const all = (data.all || []).map(mapItem);

      const unread_count = all.filter((n) => !n.is_read).length;

      return {
        today,
        yesterday,
        earlier,
        all,
        unread_count,
        counts: {
          all: all.length,
          appointments: all.filter((n) => n.category === 'appointments').length,
          tasks: all.filter((n) => n.category === 'tasks').length,
          offers: all.filter((n) => n.category === 'offers').length,
        },
      };
    },
    staleTime: 5000,
    refetchInterval: 10000, // Real-time background sync every 10 seconds
  });
};

export const useMarkNotificationRead = () => {
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      markAsRead(id);
      try {
        await api.post(`/v1/notifications/${id}/read`);
      } catch (e) {
        // Local state is already updated
      }
      return { id, is_read: true };
    },
    onMutate: async (id: string) => {
      markAsRead(id);
      queryClient.setQueriesData({ queryKey: NOTIFICATIONS_QUERY_KEY }, (old: any) => {
        if (!old) return old;
        const markItem = (item: any) => (item.id === id ? { ...item, is_read: true } : item);
        const all = (old.all || []).map(markItem);
        return {
          ...old,
          today: (old.today || []).map(markItem),
          yesterday: (old.yesterday || []).map(markItem),
          earlier: (old.earlier || []).map(markItem),
          all,
          unread_count: Math.max(0, all.filter((n: any) => !n.is_read).length),
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids?: string[]) => {
      if (ids && ids.length > 0) {
        markAllAsRead(ids);
      }
      try {
        await api.post('/v1/notifications/read-all', { ids });
      } catch (e) {
        // Local state is already updated
      }
      return { all_read: true };
    },
    onMutate: async (ids?: string[]) => {
      if (ids && ids.length > 0) {
        markAllAsRead(ids);
      }
      queryClient.setQueriesData({ queryKey: NOTIFICATIONS_QUERY_KEY }, (old: any) => {
        if (!old) return old;
        const markItem = (item: any) => ({ ...item, is_read: true });
        return {
          ...old,
          today: (old.today || []).map(markItem),
          yesterday: (old.yesterday || []).map(markItem),
          earlier: (old.earlier || []).map(markItem),
          all: (old.all || []).map(markItem),
          unread_count: 0,
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
};
