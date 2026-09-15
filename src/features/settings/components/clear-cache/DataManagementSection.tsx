import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RotateCw, CloudDownload, Info, ChevronRight } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { AnimatedToggleSwitch } from './AnimatedToggleSwitch';
import { fetchUserProfile, updateUserPreferences } from '../../../../api/userProfile';

const AUTO_CLEAR_WEEKLY_STORAGE_KEY = '@sukhisoul_auto_clear_weekly';

interface DataManagementSectionProps {
  cacheSizeMb?: number;
}

export const DataManagementSection: React.FC<DataManagementSectionProps> = ({
  cacheSizeMb = 40,
}) => {
  const [autoClearWeekly, setAutoClearWeekly] = useState(false);

  // Load saved preference from local storage and backend
  const loadPreference = useCallback(async () => {
    try {
      // 1. Local storage
      const cached = await AsyncStorage.getItem(AUTO_CLEAR_WEEKLY_STORAGE_KEY);
      if (cached !== null) {
        setAutoClearWeekly(cached === 'true');
      }

      // 2. Server preference
      try {
        const userProfile = await fetchUserProfile();
        const serverVal = (userProfile?.preference as any)?.auto_clear_cache_weekly;
        if (typeof serverVal === 'boolean') {
          setAutoClearWeekly(serverVal);
          AsyncStorage.setItem(AUTO_CLEAR_WEEKLY_STORAGE_KEY, serverVal ? 'true' : 'false');
        }
      } catch (e) {
        console.log('[Clear Cache] Could not fetch server preference:', e);
      }
    } catch (err) {
      console.log('[Clear Cache] Error loading auto-clear setting:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPreference();
    }, [loadPreference])
  );

  const toggleAutoClear = useCallback((value: boolean) => {
    console.log(`[Clear Cache] Auto-clear cache weekly toggled: ${value ? 'ON' : 'OFF'}`);
    setAutoClearWeekly(value);
    AsyncStorage.setItem(AUTO_CLEAR_WEEKLY_STORAGE_KEY, value ? 'true' : 'false').catch((err) => {
      console.log('[Clear Cache] Error saving to AsyncStorage:', err);
    });
    updateUserPreferences({ auto_clear_cache_weekly: value }).catch((err) => {
      console.log('[Clear Cache] Error syncing to backend preferences:', err);
    });
  }, []);

  const handleDownloadOffline = useCallback(() => {
    console.log('[Clear Cache] Download offline resources pressed');
    Alert.alert(
      'Offline Resources',
      'Would you like to pre-download mindfulness sessions and ambient audio tracks for offline playback?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () =>
            Alert.alert(
              'Downloading',
              'Offline audio packs are downloading in the background.'
            ),
        },
      ]
    );
  }, []);

  const handleStorageBreakdown = useCallback(() => {
    console.log('[Clear Cache] Detailed storage breakdown pressed');
    if (cacheSizeMb === 0) {
      Alert.alert(
        'Storage Breakdown',
        '• Guided Audios & Soundscapes: 0 MB\n• Mindfulness Imagery: 0 MB\n• Cached Profiles & Sync: 0 MB\n• Application Core: 84 MB\n\nCache is completely clean!',
        [{ text: 'Close', style: 'default' }]
      );
      return;
    }

    const audioMb = Math.round(cacheSizeMb * 0.45);
    const imageryMb = Math.round(cacheSizeMb * 0.35);
    const syncMb = Math.max(0, cacheSizeMb - audioMb - imageryMb);

    Alert.alert(
      'Storage Breakdown',
      `• Guided Audios & Soundscapes: ${audioMb} MB\n• Mindfulness Imagery: ${imageryMb} MB\n• Cached Profiles & Sync: ${syncMb} MB\n• Application Core: 84 MB\n\nTotal: ${84 + cacheSizeMb} MB`,
      [{ text: 'Close', style: 'default' }]
    );
  }, [cacheSizeMb]);

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Light}
      >
        DATA MANAGEMENT
      </AppText>

      {/* Rows Container */}
      <View style={styles.rowsCard}>
        {/* 1. Auto-clear cache weekly */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.75}
          onPress={() => toggleAutoClear(!autoClearWeekly)}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <RotateCw
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="light"
              family="secondary"
              style={styles.rowLabel}
              color={colors.typographyColor.Medium}
            >
              Auto-clear cache weekly
            </AppText>
          </View>

          <View pointerEvents="none">
            <AnimatedToggleSwitch
              value={autoClearWeekly}
              onValueChange={toggleAutoClear}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* 2. Download offline resources */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.75}
          onPress={handleDownloadOffline}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <CloudDownload
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="light"
              family="secondary"
              style={styles.rowLabel}
              color={colors.typographyColor.Medium}
            >
              Download offline resources
            </AppText>
          </View>

          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Medium}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* 3. Detailed Storage Breakdown */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.75}
          onPress={handleStorageBreakdown}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <Info
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="light"
              family="secondary"
              style={styles.rowLabel}
              color={colors.typographyColor.Medium}
            >
              Detailed Storage Breakdown
            </AppText>
          </View>

          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Medium}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(24),
  },
  sectionLabel: {
    fontSize: normalize(12),
    letterSpacing: 0.6,
    marginBottom: normalize(10),
    paddingHorizontal: normalize(2),
  },
  rowsCard: {
    paddingHorizontal: normalize(4),
  },
  row: {
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
  rowLabel: {
    fontSize: normalize(13.5),
  },
  divider: {
    height: 1,
    backgroundColor: colors.tintsGrey[50],
  },
});
