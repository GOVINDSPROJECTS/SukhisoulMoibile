import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface SocialLoginButtonProps {
  onPress: () => void;
  loading?: boolean;
}

// Stacked Capsule Google Button
export const GoogleLoginButton: React.FC<SocialLoginButtonProps> = ({ onPress, loading = false }) => {
  const { colors, typography, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        {
          borderColor: colors.lightTints.greenLightTint[400],
          backgroundColor: colors.blue[50],
          borderRadius: borderRadius.full, // Pill-shape capsule
          shadowColor: colors.lightTints.greenLightTint[400],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 1,
        },
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.lightAppTheme[700]} />
      ) : (
        <View style={styles.content}>
          <Svg width={normalize(20)} height={normalize(20)} viewBox="0 0 24 24" style={styles.icon}>
            <Path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <Path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <Path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.77-.66-1.2-1.63-1.2-2.72z"
            />
            <Path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </Svg>
          <Text style={[styles.text, { color: colors.typographyColor.Medium, fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
            Google
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Stacked Capsule WhatsApp Button
export const WhatsAppLoginButton: React.FC<SocialLoginButtonProps> = ({ onPress, loading = false }) => {
  const { colors, typography, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        {
          borderColor: colors.green[700], // Soft light green border
          backgroundColor: colors.blue[50], // SageLight green tint background
          borderRadius: borderRadius.full, // Pill-shape capsule
          shadowColor: colors.green[700],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 1,
        },
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.green[700]} />
      ) : (
        <View style={styles.content}>
          <Svg width={normalize(20)} height={normalize(20)} viewBox="0 0 16 16" style={styles.icon}>
            <Path 
              fill={colors.green[700]}
              d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"/>
            <Path 
              fill={colors.green[700]}
              d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"/>
          </Svg>
          <Text style={[styles.text, { color: colors.green[700], fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
            Whatsapp
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Circular Google Button for Onboarding screen
export const GoogleCircleButton: React.FC<SocialLoginButtonProps> = ({ onPress, loading = false }) => {
  const { colors, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.circleButton,
        {
          borderColor: colors.lightTints.greenLightTint[400],
          backgroundColor: colors.appThemeColor[50],
          borderRadius: borderRadius.full,
          shadowColor: colors.lightAppTheme[900],
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
          width:45,
          height:45
        },
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.lightAppTheme[700]} size="small" />
      ) : (
        <Svg width={normalize(20)} height={normalize(20)} viewBox="0 0 24 24">
          <Path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <Path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <Path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.77-.66-1.2-1.63-1.2-2.72z"
          />
          <Path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

// Circular WhatsApp Button for Onboarding screen
export const WhatsAppCircleButton: React.FC<SocialLoginButtonProps> = ({ onPress, loading = false }) => {
  const { borderRadius } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.circleButton,
        {
          borderColor: colors.green[700], // Soft light green border
          backgroundColor: colors.appThemeColor[50],
          borderRadius: borderRadius.full,
          shadowColor: '#027A45',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
          width:45,
          height:45
        },
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.green[700]} size="small" />
      ) : (
        <Svg width={normalize(24)} height={normalize(24)} viewBox="0 0 16 16">
          <Path 
            fill={colors.green[700]}
            d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"/>
          <Path 
            fill={colors.green[700]}
            d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"/>
        </Svg>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: normalize(40),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    alignSelf: "center",
    marginVertical: normalize(4),
  },
  circleButton: {
    width: normalize(40),
    height: normalize(40),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(8),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: normalize(12),
  },
  text: {
    fontWeight: '700',
  },
});
