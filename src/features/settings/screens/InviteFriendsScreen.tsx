import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Share,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { InviteStepsCard } from '../components/invite-friends/InviteStepsCard';
import { InviteCodeShareCard } from '../components/invite-friends/InviteCodeShareCard';
import { InviteStatsCard } from '../components/invite-friends/InviteStatsCard';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { fetchUserRewards } from '../../../api/userProfile';

export const InviteFriendsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  const [calmPoints, setCalmPoints] = React.useState<number>(2400);
  const inviteCode = user?.uid ? `SUKHI${user.uid.slice(0, 4).toUpperCase()}` : 'SUKHI2024';

  React.useEffect(() => {
    let isMounted = true;
    fetchUserRewards()
      .then((res) => {
        if (isMounted && res?.account) {
          setCalmPoints(res.account.total_earned || res.account.balance || 2400);
        }
      })
      .catch((err) => console.log('[InviteFriends] Rewards fetch error:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBack = useCallback(() => {
    console.log('[Invite Friends] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleCodeCopied = useCallback((code: string) => {
    console.log(`[Invite Friends] Invite code copied: ${code}`);
  }, []);

  const handleShareLink = useCallback(async () => {
    try {
      await Share.share({
        message: `Join me on Sukhi Soul! Use my invite code ${inviteCode} to earn Calm Points and start your mental wellness journey: https://sukhisoul.com/join?code=${inviteCode}`,
      });
    } catch (error) {
      console.log('[Invite Friends] Share error:', error);
    }
  }, [inviteCode]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* ── Top Header with Exact Gradient matching AccountSecurityPrivacy ──────────────── */}
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
          title="Invite Friends"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Subtitle Section */}
        <View style={styles.titleSection}>
          <AppText
            weight="extraBold"
            family="primary"
            style={styles.mainTitle}
            color={colors.typographyColor.Black || '#0F172A'}
          >
            {'More friends,\nmore peace.'}
          </AppText>

          <AppText
            weight="light"
            family="secondary"
            style={styles.mainSubtitle}
            color={colors.typographyColor.Light || '#64748B'}
          >
            {'Invite and earn Calm Points\nwhile you help someone heal.'}
          </AppText>
        </View>

        {/* 1. Steps Card (Invite, Join, Earn) */}
        <InviteStepsCard />

        {/* 2. Invite Code & Share Link Card */}
        <InviteCodeShareCard
          inviteCode={inviteCode}
          onCodeCopied={handleCodeCopied}
          onShareLink={handleShareLink}
        />

        {/* 3. Stats Card (Friends Joined, Calm Points Earned) */}
        <InviteStatsCard
          friendsJoined={12}
          calmPointsEarned={calmPoints}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(6),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
  titleSection: {
    marginBottom: normalize(20),
    marginTop: normalize(6),
  },
  mainTitle: {
    fontSize: normalize(28),
    lineHeight: normalize(32),
    marginBottom: normalize(8),
  },
  mainSubtitle: {
    fontSize: normalize(15),
    lineHeight: normalize(22),
  },
});
