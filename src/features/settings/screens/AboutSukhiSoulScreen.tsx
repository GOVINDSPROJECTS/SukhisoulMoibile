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
import { AboutHeaderBranding } from '../components/about-sukhi-soul/AboutHeaderBranding';
import { RateAppCard } from '../components/about-sukhi-soul/RateAppCard';
import { SpreadTheWordCard } from '../components/about-sukhi-soul/SpreadTheWordCard';
import { LicensesCard } from '../components/about-sukhi-soul/LicensesCard';

export const AboutSukhiSoulScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback(() => {
    console.log('[About Sukhi Soul] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleRatingChange = useCallback((newRating: number) => {
    console.log(`[About Sukhi Soul] User rated app: ${newRating} stars`);
  }, []);

  const handleWriteReview = useCallback(() => {
    console.log('[About Sukhi Soul] Write Review triggered');
  }, []);

  const handleShareApp = useCallback(() => {
    console.log('[About Sukhi Soul] Share App button pressed');
  }, []);

  const handleSmsShare = useCallback(() => {
    console.log('[About Sukhi Soul] SMS Share pressed');
  }, []);

  const handleEmailShare = useCallback(() => {
    console.log('[About Sukhi Soul] Email Share pressed');
  }, []);

  const handleLinkCopy = useCallback(() => {
    console.log('[About Sukhi Soul] Link copied to clipboard');
  }, []);

  const handleMoreShare = useCallback(() => {
    console.log('[About Sukhi Soul] More options share pressed');
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
          title="About Sukhi Soul"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Logo & App Title */}
        <AboutHeaderBranding title="Sukhi Soul" />

        {/* Rate The App Card */}
        <RateAppCard
          version="v2.41"
          initialRating={4}
          onRatingChange={handleRatingChange}
          onWriteReview={handleWriteReview}
        />

        {/* Spread The Word Card */}
        <SpreadTheWordCard
          shareUrl="https://sukhisoul.com/app"
          shareMessage="Find your calm with Sukhi Soul – a digital mental wellness companion."
          onShareApp={handleShareApp}
          onSmsShare={handleSmsShare}
          onEmailShare={handleEmailShare}
          onLinkCopy={handleLinkCopy}
          onMoreShare={handleMoreShare}
        />

        {/* Licenses Information Card */}
        <LicensesCard />
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
    paddingTop: normalize(6),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
