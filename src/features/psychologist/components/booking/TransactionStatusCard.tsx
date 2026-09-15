import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Shield, ShieldX, IndianRupee, ShieldCheck } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import type { PaymentStatus } from './PaymentStatusHeader';

interface TransactionStatusCardProps {
  status: PaymentStatus;
  amount: number;
  transactionId: string;
  planLabel: string;
}

export const TransactionStatusCard: React.FC<TransactionStatusCardProps> = ({
  status,
  amount,
  transactionId,
  planLabel,
}) => {
  const { borderRadius } = useTheme();
  const isFailed = status === 'failed';

  const cardBg = isFailed ? colors.tintsGrey[50] : '#ffffff';
  const iconBg = isFailed ? colors.green[50] : '#ECFDF2';
  const rowLabel = isFailed ? 'Payment Failed' : 'Payment Successful';
  const statusLabel = isFailed ? 'FAILED' : 'PAID SUCCESSFULLY';
  const statusColor = isFailed ? colors.colorPalet['Color 6'] : colors.green[500];
  const amountColor = isFailed ? colors.blue[950] : colors.appThemeColor[900];

  return (
    <View style={[styles.card, { borderRadius: normalize(16), backgroundColor: cardBg }]}>
      <View style={styles.row}>
        {/* Left — icon + label + txn ID */}
        <View style={styles.left}>
          <View
            style={[
              styles.iconWrap,
              { borderRadius: borderRadius.m, backgroundColor: iconBg },
            ]}
          >
            {isFailed ? (
              <Image source={require('../../assets/bookingSummary/shield-red.png')} style={{ height: normalize(20), width: normalize(20) }} />
            ) : (
              <Shield size={normalize(20)} color={colors.green[500]} strokeWidth={1.8} />
            )}
          </View>
          <View style={styles.labelCol}>
            <AppText
              variant="caption"
              weight="bold"
              style={[styles.rowLabel, { color: amountColor }]}
            >
              {rowLabel}
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.txnId}>
              Transaction ID: {"\n"}{transactionId}
            </AppText>
          </View>
        </View>

        {/* Right — amount + status */}
        <View style={styles.right}>
          <View style={styles.amountRow}>
            <IndianRupee
              size={normalize(15)}
              color={amountColor}
              strokeWidth={2.5}
              style={{ marginTop: normalize(3) }}
            />
            <AppText
              variant="caption"
              weight="extraBold"
              style={[styles.amount, { color: amountColor }]}
            >
              {amount.toLocaleString('en-IN')}/-
            </AppText>
          </View>
          <AppText
            variant="caption"
            weight="semiBold"
            style={[styles.statusLabel, { color: statusColor }]}
          >
            {statusLabel}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: normalize(16),
    marginVertical: normalize(20),
    boxShadow: '0px 4px 20px -2px rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: normalize(8),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    flex: 1,
  },
  iconWrap: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  labelCol: {
    flex: 1,
  },
  rowLabel: {
    fontSize: normalize(12),
    color: '#111827',
    marginBottom: normalize(3),
  },
  txnId: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
    marginTop: normalize(2),
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: normalize(14),
  },
  statusLabel: {
    fontSize: normalize(9),
    marginTop: normalize(2),
    letterSpacing: 0.3,
  },
});
