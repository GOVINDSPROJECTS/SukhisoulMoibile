import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BadgeCheck, Calendar, Clock, MapPin, Verified } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { TherapistCardTopInfo } from '../TherapistCardTopInfo';
import { SessionInfoRow } from './SessionInfoRow';
import { useTherapistDashboard } from '../../hooks/useTherapistDashboard';

export interface RescheduleTherapistCardProps {
  name?: string;
  designation?: string;
  experience?: string;
  imageUrl?: string;
  date?: string;
  time?: string;
  sessionType?: string;
  status?: 'upcoming' | 'rescheduled' | 'pending_approval';
}

export const RescheduleTherapistCard: React.FC<RescheduleTherapistCardProps> = ({
  name,
  designation,
  experience,
  imageUrl,
  date,
  time,
  sessionType,
  status,
}) => {
  const { data: dashboardData } = useTherapistDashboard();
  const therapist = dashboardData?.therapist;
  const nextSession = dashboardData?.nextSession;

  const doctorName = name ?? therapist?.name ?? 'Dr. Sameer Joshi';
  const doctorDesignation = designation ?? therapist?.designation ?? 'Sleep Disorders • Anxiety Support';
  const doctorExperience = experience ?? therapist?.experience ?? '10+ Years Experience';
  const doctorImage = imageUrl ?? therapist?.imageUrl;

  const sessionDate = date ?? (nextSession as any)?.dateOnlyFormatted ?? nextSession?.dateTime ?? 'Upcoming Session';
  const sessionTime = time ?? ((nextSession as any)?.timeFormatted ? `${(nextSession as any).timeFormatted} • ${nextSession?.duration ?? '50 Minutes'}` : (nextSession?.dateTime ? `${nextSession.dateTime} • ${nextSession.duration ?? '50 Minutes'}` : 'Scheduled Time'));
  const sessionLocation = sessionType ?? nextSession?.sessionType ?? 'Online Video Session';

  return (
    <View style={styles.card}>
      {/* Profile Row */}
      <TherapistCardTopInfo
        name={doctorName}
        designation={doctorDesignation}
        experience={doctorExperience}
        imageUrl={doctorImage}
      />

      {status != null && (
        <View style={[
          styles.statusBadge,
          status === 'rescheduled' && styles.statusRescheduled,
          status === 'upcoming' && styles.statusUpcoming,
        ]}>
          <AppText variant="caption" weight="semiBold" style={[
            styles.statusText,
            status === 'rescheduled' && styles.statusTextRescheduled,
            status === 'upcoming' && styles.statusTextUpcoming,
          ]}>
            {status === 'rescheduled' ? 'Rescheduled' : 'Upcoming'}
          </AppText>
        </View>
      )}

      {/* Session Info Card */}
      <SessionInfoRow
        icon={<Calendar size={normalize(15)} color={"#1E63CC"} strokeWidth={2} />}
        value={sessionDate}
      />
      <SessionInfoRow
        icon={<Clock size={normalize(15)} color={"#1E63CC"} strokeWidth={2} />}
        value={sessionTime}
      />
      <SessionInfoRow
        icon={<MapPin size={normalize(15)} color={"#1E63CC"} strokeWidth={2} />}
        value={sessionLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(30),
    marginHorizontal: normalize(20),
    marginTop: normalize(16),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(18),
    overflow: 'hidden',
    boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.04)'
  },
  statusBadge: {
    marginTop: normalize(10),
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(6),
    backgroundColor: "#EFF6FF",
    marginBottom: normalize(24)
  },
  statusUpcoming: {
    backgroundColor: "#EFF6FF",
  },
  statusRescheduled: {
    backgroundColor: "#E8F5E9",
  },
  statusText: {
    fontSize: normalize(11),
    color: '#1E63CC',
  },
  statusTextUpcoming: {
    color: '#1E63CC',
  },
  statusTextRescheduled: {
    color: "#2E7D32",
  },
});
