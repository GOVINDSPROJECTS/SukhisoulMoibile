import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { QbsHeader } from '../components/QbsHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { QbsRadioRow } from '../components/QbsRadioRow';

import { useQbsStore } from '../store/useQbsStore';

export const QbsSleepScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeSleepTime = useQbsStore(s => s.sleepTime);
  const setStep4 = useQbsStore(s => s.setStep4);

  const [sleepTime, setSleepTime] = useState<string>(storeSleepTime || '');

  const SLEEP_OPTIONS = [
    'Less than 5 hours',
    '5 - 6 hours',
    '6 - 7 hours',
    '7 - 8 hours',
    'More than 8 hours',
  ];

  const isFormValid = sleepTime !== '';

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Selection Required', 'Please select your usual sleep duration to continue.');
      return;
    }
    setStep4(sleepTime);
    navigation.navigate('QbsEvents');
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
        currentStep={4}
        totalSteps={7}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          How long did you usually sleep for ?
        </AppText>

        <View style={styles.optionsContainer}>
          {SLEEP_OPTIONS.map((option) => (
            <QbsRadioRow
              key={option}
              label={option}
              selected={sleepTime === option}
              onPress={() => setSleepTime(option)}
            />
          ))}
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          disabled={!isFormValid}
          onPress={handleContinue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  questionText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(32),
    marginTop: normalize(10),
  },
  optionsContainer: {
    marginBottom: normalize(20),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
