import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeColors } from './colors';
import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';
import { sizeTokens } from './tokens';

export interface Theme {
  colors: ThemeColors;
  spacing: Spacing;
  typography: Typography;
  borderRadius: {
    s: number;
    m: number;
    l: number;
    xl: number;
    full: number;
  };
  sizes: typeof sizeTokens;
}

const commonTheme = {
  spacing,
  typography,
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    full: 9999,
  },
  sizes: sizeTokens,
};

export const theme: Theme = {
  ...commonTheme,
  colors: lightTheme,
};

export const darkThemeInstance: Theme = {
  ...commonTheme,
  colors: darkTheme,
};

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? darkThemeInstance : theme;

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { typography, spacing, lightTheme as colors, sizeTokens as sizes };

