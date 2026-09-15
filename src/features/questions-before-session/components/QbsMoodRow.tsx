import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface QbsMoodRowProps {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
}

export const QbsMoodRow: React.FC<QbsMoodRowProps> = ({ label, emoji, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.row, selected && styles.rowSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.content}>
      <AppText style={styles.emoji}>{emoji}</AppText>
      <AppText
        variant="body"
        family='secondary'
        style={[styles.label, selected && styles.labelSelected]}
      >
        {label}
      </AppText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    borderWidth: 1.5,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(16),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(12),
  },
  rowSelected: {
    borderColor: colors.lightTints.blueLightTint[100],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  emoji: {
    fontSize: normalize(20),
  },
  label: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(14),
  },
  labelSelected: {
    fontWeight: '500',
  },
});
