import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { QrCode, CreditCard, Landmark, ShieldCheck, ArrowRight, Wallet } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftSummaryCard } from '../components/GiftSummaryCard';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftReviewPayScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: <Wallet size={normalize(20)} color="#FF5252" /> },
    { id: 'card', label: 'Card', icon: <CreditCard size={normalize(20)} color="#FF5252" /> },
    { id: 'netbanking', label: 'Net Banking', icon: <Landmark size={normalize(20)} color="#FF5252" /> },
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
        <GiftTitleSubTitle title="Review & Pay" subtitle="Review your gift and choose a payment method." />

        {/* Gift Summary Card */}
        <GiftSummaryCard
          title="Gift Summary"
          planName="Individual Therapy"
          sessionCount="1 Session"
          price="₹1,499"
          recipientName="Sarah Johnson"
          recipientPhone="+91 98765 43210"
          message="Hi Sarah, You've been doing so great ..."
          showEdit
          onEditMessage={() => navigation.navigate('GiftCustomMessage')}
        />

        <View style={styles.sectionPaymentCards}>

          {/* Payment Method Section */}
          <AppText family="secondary" weight="bold" style={styles.sectionTitle}>
            Payment Method
          </AppText>

          {paymentMethods.map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment(method.id as any)}
                style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
              >
                <View style={styles.paymentIconContainer}>{method.icon}</View>
                <AppText family="secondary" weight="semiBold" style={styles.paymentLabel}>
                  {method.label}
                </AppText>
                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.spacer} />

        {/* Proceed to Pay Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GiftSuccess')}
        >
          <View style={styles.buttonContent}>
            <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
              Proceed to Pay
            </AppText>
            <ArrowRight size={normalize(18)} color="#FFFFFF" style={{ marginLeft: normalize(8) }} />
          </View>
        </TouchableOpacity>

        {/* Security Badge Footer */}
        <View style={styles.securityRow}>
          <ShieldCheck size={normalize(14)} color={"#EF4444"} style={{ marginRight: normalize(4) }} />
          <AppText family="secondary" weight="bold" style={styles.securityText}>
            SECURE & ENCRYPTED PAYMENTS
          </AppText>
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
    flexGrow: 1,
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
    marginBottom: normalize(25),
  },
  sectionPaymentCards: {
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(15),
    marginBottom: normalize(12),
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: colors.appThemeColor[75],
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(10),
  },
  paymentCardSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF8F8',
  },
  paymentIconContainer: {
    width: normalize(36),
    height: normalize(36),
    // borderRadius: normalize(10),
    // backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  paymentLabel: {
    flex: 1,
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
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
  spacer: {
    flex: 1,
    minHeight: normalize(30),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityText: {
    color: colors.tintsGrey[400],
    fontSize: normalize(10),
    letterSpacing: 0.5,
  },
});
