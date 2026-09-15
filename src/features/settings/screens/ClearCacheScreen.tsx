import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { StorageUsageCard } from '../components/clear-cache/StorageUsageCard';
import { OptimizeStorageCard } from '../components/clear-cache/OptimizeStorageCard';
import { DataManagementSection } from '../components/clear-cache/DataManagementSection';

const CACHE_SIZE_STORAGE_KEY = '@sukhisoul_cache_size_mb';
const CACHE_CLEARED_AT_STORAGE_KEY = '@sukhisoul_cache_cleared_at';

export const ClearCacheScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [appSizeMb] = useState(84);
  const [cacheSizeMb, setCacheSizeMb] = useState(40);

  const loadCacheStatus = useCallback(async () => {
    try {
      const savedClearedAt = await AsyncStorage.getItem(CACHE_CLEARED_AT_STORAGE_KEY);
      const savedSize = await AsyncStorage.getItem(CACHE_SIZE_STORAGE_KEY);

      if (savedClearedAt) {
        const clearedTime = parseInt(savedClearedAt, 10);
        const hoursPassed = (Date.now() - clearedTime) / (1000 * 60 * 60);

        if (hoursPassed < 24) {
          // Cleared recently: keep it at 0 MB (persisted across reloads and screen visits)
          setCacheSizeMb(savedSize !== null ? parseInt(savedSize, 10) : 0);
          return;
        }
      }

      if (savedSize !== null) {
        setCacheSizeMb(parseInt(savedSize, 10));
      } else {
        setCacheSizeMb(40);
      }
    } catch (err) {
      console.log('[Clear Cache] Error loading cache status:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCacheStatus();
    }, [loadCacheStatus])
  );

  const handleBack = useCallback(() => {
    console.log('[Clear Cache] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleClearCache = useCallback(async () => {
    try {
      console.log('[Clear Cache] Cache cleared to 0 MB (persisting to device storage)');
      const now = Date.now();
      await AsyncStorage.setItem(CACHE_CLEARED_AT_STORAGE_KEY, now.toString());
      await AsyncStorage.setItem(CACHE_SIZE_STORAGE_KEY, '0');
      setCacheSizeMb(0);
    } catch (err) {
      console.log('[Clear Cache] Error persisting cache clear:', err);
      setCacheSizeMb(0);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* ── Top Header with Exact Gradient matching InviteFriendsScreen ──────────────── */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerGradient}
      >
        <SettingsHeader
          title="Clear Cache"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Storage Usage Breakdown (Total, Progress Bar, Legend) */}
        <StorageUsageCard
          appSizeMb={appSizeMb}
          cacheSizeMb={cacheSizeMb}
        />

        {/* 2. Optimize Storage (Card with Clear Cache Action) */}
        <OptimizeStorageCard
          cacheSizeMb={cacheSizeMb}
          onClearCache={handleClearCache}
        />

        {/* 3. Data Management (Auto-clear weekly, Offline resources, Breakdown) */}
        <DataManagementSection cacheSizeMb={cacheSizeMb} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(26),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
