import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import {
  ArrowLeft,
  AlertTriangle,
  User,
  Contact,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  Check,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { DataLossItemCard } from '../components/DataLossItemCard';

export const DeleteAccountDataLossScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [isAgreed, setIsAgreed] = useState(false);

  const handleContinue = () => {
    if (!isAgreed) {
      Alert.alert('Notice', 'Please agree to the terms and conditions to proceed.');
      return;
    }
    navigation.navigate('DeleteAccountVerificationScreen');
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
          Data that will be lost
        </AppText>

        {/* Subtitle */}
        <AppText family="secondary" weight="regular" style={styles.pageSubtitle}>
          Please review the specific information that will be permanently removed from our servers upon account deletion. This process is irreversible.
        </AppText>

        {/* Permanent Data Loss Warning Banner */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIconCol}>
            <AlertTriangle size={normalize(18)} color="#DC2626" />
          </View>
          <View style={styles.warningTextCol}>
            <AppText family="secondary" weight="semiBold" style={styles.warningTitle}>
              Permanent Data Loss Warning
            </AppText>
            <AppText family="secondary" weight="light" style={styles.warningSubtitle}>
              Once your account is deleted, the following data will be permanently lost and cannot be recovered under any circumstances.
            </AppText>
          </View>
        </View>

        {/* Card 1: Profile Information */}
        <DataLossItemCard
          icon={<User size={normalize(18)} color="#0058BC" />}
          title="Profile Information"
          description="Your professional bio, credentials, profile photo, verification status, and availability settings."
        />

        {/* Card 2: Client Data */}
        <DataLossItemCard
          icon={<Contact size={normalize(18)} color="#0058BC" />}
          title="Client Data"
          description="All client profiles, private session notes, therapeuticprogress records, files, and shared documents."
        />

        {/* Card 3: Appointments */}
        <DataLossItemCard
          icon={<Calendar size={normalize(18)} color="#0058BC" />}
          title="Appointments"
          description="All upcoming, past, and cancelled appointment history and synchronization data with external calendars."
        />

        {/* Card 4: Messages */}
        <DataLossItemCard
          icon={<MessageSquare size={normalize(18)} color="#0058BC" />}
          title="Messages"
          description="All secure chat logs, voice message transcripts, and media attachments exchanged with your clients."
        />

        {/* Card 5: Earnings & Payouts */}
        <DataLossItemCard
          icon={<CreditCard size={normalize(18)} color="#0058BC" />}
          title="Earnings & Payouts"
          description="Full historical earnings records, pending payout balances, invoices, and tax-related documentation."
        />

        {/* Card 6: Professional Analytics */}
        <DataLossItemCard
          icon={<BarChart3 size={normalize(18)} color="#0058BC" />}
          title="Professional Analytics"
          description="Retention metrics, revenue charts, feedback ratings, and clinical outcome tracking statistics."
        />

        {/* Agreement Checkbox */}
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
    color: '#4B5563',
    lineHeight: normalize(18),
    marginBottom: normalize(18),
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3.5,
    borderLeftColor: '#EF4444',
    borderRadius: normalize(0),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginBottom: normalize(18),
  },
  warningIconCol: {
    marginRight: normalize(10),
    marginTop: 2,
  },
  warningTextCol: {
    flex: 1,
  },
  warningTitle: {
    fontSize: normalize(12.5),
    color: '#991B1B',
    marginBottom: 2,
  },
  warningSubtitle: {
    fontSize: normalize(10.5),
    color: '#B91C1C',
    lineHeight: normalize(15),
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: normalize(16),
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
    backgroundColor: '#1D64B5',
    borderColor: '#1D64B5',
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
