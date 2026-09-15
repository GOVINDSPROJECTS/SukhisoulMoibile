import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Mars, Venus, CircleDot, EyeOff, User2 } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { DcHeader } from '../components/DcHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import { RadioRow } from '../components/RadioRow';

export const DcGenderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState<string>('');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <DcHeader
        title="Questions before Session"
        currentStep={2}
        totalSteps={4}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <User2 size={normalize(32)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
          </View>
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          What is your gender ?
        </AppText>

        <View style={styles.optionsContainer}>
          <RadioRow
            Icon={Mars}
            label="Male"
            selected={gender === 'male'}
            onPress={() => setGender('male')}
          />
          <RadioRow
            Icon={Venus}
            label="Female"
            selected={gender === 'female'}
            onPress={() => setGender('female')}
          />
          <RadioRow
            Icon={CircleDot}
            label="Non-binary"
            selected={gender === 'non-binary'}
            onPress={() => setGender('non-binary')}
          />
          <RadioRow
            Icon={EyeOff}
            label="Prefer not to say"
            selected={gender === 'prefer-not-to-say'}
            onPress={() => setGender('prefer-not-to-say')}
          />
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={() => navigation.navigate('DcContactInfo')}
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
  iconContainer: {
    alignItems: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(20),
  },
  iconCircle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(32),
  },
  optionsContainer: {
    gap: normalize(1),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(40),
  },
});
