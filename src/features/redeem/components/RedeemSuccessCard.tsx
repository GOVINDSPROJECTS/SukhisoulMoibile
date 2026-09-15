import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { BadgeCheck, IndianRupee, Tag } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientButton } from '@components/atoms/GradientButton';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';


interface RedeemSuccessCardProps {
  totalPrice: number;
  pointsUsed: number;
  pointsValue: number;
  remainingPoints: number;
  remainingValue: number;
  onBookTherapy: () => void;
}

export const RedeemSuccessCard: React.FC<RedeemSuccessCardProps> = ({
  totalPrice,
  pointsUsed,
  pointsValue,
  remainingPoints,
  remainingValue,
  onBookTherapy,
}) => {
  const { borderRadius } = useTheme();


  return (

    <View style={[styles.container, { borderRadius: borderRadius.xl }]}>
      {/* Mascot */}
      <View style={styles.mascotContainer}>
        <Image
          source={require('../../psychologist/assets/mascot-bg.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </View>

      {/* Congratulations Text */}
      <AppText variant="h3" weight="extraBold" style={styles.congratsTitle} center>
        Yaay! Congratulations..🎉
      </AppText>
      <AppText variant="caption" weight="bold" style={styles.congratsSubtitle} center>
        You have redeemed
      </AppText>
      <AppText variant="body" weight="bold" style={styles.freeSessionText} center>
        FREE Therapy Session
      </AppText>

      {/* Total Price */}
      <View style={styles.totalRow}>
        <Image source={require('../assets/check.png')} style={{ width: normalize(17), height: normalize(17) }} />
        <AppText variant="caption" weight="medium" style={styles.totalPriceText}>
          Total Session price:{' '}
          <AppText variant="caption" weight="bold" style={styles.totalPriceValue}>
            ₹{totalPrice}
          </AppText>
        </AppText>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { opacity: 0 }]} />

      {/* Points Used Section */}
      <AppText variant="caption" weight="bold" style={styles.sectionLabel}>
        POINTS USED
      </AppText>

      <View style={[styles.pointsRow, { borderRadius: borderRadius.m }]}>
        <View style={[styles.pointsIconBg]}>
          <Image
            source={require('../assets/congo-wallet.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.pointsInfo}>
          <AppText variant="caption" weight="extraBold" style={styles.pointsAmount}>
            {pointsUsed} Points
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.pointsDescription}>
            Redeemed for therapy
          </AppText>
        </View>
        <AppText variant="body" weight="bold" style={styles.pointsSaved}>
          − ₹{pointsValue}
        </AppText>
      </View>

      <View style={styles.divider} />

      {/* You Pay Section */}
      <AppText variant="caption" weight="bold" style={styles.sectionLabel}>
        YOU PAY
      </AppText>

      <View style={[styles.pointsRow, { borderRadius: borderRadius.m }]}>
        <View style={[styles.pointsIconBg]}>
          <Image
            source={require('../assets/congo-rupee.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.pointsInfo}>
          <AppText variant="caption" weight="extraBold" style={styles.pointsAmount}>
            {remainingPoints} Points
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.pointsDescription}>
            Additional payment
          </AppText>
        </View>
        <AppText variant="body" weight="bold" style={styles.payAmount}>
          ₹{remainingValue}
        </AppText>
      </View>

      {/* Savings Banner */}
      <View style={[styles.savingsBanner, { borderRadius: borderRadius.m }]}>
        <Tag size={normalize(14)} color={colors.blue[600]} strokeWidth={2} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppText variant="caption" weight="semiBold" style={styles.savingsText}>You saved</AppText>
          <IndianRupee size={normalize(15)} color={colors.green[700]} style={{ marginRight: normalize(-2), marginLeft: normalize(3) }} />
          <AppText variant="caption" weight="semiBold" family='secondary' style={{ color: colors.green[700], marginRight: normalize(3) }}>{pointsValue}</AppText>
          <AppText variant="caption" weight="semiBold" style={styles.savingsText}>using your Calm Points!</AppText>
        </View>
      </View>

      {/* What's Next */}
      <View style={styles.whatsNextSection}>
        <View style={styles.dividerContainer}>
          <View
            style={[
              styles.divider_half,
              { backgroundColor: "#e2e8f0" },
            ]}
          />
          <AppText variant="body" weight="extraBold" center
            style={[
              styles.dividerText,
              {
                color: colors.typographyColor.Black,
              },
            ]}
          >
            WHAT'S NEXT?
          </AppText>
          <View
            style={[
              styles.divider_half,
              { backgroundColor: "#e2e8f0" },
            ]}
          />
        </View>
        <AppText variant="caption" weight="regular" style={styles.whatsNextSubtitle} center>
          Click below to book your therapy session.
        </AppText>
      </View>

      {/* Book Therapy CTA */}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onBookTherapy}
        style={styles.redeemBtnWrapper}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.redeemBtn, { borderRadius: normalize(99) }]}
        >
          <AppText variant="body" weight="bold" style={styles.redeemBtnText}>
            Book Therapy
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFFFFF',
    marginHorizontal: normalize(16),
    padding: normalize(15),
    paddingTop: normalize(20)
    // borderWidth: 1,
    // borderColor: colors.tintsGrey[100],
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: normalize(16),
    marginTop: normalize(4),
  },
  mascot: {
    width: normalize(120),
    height: normalize(120),
  },
  congratsTitle: {
    fontSize: normalize(18),
    color: colors.appThemeColor[900],
    marginBottom: normalize(4),
  },
  congratsSubtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  freeSessionText: {
    fontSize: normalize(14),
    color: colors.blue[600],
    marginBottom: normalize(12),
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
    marginBottom: normalize(16),
  },
  totalPriceText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
  },
  totalPriceValue: {
    fontSize: normalize(12),
    color: colors.blue[600],
  },
  divider: {
    // height: 1,
    // backgroundColor: colors.tintsGrey[100],
    marginVertical: normalize(14),
    borderTopWidth: 1,
    borderTopColor: colors.blue[200],
    borderStyle: 'dashed'
  },
  sectionLabel: {
    fontSize: normalize(10),
    color: colors.typographyColor.Black,
    letterSpacing: 0.8,
    marginBottom: normalize(10),
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(8),
  },
  pointsIconBg: {
    width: normalize(48),
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  payIconBg: {
    width: normalize(48),
    height: normalize(48),
    backgroundColor: colors.lightTints.blueLightTint[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.blue[200],
  },
  payIconText: {
    fontSize: normalize(15),
    color: colors.blue[700],
  },
  rowIcon: {
    width: normalize(48),
    height: normalize(48),
  },
  pointsInfo: {
    flex: 1,
  },
  pointsAmount: {
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
  },
  pointsDescription: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    marginTop: normalize(1),
  },
  pointsSaved: {
    fontSize: normalize(14),
    color: colors.green[700],
  },
  payAmount: {
    fontSize: normalize(14),
    color: colors.blue[600],
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightTints.blueLightTint[100],
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    gap: normalize(6),
    marginTop: normalize(4),
    borderWidth: 1,
    borderColor: colors.blue[100],
  },
  savingsText: {
    fontSize: normalize(11),
    color: colors.blue[600],
  },
  whatsNextSection: {
    marginVertical: normalize(20),
    gap: normalize(4),
  },
  whatsNextTitle: {
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    letterSpacing: 0.8,
  },
  whatsNextSubtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
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

  // ── Divider ───────────────────────────────────────────────────────────────
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(12),
  },
  divider_half: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: normalize(12),
    fontSize: normalize(12),
    fontWeight: '600',
  },

});
