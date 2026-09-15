import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SettingsHeaderProps {
  title?: string;
  onBack: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title = 'Settings',
  onBack,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <ArrowLeft
          size={normalize(22)}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
          strokeWidth={2.5}
        />
      </TouchableOpacity>

      <AppText
        weight="bold"
        family="primary"
        style={styles.title}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        {title}
      </AppText>

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(16),
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: normalize(36),
  },
});
