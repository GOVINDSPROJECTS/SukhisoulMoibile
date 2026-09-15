import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { WalletBalanceCard } from '../components/WalletBalanceCard';
import { HowItWorksSection } from '../components/HowItWorksSection';

const WALLET_BALANCE = 950;
const SESSION_GOAL = 1200;
const POINTS_WORTH_VALUE = 900;

export const RedeemScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleRedeem = () => {
    navigation.navigate('RedeemSuccess');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.tintsBlue[400] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{
        paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50]
      }} />

      {/* Header */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50], }]}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </Pressable>
        <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
          Points Redeem
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../psychologist/assets/bookingSummary/bookingBg.png')}
          resizeMode="contain"
          style={[
            styles.background,
            {
              backgroundColor: colors.typographyColor.White
            },
          ]}
        >
          {/* Wallet Balance Card */}
          <WalletBalanceCard
            balance={WALLET_BALANCE}
            goal={SESSION_GOAL}
            worthAmount={POINTS_WORTH_VALUE}
            onRedeem={handleRedeem}
          />
        </ImageBackground>

        {/* How It Works */}
        <HowItWorksSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
  headerSpacer: {
    width: normalize(36),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: normalize(0),
    paddingBottom: normalize(40),
    gap: normalize(0),
  },
});
