import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { PhoneCall, ChevronRight } from 'lucide-react-native';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface RiskAndEmergencyCardProps {
  riskLevel: 'low' | 'moderate' | 'high';
  setRiskLevel: (level: 'low' | 'moderate' | 'high') => void;
}

export const RiskAndEmergencyCard: React.FC<RiskAndEmergencyCardProps> = ({ riskLevel, setRiskLevel }) => {
  return (
    <View style={styles.card}>
      <AppText family="secondary" weight="semiBold" style={styles.sectionLabel}>RISK INDICATOR</AppText>
      <View style={styles.riskRow}>
        <TouchableOpacity
          style={[styles.riskBtn, riskLevel === 'low' && styles.riskBtnActiveLow]}
          onPress={() => setRiskLevel('low')}
        >
          <View style={[styles.riskDot, { backgroundColor: '#10B981' }]} />
          <AppText family="secondary" weight="medium" style={styles.riskBtnText}>Low Risk</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.riskBtn, riskLevel === 'moderate' && styles.riskBtnActiveMod]}
          onPress={() => setRiskLevel('moderate')}
        >
          <View style={[styles.riskDot, { backgroundColor: '#F59E0B' }]} />
          <AppText family="secondary" weight="medium" style={styles.riskBtnText}>Moderate{'\n'}Risk</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.riskBtn, riskLevel === 'high' && styles.riskBtnActiveHigh]}
          onPress={() => setRiskLevel('high')}
        >
          <View style={[styles.riskDot, { backgroundColor: '#EF4444' }]} />
          <AppText family="secondary" weight="medium" style={styles.riskBtnText}>High Risk</AppText>
        </TouchableOpacity>
      </View>

      <AppText family="secondary" weight="semiBold" style={styles.sectionLabel}>EMERGENCY CONTACT</AppText>
      <View style={styles.contactRow}>
        <View style={styles.contactIconWrapper}>
          <PhoneCall size={normalize(16)} color={colors.blue[500]} />
        </View>
        <View style={styles.contactDetails}>
          <AppText family="secondary" weight="medium" style={styles.contactName}>Ramesh Sharma</AppText>
          <AppText family="secondary" weight="light" style={styles.contactPhone}>+91 98765 43210</AppText>
        </View>
        <ChevronRight size={normalize(16)} color="#94A3B8" />
      </View>

      <AppText family="secondary" weight="bold" style={[styles.sectionLabel, { marginTop: normalize(16), color: '#1E293B' }]}>
        CONFIDENTIAL SUPPORT
      </AppText>
      <TouchableOpacity style={styles.reportBtn} activeOpacity={0.8}>
        <AppText family="secondary" weight="medium" style={styles.reportBtnText}>Report Issue</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(30),
    padding: normalize(16),
    marginBottom: normalize(16),
    boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.04)',
  },
  sectionLabel: {
    fontSize: normalize(10),
    color: colors.tintsGrey[300],
    marginBottom: normalize(8),
  },
  riskRow: {
    flexDirection: 'row',
    gap: normalize(8),
    marginBottom: normalize(16),
  },
  riskBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.tintsGrey[50],
    borderRadius: normalize(8),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(4),
  },
  riskBtnActiveLow: {
    borderColor: colors.green[500],
    backgroundColor: colors.green[100],
  },
  riskBtnActiveMod: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  riskBtnActiveHigh: {
    borderColor: '#EF4444',
    backgroundColor: '#f9d8d8',
  },
  riskDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(99),
    marginRight: normalize(6),
  },
  riskBtnText: {
    fontSize: normalize(10),
    color: '#475569',
    textAlign: 'left',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(12),
    padding: normalize(12),
  },
  contactIconWrapper: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: colors.tintsGrey[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: normalize(13),
    color: colors.blue[900],
    marginBottom: normalize(2),
  },
  contactPhone: {
    fontSize: normalize(11),
    color: colors.tintsGrey[300],
  },
  reportBtn: {
    backgroundColor: colors.typographyColor['Dark 2'],
    paddingVertical: normalize(12),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  reportBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
});
