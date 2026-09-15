import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Video } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { RescheduleTherapistCard } from '../components/reschedule/RescheduleTherapistCard';
import { SessionInfoRow } from '../components/reschedule/SessionInfoRow';
import { StatusBadge } from '../components/reschedule/StatusBadge';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';
import { api } from '@api/client';

type RouteProps = RouteProp<RootStackParamList, 'AppointmentDetails'>;

export const AppointmentDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const insets = useSafeAreaInsets();
  const { data: dashboardData } = useTherapistDashboard();

  const therapist = dashboardData?.therapist;
  const nextSession = dashboardData?.nextSession;
  const progress = dashboardData?.progress;

  const params = (route.params || {}) as {
    status?: string;
    date?: string;
    time?: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  const status = params.status ?? (nextSession?.rescheduleInProgress ? 'pending_approval' : 'upcoming');
  const date = params.date ?? (nextSession as any)?.dateOnlyFormatted ?? nextSession?.dateTime ?? 'Upcoming Session';
  const time = params.time ?? ((nextSession as any)?.timeFormatted ? `${(nextSession as any).timeFormatted} • ${nextSession?.duration ?? '50 Minutes'}` : (nextSession?.dateTime ? `${nextSession.dateTime} • ${nextSession.duration ?? '50 Minutes'}` : 'Scheduled Time'));
  const sessionPurpose = progress?.planName ?? 'Individual Therapy Session';

  const isRescheduled = status === 'rescheduled';
  const isPendingApproval = status === 'pending_approval';

  const handleJoinVideo = useCallback(async () => {
    const sessionUuid = (nextSession as any)?.session_uuid;
    const directRoomUrl = (nextSession as any)?.room_url || (nextSession as any)?.daily_room_url;

    if (sessionUuid) {
      try {
        const res = await api.post(`/v1/sessions/${sessionUuid}/join`);
        const joinUrl = res.data?.data?.join_url || res.data?.data?.room_url || directRoomUrl;
        if (joinUrl) {
          navigation.navigate('VideoCall', {
            roomUrl: joinUrl,
            therapistName: therapist?.name ?? 'Your Therapist',
            sessionUuid,
          });
          return;
        }
      } catch (err) {
        console.warn('Could not call join API, falling back to direct room URL', err);
      }
    }

    if (directRoomUrl) {
      navigation.navigate('VideoCall', {
        roomUrl: directRoomUrl,
        therapistName: therapist?.name ?? 'Your Therapist',
        sessionUuid,
      });
      return;
    }

    Alert.alert(
      'Session Room Preparing',
      'Your session room is being prepared. Please make sure your booking is confirmed.'
    );
  }, [nextSession, therapist?.name, navigation]);

  const handleReschedule = useCallback(() => {
    navigation.navigate('RescheduleSession', {
      bookingId: params.bookingId ?? (nextSession?.id ? Number(nextSession.id) : undefined),
      bookingUuid: params.bookingUuid ?? nextSession?.uuid,
    });
  }, [navigation, params, nextSession]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.appThemeColor[75] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <RescheduleHeader
        title="Appointment Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Therapist Card with status */}
        <RescheduleTherapistCard
          name={therapist?.name}
          designation={therapist?.designation}
          experience={therapist?.experience}
          imageUrl={therapist?.imageUrl}
          date={date}
          time={time}
          status={isRescheduled ? 'rescheduled' : (isPendingApproval ? 'pending_approval' : 'upcoming')}
        />

        {/* Session Purpose Card */}
        <View style={styles.card}>
          <AppText variant="caption" family='secondary' weight="semiBold" style={styles.purposeLabel}>
            SESSION PURPOSE
          </AppText>
          <AppText variant="body" family='secondary' weight="bold" style={styles.purposeValue}>
            {sessionPurpose}
          </AppText>
        </View>

        {/* Reschedule Status Card */}
        {(isPendingApproval || isRescheduled) && (
          <View style={[styles.card, isRescheduled ? styles.isRescheduled : styles.isPendingApproval]}>
            <AppText style={[isPendingApproval ? styles.show : styles.hide, { color: 'rgba(217,119,6,0.7)', fontSize: normalize(12), textTransform: 'uppercase' }]}>Reschedule STATUS</AppText>
            <View style={styles.badgeRow}>
              <StatusBadge
                status={isRescheduled ? 'approved' : 'pending'}
                label={isRescheduled ? 'This appointment is rescheduled.' : 'Pending Therapist Approval'}
              />
            </View>
          </View>
        )}

        <View style={{ marginTop: normalize(8), gap: normalize(10) }}>
          <CommonContinueButton
            label="Join Therapy Video Call"
            onPress={handleJoinVideo}
          />
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleReschedule}
            style={styles.rescheduleBtn}
          >
            <AppText variant="body" weight="bold" style={styles.rescheduleBtnText}>
              Reschedule Session
            </AppText>
          </TouchableOpacity>
        </View>

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
  show: {
    display: 'flex'
  },
  hide: { display: 'none' },
  scrollContent: {
    paddingHorizontal: normalize(0),
    paddingTop: normalize(16),
    paddingBottom: normalize(40),
    gap: normalize(12),
  },
  card: {
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(16),
    marginHorizontal: normalize(20),
    marginTop: normalize(10),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(18),
    overflow: 'hidden',
  },
  purposeLabel: {
    color: "#718096",
    fontSize: normalize(10),
    letterSpacing: 0.6,
    marginBottom: normalize(4),
  },
  purposeValue: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  rescheduleStatusLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: 0.6,
    marginBottom: normalize(8),
  },
  badgeRow: {
    flexDirection: 'row',
  },
  rescheduledNote: {
    backgroundColor: colors.lightTints.greenLightTint[50],
    borderRadius: normalize(10),
    padding: normalize(12),
    borderWidth: 1,
    borderColor: colors.lightTints.greenLightTint[200],
  },
  rescheduledNoteText: {
    color: colors.green[700],
    fontSize: normalize(12),
  },
  isRescheduled: {
    backgroundColor: "#E8F5E9",
    borderWidth: normalize(1),
    borderColor: '#C8E6C9'
  },
  isPendingApproval: {
    backgroundColor: "#FFF9EF",
    borderWidth: normalize(1),
    borderColor: 'rgba(254,243,199,0.50)'
  },
  rescheduleBtn: {
    marginHorizontal: normalize(20),
    paddingVertical: normalize(14),
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.typographyColor.White,
  },
  rescheduleBtnText: {
    color: colors.blue[600],
    fontSize: normalize(15),
  },
});
