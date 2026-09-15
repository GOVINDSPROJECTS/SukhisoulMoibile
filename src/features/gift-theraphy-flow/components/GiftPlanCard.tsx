import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface GiftPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

interface GiftPlanCardProps {
  plan: GiftPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const GiftPlanCard: React.FC<GiftPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>{plan.icon}</View>

      <View style={styles.infoContainer}>
        <AppText variant="body" family="secondary" weight="bold" style={[styles.title, isSelected && styles.titleSelected]}>
          {plan.title}
        </AppText>
        <AppText variant="caption" family="secondary" style={styles.description}>
          {plan.description}
        </AppText>
        <AppText variant="body" family="primary" weight="bold" style={styles.price}>
          {plan.price}
        </AppText>
      </View>

      <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    borderRadius: normalize(16),
    borderWidth: 2,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(12)
  },
  cardSelected: {
    borderColor: '#FF5E73',
    backgroundColor: '#FFF5F6',
  },
  iconContainer: {
    width: normalize(40),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(14),
    color: '#FF5E73',
  },
  infoContainer: {
    flex: 1,
    paddingRight: normalize(10),
  },
  title: {
    color: "#1E293B",
    fontSize: normalize(15),
    marginBottom: normalize(2),
  },
  titleSelected: {
    color: "#FF5E73",
  },
  description: {
    color: "#64748B",
    fontSize: normalize(12),
    lineHeight: normalize(16),
    marginBottom: normalize(4),
  },
  price: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
  },
  radioOuter: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FF6B6B',
  },
  radioInner: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#FF6B6B',
  },
  iconContainerSelected: {
    backgroundColor: '#FDECEC'
  }
});
