import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LogOut, Trash2 } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';

interface SettingsActionButtonsProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const SettingsActionButtons: React.FC<SettingsActionButtonsProps> = ({
  onLogout,
  onDeleteAccount,
}) => {
  return (
    <View style={styles.container}>
      {/* Log Out */}
      <TouchableOpacity
        style={styles.actionBtn}
        activeOpacity={0.8}
        onPress={onLogout}
      >
        <LogOut size={normalize(18)} color="#DC2626" strokeWidth={2.2} />
        <AppText weight="semiBold" family="secondary" style={styles.actionText} color="#DC2626">
          Log Out
        </AppText>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        style={styles.actionBtn}
        activeOpacity={0.8}
        onPress={onDeleteAccount}
      >
        <Trash2 size={normalize(18)} color="#DC2626" strokeWidth={2.2} />
        <AppText weight="semiBold" family="secondary" style={styles.actionText} color="#DC2626">
          Delete Account
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: normalize(12),
    marginTop: normalize(4),
    marginBottom: normalize(20),
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
  },
  actionText: {
    fontSize: normalize(13),
  },
});
