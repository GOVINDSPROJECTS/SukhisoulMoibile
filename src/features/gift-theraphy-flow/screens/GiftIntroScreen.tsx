import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, ShieldCheck, HeartHandshake, ArrowRight, User, Lock, Heart } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';

export const GiftIntroScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: "#FAF3EB" }} />

      <GiftHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={require('../assets/gift-intro.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.waveContainer}>
          <Image
            source={require('../assets/wave.png')}
            style={styles.waveImage}
            resizeMode="cover"
          />
        </View>

        {/* Badge */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Image source={require('../assets/gift-icon-new.png')} style={styles.giftIcon} />
            <AppText family="secondary" weight="regular" style={styles.badgeText}>
              GIFTING WELLNESS
            </AppText>
          </View>
        </View>

        {/* Main Heading */}
        <View style={styles.headingContainer}>
          <AppText family="primary" weight="extraBold" style={styles.headingText}>
            Send <AppText family="primary" weight="extraBold" style={styles.highlightText}>love.</AppText>
          </AppText>
          <AppText family="primary" weight="extraBold" style={styles.headingText}>
            Send <AppText family="primary" weight="extraBold" style={styles.highlightText}>support.</AppText>
          </AppText>
        </View>

        {/* Subtitle */}
        <AppText family="secondary" weight="regular" style={styles.subtitleText}>
          Gift a therapy session and make a real difference in someone's life.
        </AppText>

        {/* 3 Feature Circles */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <User size={normalize(20)} color={"#2D3142"} />
            </View>
            <AppText family="secondary" weight="medium" style={styles.featureLabel}>
              Certified Therapists
            </AppText>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Lock size={normalize(20)} color={"#2D3142"} />
            </View>
            <AppText family="secondary" weight="medium" style={styles.featureLabel}>
              Private & Secure
            </AppText>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Heart size={normalize(20)} color={"#2D3142"} />
            </View>
            <AppText family="secondary" weight="medium" style={styles.featureLabel}>
              Personalized Care
            </AppText>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GiftRecipient')}
        >
          <View style={styles.buttonContent}>
            <Gift size={normalize(18)} color="#FFFFFF" style={{ marginRight: normalize(8) }} />
            <AppText family="secondary" weight="extraBold" style={styles.primaryButtonText}>
              Gift a Session
            </AppText>
            <ArrowRight size={normalize(18)} color="#FFFFFF" style={{ marginLeft: normalize(8) }} />
          </View>
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('GiftManage')}
        >
          <AppText family="secondary" weight="extraBold" style={styles.secondaryButtonText}>
            Learn More
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
    paddingBottom: normalize(30),
    alignItems: 'center',
  },
  heroImageContainer: {
    width: '100%',
    height: normalize(330),
    overflow: 'hidden',
    borderBottomLeftRadius: normalize(24),
    borderBottomRightRadius: normalize(24),
    marginBottom: normalize(20),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  waveContainer: {
    width: '100%',
    height: '76%',
    position: 'absolute',
    bottom: normalize(0),
    zIndex: normalize(0)
  },
  waveImage: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    marginBottom: normalize(15),
    position: 'relative',
    marginTop: normalize(-90),
    zIndex: normalize(1),
    marginLeft: normalize(20),
    marginRight: 'auto'
  },
  badge: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.lightTints.redLightTint2[50],
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(7),
    borderRadius: normalize(99),
  },
  giftIcon: {
    width: normalize(15),
    height: normalize(15),
    marginRight: normalize(6),
    resizeMode: 'contain',
  },
  badgeText: {
    color: colors.colorPalet['Color 5'],
    fontSize: normalize(11),
    letterSpacing: 0.5,
  },
  headingContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: normalize(10),
    width: '100%',
    paddingHorizontal: normalize(20),
  },
  headingText: {
    fontSize: normalize(32),
    color: "#1E293B",
    lineHeight: normalize(38),
    textAlign: 'left',
  },
  highlightText: {
    color: '#FF758C',
    fontSize: normalize(32),
    lineHeight: normalize(38),
    textAlign: 'left',
  },
  subtitleText: {
    color: "#64748B",
    fontSize: normalize(14),
    textAlign: 'left',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(25),
    lineHeight: normalize(20),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(30),
  },
  featureItem: {
    alignItems: 'center',
    width: normalize(95),
  },
  featureIconCircle: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(26),
    backgroundColor: '#F8F0F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(8),
  },
  featureLabel: {
    color: "#2D3142",
    fontSize: normalize(11),
    textAlign: 'center',
    lineHeight: normalize(14),
  },
  primaryButton: {
    width: '88%',
    backgroundColor: '#FF6B6B',
    borderRadius: normalize(99),
    paddingVertical: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    boxShadow: '0px 10px 15px -3px rgba(251, 207, 232, 0.5), 0px 4px 6px -4px rgba(251, 207, 232, 0.5)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
  secondaryButton: {
    width: '88%',
    borderWidth: 1.5,
    borderColor: colors.lightTints.redLightTint2[200],
    borderRadius: normalize(99),
    paddingVertical: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(253,242,248,0.3)',
  },
  secondaryButtonText: {
    color: colors.lightTints.redLightTint2[400],
    fontSize: normalize(15),
  },
});
