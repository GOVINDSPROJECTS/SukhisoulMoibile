import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface LogoutPromptProps {
  title?: string;
  message?: string;
}

export const LogoutPrompt: React.FC<LogoutPromptProps> = ({
  title = 'Log Out',
  message = 'Are you sure you want to log out of\nyour account?',
}) => {
  return (
    <View style={styles.container}>
      {/* Outer Soft Circle with Inner Circle Icon */}
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <LogOut
            size={normalize(36)}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={2}
          />
        </View>
      </View>

      {/* Title */}
      <AppText
        weight="medium"
        family="secondary"
        style={styles.title}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        {title}
      </AppText>

      {/* Subtitle */}
      <AppText
        weight="regular"
        family="secondary"
        style={styles.message}
        color={colors.typographyColor.Medium || '#64748B'}
      >
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
    marginTop: normalize(80),
    marginBottom: normalize(12),
  },
  outerCircle: {
    width: normalize(280),
    height: normalize(280),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: normalize(128),
    height: normalize(128),
    borderRadius: normalize(99),
    backgroundColor: colors.lightAppTheme[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(28),
    borderWidth: normalize(4),
    borderColor: colors.tintsBlue[50],
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  title: {
    fontSize: normalize(22),
    textAlign: 'center',
    marginBottom: normalize(8),
  },
  message: {
    fontSize: normalize(14),
    lineHeight: normalize(20),
    textAlign: 'center',
  },
});
