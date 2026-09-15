import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { IndianRupee } from 'lucide-react-native';

interface OrderSummaryProps {
  sessionLabel: string;
  basePrice: number;
  discount: number;
  gstTax: number;
  platformFee: number;
}

interface SummaryLineProps {
  label: string;
  amount: number;
  isDiscount?: boolean;
  isBold?: boolean;
  isTotal?: boolean;
}

const SummaryLine: React.FC<SummaryLineProps> = ({
  label,
  amount,
  isDiscount = false,
  isBold = false,
  isTotal = false,
}) => {
  const amountColor = isDiscount
    ? colors.green[500]
    : isTotal
      ? colors.blue[700]
      : colors.appThemeColor[900];

  const prefix = isDiscount ? '-' : '';

  return (
    <View style={styles.line}>
      <AppText
        variant="caption"
        weight={isBold ? 'extraBold' : 'regular'}
        style={[styles.lineLabel, isBold && styles.lineLabelBold]}
      >
        {label}
      </AppText>
      <View style={styles.amountRow}>

        <AppText
          variant={isTotal ? 'body' : 'caption'}
          weight={isBold ? 'extraBold' : 'regular'}
          style={{ color: amountColor, fontSize: isTotal ? normalize(16) : normalize(12) }}
        >
          {prefix}
        </AppText>
        {isTotal && (
          <IndianRupee
            size={normalize(16)}
            color={amountColor}
            strokeWidth={3}
            style={{ marginTop: normalize(3), marginLeft: normalize(0) }}
          />
        )}
        {!isTotal && (
          <IndianRupee size={normalize(12)} color={amountColor} strokeWidth={2.5} style={{ marginTop: normalize(2), marginLeft: normalize(0) }} />
        )}

        <AppText
          variant={isTotal ? 'body' : 'caption'}
          weight={isBold ? 'extraBold' : 'regular'}
          style={[{ color: amountColor, fontSize: isTotal ? normalize(16) : normalize(12) }]}
        >
          {amount.toLocaleString('en-IN')}
        </AppText>
      </View>
    </View>
  );
};

export const OrderSummaryCard: React.FC<OrderSummaryProps> = ({
  sessionLabel,
  basePrice,
  discount,
  gstTax,
  platformFee,
}) => {
  const { borderRadius } = useTheme();
  const total = basePrice - discount + gstTax + platformFee;

  return (
    <View style={[styles.card, { borderRadius: normalize(20) }]}>
      <AppText variant="body" weight="extraBold" style={styles.title}>
        Order Summary
      </AppText>

      <SummaryLine label={sessionLabel} amount={basePrice} />
      <SummaryLine label="Discount (5%)" amount={discount} isDiscount />
      <SummaryLine label="Gst Tax" amount={gstTax} />
      <SummaryLine label="Platform fees" amount={platformFee} />

      <View style={styles.divider} />

      <SummaryLine
        label="Total Payable"
        amount={total}
        isBold
        isTotal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: normalize(24),
    paddingTop: normalize(32),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  title: {
    fontSize: normalize(15),
    color: colors.appThemeColor[900],
    marginBottom: normalize(16),
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  lineLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
  },
  lineLabelBold: {
    color: colors.appThemeColor[900],
    fontSize: normalize(13),
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // lineAmount: {
  //   fontSize: normalize(12),
  // },
  divider: {
    height: 1,
    backgroundColor: colors.tintsGrey[100],
    marginVertical: normalize(10),
  },
});
