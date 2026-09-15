import { useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { user, setUser, setLoading, setError } = useAuthStore();

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, setError]);

  const getAuthToken = useCallback(async () => {
    return await authService.getIdToken();
  }, []);

  return {
    user,
    logout,
    getAuthToken,
  };
};
