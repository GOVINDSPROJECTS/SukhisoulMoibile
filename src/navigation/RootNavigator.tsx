import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { CompleteProfileScreen } from '../screens/Auth/CompleteProfileScreen';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { useTheme } from '../theme';

export const RootNavigator = () => {
  const { user, isNewUser, isInitializing, initialize } = useAuthStore();
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        dark: colors.background === '#121212',
        colors: {
          primary: colors.primary[500],
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          notification: colors.accent,
        },
        fonts: {
          regular: { fontFamily: '', fontWeight: 'normal' },
          medium: { fontFamily: '', fontWeight: '500' },
          bold: { fontFamily: '', fontWeight: 'bold' },
          heavy: { fontFamily: '', fontWeight: '900' },
        },
      }}
    >
      {user ? (
        isNewUser ? <CompleteProfileScreen /> : <AppStack />
      ) : (
        // <AppStack />
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
