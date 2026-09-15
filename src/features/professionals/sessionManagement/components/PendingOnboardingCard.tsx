import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { User, User2 } from 'lucide-react-native';

interface PendingOnboardingCardProps {
  name: string;
  subtitle: string;
  lastActivity: string;
  buttonText: string;
  onPress?: () => void;
}

export const PendingOnboardingCard: React.FC<PendingOnboardingCardProps> = ({
  name,
  subtitle,
  lastActivity,
  buttonText,
  onPress
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <View style={styles.iconBox}>
            <User2 size={normalize(20)} color={colors.purple[900]} />
          </View>
          <View style={styles.nameContainer}>
            <AppText family="secondary" weight="bold" style={styles.name}>
              {name}
            </AppText>
            <AppText family="secondary" weight="bold" style={[styles.subtitle, { color: colors.purple[900] }]}>
              {subtitle}
            </AppText>
          </View>
        </View>

        <View style={styles.pendingBadge}>
          <AppText family="secondary" weight="bold" style={styles.pendingText}>
            PENDING
          </AppText>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.activityContainer}>
          <AppText family="secondary" weight="medium" style={styles.activityLabel}>
            LAST ACTIVITY
          </AppText>
          <AppText family="secondary" weight="medium" style={styles.activityValue}>
            {lastActivity}
          </AppText>
        </View>

        <TouchableOpacity
          style={[styles.outlineBtn, { borderColor: colors.purple[900] }]}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <AppText family="secondary" weight="bold" style={{ fontSize: normalize(11), color: colors.purple[900] }}>
            {buttonText}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    width: '100%',
    borderWidth: normalize(1),
    borderColor: '#F3F4F6',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(24),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(12),
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: normalize(15),
    color: colors.typographyColor.Black,
    marginBottom: normalize(2),
  },
  subtitle: {
    fontSize: normalize(9),
    textTransform: 'uppercase',
  },
  pendingBadge: {
    backgroundColor: colors.lightTints.redLightTint[50],
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(4),
  },
  pendingText: {
    fontSize: normalize(8),
    color: colors.lightTints.redLightTint2[500],
    textTransform: 'uppercase',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  activityContainer: {
    flex: 1,
  },
  activityLabel: {
    fontSize: normalize(9),
    color: colors.typographyColor.Light,
    textTransform: 'uppercase',
    marginBottom: normalize(0),
  },
  activityValue: {
    fontSize: normalize(11.5),
    color: colors.appThemeColor[800],
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderRadius: normalize(8),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
  },
});
