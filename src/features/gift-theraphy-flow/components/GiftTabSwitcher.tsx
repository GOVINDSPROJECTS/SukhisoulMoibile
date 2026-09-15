import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

export type GiftTabType = 'Active' | 'Redeemed' | 'Expired';

interface GiftTabSwitcherProps {
  activeTab: GiftTabType;
  onTabChange: (tab: GiftTabType) => void;
}

export const GiftTabSwitcher: React.FC<GiftTabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: GiftTabType[] = ['Active', 'Redeemed', 'Expired'];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isSelected = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onTabChange(tab)}
            style={[styles.tabButton, isSelected && styles.tabButtonActive]}
          >
            <AppText
              variant="body"
              family="secondary"
              weight={isSelected ? 'bold' : 'semiBold'}
              style={[styles.tabText, isSelected && styles.tabTextActive]}
            >
              {tab}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    padding: normalize(4),
    marginBottom: normalize(20),
    gap: normalize(10)
  },
  tabButton: {
    flex: 1,
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(12),
    backgroundColor: colors.lightTints.greenLightTint[50]
  },
  tabButtonActive: {
    backgroundColor: '#FF6B7D',
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
  tabText: {
    color: '#64748B',
    fontSize: normalize(13),
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
