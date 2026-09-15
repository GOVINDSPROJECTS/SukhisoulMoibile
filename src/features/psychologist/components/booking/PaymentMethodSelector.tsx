import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { Wallet, CreditCard } from 'lucide-react-native';
import AppInput from '@/components/atoms/AppInput';

export type PaymentMethodId = 'upi' | 'card' | 'wallet';

interface PaymentOption {
  id: PaymentMethodId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodId;
  onSelectMethod: (id: PaymentMethodId) => void;
  couponCode: string;
  onCouponChange: (code: string) => void;
  onApplyCoupon: () => void;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'upi',
    title: 'UPI / GPay / PhonePe',
    subtitle: 'Pay instantly using your preferred app',
    icon: <Image source={require('../../assets/payment/wallet.png')} style={{ width: normalize(22), height: normalize(21), }} />,
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, Amex supported',
    icon: <Image source={require('../../assets/payment/cc.png')} style={{ width: normalize(24), height: normalize(19), }} />,
  },
  {
    id: 'wallet',
    title: 'Digital Wallets',
    subtitle: 'Amazon Pay, Mobikwik, and more',
    icon: <Image source={require('../../assets/payment/money.png')} style={{ width: normalize(26), height: normalize(19), }} />,
  },
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  couponCode,
  onCouponChange,
  onApplyCoupon,
}) => {
  const { borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="body" weight="extraBold" style={styles.sectionTitle}>
        Payment Method
      </AppText>

      {/* Coupon Code */}
      <AppText variant="caption" weight="medium" style={styles.couponLabel}>
        Coupon Code
      </AppText>
      <View style={[styles.couponRow, { borderRadius: normalize(10) }]}>
        <AppInput
          family="primary"
          weight="regular"
          style={styles.couponInput}
          value={couponCode}
          onChangeText={onCouponChange}
          placeholder="Enter coupon code"
          placeholderTextColor={colors.typographyColor.Medium}
          autoCapitalize="characters"
        />
        <Pressable
          onPress={onApplyCoupon}
          style={({ pressed }) => [styles.applyBtn, pressed && { borderRadius: normalize(8), backgroundColor: colors.lightTints.blueLightTint[50], }]}
        >
          <AppText variant="caption" weight="bold" style={styles.applyBtnText}>
            Apply
          </AppText>
        </Pressable>
      </View>

      {/* Payment Options */}
      {PAYMENT_OPTIONS.map((option) => {
        const isSelected = selectedMethod === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => onSelectMethod(option.id)}
            style={[
              styles.optionCard,
              { borderRadius: normalize(14) },
              isSelected && styles.optionCardSelected,
            ]}
          >
            <View style={[styles.optionIconWrap, { borderRadius: borderRadius.m }]}>
              {option.icon}
            </View>
            <View style={styles.optionInfo}>
              <AppText variant="caption" weight="extraBold" style={styles.optionTitle}>
                {option.title}
              </AppText>
              <AppText variant="caption" weight="regular" style={styles.optionSubtitle}>
                {option.subtitle}
              </AppText>
            </View>
            {/* Radio indicator */}
            <View style={[styles.radio, isSelected && styles.radioSelected]}>
              {isSelected && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: normalize(10),
    marginTop: normalize(25)
  },
  sectionTitle: {
    fontSize: normalize(15),
    color: colors.appThemeColor[900],
    marginBottom: normalize(4),
  },
  couponLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(4),
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    overflow: 'hidden',
    marginBottom: normalize(20)
  },
  couponInput: {
    flex: 1,
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    borderRadius: normalize(6),
  },
  applyBtn: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
    backgroundColor: colors.tintsBlue[600],
    margin: normalize(4),
    borderRadius: normalize(6),
    color: colors.typographyColor['Dark 2']
  },
  applyBtnText: {
    color: colors.blue[600],
    fontSize: normalize(13),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.tintsGrey[200],
    padding: normalize(20),
    gap: normalize(12),
    marginBottom: normalize(5)
  },
  optionCardSelected: {
    borderColor: colors.blue[300],
    backgroundColor: colors.tintsBlue[400],
  },
  optionIconWrap: {
    width: normalize(40),
    height: normalize(40),
    backgroundColor: colors.tintsBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10)
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: normalize(14),
    color: colors.typographyColor.Black,
    lineHeight: normalize(18),
  },
  optionSubtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginTop: normalize(2),
  },
  radio: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    borderWidth: 1.5,
    borderColor: colors.typographyColor.Light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.blue[700],
  },
  radioDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: colors.blue[700],
  },
});
