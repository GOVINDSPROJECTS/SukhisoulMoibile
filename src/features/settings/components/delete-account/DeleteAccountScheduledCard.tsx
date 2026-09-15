import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface DeleteAccountScheduledCardProps {
  scheduledDate?: string;
  daysRemainingText?: string;
  onCancelRequest: () => void;
}

export const DeleteAccountScheduledCard: React.FC<DeleteAccountScheduledCardProps> = ({
  scheduledDate = '24 July 2026',
  daysRemainingText = '(30 days from now)',
  onCancelRequest,
}) => {
  return (
    <View style={styles.card}>
      {/* Red/Coral Soft Circle with Checkmark */}
      <View style={styles.iconCircle}>
        <Check size={normalize(28)} color={colors.colorPalet['Color 6']} strokeWidth={3} />
      </View>

      {/* Heading */}
      <AppText
        weight="bold"
        family="primary"
        style={styles.title}
        color={colors.typographyColor.Medium || '#1E293B'}
      >
        Account Deleted
      </AppText>

      {/* Subtitle */}
      <AppText
        weight="regular"
        family="secondary"
        style={styles.subtitle}
        color={colors.typographyColor.Light || '#64748B'}
      >
        Your account will be permanently deleted on
      </AppText>

      {/* Date Highlight Badge */}
      <View style={styles.dateBadge}>
        <AppText
          weight="bold"
          family="primary"
          style={styles.dateText}
          color={colors.colorPalet['Color 9']}
        >
          {scheduledDate}
        </AppText>
      </View>

      {/* Days remaining note */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.daysNote}
        color={colors.typographyColor.Light || '#64748B'}
      >
        {daysRemainingText}
      </AppText>

      {/* Cancel Deletion Request Button */}
      <TouchableOpacity
        style={styles.cancelRequestBtn}
        activeOpacity={0.8}
        onPress={() => {
          console.log('[Delete Account] Cancel Deletion Request pressed');
          onCancelRequest();
        }}
      >
        <AppText
          weight="bold"
          family="primary"
          style={styles.cancelRequestBtnText}
          color={colors.typographyColor.Medium || '#334155'}
        >
          Cancel Deletion Request
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(32),
    paddingBottom: normalize(42),
    alignItems: 'center',
    marginTop: normalize(36),
    marginHorizontal: normalize(5),
    marginBottom: normalize(30),
    boxShadow: '0px 0px 4px #D5DBE2',
  },
  iconCircle: {
    width: normalize(72),
    height: normalize(72),
    borderRadius: normalize(36),
    backgroundColor: colors.lightTints.redLightTint2[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(18),
  },
  title: {
    fontSize: normalize(17),
    marginBottom: normalize(8),
  },
  subtitle: {
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  dateBadge: {
    backgroundColor: colors.green[50],
    borderRadius: normalize(14),
    paddingHorizontal: normalize(28),
    paddingVertical: normalize(14),
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: colors.green[100],
  },
  dateText: {
    fontSize: normalize(18),
    letterSpacing: 0.2,
  },
  daysNote: {
    fontSize: normalize(12.5),
    marginBottom: normalize(28),
  },
  cancelRequestBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelRequestBtnText: {
    fontSize: normalize(15),
  },
});
