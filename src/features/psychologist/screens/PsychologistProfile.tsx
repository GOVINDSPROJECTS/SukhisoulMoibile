import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, StatusBar, View, RefreshControl } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme/index';
import type { NavigationProp, AppStackParamList } from '@navigation/types';

import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { AreasOfExpertise } from '../components/profile/AreasOfExpertise';
import { TherapyPlans } from '../components/profile/TherapyPlans';
import { AllPlansModal } from '../components/profile/AllPlansModal';
import { AvailabilitySection } from '../components/profile/AvailabilitySection';
import { PatientReviews } from '../components/profile/PatientReviews';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TherapyPlanItem } from '@api/professionals';
import { useTherapyPlans } from '../hooks/useTherapyPlans';

type ProfileRouteProp = RouteProp<AppStackParamList, 'PsychologistProfile'>;

export const PsychologistProfile: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProfileRouteProp>();

  const doctorName = route.params?.doctorName ?? 'Dr. Expert';
  const doctorId = route.params?.doctorId ?? '365b31ac-0448-4928-8492-0b5e8949c831';
  const designation = route.params?.designation ?? 'Clinical Psychologist';
  const price = route.params?.price ? Number(route.params.price) : 500;
  const avatarUrl = route.params?.avatarUrl;
  const rating = route.params?.rating;
  const experience = route.params?.experience;
  const bio = route.params?.bio;
  const languages = route.params?.languages;
  const expertise = route.params?.expertise;

  const [allPlansVisible, setAllPlansVisible] = useState(false);

  // Reactive real-time query hook with 3s background polling
  const {
    data: plans = [],
    isLoading,
    isRefetching,
    refetch,
  } = useTherapyPlans(doctorId, doctorName);

  // Automatically refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleShare = useCallback(() => {
    // TODO: integrate Share API
  }, []);

  const handleMessage = useCallback(() => {
    navigation.navigate('Chat', {
      professionalUuid: doctorId,
      doctorName,
      avatarUrl,
      role: designation,
    });
  }, [navigation, doctorId, doctorName, avatarUrl, designation]);

  const handleWatchVideo = useCallback(() => {
    // TODO: open video player
  }, []);

  const handleViewAllPlans = useCallback(() => {
    refetch();
    setAllPlansVisible(true);
  }, [refetch]);

  const handleSelectPlan = useCallback((plan: TherapyPlanItem) => {
    navigation.navigate('BookTherapy', {
      doctorName,
      doctorId,
      designation,
      price: plan.total_price || price,
    });
  }, [navigation, doctorName, doctorId, designation, price]);

  const handleBookTherapy = useCallback((params: { date: number; time: string }) => {
    navigation.navigate('BookTherapy', {
      doctorName,
      doctorId,
      designation,
      price,
      selectedDate: params.date,
      selectedTime: params.time,
    });
  }, [navigation, doctorName, doctorId, designation, price]);

  const handleViewAllReviews = useCallback(() => {
    // TODO: navigate to all reviews screen
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]} edges={['bottom', 'left', 'right']}>

        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={false}
        />
        <View style={{ paddingTop: insets.top }}></View>
        {/* Sticky Header */}
        <ProfileHeader onBack={handleBack} onShare={handleShare} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[colors.appThemeColor[600]]}
              tintColor={colors.appThemeColor[600]}
            />
          }
        >
          {/* Profile info: avatar → about approach → intro video */}
          <ProfileInfo
            name={doctorName}
            avatarUrl={avatarUrl}
            specialty={designation}
            rating={rating}
            experience={experience}
            bio={bio}
            languages={languages}
            tags={expertise}
            onMessage={handleMessage}
            onLike={() => { }}
            onWatchVideo={handleWatchVideo}
          />

          {/* Areas of Expertise - horizontal scroll */}
          <AreasOfExpertise />

          {/* Therapy Plans - horizontal scroll */}
          <TherapyPlans
            doctorId={doctorId}
            doctorName={doctorName}
            basePrice={price}
            plans={plans}
            loading={isLoading}
            onViewAll={handleViewAllPlans}
            onSelectPlan={handleSelectPlan}
          />

          {/* Availability + Book */}
          <AvailabilitySection
            doctorId={doctorId}
            price={price}
            onBookTherapy={handleBookTherapy}
          />

          {/* Patient Reviews — Fully Dynamic from Database */}
          <PatientReviews
            doctorId={doctorId}
            doctorName={doctorName}
            rating={rating}
            onViewAll={handleViewAllReviews}
          />
        </ScrollView>

        {/* All Therapy Plans Modal */}
        <AllPlansModal
          visible={allPlansVisible}
          onClose={() => setAllPlansVisible(false)}
          plans={plans}
          doctorName={doctorName}
          onSelectPlan={handleSelectPlan}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
