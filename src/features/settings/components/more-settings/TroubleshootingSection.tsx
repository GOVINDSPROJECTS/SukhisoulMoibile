import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, MessageSquareText } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { pingServer } from '../../../../api/userProfile';

const SPEED_TEST_STORAGE_KEY = '@sukhisoul_last_speed_test';

interface MetricRowProps {
  label: string;
  badge?: string;
  value?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, badge, value }) => {
  return (
    <View style={styles.metricRow}>
      <AppText
        weight="regular"
        family="secondary"
        style={styles.metricLabel}
        color={colors.typographyColor.Medium}
      >
        {label}
      </AppText>

      {badge ? (
        <View style={styles.badge}>
          <AppText
            weight="regular"
            family="primary"
            style={styles.badgeText}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            {badge}
          </AppText>
        </View>
      ) : value ? (
        <AppText
          weight="light"
          family="primary"
          style={styles.valueText}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
        >
          {value}
        </AppText>
      ) : null}
    </View>
  );
};

export const TroubleshootingSection: React.FC = () => {
  const [socketStatus, setSocketStatus] = useState<'CONNECTED' | 'OFFLINE'>('CONNECTED');
  const [latency, setLatency] = useState('24 ms');
  const [delivery, setDelivery] = useState('STABLE');
  const [bandwidth, setBandwidth] = useState('100+ Mbps');

  const checkHealth = useCallback(async () => {
    try {
      // 1. Check last speed test
      const savedSpeed = await AsyncStorage.getItem(SPEED_TEST_STORAGE_KEY);
      if (savedSpeed) {
        setBandwidth(savedSpeed);
      }

      // 2. Real server ping & latency check
      const result = await pingServer();
      if (result.status === 'CONNECTED' && result.latencyMs >= 0) {
        setSocketStatus('CONNECTED');
        setLatency(`${result.latencyMs} ms`);
        setDelivery(result.latencyMs < 50 ? 'EXCELLENT' : result.latencyMs < 120 ? 'STABLE' : 'FAIR');
      } else {
        setSocketStatus('OFFLINE');
        setLatency('Timeout');
        setDelivery('UNSTABLE');
      }
    } catch (err) {
      console.log('[Troubleshooting] Error checking health:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkHealth();
    }, [checkHealth])
  );

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Light}
      >
        TROUBLESHOOTING
      </AppText>

      {/* Main Card */}
      <View style={styles.card}>
        {/* 1. Video Call Health */}
        <View style={styles.subSection}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Video
                size={normalize(17)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2}
              />
            </View>
            <AppText
              weight="semiBold"
              family="secondary"
              style={styles.subSectionTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              Video Call Health
            </AppText>
          </View>

          <View style={styles.metricsGroup}>
            <MetricRow label="Camera" badge="ACTIVE" />
            <MetricRow label="Microphone" badge="DETECTED" />
            <MetricRow label="Bandwidth" value={bandwidth} />
          </View>
        </View>

        {/* 2. Text Chat Sync */}
        <View style={styles.subSection}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <MessageSquareText
                size={normalize(17)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.subSectionTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              Text Chat Sync
            </AppText>
          </View>

          <View style={styles.metricsGroup}>
            <MetricRow label="Socket" badge={socketStatus} />
            <MetricRow label="Latency" value={latency} />
            <MetricRow label="Delivery" value={delivery} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
    marginBottom: normalize(8),
    paddingHorizontal: normalize(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(0),
  },
  subSection: {
    paddingVertical: normalize(2),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(14),
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  subSectionTitle: {
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
  metricsGroup: {
    paddingLeft: normalize(4),
    marginBottom: normalize(20)
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(10),
    borderBottomColor: colors.tintsGrey[50],
    borderBottomWidth: normalize(1),
    minHeight: normalize(40),
  },
  metricLabel: {
    fontSize: normalize(13.5),
  },
  badge: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(99),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
  },
  badgeText: {
    fontSize: normalize(11),
    letterSpacing: 0.3,
  },
  valueText: {
    fontSize: normalize(13),
    letterSpacing: 0.2,
  },

});
