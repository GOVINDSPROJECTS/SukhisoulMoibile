import { colors } from '@/theme';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type GradientButtonProps = TouchableOpacityProps & {
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  borderRadius = 12,
  style,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={style}
      {...props}
    >
      <LinearGradient
        colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          borderRadius,
          overflow: 'hidden',
          paddingVertical: 10,
          paddingHorizontal: 18,
          minWidth: 146,
          minHeight: 50,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          shadowColor: '#0066CC',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};