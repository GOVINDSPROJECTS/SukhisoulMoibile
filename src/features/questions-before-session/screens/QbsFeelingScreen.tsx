import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { QbsHeader } from '../components/QbsHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { QbsMoodRow } from '../components/QbsMoodRow';
import { QbsTextArea } from '../components/QbsTextArea';

const MOODS = [
  { label: 'Great', emoji: '😇' },
  { label: 'Good', emoji: '😊' },
  { label: 'Okay', emoji: '😐' },
  { label: 'Struggling', emoji: '😞' },
  { label: 'Overwhelmed', emoji: '😫' },
];

import { useQbsStore } from '../store/useQbsStore';

export const QbsFeelingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeSelectedMoods = useQbsStore(s => s.selectedMoods);
  const storeMoodNotes = useQbsStore(s => s.moodNotes);
  const setStep1 = useQbsStore(s => s.setStep1);

  const [selectedMoods, setSelectedMoods] = useState<string[]>(storeSelectedMoods || []);
  const [moodNotes, setMoodNotes] = useState<string>(storeMoodNotes || '');

  const isFormValid = selectedMoods.length > 0;

  const toggleMood = (label: string) => {
    setSelectedMoods(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Selection Required', 'Please select at least one feeling or mood before continuing.');
      return;
    }
    setStep1(selectedMoods, moodNotes);
    navigation.navigate('QbsWeekRating');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <QbsHeader
        title="Questions before Session"
        currentStep={1}
        totalSteps={7}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
            How are you feeling today
          </AppText>
          <AppText variant="caption" family="secondary" style={styles.subText}>
            Select all that apply. Your feedback helps us find your ideal match.
          </AppText>

          <View style={styles.optionsContainer}>
            {MOODS.map((mood) => (
              <QbsMoodRow
                key={mood.label}
                label={mood.label}
                emoji={mood.emoji}
                selected={selectedMoods.includes(mood.label)}
                onPress={() => toggleMood(mood.label)}
              />
            ))}
          </View>

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
            Anything else to share about your mood?
          </AppText>
          <QbsTextArea
            value={moodNotes}
            onChangeText={setMoodNotes}
            placeholder="Please share.."
          />

          <View style={styles.spacer} />

          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            disabled={!isFormValid}
            onPress={handleContinue}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  questionText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(4),
    marginTop: normalize(10),
  },
  subText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(25),
    paddingHorizontal: normalize(10),
  },
  optionsContainer: {
    marginBottom: normalize(25),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(14),
    marginBottom: normalize(10),
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
