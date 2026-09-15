import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface AuthButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) => {
  const { colors, typography, borderRadius } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.secondary[500] };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.lightAppTheme[200],
        };
      default:
        return {
          backgroundColor: 'transparent', // Handled by SVG gradient overlay
          shadowColor: colors.lightAppTheme[900],
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 4,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: colors.lightAppTheme[700] };
      default:
        return { color: '#FFFFFF' };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { borderRadius: borderRadius.full }, // Pill style button shape
        getButtonStyle(),
        style,
        (disabled || loading) && styles.disabled,
      ]}
      activeOpacity={0.8}
    >
      {/* Premium Horizontal Gradient Fill for Primary buttons */}
      {variant === 'primary' && !disabled && (
        <View 
        style={[
          StyleSheet.absoluteFill,
          {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: borderRadius.full,
            overflow: 'hidden',
          },
        ]}>
          <Svg style={StyleSheet.absoluteFill}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <Defs>
              {/* Sky Blue → Royal Blue horizontal gradient */}
              <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="5%" stopColor={colors.lightAppTheme[800]} />
                <Stop offset="65%" stopColor={colors.lightTints.blueLightTint2[400]} />
                <Stop offset="100%" stopColor={colors.lightAppTheme[950]} />
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="url(#btnGrad)"
            />
          </Svg>
        </View>
      )}

      {/* Gray background for disabled primary buttons */}
      {variant === 'primary' && disabled && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.gray[300], borderRadius: borderRadius.full }]} />
      )}

      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.lightAppTheme[700] : '#FFFFFF'} />
      ) : (
        <Text style={[styles.text, getTextStyle(), { fontFamily: typography.fontFamily.primary.medium }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: normalize(55),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: normalize(8),
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: normalize(16),
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.6,
  },
});
