import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, Alert } from 'react-native';
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
import { Heart } from 'lucide-react-native';

import { useQbsStore } from '../store/useQbsStore';

export const QbsSafetyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeHarmThoughts = useQbsStore(s => s.harmThoughts);
  const storeReadySession = useQbsStore(s => s.readySession);
  const setStep7 = useQbsStore(s => s.setStep7);
  const submitAnswers = useQbsStore(s => s.submitAnswers);
  const isSubmitting = useQbsStore(s => s.isSubmitting);

  const [harmThoughts, setHarmThoughts] = useState<'no' | 'occasionally' | 'frequently' | ''>(storeHarmThoughts || '');
  const [readySession, setReadySession] = useState<'yes' | 'no' | ''>(storeReadySession || '');
  const [localSubmitting, setLocalSubmitting] = useState<boolean>(false);

  const isFormValid = harmThoughts !== '' && readySession !== '';

  const handleFinish = async () => {
    if (!harmThoughts) {
      Alert.alert('Response Required', 'Please answer the question regarding thoughts of harming yourself.');
      return;
    }
    if (!readySession) {
      Alert.alert('Response Required', "Please answer whether you are ready to attend today's session.");
      return;
    }

    setLocalSubmitting(true);
    setStep7(harmThoughts, readySession);
    try {
      await submitAnswers();
    } catch (e) {
      console.error('Error submitting QBS:', e);
    } finally {
      setLocalSubmitting(false);
      navigation.navigate('MainTabs');
    }
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
        currentStep={7}
        totalSteps={7}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          Have you had thoughts of harming yourself since your last session ?
        </AppText>

        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Image source={require("../assets/heart-hand.png")} style={{ width: normalize(80), height: normalize(80), resizeMode: 'contain' }} />
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <QbsRadioRow
            label="No"
            selected={harmThoughts === 'no'}
            onPress={() => setHarmThoughts('no')}
          />
          <QbsRadioRow
            label="Occasionally"
            selected={harmThoughts === 'occasionally'}
            onPress={() => setHarmThoughts('occasionally')}
          />
          <QbsRadioRow
            label="Frequently"
            selected={harmThoughts === 'frequently'}
            onPress={() => setHarmThoughts('frequently')}
          />
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
          Are you ready to attend today's therapy session ?
        </AppText>

        <View style={styles.optionsContainer}>
          <QbsRadioRow
            label="Yes"
            selected={readySession === 'yes'}
            onPress={() => setReadySession('yes')}
          />
          <QbsRadioRow
            label="No"
            selected={readySession === 'no'}
            onPress={() => setReadySession('no')}
          />
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label={localSubmitting || isSubmitting ? "Submitting..." : "Submit & Finish"}
          disabled={!isFormValid || localSubmitting || isSubmitting}
          onPress={handleFinish}
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
    marginBottom: normalize(25),
    marginTop: normalize(10),
    marginHorizontal: normalize(-15),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(20),
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: normalize(10),
    marginBottom: normalize(40),
  },
  iconCircle: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: '#0F2C3F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {},
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
