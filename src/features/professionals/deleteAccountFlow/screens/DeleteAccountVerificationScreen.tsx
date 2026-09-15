import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  AlertTriangle,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { OtpVerificationField } from '../components/OtpVerificationField';

export const DeleteAccountVerificationScreenProf: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(0);

  const [phoneOtp, setPhoneOtp] = useState('');
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [phoneCountdown, setPhoneCountdown] = useState(0);

  // Email OTP countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (emailCountdown > 0) {
      timer = setInterval(() => setEmailCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [emailCountdown]);

  // Phone OTP countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (phoneCountdown > 0) {
      timer = setInterval(() => setPhoneCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [phoneCountdown]);

  const handleSendEmailOtp = () => {
    setIsEmailOtpSent(true);
    setEmailCountdown(60);
    Alert.alert('OTP Sent', 'A 6-digit verification code has been sent to d***@mindease.com.');
  };

  const handleSendPhoneOtp = () => {
    setIsPhoneOtpSent(true);
    setPhoneCountdown(60);
    Alert.alert('OTP Sent', 'A 6-digit verification code has been sent to +1 •••••• 45.');
  };

  const handleVerifyAndContinue = () => {
    // Validation bypassed for frontend design testing
    navigation.navigate('DeleteAccountConfirmationPhraseScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Delete Account
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Breadcrumb Row */}
        <View style={styles.breadcrumbRow}>
          <AppText family="primary" weight="medium" style={styles.breadcrumbMuted}>
            Account Security
          </AppText>
          <AppText family="primary" weight="medium" style={styles.breadcrumbDivider}>
            {' > '}
          </AppText>
          <AppText family="primary" weight="medium" style={styles.breadcrumbActive}>
            Deletion Flow
          </AppText>
        </View>

        {/* Title */}
        <AppText family="primary" weight="bold" style={styles.pageTitle}>
          Verification
        </AppText>

        {/* Subtitle */}
        <AppText family="primary" weight="regular" style={styles.pageSubtitle}>
          For your security, please complete the following verification steps to proceed with the account deletion request.
        </AppText>

        {/* Verification Form Card */}
        <View style={styles.formCard}>
          {/* Step 1: Enter Password */}
          <View style={styles.stepBlock}>
            <AppText family="primary" weight="bold" style={styles.stepTitle}>
              Step 1: Enter Password
            </AppText>
            <View style={styles.passwordInputContainer}>
              <Lock size={normalize(18)} color="#94A3B8" style={styles.inputLeftIcon} />
              <TextInput
                style={styles.passwordTextInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="••••••••••••"
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={normalize(18)} color="#94A3B8" />
                ) : (
                  <Eye size={normalize(18)} color="#94A3B8" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Step 2: Verify Email OTP */}
          <OtpVerificationField
            stepLabel="Step 2: Verify Email OTP"
            icon={<Mail size={normalize(18)} color="#94A3B8" />}
            value={emailOtp}
            onChangeText={setEmailOtp}
            placeholder="Enter 6-digit code"
            subtext="Code sent to d***@mindease.com"
            onSendOtp={handleSendEmailOtp}
            isOtpSent={isEmailOtpSent}
            countdown={emailCountdown}
          />

          {/* Step 3: Verify Phone OTP */}
          <OtpVerificationField
            stepLabel="Step 3: Verify Phone OTP"
            icon={<Smartphone size={normalize(18)} color="#94A3B8" />}
            value={phoneOtp}
            onChangeText={setPhoneOtp}
            placeholder="Enter 6-digit code"
            subtext="Code sent to +1 •••••• 45"
            onSendOtp={handleSendPhoneOtp}
            isOtpSent={isPhoneOtpSent}
            countdown={phoneCountdown}
          />
        </View>

        {/* Warning Card */}
        <View style={styles.warningCard}>
          <AlertTriangle size={normalize(24)} fill="#DC2626" color="#ffffff" style={styles.warningIcon} />
          <AppText family="primary" weight="medium" style={styles.warningText}>
            Important: Account deletion is permanent. All clinical data and client records will be wiped.
          </AppText>
        </View>

        {/* Verify & Continue Button */}
        <TouchableOpacity
          onPress={handleVerifyAndContinue}
          activeOpacity={0.8}
        >

          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.verifyButton]}
          >
            <AppText family="primary" weight="bold" style={styles.verifyButtonText}>
              Verify & Continue
            </AppText>

          </LinearGradient>

        </TouchableOpacity>

        {/* Security Note */}
        <View style={styles.securityNoteRow}>
          <Lock size={normalize(12)} color="#94A3B8" style={styles.securityLockIcon} />
          <AppText family="primary" weight="regular" style={styles.securityNoteText}>
            This is to keep your account secure.
          </AppText>
        </View>
      </ScrollView>

      {/* Bottom Copyright Strip */}
      <View style={styles.copyrightStrip}>
        <AppText family="primary" weight="regular" style={styles.copyrightText}>
          © Sukhi Soul Professional. All rights reserved.
        </AppText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(24),
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  breadcrumbMuted: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  breadcrumbDivider: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  breadcrumbActive: {
    fontSize: normalize(11),
    color: colors.typographyColor['Dark 2'],
  },
  pageTitle: {
    fontSize: normalize(21),
    color: '#0F172A',
    marginBottom: normalize(6),
  },
  pageSubtitle: {
    fontSize: normalize(12.5),
    color: '#475569',
    lineHeight: normalize(18),
    marginBottom: normalize(20),
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(14),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  stepBlock: {
    marginBottom: normalize(18),
  },
  stepTitle: {
    fontSize: normalize(13.5),
    color: '#0F172A',
    marginBottom: normalize(10),
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightAppTheme[200],
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    height: normalize(46),
    paddingHorizontal: normalize(12),
  },
  inputLeftIcon: {
    marginRight: normalize(8),
  },
  passwordTextInput: {
    flex: 1,
    fontSize: normalize(13),
    color: '#0F172A',
    paddingVertical: 0,
  },
  eyeButton: {
    padding: normalize(4),
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderRadius: normalize(10),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(14),
    marginBottom: normalize(20),
    borderWidth: normalize(1),
    borderColor: colors.lightTints.redLightTint2[100]
  },
  warningIcon: {
    marginRight: normalize(10),
  },
  warningText: {
    flex: 1,
    fontSize: normalize(11.5),
    color: '#B91C1C',
    lineHeight: normalize(16),
  },
  verifyButton: {
    backgroundColor: '#1D64B5',
    borderRadius: normalize(16),
    paddingVertical: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    boxShadow: '0px 10px 15px -3px #BFDBFE, 0px 4px 6px -4px #BFDBFE'
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(13.5),
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  securityLockIcon: {
    marginRight: normalize(6),
  },
  securityNoteText: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  copyrightStrip: {
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightText: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
  },
});
