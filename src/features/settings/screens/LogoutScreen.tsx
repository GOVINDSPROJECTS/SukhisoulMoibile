import React, { useCallback, useState } from 'react';
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
import { LogoutPrompt } from '../components/logout/LogoutPrompt';
import { LogoutActionButtons } from '../components/logout/LogoutActionButtons';
import { useAuthStore } from '../../auth/store/useAuthStore';

export const LogoutScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleBack = useCallback(() => {
    console.log('[Log Out] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(() => {
    console.log('[Log Out] Cancel pressed -> Going back');
    navigation.goBack();
  }, [navigation]);

  const handleLogout = useCallback(async () => {
    console.log('[Log Out] User confirmed Log Out');
    setIsLoggingOut(true);
    try {
      await useAuthStore.getState().logout();
      console.log('[Log Out] Logged out successfully from Firebase and store');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('[Log Out] Error during logout:', error);
      Alert.alert('Error', 'Failed to log out cleanly. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
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
          title="Log Out"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logout Prompt with Double Circle Icon and Message */}
        <LogoutPrompt
          title="Log Out"
          message={'Are you sure you want to log out of\nyour account?'}
        />

        {/* Action Buttons: Solid Red Log Out & Outline Cancel */}
        <LogoutActionButtons
          onLogout={handleLogout}
          onCancel={handleCancel}
          isLoading={isLoggingOut}
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
    flexGrow: 1,
    // justifyContent: 'space-between',
    paddingBottom: normalize(30),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
