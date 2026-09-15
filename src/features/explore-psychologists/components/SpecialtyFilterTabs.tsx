import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';

export const SPECIALTY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'anxiety', label: 'Anxiety' },
  { key: 'stress', label: 'Stress' },
  { key: 'depression', label: 'Depression' },
  { key: 'relationships', label: 'Relationships' },
  { key: 'trauma', label: 'Trauma' },
  { key: 'sleep', label: 'Sleep' },
] as const;

export type SpecialtyKey = (typeof SPECIALTY_TABS)[number]['key'];

interface SpecialtyFilterTabsProps {
  selected: SpecialtyKey;
  onSelect: (key: SpecialtyKey) => void;
}

export const SpecialtyFilterTabs: React.FC<SpecialtyFilterTabsProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {SPECIALTY_TABS.map((tab) => {
        const isActive = tab.key === selected;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.75}
            style={[
              styles.pill,
              isActive ? styles.pillActive : styles.pillInactive,
            ]}
            onPress={() => onSelect(tab.key)}
          >
            <AppText
              variant="caption"
              weight={isActive ? 'medium' : 'medium'}
              style={[
                styles.pillText,
                isActive ? styles.pillTextActive : styles.pillTextInactive,
              ]}
            >
              {tab.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: normalize(16),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    gap: normalize(8),
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(8),
    borderRadius: normalize(99),
  },
  pillActive: {
    backgroundColor: colors.lightAppTheme[950],
  },
  pillInactive: {
    backgroundColor: colors.typographyColor.White,
  },
  pillText: {
    fontSize: normalize(12),
  },
  pillTextActive: {
    color: colors.typographyColor.White,
  },
  pillTextInactive: {
    color: colors.typographyColor.Medium,
  },
});
