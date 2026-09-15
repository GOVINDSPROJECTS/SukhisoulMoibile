import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { RedeemSuccessCard } from '../components/RedeemSuccessCard';

const TOTAL_SESSION_PRICE = 1200;
const POINTS_USED = 950;
const POINTS_VALUE = 900;
const REMAINING_POINTS = 250;
const REMAINING_VALUE = 250;

export const RedeemSuccessScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBookTherapy = () => {
    // Navigate to booking flow — navigate back to home and open booking
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.typographyColor.White }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top }} />



      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../psychologist/assets/bookingSummary/bookingBg.png')}
          resizeMode="contain"
          style={[
            {
              backgroundColor: colors.typographyColor.White
            },
          ]}
        >
          <RedeemSuccessCard
            totalPrice={TOTAL_SESSION_PRICE}
            pointsUsed={POINTS_USED}
            pointsValue={POINTS_VALUE}
            remainingPoints={REMAINING_POINTS}
            remainingValue={REMAINING_VALUE}
            onBookTherapy={handleBookTherapy}
          />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    gap: normalize(16),
  },
});
