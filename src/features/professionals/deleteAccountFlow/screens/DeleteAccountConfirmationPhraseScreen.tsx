import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ConfirmationPhraseCard } from '../components/ConfirmationPhraseCard';

const REQUIRED_PHRASE = 'DELETE MY PROFESSIONAL ACCOUNT';

export const DeleteAccountConfirmationPhraseScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [phraseInput, setPhraseInput] = useState('');

  const handleContinue = () => {
    navigation.navigate('DeleteAccountFinalWarningScreen');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="secondary" weight="bold" style={styles.headerTitle}>
            Delete Account
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* Header Titles */}
        <View style={styles.titleSection}>
          <AppText family="secondary" weight="extraBold" style={styles.pageTitle}>
            Type Confirmation Phrase
          </AppText>
          <AppText family="secondary" weight="regular" style={styles.pageSubtitle}>
            Type the exact phrase below
          </AppText>
        </View>

        {/* Confirmation Phrase Card */}
        <ConfirmationPhraseCard
          requiredPhrase={REQUIRED_PHRASE}
          phraseInput={phraseInput}
          onChangePhraseInput={setPhraseInput}
          onContinue={handleContinue}
          onCancel={handleCancel}
        />
      </ScrollView>

      {/* Bottom Copyright Strip */}
      <View style={styles.copyrightStrip}>
        <AppText family="secondary" weight="regular" style={styles.copyrightText}>
          © Sukhi Soul Professional. All rights reserved.
        </AppText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(24),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  pageTitle: {
    fontSize: normalize(18),
    color: '#0F172A',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: normalize(12),
    color: '#64748B',
    textAlign: 'center',
    marginTop: normalize(4),
  },
  copyrightStrip: {
    paddingVertical: normalize(14),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  copyrightText: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
});
