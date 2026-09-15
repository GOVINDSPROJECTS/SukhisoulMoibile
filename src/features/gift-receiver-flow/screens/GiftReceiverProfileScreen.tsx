import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftReceiverHeader } from '../components/GiftReceiverHeader';
import { GiftReceiverProgressCard } from '../components/GiftReceiverProgressCard';

const PROFILE_ITEMS = [
  { label: 'Therapy Goals', completed: true },
  { label: 'Primary Concerns', completed: true },
  { label: 'Duration of Issue', completed: true },
  { label: 'Session Preferences', completed: false },
];

const PROGRESS_PERCENT = 75;

export const GiftReceiverProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#FAF3EB' }} />
      <GiftReceiverHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={styles.titleBlock}>
          <AppText family="primary" weight="extraBold" style={styles.title}>
            Complete Your{'\n'}
            <AppText family="primary" weight="extraBold" style={styles.titlePink}>
              Therapy Profile
            </AppText>
          </AppText>
          <AppText family="secondary" style={styles.subtitle}>
            Help us understand you better so we can{'\n'}match you with the right therapist.
          </AppText>
        </View>

        {/* Progress Card */}
        <GiftReceiverProgressCard
          progressPercent={PROGRESS_PERCENT}
          items={PROFILE_ITEMS}
        />

        {/* "Why this matters?" Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconWrapper}>
            <Heart
              size={normalize(18)}
              color={colors.colorPalet['Color 4']}
            />
          </View>
          <View style={styles.infoTextWrapper}>
            <AppText family="secondary" weight="extraBold" style={styles.infoTitle}>
              Why this matters?
            </AppText>
            <AppText family="secondary" weight='light' style={styles.infoDescription}>
              A complete profile helps us match{'\n'}you with the most suitable{'\n'}therapist.
            </AppText>
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Next Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Home')}
        >
          <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
            Next
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(30),
    flexGrow: 1,
  },
  titleBlock: {
    marginBottom: normalize(24),
  },
  title: {
    fontSize: normalize(26),
    color: colors.typographyColor.Black,
    lineHeight: normalize(34),
    marginBottom: normalize(8),
  },
  titlePink: {
    fontSize: normalize(26),
    color: colors.colorPalet['Color 4'],
    lineHeight: normalize(34),
  },
  subtitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(20),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,240,245,0.50)',
    borderRadius: normalize(32),
    padding: normalize(24),
    marginBottom: normalize(20),
  },
  infoIconWrapper: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
    marginBottom: normalize(4),
  },
  infoDescription: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
    lineHeight: normalize(18),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(20),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
});
