import React, { useState, useEffect, useRef } from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Lock,ChevronLeft, ArrowLeft } from 'lucide-react-native';
import { AuthButton } from './components/AuthButton';
import { OTPInput } from './components/OTPInput';
import { SegmentedControl } from './components/SegmentedControl';
import { GoogleLoginButton, WhatsAppLoginButton } from './components/SocialLoginButtons';
import { authService } from '../../features/auth/services/authService';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const OTPScreen: React.FC = () => {
  const { colors, typography, borderRadius } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // Safely extract routing arguments (defaulting activeTab to incoming login state)
  const { confirmation, phoneNumber, initialTab = 0 } = route.params || {};

  const [activeTab, setActiveTab] = useState(initialTab);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [currentConfirmation, setCurrentConfirmation] = useState(confirmation);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ─── Animated values for the Professional lock banner ───────────────────────
  // opacity: fades the banner in/out
  // slideY: slides it up from slightly below
  // scaleY: collapses the height to 0 when hidden (avoids layout gap)
  const bannerOpacity = useRef(new Animated.Value(initialTab === 1 ? 1 : 0)).current;
  const bannerSlideY = useRef(new Animated.Value(initialTab === 1 ? 0 : -8)).current;
  const bannerHeight = useRef(new Animated.Value(initialTab === 1 ? 1 : 0)).current;
  // We track a boolean for rendering so the node is kept in the tree during animation
  const [isBannerMounted, setIsBannerMounted] = useState(initialTab === 1);

  // OTP timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ─── Animate the lock banner whenever the tab changes ───────────────────────
  useEffect(() => {
    if (activeTab === 1) {
      // Mount then animate in
      setIsBannerMounted(true);
      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: false,
        }),
        Animated.timing(bannerSlideY, {
          toValue: 0,
          duration: 280,
          useNativeDriver: false,
        }),
        Animated.timing(bannerHeight, {
          toValue: 1,
          duration: 260,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Animate out then unmount
      Animated.parallel([
        Animated.timing(bannerOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: false,
        }),
        Animated.timing(bannerSlideY, {
          toValue: -8,
          duration: 220,
          useNativeDriver: false,
        }),
        Animated.timing(bannerHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) setIsBannerMounted(false);
      });
    }
  }, [activeTab]);

  const handleVerify = async () => {
    if (code.length < 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code sent to your phone.');
      return;
    }

    setLoading(true);
    try {
      if (currentConfirmation && currentConfirmation.confirm) {
        await currentConfirmation.confirm(code);
      } else {
        // Dev fallback: Set authenticated user state
        const phoneDigits = (phoneNumber || '9876543210').replace(/\D/g, '');
        const mockUser: any = {
          uid: 'user_' + (phoneDigits.slice(-6) || '1024'),
          displayName: 'Prathmesh Deokar',
          email: 'user@sukhisoul.com',
          phoneNumber: phoneNumber || '+91 98765 43210',
          photoURL: null,
        };
        useAuthStore.getState().setUser(mockUser);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('App');
        }, 600);
        return;
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      Alert.alert('Verification Failed', 'The code you entered is incorrect or has expired.');
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setLoading(true);
    try {
      const newConfirmation = await authService.signInWithPhoneNumber(phoneNumber);
      setCurrentConfirmation(newConfirmation);
      setTimer(30);
      Alert.alert('OTP Sent', 'A new verification code has been sent to your phone.');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      console.error(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleTabChange = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(index);
    setCode('');
  };

  // Interpolate banner maxHeight from 0 → 72 (enough for the banner content)
  const bannerMaxHeight = bannerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(72)],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.backButtonText
              ]}
            >
              <ArrowLeft size={normalize(16)} color={colors.lightAppTheme[700]} />
              <Text  style={[
                styles.backButtonText,
                {
                  color: colors.lightAppTheme[700],
                  fontSize: typography.body2.fontSize,
                  fontFamily: typography.fontFamily.primary.medium,
                },
              ]}>Back to Login</Text>
            </View>
          </TouchableOpacity>

          {/* Small Header Branding */}
          <View style={styles.smallHeader}>
            
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.smallLogo}
                resizeMode="contain"
              />
            <Text style={[styles.smallTitle, { color: colors.appThemeColor[600], fontFamily: typography.fontFamily.primary.black }]}>
              Sukhi Soul 
            </Text>
            <Text style={[styles.smallSubtitle, { color: colors.lightAppTheme[600], fontFamily: typography.fontFamily.primary.medium }]}>
              Be a <Text style={[{color: colors.blue[500]}]}>Happy Soul</Text>
            </Text>
          </View>

          {/* OTP Verification Card */}
          <View
            style={[
              styles.authCard,
              {
                // backgroundColor: colors.lightAppTheme[50],
                // borderColor: colors.lightAppTheme[100],
                // borderRadius: borderRadius.xl,
              },
            ]}
          >
            {/* ── Tab Bar (Individual / For Professionals) ── */}
            <SegmentedControl
              selectedIndex={activeTab}
              onChange={handleTabChange}
              values={['Individual User', 'For Professionals']}
            />
            <View>

              <View style={{ marginTop : activeTab === 1 ? normalize(15) : normalize(45) }}></View>
              {/* ── Animated Professional Lock Banner ─────────── */}
              {isBannerMounted && (
                <Animated.View
                  style={[
                    styles.lockBannerWrapper,
                    {
                      opacity: bannerOpacity,
                      maxHeight: bannerMaxHeight,
                      transform: [{ translateY: bannerSlideY }],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.lockBanner,
                      {
                        // backgroundColor: '#E6F4FF',
                        // borderColor: colors.lightAppTheme[200],
                        // borderRadius: borderRadius.m,
                      },
                    ]}
                  >
                    <View style={{backgroundColor:colors.appThemeColor[200], width:normalize(32), height:normalize(32),  marginRight:10, display:'flex', justifyContent:'center', alignItems: 'center', borderRadius: 99}}>
                      {/* <LockKeyholeOpen size={normalize(17)} color={colors.appThemeColor[700]} /> */}
                      <Svg width="19" height="19" viewBox="0 0 10 14" fill="none">
                          <Path 
                            fill={colors.appThemeColor[700]}
                            d="M1.19972 4.19902H6.59846V2.9993C6.59846 2.49942 6.4235 2.07452 6.07359 1.7246C5.72367 1.37468 5.29877 1.19972 4.79888 1.19972C4.299 1.19972 3.8741 1.37468 3.52418 1.7246C3.17426 2.07452 2.9993 2.49942 2.9993 2.9993H1.79958C1.79958 2.1695 2.09201 1.46216 2.67688 0.877296C3.26174 0.292432 3.96908 0 4.79888 0C5.62869 0 6.33603 0.292432 6.92089 0.877296C7.50575 1.46216 7.79818 2.1695 7.79818 2.9993V4.19902H8.39805C8.72797 4.19902 9.0104 4.3165 9.24535 4.55144C9.48029 4.78639 9.59777 5.06882 9.59777 5.39874V11.3973C9.59777 11.7273 9.48029 12.0097 9.24535 12.2446C9.0104 12.4796 8.72797 12.5971 8.39805 12.5971H1.19972C0.869798 12.5971 0.587363 12.4796 0.352418 12.2446C0.117473 12.0097 0 11.7273 0 11.3973V5.39874C0 5.06882 0.117473 4.78639 0.352418 4.55144C0.587363 4.3165 0.869798 4.19902 1.19972 4.19902ZM1.19972 11.3973H8.39805V5.39874H1.19972V11.3973ZM4.79888 9.59777C5.12881 9.59777 5.41124 9.48029 5.64619 9.24535C5.88113 9.0104 5.9986 8.72797 5.9986 8.39805C5.9986 8.06812 5.88113 7.78569 5.64619 7.55074C5.41124 7.3158 5.12881 7.19832 4.79888 7.19832C4.46896 7.19832 4.18653 7.3158 3.95158 7.55074C3.71663 7.78569 3.59916 8.06812 3.59916 8.39805C3.59916 8.72797 3.71663 9.0104 3.95158 9.24535C4.18653 9.48029 4.46896 9.59777 4.79888 9.59777Z"
                            />
                        </Svg>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.lockTitle, { color: colors.typographyColor['Theme Medium'], fontFamily: typography.fontFamily.secondary.medium }]}>
                        Professional Portal
                      </Text>
                      <Text style={[styles.lockSubtitle, { color: colors.typographyColor.Light, fontFamily: typography.fontFamily.secondary.light }]}>
                        OFFICIAL ACCESS ONLY
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              )}

              {/* ── OTP label ────────────────────────────────── */}
              <Text
                style={[
                  styles.label,
                  {color: '#3D4949', fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium, display:'flex', flexDirection: 'column' },
                ]}
              >
                OTP<Text style={[{ color: colors.colorPalet['Color 6'] }]}>*</Text> 
              </Text>

              {/* ── 6-box OTP Input ───────────────────────────── */}
              <OTPInput code={code} setCode={setCode} length={6} />

              {/* ── Resend Action ─────────────────────────────── */}
              <View style={styles.resendContainer}>
                <Text
                  style={[
                    styles.resendText,
                    {
                      color: colors.lightAppTheme[500],
                      fontSize: normalize(12),
                      fontFamily: typography.fontFamily.primary.medium,
                    },
                  ]}
                >
                  Didn't receive the code?{' '}
                </Text>
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={timer > 0}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.resendLink,
                      {
                        color:
                          timer > 0
                            ? colors.lightAppTheme[300]
                            : colors.lightAppTheme[700],
                        fontSize: typography.body2.fontSize,
                        fontFamily: typography.fontFamily.primary.medium,
                      },
                    ]}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ── Submit Button ─────────────────────────────── */}
              <AuthButton
                title="Verify & Continue"
                onPress={handleVerify}
                loading={loading}
                style={styles.submitBtn}
              />

              {/* ── Social Continue Divider ───────────────────── */}
              <View style={styles.dividerContainer}>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: colors.lightAppTheme[200] },
                  ]}
                />
                <Text
                  style={[
                    styles.dividerText,
                    {
                      color: colors.lightAppTheme[400],
                      fontFamily: typography.fontFamily.primary.medium,
                    },
                  ]}
                >
                  Or continue with
                </Text>
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: colors.lightAppTheme[200] },
                  ]}
                />
              </View>

              <GoogleLoginButton onPress={handleGoogleSignIn} loading={googleLoading} />
              <WhatsAppLoginButton
                onPress={() =>
                  Alert.alert(
                    'WhatsApp Login',
                    'Demonstrating stacked social continuations.',
                  )
                }
              />


              <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} activeOpacity={0.5} >
                <Text style={[{ color: colors.lightTints.redLightTint2[400], fontFamily: typography.fontFamily.primary.bold,  paddingTop:0, textAlign:'center',borderRadius:10, marginTop: 10 }]}>
                  SKIP SCREEN (DEV ONLY)
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Footer policies */}
          <View style={styles.footerContainer}>
            <Text
              style={[
                styles.footerText,
                {
                  color: colors.lightAppTheme[600],
                  fontFamily: typography.fontFamily.primary.medium,
                },
              ]}
            >
              By continuing, you agree to Sukhi Soul's
            </Text>
            <Text
              style={[
                styles.footerText,
                {
                  color: colors.lightAppTheme[600],
                  fontFamily: typography.fontFamily.primary.medium,
                },
              ]}
            >
              <Text style={[styles.link, { color: colors.lightAppTheme[700] }]}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={[styles.link, { color: colors.lightAppTheme[700] }]}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Back button ───────────────────────────────────────────────────────────
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: normalize(16),
  },
  backButtonText: {
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: normalize(4),
  },

  // ── Small header branding ─────────────────────────────────────────────────
  smallHeader: {
    alignItems: 'center',
    marginBottom: normalize(24),
  },
  smallLogoCircle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  smallLogo: {
    width: normalize(64),
    height: normalize(64),
    marginBottom:normalize(10),
  },
  smallTitle: {
    fontSize: normalize(22),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: normalize(0),
  },
  smallSubtitle: {
    fontSize: normalize(11),
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Auth card ─────────────────────────────────────────────────────────────
  authCard: {
    width: '100%',
    padding: normalize(10),
    // borderWidth: 1,
  },

  // ── OTP label ─────────────────────────────────────────────────────────────
  label: {
    marginLeft: normalize(4),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: normalize(0),
  },

  // ── Animated Lock Banner ─────────────────────────────────────────────────
  lockBannerWrapper: {
    overflow: 'hidden',
    marginBottom: normalize(8),
  },
  lockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: normalize(16),
    // paddingVertical: normalize(12),
    // borderWidth: 1,
    marginBottom: normalize(4),
    marginTop: normalize(0)
  },
  lockIcon: {
    marginRight: normalize(12),
  },
  lockTitle: {
    fontSize: normalize(14),
    letterSpacing: 0.2,
  },
  lockSubtitle: {
    fontSize: normalize(10),
    letterSpacing: -0.2,
    marginTop: normalize(1),
  },

  // ── Resend row ────────────────────────────────────────────────────────────
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  resendText: {
    fontWeight: '600',
  },
  resendLink: {
    fontWeight: '700',
  },

  // ── Submit ────────────────────────────────────────────────────────────────
  submitBtn: {
    height: normalize(56),
    marginBottom: normalize(8),
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(12),
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: normalize(12),
    fontSize: normalize(12),
    fontWeight: '600',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerContainer: {
    marginTop: normalize(24),
    alignItems: 'center',
  },
  footerText: {
    fontSize: normalize(12),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: normalize(18),
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
