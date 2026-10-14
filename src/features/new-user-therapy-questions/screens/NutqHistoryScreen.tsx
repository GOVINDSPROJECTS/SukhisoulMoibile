import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
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
import { NutqTextArea } from '../components/NutqTextArea';
import { useNutqStore } from '../store/useNutqStore';

export const NutqHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const setHistory = useNutqStore((state) => state.setHistory);

  const [attendedTherapy, setAttendedTherapy] = useState<string>(useNutqStore.getState().attendedTherapy);
  const [healthProblems, setHealthProblems] = useState<string>(useNutqStore.getState().healthProblems);

  const handleContinue = () => {
    setHistory(attendedTherapy, healthProblems);
    navigation.navigate('NutqPreferences');
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
        currentStep={4}
        totalSteps={8}
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
            Have you attended therapy before ?
          </AppText>

          <View style={styles.optionsContainer}>
            <NutqSelectableRow
              label="Yes"
              selected={attendedTherapy === 'yes'}
              onPress={() => setAttendedTherapy('yes')}
            />
            <NutqSelectableRow
              label="No"
              selected={attendedTherapy === 'no'}
              onPress={() => setAttendedTherapy('no')}
            />
          </View>

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
            Any health problems ?
          </AppText>

          <NutqTextArea
            value={healthProblems}
            onChangeText={setHealthProblems}
            placeholder="Please share..."
            maxLength={300}
          />

          <View style={styles.spacer} />

          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={handleContinue}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: normalize(20),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(20),
  },
  optionsContainer: {
    gap: normalize(2),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(40),
  },
});
