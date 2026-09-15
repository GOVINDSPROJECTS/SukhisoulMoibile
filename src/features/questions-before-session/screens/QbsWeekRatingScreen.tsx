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
import { QbsRatingScale } from '../components/QbsRatingScale';

import { useQbsStore } from '../store/useQbsStore';

export const QbsWeekRatingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeWeekRating = useQbsStore(s => s.weekRating);
  const setStep2 = useQbsStore(s => s.setStep2);

  const [rating, setRating] = useState<number>(storeWeekRating || 0);

  const isFormValid = rating >= 1;

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Rating Required', 'Please select a rating for your overall week before continuing.');
      return;
    }
    setStep2(rating);
    navigation.navigate('QbsProgress');
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
        currentStep={2}
        totalSteps={7}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          How would you rate your overall week?
        </AppText>
        <AppText variant="caption" weight='light' family="secondary" style={styles.subText}>
          Think about the mood, events and feelings of the past 7 days.
        </AppText>

        <QbsRatingScale value={rating} onChange={setRating} />

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
    marginBottom: normalize(15),
    marginTop: normalize(20),
    marginHorizontal: normalize(-10),
  },
  subText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(30),
    paddingHorizontal: normalize(20),
    marginHorizontal: normalize(-20),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
