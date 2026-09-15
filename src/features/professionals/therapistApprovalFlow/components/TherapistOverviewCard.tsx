import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Calendar, Clock, MapPin } from 'lucide-react-native';

interface TherapistOverviewCardProps {
  name?: string;
  specialty?: string;
  avatarUri?: string;
  isOnline?: boolean;
  statusBadgeText?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionLocation?: string;
  onViewProfile?: () => void;
  onPreviousNotes?: () => void;
}

export const TherapistOverviewCard: React.FC<TherapistOverviewCardProps> = ({
  name = 'Prathamesh Deokar',
  specialty = 'Individual Therapy • Cognitive\nBehavioral Approach',
  avatarUri = 'https://i.pravatar.cc/150?u=prathmesh',
  isOnline = true,
  statusBadgeText = 'Upcoming',
  sessionDate = 'Mon, 20 May 2024',
  sessionTime = '04:00 PM – 05:00 PM',
  sessionLocation = 'Online Session',
  onViewProfile,
  onPreviousNotes,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      {/* Therapist Header */}
      <View style={styles.therapistRow}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
            resizeMode="cover"
          />
          {isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.therapistInfo}>
          <AppText family="primary" weight="bold" style={styles.therapistName}>
            {name}
          </AppText>
          <AppText family="secondary" weight="light" style={styles.specialtyText}>
            {specialty}
          </AppText>
        </View>
      </View>

      {/* Upcoming Status Badge */}
      <View style={styles.badgeContainer}>
        <View style={[styles.statusBadge, { backgroundColor: colors.blue[50] }]}>
          <AppText family="secondary" weight="medium" style={styles.statusBadgeText}>
            {statusBadgeText}
          </AppText>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.detailsList}>
        <View style={styles.detailRow}>
          <Calendar size={normalize(18)} color={colors.typographyColor['Dark 2']} style={styles.detailIcon} />
          <AppText family="secondary" weight="medium" style={styles.detailText}>
            {sessionDate}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <Clock size={normalize(18)} color="#1C6199" style={styles.detailIcon} />
          <AppText family="secondary" weight="medium" style={styles.detailText}>
            {sessionTime}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <MapPin size={normalize(18)} color="#1C6199" style={styles.detailIcon} />
          <AppText family="secondary" weight="medium" style={styles.detailText}>
            {sessionLocation}
          </AppText>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.outlineBtn}
          activeOpacity={0.7}
          onPress={onViewProfile}
        >
          <AppText family="secondary" weight="medium" style={styles.outlineBtnText}>
            View Profile
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineBtn}
          activeOpacity={0.7}
          onPress={onPreviousNotes}
        >
          <AppText family="secondary" weight="medium" style={styles.outlineBtnText}>
            Previous Notes
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(30),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(22),
    paddingBottom: normalize(20),
    marginBottom: normalize(16),
    boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.04)',
    borderWidth: normalize(1),
    borderColor: 'rgba(255,255,255,0.5)',
  },
  therapistRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalize(14),
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
    borderRadius: normalize(16),
  },
  avatar: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(16),
    backgroundColor: '#E2E8F0',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(99),
    backgroundColor: colors.green[500],
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: normalize(16),
    color: '#2D3432',
    marginBottom: normalize(2),
  },
  specialtyText: {
    fontSize: normalize(11),
    color: '#59615F',
    lineHeight: normalize(16),
  },
  badgeContainer: {
    marginTop: normalize(16),
    marginBottom: normalize(14),
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(5),
    borderRadius: normalize(8),
  },
  statusBadgeText: {
    fontSize: normalize(11),
    color: colors.typographyColor['Dark 2'],
  },
  detailsList: {
    marginBottom: normalize(18),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  detailIcon: {
    marginRight: normalize(12),
  },
  detailText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
  },
  buttonsContainer: {
    gap: normalize(10),
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(8),
    paddingVertical: normalize(11),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  outlineBtnText: {
    fontSize: normalize(12.5),
    color: colors.typographyColor.Medium,
  },
});
