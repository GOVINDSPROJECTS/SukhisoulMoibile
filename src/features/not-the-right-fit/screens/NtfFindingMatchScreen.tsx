import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Heart, Brain, Contact, UserCog, UserSearch, RefreshCw } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { ProgressStep, StepStatus } from '../components/ProgressStep';

const STEPS: { id: string; label: string }[] = [
  { id: 'prefs', label: 'Analyzing preferences' },
  { id: 'needs', label: 'Understanding your needs' },
  { id: 'finding', label: 'Finding compatible psychologists' },
  { id: 'prep', label: 'Preparing recommendations' },
];

export const NtfFindingMatchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(2); // 0-indexed; starts showing step 2 as in-progress

  // Animate progress bar to 76% then auto-navigate after delay
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 76,
      duration: 2400,
      useNativeDriver: false,
    }).start();

    // Update displayed progress number
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 76) {
          clearInterval(interval);
          return 76;
        }
        return prev + 2;
      });
    }, 60);

    // Auto-advance after 3.5s
    const timer = setTimeout(() => {
      navigation.navigate('NtfMatchFound');
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const getStatus = (idx: number): StepStatus => {
    if (idx < currentStep) return 'completed';
    if (idx === currentStep) return 'in_progress';
    return 'next_up';
  };

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  const onPress = () => {
    navigation.navigate('NtfMatchFound');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />

      <NtfHeader currentStep={7} totalSteps={7} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
          style={styles.containerInner}
        >
          {/* Illustration ring */}
          <View style={styles.ringWrap}>
            <View style={styles.outerRing}>
              <View style={styles.innerRing}>
                <View style={styles.iconCircle}>
                  <UserSearch size={normalize(60)} color="#0040A1" strokeWidth={1.5} />
                </View>
              </View>
              {/* Floating accent icons */}
              <View style={[styles.floatIcon, styles.floatTopRight]}>
                <UserCog size={normalize(16)} color="#0056D2" strokeWidth={2.5} />
              </View>
              <View style={[styles.floatIcon, styles.floatBottomLeft]}>
                <Heart size={normalize(14)} color="#0040A1" strokeWidth={2.5} />
              </View>
            </View>
          </View>

          {/* Steps */}
          {STEPS.map((step, idx) => (
            <ProgressStep key={step.id} label={step.label} status={getStatus(idx)} />
          ))}

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <AppText variant="caption" weight="bold" style={styles.progressLabel}>
                MATCHING PROGRESS
              </AppText>
              <AppText variant="body" weight="extraBold" style={styles.progressPct}>
                {progress}%
              </AppText>
            </View>
            <View style={styles.track}>
              <Animated.View style={[styles.bar, { width: barWidth }]}>
                <LinearGradient
                  colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradient}
                ></LinearGradient>
              </Animated.View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={false ? 1 : 0.85}
            style={[styles.wrapper, false && styles.disabled]}
            onPress={false ? undefined : onPress}
          >
            <LinearGradient
              colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: normalize(10) }}>
                <AppText variant="body" family='secondary' weight="semiBold" style={styles.text}>
                  Finding Match
                </AppText>
                <RefreshCw size={normalize(17)} color={"#ffffff"} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
  ringWrap: {
    alignItems: 'center',
    marginBottom: normalize(28),
    marginTop: normalize(14),
  },
  outerRing: {
    width: normalize(170),
    height: normalize(170),
    borderRadius: normalize(99),
    borderWidth: 0.8,
    borderColor: 'rgba(0,64,161,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: normalize(145),
    height: normalize(145),
    borderRadius: normalize(99),
    borderWidth: 0.8,
    borderColor: 'rgba(0,64,161,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2.875px 4.3125px -0.71875px rgba(0, 0, 0, 0.1), 0px 1.4375px 2.875px -1.4375px rgba(0, 0, 0, 0.1)',
  },
  floatIcon: {
    position: 'absolute',
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: "#C3C6D6",
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2.875px 4.3125px -0.71875px rgba(0, 0, 0, 0.1), 0px 1.4375px 2.875px -1.4375px rgba(0, 0, 0, 0.1)',
  },
  floatTopRight: { top: normalize(15), right: normalize(4), borderRadius: normalize(8), },
  floatBottomLeft: { bottom: normalize(14), left: normalize(4) },
  progressSection: {
    marginTop: normalize(18),
    marginBottom: normalize(8),
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  progressLabel: {
    color: "#0040A1",
    fontSize: normalize(11),
    letterSpacing: 0.5,
  },
  progressPct: {
    color: "#0040A1",
    fontSize: normalize(16),
  },
  track: {
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.appThemeColor[75],
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: normalize(4),
    backgroundColor: colors.blue[700],
  },
  wrapper: {
    borderRadius: normalize(99),
    overflow: 'hidden',
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
    width: '100%',
    maxWidth: normalize(320),
    alignSelf: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(16),
    minHeight: normalize(60),

  },
  text: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },

});
