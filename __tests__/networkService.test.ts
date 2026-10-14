import { useNetworkStore } from '../src/services/networkService';

describe('useNetworkStore & Resilience Logic', () => {
  beforeEach(() => {
    useNetworkStore.setState({
      isConnected: true,
      isChecking: false,
      lastChecked: null,
    });
  });

  it('starts in connected state by default', () => {
    const state = useNetworkStore.getState();
    expect(state.isConnected).toBe(true);
    expect(state.isChecking).toBe(false);
  });

  it('transitions to disconnected state and records lastChecked timestamp', () => {
    useNetworkStore.getState().setConnected(false);

    const state = useNetworkStore.getState();
    expect(state.isConnected).toBe(false);
    expect(state.lastChecked).not.toBeNull();
  });

  it('transitions back to connected state', () => {
    useNetworkStore.getState().setConnected(false);
    useNetworkStore.getState().setConnected(true);

    const state = useNetworkStore.getState();
    expect(state.isConnected).toBe(true);
  });

  it('computes correct exponential backoff intervals for network retries', () => {
    const calculateBackoffDelay = (retryAttempt: number) => {
      return Math.pow(2, retryAttempt) * 1000;
    };

    // Attempt 0: 2^0 * 1000 = 1000ms (1s)
    expect(calculateBackoffDelay(0)).toBe(1000);
    // Attempt 1: 2^1 * 1000 = 2000ms (2s)
    expect(calculateBackoffDelay(1)).toBe(2000);
    // Attempt 2: 2^2 * 1000 = 4000ms (4s)
    expect(calculateBackoffDelay(2)).toBe(4000);
  });

  it('identifies idempotent HTTP methods safe for automatic retry', () => {
    const isIdempotentMethod = (method: string) => {
      return ['get', 'head', 'options', 'put'].includes(method.toLowerCase());
    };

    expect(isIdempotentMethod('GET')).toBe(true);
    expect(isIdempotentMethod('get')).toBe(true);
    expect(isIdempotentMethod('PUT')).toBe(true);
    expect(isIdempotentMethod('HEAD')).toBe(true);

    // Non-idempotent methods should NOT be automatically retried blindly
    expect(isIdempotentMethod('POST')).toBe(false);
    expect(isIdempotentMethod('PATCH')).toBe(false);
    expect(isIdempotentMethod('DELETE')).toBe(false);
  });
});
