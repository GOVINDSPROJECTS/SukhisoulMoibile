import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export type PermissionLevel = 'Allow' | 'Ask Every Time' | "Don't Allow";

interface PermissionRowItemProps {
  label: string;
  value: PermissionLevel;
  onPress: () => void;
  showDivider?: boolean;
}

export const PermissionRowItem: React.FC<PermissionRowItemProps> = ({
  label,
  value,
  onPress,
  showDivider = true,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <AppText
          weight="light"
          family="secondary"
          style={styles.label}
          color={colors.typographyColor.Medium}
        >
          {label}
        </AppText>

        <View style={styles.rightGroup}>
          <AppText
            weight="medium"
            family="primary"
            style={styles.value}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            {value}
          </AppText>
          <ChevronRight
            size={normalize(16)}
            color={colors.tintsGrey[200]}
            strokeWidth={2}
          />
        </View>
      </TouchableOpacity>

      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(10),
  },
  label: {
    fontSize: normalize(13.5),
    flex: 1,
    paddingRight: normalize(10),
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  value: {
    fontSize: normalize(13.5),
  },
  divider: {
    height: 1,
    backgroundColor: colors.tintsGrey[50],
  },
});
