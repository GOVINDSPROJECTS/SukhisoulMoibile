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
import { ChipItem } from '../components/ChipItem';
import { CustomDropdown } from '../components/CustomDropdown';

const ISSUES = [
  { label: 'Anxiety', emoji: '😰' },
  { label: 'Sadness', emoji: '😞' },
  { label: 'Anger', emoji: '😠' },
  { label: 'Stress', emoji: '😫' },
  { label: 'Loneliness', emoji: '👤' },
  { label: 'Guilt', emoji: '😓' },
  { label: 'Shame', emoji: '🫣' },
  { label: 'Other', emoji: '🔄' },
];

const DROPDOWN_OPTIONS = ISSUES.map(i => i.label);

export const NutqIssuesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [mainIssue, setMainIssue] = useState<string>('');

  const toggleIssue = (label: string) => {
    setSelectedIssues(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
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
        currentStep={1}
        totalSteps={8}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          What issues are you facing?
        </AppText>
        <AppText variant="caption" family="secondary" style={styles.subText}>
          ( Select as many as you'd like )
        </AppText>

        <View style={styles.chipsContainer}>
          {ISSUES.map(issue => (
            <ChipItem
              key={issue.label}
              label={issue.label}
              emoji={issue.emoji}
              selected={selectedIssues.includes(issue.label)}
              onPress={() => toggleIssue(issue.label)}
            />
          ))}
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextSecondary}>
          What is the main issue you'd like help with?
        </AppText>

        <CustomDropdown
          options={DROPDOWN_OPTIONS}
          selectedOption={mainIssue}
          onSelect={setMainIssue}
          placeholder="Select the issue"
        />

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={() => navigation.navigate('NutqAreas')}
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
    marginBottom: normalize(0),
    marginTop: normalize(10),
  },
  subText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(25),
    marginTop: normalize(4),
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: normalize(0),
    marginBottom: normalize(35),

  },
  questionTextSecondary: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(40),
  },
});
