import { Platform } from 'react-native';
import { typographyTokens } from './tokens';

const createFontFamily = (family: string) => ({
  thin: `${family}-Thin`,
  extraLight: `${family}-ExtraLight`,
  light: `${family}-Light`,
  regular: `${family}-Regular`,
  medium: `${family}-Medium`,
  semiBold: `${family}-SemiBold`,
  bold: `${family}-Bold`,
  extraBold: `${family}-ExtraBold`,
  black: `${family}-Black`,
});

const primaryFonts = createFontFamily(typographyTokens.fontFamilies.primary);

// DM Sans font files are usually named DMSans-*
const secondaryFonts = createFontFamily(
  typographyTokens.fontFamilies.secondary.replace(/\s+/g, '')
);
const tertiaryFonts = createFontFamily(
  'SourceSerif4'
);
export const fontName = secondaryFonts;
export const typography = {
  fontFamily: {
    primary: Platform.select({
      ios: primaryFonts,
      android: primaryFonts,
      default: primaryFonts,
    })!,

    secondary: Platform.select({
      ios: secondaryFonts,
      android: secondaryFonts,
      default: secondaryFonts,
    })!,

    tertiary: Platform.select({
      ios: tertiaryFonts,
      android: tertiaryFonts,
      default: tertiaryFonts,
    })!,
  },
  fontSize: {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    black: '900',
    extraBold: '800',
  } as const,
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Presets
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
} as const;

export type Typography = typeof typography;

