import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Wifi, Plane, ChevronRight, PlaneTakeoff, PlaneLanding } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export const CommonFixesCard: React.FC = () => {
  // ── Open WiFi Settings ────────────────────────────────────────────────
  const handleOpenWifi = useCallback(async () => {
    console.log('[More Settings] Check WiFi Settings pressed -> opening native settings');
    try {
      if (Platform.OS === 'android') {
        await Linking.sendIntent('android.settings.WIFI_SETTINGS');
      } else {
        // iOS
        const supported = await Linking.canOpenURL('App-Prefs:WIFI');
        if (supported) {
          await Linking.openURL('App-Prefs:WIFI');
        } else {
          await Linking.openSettings();
        }
      }
    } catch (error) {
      console.log('[More Settings] Error opening WiFi intent, falling back to openSettings:', error);
      await Linking.openSettings();
    }
  }, []);

  // ── Open Airplane Mode Settings ───────────────────────────────────────
  const handleOpenAirplane = useCallback(async () => {
    console.log('[More Settings] Toggle Airplane Mode pressed -> opening native settings');
    try {
      if (Platform.OS === 'android') {
        await Linking.sendIntent('android.settings.AIRPLANE_MODE_SETTINGS');
      } else {
        // iOS
        const supported = await Linking.canOpenURL('App-Prefs:AIRPLANE_MODE');
        if (supported) {
          await Linking.openURL('App-Prefs:AIRPLANE_MODE');
        } else {
          await Linking.openSettings();
        }
      }
    } catch (error) {
      console.log('[More Settings] Error opening Airplane intent, falling back to openSettings:', error);
      await Linking.openSettings();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Section Label */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Light}
      >
        COMMON FIXES
      </AppText>

      {/* Rows Container */}
      <View style={styles.card}>
        {/* Check WiFi Settings */}
        <TouchableOpacity
          style={styles.fixRow}
          activeOpacity={0.7}
          onPress={handleOpenWifi}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <Wifi
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="light"
              family="secondary"
              style={styles.fixLabel}
              color={colors.typographyColor.Light}
            >
              Check WiFi Settings
            </AppText>
          </View>
          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Light}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* Toggle Airplane Mode */}
        <TouchableOpacity
          style={styles.fixRow}
          activeOpacity={0.7}
          onPress={handleOpenAirplane}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <Plane
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                fill={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="light"
              family="secondary"
              style={styles.fixLabel}
              color={colors.typographyColor.Light}
            >
              Toggle Airplane Mode
            </AppText>
          </View>
          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Light}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
    marginTop: normalize(10)
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
    marginBottom: normalize(5),
    paddingHorizontal: normalize(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
  },
  fixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  iconCircle: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixLabel: {
    fontSize: normalize(14),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
