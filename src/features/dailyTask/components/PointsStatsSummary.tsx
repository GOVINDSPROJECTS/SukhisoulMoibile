import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { CreditCard, ShoppingBag, Gift } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface StatItem {
  icon: React.ReactNode;
  IconImg?: any;
  value: string;
  label: string;
  iconBg: string;
  gradientColors: string[];
  onPress?: () => void;
}

interface PointsStatsSummaryProps {
  onRewardsPress?: () => void;
}

export const PointsStatsSummary: React.FC<PointsStatsSummaryProps> = ({
  onRewardsPress,
}) => {
  const STATS: StatItem[] = [
    {
      icon: <CreditCard size={normalize(22)} color="#7C6F2A" />,
      IconImg: <Image source={require('../assets/credit-card.png')} style={{ width: normalize(25), height: normalize(25) }} />,
      value: '1,240',
      label: 'Total Points\nAccumulated',
      iconBg: colors.yellow[100],
      gradientColors: [colors.typographyColor['White 1'], colors.yellow[50]],
    },
    {
      icon: <ShoppingBag size={normalize(22)} color="#6D40C4" />,
      IconImg: <Image source={require('../assets/bag.png')} style={{ width: normalize(25), height: normalize(25) }} />,
      value: '600',
      label: 'Total Points\nSpent',
      iconBg: colors.lightTints.purpleLightTint[50],
      gradientColors: [colors.typographyColor['White 1'], colors.lightTints.purpleLightTint[50]],
    },
    {
      icon: <Gift size={normalize(22)} color="#1D6FD8" />,
      IconImg: <Image source={require('../assets/gift.png')} style={{ width: normalize(25), height: normalize(25) }} />,
      value: '2',
      label: 'Rewards\nUnlocked',
      iconBg: colors.lightTints.blueLightTint2[50],
      gradientColors: [colors.typographyColor['White 1'], colors.lightTints.blueLightTint[50]],
      onPress: onRewardsPress,
    },
  ];

  return (
    <View style={styles.container}>
      {STATS.map((stat, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={stat.onPress ? 0.75 : 1}
          onPress={stat.onPress}
          disabled={!stat.onPress}
          style={[styles.cardGradient, { flex: 1 }]}
        >
          <LinearGradient
            colors={stat.gradientColors}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={[styles.iconWrapper, { backgroundColor: stat.iconBg }]}>
              {stat.IconImg}
            </View>

            <AppText
              variant="h3"
              weight="extraBold"
              family="primary"
              color={"#0B1C30"}
              style={styles.value}
            >
              {stat.value}
            </AppText>

            <AppText
              variant="caption"
              weight="regular"
              color={"#42474D"}
              center
              style={styles.label}
            >
              {stat.label}
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(16),
    marginTop: normalize(14),
    marginBottom: normalize(20),
    gap: normalize(10),
  },
  cardGradient: {
    borderRadius: normalize(16),
    borderWidth: normalize(1),
    borderColor: colors.appThemeColor[200],
  },
  card: {
    flex: 1,
    borderRadius: normalize(16),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(8),
    alignItems: 'center',

  },
  iconWrapper: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  value: {
    fontSize: normalize(22),
    marginBottom: normalize(4),
  },
  label: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
    textAlign: 'center',
  },
});
