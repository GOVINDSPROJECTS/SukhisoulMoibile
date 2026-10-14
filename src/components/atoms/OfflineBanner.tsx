import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react-native';
import { AppText } from './AppText';
import { normalize } from '@utils/responsive';
import { useNetworkStore } from '@services/networkService';

export const OfflineBanner: React.FC = () => {
  const insets = useSafeAreaInsets();
  const isConnected = useNetworkStore((state) => state.isConnected);
  const isChecking = useNetworkStore((state) => state.isChecking);
  const checkConnectivity = useNetworkStore((state) => state.checkConnectivity);

  const [showRestored, setShowRestored] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setWasOffline(true);
      setShowRestored(false);
    } else if (wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, wasOffline]);

  if (isConnected && !showRestored) {
    return null;
  }

  const isRestoredState = isConnected && showRestored;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Math.max(insets.top, normalize(8)) },
        isRestoredState ? styles.restoredBg : styles.offlineBg,
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.iconWrap}>
          {isRestoredState ? (
            <CheckCircle2 size={normalize(16)} color="#FFFFFF" />
          ) : (
            <WifiOff size={normalize(16)} color="#FFFFFF" />
          )}
        </View>

        <AppText variant="caption" weight="semiBold" style={styles.bannerText}>
          {isRestoredState
            ? 'Back online! Reconnected to Sukhisoul.'
            : 'No internet connection. Offline mode.'}
        </AppText>

        {!isRestoredState && (
          <TouchableOpacity
            style={styles.retryBtn}
            activeOpacity={0.8}
            onPress={() => checkConnectivity()}
            disabled={isChecking}
          >
            {isChecking ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <View style={styles.retryRow}>
                <RefreshCw size={normalize(12)} color="#FFFFFF" style={{ marginRight: 4 }} />
                <AppText variant="caption" weight="bold" style={styles.retryText}>
                  Retry
                </AppText>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingBottom: normalize(8),
    paddingHorizontal: normalize(16),
  },
  offlineBg: {
    backgroundColor: '#DC2626', // Vibrant warning red
  },
  restoredBg: {
    backgroundColor: '#16A34A', // Soothing connected green
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: normalize(28),
  },
  iconWrap: {
    marginRight: normalize(8),
  },
  bannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: normalize(12),
    lineHeight: normalize(16),
  },
  retryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(99),
    marginLeft: normalize(8),
  },
  retryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: normalize(11),
  },
});
