import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NutqSelectableRowProps {
  label: string;
  iconText?: string;
  selected: boolean;
  onPress: () => void;
}

export const NutqSelectableRow: React.FC<NutqSelectableRowProps> = ({ label, iconText, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.row, selected && styles.rowSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.content}>
      {iconText && (
        <AppText style={styles.iconText}>{iconText}</AppText>
      )}
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
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(16),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSelected: {
    borderColor: colors.lightTints.blueLightTint[200],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
  },
  iconText: {
    fontSize: normalize(14),
  },
  label: {
    color: colors.tintsGrey[600],
    fontSize: normalize(13),
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.blue[800],
    fontWeight: '500',
  },
});
