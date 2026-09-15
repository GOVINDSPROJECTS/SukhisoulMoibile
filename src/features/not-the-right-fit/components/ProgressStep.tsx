import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Check, Loader, Clock, LoaderCircle, CircleEllipsis } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export type StepStatus = 'completed' | 'in_progress' | 'next_up';

interface ProgressStepProps {
  label: string;
  status: StepStatus;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({ label, status }) => {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let spinAnimation: Animated.CompositeAnimation | null = null;
    if (isInProgress) {
      spinValue.setValue(0);
      spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
    } else {
      spinValue.setValue(0);
    }
    return () => {
      if (spinAnimation) {
        spinAnimation.stop();
      }
    };
  }, [isInProgress]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const statusText = isCompleted ? 'COMPLETED' : isInProgress ? 'IN PROGRESS...' : 'NEXT UP';
  const statusColor = isCompleted
    ? "#737785"
    : isInProgress
      ? colors.lightAppTheme[700]
      : colors.typographyColor.Medium;

  const iconBg = isCompleted
    ? colors.blue[600]
    : isInProgress
      ? colors.lightTints.blueLightTint[50]
      : colors.tintsGrey[100];

  return (
    <View style={[styles.row, isInProgress && styles.rowActive]}>
      <View style={[styles.iconWrap, { backgroundColor: isInProgress ? 'rgba(0,64,161,0.10)' : isCompleted ? colors.blue[600] : iconBg }]}>
        {isCompleted ? (
          <Check size={normalize(17)} color="#FFFFFF" strokeWidth={2.5} />
        ) : isInProgress ? (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <LoaderCircle size={normalize(20)} color={colors.lightAppTheme[700]} strokeWidth={2} />
          </Animated.View>
        ) : (
          <CircleEllipsis size={normalize(20)} color={colors.typographyColor.Medium} strokeWidth={1.5} />
        )}
      </View>

      <View style={styles.textWrap}>
        <AppText
          variant="body"
          family='secondary'
          weight={isInProgress ? 'semiBold' : 'medium'}
          style={[styles.label, isInProgress && styles.labelActive]}
        >
          {label}
        </AppText>
        <AppText variant="caption" family='secondary' weight="regular" style={[styles.status, { color: statusColor }]}>
          {statusText}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    borderWidth: 1,
    borderColor: "#C3C6D6",
    borderRadius: normalize(12),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(16),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(10),
  },
  rowActive: {
    borderWidth: 2,
    borderColor: colors.blue[700],
    backgroundColor: "#F0F3FF",
  },
  iconWrapActive: {
    backgroundColor: 'rgba(0,64,161,0.10)',
  },
  iconWrap: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: normalize(2),
  },
  label: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(13),
  },
  labelActive: {
    color: colors.typographyColor['Dark 2'],
  },
  status: {
    fontSize: normalize(10),
    letterSpacing: 0.4,
  },
});
