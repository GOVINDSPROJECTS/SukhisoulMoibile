import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, ChevronRight, Lock, HelpCircle, Headphones, CircleDot, CalendarCheck, ShoppingCart, ShoppingBasket } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftTabSwitcher, GiftTabType } from '../components/GiftTabSwitcher';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftManageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<GiftTabType>('Active');
  const insets = useSafeAreaInsets();

  const actionCards = [
    {
      id: 'redeem',
      icon: <ShoppingBasket size={normalize(20)} color="#FF5252" />,
      title: 'Redeem a Gift',
      subtitle: 'Have a gift code? Claim your session here.',
      onPress: () => navigation.navigate('Redeem'),
    },
    {
      id: 'send',
      icon: <Gift size={normalize(20)} color="#FF5252" />,
      title: 'Send Another Gift',
      subtitle: 'Give the gift of mental wellness to someone.',
      onPress: () => navigation.navigate('GiftIntro'),
    },
    {
      id: 'how',
      icon: <HelpCircle size={normalize(20)} color="#FF5252" />,
      title: 'How Gifting Works',
      subtitle: 'Learn more about our gifting process.',
      onPress: () => { },
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: "#FAF3EB" }} />
      <GiftHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <GiftTitleSubTitle title="Manage Gifts" subtitle="View and manage your gifted sessions." />

        {/* Tab Switcher */}
        <GiftTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Active Tab Gift Card */}
        {activeTab === 'Active' ? (
          <View style={styles.giftCard}>
            <View style={styles.topRow}>
              <View style={styles.iconBox}>
                <CalendarCheck size={normalize(22)} color="#FF5252" />
              </View>
              <View style={styles.planInfo}>
                <AppText family="secondary" weight="bold" style={styles.planName}>
                  Individual Therapy
                </AppText>
                <AppText family="secondary" weight='light' style={styles.sessionCount}>
                  1 Session
                </AppText>
              </View>
              <View style={styles.badgeView}>
                <AppText style={styles.badgeText} weight='semiBold' >SENT</AppText>
              </View>
            </View>

            <View style={styles.sectionDivider}>
              <AppText variant="caption" family="secondary" weight='semiBold' style={styles.sectionLabel}>
                SENT TO
              </AppText>
              <AppText family="secondary" weight="semiBold" style={styles.recipientName}>
                John Doe
              </AppText>
              <View style={styles.phoneRow}>
                <View style={styles.greenDot} />
                <AppText family="secondary" weight="regular" style={styles.recipientPhone}>
                  +91 98765 43210
                </AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.viewDetailsBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('GiftDetails')}
            >
              <AppText family="secondary" weight="bold" style={styles.viewDetailsText}>
                View Details
              </AppText>
              <ChevronRight size={normalize(19)} color={colors.tintsGrey[600]} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <AppText family="secondary" style={styles.emptyText}>
              No {activeTab.toLowerCase()} gifts found.
            </AppText>
          </View>
        )}

        {/* Action Cards List */}
        <View style={styles.actionsContainer}>
          {actionCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={card.onPress}
            >
              <View style={styles.actionIconBox}>{card.icon}</View>
              <View style={styles.actionTextInfo}>
                <AppText family="secondary" weight="bold" style={styles.actionTitle}>
                  {card.title}
                </AppText>
                <AppText family="secondary" weight='regular' style={styles.actionSubtitle}>
                  {card.subtitle}
                </AppText>
              </View>
              <ChevronRight size={normalize(18)} color={colors.tintsGrey[600]} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            key="support"
            style={styles.actionCard}
            activeOpacity={0.8}
            onPress={() => { }}
          >
            <View style={styles.actionIconBox}><Headphones size={normalize(20)} color="#FF5252" /></View>
            <View style={styles.actionTextInfo}>
              <AppText family="secondary" weight='regular' style={styles.actionSubtitle}>
                NEED HELP?
              </AppText>
              <AppText family="secondary" weight="bold" style={styles.actionTitle}>
                Contact Support
              </AppText>
            </View>
            <ChevronRight size={normalize(18)} color={colors.tintsGrey[600]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(25),
    paddingBottom: normalize(30),
  },
  title: {
    fontSize: normalize(22),
    color: colors.typographyColor.Black,
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  subtitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  giftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(18),
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)'
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(10),
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    borderColor: '#FFE4E6',
    marginEnd: normalize(15),

  },
  planInfo: { flex: 1 },
  planName: {
    color: "#1F2937",
    fontSize: normalize(15),
  },
  sessionCount: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
  },
  badgeView: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(2),
    borderRadius: normalize(99),
  },
  badgeText: {
    color: '#16A34A',
    fontSize: normalize(10),
  },
  sectionDivider: {
    marginTop: normalize(14),
    paddingTop: normalize(12),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderStyle: 'dashed'
  },
  sectionLabel: {
    color: "#9CA3AF",
    fontSize: normalize(11),
    letterSpacing: 0.5,
    marginBottom: normalize(2),
  },
  recipientName: {
    color: "#1F2937",
    fontSize: normalize(14),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  greenDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    backgroundColor: '#16A34A',
    marginRight: normalize(6),
  },
  recipientPhone: {
    color: '#374151',
    fontSize: normalize(13),
  },
  viewDetailsBtn: {
    marginTop: normalize(14),
    paddingTop: normalize(16),
    paddingBottom: normalize(5),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewDetailsText: {
    color: '#FF6B7D',
    fontSize: normalize(13),
  },
  emptyStateContainer: {
    padding: normalize(30),
    alignItems: 'center',
  },
  emptyText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(14),
  },
  actionsContainer: {
    gap: normalize(12),
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
  },
  actionIconBox: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(12),
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(14),
  },
  actionTextInfo: { flex: 1 },
  actionTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  actionSubtitle: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
    marginTop: normalize(2),
  },
});
