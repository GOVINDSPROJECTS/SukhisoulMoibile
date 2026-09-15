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
import {
  PermissionSection,
  type PermissionSectionItem,
} from '../components/general-settings/PermissionSection';
import { PermissionPickerModal } from '../components/general-settings/PermissionPickerModal';
import type { PermissionLevel } from '../components/general-settings/PermissionRowItem';
import { fetchUserProfile, updateUserPreferences } from '../../../api/userProfile';

const GENERAL_PERMISSIONS_STORAGE_KEY = '@sukhisoul_general_permissions';

const DEFAULT_PERMISSIONS: Record<string, PermissionLevel> = {
  // Camera
  cameraAccess: 'Allow',
  cameraVideoCalls: 'Allow',
  cameraUploads: 'Ask Every Time',

  // Microphone
  micAccess: 'Allow',
  micCalls: 'Allow',
  micRecordings: 'Ask Every Time',

  // Phone / Health
  healthAccess: 'Allow',
  stepsActivity: 'Allow',
  sleepData: 'Ask Every Time',
  moodData: 'Allow',

  // Contacts
  contactsAccess: 'Allow',
  findContacts: 'Allow',
  syncTherapist: 'Ask Every Time',
};

export const GeneralSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  // ── Permission States ─────────────────────────────────────────────────
  const [permissions, setPermissions] = useState<Record<string, PermissionLevel>>(DEFAULT_PERMISSIONS);

  // Modal active state
  const [activeItem, setActiveItem] = useState<PermissionSectionItem | null>(null);

  const loadSavedPermissions = useCallback(async () => {
    try {
      // 1. Instantly load from local storage
      const cached = await AsyncStorage.getItem(GENERAL_PERMISSIONS_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object') {
            setPermissions((prev) => ({ ...prev, ...parsed }));
          }
        } catch (e) {
          console.log('[General Settings] Error parsing cached permissions:', e);
        }
      }

      // 2. Sync with backend user preferences if available
      try {
        const userProfile = await fetchUserProfile();
        const serverPerms = (userProfile?.preference as any)?.general_permissions;
        if (serverPerms && typeof serverPerms === 'object') {
          setPermissions((prev) => {
            const merged = { ...prev, ...serverPerms };
            AsyncStorage.setItem(GENERAL_PERMISSIONS_STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (apiErr) {
        console.log('[General Settings] Could not fetch server preferences, using local storage:', apiErr);
      }
    } catch (err) {
      console.log('[General Settings] Error loading permissions:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedPermissions();
    }, [loadSavedPermissions])
  );

  const handleBack = useCallback(() => {
    console.log('[General Settings] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleItemPress = useCallback((item: PermissionSectionItem) => {
    console.log(`[General Settings] Opening permission modal for: ${item.label}`);
    setActiveItem(item);
  }, []);

  const handleSelectOption = useCallback((option: PermissionLevel) => {
    if (!activeItem) return;
    const itemId = activeItem.id;
    setPermissions((prev) => {
      const updated = {
        ...prev,
        [itemId]: option,
      };

      // 1. Immediately persist to AsyncStorage
      AsyncStorage.setItem(GENERAL_PERMISSIONS_STORAGE_KEY, JSON.stringify(updated)).catch((err) => {
        console.log('[General Settings] Error saving to AsyncStorage:', err);
      });

      // 2. Sync to backend user preferences
      updateUserPreferences({ general_permissions: updated }).catch((err) => {
        console.log('[General Settings] Error syncing to backend preferences:', err);
      });

      return updated;
    });
  }, [activeItem]);

  // ── Sections Configuration ───────────────────────────────────────────
  const cameraItems: PermissionSectionItem[] = [
    { id: 'cameraAccess', label: 'Camera Access', value: permissions.cameraAccess },
    { id: 'cameraVideoCalls', label: 'Use Camera for Video Calls', value: permissions.cameraVideoCalls },
    { id: 'cameraUploads', label: 'Use Camera for Uploads', value: permissions.cameraUploads },
  ];

  const microphoneItems: PermissionSectionItem[] = [
    { id: 'micAccess', label: 'Microphone Access', value: permissions.micAccess },
    { id: 'micCalls', label: 'Use Microphone for Calls', value: permissions.micCalls },
    { id: 'micRecordings', label: 'Use Microphone for Recordings', value: permissions.micRecordings },
  ];

  const phoneItems: PermissionSectionItem[] = [
    { id: 'healthAccess', label: 'Health Data Access', value: permissions.healthAccess },
    { id: 'stepsActivity', label: 'Steps & Activity', value: permissions.stepsActivity },
    { id: 'sleepData', label: 'Sleep Data', value: permissions.sleepData },
    { id: 'moodData', label: 'Mood & Mindfulness Data', value: permissions.moodData },
  ];

  const contactItems: PermissionSectionItem[] = [
    { id: 'contactsAccess', label: 'Contacts Access', value: permissions.contactsAccess },
    { id: 'findContacts', label: 'Find Contacts on App', value: permissions.findContacts },
    { id: 'syncTherapist', label: 'Sync Therapist Contact', value: permissions.syncTherapist },
  ];

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
          title="General Settings"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Scrollable Content ────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Camera Permissions */}
        <PermissionSection
          title="CAMERA PERMISSIONS"
          items={cameraItems}
          onItemPress={handleItemPress}
        />

        {/* 2. Microphone Permissions */}
        <PermissionSection
          title="MICROPHONE PERMISSIONS"
          items={microphoneItems}
          onItemPress={handleItemPress}
        />

        {/* 3. Phone Permissions */}
        <PermissionSection
          title="PHONE PERMISSIONS"
          items={phoneItems}
          onItemPress={handleItemPress}
        />

        {/* 4. Contact Permissions */}
        <PermissionSection
          title="CONTACT PERMISSIONS"
          items={contactItems}
          onItemPress={handleItemPress}
        />
      </ScrollView>

      {/* Permission Options Selection Modal */}
      {activeItem ? (
        <PermissionPickerModal
          visible={activeItem !== null}
          permissionLabel={activeItem.label}
          currentValue={permissions[activeItem.id] || activeItem.value}
          onClose={() => setActiveItem(null)}
          onSelect={handleSelectOption}
        />
      ) : null}
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
    paddingTop: normalize(16),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
});
