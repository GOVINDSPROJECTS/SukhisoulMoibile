import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

export const DeleteAccountPolicyCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Policy Title & Subtitle */}
      <AppText family="primary" weight="bold" style={styles.policyTitle}>
        MindEase Pro – Account Deletion Policy
      </AppText>
      <AppText family="primary" weight="regular" style={styles.policyDate}>
        Last Updated: May 20, 2024
      </AppText>

      {/* Point 1 */}
      <View style={styles.pointBlock}>
        <AppText family="primary" weight="bold" style={styles.pointTitle}>
          1. Account Deletion Process
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pointContent}>
          When you request to delete your account, we will initiate a 30-day "cooldown" period. During this time, your profile will be hidden from public search and new clients will not be able to book sessions with you. Your account and all associated data will be permanently deleted after 30 days from the date of your request.
        </AppText>
      </View>

      {/* Point 2 */}
      <View style={styles.pointBlock}>
        <AppText family="primary" weight="bold" style={styles.pointTitle}>
          2. Irreversibility
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pointContent}>
          After the 30-day waiting period, your account deletion will be final and irreversible. All data, including client information, session history, earnings reports, documents, and communications, will be permanently removed from our active systems and cannot be recovered by support staff.
        </AppText>
      </View>

      {/* Point 3 */}
      <View style={styles.pointBlock}>
        <AppText family="primary" weight="bold" style={styles.pointTitle}>
          3. Data Retention (Legal Compliance)
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pointContent}>
          We may retain certain information as required by law or regulatory authorities for a limited period (e.g., financial records for tax purposes or clinical notes as mandated by state licensing boards). This data will be securely stored in an encrypted archive and will no longer be associated with your active therapist profile.
        </AppText>
      </View>

      {/* Point 4 */}
      <View style={styles.pointBlock}>
        <AppText family="primary" weight="bold" style={styles.pointTitle}>
          4. Impact on Active Clients
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pointContent}>
          Active appointments scheduled beyond the deletion request date will be automatically cancelled. It is your professional responsibility to notify active clients and provide appropriate referrals or transition plans prior to completing this request. MindEase is not responsible for clinical continuity after account termination.
        </AppText>
      </View>

      {/* Point 5 */}
      <View style={styles.pointBlockLast}>
        <AppText family="primary" weight="bold" style={styles.pointTitle}>
          5. Outstanding Payouts
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pointContent}>
          All pending earnings must be settled before account deletion can be finalized. Ensure your bank information is up to date. Any unclaimed funds after the 30-day period may be subject to forfeiture or processed according to local unclaimed property laws.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: normalize(18),
    marginBottom: normalize(20),
  },
  policyTitle: {
    fontSize: normalize(13.5),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  policyDate: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(16),
  },
  pointBlock: {
    marginBottom: normalize(14),
  },
  pointBlockLast: {
    marginBottom: 0,
  },
  pointTitle: {
    fontSize: normalize(12.5),
    color: '#1E293B',
    marginBottom: normalize(4),
  },
  pointContent: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(16.5),
  },
});
