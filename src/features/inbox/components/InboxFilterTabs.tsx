import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { User, Headphones, MoreHorizontal } from 'lucide-react-native';

export type InboxFilterTab = 'All' | 'Therapists' | 'Support' | 'More';

interface InboxFilterTabsProps {
  activeTab: InboxFilterTab;
  onTabChange: (tab: InboxFilterTab) => void;
}

export const InboxFilterTabs: React.FC<InboxFilterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* All Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 'All' ? styles.tabActive : styles.tabInactive]}
          onPress={() => onTabChange('All')}
        >
          <AppText style={[styles.tabText, activeTab === 'All' ? styles.tabTextActive : styles.tabTextInactive]} weight={activeTab === 'All' ? 'semiBold' : 'regular'}>
            All
          </AppText>
        </TouchableOpacity>

        {/* Therapists Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 'Therapists' ? styles.tabActive : styles.tabInactive]}
          onPress={() => onTabChange('Therapists')}
        >
          <User size={normalize(16)} color={activeTab === 'Therapists' ? '#FFFFFF' : colors.lightAppTheme[700]} style={styles.icon} />
          <AppText style={[styles.tabText, activeTab === 'Therapists' ? styles.tabTextActive : styles.tabTextInactive]} weight={activeTab === 'Therapists' ? 'semiBold' : 'regular'}>
            Therapists
          </AppText>
        </TouchableOpacity>

        {/* Support Tab */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 'Support' ? styles.tabActive : styles.tabInactive]}
          onPress={() => onTabChange('Support')}
        >
          <Headphones size={normalize(14)} color={activeTab === 'Support' ? '#FFFFFF' : '#64748B'} style={styles.icon} />
          <AppText style={[styles.tabText, activeTab === 'Support' ? styles.tabTextActive : styles.tabTextInactive]} weight={activeTab === 'Support' ? 'semiBold' : 'regular'}>
            Support
          </AppText>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(16),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    gap: normalize(10),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    borderRadius: normalize(99),
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: colors.lightAppTheme[700], // Brand blue
    borderColor: colors.lightAppTheme[700],
  },
  tabInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1', // Slate 300
  },
  tabText: {
    fontSize: normalize(12),
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#64748B', // Slate 500
  },
  icon: {
    marginRight: normalize(8),
  },
});
