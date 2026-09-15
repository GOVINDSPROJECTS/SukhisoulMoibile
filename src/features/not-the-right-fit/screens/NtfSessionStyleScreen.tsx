import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  Headphones,
  Scale,
  ListChecks,
  Target,
  LucideIcon,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { RadioCardStep3 } from '../components/RadioCardStep3';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyNote } from '../components/PrivacyNote';

interface SessionStyleOption {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const SESSION_STYLES: SessionStyleOption[] = [
  {
    id: 'listening',
    title: 'Mostly Listening',
    subtitle: 'I want someone who listens more and provides a safe space for me to vent.',
    Icon: Headphones,
    iconBg: colors.lightAppTheme[50],
    iconColor: colors.lightAppTheme[700],
  },
  {
    id: 'balanced',
    title: 'Balanced Conversation',
    subtitle: 'A mix of listening and active guidance to help me process and grow.',
    Icon: Scale,
    iconBg: colors.lightAppTheme[50],
    iconColor: colors.lightAppTheme[700],
  },
  {
    id: 'guidance',
    title: 'Guidance & Action Steps',
    subtitle: 'I want practical advice and clear action steps for my challenges.',
    Icon: ListChecks,
    iconBg: colors.lightAppTheme[50],
    iconColor: colors.lightAppTheme[700],
  },
  {
    id: 'structured',
    title: 'Structured & Goal Focused',
    subtitle: 'I want a highly structured and goal-oriented approach to specific issues.',
    Icon: Target,
    iconBg: colors.lightAppTheme[50],
    iconColor: colors.lightAppTheme[700],
  },
];

export const NtfSessionStyleScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>('balanced');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />
      <NtfHeader currentStep={3} totalSteps={7} onBack={() => navigation.goBack()} />

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
            Choose the session style you prefer
          </AppText>
          <AppText variant="body" family='secondary' weight="regular" style={styles.sub}>
            We'll use this to match you with a provider who fits your communication needs.
          </AppText>

          {SESSION_STYLES.map(s => (
            <RadioCardStep3
              key={s.id}
              title={s.title}
              subtitle={s.subtitle}
              selected={selected === s.id}
              onPress={() => setSelected(s.id)}
              Icon={s.Icon}
              iconBg={s.iconBg}
              iconColor={s.iconColor}
            />
          ))}

          {/* Privacy note */}
          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={() => navigation.navigate('NtfIdealTherapist')}
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
