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

export const QbsEventsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeEventNotes = useQbsStore(s => s.eventNotes);
  const storeReasonNotes = useQbsStore(s => s.reasonNotes);
  const setStep5 = useQbsStore(s => s.setStep5);

  const [eventNotes, setEventNotes] = useState<string>(storeEventNotes || '');
  const [reasonNotes, setReasonNotes] = useState<string>(storeReasonNotes || '');

  const isFormValid = eventNotes.trim().length > 0 || reasonNotes.trim().length > 0;

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Response Required', 'Please share at least a few details about recent events or your progress.');
      return;
    }
    setStep5(eventNotes, reasonNotes);
    navigation.navigate('QbsDiscussion');
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
        currentStep={5}
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
            Did anything significant happen since your last session ?
          </AppText>
          <QbsTextArea
            value={eventNotes}
            onChangeText={setEventNotes}
            placeholder="Please share..."
          />

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
            What do you think was the reason you lacked in progress ?
          </AppText>
          <QbsTextArea
            value={reasonNotes}
            onChangeText={setReasonNotes}
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
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(10),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(10),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
