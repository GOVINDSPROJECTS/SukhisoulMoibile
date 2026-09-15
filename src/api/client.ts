import axios from 'axios';
import { useAuthStore } from '../features/auth/store/useAuthStore';

/**
 * API base URL configuration:
 *
 * • Android Emulator  → 10.0.2.2 (loopback alias to host)
 * • Physical Device   → your machine's LAN IP (e.g. 192.168.1.x)
 *   Run `ipconfig` on Windows and look for your Wi-Fi IPv4 address.
 *
 * Both the device and your machine must be on the SAME Wi-Fi network.
 */
const BASE_URL = __DEV__
  ? 'http://localhost:8000/api'  // ← Uses ADB USB Reverse tunnel (or emulator)
  : 'https://api.sukhisoul.com/api';  // ← Production URL (update when deployed)

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().laravelToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} from ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.error(`[API Error] ${error.config?.url}:`, error.message, error.response?.data || '');
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const hasToken = !!useAuthStore.getState().laravelToken;
      if (hasToken) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
