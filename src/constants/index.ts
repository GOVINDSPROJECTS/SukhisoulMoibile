export const DEV_PORT = 8000;

export const getBaseApiUrl = (): string => {
  if (!__DEV__) {
    return 'https://api.sukhisoul.com/api';
  }
  return `http://localhost:${DEV_PORT}/api`;
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/v1/auth/login',
    REGISTER: '/v1/auth/register',
    LOGOUT: '/v1/auth/logout',
    REFRESH: '/v1/auth/refresh',
    FIREBASE: '/v1/auth/firebase',
    ME: '/v1/auth/me',
  },
  USER: {
    PROFILE: '/v1/users/me',
    ME: '/v1/users/me',
  },
  PROFESSIONALS: {
    BASE: '/v1/professionals',
  },
  HABITS: {
    BASE: '/v1/wellness/habits',
    TOGGLE: (id: string) => `/v1/daily-tasks/${id}/toggle`,
  },
  MOOD: {
    BASE: '/v1/mood',
  },
  SETTINGS: '/settings',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
};

export const APP_CONFIG = {
  VERSION: '1.0.0',
  API_URL: getBaseApiUrl(),
};
