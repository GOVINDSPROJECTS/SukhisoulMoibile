import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Lock, Mail, Smartphone, Eye, EyeOff } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, typography } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface DeleteAccountVerificationFormProps {
  onContinue: (verificationData: {
    password: string;
    emailOtp: string;
    phoneOtp: string;
  }) => void;
}

export const DeleteAccountVerificationForm: React.FC<DeleteAccountVerificationFormProps> = ({
  onContinue,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');

  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  const handleSendEmailOtp = useCallback(() => {
    console.log('[Delete Account Security] Send Email OTP pressed');
    setIsSendingEmailOtp(true);
    setTimeout(() => {
      setIsSendingEmailOtp(false);
      setEmailOtpSent(true);
      console.log('[Delete Account Security] Email OTP sent');
    }, 1000);
  }, []);

  const handleSendPhoneOtp = useCallback(() => {
    console.log('[Delete Account Security] Send Phone OTP pressed');
    setIsSendingPhoneOtp(true);
    setTimeout(() => {
      setIsSendingPhoneOtp(false);
      setPhoneOtpSent(true);
      console.log('[Delete Account Security] Phone OTP sent');
    }, 1000);
  }, []);

  const handleContinue = useCallback(() => {
    console.log('[Delete Account Security] Continue pressed with verification credentials');
    onContinue({
      password,
      emailOtp,
      phoneOtp,
    });
  }, [password, emailOtp, phoneOtp, onContinue]);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <AppText
        weight="bold"
        family="primary"
        style={styles.mainHeading}
        color={colors.typographyColor.Medium || '#0F172A'}
      >
        Security Verification
      </AppText>

      {/* ── Step 1: Enter Password ────────────────────────────────────────── */}
      <View style={styles.stepBlock}>
        <AppText weight="regular" family="secondary" style={styles.stepLabel} color={colors.typographyColor.Medium || '#64748B'}>
          Step 1: Enter Password
        </AppText>
        <View style={styles.inputContainer}>
          <Lock size={normalize(18)} color={colors.tintsGrey[300]} strokeWidth={2} />
          <TextInput
            style={styles.textInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••••••"
            placeholderTextColor={colors.typographyColor.Light}

          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            {showPassword ? (
              <EyeOff size={normalize(18)} color={colors.tintsGrey[300]} strokeWidth={2} />
            ) : (
              <Eye size={normalize(18)} color={colors.tintsGrey[300]} strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Step 2: Verify Email OTP ──────────────────────────────────────── */}
      <View style={styles.stepBlock}>
        <AppText weight="regular" family="secondary" style={styles.stepLabel} color={colors.typographyColor.Medium || '#64748B'}>
          Step 2: Verify Email OTP
        </AppText>
        <View style={styles.otpRow}>
          <View style={[styles.inputContainer, styles.otpInputContainer]}>
            <Mail size={normalize(18)} color={colors.tintsGrey[300]} strokeWidth={2} />
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              maxLength={6}
              value={emailOtp}
              onChangeText={setEmailOtp}
              placeholder="Enter 6-digit code"
              placeholderTextColor={colors.tintsGrey[300]}
            />
          </View>
          <TouchableOpacity
            style={styles.sendOtpBtn}
            activeOpacity={0.8}
            onPress={handleSendEmailOtp}
            disabled={isSendingEmailOtp}
          >
            {isSendingEmailOtp ? (
              <ActivityIndicator size="small" color="#475569" />
            ) : (
              <AppText weight="bold" family="primary" style={styles.sendOtpText} color={colors.typographyColor.Light}>
                {emailOtpSent ? 'RESEND' : 'SEND OTP'}
              </AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Step 3: Verify Phone OTP ──────────────────────────────────────── */}
      <View style={styles.stepBlock}>
        <AppText weight="regular" family="secondary" style={styles.stepLabel} color={colors.typographyColor.Medium || '#64748B'}>
          Step 3: Verify Phone OTP
        </AppText>
        <View style={styles.otpRow}>
          <View style={[styles.inputContainer, styles.otpInputContainer]}>
            <Smartphone size={normalize(18)} color={colors.tintsGrey[300]} strokeWidth={2} />
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              maxLength={6}
              value={phoneOtp}
              onChangeText={setPhoneOtp}
              placeholder="Enter 6-digit code"
              placeholderTextColor={colors.tintsGrey[300]}
            />
          </View>
          <TouchableOpacity
            style={styles.sendOtpBtn}
            activeOpacity={0.8}
            onPress={handleSendPhoneOtp}
            disabled={isSendingPhoneOtp}
          >
            {isSendingPhoneOtp ? (
              <ActivityIndicator size="small" color={colors.typographyColor.Light} />
            ) : (
              <AppText weight="bold" family="primary" style={styles.sendOtpText} color={colors.typographyColor.Light}>
                {phoneOtpSent ? 'RESEND' : 'SEND OTP'}
              </AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Continue Button ───────────────────────────────────────────────── */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleContinue}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.continueBtn}
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
  container: {
    paddingHorizontal: normalize(12),
  },
  mainHeading: {
    fontSize: normalize(18),
    marginBottom: normalize(20),
    marginTop: normalize(8),
  },
  stepBlock: {
    marginBottom: normalize(20),
  },
  stepLabel: {
    fontSize: normalize(13),
    marginBottom: normalize(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(11),
    gap: normalize(10),
  },
  otpInputContainer: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: normalize(13),
    color: colors.typographyColor.Black || '#1E293B',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  eyeBtn: {
    padding: normalize(4),
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  sendOtpBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    minWidth: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(45)
  },
  sendOtpText: {
    fontSize: normalize(12),
    letterSpacing: 0.5,
  },
  continueBtn: {
    borderRadius: normalize(99),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(16),
    marginBottom: normalize(40),
  },
  continueBtnText: {
    fontSize: normalize(15),
  },
});
