import { colorTokens } from './tokens';

export const palette = {
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Wellness Greens (Calm & Growth)
  sageLight: '#E8F3ED',
  sageBase: '#97BC62',
  sageDeep: '#2C5F2D',

  // Serene Blues/Teals (Peace & Emotion)
  tealLight: '#F0F7F7',
  tealBase: '#2D5F5D',
  tealDeep: '#1A3C3B',

  // Warm Neutrals (Comfort)
  cream: '#FDFCF8',
  sand: '#E6D5B8',
  warmGray: '#F5F5F5',

  // Accent Colors
  coral: '#E98074', // Soft emotional accent
  gold: '#D4AF37', // Achievement/Milestone

  // UI Grays
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Figma Tokens
  appThemeColor: colorTokens.appThemeColor,
  blue: colorTokens.blue,
  tintsBlue: colorTokens.tintsBlue,
  yellow: colorTokens.yellow,
  green: colorTokens.green,
  purple: colorTokens.purple,
  colorPalet: colorTokens.colorPalet,
  typographyColor: colorTokens.typographyColor,
  tintsGrey: colorTokens.tintsGrey,
  lightTints: colorTokens.lightTints,
  lightAppTheme: colorTokens.lightAppTheme,
  // lightAppTheme: color['Typography color']['Dark 2'].$value.hex,
};
// console.log(color['Typography color']['Dark 2'].$value.hex);

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export interface ThemeColors {
  background: string;
  surface: string;
  primary: ColorPalette;
  secondary: {
    50: string;
    100: string;
    500: string;
    900: string;
  };
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  card: string;
  tabBar: string;
  inputBackground: string;
  gray: {
    [key: string]: string;
  };
  appThemeColor: typeof palette.appThemeColor;
  blue: typeof palette.blue;
  tintsBlue: typeof palette.tintsBlue;
  yellow: typeof palette.yellow;
  green: typeof palette.green;
  purple: typeof palette.purple;
  colorPalet: typeof palette.colorPalet;
  typographyColor: typeof palette.typographyColor;
  tintsGrey: typeof palette.tintsGrey;
  lightTints: typeof palette.lightTints;
  lightAppTheme: typeof palette.lightAppTheme;
}

export const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  primary: {
    50: colorTokens.appThemeColor["50"],
    100: colorTokens.appThemeColor["100"],
    200: colorTokens.appThemeColor["200"],
    300: colorTokens.appThemeColor["300"],
    400: colorTokens.appThemeColor["400"],
    500: colorTokens.appThemeColor["500"],
    600: colorTokens.appThemeColor["600"],
    700: colorTokens.appThemeColor["700"],
    800: colorTokens.appThemeColor["800"],
    900: colorTokens.appThemeColor["900"],
  },
  secondary: {
    50: colorTokens.green["50"],
    100: colorTokens.green["100"],
    500: colorTokens.green["500"],
    900: colorTokens.green["900"],
  },
  accent: colorTokens.colorPalet.Color,
  text: colorTokens.typographyColor.Dark, // Deep Blue-Steel
  textMuted: colorTokens.typographyColor.Light, // Soft Slate Gray
  border: colorTokens.tintsGrey["100"], // E.g. #D5DBE2
  error: '#FF3B30', // Vibrant iOS red
  success: colorTokens.green["500"],
  card: '#FFFFFF',
  tabBar: '#FFFFFF',
  inputBackground: colorTokens.lightAppTheme["50"], // Very light blue tint #ECF0F6
  gray: {
    50: colorTokens.tintsGrey["50"],
    100: colorTokens.tintsGrey["100"],
    200: colorTokens.tintsGrey["200"],
    300: colorTokens.tintsGrey["300"],
    400: colorTokens.tintsGrey["400"],
    500: colorTokens.tintsGrey["500"],
    600: colorTokens.tintsGrey["600"],
    700: '#424242',
    800: '#212121',
    900: '#000000',
  },

  // Figma Tokens
  appThemeColor: palette.appThemeColor,
  blue: palette.blue,
  tintsBlue: palette.tintsBlue,
  yellow: palette.yellow,
  green: palette.green,
  purple: palette.purple,
  colorPalet: palette.colorPalet,
  typographyColor: palette.typographyColor,
  tintsGrey: palette.tintsGrey,
  lightTints: palette.lightTints,
  lightAppTheme: palette.lightAppTheme,
};


export const darkTheme: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688',
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
  },
  secondary: {
    50: palette.sageLight,
    100: '#DBE9D8',
    500: palette.sageBase,
    900: palette.sageDeep,
  },
  accent: palette.coral,
  text: '#E0E0E0',
  textMuted: palette.gray400,
  border: '#333333',
  error: '#CF6679',
  success: palette.sageBase,
  card: '#1E1E1E',
  tabBar: '#1E1E1E',
  inputBackground: '#2C2C2C',
  gray: {
    50: '#1A1A1A',
    100: '#2C2C2C',
    200: '#333333',
    300: '#424242',
    400: palette.gray400,
    500: palette.gray500,
    600: palette.gray600,
    700: palette.gray700,
    800: palette.gray800,
    900: palette.gray900,
  },

  // Figma Tokens
  appThemeColor: palette.appThemeColor,
  blue: palette.blue,
  tintsBlue: palette.tintsBlue,
  yellow: palette.yellow,
  green: palette.green,
  purple: palette.purple,
  colorPalet: palette.colorPalet,
  typographyColor: palette.typographyColor,
  tintsGrey: palette.tintsGrey,
  lightTints: palette.lightTints,
  lightAppTheme: palette.lightAppTheme,
};

// ThemeColors is already defined above as an interface

