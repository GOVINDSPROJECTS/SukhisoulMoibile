import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CalendarDays, Clock, Monitor, Video } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

interface TherapistSessionCardProps {
  doctorName: string;
  designation: string;
  date: string;
  time: string;
  sessionType?: string;
  avatarUrl?: string;
}

interface SessionChipProps {
  icon: React.ReactNode;
  label: string;
  subLabel: string;
}

const SessionChip: React.FC<SessionChipProps> = ({ icon, label, subLabel }) => {
  const { borderRadius } = useTheme();
  return (
    <View style={[styles.chip, { borderRadius: normalize(16) }]}>
      <View style={{ backgroundColor: colors.tintsBlue[400], padding: normalize(12), borderRadius: borderRadius.full }}>
        {icon}
      </View>
      <AppText variant="caption" weight="bold" style={styles.chipLabel}>
        {label}
      </AppText>
      <AppText variant="caption" weight="regular" style={styles.chipSub}>
        {subLabel}
      </AppText>
    </View>
  );
};

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400';

export const TherapistSessionCard: React.FC<TherapistSessionCardProps> = ({
  doctorName,
  designation,
  date,
  time,
  sessionType = 'Online Session',
  avatarUrl = DEFAULT_AVATAR,
}) => {
  const { borderRadius } = useTheme();

  return (
    <View style={[styles.card, { borderRadius: normalize(16) }]}>
      {/* Therapist header row */}
      <View style={styles.headerRow}>
        <Image
          source={{ uri: avatarUrl }}
          style={[styles.avatar, { borderRadius: normalize(40) }]}
        />
        <View style={styles.info}>
          <AppText variant="caption" weight="bold" style={styles.sessionTag}>
            YOUR THERAPY SESSION
          </AppText>
          <AppText variant="body" weight="extraBold" style={styles.doctorName}>
            {doctorName}
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.designation}>
            {designation}
          </AppText>
        </View>
      </View>

      {/* Session detail chips */}
      <View style={styles.chipsRow}>
        <SessionChip
          icon={
            <CalendarDays
              size={normalize(18)}
              color={colors.blue[600]}
              strokeWidth={1.8}
            />
          }
          label={date}
          subLabel="Confirmed Date"
        />
        <SessionChip
          icon={
            <Clock
              size={normalize(18)}
              color={colors.blue[600]}
              strokeWidth={1.8}
            />
          }
          label={time}
          subLabel="50 Min Session"
        />
        <SessionChip
          icon={
            <Video
              size={normalize(18)}
              color={colors.blue[600]}
              strokeWidth={1.8}
            />
          }
          label={sessionType}
          subLabel="Video Call"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: normalize(16),
    boxShadow: '0px 4px 20px -2px rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(16),
  },
  avatar: {
    width: normalize(56),
    height: normalize(56),
  },
  info: {
    flex: 1,
  },
  sessionTag: {
    fontSize: normalize(9),
    color: colors.typographyColor['Color 2'],
    letterSpacing: 0.6,
    marginBottom: normalize(0),
  },
  doctorName: {
    fontSize: normalize(15),
    color: colors.appThemeColor[900],
  },
  designation: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    marginTop: normalize(2),
  },
  chipsRow: {
    flexDirection: 'row',
    gap: normalize(8),
  },
  chip: {
    flex: 1,
    backgroundColor: colors.tintsBlue[50],
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    gap: normalize(4),
  },
  chipLabel: {
    fontSize: normalize(10),
    color: colors.appThemeColor[900],
    textAlign: 'center',
  },
  chipSub: {
    fontSize: normalize(9),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
  },
});
