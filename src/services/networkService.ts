import { create } from 'zustand';

interface NetworkState {
  isConnected: boolean;
  isChecking: boolean;
  lastChecked: number | null;
  setConnected: (status: boolean) => void;
  checkConnectivity: () => Promise<boolean>;
}

export const useNetworkStore = create<NetworkState>((set, get) => ({
  isConnected: true,
  isChecking: false,
  lastChecked: null,

  setConnected: (status: boolean) => {
    if (get().isConnected !== status) {
      set({ isConnected: status, lastChecked: Date.now() });
    }
  },

  checkConnectivity: async () => {
    set({ isChecking: true });
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Lightweight 204 endpoint to verify internet reachability
      const response = await fetch(`https://clients3.google.com/generate_204?_t=${Date.now()}`, {
        method: 'HEAD',
        headers: {
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const connected = response.status === 204 || response.ok;
      set({ isConnected: connected, isChecking: false, lastChecked: Date.now() });
      return connected;
    } catch {
      set({ isConnected: false, isChecking: false, lastChecked: Date.now() });
      return false;
    }
  },
}));
