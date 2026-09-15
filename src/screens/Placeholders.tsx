import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AuthButton } from '../features/auth/components/AuthButton';

const PlaceholderScreen = ({ name }: { name: string }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text, fontSize: typography.fontSize.xxl }]}>
        {name} Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export const LoginScreen = () => <PlaceholderScreen name="Login" />;
export const RegisterScreen = () => <PlaceholderScreen name="Register" />;
export const HomeScreen = () => <PlaceholderScreen name="Home" />;
export const HabitsScreen = () => <PlaceholderScreen name="Habits" />;
export const MoodScreen = () => <PlaceholderScreen name="Mood" />;

export const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: 20 }]}>
      <Text style={[styles.text, { color: colors.text, fontSize: typography.fontSize.xxl, marginBottom: 10 }]}>
        Profile Screen
      </Text>
      <Text style={{ color: colors.text, marginBottom: 30 }}>
        Logged in as: {user?.phoneNumber || user?.email || 'User'}
      </Text>
      <AuthButton title="Logout" onPress={logout} variant="outline" />
    </View>
  );
};

export const SettingsScreen = () => <PlaceholderScreen name="Settings" />;
