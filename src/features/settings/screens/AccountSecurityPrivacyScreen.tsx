import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { AccountOverviewCard } from '../components/account-security-privacy/AccountOverviewCard';
import { PasswordSection } from '../components/account-security-privacy/PasswordSection';
import { QuickLoginSection } from '../components/account-security-privacy/QuickLoginSection';
import { AccountControlSection } from '../components/account-security-privacy/AccountControlSection';
import { DataManagementSection } from '../components/account-security-privacy/DataManagementSection';
import { PrivacyControlsSection } from '../components/account-security-privacy/PrivacyControlsSection';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { useTherapistDashboard } from '../../therapist-dashboard/hooks/useTherapistDashboard';
import { fetchUserProfile, fetchUserRewards } from '../../../api/userProfile';

export const AccountSecurityPrivacyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const { data: dashboardData } = useTherapistDashboard();

  const [profileData, setProfileData] = React.useState<{
    name: string;
    email: string;
    phone: string;
    avatarUri: string | null;
    memberSince: string;
  }>({
    name: user?.displayName || 'User',
    email: user?.email || '',
    phone: user?.phoneNumber || '+91 98765 43210',
    avatarUri: user?.photoURL || null,
    memberSince: 'Member since Jan 2026',
  });

  const [calmPoints, setCalmPoints] = React.useState<number>(1250);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      // 1. Fetch live user profile
      fetchUserProfile()
        .then((u) => {
          if (isMounted && u) {
            const avatar = u.avatar_url || u.avatar_path || user?.photoURL || null;
            let memberSince = 'Member since Jan 2026';
            if (u.created_at) {
              const d = new Date(u.created_at);
              if (!isNaN(d.getTime())) {
                const month = d.toLocaleDateString('en-US', { month: 'short' });
                const year = d.getFullYear();
                memberSince = `Member since ${month} ${year}`;
              }
            } else if (user?.metadata?.creationTime) {
              const d = new Date(user.metadata.creationTime);
              if (!isNaN(d.getTime())) {
                const month = d.toLocaleDateString('en-US', { month: 'short' });
                const year = d.getFullYear();
                memberSince = `Member since ${month} ${year}`;
              }
            }

            setProfileData({
              name: u.name || user?.displayName || 'User',
              email: u.email || user?.email || '',
              phone: u.phone_number || user?.phoneNumber || '+91 98765 43210',
              avatarUri: avatar,
              memberSince,
            });
          }
        })
        .catch((err) => console.log('[AccountSecurity] Profile fetch error:', err));

      // 2. Fetch live calm points / rewards
      fetchUserRewards()
        .then((res) => {
          if (isMounted && res?.account) {
            setCalmPoints(res.account.balance ?? 1250);
          }
        })
        .catch((err) => console.log('[AccountSecurity] Rewards fetch error:', err));

      return () => {
        isMounted = false;
      };
    }, [user])
  );

  const handleBack = useCallback(() => {
    console.log('[Account Security & Privacy] Back pressed');
    navigation.goBack();
  }, [navigation]);

  const handleAvatarPress = useCallback(() => {
    console.log('[Account Security & Privacy] Avatar pressed -> Navigating to MyProfile');
    navigation.navigate('MyProfile');
  }, [navigation]);

  const handlePlanPress = useCallback(() => {
    console.log('[Account Security & Privacy] Member Plan pressed -> Navigating to TherapyPlans');
    navigation.navigate('TherapyPlans');
  }, [navigation]);

  const handlePhonePress = useCallback(() => {
    console.log('[Account Security & Privacy] Verified Phone pressed -> Navigating to MyProfile');
    navigation.navigate('MyProfile');
  }, [navigation]);

  const handleEmailPress = useCallback(() => {
    console.log('[Account Security & Privacy] Verified Email pressed -> Navigating to MyProfile');
    navigation.navigate('MyProfile');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Top Header with Subtle Gradient ──────────────────────────── */}
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
              title="Account Security & Privacy"
              onBack={handleBack}
            />
          </LinearGradient>

          {/* 1. Profile / Account Status Card */}
          <AccountOverviewCard
            name={profileData.name}
            email={profileData.email}
            avatarUri={profileData.avatarUri}
            memberSince={profileData.memberSince}
            status="Active"
            calmPoints={calmPoints}
            planName={dashboardData?.progress?.planName || 'Individual Therapy Plan'}
            onAvatarPress={handleAvatarPress}
            onPlanPress={handlePlanPress}
          />

          {/* 2. Password Section */}
          <PasswordSection />

          {/* 3. Quick Login and Verification (Biometrics & Verified Contacts) */}
          <QuickLoginSection
            phone={profileData.phone}
            email={profileData.email}
            onPhonePress={handlePhonePress}
            onEmailPress={handleEmailPress}
          />

          {/* 4. Account Control (Active Login Devices) */}
          <AccountControlSection />

          {/* 5. Data Management (Therapy Data, Mood, Download & Delete) */}
          <DataManagementSection />

          {/* 6. Privacy Controls (Blocked Contacts) */}
          <PrivacyControlsSection />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
