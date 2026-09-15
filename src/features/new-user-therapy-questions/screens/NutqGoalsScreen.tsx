import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NutqHeader } from '../components/NutqHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { NutqSelectableRow } from '../components/NutqSelectableRow';

const GOALS = [
  'Manage stress and anxiety',
  'Heal past trauma',
  'Build self-esteem',
  'Set healthier boundaries',
  'Improve communication skills',
  'Break bad habits',
  'Navigate life changes',
];

export const NutqGoalsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (label: string) => {
    setSelectedGoals(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <NutqHeader
        title="Questions before Session"
        currentStep={7}
        totalSteps={8}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          What would you like to achieve through therapy ?
        </AppText>

        <View style={styles.optionsContainer}>
          {GOALS.map(goal => (
            <NutqSelectableRow
              key={goal}
              label={goal}
              selected={selectedGoals.includes(goal)}
              onPress={() => toggleGoal(goal)}
            />
          ))}
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={() => navigation.navigate('NutqPrivacy')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  questionText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(32),
    marginTop: normalize(10),
  },
  optionsContainer: {
    gap: normalize(2),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
