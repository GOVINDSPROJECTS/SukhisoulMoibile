import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { RadioCard } from '../components/RadioCard';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyNote } from '../components/PrivacyNote';

interface TherapistType {
  id: string;
  title: string;
  subtitle: string;
  Icon: string;
  iconBg: string;
  iconColor: string;
}

const THERAPIST_TYPES: TherapistType[] = [
  {
    id: 'warm',
    title: 'Warm & Supportive',
    subtitle: 'I want empathy and understanding.',
    Icon: require('../assets/step4-1.png'),
    iconBg: '#E3F2FD',
    iconColor: '#DB2777',
  },
  {
    id: 'goal',
    title: 'Goal-Oriented',
    subtitle: 'I want action plans and accountability.',
    Icon: require('../assets/step4-2.png'),
    iconBg: '#FFF3E0',
    iconColor: '#D97706',
  },
  {
    id: 'analytical',
    title: 'Analytical',
    subtitle: 'I want to understand patterns and root causes.',
    Icon: require('../assets/step4-3.png'),
    iconBg: '#F3E5F5',
    iconColor: '#7C3AED',
  },
  {
    id: 'collaborative',
    title: 'Collaborative',
    subtitle: 'I want a balance of listening and guidance.',
    Icon: require('../assets/step4-4.png'),
    iconBg: '#E0F2F1',
    iconColor: '#2563EB',
  },
  {
    id: 'listener',
    title: 'Active Listener',
    subtitle: 'I mainly need a safe space to talk.',
    Icon: require('../assets/step4-5.png'),
    iconBg: '#FFFDE7',
    iconColor: '#059669',
  },
];

export const NtfIdealTherapistScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>('warm');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />

      <NtfHeader currentStep={4} totalSteps={7} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
          style={styles.containerInner}
        >

          <AppText variant="h3" family='secondary' weight="extraBold" style={styles.heading}>
            What kind of therapist would help you most?
          </AppText>
          <AppText variant="caption" family='secondary' weight="regular" style={styles.sub}>
            Choose one
          </AppText>

          {THERAPIST_TYPES.map(t => (
            <RadioCard
              key={t.id}
              title={t.title}
              subtitle={t.subtitle}
              selected={selected === t.id}
              onPress={() => setSelected(t.id)}
              Icon={t.Icon}
              iconBg={t.iconBg}
              iconColor={t.iconColor}
            />
          ))}

          {/* Privacy note */}
          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={() => navigation.navigate('NtfImportantIn')}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerInner: { marginHorizontal: normalize(-15), paddingHorizontal: normalize(15), paddingTop: normalize(25) },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(0),
    paddingBottom: normalize(50),
  },
  heading: {
    color: colors.typographyColor.Black,
    fontSize: normalize(18),
    lineHeight: normalize(26),
    marginBottom: normalize(6),
  },
  sub: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    lineHeight: normalize(18),
    marginBottom: normalize(18),
  },
});
