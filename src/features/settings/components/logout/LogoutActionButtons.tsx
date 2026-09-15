import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface LogoutActionButtonsProps {
  onLogout: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LogoutActionButtons: React.FC<LogoutActionButtonsProps> = ({
  onLogout,
  onCancel,
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Log Out Primary Red Button */}
      <TouchableOpacity
        style={styles.logoutBtn}
        activeOpacity={0.85}
        onPress={() => {
          console.log('[Log Out] Log Out confirm button pressed');
          onLogout();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <AppText
            weight="semiBold"
            family="secondary"
            style={styles.logoutText}
            color="#FFFFFF"
          >
            Log Out
          </AppText>
        )}
      </TouchableOpacity>

      {/* Cancel Outline Button */}
      <TouchableOpacity
        style={styles.cancelBtn}
        activeOpacity={0.8}
        onPress={() => {
          console.log('[Log Out] Cancel button pressed');
          onCancel();
        }}
        disabled={isLoading}
      >
        <AppText
          weight="semiBold"
          family="secondary"
          style={styles.cancelText}
          color={colors.typographyColor.Medium || '#64748B'}
        >
          Cancel
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    width: '100%',
    gap: normalize(12),
    marginTop: normalize(12),
    marginBottom: normalize(40),
  },
  logoutBtn: {
    backgroundColor: colors.colorPalet['Color 6'],
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    minHeight: normalize(55),
  },
  logoutText: {
    fontSize: normalize(16),
    letterSpacing: 0.2,
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: normalize(55),
  },
  cancelText: {
    fontSize: normalize(16),
    letterSpacing: 0.2,
  },
});
