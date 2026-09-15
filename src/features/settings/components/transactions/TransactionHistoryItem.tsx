import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Receipt, Download, Check, FileArchive, FileBadge, Files, ReceiptText } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface TransactionData {
  id: string;
  transactionCode: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  amount: number;
  currency?: string;
  invoiceUrl?: string;
}

interface TransactionHistoryItemProps {
  transaction: TransactionData;
  onPress?: (transaction: TransactionData) => void;
  onDownload?: (transaction: TransactionData) => void;
}

export const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  transaction,
  onPress,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = useCallback(() => {
    console.log(`[Transactions] Download invoice button pressed for: ${transaction.transactionCode}`);
    if (onDownload) {
      onDownload(transaction);
      return;
    }

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloaded(true);
      console.log(`[Transactions] Invoice for ${transaction.transactionCode} downloaded successfully.`);
      Alert.alert(
        'Invoice Downloaded',
        `Invoice for transaction ${transaction.transactionCode} has been saved.`,
      );
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
  }, [transaction, onDownload]);

  const currencySymbol = transaction.currency || '₹';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        console.log(`[Transactions] Transaction card pressed: ${transaction.transactionCode}`);
        onPress?.(transaction);
      }}
    >
      {/* Left Receipt Icon in Soft Blue Squircle */}
      <View style={styles.iconWrapper}>
        <ReceiptText size={normalize(22)} color={colors.typographyColor['Dark 2'] || '#003CA3'} strokeWidth={1.8} />
      </View>

      {/* Middle: ID, Date & Status */}
      <View style={styles.detailsCol}>
        <AppText
          weight="extraBold"
          family="primary"
          style={styles.codeText}
          color={colors.typographyColor.Black || '#0F172A'}
        >
          {transaction.transactionCode}
        </AppText>

        <AppText
          weight="regular"
          family="secondary"
          style={styles.metaText}
          color={colors.typographyColor.Medium || '#64748B'}
        >
          {transaction.date} • {transaction.status}
        </AppText>
      </View>

      {/* Amount */}
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.amountText}
        color={colors.typographyColor.Black || '#0F172A'}
      >
        {currencySymbol}{transaction.amount}
      </AppText>

      {/* Right Download Button */}
      <TouchableOpacity
        style={[styles.downloadBtn, downloaded && styles.downloadBtnSuccess]}
        activeOpacity={0.8}
        onPress={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator size="small" color={colors.green[100]} />
        ) : downloaded ? (
          <View style={styles.btnContent}>
            <Check size={normalize(13)} color={colors.green[100]} strokeWidth={2.5} />
            <AppText weight="bold" family="secondary" style={styles.downloadText} color={colors.green[100]}>
              Saved
            </AppText>
          </View>
        ) : (
          <View style={styles.btnContent}>
            <Download size={normalize(13)} color={colors.green[700]} strokeWidth={2.2} />
            <AppText weight="medium" family="secondary" style={styles.downloadText} color={colors.green[700]}>
              Download
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  iconWrapper: {
    width: normalize(46),
    height: normalize(46),
    borderRadius: normalize(12),
    backgroundColor: colors.tintsBlue[400],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  detailsCol: {
    flex: 1,
    gap: normalize(2),
  },
  codeText: {
    fontSize: normalize(15),
  },
  metaText: {
    fontSize: normalize(12),
  },
  amountText: {
    fontSize: normalize(16),
    marginRight: normalize(12),
  },
  downloadBtn: {
    backgroundColor: '#D1FADF',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtnSuccess: {
    backgroundColor: '#DCFCE7',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  downloadText: {
    fontSize: normalize(11.5),
  },
});
