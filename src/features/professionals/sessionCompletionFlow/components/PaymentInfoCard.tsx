import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { CreditCard, CheckCircle2, ChevronRight } from 'lucide-react-native';
import { colors } from '@/theme';

interface PaymentInfoCardProps {
  fee?: string;
  isPaid?: boolean;
  onPress?: () => void;
}

export const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({
  fee = '₹2,000',
  isPaid = true,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.paymentBox}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <CreditCard size={normalize(18)} color="#10B981" />
        </View>
        <View style={styles.textContainer}>
          <AppText family="secondary" weight="light" style={styles.paymentLabel}>
            PAYMENT INFORMATION
          </AppText>
          <AppText family="primary" weight="bold" style={styles.paymentValue}>
            Session Fee: {fee}
          </AppText>
        </View>
      </View>

      <View style={styles.rightSection}>
        {isPaid && (
          <View style={styles.paidBadge}>
            <CheckCircle2 size={normalize(14)} fill="#10B981" color={colors.green[100]} style={styles.checkIcon} />
            <AppText family="secondary" weight="medium" style={styles.paidBadgeText}>
              Paid
            </AppText>
          </View>
        )}
        <ChevronRight size={normalize(16)} color="#94A3B8" style={styles.chevron} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(12),
    marginBottom: normalize(16),
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  textContainer: {
    justifyContent: 'center',
  },
  paymentLabel: {
    fontSize: normalize(9),
    color: colors.typographyColor.Light,
    letterSpacing: 0.4,
    marginBottom: normalize(2),
  },
  paymentValue: {
    fontSize: normalize(13),
    color: colors.blue[950],
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[100],
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(4),
    marginRight: normalize(4),
  },
  checkIcon: {
    marginRight: normalize(3),
  },
  paidBadgeText: {
    fontSize: normalize(11),
    color: '#10B981',
  },
  chevron: {
    marginLeft: normalize(2),
  },
});
