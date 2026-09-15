import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CalendarClock } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { NewOptionItem } from '../components/reschedule/NewOptionItem';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../../api/client';
import { WEEK_DAYS } from '@components/atoms/SelectDatePicker';

interface TherapistOption {
  index: 1 | 2 | 3;
  date: string;
  time: string;
  dateString?: string;
}

const year = new Date().getFullYear();
const d1 = WEEK_DAYS[1] || WEEK_DAYS[0];
const d2 = WEEK_DAYS[2] || WEEK_DAYS[0];
const d3 = WEEK_DAYS[3] || WEEK_DAYS[0];

const THERAPIST_OPTIONS: TherapistOption[] = [
  { index: 1, date: `${d1.day}, ${d1.date} ${d1.month} ${year}`, time: '10:00 AM – 11:00 AM', dateString: d1.dateString },
  { index: 2, date: `${d2.day}, ${d2.date} ${d2.month} ${year}`, time: '04:00 PM – 05:00 PM', dateString: d2.dateString },
  { index: 3, date: `${d3.day}, ${d3.date} ${d3.month} ${year}`, time: '11:00 AM – 12:00 PM', dateString: d3.dateString },
];

export const RescheduleNewOptionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleChoose = useCallback(async () => {
    const chosen = THERAPIST_OPTIONS[selectedOption - 1];
    try {
      await api.post('/v1/bookings/reschedule', {
        booking_id: route?.params?.bookingId,
        booking_uuid: route?.params?.bookingUuid,
        new_date: chosen.dateString || new Date().toISOString().split('T')[0],
        new_time: chosen.time,
      });
      queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
    } catch (e) {
      console.log('[RescheduleNewOptions] Error confirming alternative option:', e);
    }
    navigation.navigate('RescheduleStatus', {
      status: 'rescheduled',
      date: chosen.date,
      time: chosen.time,
    });
  }, [navigation, selectedOption, queryClient, route?.params]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#ffffff' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <RescheduleHeader
        title={showOptions ? 'Reschedule Appointment' : 'Appointment Status'}
        onBack={() => {
          if (showOptions) {
            setShowOptions(false);
          } else {
            navigation.goBack();
          }
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!showOptions ? (
          /* ── View 1: Info card ── */
          <View style={styles.grayCard}>
            <View style={styles.infoCard}>
              {/* Icon */}
              <View style={styles.iconWrap}>
                <View>
                  <Image source={require('../assets/calendar.png')} style={styles.iconCircleImg} />
                </View>
              </View>

              {/* Title */}
              <AppText variant="h3" family='secondary' weight="extraBold" style={styles.title} center>
                New Options Available
              </AppText>

              {/* Description */}
              <AppText variant="body" family='secondary' weight="regular" style={styles.description} center>
                Dr. Ananya's Care is not available at your preferred times.{'\n'}{'\n'}
                Please choose from the alternative slots below.
              </AppText>

              {/* View Options button */}
              <TouchableOpacity
                onPress={() => setShowOptions(true)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.viewOptionsBtn}
                >
                  <AppText variant="body" weight="semiBold" style={styles.viewOptionsBtnText}>
                    View Options
                  </AppText>
                </LinearGradient>

              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ── View 2: Options list ── */
          <View>
            <AppText variant="body" family='secondary' weight="medium" style={styles.selectLabel}>
              Please select a new time that works for you.
            </AppText>

            <View style={styles.optionsList}>
              {THERAPIST_OPTIONS.map((opt) => (
                <NewOptionItem
                  key={opt.index}
                  index={opt.index}
                  date={opt.date}
                  time={opt.time}
                  selected={selectedOption === opt.index}
                  onSelect={() => setSelectedOption(opt.index)}
                />
              ))}
            </View>
            <View style={{ marginTop: normalize(80) }}>
              <CommonContinueButton
                label="Choose Option"
                onPress={handleChoose}
              />
            </View>
          </View>
        )}
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
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(40),
  },

  grayCard: {
    backgroundColor: '#F8F9FF',
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
    borderRadius: normalize(40),
    paddingVertical: normalize(60),
    paddingHorizontal: normalize(24),
    marginTop: normalize(50)
  },

  /* ── Info card (View 1) ── */
  infoCard: {
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(32),
    padding: normalize(28),
    alignItems: 'center',
    marginTop: normalize(10),
    boxShadow: '0px 4px 20px rgba(74, 144, 226, 0.08)',
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: normalize(18),
  },
  iconCircleImg: {
    width: normalize(100),
    height: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#1E293B",
    fontSize: normalize(20),
    textAlign: 'center',
    marginBottom: normalize(10),
  },
  description: {
    color: "#64748B",
    fontSize: normalize(12),
    textAlign: 'center',
    lineHeight: normalize(20),
    marginBottom: normalize(28),
  },
  viewOptionsBtn: {
    backgroundColor: colors.lightAppTheme[700],
    borderRadius: normalize(30),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(48),
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: normalize(10)
  },
  viewOptionsBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },

  /* ── Options list (View 2) ── */
  selectLabel: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(13.5),
    lineHeight: normalize(20),
    marginBottom: normalize(18),
  },
  optionsList: {
    marginBottom: normalize(8),
  },
});
