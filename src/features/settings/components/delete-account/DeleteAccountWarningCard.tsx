import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert, Info } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { GradientButton } from '@/components/atoms/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

interface DeleteAccountWarningCardProps {
  onContinue: () => void;
}

export const DeleteAccountWarningCard: React.FC<DeleteAccountWarningCardProps> = ({
  onContinue,
}) => {
  return (
    <View style={styles.card}>
      {/* Heading */}
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.title}
        color={colors.typographyColor.Medium || '#000000'}
      >
        Delete Account
      </AppText>

      {/* Description */}
      <AppText
        weight="regular"
        family="secondary"
        style={styles.description}
        color={colors.typographyColor.Medium || '#64748B'}
      >
        {'Deleting your account will permanently remove your profile, appointments, ratings, earnings history, and professional records.'}
      </AppText>

      {/* Alert 1: Cannot be undone */}
      <View style={styles.dangerAlertBox}>
        <TriangleAlert
          size={normalize(20)}
          color={'#FEF2F2'}
          fill={colors.typographyColor.Medium}
          strokeWidth={2}
        />
        <AppText
          weight="medium"
          family="secondary"
          style={styles.alertText}
          color={colors.typographyColor.Medium || '#64748B'}
        >
          This action cannot be undone.
        </AppText>
      </View>

      {/* Alert 2: Permanently lost */}
      <View style={styles.infoAlertBox}>
        <Info
          size={normalize(20)}
          color={colors.tintsGrey[50]}
          fill={colors.typographyColor.Medium}
          strokeWidth={2}
        />
        <AppText
          weight="medium"
          family="secondary"
          style={styles.alertText}
          color={colors.typographyColor.Medium || '#64748B'}
        >
          All your data will be permanently lost.
        </AppText>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.actionBtnWrapper}
        activeOpacity={0.85}
        onPress={() => {
          console.log('[Delete Account] Warning Continue button pressed');
          onContinue();
        }}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.actionBtn}
        >
          <AppText
            weight="bold"
            family="primary"
            style={styles.continueBtnText}
            color="#FFFFFF"
          >
            Continue
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(24),
    marginBottom: normalize(30),
  },
  title: {
    fontSize: normalize(20),
    marginBottom: normalize(8),
  },
  description: {
    fontSize: normalize(13),
    lineHeight: normalize(19),
    marginBottom: normalize(20),
  },
  dangerAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    backgroundColor: '#FEF2F2',
    borderRadius: normalize(14),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(12),
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: '#FEE2E2',
    justifyContent: 'center',
    display: 'flex',

  },
  infoAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    backgroundColor: colors.tintsGrey[50],
    borderRadius: normalize(14),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(12),
    marginBottom: normalize(24),
    borderWidth: 1,
    borderColor: colors.tintsGrey[200],
    justifyContent: 'center',
  },
  alertText: {
    fontSize: normalize(12.5),
  },
  actionBtnWrapper: {
    borderRadius: normalize(99),
    overflow: 'hidden',
    minHeight: normalize(55),
  },
  actionBtn: {
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(99),
    minHeight: normalize(55),
    width: '100%',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  continueBtnText: {
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
});
