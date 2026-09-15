import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface SessionPurposeCardProps {
  label?: string;
  purpose?: string;
}

export const SessionPurposeCard: React.FC<SessionPurposeCardProps> = ({
  label = 'SESSION PURPOSE',
  purpose = 'Anxiety & Stress Management',
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      <AppText family="secondary" weight="semiBold" style={styles.label}>
        {label}
      </AppText>
      <AppText family="primary" weight="bold" style={styles.purposeText}>
        {purpose}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
    marginBottom: normalize(24),
    boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.04)',
    borderWidth: normalize(1),
    borderColor: 'rgba(255,255,255,0.5)',
  },
  label: {
    fontSize: normalize(10.5),
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: normalize(4),
  },
  purposeText: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
});
