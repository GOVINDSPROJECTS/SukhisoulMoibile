import React, { useState, useRef, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = LottieView as unknown as React.ComponentType<any>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Lock, LockKeyholeOpen } from 'lucide-react-native';
import { SegmentedControl } from './components/SegmentedControl';
import { PhoneInput } from './components/PhoneInput';
import { PasswordInput } from './components/PasswordInput';
import { AuthButton } from './components/AuthButton';
import {
  GoogleLoginButton,
  WhatsAppLoginButton,
  GoogleCircleButton,
  WhatsAppCircleButton,
} from './components/SocialLoginButtons';
import { authService } from '../../features/auth/services/authService';
import { AppText } from '@/components/atoms';

export const PhoneLoginScreen: React.FC = () => {
  const { colors, typography, borderRadius } = useTheme();
  const navigation = useNavigation<any>();

  // State-driven Flow Logic
  const [isOnboarding, setIsOnboarding] = useState(true); // Step 1: Onboarding
  const [activeTab, setActiveTab] = useState(0); // 0 = Individual User, 1 = For Professionals
  const [isWhatsappFlow, setIsWhatsappFlow] = useState(false); // Sub-flow: Phone vs. WhatsApp login

  // Form Credential States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Validation Error States (Red Warn Labels)
  const [phoneError, setPhoneError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');

  // Professional Incorrect Password Modal
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);



  // Lottie Animation Control
  const lottieRef = useRef<any>(null);

  // Animated values for smooth transitions between tabs
  const lockAnim = useRef(new Animated.Value(activeTab === 1 ? 1 : 0)).current;
  const passwordAnim = useRef(new Animated.Value(activeTab === 1 ? 1 : 0)).current;
  const socialAnim = useRef(new Animated.Value(activeTab === 0 ? 1 : 0)).current;
  const profFooterAnim = useRef(new Animated.Value(activeTab === 1 ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(lockAnim, {
        toValue: activeTab === 1 ? 1 : 0,
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(passwordAnim, {
        toValue: activeTab === 1 ? 1 : 0,
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(socialAnim, {
        toValue: activeTab === 0 ? 1 : 0,
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(profFooterAnim, {
        toValue: activeTab === 1 ? 1 : 0,
        duration: 350,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
    ]).start();
  }, [activeTab]);

  // Interpolate heights and opacities
  const lockMaxHeight = lockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(76)],
  });
  const lockOpacity = lockAnim;

  const passwordMaxHeight = passwordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(116)],
  });
  const passwordOpacity = passwordAnim;

  const socialMaxHeight = socialAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(260)],
  });
  const socialOpacity = socialAnim;

  const profFooterMaxHeight = profFooterAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalize(160)],
  });
  const profFooterOpacity = profFooterAnim;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play(0, 10);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleGetStarted = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnboarding(false);
  };

  const handleWhatsAppOnboarding = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnboarding(false);
    setIsWhatsappFlow(true);
  };

  // Submit button handlers
  const handleSendOTP = async () => {
    setPhoneError('');
    if (phoneNumber.length < 10) {
      setPhoneError('Invalid details*');
      return;
    }

    setLoading(true);
    const fullNumber = `+91${phoneNumber}`;
    try {
      // Attempt Firebase SMS OTP
      const confirmation = await authService.signInWithPhoneNumber(fullNumber);
      setLoading(false);
      navigation.navigate('OTP', { confirmation, phoneNumber: fullNumber, initialTab: activeTab });
    } catch (error: any) {
      setLoading(false);
      console.log('[Auth] Firebase SMS notice (proceeding with dev/test OTP fallback):', error?.message || error);
      // Fallback for development/emulator testing: Navigate to OTP screen
      navigation.navigate('OTP', { confirmation: null, phoneNumber: fullNumber, initialTab: activeTab });
    }
  };

  const handleProfessionalLogin = () => {
    setPhoneError('');
    setPasswordError('');

    let hasError = false;
    if (phoneNumber.length < 10) {
      setPhoneError('Invalid details*');
      hasError = true;
    }
    if (password.length < 8) {
      setPasswordError('Invalid details*');
      hasError = true;
    }

    if (hasError) {
      // Trigger Figma mockup: Incorrect password modal pops up
      setIsPasswordModalVisible(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Notice', 'Therapist web portal authentication is enabled. Please log in via the web dashboard.');
    }, 1000);
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF', height: '100%' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          styles.flex,
          {
            // backgroundColor: colors.lightAppTheme[50],
            // borderColor: colors.lightAppTheme[100],
            // borderRadius: borderRadius.xl,
            height: '100%',
          }
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true} // iOS
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
        >

          {/* ================= STEP 1: ONBOARDING SPLASH ================= */}
          {isOnboarding ? (
            <View style={styles.onboardingContainer}>
              {/* Outer soft circle glow holding Inner white card logo */}
              <View style={[styles.outerGlowCircle, { backgroundColor: colors.appThemeColor[50] }]}>
                <View style={styles.innerLogoCircle}>
                  <AnimatedLottieView
                    ref={lottieRef}
                    source={require('../../assets/logogif.json')}
                    loop={false}
                    style={styles.onboardingLogo}
                    autoPlay={false}
                  />
                </View>
              </View>

              {/* Brands Branding */}
              <Text style={[styles.brandTitle, { color: colors.typographyColor['Dark 2'], fontFamily: typography.fontFamily.primary.bold }]}>
                Sukhi Soul
              </Text>
              <Text style={[styles.brandSubtitle, { color: colors.typographyColor.Medium, fontFamily: typography.fontFamily.primary.medium }]}>
                Be a Happy Soul
              </Text>

              {/* Start Trigger */}
              <AuthButton
                title="Get Started"
                onPress={handleGetStarted}
                style={styles.getStartedBtn}
              />

              {/* Social Login circles */}
              <View style={styles.socialOnboarding}>
                <View style={styles.dividerContainer}>
                  <View style={[styles.divider, { backgroundColor: colors.appThemeColor[500] }]} />
                  <Text style={[styles.dividerText, { color: '#3D4949', fontFamily: typography.fontFamily.primary.medium }]}>
                    Or continue with
                  </Text>
                  <View style={[styles.divider, { backgroundColor: colors.appThemeColor[500] }]} />
                </View>

                <View style={styles.circlesRow}>
                  <GoogleCircleButton onPress={handleGoogleSignIn} loading={googleLoading} />
                  <WhatsAppCircleButton onPress={handleWhatsAppOnboarding} />
                </View>
              </View>
            </View>
          ) : (

            // ================= STEP 2: CREDENTIALS TAB CARD =================
            <View style={styles.authCardContainer}>

              {/* Small Header Branding */}
              <View style={styles.smallHeader}>
                {/* <View style={[styles.smallLogoCircle, { backgroundColor: colors.lightAppTheme[50] }]}> */}
                <Image
                  source={require('../../assets/Logo.png')}
                  style={styles.smallLogo}
                  resizeMode="contain"
                />
                {/* </View> */}
                <Text style={[styles.smallTitle, { color: colors.appThemeColor[600], fontFamily: typography.fontFamily.primary.black }]}>
                  Sukhi Soul
                </Text>
                <Text style={[styles.smallSubtitle, { color: colors.lightAppTheme[600], fontFamily: typography.fontFamily.primary.medium }]}>
                  Be a <Text style={[{ color: colors.blue[500] }]}>Happy Soul</Text>
                </Text>
              </View>

              {/* High-Fidelity credentials card */}
              <View style={[
                styles.authCard,
                {
                  // backgroundColor: colors.lightAppTheme[50],
                  // borderColor: colors.lightAppTheme[100],
                  // borderRadius: borderRadius.xl,
                  height: '100%',
                }
              ]}>

                {/* Responsive Tab Bar switcher */}
                <SegmentedControl
                  selectedIndex={activeTab}
                  onChange={(index) => {
                    setActiveTab(index);
                    setPhoneNumber('');
                    setPassword('');
                    setPhoneError('');
                    setPasswordError('');
                  }}
                  values={['Individual User', 'For Professionals']}
                />

                {/* Unified animating form container */}
                <View style={styles.formSection}>
                  <View style={{ marginTop: activeTab === 1 ? normalize(15) : normalize(45) }}></View>

                  {/* Lock Banner Container */}
                  <Animated.View
                    pointerEvents={activeTab === 1 ? 'auto' : 'none'}
                    style={{
                      maxHeight: lockMaxHeight,
                      opacity: lockOpacity,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={[
                      styles.lockBanner,
                      {
                        // backgroundColor: '#E6F4FF',
                        // borderColor: colors.lightAppTheme[200],
                        // borderRadius: borderRadius.m,
                      }
                    ]}>
                      <View style={{ backgroundColor: colors.appThemeColor[200], width: normalize(32), height: normalize(32), marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 99 }}>
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

                  {/* Common Phone Input */}
                  <PhoneInput
                    label={activeTab === 0 && isWhatsappFlow ? "Enter Whatsapp Number" : "Enter Phone Number"}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="0000 0000 00"
                    error={phoneError}
                  />

                  {/* Password Field (only in Professional tab) */}
                  <Animated.View
                    pointerEvents={activeTab === 1 ? 'auto' : 'none'}
                    style={{
                      maxHeight: passwordMaxHeight,
                      opacity: passwordOpacity,
                      overflow: 'hidden',
                    }}
                  >
                    <PasswordInput
                      label="Password"
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••"
                      error={passwordError}
                      rightLabelText="Forgot Password?"
                      onRightLabelPress={() => {
                        setPhoneError('');
                        setPasswordError('');
                        setIsPasswordModalVisible(true);
                      }}
                    />
                  </Animated.View>

                  {/* Shared Submit Button */}
                  <AuthButton
                    title={activeTab === 0 ? "Get OTP" : "Get Started"}
                    onPress={activeTab === 0 ? handleSendOTP : handleProfessionalLogin}
                    loading={loading}
                    style={styles.submitBtn}
                  />

                  {/* Individual social logins & policy */}
                  <Animated.View
                    pointerEvents={activeTab === 0 ? 'auto' : 'none'}
                    style={{
                      maxHeight: socialMaxHeight,
                      opacity: socialOpacity,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ width: '100%', marginTop: normalize(18) }}>
                      <View style={styles.dividerContainer}>
                        <View style={[styles.divider, { backgroundColor: colors.appThemeColor[500] }]} />
                        <Text style={[styles.dividerText, { color: '#3D4949', fontFamily: typography.fontFamily.primary.medium }]}>
                          Or continue with
                        </Text>
                        <View style={[styles.divider, { backgroundColor: colors.appThemeColor[500] }]} />
                      </View>

                      <View style={{ marginBottom: normalize(8) }}>
                        <GoogleLoginButton onPress={handleGoogleSignIn} loading={googleLoading} />
                        {!isWhatsappFlow && (
                          <WhatsAppLoginButton onPress={handleWhatsAppOnboarding} />
                        )}

                        <TouchableOpacity onPress={() => { navigation.navigate('OTP', {}); }} activeOpacity={0.5} >
                          <Text style={[{ color: colors.lightTints.redLightTint2[400], fontFamily: typography.fontFamily.primary.bold, paddingTop: 0, textAlign: 'center', borderRadius: 10, marginTop: 10 }]}>
                            SKIP SCREEN (DEV ONLY)
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.footerContainer}>
                        <Text style={[styles.footerText, { color: colors.typographyColor.Light, fontFamily: typography.fontFamily.secondary.light }]}>
                          By continuing, you agree to Sukhi Soul's
                        </Text>
                        <Text style={[styles.footerText, { color: colors.typographyColor.Light, fontFamily: typography.fontFamily.secondary.light }]}>
                          <Text style={[styles.link, { color: colors.lightAppTheme[700] }]}>Terms of Service</Text> and{' '}
                          <Text style={[styles.link, { color: colors.lightAppTheme[700] }]}>Privacy Policy</Text>.
                        </Text>
                      </View>
                    </View>
                  </Animated.View>

                  {/* Professional partnership / footer links */}
                  <Animated.View
                    pointerEvents={activeTab === 1 ? 'auto' : 'none'}
                    style={{
                      maxHeight: profFooterMaxHeight,
                      opacity: profFooterOpacity,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={[styles.professionalFooter, { marginTop: normalize(16), height: '85%' }]}>
                      <View style={styles.applyContainer}>
                        <Text style={[styles.applyText, { color: colors.typographyColor['Theme Medium'], fontFamily: typography.fontFamily.primary.regular }]}>
                          Join as Psychologist
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('PartnershipWebView', {});
                          }}
                          activeOpacity={0.7}
                        >
                          <Text style={[styles.applyLink, { color: colors.typographyColor['Dark 2'], fontFamily: typography.fontFamily.primary.extraBold }]}>
                            Apply for Partnership
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.footLinksContainer}>
                        <TouchableOpacity activeOpacity={0.7}><Text style={[styles.footLink, { color: colors.typographyColor.Dark, fontFamily: typography.fontFamily.primary.regular }]}>Privacy Policy</Text></TouchableOpacity>
                        <Text style={[styles.dotSep, { color: colors.typographyColor.Dark }]}>·</Text>
                        <TouchableOpacity activeOpacity={0.7}><Text style={[styles.footLink, { color: colors.typographyColor.Dark, fontFamily: typography.fontFamily.primary.regular }]}>Terms of Service</Text></TouchableOpacity>
                        <Text style={[styles.dotSep, { color: colors.typographyColor.Dark }]}>·</Text>
                        <TouchableOpacity activeOpacity={0.7}><Text style={[styles.footLink, { color: colors.typographyColor.Dark, fontFamily: typography.fontFamily.primary.regular }]}>Help Center</Text></TouchableOpacity>
                      </View>
                    </View>
                  </Animated.View>

                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ================= INCORRECT PASSWORD MODAL OVERLAY ================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPasswordModalVisible}
        onRequestClose={() => setIsPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { borderRadius: borderRadius.l }]}>
            <Text style={[styles.modalTitle, { color: colors.lightAppTheme[950], fontFamily: typography.fontFamily.primary.medium }]}>
              Incorrect Password
            </Text>
            <Text style={[styles.modalBody, { color: colors.lightAppTheme[600], fontFamily: typography.fontFamily.primary.medium }]}>
              The password you entered is incorrect.
            </Text>
            <TouchableOpacity
              onPress={() => setIsPasswordModalVisible(false)}
              activeOpacity={0.8}
              style={[styles.modalButton, { borderColor: colors.lightAppTheme[700] }]}
            >
              <Text style={[styles.modalButtonText, { color: colors.lightAppTheme[700], fontFamily: typography.fontFamily.primary.medium }]}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(16),
  },

  // ================= ONBOARDING ON SPLASH =================
  onboardingContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
  },
  outerGlowCircle: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(130),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
    // Drop shadow
    shadowColor: '#2582CD',
    shadowOffset: { width: 4.4, height: 4.4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 22,
  },
  innerLogoCircle: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(130),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // Inner shadow style
    shadowColor: '#B7D5FF',
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 1.00,
    shadowRadius: 110,
    elevation: 2,
  },
  onboardingLogo: {
    width: normalize(180),
    height: normalize(180),
  },
  brandTitle: {
    fontSize: normalize(40),
    textAlign: 'center',
    letterSpacing: -0.6
  },
  brandSubtitle: {
    fontSize: normalize(16),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: normalize(50),
  },
  getStartedBtn: {
    width: '80%',
    height: normalize(56),
    marginBottom: normalize(16),
  },
  socialOnboarding: {
    width: '100%',
    marginTop: normalize(10),
  },
  circlesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(16),
  },

  // ================= MAIN CREDENTIALS CARD =================
  authCardContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
    height: '100%',
  },
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
    marginBottom: normalize(10),
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
  authCard: {
    width: '100%',
    padding: normalize(0),
  },
  formSection: {
    width: '100%',
    height: '100%'

  },
  submitBtn: {
    height: normalize(56),
    marginTop: normalize(25),
    marginBottom: normalize(8),
    alignSelf: 'center',
    width: '80%',
  },
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

  // ================= PROFESSIONAL PORTAL BANNER =================
  lockBannerWrapper: {
    overflow: 'hidden',
    marginBottom: normalize(4),
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
  lockTitle: {
    fontSize: normalize(14),
    letterSpacing: 0.2,
  },
  lockSubtitle: {
    fontSize: normalize(10),
    letterSpacing: -0.2,
    marginTop: normalize(1),
  },

  // ================= FOOTER ELEMENTS =================
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
  professionalFooter: {
    width: '100%',
    alignItems: 'center',
    marginTop: normalize(24),
  },
  applyContainer: {
    alignItems: 'center',
    marginBottom: normalize(32),
  },
  applyText: {
    fontSize: normalize(13),
  },
  applyLink: {
    fontSize: normalize(18),
    marginTop: normalize(0),
  },
  footLinksContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  footLink: {
    fontSize: normalize(12),
  },
  dotSep: {
    marginHorizontal: normalize(8),
    fontSize: normalize(12),
    fontWeight: '900',
  },

  // ================= MODAL DIALOGS =================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '82%',
    padding: normalize(24),
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: normalize(18),
    fontWeight: '800',
    marginBottom: normalize(8),
  },
  modalBody: {
    fontSize: normalize(14),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: normalize(24),
    lineHeight: normalize(20),
  },
  modalButton: {
    borderWidth: 1.5,
    width: '100%',
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(24),
  },
  modalButtonText: {
    fontSize: normalize(14),
    fontWeight: '800',
  },


  // TESTING, REMOVE, DEV ONLY
  scrollContentDev: {
    flexDirection: 'column', // Stack elements vertically into columns
    flexWrap: 'wrap',        // Wrap items to the next column when they hit the height limit
    height: 140,             // Crucial: Adjust this height to control if 2 or 3 buttons fit vertically
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    marginHorizontal: 12,    // Spacing between horizontal columns
    marginVertical: 6,       // Spacing between vertical items inside a column
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#000000",
    fontFamily: typography.fontFamily.primary.bold,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: normalize(12),
    borderWidth: normalize(1),
    borderColor: 'red',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
    backgroundColor: colors.lightTints.redLightTint2[100]
  }

});
