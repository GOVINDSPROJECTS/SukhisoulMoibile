import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface WalletBalanceCardProps {
  balance: number;
  goal: number;
  worthAmount: number;
  onRedeem: () => void;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  balance,
  goal,
  worthAmount,
  onRedeem,
}) => {
  const { borderRadius } = useTheme();
  const progress = Math.min(balance / goal, 1);
  const remaining = Math.max(goal - balance, 0);
  const isGoalReached = balance >= goal;

  return (
    <View style={[styles.container, { borderRadius: borderRadius.xl }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ borderRadius: borderRadius.m }}>
          <Image
            source={require('../../psychologist/assets/wallet-bold.png')}
            style={styles.walletIcon}
            resizeMode="contain"
          />
        </View>
        <AppText variant="h4" weight="extraBold" style={styles.title}>
          Calm Points Wallet
        </AppText>
      </View>

      {/* Balance */}
      <AppText variant="caption" weight="medium" style={styles.balanceLabel}>
        Balance
      </AppText>
      <AppText variant="h1" weight="extraBold" style={[styles.balanceAmount, { color: colors.typographyColor['Dark 2'] }]}>
        {balance}
      </AppText>
      <AppText variant="caption" weight="semiBold" style={[styles.pointsLabel, { color: colors.typographyColor['Dark 2'] }]}>
        Points
      </AppText>
      <AppText variant="caption" weight="medium" style={styles.worthText}>
        ₹{worthAmount} worth of therapy rewards
      </AppText>

      {/* Progress Card */}
      <LinearGradient
        colors={[colors.tintsBlue[400], colors.tintsBlue[200]]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.progressCard, { borderRadius: normalize(30) }]}
      >

        {isGoalReached ? (
          <AppText variant="caption" weight="semiBold" style={styles.progressInfo}>
            🎉 You've reached{' '}
            <AppText variant="caption" weight="bold" style={styles.freeText}>
              FREE
            </AppText>{' '}
            therapy session!
          </AppText>
        ) : (
          <AppText variant="caption" weight="regular" style={styles.progressInfo}>
            You are {remaining} points away from{' '}
            <AppText variant="caption" weight="regular" style={styles.freeText}>
              FREE
            </AppText>
            {'\n'}therapy Session
          </AppText>
        )}

        {/* Progress Bar */}
        <View style={[styles.progressTrack, { borderRadius: borderRadius.full }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%`, borderRadius: borderRadius.full },
            ]}
          />
        </View>
        <AppText variant="caption" weight="medium" style={styles.progressCountLabel}>
          {balance} / {goal}
        </AppText>

        {/* Redeem Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onRedeem}
          style={styles.redeemBtnWrapper}
        >
          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.redeemBtn, { borderRadius: normalize(99) }]}
          >
            <AppText variant="body" weight="bold" style={styles.redeemBtnText}>
              Redeem Points
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(16),
    paddingTop: normalize(35),
    paddingBottom: normalize(20),
    paddingHorizontal: normalize(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
    gap: normalize(10),
  },
  walletIcon: {
    width: normalize(22),
    height: normalize(22),
  },
  title: {
    fontSize: normalize(16),
    color: colors.appThemeColor[900],
  },
  balanceLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  balanceAmount: {
    fontSize: normalize(52),
    color: colors.appThemeColor[900],
    lineHeight: normalize(60),
  },
  pointsLabel: {
    fontSize: normalize(14),
    color: colors.blue[600],
    marginTop: normalize(2),
  },
  worthText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginTop: normalize(4),
    marginBottom: normalize(16),
  },
  progressCard: {
    padding: normalize(25),
  },
  progressInfo: {
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    marginBottom: normalize(12),
    lineHeight: normalize(20),
  },
  remainingCount: {
    fontSize: normalize(13),
    color: colors.appThemeColor[800],
  },
  freeText: {
    fontSize: normalize(13),
    color: colors.blue[600],
  },
  progressTrack: {
    height: normalize(16),
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: normalize(6),
    borderWidth: 2,
    borderColor: colors.blue[600]
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.blue[500],
  },
  progressCountLabel: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    textAlign: 'right',
    marginBottom: normalize(16),
  },
  redeemBtnWrapper: {
    borderRadius: normalize(99),
    overflow: 'hidden',
    marginHorizontal: normalize(20),
  },
  redeemBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    minHeight: normalize(50),
  },
  redeemBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
});
