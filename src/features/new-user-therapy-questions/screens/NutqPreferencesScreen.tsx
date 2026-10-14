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
import { useNutqStore } from '../store/useNutqStore';

export const NutqPreferencesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const setPreferences = useNutqStore((state) => state.setPreferences);

  const [genderPref, setGenderPref] = useState<string>(useNutqStore.getState().genderPref);
  const [sessionPref, setSessionPref] = useState<string>(useNutqStore.getState().sessionPref);

  const handleContinue = () => {
    setPreferences(genderPref, sessionPref);
    navigation.navigate('NutqSafety');
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
        currentStep={5}
        totalSteps={8}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          Do you have a gender preference for your therapist ?
        </AppText>

        <View style={styles.optionsContainer}>
          <NutqSelectableRow
            label="Male"
            selected={genderPref === 'male'}
            onPress={() => setGenderPref('male')}
          />
          <NutqSelectableRow
            label="Female"
            selected={genderPref === 'female'}
            onPress={() => setGenderPref('female')}
          />
          <NutqSelectableRow
            label="No preference"
            selected={genderPref === 'no_preference'}
            onPress={() => setGenderPref('no_preference')}
          />
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
          How would you prefer your sessions ?
        </AppText>

        <View style={styles.optionsContainer}>
          <NutqSelectableRow
            label="Video"
            selected={sessionPref === 'video'}
            onPress={() => setSessionPref('video')}
          />
          <NutqSelectableRow
            label="Chat"
            selected={sessionPref === 'chat'}
            onPress={() => setSessionPref('chat')}
          />
          <NutqSelectableRow
            label="No preference"
            selected={sessionPref === 'no_preference'}
            onPress={() => setSessionPref('no_preference')}
          />
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={handleContinue}
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
    marginHorizontal: normalize(-15),
    marginTop: normalize(10),
  },
  questionTextSecondary: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(10),
    marginTop: normalize(20),
  },
  optionsContainer: {
    gap: normalize(2),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
