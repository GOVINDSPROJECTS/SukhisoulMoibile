import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface ChipItemProps {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
}

export const ChipItem: React.FC<ChipItemProps> = ({ label, emoji, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <AppText style={styles.emoji}>{emoji}</AppText>
    <AppText variant="body" style={[styles.label, selected && styles.labelSelected]}>
      {label}
    </AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
    borderRadius: normalize(8),
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: normalize(6),
    width: "31.33%",
    marginHorizontal: "1%",
    marginVertical: "1.5%"
  },
  chipSelected: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderColor: colors.lightTints.blueLightTint[100],
  },
  emoji: {
    fontSize: normalize(13),
  },
  label: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
  },
  labelSelected: {
    color: colors.blue[800],
  },
});
