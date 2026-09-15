import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Shield,
  ShoppingBag,
  CreditCard,
  UserPlus,
  Bell,
  Settings as SettingsIcon,
  Play,
  Headphones,
  Info,
  BrushCleaning,
} from 'lucide-react-native';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { SettingsProfileCard } from '../components/SettingsProfileCard';
import { SettingsSectionCard } from '../components/SettingsSectionCard';
import { SettingsRowItem } from '../components/SettingsRowItem';
import { SettingsActionButtons } from '../components/SettingsActionButtons';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { fetchUserProfile } from '../../../api/userProfile';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);

  const [profileData, setProfileData] = React.useState<{ name: string; avatar: string | null }>({
    name: user?.displayName || 'User',
    avatar: user?.photoURL || null,
  });

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      fetchUserProfile()
        .then((u) => {
          if (isMounted && u) {
            const avatar = u.avatar_url || u.avatar_path || user?.photoURL || null;
            setProfileData({
              name: u.name || user?.displayName || 'User',
              avatar: avatar,
            });
          }
        })
        .catch((err) => console.log('[Settings] Error fetching profile:', err));
      return () => {
        isMounted = false;
      };
    }, [user])
  );

  const iconColor = colors.typographyColor['Dark 2'] || '#003CA3';
  const iconSize = normalize(20);

  // ── Navigation & Click Handlers ─────────────────────────────────────────────

  const handleProfilePress = useCallback(() => {
    console.log('[Settings] Personal Info tapped -> Navigating to MyProfile');
    navigation.navigate('MyProfile');
  }, [navigation]);

  const handleAccountSecurity = useCallback(() => {
    console.log('[Settings] Account Security & Privacy tapped -> Navigating to AccountSecurityPrivacy');
    navigation.navigate('AccountSecurityPrivacy');
  }, [navigation]);

  const handleTransactions = useCallback(() => {
    console.log('[Settings] Transactions tapped -> Navigating to Transactions');
    navigation.navigate('Transactions');
  }, [navigation]);

  const handleTherapyPlans = useCallback(() => {
    console.log('[Settings] Therapy Plans tapped -> Navigating to TherapyPlans');
    navigation.navigate('TherapyPlans');
  }, [navigation]);

  const handleInviteFriends = useCallback(() => {
    console.log('[Settings] Invite Friends tapped -> Navigating to InviteFriends');
    navigation.navigate('InviteFriends');
  }, [navigation]);

  const handleNotifications = useCallback(() => {
    console.log('[Settings] Notifications tapped -> Navigating to NotificationsSettings');
    navigation.navigate('NotificationsSettings');
  }, [navigation]);

  const handleGeneralSettings = useCallback(() => {
    console.log('[Settings] General Settings tapped -> Navigating to GeneralSettings');
    navigation.navigate('GeneralSettings');
  }, [navigation]);

  const handleMoreSettings = useCallback(() => {
    console.log('[Settings] More Setting tapped -> Navigating to MoreSettings');
    navigation.navigate('MoreSettings');
  }, [navigation]);

  const handleStorageClearCache = useCallback(() => {
    console.log('[Settings] Storage & Clear Cache tapped -> Navigating to ClearCache');
    navigation.navigate('ClearCache');
  }, [navigation]);

  const handleCustomerService = useCallback(() => {
    console.log('[Settings] Customer Service Center tapped -> Navigating to CustomerServiceCenter');
    navigation.navigate('CustomerServiceCenter');
  }, [navigation]);

  const handleAboutSukhiSoul = useCallback(() => {
    console.log('[Settings] About Sukhi Soul tapped -> Navigating to AboutSukhiSoul');
    navigation.navigate('AboutSukhiSoul');
  }, [navigation]);

  const handleLogout = useCallback(() => {
    console.log('[Settings] Log Out tapped -> Navigating to Logout screen');
    navigation.navigate('Logout');
  }, [navigation]);

  const handleDeleteAccount = useCallback(() => {
    console.log('[Settings] Delete Account tapped -> Navigating to DeleteAccountWarning');
    navigation.navigate('DeleteAccountWarning');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] || '#EDF5FD' }} />

      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <SettingsHeader
        title="Settings"
        onBack={() => {
          console.log('[Settings] Back button tapped');
          navigation.goBack();
        }}
      />

      {/* ── Scrollable Settings List ────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Personal Info Profile Card */}
        <SettingsProfileCard
          name={profileData.name}
          subtitle="Name, age, language, occupation and photo"
          avatarUri={profileData.avatar}
          onPress={handleProfilePress}
        />

        {/* 2. Account Section */}
        <SettingsSectionCard title="Account">
          <SettingsRowItem
            icon={<Shield size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Account Security & Privacy"
            subtitle="Password, quick login and verification"
            badge={{ type: 'new', text: 'New' }}
            onPress={handleAccountSecurity}
          />
        </SettingsSectionCard>

        {/* 3. Wellness & Rewards Section */}
        <SettingsSectionCard title="Wellness & Rewards">
          <SettingsRowItem
            icon={<ShoppingBag size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Transactions"
            subtitle="Rewards, free therapy, transactions and earning Calm Points"
            onPress={handleTransactions}
            showDivider
          />
          <SettingsRowItem
            icon={<CreditCard size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Therapy Plans"
            subtitle="Manage current and saved plans"
            badge={{ type: 'active', text: 'Active' }}
            onPress={handleTherapyPlans}
            showDivider
          />
          <SettingsRowItem
            icon={<UserPlus size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Invite Friends"
            subtitle="Invite friends and earn Calm Points"
            onPress={handleInviteFriends}
          />
        </SettingsSectionCard>

        {/* 4. General Section (Preferences & Storage) */}
        <SettingsSectionCard title="General">
          <SettingsRowItem
            icon={<Bell size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Notifications"
            subtitle="Session, task and wellness reminders"
            onPress={handleNotifications}
            showDivider
          />
          <SettingsRowItem
            icon={<SettingsIcon size={iconSize} color={iconColor} strokeWidth={2} />}
            title="General Settings"
            subtitle="Camera, microphone, health..."
            onPress={handleGeneralSettings}
            showDivider
          />
          <SettingsRowItem
            icon={<Play size={iconSize} color={iconColor} strokeWidth={2} />}
            title="More Setting"
            subtitle="Video and calming audio playback"
            onPress={handleMoreSettings}
            showDivider
          />
          <SettingsRowItem
            icon={<BrushCleaning size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Storage & Clear Cache"
            subtitle="Free space without deleting your account data"
            onPress={handleStorageClearCache}
          />
        </SettingsSectionCard>

        {/* 5. General Section (Customer Support & About) */}
        <SettingsSectionCard title="General">
          <SettingsRowItem
            icon={<Headphones size={iconSize} color={iconColor} strokeWidth={2} />}
            title="Customer Service Center"
            subtitle="FAQs, contact support and emergency help"
            onPress={handleCustomerService}
            showDivider
          />
          <SettingsRowItem
            icon={<Info size={iconSize} color={iconColor} strokeWidth={2} />}
            title="About Sukhi Soul"
            subtitle="Version, terms, policies and licenses"
            onPress={handleAboutSukhiSoul}
          />
        </SettingsSectionCard>

        {/* 6. Action Buttons (Log Out & Delete Account) */}
        <SettingsActionButtons
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightTints.blueLightTint[50] || '#EDF5FD',
    paddingBottom: normalize(0)
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(6),
    paddingBottom: normalize(80),
  },
});
