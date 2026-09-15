import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { TroubleshootingSection } from '../components/more-settings/TroubleshootingSection';
import { MediaPlaybackCard } from '../components/more-settings/MediaPlaybackCard';
import { SpeedTestButton } from '../components/more-settings/SpeedTestButton';
import { CommonFixesCard } from '../components/more-settings/CommonFixesCard';

export const MoreSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback(() => {
    console.log('[More Settings] Back button pressed');
    navigation.goBack();
  }, [navigation]);

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
          title="More Settings"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Troubleshooting (Video Call Health & Text Chat Sync) */}
        <TroubleshootingSection />

        {/* 2. Media Playback (Video Playback & Audio Playback) */}
        <MediaPlaybackCard />

        {/* 3. Run Data Speed Test Button */}
        <SpeedTestButton />

        {/* 4. Common Fixes (WiFi & Airplane Mode Native Settings) */}
        <CommonFixesCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
