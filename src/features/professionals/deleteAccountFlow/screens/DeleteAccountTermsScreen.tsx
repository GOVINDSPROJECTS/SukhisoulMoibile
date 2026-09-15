import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { DeleteAccountPolicyCard } from '../components/DeleteAccountPolicyCard';

export const DeleteAccountTermsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [isAgreed, setIsAgreed] = useState(false);

  const handleContinue = () => {
    navigation.navigate('DeleteAccountDataLossScreen');
  };

  const handleBackToTerms = () => {
    navigation.goBack();
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

          <AppText family="secondary" weight="bold" style={styles.headerTitle}>
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
          <AppText family="secondary" weight="medium" style={styles.breadcrumbMuted}>
            Account Security
          </AppText>
          <AppText family="secondary" weight="medium" style={styles.breadcrumbDivider}>
            {' > '}
          </AppText>
          <AppText family="secondary" weight="medium" style={styles.breadcrumbActive}>
            Deletion Flow
          </AppText>
        </View>

        {/* Title */}
        <AppText family="secondary" weight="bold" style={styles.pageTitle}>
          Terms and Conditions
        </AppText>

        {/* Subtitle */}
        <AppText family="secondary" weight="regular" style={styles.pageSubtitle}>
          Please read the following account deletion terms carefully before proceeding. This action is{' '}
          <AppText family="secondary" weight="semiBold" style={styles.boldSubtitleText}>
            significant and permanent.
          </AppText>
        </AppText>

        {/* Policy Card with 5 Points */}
        <DeleteAccountPolicyCard />

        {/* Checkbox Agreement Row */}
        <TouchableOpacity
          style={styles.agreementRow}
          activeOpacity={0.7}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <View style={[styles.checkboxSquare, isAgreed && styles.checkboxSquareActive]}>
            {isAgreed && <Check size={normalize(13)} color="#FFFFFF" strokeWidth={3} />}
          </View>
          <AppText family="secondary" weight="regular" style={styles.agreementText}>
            I have read, understood, and agree to the above terms and conditions regarding the permanent deletion of my professional psychologist account.
          </AppText>
        </TouchableOpacity>

        {/* I understand, Continue Button */}
        <TouchableOpacity
          style={[!isAgreed && styles.continueButtonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >

          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.continueButton]}
          >
            <AppText family="secondary" weight="bold" style={styles.continueButtonText}>
              I understand, Countinue
            </AppText>
          </LinearGradient>

        </TouchableOpacity>

        {/* Back to Terms Button */}
        <TouchableOpacity
          style={styles.backButtonBottom}
          onPress={handleBackToTerms}
          activeOpacity={0.7}
        >
          <AppText family="secondary" weight="bold" style={styles.backButtonBottomText}>
            Back to Terms
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Copyright Strip */}
      <View style={styles.copyrightStrip}>
        <AppText family="secondary" weight="regular" style={styles.copyrightText}>
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
    color: colors.typographyColor.Medium,
    lineHeight: normalize(18),
    marginBottom: normalize(20),
  },
  boldSubtitleText: {
    color: '#0F172A',
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(20),
  },
  checkboxSquare: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(4),
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    marginTop: 1,
  },
  checkboxSquareActive: {
    backgroundColor: colors.typographyColor['Dark 2'],
    borderColor: '#2563EB',
  },
  agreementText: {
    flex: 1,
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(16),
  },
  continueButton: {
    backgroundColor: '#1D64B5',
    borderRadius: normalize(10),
    paddingVertical: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
    shadowColor: '#1D64B5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  continueButtonDisabled: {
    opacity: 0.85,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(13.5),
  },
  backButtonBottom: {
    backgroundColor: '#E2E8F0',
    borderRadius: normalize(10),
    paddingVertical: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  backButtonBottomText: {
    color: '#334155',
    fontSize: normalize(13.5),
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
