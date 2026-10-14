import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Globe } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { DcHeader } from '../components/DcHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import { RadioRow } from '../components/RadioRow';

export const DcLanguageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<string>('');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <DcHeader
        title="Questions before Session"
        currentStep={4}
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
            <Globe size={normalize(32)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
          </View>
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          What is your preferred language?
        </AppText>

        <View style={styles.optionsContainer}>
          <RadioRow
            label="English"
            selected={language === 'english'}
            onPress={() => setLanguage('english')}
          />
          <RadioRow
            label="Hindi"
            selected={language === 'hindi'}
            onPress={() => setLanguage('hindi')}
          />
          <RadioRow
            label="Marathi"
            selected={language === 'marathi'}
            onPress={() => setLanguage('marathi')}
          />
          <RadioRow
            label="Other"
            selected={language === 'other'}
            onPress={() => setLanguage('other')}
          />
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={() => {
            navigation.navigate('NutqIssues');
          }}
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
    minHeight: normalize(0),
  },
});
