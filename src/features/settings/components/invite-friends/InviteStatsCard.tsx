import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface InviteStatsCardProps {
  friendsJoined?: number;
  calmPointsEarned?: number;
}

export const InviteStatsCard: React.FC<InviteStatsCardProps> = ({
  friendsJoined = 12,
  calmPointsEarned = 2400,
}) => {
  return (
    <View style={styles.card}>
      {/* Friends Joined */}
      <View style={styles.statCol}>
        <AppText
          weight="extraBold"
          family="primary"
          style={styles.statNumber}
          color={colors.typographyColor.Black || '#0F172A'}
        >
          {friendsJoined}
        </AppText>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.statLabel}
          color={colors.typographyColor.Light || '#64748B'}
        >
          Friends joined
        </AppText>
      </View>

      {/* Calm Points Earned */}
      <View style={styles.statCol}>
        <AppText
          weight="extraBold"
          family="primary"
          style={[styles.statNumber, styles.pointsColor]}
        >
          +{calmPointsEarned.toLocaleString()}
        </AppText>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.statLabel}
          color={colors.typographyColor.Light || '#64748B'}
        >
          Calm Points earned
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(28),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: normalize(44),
    marginBottom: normalize(30),
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.05)',

  },
  statCol: {
    gap: normalize(2),
  },
  statNumber: {
    fontSize: normalize(20),
  },
  pointsColor: {
    color: colors.typographyColor['Theme Medium'],
  },
  statLabel: {
    fontSize: normalize(11),
    letterSpacing: -0.4
  },
});
