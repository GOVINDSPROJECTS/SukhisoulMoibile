import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ThumbsDown } from 'lucide-react-native';

export const RescheduleReasonCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <AppText family="primary" weight="bold" style={styles.title}>
        Reason for Rescheduling
      </AppText>
      
      <View style={styles.contentRow}>
        <View style={styles.iconContainer}>
          <ThumbsDown size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="medium" style={styles.reasonText}>
          I have an urgent family commitment that came up unexpectedly.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: normalize(12),
    color: '#1E293B',
    marginBottom: normalize(12),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    marginTop: normalize(2),
  },
  reasonText: {
    fontSize: normalize(11),
    color: '#64748B',
    flex: 1,
    lineHeight: normalize(18),
  },
});
