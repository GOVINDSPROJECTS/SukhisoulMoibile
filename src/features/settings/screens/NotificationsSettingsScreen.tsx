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
import { NotificationSection } from '../components/notifications/NotificationSection';
import { NotificationToggleRow } from '../components/notifications/NotificationToggleRow';
import { NotificationPickerRow } from '../components/notifications/NotificationPickerRow';
import { fetchUserProfile, updateUserPreferences } from '../../../api/userProfile';

const NOTIFICATION_SETTINGS_STORAGE_KEY = '@sukhisoul_notification_settings';

export interface NotificationSettingsState {
  sessionReminders: boolean;
  taskReminders: boolean;
  wellnessReminders: boolean;
  reminderTime: string;
  snoozeReminders: boolean;
  emailNotifications: boolean;
  typingIndicators: boolean;
  muteNotificators: boolean;
  mediaAutoDownload: string;
  therapistAvailability: boolean;
  quietHours: string;
  priorityMessages: boolean;
  summaryAfterSessions: boolean;
  newMessageAlerts: boolean;
}

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettingsState = {
  sessionReminders: true,
  taskReminders: true,
  wellnessReminders: true,
  reminderTime: '9:00 AM',
  snoozeReminders: true,
  emailNotifications: true,
  typingIndicators: true,
  muteNotificators: false,
  mediaAutoDownload: 'Wi-Fi Only',
  therapistAvailability: true,
  quietHours: '10:00 PM - 7:00 AM',
  priorityMessages: true,
  summaryAfterSessions: true,
  newMessageAlerts: true,
};

const TIME_OPTIONS = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '1:00 PM',
  '6:00 PM',
  '8:00 PM',
  '9:00 PM',
];

const MEDIA_DOWNLOAD_OPTIONS = [
  'Never',
  'Wi-Fi Only',
  'Wi-Fi and Cellular',
];

const QUIET_HOURS_OPTIONS = [
  'Off',
  '10:00 PM - 7:00 AM',
  '11:00 PM - 8:00 AM',
  '9:00 PM - 6:00 AM',
];

export const NotificationsSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState<NotificationSettingsState>(DEFAULT_NOTIFICATION_SETTINGS);

  const loadSavedSettings = useCallback(async () => {
    try {
      // 1. Instantly load from local storage
      const cached = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object') {
            setSettings((prev) => ({ ...prev, ...parsed }));
          }
        } catch (e) {
          console.log('[Notification Settings] Error parsing cache:', e);
        }
      }

      // 2. Sync with backend user preferences if available
      try {
        const userProfile = await fetchUserProfile();
        const serverSettings = (userProfile?.preference as any)?.notification_preferences;
        if (serverSettings && typeof serverSettings === 'object') {
          setSettings((prev) => {
            const merged = { ...prev, ...serverSettings };
            AsyncStorage.setItem(NOTIFICATION_SETTINGS_STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (apiErr) {
        console.log('[Notification Settings] Could not fetch server preferences:', apiErr);
      }
    } catch (err) {
      console.log('[Notification Settings] Error loading settings:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedSettings();
    }, [loadSavedSettings])
  );

  const updateSetting = useCallback((key: keyof NotificationSettingsState, value: any) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      // 1. Immediately save to device storage
      AsyncStorage.setItem(NOTIFICATION_SETTINGS_STORAGE_KEY, JSON.stringify(updated)).catch((err) => {
        console.log('[Notification Settings] Error saving to AsyncStorage:', err);
      });

      // 2. Sync to backend user preferences
      updateUserPreferences({ notification_preferences: updated }).catch((err) => {
        console.log('[Notification Settings] Error syncing to backend:', err);
      });

      return updated;
    });
  }, []);

  const handleBack = useCallback(() => {
    console.log('[Notification Settings] Back button pressed');
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
          title="Notifications"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Settings Content ─────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── SECTION 1: REMINDERS ────────────────────────────────────── */}
        <NotificationSection title="REMINDERS">
          <NotificationToggleRow
            title="Session Reminders"
            subtitle="Get reminded about upcoming therapy sessions."
            value={settings.sessionReminders}
            onValueChange={(val) => updateSetting('sessionReminders', val)}
          />

          <NotificationToggleRow
            title="Task Reminders"
            subtitle="Receive reminders for your daily tasks and assignments."
            value={settings.taskReminders}
            onValueChange={(val) => updateSetting('taskReminders', val)}
          />

          <NotificationToggleRow
            title="Wellness Reminders"
            subtitle="Get gentle nudges for self-care, mood tracking and wellness check- ins."
            value={settings.wellnessReminders}
            onValueChange={(val) => updateSetting('wellnessReminders', val)}
          />

          <NotificationPickerRow
            title="Reminder Time"
            subtitle="Choose when you want to receive reminders."
            value={settings.reminderTime}
            options={TIME_OPTIONS}
            onSelect={(val) => updateSetting('reminderTime', val)}
          />

          <NotificationToggleRow
            title="Snooze Reminders"
            subtitle="Snooze reminders for a set duration."
            value={settings.snoozeReminders}
            onValueChange={(val) => updateSetting('snoozeReminders', val)}
          />

          <NotificationToggleRow
            title="Email Notifications"
            value={settings.emailNotifications}
            onValueChange={(val) => updateSetting('emailNotifications', val)}
          />
        </NotificationSection>

        {/* ── SECTION 2: CHAT CONTROLS ────────────────────────────────── */}
        <NotificationSection title="CHAT CONTROLS">
          <NotificationToggleRow
            title="Typing Indicators"
            subtitle="Show when others are typing."
            value={settings.typingIndicators}
            onValueChange={(val) => updateSetting('typingIndicators', val)}
          />

          <NotificationToggleRow
            title="Mute Notificators"
            subtitle="Mute all chat notifications."
            value={settings.muteNotificators}
            onValueChange={(val) => updateSetting('muteNotificators', val)}
          />

          <NotificationPickerRow
            title="Media Auto-Download"
            subtitle="Control when photos, videos and files are downloaded."
            value={settings.mediaAutoDownload}
            options={MEDIA_DOWNLOAD_OPTIONS}
            onSelect={(val) => updateSetting('mediaAutoDownload', val)}
          />
        </NotificationSection>

        {/* ── SECTION 3: THERAPIST MESSAGING ──────────────────────────── */}
        <NotificationSection title="THERAPIST MESSAGING">
          <NotificationToggleRow
            title="Therapist Availability Alerts"
            subtitle="Get notified when your therapist is available to message."
            value={settings.therapistAvailability}
            onValueChange={(val) => updateSetting('therapistAvailability', val)}
          />

          <NotificationPickerRow
            title="Quiet Hours"
            subtitle="Pause non-urgent messages during selected hours."
            value={settings.quietHours}
            options={QUIET_HOURS_OPTIONS}
            onSelect={(val) => updateSetting('quietHours', val)}
          />

          <NotificationToggleRow
            title="Priority Messages"
            subtitle="Allow urgent messages from your therapist."
            value={settings.priorityMessages}
            onValueChange={(val) => updateSetting('priorityMessages', val)}
          />

          <NotificationToggleRow
            title="Summary After Sessions"
            subtitle="Receive a summary of key points after each session."
            value={settings.summaryAfterSessions}
            onValueChange={(val) => updateSetting('summaryAfterSessions', val)}
          />

          <NotificationToggleRow
            title="New Message Alerts"
            subtitle="Get notified for new messages from your therapist."
            value={settings.newMessageAlerts}
            onValueChange={(val) => updateSetting('newMessageAlerts', val)}
          />
        </NotificationSection>
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
    paddingBottom: normalize(44),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
