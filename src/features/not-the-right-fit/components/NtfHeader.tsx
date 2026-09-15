import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NtfHeaderProps {
  /** Current step number, e.g. 2 */
  currentStep: number;
  /** Total steps, e.g. 7 */
  totalSteps: number;
  onBack: () => void;
}

export const NtfHeader: React.FC<NtfHeaderProps> = ({ currentStep, totalSteps, onBack }) => {
  const progressPct = (currentStep / totalSteps) * 100;

  return (
    <LinearGradient
      colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[100]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.header}
    >
      {/* Back button */}
      {/* <Pressable
        onPress={onBack}
        style={({ pressed }) => [
          styles.backBtn,
          pressed && { borderRadius: normalize(99), backgroundColor: 'rgba(0,0,0,0.05)' },
        ]}
      >
        <ArrowLeft size={normalize(22)} color={colors.lightAppTheme[950]} strokeWidth={2} />
      </Pressable> */}

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
      </View>

      {/* Step label */}
      <AppText variant="caption" family='secondary' weight="semiBold" style={styles.stepLabel}>
        Step {currentStep} of {totalSteps}
      </AppText>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    gap: normalize(10),
  },
  backBtn: {
    width: normalize(34),
    height: normalize(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    flex: 1,
    height: normalize(8),
    borderRadius: normalize(99),
    backgroundColor: '#DAE3F1',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: normalize(99),
    backgroundColor: colors.lightAppTheme[900],
  },
  stepLabel: {
    color: "#0040A1",
    fontSize: normalize(11),
    letterSpacing: 0.2,
    minWidth: normalize(56),
    textAlign: 'right',
  },
});
