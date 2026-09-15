import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Trash2, AlertTriangle, Info } from 'lucide-react-native';
import { colors } from '@/theme';

export const DeleteAccountWarningCard: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Title Header Row with Trash Icon */}
      <View style={styles.titleRow}>
        <View style={styles.trashIconBox}>
          <Trash2 size={normalize(22)} color="#1E293B" strokeWidth={1.8} />
        </View>
        <AppText family="secondary" weight="bold" style={styles.titleText}>
          Delete Account
        </AppText>
      </View>

      {/* Description */}
      <AppText family="secondary" weight="light" style={styles.descriptionText}>
        Deleting your account will permanently remove your profile, appointments, ratings, earnings history, and professional records.
      </AppText>

      {/* Warning Box 1: Pink / Red tint */}
      <View style={styles.dangerAlertBox}>
        <AlertTriangle size={normalize(18)} color="#475569" style={styles.alertIcon} />
        <AppText family="secondary" weight="medium" style={styles.alertText}>
          This action cannot be undone.
        </AppText>
      </View>

      {/* Warning Box 2: Slate / Light Blue tint */}
      <View style={styles.infoAlertBox}>
        <Info size={normalize(18)} color="#475569" style={styles.alertIcon} />
        <AppText family="secondary" weight="medium" style={styles.alertText}>
          All your data will be permanently lost.
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
    borderColor: '#F1F5F9',
    padding: normalize(20),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(14),
  },
  trashIconBox: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(12),
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  titleText: {
    fontSize: normalize(20),
    color: '#0F172A',
  },
  descriptionText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(20),
    marginBottom: normalize(18),
  },
  dangerAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginBottom: normalize(12),
  },
  infoAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
  },
  alertIcon: {
    marginRight: normalize(10),
  },
  alertText: {
    fontSize: normalize(13),
    color: '#334155',
    flex: 1,
  },
});
