import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

interface RewardsProgressCardProps {
  currentPoints?: number;
  totalPoints?: number;
  onPress?: () => void;
}

export const RewardsProgressCard: React.FC<RewardsProgressCardProps> = ({
  currentPoints = 950,
  totalPoints = 1250,
  onPress,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const progressPercent = Math.min(Math.max((currentPoints / totalPoints) * 100, 0), 100);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('RewardsUnlocked');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.card}
        onPress={handlePress}
      >
        {/* Wallet / Rewards icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/wallet.png')}
            style={styles.walletIcon}
            resizeMode="contain"
          />
        </View>

        {/* Progress details */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <AppText variant="body" weight="bold" family='secondary' style={styles.title}>
              Rewards Progress
            </AppText>
            <AppText variant="caption" weight="bold" family='secondary' style={styles.pointsCurrent}>
              {currentPoints}
              <AppText variant="caption" weight="semiBold" family='secondary' style={styles.pointsTotal}>
                {` / ${totalPoints} pts`}
              </AppText>
            </AppText>
          </View>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(14),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(30),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(16),
    backgroundColor: colors.lightTints.blueLightTint[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(14),
  },
  walletIcon: {
    width: normalize(26),
    height: normalize(26),
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  title: {
    fontSize: normalize(13),
    color: colors.typographyColor.Dark,
  },
  pointsCurrent: {
    fontSize: normalize(12),
    color: colors.typographyColor['Dark 2'],
  },
  pointsTotal: {
    fontSize: normalize(12),
    color: colors.lightTints.blueLightTint2[200],
  },
  progressTrack: {
    height: normalize(10),
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(99),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.lightTints.blueLightTint[300],
    borderRadius: normalize(99),
  },
});
