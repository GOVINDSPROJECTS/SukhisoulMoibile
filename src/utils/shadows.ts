import { Platform, ViewStyle } from 'react-native';

export interface ShadowOptions {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
  radius?: number;
  elevation?: number;
}

/**
 * Generates uniform, cross-platform shadow styles for iOS and Android.
 */
export const createShadow = ({
  color = '#000000',
  offsetX = 0,
  offsetY = 2,
  opacity = 0.08,
  radius = 4,
  elevation = 2,
}: ShadowOptions = {}): ViewStyle => {
  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: Platform.OS === 'android' ? elevation : undefined,
  };
};

/**
 * Standard app shadow presets
 */
export const shadowPresets = {
  sm: createShadow({ offsetY: 1, opacity: 0.05, radius: 2, elevation: 1 }),
  md: createShadow({ offsetY: 2, opacity: 0.08, radius: 4, elevation: 2 }),
  lg: createShadow({ offsetY: 4, opacity: 0.12, radius: 8, elevation: 4 }),
  card: createShadow({ offsetY: 2, opacity: 0.06, radius: 6, elevation: 3 }),
  floating: createShadow({ offsetY: 8, opacity: 0.15, radius: 16, elevation: 8 }),
};
