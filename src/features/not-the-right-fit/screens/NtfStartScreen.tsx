import React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

export const NtfStartScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.lightTints.blueLightTint[100], colors.typographyColor.White]}
          style={[styles.topGradient, { paddingTop: 16 }]}
        >
          {/* Illustration */}
          <View style={styles.illustrationWrap}>
            <Image
              source={require('../assets/therapy-session.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <AppText variant="h3" family="secondary" weight="bold" style={styles.heading}>
            Let's find a psychologist{'\n'}who suits you better.
          </AppText>

          {/* Body text */}
          <AppText variant="body" family="secondary" weight="light" style={styles.body}>
            Tell us what didn't work, and we'll recommend a better match based on your unique needs and preferences.
          </AppText>
        </LinearGradient>
        <View style={{ paddingHorizontal: normalize(20) }}>
          {/* Info box */}
          <View style={styles.infoBox}>
            <Image
              source={require('../assets/money.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <AppText variant="body" family="secondary" weight="medium" style={styles.infoText}>
              The booking amount for any previous session will be refunded within 5 to 7 days of changing therapist or having next booking with a new therapist.
            </AppText>
          </View>

          {/* CTA */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => navigation.navigate('NtfFeedback')}
          >
            <LinearGradient
              colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={styles.btn}
            >
              <AppText variant="body" family='secondary' weight="medium" style={styles.btnText}>
                Find My Match
              </AppText>
              <ArrowRight size={normalize(16)} color="#FFFFFF" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>
      {/* Gradient top accent */}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerInner: { marginHorizontal: normalize(-15), paddingHorizontal: normalize(15), paddingTop: normalize(25) },
  topGradient: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(8),
  },
  stepBadge: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    letterSpacing: 0.4,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(0),
    paddingBottom: normalize(50),
  },
  illustrationWrap: {
    alignItems: 'center',
    marginTop: normalize(80),
    marginBottom: normalize(35),
  },
  illustration: {
    width: normalize(250),
    height: normalize(250),
  },
  heading: {
    color: colors.typographyColor.Black,
    fontSize: normalize(18),
    lineHeight: normalize(26),
    marginBottom: normalize(6),
  },
  body: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
    lineHeight: normalize(21),
    marginBottom: normalize(22),
    textAlign: 'center'
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(10),
    backgroundColor: colors.green[50],
    borderRadius: normalize(12),
    padding: normalize(14),
    marginBottom: normalize(28),
    borderWidth: 1,
    borderColor: 'rgba(195,198,214,0.3)'
  },
  infoIcon: {
    width: normalize(63),
    height: normalize(63),
    marginTop: normalize(2),
  },
  infoText: {
    flex: 1,
    color: colors.typographyColor.Light,
    fontSize: normalize(11.5),
    lineHeight: normalize(18),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
  },
  btnText: { color: '#FFFFFF', fontSize: normalize(15) },
});
