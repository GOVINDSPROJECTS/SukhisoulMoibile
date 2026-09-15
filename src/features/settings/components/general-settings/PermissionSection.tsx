import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { PermissionRowItem, type PermissionLevel } from './PermissionRowItem';

export interface PermissionSectionItem {
  id: string;
  label: string;
  value: PermissionLevel;
}

interface PermissionSectionProps {
  title: string;
  items: PermissionSectionItem[];
  onItemPress: (item: PermissionSectionItem) => void;
}

export const PermissionSection: React.FC<PermissionSectionProps> = ({
  title,
  items,
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <AppText
        weight="medium"
        family="secondary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        {title}
      </AppText>

      {/* Rows Group */}
      <View style={styles.rowsGroup}>
        {items.map((item, index) => (
          <PermissionRowItem
            key={item.id}
            label={item.label}
            value={item.value}
            onPress={() => onItemPress(item)}
            showDivider={index < items.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(13),
    letterSpacing: 0.3,
    marginBottom: normalize(8),
    paddingHorizontal: normalize(2),
  },
  rowsGroup: {
    paddingHorizontal: normalize(2),
  },
});
