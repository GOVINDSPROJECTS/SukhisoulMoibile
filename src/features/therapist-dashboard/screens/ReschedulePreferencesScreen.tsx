import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';
import { WEEK_DAYS } from '@components/atoms/SelectDatePicker';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { PreferenceSlotCard } from '../components/reschedule/PreferenceSlotCard';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';

type RouteProps = RouteProp<RootStackParamList, 'ReschedulePreferences'>;

interface PreferenceState {
  day: number | null;
  slot: string | null;
}

const DEFAULT_DAY = WEEK_DAYS[0]?.date ?? new Date().getDate();

export const ReschedulePreferencesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { reason } = route.params;
  const insets = useSafeAreaInsets();

  const [preferences, setPreferences] = useState<[PreferenceState, PreferenceState, PreferenceState]>([
    { day: DEFAULT_DAY, slot: null },
    { day: null, slot: null },
    { day: null, slot: null },
  ]);

  // Which preference index is currently expanded (0-based)
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const updatePreference = useCallback((index: number, key: keyof PreferenceState, value: number | string) => {
    setPreferences(prev => {
      const next = [...prev] as typeof prev;
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }, []);

  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(index);
    setPreferences(prev => {
      const next = [...prev] as typeof prev;
      if (next[index].day === null) {
        next[index] = { ...next[index], day: DEFAULT_DAY };
      }
      return next;
    });
  }, []);

  // A preference is "ready" when both day and slot are selected
  const isReady = (p: PreferenceState) => p.day !== null && p.slot !== null;

  // At least 1st preference must be filled to continue
  const canContinue = isReady(preferences[0]);

  const handleContinue = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

    const filledPrefs = preferences
      .filter(isReady)
      .map(p => {
        const weekDay = WEEK_DAYS.find(d => d.date === p.day);
        const dayLabel = weekDay ? `${weekDay.day}, ${weekDay.date} ${weekDay.month}` : '';
        const fullDateLabel = weekDay ? `${weekDay.day}, ${weekDay.date} ${weekDay.month} ${currentYear}` : dayLabel;
        const dateString = weekDay?.dateString ?? `${currentYear}-${currentMonth}-${String(p.day).padStart(2, '0')}`;
        return { day: p.day!, slot: p.slot!, dayLabel, fullDateLabel, dateString };
      });

    navigation.navigate('RescheduleReview', {
      reason,
      bookingId: route.params?.bookingId,
      bookingUuid: route.params?.bookingUuid,
      preferences: filledPrefs,
    });
  }, [navigation, reason, preferences, route.params]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#ffffff' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <RescheduleHeader
        title="Reschedule Appointment"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1st Preference — always shown, starts expanded */}
        <PreferenceSlotCard
          index={1}
          isExpanded={expandedIndex === 0}
          selectedDay={preferences[0].day}
          selectedSlot={preferences[0].slot}
          onDayChange={day => updatePreference(0, 'day', day)}
          onSlotChange={slot => updatePreference(0, 'slot', slot)}
          onAdd={() => handleExpand(0)}
        />

        {/* 2nd Preference — visible after 1st is filled */}
        {(isReady(preferences[0]) || expandedIndex >= 1) && (
          <PreferenceSlotCard
            index={2}
            isExpanded={expandedIndex === 1}
            selectedDay={preferences[1].day}
            selectedSlot={preferences[1].slot}
            onDayChange={day => updatePreference(1, 'day', day)}
            onSlotChange={slot => {
              updatePreference(1, 'slot', slot);
            }}
            onAdd={() => handleExpand(1)}
          />
        )}

        {/* 3rd Preference — visible after 2nd is filled */}
        {(isReady(preferences[1]) || expandedIndex >= 2) && (
          <PreferenceSlotCard
            index={3}
            isExpanded={expandedIndex === 2}
            selectedDay={preferences[2].day}
            selectedSlot={preferences[2].slot}
            onDayChange={day => updatePreference(2, 'day', day)}
            onSlotChange={slot => updatePreference(2, 'slot', slot)}
            onAdd={() => handleExpand(2)}
          />
        )}

        <CommonContinueButton
          onPress={handleContinue}
          disabled={!canContinue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingTop: normalize(24),
    paddingBottom: normalize(40),
  },
});
