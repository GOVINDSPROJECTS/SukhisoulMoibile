import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { DeleteAccountScheduledCard } from '../components/delete-account/DeleteAccountScheduledCard';

export const DeleteAccountScheduledScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback(() => {
    console.log('[Delete Account Scheduled] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleCancelRequest = useCallback(() => {
    console.log('[Delete Account Scheduled] Cancel Deletion Request initiated');
    Alert.alert(
      'Cancel Deletion Request',
      'Are you sure you want to cancel the account deletion request? Your account will remain active.',
      [
        { text: 'No, Keep Deleting', style: 'cancel' },
        {
          text: 'Yes, Restore Account',
          style: 'default',
          onPress: () => {
            console.log('[Delete Account Scheduled] Account deletion cancelled successfully');
            Alert.alert(
              'Account Restored',
              'Your account deletion request has been cancelled and your account is active.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Settings');
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }, [navigation]);

  const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
          title="Delete Account"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DeleteAccountScheduledCard
          scheduledDate={thirtyDaysLater}
          daysRemainingText="(30 days from now)"
          onCancelRequest={handleCancelRequest}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(16),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
