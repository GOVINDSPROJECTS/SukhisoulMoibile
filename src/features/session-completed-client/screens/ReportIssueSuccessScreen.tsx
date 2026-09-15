import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { AppButton } from '@components/atoms/AppButton';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { ArrowLeft, Clock, Lock, Heart } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

export const ReportIssueSuccessScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBackToHome = () => {
    // Navigate back to home and reset stack to prevent going back to success screen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <ArrowLeft size={normalize(22)} color={colors.blue[800]} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText variant="body" family="secondary" weight="semiBold" style={styles.title}>
            Support
          </AppText>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.successCard}>
          <AppText style={styles.successTitle} weight="bold" family="secondary">
            Complaint Submitted
          </AppText>
          <AppText style={styles.successSub} weight='regular'>
            Thank you for reaching out. We have received your message and our team is ready to assist you.
          </AppText>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.referenceRow}>
            <AppText style={styles.referenceLabel} weight="semiBold">REFERENCE ID</AppText>
            <AppText style={styles.referenceValue} weight="semiBold">#MJ-9921</AppText>
          </View>

          <View style={styles.divider} />

          <View style={styles.responseRow}>
            <View style={styles.clockIconContainer}>
              <Clock size={normalize(22)} color={colors.blue[400]} />
            </View>
            <View>
              <AppText style={styles.responseLabel}>Response expected in</AppText>
              <AppText style={styles.responseValue} weight="bold">24-48 hours</AppText>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={handleBackToHome}
          >
            <AppText style={styles.homeBtnText} weight="medium">Back To Home</AppText>
          </TouchableOpacity>

          <View style={styles.wellbeingRow}>
            <Heart size={normalize(14)} color={colors.blue[500]} />
            <AppText style={styles.wellbeingText}>Your well-being is our priority.</AppText>
          </View>
        </View>

        <View style={styles.footerPrivacy}>
          <View style={styles.lockIconContainerLight}>
            <Lock size={normalize(16)} color={colors.blue[400]} />
          </View>
          <View style={styles.privacyTextContainer}>
            <AppText style={styles.privacyTitle} weight="extraBold">Your privacy matters</AppText>
            <AppText style={styles.privacySub} weight="regular">All reports are confidential and securely handled. We're here to support you.</AppText>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
  },
  backBtn: {
    padding: normalize(4),
  },
  title: {
    color: colors.blue[600],
    fontSize: normalize(16),
  },
  placeholder: {
    width: normalize(30),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    padding: normalize(20),
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(24),
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  successTitle: {
    fontSize: normalize(20),
    color: "#1E293B",
    marginBottom: normalize(12),
    textAlign: 'center',
  },
  successSub: {
    fontSize: normalize(13),
    color: "#64748B",
    textAlign: 'center',
    lineHeight: normalize(22),
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(24),
    marginBottom: normalize(32),
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.05), 0px 8px 10px -6px rgba(0, 0, 0, 0.05)'
  },
  referenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: normalize(11),
    color: "#94A3B8",
    letterSpacing: 1,
  },
  referenceValue: {
    fontSize: normalize(14),
    color: "#4482E2",
  },
  divider: {
    height: 1,
    backgroundColor: "#DBEAFE",
    marginVertical: normalize(20),
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIconContainer: {
    width: normalize(40),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  responseLabel: {
    fontSize: normalize(12),
    color: '#334155',
    marginBottom: normalize(2),
  },
  responseValue: {
    fontSize: normalize(16),
    color: "#22C55E",
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: normalize(32),
  },
  homeBtn: {
    borderWidth: 1,
    borderColor: colors.typographyColor['Dark 2'],
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.lightTints.blueLightTint[50],
    marginBottom: normalize(25)
  },
  homeBtnText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(14),
  },
  wellbeingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  wellbeingText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
  },
  footerPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: normalize(1),
    borderColor: "#EBF2FF"
  },
  lockIconContainerLight: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(59,130,246,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: normalize(14),
    color: "#1E293B",
    marginBottom: normalize(4),
  },
  privacySub: {
    fontSize: normalize(11),
    color: "#64748B",
    lineHeight: normalize(18),
  },

});
