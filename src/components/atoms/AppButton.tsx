import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '@theme/index';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading,
  disabled,
  style,
  textStyle,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: { backgroundColor: colors.secondary[500] },
          text: { color: colors.surface }
        };
      case 'outline':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.primary[500]
          },
          text: { color: colors.primary[500] }
        };
      case 'ghost':
        return {
          button: { backgroundColor: 'transparent' },
          text: { color: colors.primary[500] }
        };
      default:
        return {
          button: { backgroundColor: colors.primary[500] },
          text: { color: colors.surface }
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          padding: spacing.m,
          borderRadius: borderRadius.m,
        },
        vStyles.button,
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={vStyles.text.color} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: typography.fontSize.m,
              fontWeight: typography.fontWeight.semiBold as any
            },
            vStyles.text,
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});
