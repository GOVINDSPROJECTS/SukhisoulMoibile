import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface StatusBadgeProps {
  status: 'pending' | 'approved';
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
}) => {
  const isPending = status === 'pending';
  const defaultLabel = isPending ? 'Pending Therapist Approval' : 'Approved';

  return (
    <View style={[styles.badge, isPending ? styles.pendingBadge : styles.approvedBadge]}>
      <View style={[styles.dot, isPending ? styles.pendingDot : styles.approvedDot]} />
      <AppText
        variant="caption"
        weight="bold"
        style={[styles.text, isPending ? styles.pendingText : styles.approvedText]}
      >
        {label ?? defaultLabel}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    borderRadius: normalize(8),
  },
  pendingBadge: {
    backgroundColor: "transparent",
  },
  approvedBadge: {
    backgroundColor: "transparent",
  },
  dot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
  },
  pendingDot: {
    backgroundColor: '#F59E0B',
  },
  approvedDot: {
    backgroundColor: colors.green[500],
  },
  text: {
    fontSize: normalize(12),
  },
  pendingText: {
    color: '#9C6F2C',
  },
  approvedText: {
    color: "#2E7D32",
  },
});
