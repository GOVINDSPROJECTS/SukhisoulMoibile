import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, RefreshCcw, CheckCircle2 } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ReschedulePatientCard } from '../components/ReschedulePatientCard';
import { CurrentAppointmentCard } from '../components/CurrentAppointmentCard';
import { RescheduleReasonCard } from '../components/RescheduleReasonCard';
import { PreferenceItem } from '../components/PreferenceItem';
import { WEEK_DAYS } from '@components/atoms/SelectDatePicker';

export const ReschedulingRequestScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const params = route?.params;

  const currentYear = new Date().getFullYear();
  const d0 = WEEK_DAYS[0] || { day: 'TODAY', date: new Date().getDate(), month: 'Sep', dateString: '2026-09-10' };
  const d1 = WEEK_DAYS[1] || { day: 'FRI', date: new Date().getDate() + 1, month: 'Sep', dateString: '2026-09-11' };
  const d2 = WEEK_DAYS[2] || { day: 'SAT', date: new Date().getDate() + 2, month: 'Sep', dateString: '2026-09-12' };

  const pref1Date = params?.fullDateLabel || `${d0.day}, ${d0.date} ${d0.month} ${currentYear}`;
  const pref1Time = params?.time || '06:00 PM – 07:00 PM';
  const pref1DateString = params?.dateString || d0.dateString || '2026-09-10';

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Rescheduling Request
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <ReschedulePatientCard />
        <CurrentAppointmentCard />
        <RescheduleReasonCard />

        <PreferenceItem
          label="1st Preference"
          date={pref1Date}
          time={pref1Time}
          isSelected={true}
        />

        <PreferenceItem
          label="2nd Preference"
          date={`${d1.day}, ${d1.date} ${d1.month} ${currentYear}`}
          time="11:00 AM – 12:00 PM"
        />

        <PreferenceItem
          label="3rd Preference"
          date={`${d2.day}, ${d2.date} ${d2.month} ${currentYear}`}
          time="04:00 PM – 05:00 PM"
        />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.suggestBtn}
          onPress={() => navigation.navigate('SuggestAlternativesScreen')}
          activeOpacity={0.8}
        >
          <RefreshCcw size={normalize(14)} color="#EF4444" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={styles.suggestBtnText}>
            Suggest{'\n'}Alternatives
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => navigation.navigate('ConfirmApprovalScreen', {
            bookingId: params?.bookingId,
            bookingUuid: params?.bookingUuid,
            fullDateLabel: pref1Date,
            dateString: pref1DateString,
            time: pref1Time,
          })}
          activeOpacity={0.8}
        >
          <CheckCircle2 size={normalize(14)} color="#16A34A" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={styles.approveBtnText}>
            Approve{'\n'}Request
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(20),
  },
  footerContainer: {
    flexDirection: 'row',
    padding: normalize(20),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  suggestBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightTints.redLightTint[50],
    paddingVertical: normalize(12),
    borderRadius: normalize(12),
    marginRight: normalize(12),
  },
  suggestBtnText: {
    color: colors.lightTints.redLightTint2[500],
    fontSize: normalize(11),
    textAlign: 'center',
  },
  approveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: normalize(12),
    borderRadius: normalize(12),
  },
  approveBtnText: {
    color: '#16A34A',
    fontSize: normalize(11),
    textAlign: 'center',
  },
});
