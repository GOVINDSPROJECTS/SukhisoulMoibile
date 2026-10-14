import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ArrowRight, BookLock, Calendar, CalendarCheck2, FileLock, GlobeLock, Lock, LockKeyhole, Users } from 'lucide-react-native';
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
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { useFamilyCareStore } from '@features/family-care/store/useFamilyCareStore';
import RazorpayCheckout from 'react-native-razorpay';

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
  const user = useAuthStore((state) => state.user);

  const {
    doctorName,
    doctorId,
    designation,
    date,
    dateFormatted,
    time,
    duration,
    price: doctorPrice,
    isFamilyCare,
  } = route.params;

  const dependentInfo = useFamilyCareStore((state) => state.dependentInfo);

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

    try {
      const familyNotes = isFamilyCare
        ? useFamilyCareStore.getState().getFormattedIntakeNotes()
        : '';
      const baseNotes = `Booked via mobile app (${PLAN_LABELS[selectedPlan]})`;
      const combinedNotes = familyNotes
        ? `${familyNotes}\n\n${baseNotes}`
        : baseNotes;

      // 1. Create booking in backend
      const bookingRes = await api.post('/v1/bookings', {
        professional_uuid: doctorId,
        session_type: 'video',
        date,
        time,
        amount: finalAmount,
        status: 'pending_payment',
        notes_for_professional: combinedNotes,
      });

      const payload = bookingRes.data?.data;
      const paymentData = payload?.payment;

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['professional-slots'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });

      // If free session
      if (finalAmount === 0 || paymentData?.gateway === 'free') {
        useFamilyCareStore.getState().resetFamilyCare();
        setIsSubmitting(false);
        navigation.navigate('PaymentResult', {
          status: 'success',
          doctorName,
          designation,
          date: displayDate,
          time,
          amount: 0,
          transactionId: 'FREE_SESSION',
          planLabel: PLAN_LABELS[selectedPlan],
        });
        return;
      }

      // 2. Prepare Razorpay options
      const razorpayKey = paymentData?.key_id;
      const razorpayOrderId = paymentData?.gateway_order_id;
      const paymentOrderUuid = paymentData?.payment_order_uuid;

      if (!razorpayOrderId) {
        throw new Error('Payment gateway order was not generated. Please try again.');
      }

      // Check if native module is available
      if (!RazorpayCheckout || typeof RazorpayCheckout.open !== 'function') {
        console.warn('RazorpayCheckout native module is not linked or running in simulator mode.');
        setIsSubmitting(false);
        Alert.alert(
          'Payment Gateway (Test Mode)',
          'Razorpay native module is running in preview/simulator mode. Simulate a confirmed booking?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Simulate Success',
              onPress: () => {
                useFamilyCareStore.getState().resetFamilyCare();
                navigation.navigate('PaymentResult', {
                  status: 'approval_pending',
                  doctorName,
                  designation,
                  date: displayDate,
                  time,
                  amount: finalAmount,
                  transactionId: `SIM_${Date.now()}`,
                  planLabel: PLAN_LABELS[selectedPlan],
                });
              },
            },
          ]
        );
        return;
      }

      const options = {
        description: `Therapy Session (${PLAN_LABELS[selectedPlan]}) with ${doctorName}`,
        image: 'https://sukhisoul.com/favicon.ico',
        currency: paymentData?.currency || 'INR',
        key: razorpayKey || 'rzp_test_default',
        amount: Math.round(finalAmount * 100), // in paise
        name: 'Sukhisoul Health',
        order_id: razorpayOrderId,
        prefill: {
          email: user?.email || '',
          contact: user?.phoneNumber || '',
          name: user?.displayName || '',
        },
        theme: { color: colors.lightAppTheme[900] },
      };

      try {
        const rzpResponse = await RazorpayCheckout.open(options);

        // 3. Client signature verification against backend POST /v1/payments/verify
        try {
          await api.post('/v1/payments/verify', {
            payment_order_uuid: paymentOrderUuid,
            razorpay_order_id: rzpResponse.razorpay_order_id || razorpayOrderId,
            razorpay_payment_id: rzpResponse.razorpay_payment_id,
            razorpay_signature: rzpResponse.razorpay_signature,
          });

          queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
          queryClient.invalidateQueries({ queryKey: ['payment-history'] });

          useFamilyCareStore.getState().resetFamilyCare();
          setIsSubmitting(false);
          navigation.navigate('PaymentResult', {
            status: 'success',
            doctorName,
            designation,
            date: displayDate,
            time,
            amount: finalAmount,
            transactionId: rzpResponse.razorpay_payment_id,
            planLabel: PLAN_LABELS[selectedPlan],
          });
        } catch (verifyErr: any) {
          console.error('[Payment Verify Error]:', verifyErr);
          useFamilyCareStore.getState().resetFamilyCare();
          setIsSubmitting(false);
          Alert.alert(
            'Payment Recorded',
            'Your payment was received. Our team will verify and confirm your session schedule shortly.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('PaymentResult', {
                    status: 'approval_pending',
                    doctorName,
                    designation,
                    date: displayDate,
                    time,
                    amount: finalAmount,
                    transactionId: rzpResponse.razorpay_payment_id || 'PENDING_VERIFY',
                    planLabel: PLAN_LABELS[selectedPlan],
                  });
                },
              },
            ]
          );
        }
      } catch (rzpErr: any) {
        setIsSubmitting(false);
        console.log('[Razorpay Modal Result]:', rzpErr);
        const isCancelled =
          rzpErr?.code === 0 ||
          rzpErr?.code === 2 ||
          (typeof rzpErr?.description === 'string' && rzpErr.description.toLowerCase().includes('cancelled'));

        if (isCancelled) {
          Alert.alert('Payment Cancelled', 'You cancelled the payment. Your slot was not reserved.');
        } else {
          Alert.alert(
            'Payment Failed',
            rzpErr?.description || 'The transaction could not be processed. Please try again.',
            [
              {
                text: 'View Status',
                onPress: () => {
                  navigation.navigate('PaymentResult', {
                    status: 'failed',
                    doctorName,
                    designation,
                    date: displayDate,
                    time,
                    amount: finalAmount,
                    transactionId: 'FAILED',
                    planLabel: PLAN_LABELS[selectedPlan],
                  });
                },
              },
              { text: 'Try Again', style: 'cancel' },
            ]
          );
        }
      }
    } catch (apiErr: any) {
      setIsSubmitting(false);
      console.error('[Booking API Error]:', apiErr);
      const statusCode = apiErr?.response?.status;
      const apiMessage = apiErr?.response?.data?.message;

      if (statusCode === 409) {
        Alert.alert(
          'Slot Unavailable',
          apiMessage || 'This time slot is already booked by another user. Please choose a different time.',
          [
            {
              text: 'Choose Another Slot',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert(
          'Booking Failed',
          apiMessage || 'Unable to initiate booking at this time. Please check your connection and try again.'
        );
      }
    }
  }, [
    isSubmitting,
    doctorId,
    date,
    time,
    finalAmount,
    selectedPlan,
    doctorName,
    designation,
    displayDate,
    user,
    navigation,
  ]);

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

        {/* ── Family Care Dependent Card ─────────────────────────────────────── */}
        {isFamilyCare && dependentInfo.name ? (
          <View style={styles.familyCareCard}>
            <View style={styles.familyCareIconCircle}>
              <Users size={normalize(20)} color={colors.appThemeColor[900]} />
            </View>
            <View style={styles.familyCareContent}>
              <View style={styles.familyCareBadgeRow}>
                <AppText variant="caption" weight="extraBold" style={styles.familyCareBadgeText}>
                  FAMILY CARE INTAKE ATTACHED
                </AppText>
              </View>
              <AppText variant="body" weight="bold" style={styles.familyCareName}>
                {dependentInfo.name} ({dependentInfo.relation})
              </AppText>
              <AppText variant="caption" weight="regular" style={styles.familyCareSub}>
                Age: {dependentInfo.age} • Concern: {dependentInfo.therapyReason || 'General Support'}
              </AppText>
            </View>
          </View>
        ) : null}

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
          style={({ pressed }) => [
            styles.ctaWrapper,
            pressed && !isSubmitting && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50] },
            isSubmitting && { opacity: 0.75 },
          ]}
          onPress={handleConfirmPay}
          disabled={isSubmitting}
        >
          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.ctaGradient, { borderRadius: normalize(99), flexDirection: 'row' }]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <AppText variant="body" weight="bold" style={styles.ctaText}>
                  Confirm & Pay (₹{finalAmount})
                </AppText>
                <ArrowRight strokeWidth={2} color={"white"} style={{ marginTop: normalize(3), marginLeft: normalize(10) }} />
              </>
            )}
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

  // ── Family Care Badge ─────────────────────────────────────────────────────
  familyCareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: normalize(16),
    padding: normalize(14),
    marginBottom: normalize(14),
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  familyCareIconCircle: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  familyCareContent: {
    flex: 1,
  },
  familyCareBadgeRow: {
    marginBottom: normalize(2),
  },
  familyCareBadgeText: {
    fontSize: normalize(10),
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  familyCareName: {
    fontSize: normalize(14),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  familyCareSub: {
    fontSize: normalize(11),
    color: '#64748B',
  },
});
