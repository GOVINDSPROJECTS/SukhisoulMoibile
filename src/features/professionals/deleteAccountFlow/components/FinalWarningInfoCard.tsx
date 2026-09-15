import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Calendar, Info, XCircle } from 'lucide-react-native';

const LOST_ITEMS_LEFT = [
  'Client details',
  'Payments & earnings',
  'Session history',
];

const LOST_ITEMS_RIGHT = [
  'Recordings',
  'Profile information',
  'Notes & tasks',
];

export const FinalWarningInfoCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 30 Days Cooldown Info Card */}
      <View style={styles.cooldownCard}>
        <View style={styles.calendarBadge}>
          <Calendar size={normalize(20)} color="#2563EB" />
        </View>
        <View style={styles.cooldownTextContainer}>
          <AppText family="secondary" weight="light" style={styles.cooldownText}>
            You can regain your account by logging in again within{' '}
            <AppText family="secondary" weight="light" style={styles.cooldownHighlight}>
              30 days
            </AppText>
            .
          </AppText>
        </View>
      </View>

      {/* Important to Know Warning Card */}
      <View style={styles.warningCard}>
        {/* Red Info Icon Circle */}
        <View style={styles.infoBadge}>
          <Info size={normalize(18)} color="#FFFFFF" />
        </View>

        {/* Title */}
        <AppText family="secondary" weight="semiBold" style={styles.warningTitle}>
          Important to know
        </AppText>

        {/* Normal Subtitle */}
        <AppText family="secondary" weight="regular" style={styles.warningDescription}>
          If you recover your account within 30 days, your account access can be restored.
        </AppText>

        {/* Red Emphasis Text */}
        <AppText family="secondary" weight="medium" style={styles.warningRedAlert}>
          However, your data not be restored and you may need to set up your profile and start again.
        </AppText>

        {/* 2-Column Lost Data Checklist */}
        <View style={styles.checklistGrid}>
          {/* Left Column */}
          <View style={styles.checkColumn}>
            {LOST_ITEMS_LEFT.map((item, index) => (
              <View key={`left-${index}`} style={styles.checkItemRow}>
                <XCircle size={normalize(18)} color="#EF4444" style={styles.xIcon} />
                <AppText family="secondary" weight="regular" style={styles.checkItemText}>
                  {item}
                </AppText>
              </View>
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.checkColumn}>
            {LOST_ITEMS_RIGHT.map((item, index) => (
              <View key={`right-${index}`} style={styles.checkItemRow}>
                <XCircle size={normalize(18)} color="#EF4444" style={styles.xIcon} />
                <AppText family="secondary" weight="regular" style={styles.checkItemText}>
                  {item}
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: normalize(8),
  },
  cooldownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    borderWidth: 1,
    borderColor: '#E6EEFF',
    borderRadius: normalize(14),
    padding: normalize(14),
    marginBottom: normalize(16),
  },
  calendarBadge: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cooldownTextContainer: {
    flex: 1,
    marginLeft: normalize(14),
  },
  cooldownText: {
    fontSize: normalize(13.5),
    color: '#475569',
    lineHeight: normalize(20),
  },
  cooldownHighlight: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(13.5),
  },
  warningCard: {
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: normalize(16),
    padding: normalize(18),
    marginBottom: normalize(24),
  },
  infoBadge: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(17),
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
  },
  warningTitle: {
    fontSize: normalize(15),
    color: '#0F172A',
    marginBottom: normalize(6),
  },
  warningDescription: {
    fontSize: normalize(12),
    color: colors.yellow[900],
    lineHeight: normalize(20),
    marginBottom: normalize(6),
  },
  warningRedAlert: {
    fontSize: normalize(12),
    color: '#EF4444',
    lineHeight: normalize(20),
    marginBottom: normalize(16),
  },
  checklistGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(4),
  },
  checkColumn: {
    flex: 1,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  xIcon: {
    marginRight: normalize(6),
  },
  checkItemText: {
    fontSize: normalize(11.5),
    color: '#475569',
  },
});
