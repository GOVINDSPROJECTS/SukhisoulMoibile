import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, typography } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';
import { Brain, Sparkles, Calendar, Leaf, ChevronDown, Wallet, Lock, Heart, Gem } from 'lucide-react-native';
import type { NavigationProp } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { colorTokens } from '@/theme/tokens';

export const ManifestScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#BDB3F3' }]}
      edges={['left', 'right', 'bottom']}
    >
      <LinearGradient
        colors={[colors.lightTints.purpleLightTint[50], colors.lightTints.purpleLightTint[200]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: normalize(1080) }}
      >
      </LinearGradient>
      <StatusBar barStyle="dark-content" backgroundColor="#BDB3F3" translucent={false} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Content Area */}
        <ImageBackground
          source={require('../assets/manifest-bg.png')} // Placeholder for background image
          style={styles.mainContentBg}
          imageStyle={{ opacity: 1 }}
        >
          <View style={styles.mainContent}>
            <View style={styles.tagContainer}>
              <AppText style={styles.tagText} weight="medium">✨ Your Best Life Awaits</AppText>
            </View>

            <AppText style={styles.titleText} weight="black" family="secondary">
              Manifestation
            </AppText>
            <AppText style={styles.titleTextPurple} weight="black" family="secondary">
              Is on it's way
            </AppText>

            <AppText style={styles.descText} weight='regular' family='secondary'>
              We're crafting a powerful experience to help you attract, visualize and manifest your dream life.
            </AppText>

            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient
                colors={[colors.lightTints.purpleLightTint[300], colorTokens.purple[900]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.launchingBtn}
              >
                <Lock size={normalize(18)} color="#FFFFFF" />
                <AppText style={styles.launchingBtnText} weight="extraBold">Launching Soon</AppText>
              </LinearGradient>

            </TouchableOpacity>

          </View>
          {/* Bottom Features Card */}
          <View style={styles.featuresCardParent}>
            <View style={styles.featuresCard}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={require('../assets/heart.png')} style={{ width: normalize(14), height: normalize(14), resizeMode: 'contain' }} />
                </View>
                <View>
                  <AppText style={styles.featureTitle} weight="bold">Visualize</AppText>
                  <AppText style={styles.featureSub}>Your Goals</AppText>
                </View>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={require('../assets/attract.png')} style={{ width: normalize(14), height: normalize(14), resizeMode: 'contain' }} />
                </View>
                <View>
                  <AppText style={styles.featureTitle} weight="bold">Attract</AppText>
                  <AppText style={styles.featureSub}>Positivity</AppText>
                </View>
              </View>

              <View style={styles.featureDivider} />

              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={require('../assets/manifest.png')} style={{ width: normalize(20), height: normalize(20), resizeMode: 'contain' }} />
                </View>
                <View>
                  <AppText style={styles.featureTitle} weight="bold">Manifest</AppText>
                  <AppText style={styles.featureSub}>Your Dreams</AppText>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8F9FC', // Light blue/grey fallback

  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContentBg: {
    flex: 1,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(60),
    paddingBottom: normalize(30),

  },
  mainContent: {
    flex: 1,

  },
  featuresCardParent: {
    marginTop: normalize(40),
    marginBottom: normalize(0),
    zIndex: 11111,
  },
  tagContainer: {
    marginBottom: normalize(16),
    backgroundColor: "#ffffff",
    borderRadius: normalize(99),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(7),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: normalize(200),
  },
  tagText: {
    fontSize: normalize(12),
    color: '#7C5DFA',
  },
  titleText: {
    fontSize: normalize(42),
    color: colorTokens.purple[950],
    lineHeight: normalize(48),
    marginBottom: normalize(16),
    letterSpacing: normalize(-1)
  },
  titleTextPurple: {
    fontSize: normalize(42),
    color: colorTokens.purple[800],
    lineHeight: normalize(48),
    marginTop: normalize(-30),
    flex: 1,
    letterSpacing: normalize(-1)
  },
  descText: {
    fontSize: normalize(16),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(30),
    marginBottom: normalize(32),
    paddingRight: normalize(40),
    marginTop: normalize(30)
  },
  launchingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6D28D9',
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(24),
    borderRadius: normalize(99),
    alignSelf: 'flex-start',
    gap: normalize(10),
  },
  launchingBtnText: {
    fontSize: normalize(13),
    color: '#FFFFFF',
  },
  featuresCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: normalize(30),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(16),
    marginHorizontal: normalize(-8),
    marginTop: normalize(10),
    marginBottom: normalize(0),
    zIndex: 99
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    flex: 1,
  },
  featureIconContainer: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(99),
    backgroundColor: colors.lightTints.purpleLightTint[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: normalize(11),
    color: '#312E81',
  },
  featureSub: {
    fontSize: normalize(9),
    color: '#6B7280',
  },
  featureDivider: {
    width: 1,
    height: normalize(30),
    // backgroundColor: '#E2E8F0',
    backgroundColor: '#E0E7FF',
    marginLeft: normalize(8),
    marginRight: normalize(8),
  },
});