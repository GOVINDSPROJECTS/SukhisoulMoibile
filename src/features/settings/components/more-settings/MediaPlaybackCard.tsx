import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Play, Music, ChevronRight, Check } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { AnimatedToggleSwitch } from './AnimatedToggleSwitch';
import { fetchUserProfile, updateUserPreferences } from '../../../../api/userProfile';

const MEDIA_PLAYBACK_STORAGE_KEY = '@sukhisoul_media_playback_settings';

export interface MediaPlaybackState {
  videoMobileData: boolean;
  videoWifi: boolean;
  videoQuality: string;
  muteVideos: boolean;
  audioMobileData: boolean;
  audioWifi: boolean;
  audioQuality: string;
  backgroundPlayback: boolean;
}

const DEFAULT_MEDIA_PLAYBACK_SETTINGS: MediaPlaybackState = {
  videoMobileData: true,
  videoWifi: true,
  videoQuality: 'Auto (Recommended)',
  muteVideos: false,
  audioMobileData: false,
  audioWifi: true,
  audioQuality: 'High',
  backgroundPlayback: true,
};

const VIDEO_QUALITY_OPTIONS = [
  'Auto (Recommended)',
  '1080p (Full HD)',
  '720p (HD)',
  '480p (Data Saver)',
];

const AUDIO_QUALITY_OPTIONS = [
  'High',
  'Standard',
  'Low',
];

export const MediaPlaybackCard: React.FC = () => {
  // ── Unified Media Playback State ──────────────────────────────────────
  const [settings, setSettings] = useState<MediaPlaybackState>(DEFAULT_MEDIA_PLAYBACK_SETTINGS);

  // ── Quality Selection Modal States ────────────────────────────────────
  const [pickerType, setPickerType] = useState<'video' | 'audio' | null>(null);

  // ── Load Saved Settings ───────────────────────────────────────────────
  const loadSavedSettings = useCallback(async () => {
    try {
      // 1. Instantly load from local storage
      const cached = await AsyncStorage.getItem(MEDIA_PLAYBACK_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object') {
            setSettings((prev) => ({ ...prev, ...parsed }));
          }
        } catch (e) {
          console.log('[Media Playback] Error parsing cache:', e);
        }
      }

      // 2. Sync with backend user preferences if available
      try {
        const userProfile = await fetchUserProfile();
        const serverSettings = (userProfile?.preference as any)?.media_playback_settings;
        if (serverSettings && typeof serverSettings === 'object') {
          setSettings((prev) => {
            const merged = { ...prev, ...serverSettings };
            AsyncStorage.setItem(MEDIA_PLAYBACK_STORAGE_KEY, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (apiErr) {
        console.log('[Media Playback] Could not fetch server preferences, using local storage:', apiErr);
      }
    } catch (err) {
      console.log('[Media Playback] Error loading settings:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedSettings();
    }, [loadSavedSettings])
  );

  // ── Update Single Setting Helper ───────────────────────────────────────
  const updateSetting = useCallback((key: keyof MediaPlaybackState, value: any) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      // 1. Save immediately to local device storage
      AsyncStorage.setItem(MEDIA_PLAYBACK_STORAGE_KEY, JSON.stringify(updated)).catch((err) => {
        console.log('[Media Playback] Error saving to AsyncStorage:', err);
      });

      // 2. Sync to backend API
      updateUserPreferences({ media_playback_settings: updated }).catch((err) => {
        console.log('[Media Playback] Error syncing to backend:', err);
      });

      return updated;
    });
  }, []);

  const toggleVideoMobileData = useCallback((value: boolean) => {
    console.log(`[Media Playback] Video Autoplay on Mobile Data: ${value ? 'ON' : 'OFF'}`);
    updateSetting('videoMobileData', value);
  }, [updateSetting]);

  const toggleVideoWifi = useCallback((value: boolean) => {
    console.log(`[Media Playback] Video Autoplay on WiFi: ${value ? 'ON' : 'OFF'}`);
    updateSetting('videoWifi', value);
  }, [updateSetting]);

  const toggleMuteVideos = useCallback((value: boolean) => {
    console.log(`[Media Playback] Mute Videos by Default: ${value ? 'ON' : 'OFF'}`);
    updateSetting('muteVideos', value);
  }, [updateSetting]);

  const toggleAudioMobileData = useCallback((value: boolean) => {
    console.log(`[Media Playback] Audio Autoplay on Mobile Data: ${value ? 'ON' : 'OFF'}`);
    updateSetting('audioMobileData', value);
  }, [updateSetting]);

  const toggleAudioWifi = useCallback((value: boolean) => {
    console.log(`[Media Playback] Audio Autoplay on WiFi: ${value ? 'ON' : 'OFF'}`);
    updateSetting('audioWifi', value);
  }, [updateSetting]);

  const toggleBackgroundPlayback = useCallback((value: boolean) => {
    console.log(`[Media Playback] Background Playback: ${value ? 'ON' : 'OFF'}`);
    updateSetting('backgroundPlayback', value);
  }, [updateSetting]);

  const handleSelectQuality = useCallback((quality: string) => {
    if (pickerType === 'video') {
      console.log(`[Media Playback] Video Quality changed to: ${quality}`);
      updateSetting('videoQuality', quality);
    } else if (pickerType === 'audio') {
      console.log(`[Media Playback] Audio Quality changed to: ${quality}`);
      updateSetting('audioQuality', quality);
    }
    setPickerType(null);
  }, [pickerType, updateSetting]);

  const activeOptions =
    pickerType === 'video' ? VIDEO_QUALITY_OPTIONS : AUDIO_QUALITY_OPTIONS;
  const currentSelected =
    pickerType === 'video' ? settings.videoQuality : settings.audioQuality;
  const modalTitle =
    pickerType === 'video' ? 'Select Video Quality' : 'Select Audio Quality';

  return (
    <View style={styles.container}>
      {/* Section Label */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Light}
      >
        MEDIA PLAYBACK
      </AppText>

      {/* Main Card */}
      <View style={styles.card}>
        {/* ── 1. Video Playback ───────────────────────────────────────── */}
        <View style={styles.subSection}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Play
                size={normalize(15)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                fill={colors.typographyColor['Dark 2'] || '#003CA3'}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.subSectionTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              Video Playback
            </AppText>
          </View>

          {/* Autoplay on Mobile Data */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleVideoMobileData(!settings.videoMobileData)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Autoplay on Mobile Data
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.videoMobileData}
                onValueChange={toggleVideoMobileData}
              />
            </View>
          </TouchableOpacity>

          {/* Autoplay on WiFi */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleVideoWifi(!settings.videoWifi)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Autoplay on WiFi
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.videoWifi}
                onValueChange={toggleVideoWifi}
              />
            </View>
          </TouchableOpacity>

          {/* Video Quality */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.7}
            onPress={() => setPickerType('video')}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Video Quality
            </AppText>
            <View style={styles.pickerTrigger}>
              <AppText
                weight="medium"
                family="primary"
                style={styles.pickerValue}
                color="#3B82F6"
              >
                {settings.videoQuality}
              </AppText>
              <ChevronRight
                size={normalize(16)}
                color={colors.typographyColor.Light}
                strokeWidth={2}
              />
            </View>
          </TouchableOpacity>

          {/* Mute Videos by Default */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleMuteVideos(!settings.muteVideos)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Mute Videos by Default
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.muteVideos}
                onValueChange={toggleMuteVideos}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* ── 2. Audio Playback ───────────────────────────────────────── */}
        <View style={styles.subSection}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Music
                size={normalize(17)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.subSectionTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              Audio Playback
            </AppText>
          </View>

          {/* Autoplay on Mobile Data */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleAudioMobileData(!settings.audioMobileData)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Autoplay on Mobile Data
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.audioMobileData}
                onValueChange={toggleAudioMobileData}
              />
            </View>
          </TouchableOpacity>

          {/* Autoplay on WiFi */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleAudioWifi(!settings.audioWifi)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Autoplay on WiFi
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.audioWifi}
                onValueChange={toggleAudioWifi}
              />
            </View>
          </TouchableOpacity>

          {/* Audio Quality */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.7}
            onPress={() => setPickerType('audio')}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Audio Quality
            </AppText>
            <View style={styles.pickerTrigger}>
              <AppText
                weight="medium"
                family="primary"
                style={styles.pickerValue}
                color="#3B82F6"
              >
                {settings.audioQuality}
              </AppText>
              <ChevronRight
                size={normalize(16)}
                color={colors.typographyColor.Light}
                strokeWidth={2}
              />
            </View>
          </TouchableOpacity>

          {/* Background Playback */}
          <TouchableOpacity
            style={styles.controlRow}
            activeOpacity={0.75}
            onPress={() => toggleBackgroundPlayback(!settings.backgroundPlayback)}
          >
            <AppText
              weight="regular"
              family="secondary"
              style={styles.controlLabel}
              color={colors.typographyColor.Light}
            >
              Background Playback
            </AppText>
            <View pointerEvents="none">
              <AnimatedToggleSwitch
                value={settings.backgroundPlayback}
                onValueChange={toggleBackgroundPlayback}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Quality Selection Modal ────────────────────────────────────── */}
      <Modal
        visible={pickerType !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerType(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPickerType(null)}
        >
          <View style={styles.modalCard}>
            <AppText
              weight="bold"
              family="primary"
              style={styles.modalTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              {modalTitle}
            </AppText>

            {activeOptions.map((opt) => {
              const isSelected = opt === currentSelected;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.modalOption,
                    isSelected && styles.modalOptionSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleSelectQuality(opt)}
                >
                  <AppText
                    weight={isSelected ? 'bold' : 'regular'}
                    family="secondary"
                    style={styles.optionText}
                    color={isSelected ? '#2563EB' : '#1E293B'}
                  >
                    {opt}
                  </AppText>
                  {isSelected ? (
                    <Check
                      size={normalize(18)}
                      color={colors.typographyColor['Dark 2'] || '#003CA3'}
                      strokeWidth={2.5}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
    marginBottom: normalize(8),
    paddingHorizontal: normalize(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(0),
  },
  subSection: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(10)
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(14),
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subSectionTitle: {
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(11),
  },
  controlLabel: {
    fontSize: normalize(13.5),
  },
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  pickerValue: {
    fontSize: normalize(12.5),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: normalize(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(24),
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    padding: normalize(20),
    width: '100%',
    maxWidth: normalize(320),
  },
  modalTitle: {
    fontSize: normalize(16),
    marginBottom: normalize(16),
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
    marginBottom: normalize(4),
  },
  modalOptionSelected: {
    backgroundColor: colors.blue[50],
  },
  optionText: {
    fontSize: normalize(14),
  },
});
