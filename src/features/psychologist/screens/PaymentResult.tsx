import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar, ImageBackground, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { CircleQuestionMark, CreditCard } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';

import { PaymentStatusHeader } from '../components/booking/PaymentStatusHeader';
import { TransactionStatusCard } from '../components/booking/TransactionStatusCard';
import { TherapistSessionCard } from '../components/booking/TherapistSessionCard';
import { ApprovalBanner } from '../components/booking/ApprovalBanner';

type PaymentResultRoute = RouteProp<RootStackParamList, 'PaymentResult'>;

export const PaymentResult: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentResultRoute>();
  const insets = useSafeAreaInsets();
  const bookingBg = require('../assets/bookingSummary/bookingBg.png');

  const {
    status,
    doctorName,
    designation,
    date,
    time,
    amount,
    transactionId,
    planLabel,
  } = route.params;

  const isFailed = status === 'failed';

  const handleBackToHome = useCallback(() => {
    try {
      const routeNames = navigation.getState()?.routeNames || [];
      if (routeNames.includes('MainTabs')) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          })
        );
      } else if (routeNames.includes('Home')) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        navigation.navigate('MainTabs' as any);
      }
    } catch {
      try {
        navigation.navigate('Home' as any);
      } catch {
        navigation.goBack();
      }
    }
  }, [navigation]);

  const handleRetry = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <ImageBackground
        source={isFailed ? bookingBg : undefined}
        resizeMode="contain"
        style={[
          styles.background,
          {
            backgroundColor: isFailed
              ? colors.lightTints.blueLightTint[50]
              : colors.typographyColor.White,
          },
        ]}
      >

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
        <View style={{ paddingTop: insets.top }} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Status Hero ─────────────────────────────────────────────────── */}
          <PaymentStatusHeader status={status} />

          {/* ── Approval Pending Banner (approval_pending only) ──────────────── */}
          {status === 'approval_pending' && <ApprovalBanner />}

          {/* ── Transaction Status Card ──────────────────────────────────────── */}
          <TransactionStatusCard
            status={status}
            amount={amount}
            transactionId={transactionId}
            planLabel={planLabel}
          />

          {/* ── Therapist Session Card (success & approval_pending) ──────────── */}
          {!isFailed && (
            <TherapistSessionCard
              doctorName={doctorName}
              designation={designation}
              date={date}
              time={time}
            />
          )}

          {/* ── Actions ─────────────────────────────────────────────────────── */}
          {isFailed ? (
            <>
              {/* Retry */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.ctaWrapper}
                onPress={handleRetry}
              >
                <LinearGradient
                  colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.ctaGradient, { borderRadius: normalize(99) }]}
                >
                  <AppText variant="body" weight="bold" style={styles.ctaText}>
                    Retry
                  </AppText>
                </LinearGradient>
              </TouchableOpacity>

              {/* Change Payment Method */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.outlineBtn, { borderRadius: normalize(99) }]}
                onPress={handleRetry}
              >
                <CreditCard
                  size={normalize(18)}
                  color={colors.blue[700]}
                  strokeWidth={1.8}
                  style={{ marginTop: normalize(4) }}
                />
                <AppText variant="body" weight="semiBold" style={styles.outlineBtnText}>
                  Change Payment Method
                </AppText>
              </TouchableOpacity>

              {/* Help link */}
              <TouchableOpacity activeOpacity={0.7} style={styles.helpBtn}>
                <CircleQuestionMark size={normalize(16)} color={colors.typographyColor['Color 2']} strokeWidth={2} style={{ marginTop: normalize(0) }} />
                <AppText variant="caption" weight="medium" style={[styles.helpText, { color: colors.typographyColor['Color 2'] }]}>
                  Need help? Contact Sanctuary Support
                </AppText>
              </TouchableOpacity>
            </>
          ) : (
            /* Back to Home */
            <Pressable
              style={({ pressed }) => [styles.backBtnBig, pressed && { backgroundColor: colors.tintsBlue[200], }]}
              onPress={handleBackToHome}
            >
              <View
                style={[{ borderRadius: normalize(99) }]}
              >
                <AppText variant="body" weight="bold" style={{ color: colors.typographyColor['Dark 2'] }}>
                  Back To Home
                </AppText>
              </View>
            </Pressable>
          )}

          {/* ── Footer note (approval_pending only) ──────────────────────────── */}
          {status === 'approval_pending' && (
            <AppText variant="caption" weight="regular" style={styles.footerNote}>
              You will receive a notification once the psychologist approves your booking.
            </AppText>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(4),
    paddingBottom: normalize(40),
    gap: normalize(14),
  },

  // ── CTA ─────────────────────────────────────────────────────────────────
  ctaWrapper: {
    borderRadius: normalize(99),
    overflow: 'hidden',
    marginTop: normalize(4),
    marginBottom: normalize(8)
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

  // ── Outline button ───────────────────────────────────────────────────────
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    borderWidth: 2,
    borderColor: colors.appThemeColor[200],
    gap: normalize(8),
  },
  outlineBtnText: {
    color: colors.blue[700],
    fontSize: normalize(14),
  },

  // ── Help ─────────────────────────────────────────────────────────────────
  helpBtn: {
    alignItems: 'center',
    paddingVertical: normalize(8),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: normalize(7)
  },
  helpText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },

  // ── Footer note ─────────────────────────────────────────────────────────
  footerNote: {
    textAlign: 'center',
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    lineHeight: normalize(16),
    paddingHorizontal: normalize(20),
  },
  backBtnBig: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    borderWidth: 2,
    borderColor: colors.lightAppTheme[500],
    gap: normalize(8),
    backgroundColor: colors.tintsBlue[50],
    borderRadius: normalize(10),
    marginHorizontal: 'auto',
    marginTop: normalize(10),
    width: normalize(170),
  },
});
