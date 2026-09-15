import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ArrowRight, BookLock, Calendar, CalendarCheck2, FileLock, GlobeLock, Lock, LockKeyhole } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';

import { BookingSummaryCard } from '../components/booking/BookingSummaryCard';
import { SessionPlanSelector, PlanId } from '../components/booking/SessionPlanSelector';
import { PaymentMethodSelector, PaymentMethodId } from '../components/booking/PaymentMethodSelector';
import { OrderSummaryCard } from '../components/booking/OrderSummaryCard';

import { api } from '@api/client';
import { queryClient } from '@api/queryClient';
import { ActivityIndicator } from 'react-native';

type ConfirmBookingRoute = RouteProp<RootStackParamList, 'ConfirmBooking'>;

const PLAN_LABELS: Record<PlanId, string> = {
  single: 'Therapy Session (1:1)',
  journey: 'Journey 4-Pack (1:1)',
  soul: 'Soul Transformation',
};

export const ConfirmBooking: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ConfirmBookingRoute>();
  const { borderRadius } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    doctorName,
    doctorId,
    designation,
    date,
    dateFormatted,
    time,
    duration,
    price: doctorPrice,
  } = route.params;

  const displayDate = dateFormatted || date;

  const singleFee = doctorPrice ?? 500;
  const planPrices: Record<PlanId, number> = {
    single: singleFee,
    journey: Math.round(singleFee * 3.5),
    soul: Math.round(singleFee * 7.5),
  };

  const [selectedPlan, setSelectedPlan] = useState<PlanId>('single');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = planPrices[selectedPlan];
  const discount = Math.round(basePrice * 0.05);
  const gstTax = Math.round(basePrice * 0.18);
  const platformFee = 49;
  const finalAmount = Math.max(0, basePrice - discount + gstTax + platformFee);

  const handleApplyCoupon = useCallback(() => {
    // TODO: validate and apply coupon via API
  }, [couponCode]);

  const handleConfirmPay = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const mockTxnId = `#${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    try {
      await api.post('/v1/bookings', {
        professional_uuid: doctorId,
        session_type: 'video',
        date,
        time,
        amount: finalAmount,
        status: 'pending_payment',
        notes_for_professional: `Booked via mobile app (${PLAN_LABELS[selectedPlan]})`,
      });
      // Invalidate therapist-dashboard & slots caches so updates reflect immediately in real-time
      queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['professional-slots'] });
    } catch (e) {
      console.log('Booking API sync note:', e);
    } finally {
      setIsSubmitting(false);
      navigation.navigate('PaymentResult', {
        status: 'approval_pending',
        doctorName,
        designation,
        date: displayDate,
        time,
        amount: finalAmount,
        transactionId: mockTxnId,
        planLabel: PLAN_LABELS[selectedPlan],
      });
    }
  }, [isSubmitting, selectedPlan, doctorName, doctorId, designation, date, displayDate, time, finalAmount, navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50], }]}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </Pressable>
        <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
          Confirm Booking
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Almost There Banner ──────────────────────────────────────────── */}
        <View style={styles.bannerWrap}>
          <View style={[styles.bannerIconCircle, { borderRadius: borderRadius.full }]}>
            <Calendar size={normalize(28)} color={colors.blue[600]} strokeWidth={1.6} />
          </View>
          <AppText variant="h3" weight="extraBold" style={styles.bannerTitle}>
            Almost There!
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.bannerSub}>
            Please confirm your booking details.
          </AppText>
        </View>

        {/* ── Booking Summary ──────────────────────────────────────────────── */}
        <BookingSummaryCard
          therapistName={doctorName}
          date={displayDate}
          time={time}
          duration={duration}
        />

        {/* ── Session Plans ────────────────────────────────────────────────── */}
        <SessionPlanSelector
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          planPrices={planPrices}
        />

        {/* ── Payment Method ───────────────────────────────────────────────── */}
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
          couponCode={couponCode}
          onCouponChange={setCouponCode}
          onApplyCoupon={handleApplyCoupon}
        />

        {/* ── Order Summary ────────────────────────────────────────────────── */}
        <OrderSummaryCard
          sessionLabel={PLAN_LABELS[selectedPlan]}
          basePrice={basePrice}
          discount={discount}
          gstTax={gstTax}
          platformFee={platformFee}
        />

        {/* ── Confirm & Pay CTA ────────────────────────────────────────────── */}
        <Pressable
          style={({ pressed }) => [styles.ctaWrapper, pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50], }]}
          onPress={handleConfirmPay}
        >
          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.ctaGradient, { borderRadius: normalize(99), flexDirection: 'row' }]}
          >
            <AppText variant="body" weight="bold" style={styles.ctaText}>
              Confirm & Pay
            </AppText>
            <ArrowRight strokeWidth={2} color={"white"} style={{ marginTop: normalize(3), marginLeft: normalize(10) }} />
          </LinearGradient>
        </Pressable>

        {/* ── Confidentiality note ─────────────────────────────────────────── */}
        <View style={[styles.confidentialCard, { borderRadius: normalize(16) }]}>
          <LockKeyhole size={normalize(16)} color={colors.typographyColor.Medium} strokeWidth={1.8} style={{ marginTop: normalize(7) }} />
          <View style={styles.confidentialText}>
            <AppText variant="caption" weight="extraBold" style={styles.confidentialTitle} >
              100% Confidential
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.confidentialSub} family='secondary'>
              Your privacy is our priority. All sessions are encrypted and compliant with
              global health privacy standards.
            </AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {

  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
  headerSpacer: {
    width: normalize(36),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(8),
    paddingBottom: normalize(40),
    gap: normalize(14),
  },

  // ── Banner ──────────────────────────────────────────────────────────────
  bannerWrap: {
    alignItems: 'center',
    paddingVertical: normalize(16),
  },
  bannerIconCircle: {
    width: normalize(64),
    height: normalize(64),
    backgroundColor: colors.tintsBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
  },
  bannerTitle: {
    fontSize: normalize(22),
    color: colors.typographyColor.Black,
  },
  bannerSub: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    marginTop: normalize(4),
  },

  // ── CTA ─────────────────────────────────────────────────────────────────
  ctaWrapper: {
    borderRadius: normalize(99),
    overflow: 'hidden',
    marginTop: normalize(4),
    paddingHorizontal: normalize(20)
  },
  ctaGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(16),
    minHeight: normalize(56),
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },

  // ── Confidential ─────────────────────────────────────────────────────────
  confidentialCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: normalize(16),
    gap: normalize(10),
    borderWidth: 1,
    borderColor: colors.tintsGrey[200]
  },
  confidentialText: {
    flex: 1,
  },
  confidentialTitle: {
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    marginBottom: normalize(3),
  },
  confidentialSub: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(16),
  },
});
