import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import { CurrentPlanCard } from '../components/therapy-plans/CurrentPlanCard';
import {
  TherapyPlanCard,
  TherapyPlanItem,
} from '../components/therapy-plans/TherapyPlanCard';
import {
  SavedPlansList,
  SavedPlanItem,
} from '../components/therapy-plans/SavedPlansList';
import { TherapyGuidanceBanner } from '../components/therapy-plans/TherapyGuidanceBanner';
import { useTherapistDashboard } from '../../therapist-dashboard/hooks/useTherapistDashboard';

const AVAILABLE_PLANS: TherapyPlanItem[] = [
  {
    id: 'starter',
    title: 'Starter Plan',
    subtitle: 'For getting started',
    price: '₹1,299',
    period: '/ session',
    iconType: 'starter',
    isCurrent: false,
    features: [
      { text: '1:1 Therapy Session', included: true },
      { text: 'Homework & Exercises', included: true },
      { text: 'Chat Support (Limited)', included: false },
    ],
  },
  {
    id: 'premium',
    title: 'Premium Plan',
    subtitle: 'For deep healing',
    price: '₹2,499',
    period: '/ session',
    iconType: 'premium',
    isCurrent: true,
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Unlimited Chat Support', included: true },
      { text: 'Priority Booking', included: true },
    ],
  },
];

export const TherapyPlansScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { data: dashboardData } = useTherapistDashboard();

  // Dynamic Plans from backend
  const availablePlansList: TherapyPlanItem[] = (dashboardData?.availablePlans && dashboardData.availablePlans.length > 0)
    ? dashboardData.availablePlans
    : AVAILABLE_PLANS;

  const [plans, setPlans] = useState<TherapyPlanItem[]>(availablePlansList);

  // Sync state when backend dashboard data updates
  React.useEffect(() => {
    if (dashboardData?.availablePlans && dashboardData.availablePlans.length > 0) {
      setPlans(dashboardData.availablePlans);
    }
  }, [dashboardData?.availablePlans]);

  const handleBack = useCallback(() => {
    console.log('[Therapy Plans] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const activePlan = dashboardData?.activePlanDetails;
  const docName = activePlan?.doctorName || dashboardData?.therapist?.name || 'Dr. Sameer Joshi';

  const handleManagePlan = useCallback(() => {
    console.log('[Therapy Plans] Manage plan pressed');
    Alert.alert(
      'Manage Therapy Plan',
      `Choose an action for your active plan with ${docName}.`,
      [
        { text: 'Cancel Session', style: 'destructive', onPress: () => console.log('[Therapy Plans] Cancel session clicked') },
        { text: 'Reschedule', onPress: () => navigation.navigate('TherapistDashboard') },
        { text: 'Close', style: 'cancel' },
      ],
    );
  }, [docName, navigation]);

  const handleSelectPlan = useCallback((selectedPlan: TherapyPlanItem) => {
    console.log('[Therapy Plans] Plan selected:', selectedPlan.title);
    Alert.alert(
      'Switch Plan',
      `Would you like to subscribe to the ${selectedPlan.title} (${selectedPlan.price})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed',
          onPress: () => {
            console.log(`[Therapy Plans] Proceeded with ${selectedPlan.title}`);
            setPlans((prev) =>
              prev.map((p) => ({
                ...p,
                isCurrent: p.id === selectedPlan.id,
              })),
            );
          },
        },
      ],
    );
  }, []);

  const handleViewSavedPlan = useCallback((savedPlan: SavedPlanItem) => {
    console.log('[Therapy Plans] Viewing details of saved plan:', savedPlan.planTitle);
    Alert.alert(
      savedPlan.planTitle,
      `Therapist: ${savedPlan.doctorName}\nRate: ${savedPlan.price} per session`,
      [
        { text: 'Explore Profile', onPress: () => navigation.navigate('ExplorePsychologists') },
        { text: 'Close', style: 'cancel' },
      ],
    );
  }, [navigation]);

  const handleTherapyGuidance = useCallback(() => {
    console.log('[Therapy Plans] Therapy guidance clicked -> Explore psychologists');
    navigation.navigate('ExplorePsychologists');
  }, [navigation]);

  const planTitle = activePlan?.planName || dashboardData?.progress?.planName || 'CBT Therapy Plan';
  const doctorSpecialty = activePlan?.doctorSpecialty || dashboardData?.therapist?.designation || 'Clinical Psychologist';
  const doctorExperience = activePlan?.doctorExperience || dashboardData?.therapist?.experience || '10+ Years Experience';
  const doctorRating = activePlan?.doctorRating || String(dashboardData?.therapist?.rating || '4.9');
  const doctorReviews = activePlan?.doctorReviewsCount || 98;
  const doctorAvatar = activePlan?.doctorAvatarUri || dashboardData?.therapist?.imageUrl || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400';
  const sessionsCompleted = activePlan?.sessionsCompleted ?? dashboardData?.summary?.sessionsDone ?? 4;
  const totalSessions = activePlan?.totalSessions ?? 10;
  const nextSessionDate = activePlan?.nextSessionDate || dashboardData?.nextSession?.dateFormatted || 'Next Session Scheduled';
  const nextSessionTime = activePlan?.nextSessionTime || (dashboardData?.nextSession?.dateTime?.split('•')[1]?.trim() || '6:00 PM');
  const planStartDate = activePlan?.planStartDate || '02 Aug 2026';
  const planValidTill = activePlan?.planValidTill || '02 Nov 2026';

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* ── Top Header with Exact Gradient matching InviteFriendsScreen ──────────────── */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerGradient}
      >
        <SettingsHeader
          title="Therapy plans"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Main Scroll Content ───────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── SECTION 1: CURRENT PLAN ─────────────────────────────────────── */}
        <AppText weight="bold" family="secondary" style={styles.sectionHeaderLabel}>
          CURRENT PLAN
        </AppText>
        <CurrentPlanCard
          planName={planTitle}
          doctorName={docName}
          doctorSpecialty={doctorSpecialty}
          doctorExperience={doctorExperience}
          doctorRating={doctorRating}
          doctorReviewsCount={doctorReviews}
          doctorAvatarUri={doctorAvatar}
          nextSessionDate={nextSessionDate}
          nextSessionTime={nextSessionTime}
          sessionsCompleted={sessionsCompleted}
          totalSessions={totalSessions}
          planStartDate={planStartDate}
          planValidTill={planValidTill}
          onManagePlan={handleManagePlan}
        />

        {/* ── SECTION 2: THERAPY PLANS ────────────────────────────────────── */}
        <AppText
          weight="extraBold"
          family="primary"
          style={styles.sectionTitle}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
        >
          THERAPY PLANS
        </AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.plansCarousel}
        >
          {plans.map((item) => (
            <TherapyPlanCard
              key={item.id}
              plan={item}
              onSelect={handleSelectPlan}
            />
          ))}
        </ScrollView>

        {/* ── SECTION 3: SAVED PLANS ──────────────────────────────────────── */}
        <AppText
          weight="extraBold"
          family="primary"
          style={styles.sectionTitle}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
        >
          SAVED PLANS
        </AppText>
        <SavedPlansList
          plans={dashboardData?.savedPlans}
          onViewPlan={handleViewSavedPlan}
        />

        {/* ── SECTION 4: FREE THERAPY GUIDANCE BANNER ─────────────────────── */}
        <TherapyGuidanceBanner onPress={handleTherapyGuidance} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(12),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
  sectionHeaderLabel: {
    fontSize: normalize(10.5),
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: normalize(10),
  },
  sectionTitle: {
    fontSize: normalize(13.5),
    letterSpacing: 0.5,
    marginBottom: normalize(14),
    marginTop: normalize(4),
  },
  plansCarousel: {
    paddingBottom: normalize(20),
    paddingRight: normalize(10),
  },
});
