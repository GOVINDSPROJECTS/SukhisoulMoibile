import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { StatusBadge } from '../components/reschedule/StatusBadge';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

type RouteProps = RouteProp<RootStackParamList, 'RescheduleStatus'>;

export const RescheduleStatusScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { data: dashboardData } = useTherapistDashboard();
  const therapistName = dashboardData?.therapist?.name;
  const { status, date = 'Selected Date', time = '10:00 AM – 11:00 AM', bookingId, bookingUuid } = route.params;
  const insets = useSafeAreaInsets();
  const isPending = status === 'pending';

  const handleAction = useCallback(() => {
    if (isPending) {
      // View appointment details
      navigation.navigate('AppointmentDetails', {
        status: 'pending_approval', //// pending_approval | rescheduled
        date,
        time,
        bookingId,
        bookingUuid,
      });

    } else {
      // View appointment details
      navigation.navigate('AppointmentDetails', {
        status: 'rescheduled',  //// pending_approval | rescheduled
        date,
        time,
        bookingId,
        bookingUuid,
      });
    }
  }, [isPending, navigation, date, time, bookingId, bookingUuid]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#ffffff' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <RescheduleHeader
        title="Appointment Status"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          {isPending ? (
            /* Hourglass visual */
            <View style={styles.iconCircle}>
              <Image
                source={require('../assets/pending.png')}
                style={styles.iconImg}
              />
            </View>
          ) : (
            /* Rescheduled blob visual */
            <View style={styles.blobCircle}>
              <Image
                source={require('../assets/rescheduled.png')}
                style={[styles.iconImg, { width: normalize(100), height: normalize(100) }]}
              />
            </View>
          )}
        </View>

        {/* Title */}
        <AppText variant="h3" weight="extraBold" style={styles.title} center>
          {isPending ? 'Request Submitted!' : 'Appointment\nRescheduled!'}
        </AppText>

        {/* Subtitle */}
        <AppText variant="body" weight="regular" style={styles.subtitle} center>
          {isPending
            ? `Your reschedule request has been sent to ${therapistName ? therapistName + "'s Care" : 'your therapist'}.`
            : 'Your appointment has been successfully rescheduled.'}
        </AppText>

        {/* Status badge for pending */}
        {isPending && (
          <View style={styles.statusBadgeWrap}>
            <AppText variant="caption" weight="semiBold" style={styles.statusLabel}>
              STATUS
            </AppText>
            <StatusBadge status="pending" />
          </View>
        )}
        {isPending && (
          <AppText variant="caption" family='secondary' weight="regular" style={styles.statusNote}>
            We will notify you once your request is reviewed.
          </AppText>
        )}


        {/* New date / time for rescheduled state */}
        {!isPending && (
          <View style={styles.dateCard}>
            <View style={styles.dateRow}>
              <View style={styles.iconBox}>
                <Calendar size={normalize(20)} color={colors.lightAppTheme[700]} strokeWidth={2} />
              </View>
              <AppText variant="body" family='secondary' weight="semiBold" style={styles.dateText}>
                {date}
              </AppText>
            </View>
            <View style={styles.dateRow}>
              <View style={styles.iconBox}>
                <Clock size={normalize(20)} color={colors.lightAppTheme[700]} strokeWidth={2} />
              </View>
              <AppText variant="body" family='secondary' weight="semiBold" style={styles.dateText}>
                {time}
              </AppText>
            </View>
          </View>
        )}

        <CommonContinueButton
          label={isPending ? 'Go to appointments' : 'View appointment'}
          onPress={handleAction}
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
    paddingHorizontal: normalize(25),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
    alignItems: 'center',
  },
  illustrationWrap: {
    marginBottom: normalize(32),
    marginTop: normalize(50)
  },
  iconCircle: {
    width: normalize(90),
    height: normalize(90),
    borderRadius: normalize(99),
    backgroundColor: colors.lightTints.yellowLightTint[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImg: {
    width: normalize(100),
    height: normalize(100)
  },
  hourglassEmoji: {
    fontSize: normalize(40),
  },
  blobCircle: {
    width: normalize(100),
    height: normalize(100),
    // borderRadius: normalize(55),
    // backgroundColor: colors.lightTints.blueLightTint[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  blobEmoji: {
    fontSize: normalize(48),
  },
  title: {
    color: "#1E293B",
    fontSize: normalize(22),
    textAlign: 'center',
    marginBottom: normalize(10),
  },
  subtitle: {
    color: "#64748B",
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(20),
    lineHeight: normalize(20),
    paddingHorizontal: normalize(10),
  },
  statusBadgeWrap: {
    width: '100%',
    backgroundColor: '#FFF9EF',
    borderRadius: normalize(16),
    padding: normalize(24),
    marginBottom: normalize(20),
    gap: normalize(8),
  },
  statusLabel: {
    color: "#D97706",
    fontSize: normalize(11),
    letterSpacing: 0.5,
  },
  statusNote: {
    color: "#94A3B8",
    fontSize: normalize(13),
    lineHeight: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: normalize(10),
    marginBottom: normalize(15)
  },
  dateCard: {
    width: '100%',
    backgroundColor: '#F3F7FF',
    borderRadius: normalize(16),
    padding: normalize(24),
    marginBottom: normalize(20),
    gap: normalize(16),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  dateText: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(11.5),
  },
  iconBox: {
    backgroundColor: '#FFFFFF',
    padding: normalize(6),
    borderRadius: normalize(8),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    width: normalize(36),
    height: normalize(36),
    justifyContent: 'center',
    alignItems: 'center'
  },
});
