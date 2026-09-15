import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface NutqHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const NutqHeader: React.FC<NutqHeaderProps> = ({ title, currentStep, totalSteps, onBack }) => {
  const progressPct = (currentStep / totalSteps) * 100;

  return (
    <View>
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.container}>
          {/* Top Row: Back button and Title */}
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backBtn}
              activeOpacity={0.8}
            >
              <ArrowLeft size={normalize(22)} color={colors.blue[800]} strokeWidth={2.5} />
            </TouchableOpacity>
            <AppText variant="body" family="secondary" weight="semiBold" style={styles.title}>
              {title}
            </AppText>
            <View style={styles.placeholder} />
          </View>
        </View>
      </LinearGradient>
      {/* Progress bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
        <AppText variant="caption" family="secondary" weight="medium" style={styles.stepLabel}>
          Step {currentStep} of {totalSteps}
        </AppText>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(15),
    paddingBottom: normalize(0),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(15),
  },
  backBtn: {
    padding: normalize(4),
  },
  title: {
    color: colors.blue[600],
    fontSize: normalize(16),
  },
  placeholder: {
    width: normalize(30),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    padding: normalize(20),
    paddingHorizontal: normalize(25)
  },
  progressTrack: {
    flex: 1,
    height: normalize(8),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: normalize(99),
    backgroundColor: colors.typographyColor['Dark 2'],
  },
  stepLabel: {
    color: colors.tintsGrey[400],
    fontSize: normalize(11),
    letterSpacing: 0.2,
  },

});
