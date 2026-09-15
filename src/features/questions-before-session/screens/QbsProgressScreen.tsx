import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { QbsHeader } from '../components/QbsHeader';
import { PrivacyNote } from '../components/PrivacyNote';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { QbsProgressRow } from '../components/QbsProgressRow';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react-native';

import { useQbsStore } from '../store/useQbsStore';

export const QbsProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const storeProgress = useQbsStore(s => s.progress);
  const setStep3 = useQbsStore(s => s.setStep3);

  const [progress, setProgress] = useState<'improved' | 'same' | 'worsened' | ''>(storeProgress || '');

  const isFormValid = progress !== '';

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert('Selection Required', 'Please rate your progress to continue.');
      return;
    }
    setStep3(progress);
    navigation.navigate('QbsSleep');
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
        currentStep={3}
        totalSteps={7}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          How would you rate your progress ?
        </AppText>
        <AppText variant="caption" weight='light' family="secondary" style={styles.subText}>
          Your progress helps us tailor today's conversation
        </AppText>

        <View style={styles.optionsContainer}>
          <QbsProgressRow
            title="Improved"
            subtitle="I'm feeling better and more in control."
            iconComponent={<TrendingUp size={normalize(18)} color="#16A34A" />}
            iconBgColor="#DCFCE7"
            selected={progress === 'improved'}
            onPress={() => setProgress('improved')}
          />
          <QbsProgressRow
            title="Stayed the same"
            subtitle="Things are consistent with my last visit."
            iconComponent={<Minus size={normalize(18)} color="#2563EB" />}
            iconBgColor="#DBEAFE"
            selected={progress === 'same'}
            onPress={() => setProgress('same')}
          />
          <QbsProgressRow
            title="Worsened"
            subtitle="I've been struggling more than usual lately."
            iconComponent={<TrendingDown size={normalize(18)} color="#DC2626" />}
            iconBgColor="#FEE2E2"
            selected={progress === 'worsened'}
            onPress={() => setProgress('worsened')}
          />
        </View>

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          disabled={!isFormValid}
          onPress={handleContinue}
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
    marginBottom: normalize(4),
    marginTop: normalize(10),
  },
  subText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(30),
    paddingHorizontal: normalize(20),
    marginHorizontal: normalize(-20),
  },
  optionsContainer: {
    marginTop: normalize(10),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
