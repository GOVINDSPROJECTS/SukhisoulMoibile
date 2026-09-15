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
import { QbsTextArea } from '../components/QbsTextArea';

import { useQbsStore } from '../store/useQbsStore';

export const QbsDiscussionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeDiscussNotes = useQbsStore(s => s.discussNotes);
  const storeKnowNotes = useQbsStore(s => s.knowNotes);
  const setStep6 = useQbsStore(s => s.setStep6);

  const [discussNotes, setDiscussNotes] = useState<string>(storeDiscussNotes || '');
  const [knowNotes, setKnowNotes] = useState<string>(storeKnowNotes || '');

  const isFormValid = discussNotes.trim().length > 0 || knowNotes.trim().length > 0;

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Response Required', 'Please share what you would like to discuss or let your therapist know before continuing.');
      return;
    }
    setStep6(discussNotes, knowNotes);
    navigation.navigate('QbsSafety');
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
        currentStep={6}
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
            What would you most like to discuss today?
          </AppText>
          <QbsTextArea
            value={discussNotes}
            onChangeText={setDiscussNotes}
            placeholder="Please share..."
          />

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
            Is there anything you'd like your therapist to know before your session?
          </AppText>
          <QbsTextArea
            value={knowNotes}
            onChangeText={setKnowNotes}
            placeholder="Please share..."
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
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  questionText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(17),
    textAlign: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(20),
    marginHorizontal: normalize(-10),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(17),
    textAlign: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(20),
    marginHorizontal: normalize(-10),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
