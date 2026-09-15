import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface OtpVerificationFieldProps {
  stepLabel: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  subtext: string;
  onSendOtp: () => void;
  isOtpSent?: boolean;
  countdown?: number;
}

export const OtpVerificationField: React.FC<OtpVerificationFieldProps> = ({
  stepLabel,
  icon,
  value,
  onChangeText,
  placeholder = 'Enter 6-digit code',
  subtext,
  onSendOtp,
  isOtpSent = false,
  countdown = 0,
}) => {
  return (
    <View style={styles.container}>
      <AppText family="primary" weight="bold" style={styles.stepTitle}>
        {stepLabel}
      </AppText>

      <View style={styles.inputRow}>
        <View style={styles.inputBox}>
          <View style={styles.iconWrapper}>{icon}</View>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <TouchableOpacity
          style={[styles.sendButton, isOtpSent && styles.sendButtonActive]}
          onPress={onSendOtp}
          activeOpacity={0.7}
          disabled={countdown > 0}
        >
          <AppText family="primary" weight="bold" style={styles.sendButtonText}>
            {countdown > 0 ? `Resend (${countdown}s)` : isOtpSent ? 'Resend' : 'Send OTP'}
          </AppText>
        </TouchableOpacity>
      </View>

      <AppText family="primary" weight="regular" style={styles.subtext}>
        {subtext}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(18),
  },
  stepTitle: {
    fontSize: normalize(13.5),
    color: '#0F172A',
    marginBottom: normalize(10),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightAppTheme[200],
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    height: normalize(46),
    paddingHorizontal: normalize(12),
    marginRight: normalize(10),
  },
  iconWrapper: {
    marginRight: normalize(8),
  },
  textInput: {
    flex: 1,
    fontSize: normalize(13),
    color: '#0F172A',
    paddingVertical: 0,
  },
  sendButton: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(10),
    height: normalize(46),
    paddingHorizontal: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#E0F2FE',
  },
  sendButtonText: {
    fontSize: normalize(12.5),
    color: colors.typographyColor['Dark 2'],
  },
  subtext: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    marginTop: normalize(6),
  },
});
