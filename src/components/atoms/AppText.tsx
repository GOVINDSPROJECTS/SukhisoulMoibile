import React from 'react';
import { Text, TextProps } from 'react-native';
import { typography, useTheme } from '@theme/index';

interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption';
  color?: string;
  family?: 'primary' | 'secondary' | 'tertiary';

  weight?:
  | 'thin'
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';
  center?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  color,
  family = 'primary',
  weight = 'medium',
  center,
  style,
  ...props
}) => {
  const { colors, typography } = useTheme();
  const fontFamily = typography.fontFamily[family][weight];

  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: typography.fontSize.xxxl,
        };
      case 'h2':
        return {
          fontSize: typography.fontSize.xxl,
        };
      case 'h3':
        return {
          fontSize: typography.fontSize.xl,
        };
      case 'h4':
        return {
          fontSize: typography.fontSize.l,
        };
      case 'body':
        return {
          fontSize: typography.fontSize.s,
        };
      case 'bodySmall':
        return {
          fontSize: typography.fontSize.s,
        };
      case 'caption':
        return {
          fontSize: typography.fontSize.xs,
          color: colors.textMuted,
        };
      default:
        return {
          fontSize: typography.fontSize.m,
        };
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        {
          color: color || colors.text,
          fontFamily,
        },
        center && { textAlign: 'center' },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
