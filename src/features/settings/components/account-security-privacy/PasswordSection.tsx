import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Lock, CheckCircle2 } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export const PasswordSection: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = useCallback(() => {
    console.log('[Account Security] Send OTP button pressed');
    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      console.log('[Account Security] OTP sent successfully to registered email/phone');
    }, 1000);
  }, []);

  const handleChangePassword = useCallback(() => {
    console.log('[Account Security] Change Password pressed with:', {
      currentPasswordLength: currentPassword.length,
      newPasswordLength: newPassword.length,
      otp,
    });
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log('[Account Security] Password Changed Successfully!');
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setOtp('');
        setOtpSent(false);
      }, 3000);
    }, 1200);
  }, [currentPassword, newPassword, otp]);

  return (
    <View style={styles.sectionContainer}>
      {/* Section Title */}
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        PASSWORD
      </AppText>

      {/* Inputs Container */}
      <View style={styles.inputsCard}>
        {/* Current Password Row */}
        <View style={styles.inputRow}>
          <View style={styles.labelCol}>
            <Lock size={normalize(16)} color={'#94A3B8'} strokeWidth={2} />
            <AppText weight="medium" family="primary" style={styles.labelText} color={'#475569'}>
              Current Password
            </AppText>
          </View>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={currentPassword}
            onChangeText={(text) => {
              setCurrentPassword(text);
              console.log('[Account Security] Current password changed');
            }}
            placeholder="•••••••••"
            placeholderTextColor={'#94A3B8'}
          />
        </View>

        {/* New Password Row */}
        <View style={styles.inputRow}>
          <View style={styles.labelCol}>
            <Lock size={normalize(16)} color={'#94A3B8'} strokeWidth={2} />
            <AppText weight="medium" family="primary" style={styles.labelText} color={'#475569'}>
              New Password
            </AppText>
          </View>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              console.log('[Account Security] New password changed');
            }}
            placeholder="•••••••••"
            placeholderTextColor={'#94A3B8'}
          />
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity
          style={styles.sendOtpBtn}
          activeOpacity={0.8}
          onPress={handleSendOtp}
          disabled={isSendingOtp}
        >
          {isSendingOtp ? (
            <ActivityIndicator size="small" color={colors.typographyColor['Dark 2']} />
          ) : (
            <AppText weight="bold" family="primary" style={styles.sendOtpText} color={colors.typographyColor['Dark 2']}>
              {otpSent ? 'Resend OTP' : 'Send Otp'}
            </AppText>
          )}
        </TouchableOpacity>

        {/* OTP Row */}
        <View style={styles.inputRow}>
          <View style={styles.labelCol}>
            <Lock size={normalize(16)} color={'#94A3B8'} strokeWidth={2} />
            <AppText weight="medium" family="primary" style={styles.labelText} color={'#475569'}>
              OTP
            </AppText>
          </View>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            keyboardType="number-pad"
            value={otp}
            onChangeText={(text) => {
              setOtp(text);
              console.log('[Account Security] OTP input changed:', text);
            }}
            placeholder="•••••••••"
            placeholderTextColor={'#94A3B8'}
          />
        </View>
      </View>

      {/* Change Password / Success Button */}
      <TouchableOpacity
        style={styles.actionBtnWrapper}
        activeOpacity={0.85}
        onPress={handleChangePassword}
        disabled={isSubmitting || isSuccess}
      >
        <LinearGradient
          colors={isSuccess ? [colors.lightAppTheme[700], colors.lightAppTheme[950]] : [colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.actionBtnGradient}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : isSuccess ? (
            <View style={styles.successRow}>
              <CheckCircle2 size={normalize(18)} color="#FFFFFF" strokeWidth={2.5} />
              <AppText weight="semiBold" family="secondary" style={styles.actionBtnText} color="#FFFFFF">
                Password Changed Successfully
              </AppText>
            </View>
          ) : (
            <AppText weight="semiBold" family="secondary" style={styles.actionBtnText} color="#FFFFFF">
              Change Password
            </AppText>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: normalize(18),
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(12),
  },
  inputsCard: {
    gap: normalize(12),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.tintsGrey[50],
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
  },
  labelCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  labelText: {
    fontSize: normalize(11.5),
  },
  textInput: {
    fontSize: normalize(13),
    color: colors.typographyColor.Dark || '#1E293B',
    textAlign: 'right',
    minWidth: normalize(90),
    paddingVertical: 0,
  },
  sendOtpBtn: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(4),
    borderWidth: normalize(1),
    borderColor: colors.tintsGrey[50],
    minHeight: normalize(50)
  },
  sendOtpText: {
    fontSize: normalize(13.5),
  },
  actionBtnWrapper: {
    marginTop: normalize(18),
    borderRadius: normalize(10),
    overflow: 'hidden',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
    minHeight: normalize(55),
  },
  actionBtnGradient: {
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(10),
    minHeight: normalize(55),

  },
  actionBtnText: {
    fontSize: normalize(13),
    letterSpacing: 0.2,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
});
