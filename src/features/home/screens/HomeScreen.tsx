import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { AppText } from '@components/atoms/AppText';

// Import Modular Components
import { HomeHeader } from '../components/HomeHeader';
import { QuickCategories } from '../components/QuickCategories';
import { MoodSelectorSection } from '../components/MoodSelectorSection';
import { BookPsychologistBanner } from '../components/BookPsychologistBanner';
import { RecommendedPsychologists } from '../components/RecommendedPsychologists';
import { HealingCarousels } from '../components/HealingCarousels';
import { DailyProgressSection } from '../components/DailyProgressSection';
import { ActionTiles } from '../components/ActionTiles';
import { PsychologistsList } from '../components/PsychologistsList';
import { CategoryType } from '../../../components/atoms/types';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { PsychologistScreen } from '../../psychologist/screens/PsychologistScreen';
import { ManifestScreen } from '../../manifest/screens/ManifestScreen';
import { DailyTaskScreen } from '../../dailyTask/screens/DailyTaskScreen';
import { HealthScreen } from '../../health/screens/HealthScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// My Therapist card — reused from psychologist feature
import { MyTherapist } from '../../psychologist/components/MyTherapist';
import { RewardsProgressCard } from '../components/RewardsProgressCard';
import { TrustBadgesRow } from '../components/TrustBadgesRow';
import { useTherapistDashboard } from '@/features/therapist-dashboard/hooks/useTherapistDashboard';

const headerGradients: Record<
  'blue' | 'purple' | 'pink' | 'green',
  [string, string]
> = {
  blue: [colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[200]],
  purple: [colors.lightTints.blueLightTint[50], colors.lightTints.purpleLightTint[200]],
  pink: [colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]],
  green: [colors.lightTints.greenLightTint[50], colors.green[200]],
};


import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
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
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('home');
  const headerTheme = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;

  const getHeaderImage = (category: CategoryType) => {
    switch (category) {
      case 'manifest':
        return require('../assets/tab-header-bg-purple.png');

      case 'daily-task':
        return require('../assets/tab-header-bg-orange.png');

      case 'health':
        return require('../assets/tab-header-bg-green.png');

      default:
        return require('../assets/tab-header-bg-blue.png');
    }
  };

  const [headerImage, setHeaderImage] = useState(
    getHeaderImage(activeCategory),
  );

  const [currentGradient, setCurrentGradient] =
    useState(headerGradients.blue);

  const [nextGradient, setNextGradient] =
    useState(headerGradients.blue);
  const gradientOpacity = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: CategoryType) => {
    if (tab === activeCategory) {
      tab = 'home';
    }

    setActiveCategory(tab);
    setHeaderImage(getHeaderImage(tab));
  };

  const getTheme = (category: CategoryType) => {
    switch (category) {
      case 'manifest':
        return 'purple';

      case 'daily-task':
        return 'pink';

      case 'health':
        return 'green';

      default:
        return 'blue';
    }
  };

  useEffect(() => {
    Animated.timing(headerTheme, {
      toValue:
        activeCategory === 'manifest'
          ? 1
          : activeCategory === 'daily-task'
            ? 2
            : activeCategory === 'health'
              ? 3
              : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [activeCategory]);

  useEffect(() => {
    const theme = getTheme(activeCategory);

    // Keep the currently visible gradient as the background layer
    setCurrentGradient(currentGradient);

    // Put the new gradient on the top layer
    setCurrentGradient(headerGradients[theme]);

    gradientOpacity.setValue(0);

    Animated.timing(gradientOpacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [activeCategory]);


  useEffect(() => {
    imageOpacity.setValue(0);

    setHeaderImage(getHeaderImage(activeCategory));

    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeCategory]);

  const headerColor = headerTheme.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      '#C2E0FF', // Home/Psychologist
      '#EAD8FF', // Manifest
      '#FFE7CC', // Daily Task
      '#D7F8E3', // Health
    ],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* Scrollable Part */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Upper Part with Gradient & Lens Flare Background */}
        <View style={[styles.headerBackgroundContainer, { paddingTop: insets.top }]}>
          <>
            {/* Current Gradient */}
            <LinearGradient
              colors={currentGradient}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />

            {/* Incoming Gradient */}
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: gradientOpacity,
                },
              ]}
            >
              <LinearGradient
                colors={currentGradient}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </Animated.View>
          </>

          <Animated.Image
            source={headerImage}
            resizeMode="cover"
            style={[
              {
                width: 300,
                height: 200,
                top: 0,
                right: 0,
                position: 'absolute',
                opacity: imageOpacity,
              },
            ]}
          />

          <View style={styles.headerContentWrapper}>
            <HomeHeader theme={getTheme(activeCategory)} />
            <QuickCategories
              activeCategory={activeCategory}
              onChangeTab={handleTabChange}
            />
          </View>
        </View>

        {activeCategory === 'home' && (
          <>
            {/* Feeling Tracker */}
            <MoodSelectorSection />

            {/* Booking Card & Badge Carousel (only shown if user has NOT booked a session yet) */}
            {!hasBooking && <BookPsychologistBanner />}

            {/* My Therapist — shown in real-time when user has booked a session */}
            {hasBooking && (
              <View style={{ backgroundColor: colors.lightTints.blueLightTint[50], paddingBottom: normalize(25) }}>
                <MyTherapist />

                {/* Rewards Progress card */}
                <RewardsProgressCard />
              </View>
            )}

            {/* Trust Badges row (Verified Experts, 100% Private, Flexible Sessions) */}
            <TrustBadgesRow />

            {/* Hugging promotional banner carousel (The Gift of Healing) */}
            <HealingCarousels />

            {/* Recommended Psychologists horizontal slider */}
            <RecommendedPsychologists />

            {/* Daily analytical progress (72% and Screen time) */}
            <View style={{ backgroundColor: colors.lightTints.blueLightTint[50], paddingBottom: normalize(10), paddingTop: normalize(15) }}>
              <DailyProgressSection />
            </View>

            {/* Action double-tiles (Gift & Premium Features) */}
            <View style={styles.actionTilesWrapper}>
              <ActionTiles />
            </View>

            {/* Vetted therapist listing directory and footer */}
            <View style={{ backgroundColor: colors.appThemeColor[100], paddingBottom: normalize(10), paddingTop: normalize(15) }}>
              <PsychologistsList />
            </View>

          </>
        )}

        {activeCategory === 'psychologist' && <PsychologistScreen />}

        {activeCategory === 'manifest' && <ManifestScreen />}

        {activeCategory === 'daily-task' && <DailyTaskScreen />}

        {activeCategory === 'health' && <HealthScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackgroundContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  headerContentWrapper: {
    paddingHorizontal: normalize(20),
  },
  scrollContent: {
    paddingBottom: normalize(100), // extra padding to avoid overlapping the floating bottom tab bar
  },
  actionTilesWrapper: {
    paddingHorizontal: normalize(20),
  },
});

