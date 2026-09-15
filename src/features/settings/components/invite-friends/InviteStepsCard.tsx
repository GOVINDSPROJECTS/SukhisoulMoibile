import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Share2, SquarePen, Banknote } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const StepItem: React.FC<StepItemProps> = ({ icon, title, subtitle }) => (
  <View style={styles.stepCol}>
    <View style={styles.iconCircle}>
      {icon}
    </View>
    <AppText
      weight="semiBold"
      family="secondary"
      style={styles.stepTitle}
      color={colors.typographyColor.Black || '#0F172A'}
    >
      {title}
    </AppText>
    <AppText
      weight="regular"
      family="secondary"
      style={styles.stepSubtitle}
      color={colors.typographyColor.Light || '#64748B'}
    >
      {subtitle}
    </AppText>
  </View>
);

export const InviteStepsCard: React.FC = () => {
  const iconColor = colors.typographyColor['Dark 2'] || '#003CA3';
  const iconSize = normalize(20);

  return (
    <View style={styles.card}>
      <StepItem
        icon={<Share2 size={iconSize} color={iconColor} strokeWidth={2.2} />}
        title="Invite"
        subtitle="Share link"
      />

      {/* <View style={styles.divider} /> */}

      <StepItem
        icon={<SquarePen size={iconSize} color={iconColor} strokeWidth={2.2} />}
        title="Join"
        subtitle="Friend signs up"
      />

      {/* <View style={styles.divider} /> */}

      <StepItem
        icon={<Banknote size={iconSize} color={iconColor} strokeWidth={2.2} />}
        title="Earn"
        subtitle="You both earn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(18),
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.05)',
  },
  stepCol: {
    flex: 1,
    alignItems: 'center',
    gap: normalize(4),
  },
  iconCircle: {
    width: normalize(46),
    height: normalize(46),
    borderRadius: normalize(23),
    backgroundColor: colors.lightTints.blueLightTint[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(4),
  },
  stepTitle: {
    fontSize: normalize(13.5),
  },
  stepSubtitle: {
    fontSize: normalize(11),
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: normalize(42),
    backgroundColor: '#E2E8F0',
  },
});
