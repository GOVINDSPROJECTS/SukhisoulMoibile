import { useAuthStore } from '../src/features/auth/store/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      backendUser: null,
      laravelToken: null,
      isNewUser: false,
      isLoading: false,
      isInitializing: true,
      error: null,
    });
  });

  it('initializes with default state values', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.backendUser).toBeNull();
    expect(state.laravelToken).toBeNull();
    expect(state.isNewUser).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.isInitializing).toBe(true);
    expect(state.error).toBeNull();
  });

  it('updates user and clears initializing flag via setUser', () => {
    const mockUser: any = { uid: 'user_123', email: 'client@sukhisoul.com' };
    useAuthStore.getState().setUser(mockUser);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isInitializing).toBe(false);
  });

  it('updates laravelToken via setLaravelToken', () => {
    const token = 'sanctum_token_abc_xyz';
    useAuthStore.getState().setLaravelToken(token);

    expect(useAuthStore.getState().laravelToken).toBe(token);
  });

  it('toggles loading state correctly', () => {
    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);

    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it('sets and clears error state correctly', () => {
    useAuthStore.getState().setError('Authentication failed');
    expect(useAuthStore.getState().error).toBe('Authentication failed');

    useAuthStore.getState().setError(null);
    expect(useAuthStore.getState().error).toBeNull();
  });

  it('clears all session credentials upon logout', async () => {
    useAuthStore.setState({
      user: { uid: 'test_uid' } as any,
      backendUser: { id: 10, name: 'Sukhi User' },
      laravelToken: 'active_token',
      isNewUser: false,
      error: null,
    });

    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.backendUser).toBeNull();
    expect(state.laravelToken).toBeNull();
    expect(state.isNewUser).toBe(false);
  });
});
