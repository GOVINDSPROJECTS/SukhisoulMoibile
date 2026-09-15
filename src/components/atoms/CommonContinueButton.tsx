import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface RescheduleContinueButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
}

export const CommonContinueButton: React.FC<RescheduleContinueButtonProps> = ({
  label = 'Continue',
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0.85}
    style={[styles.wrapper, disabled && styles.disabled]}
    onPress={disabled ? undefined : onPress}
  >
    <LinearGradient
      colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.gradient}
    >
      <AppText variant="body" weight="bold" style={styles.text}>
        {label}
      </AppText>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    minHeight: normalize(54),

  },
  text: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
});
