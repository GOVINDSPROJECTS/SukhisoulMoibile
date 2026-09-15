import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { PreferenceReviewItem } from '../components/reschedule/PreferenceReviewItem';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';

import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../../api/client';

type RouteProps = RouteProp<RootStackParamList, 'RescheduleReview'>;

const getTimeRange = (slot: string): string => {
  const TIME_RANGE_MAP: Record<string, string> = {
    '09:00 AM': '09:00 AM – 10:00 AM',
    '10:00 AM': '10:00 AM – 11:00 AM',
    '11:00 AM': '11:00 AM – 12:00 PM',
    '12:00 PM': '12:00 PM – 01:00 PM',
    '01:00 PM': '01:00 PM – 02:00 PM',
    '02:00 PM': '02:00 PM – 03:00 PM',
    '03:00 PM': '03:00 PM – 04:00 PM',
    '04:00 PM': '04:00 PM – 05:00 PM',
    '05:00 PM': '05:00 PM – 06:00 PM',
    '06:00 PM': '06:00 PM – 07:00 PM',
    '07:00 PM': '07:00 PM – 08:00 PM',
  };
  return TIME_RANGE_MAP[slot] ?? slot;
};

export const RescheduleReviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { preferences, reason, bookingId, bookingUuid } = route.params;
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const handleChange = useCallback(() => {
    navigation.navigate('ReschedulePreferences', {
      reason,
      bookingId,
      bookingUuid,
    });
  }, [navigation, reason, bookingId, bookingUuid]);

  const handleContinue = useCallback(async () => {
    const firstPref = preferences[0];

    try {
      await api.post('/v1/bookings/request-reschedule', {
        booking_id: bookingId,
        booking_uuid: bookingUuid,
        reason,
        preferences,
      });
      queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
    } catch (e) {
      console.log('[RescheduleReview] Reschedule API sync note:', e);
    }

    navigation.navigate('RescheduleStatus', {
      status: 'pending',
      date: firstPref?.fullDateLabel ?? firstPref?.dayLabel ?? 'Upcoming Date',
      time: firstPref ? getTimeRange(firstPref.slot) : '10:00 AM – 11:00 AM',
      bookingId,
      bookingUuid,
    });
  }, [navigation, preferences, reason, bookingId, bookingUuid, queryClient]);

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
      >
        {/* Title */}
        <AppText variant="h4" weight="extraBold" style={styles.title}>
          Review Preferences
        </AppText>
        <AppText variant="caption" weight="medium" style={styles.subtitle}>
          Review and change preference
        </AppText>

        {/* Preference review items */}
        {preferences.map((pref, idx) => {
          const displayDate = pref.fullDateLabel || pref.dayLabel || 'Selected Date';
          return (
            <PreferenceReviewItem
              key={idx}
              index={(idx + 1) as 1 | 2 | 3}
              date={displayDate}
              time={getTimeRange(pref.slot)}
              onChange={handleChange}
            />
          );
        })}

        {/* Pad to 3 items if fewer were filled */}
        {preferences.length < 2 && (
          <PreferenceReviewItem
            index={2}
            date="—"
            time="—"
            onChange={handleChange}
          />
        )}
        {preferences.length < 3 && (
          <PreferenceReviewItem
            index={3}
            date="—"
            time="—"
            onChange={handleChange}
          />
        )}

        <CommonContinueButton onPress={handleContinue} />
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
    paddingHorizontal: normalize(25),
    paddingTop: normalize(25),
    paddingBottom: normalize(40),
  },
  title: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
    marginBottom: normalize(0),
  },
  subtitle: {
    color: "#6B7A99",
    fontSize: normalize(12),
    marginBottom: normalize(18),
  },
});
