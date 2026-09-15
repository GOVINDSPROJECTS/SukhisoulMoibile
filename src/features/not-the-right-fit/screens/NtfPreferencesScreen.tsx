import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldCheck, User, Mic, MessageSquare, Globe, Venus, Mars, Earth, Video, Headphones, Languages, Plus } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { PreferenceRadioRow } from '../components/PreferenceRadioRow';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyNote } from '../components/PrivacyNote';

export const NtfPreferencesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState<string>('female');
  const [sessionType, setSessionType] = useState<string>('video');
  const [language, setLanguage] = useState<string>('english');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />
      <NtfHeader currentStep={6} totalSteps={7} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
          style={styles.containerInner}
        >

          <AppText variant="h3" family='secondary' weight="bold" style={styles.heading}>
            Would you like to change anything?
          </AppText>
          <AppText variant="body" family='secondary' weight="light" style={styles.sub}>
            We want to ensure your matches are perfectly aligned with your comfort and communication style.
          </AppText>

          {/* Gender Preference */}
          <AppText variant="caption" weight="bold" style={[styles.sectionTitle, { marginTop: normalize(25) }]}>
            GENDER PREFERENCE
          </AppText>
          <PreferenceRadioRow Icon={Venus} label="Female" selected={gender === 'female'} onPress={() => setGender('female')} />
          <PreferenceRadioRow Icon={Mars} label="Male" selected={gender === 'male'} onPress={() => setGender('male')} />
          <PreferenceRadioRow Icon={Earth} label="No Preference" selected={gender === 'none'} onPress={() => setGender('none')} />

          <View style={styles.divider} />

          {/* Session Type */}
          <AppText variant="caption" weight="bold" style={styles.sectionTitle}>
            SESSION TYPE
          </AppText>
          <PreferenceRadioRow Icon={Video} label="Video" selected={sessionType === 'video'} onPress={() => setSessionType('video')} />
          <PreferenceRadioRow Icon={Headphones} label="Audio" selected={sessionType === 'audio'} onPress={() => setSessionType('audio')} />
          <PreferenceRadioRow Icon={MessageSquare} label="Chat" selected={sessionType === 'chat'} onPress={() => setSessionType('chat')} />

          <View style={styles.divider} />

          {/* Language */}
          <AppText variant="caption" weight="bold" style={styles.sectionTitle}>
            LANGUAGE
          </AppText>
          <PreferenceRadioRow Icon={Globe} label="English" selected={language === 'english'} onPress={() => setLanguage('english')} />
          <PreferenceRadioRow Icon={Languages} label="Hindi" selected={language === 'hindi'} onPress={() => setLanguage('hindi')} />
          <PreferenceRadioRow Icon={Plus} label="Other" selected={language === 'other'} onPress={() => setLanguage('other')} />

          {/* Privacy note */}
          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={() => navigation.navigate('NtfFindingMatch')}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerInner: { marginHorizontal: normalize(-20), paddingHorizontal: normalize(15), paddingTop: normalize(25) },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
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
  sectionTitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    letterSpacing: 0.6,
    marginBottom: normalize(10),
  },
  divider: {
    height: 1,
    // backgroundColor: colors.appThemeColor[75],
    marginVertical: normalize(20),
  },

});
