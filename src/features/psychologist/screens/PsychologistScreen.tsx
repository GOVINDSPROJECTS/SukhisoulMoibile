import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { MyPsychologist } from '../components/MyPsychologist';
import { FreeTherapy } from '../components/FreeTherapy';
import { FamilyCare } from '../components/FamilyCare';
import { RecentChats } from '../components/RecentChats';
import { OnlinePsychologists } from '../components/OnlinePsychologists';
import { MyTherapist } from '../components/MyTherapist';
import { Search } from '../components/Search';
import { BottomRecommendedCard } from '../components/BottomRecommendedCard';
import { useTherapistDashboard } from '@/features/therapist-dashboard/hooks/useTherapistDashboard';

export const PsychologistScreen: React.FC = () => {
  const { data: dashboardData, refetch } = useTherapistDashboard();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const hasBooking = Boolean(
    dashboardData?.has_booking ||
    dashboardData?.has_active_booking ||
    dashboardData?.nextSession ||
    (dashboardData?.summary?.totalBookings ?? 0) > 0 ||
    (dashboardData?.summary?.sessionsLeft ?? 0) > 0 ||
    (dashboardData?.summary?.sessionsDone ?? 0) > 0
  );

  return (
    <>

      <Search />

      {/* Title */}
      <View style={styles.titleSection}>
        <AppText weight="extraBold" family="primary" style={styles.mainTitle}>
          Psychologist
        </AppText>
        <AppText weight="light" family="secondary" style={styles.mainSubtitle}>
          Choose care that fits your mind today.
        </AppText>
      </View>

      {/* If user has booked session: Show MyTherapist */}
      {hasBooking && <MyTherapist />}

      {/* If user has NO booked session: Show MyPsychologist quiz/matching card */}
      {!hasBooking && <MyPsychologist />}

      {/* Free Therapy Banner (only if not booked) */}
      {!hasBooking && <FreeTherapy />}

      {/* Family Care Section */}
      <FamilyCare />

      {/* Recent Chats Section */}
      <RecentChats />

      {/* Online Psychologists Section */}
      <OnlinePsychologists />

      {/* Bottom Recommended Program Card */}
      <BottomRecommendedCard />

    </>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    marginBottom: normalize(0),
  },
  mainTitle: {
    fontSize: normalize(30),
    color: '#2D3432',
  },
  mainSubtitle: {
    fontSize: normalize(13),
    color: '#59615F',
    marginTop: normalize(2),
  },
  sectionContainer: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#2D3432',
  },
  sectionSubtitle: {
    fontSize: normalize(11),
    color: '#59615F',
    marginTop: normalize(2),
  },

});