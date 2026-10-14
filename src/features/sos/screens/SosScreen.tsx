import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, User, Phone, ShieldCheck, Heart, HeartHandshake, User2, ArrowRight, LogOut, AlertTriangle, Siren } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { api } from '@api/client';

export const SosScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [isTriggeringSos, setIsTriggeringSos] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const handleCallTrusted = () => {
    Alert.alert(
      'Emergency Call Assistance',
      'Choose a crisis helpline or dial your personal contact:',
      [
        {
          text: 'National Emergency (112)',
          onPress: () => Linking.openURL('tel:112'),
        },
        {
          text: 'KIRAN Helpline (1800-599-0019)',
          onPress: () => Linking.openURL('tel:18005990019'),
        },
        {
          text: 'Open Phone Dialer',
          onPress: () => Linking.openURL('tel:'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleTriggerSos = useCallback(() => {
    Alert.alert(
      'Trigger Emergency SOS?',
      'This will immediately alert our emergency response team and dispatch a high-risk case flag to your assigned therapist.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send SOS Alert',
          style: 'destructive',
          onPress: async () => {
            setIsTriggeringSos(true);
            try {
              await api.post('/v1/crisis/sos', {
                notes: 'Emergency SOS alert initiated from mobile app',
              });
              setSosActive(true);
              Alert.alert(
                'SOS Alert Dispatched',
                'Your crisis alert has been broadcasted to the clinical response team with urgent priority.\n\nPlease call 112 or 1800-599-0019 if you are in immediate danger.',
                [
                  {
                    text: 'Call KIRAN (1800-599-0019)',
                    onPress: () => Linking.openURL('tel:18005990019'),
                  },
                  { text: 'OK' },
                ]
              );
            } catch (err: any) {
              console.log('[SOS Trigger error]:', err?.message);
              Alert.alert(
                'Emergency Services',
                'If you are in immediate distress or danger, please connect directly to national emergency lines:',
                [
                  {
                    text: 'Call 112 (Emergency)',
                    onPress: () => Linking.openURL('tel:112'),
                  },
                  {
                    text: 'Call Tele-MANAS (14416)',
                    onPress: () => Linking.openURL('tel:14416'),
                  },
                  { text: 'Close', style: 'cancel' },
                ]
              );
            } finally {
              setIsTriggeringSos(false);
            }
          },
        },
      ]
    );
  }, []);

  const handleGovernmentNumbers = () => {
    navigation.navigate('SosHelpline');
  };

  const handleIFeelSafe = () => {
    navigation.goBack();
  };

  const handleQuickExit = () => {
    // Navigate to home immediately
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* Header */}

      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>
        <AppText variant="h4" weight="bold" style={styles.headerTitle}>
          SOS
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <View style={[styles.content, { paddingBottom: insets.bottom + normalize(24) }]}>
        {/* Hero Title */}
        <View style={styles.heroSection}>
          <View>
            <AppText variant="h2" weight="extraBold" style={styles.heroTitle}>
              How can we{'\n'}help you?
            </AppText>
            <AppText variant="body" weight="regular" style={styles.heroSubtitle}>
              You're not alone. Choose the type{'\n'}of support that feels right for you{'\n'}right now.
            </AppText>
          </View>
          <View style={styles.heroIcon}>
            <HeartHandshake size={normalize(30)} color={colors.blue[400]} strokeWidth={1.5} />
          </View>
        </View>

        {/* Top Two Option Cards */}
        <View style={styles.twoCardsRow}>
          {/* Call Someone I Trust */}
          <TouchableOpacity
            style={[styles.optionCard, styles.optionCardBlue]}
            activeOpacity={0.85}
            onPress={handleCallTrusted}
          >
            <View style={styles.optionIconWrapper}>
              <User2 size={normalize(24)} color={colors.blue[700]} />
            </View>
            <AppText variant="body" weight="bold" style={styles.optionTitle}>
              Call Someone{'\n'}I Trust
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.optionSubtitle}>
              Call your emergency contacts
            </AppText>
            <View style={styles.arrowCircle}>
              <AppText style={styles.arrowText}>
                <ArrowRight size={normalize(16)} color={colors.blue[600]} strokeWidth={2} />
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Government Helpline Numbers */}
          <TouchableOpacity
            style={[styles.optionCard, styles.optionCardGreen]}
            activeOpacity={0.85}
            onPress={handleGovernmentNumbers}
          >
            <View style={styles.optionIconWrapperGreen}>
              <Phone size={normalize(20)} color={colors.green[500]} />
            </View>
            <AppText variant="body" weight="bold" style={styles.optionTitle}>
              Government{'\n'}Helpline{'\n'}Numbers
            </AppText>
            <AppText variant="caption" weight="extraBold" style={styles.optionBadge}>
              IMPORTANT NUMBERS IN INDIA
            </AppText>
            <View style={styles.arrowCircle}>
              <AppText style={styles.arrowText}>
                <ArrowRight size={normalize(16)} color={colors.blue[600]} strokeWidth={2} />
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Emergency SOS Broadcast Action */}
        <TouchableOpacity
          style={[
            styles.sosAlertCard,
            sosActive && { backgroundColor: '#FEE2E2', borderColor: '#DC2626' }
          ]}
          activeOpacity={0.85}
          onPress={handleTriggerSos}
          disabled={isTriggeringSos}
        >
          <View style={styles.sosAlertLeft}>
            <View style={[styles.sosAlertIconWrapper, sosActive && { backgroundColor: '#DC2626' }]}>
              {isTriggeringSos ? (
                <ActivityIndicator color={sosActive ? '#FFFFFF' : '#DC2626'} size="small" />
              ) : (
                <Siren size={normalize(22)} color={sosActive ? '#FFFFFF' : '#DC2626'} strokeWidth={2} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="body" weight="extraBold" style={{ color: '#991B1B', fontSize: normalize(14) }}>
                {sosActive ? 'Emergency Alert Active' : 'Dispatch Emergency SOS'}
              </AppText>
              <AppText variant="caption" weight="medium" style={{ color: '#B91C1C', marginTop: normalize(2), fontSize: normalize(11) }}>
                {sosActive
                  ? 'Response protocol initiated. Support team is alerted.'
                  : 'Immediately flags your case to crisis specialists & therapist'}
              </AppText>
            </View>
          </View>
          <View style={[styles.sosAlertBtnBadge, sosActive && { backgroundColor: '#991B1B' }]}>
            <AppText variant="caption" weight="bold" style={{ color: '#FFFFFF', fontSize: normalize(10) }}>
              {isTriggeringSos ? 'SENDING' : sosActive ? 'ACTIVE' : 'SOS ALERT'}
            </AppText>
          </View>
        </TouchableOpacity>

        {/* I Feel Safe Card */}
        <View style={styles.safeCard}>
          <View style={styles.safeIconWrapper}>
            <ShieldCheck size={normalize(23)} color="#ffffff" />
          </View>
          <AppText variant="h3" weight="extraBold" style={styles.safeTitle}>
            I feel safe
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.safeSubtitle}>
            Need to hide this screen instantly?{'\n'}Use the quick exit button below.
          </AppText>

          {/* Quick Exit Button */}
          <TouchableOpacity
            style={styles.quickExitBtn}
            activeOpacity={0.85}
            onPress={handleQuickExit}
          >
            <View>
              <LogOut color='#FFFFFF' size={normalize(20)} strokeWidth={2} />
            </View>
            <AppText variant="body" weight="bold" style={styles.quickExitText}>
              Quick Exit
            </AppText>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
    justifyContent: 'space-between',
    marginBottom: normalize(15),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: normalize(16),
    color: colors.appThemeColor[900],
  },
  heartBtn: {
    width: normalize(36),
    height: normalize(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: normalize(36),
  },
  content: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  heroSection: {
    marginBottom: normalize(24),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroTitle: {
    fontSize: normalize(30),
    color: colors.typographyColor.Black,
    lineHeight: normalize(40),
    marginBottom: normalize(10),
  },
  heroIcon: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: normalize(999),
    padding: normalize(10),
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  heroSubtitle: {
    fontSize: normalize(14),
    color: colors.lightAppTheme[600],
    lineHeight: normalize(20),
  },
  twoCardsRow: {
    flexDirection: 'row',
    gap: normalize(12),
    marginBottom: normalize(16),
  },
  optionCard: {
    flex: 1,
    borderRadius: normalize(22),
    padding: normalize(16),
    minHeight: normalize(180),
    justifyContent: 'space-between',
  },
  optionCardBlue: {
    backgroundColor: colors.blue[50],
    borderWidth: 1,
    borderColor: colors.blue[50],
  },
  optionCardGreen: {
    backgroundColor: colors.green[50],
    borderWidth: 1,
    borderColor: colors.green[50],
  },
  optionIconWrapper: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  optionIconWrapperGreen: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  optionTitle: {
    fontSize: normalize(13.5),
    color: colors.appThemeColor[900],
    lineHeight: normalize(18),
    marginBottom: normalize(4),
  },
  optionSubtitle: {
    fontSize: normalize(12),
    color: colors.lightAppTheme[600],
    marginBottom: normalize(8),
  },
  optionBadge: {
    fontSize: normalize(9),
    color: colors.lightAppTheme[600],
    letterSpacing: 0.3,
    marginBottom: normalize(8),
  },
  arrowCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(14),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  arrowText: {
    fontSize: normalize(14),
    color: colors.appThemeColor[900],
  },
  safeCard: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(32),
    padding: normalize(24),
    alignItems: 'center',
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: colors.blue[50],
  },
  safeIconWrapper: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: colors.green[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  safeTitle: {
    fontSize: normalize(20),
    color: colors.typographyColor.Black,
    marginBottom: normalize(6),
  },
  safeSubtitle: {
    fontSize: normalize(12.5),
    color: colors.lightAppTheme[600],
    textAlign: 'center',
    lineHeight: normalize(18),
  },
  quickExitBtn: {
    backgroundColor: colors.lightAppTheme[700],
    borderRadius: normalize(22),
    height: normalize(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
    shadowColor: colors.blue[800],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: normalize(12),
    width: '100%',

  },
  quickExitIcon: {
    fontSize: normalize(22),
    color: '#FFFFFF',
  },
  quickExitText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
  sosAlertCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: normalize(20),
    padding: normalize(14),
    marginBottom: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sosAlertLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginRight: normalize(10),
  },
  sosAlertIconWrapper: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosAlertBtnBadge: {
    backgroundColor: '#DC2626',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
