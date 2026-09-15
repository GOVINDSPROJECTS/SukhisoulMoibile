import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '@utils/responsive';
import type { NavigationProp } from '@navigation/types';

import { WellnessEssentials } from '../components/WellnessEssentials';
import { BrainExercises } from '../components/BrainExercises';
import { TodaysTasks } from '../components/TodaysTasks';
import { ComingSoonSection } from '../components/ComingSoonSection';
import { EliteWellnessBanner } from '../components/EliteWellnessBanner';
import { HealthProgressCard } from '../components/HealthProgressCard';
import { RecommendedForYou } from '../components/RecommendedForYou';

interface HealthScreenProps {
  isStandalone?: boolean;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({ isStandalone = false }) => {
  const navigation = useNavigation<NavigationProp>();

  const content = (
    <View style={styles.container}>
      {/* Wellness Essentials: Meditation & Visualization Cards */}
      <WellnessEssentials
        onStartMeditation={() => navigation.navigate('MeditationPlayer')}
        onStartVisualization={() => navigation.navigate('MeditationPlayer')}
      />

      {/* Brain Exercises 2x2 Grid with View All */}
      <BrainExercises />

      {/* Today's Tasks with Water Goal Checkbox & Complete Button */}
      <TodaysTasks />

      {/* Coming Soon Dashed Cards */}
      <ComingSoonSection />

      {/* 30% OFF Elite Wellness Journey Banner */}
      <EliteWellnessBanner />

      {/* Your Progress 85% Circular Metric Card */}
      <HealthProgressCard />

      {/* Recommended for You Horizontal Carousel */}
      <RecommendedForYou />
    </View>
  );

  if (isStandalone) {
    return (
      <SafeAreaView style={styles.standaloneRoot} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.standaloneScroll}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: normalize(40),
  },
  standaloneRoot: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  standaloneScroll: {
    flexGrow: 1,
  },
});