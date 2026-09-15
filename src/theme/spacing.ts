import { spacingTokens } from './tokens';

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8, // alias for s
  s: 8,
  md: 16, // alias for m
  m: 16,
  lg: 24, // alias for l
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Figma spacing tokens
  ...spacingTokens,
};

export type Spacing = typeof spacing;

