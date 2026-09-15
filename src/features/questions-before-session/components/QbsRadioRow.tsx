import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface QbsRadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const QbsRadioRow: React.FC<QbsRadioRowProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.row, selected && styles.rowSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <AppText
      variant="body"
      family='secondary'
      style={styles.label}
    >
      {label}
    </AppText>
    <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(20),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(12),
  },
  rowSelected: {
    borderColor: colors.lightTints.blueLightTint[100],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  label: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(14),
  },
  radioCircle: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    borderWidth: 2,
    borderColor: colors.tintsGrey[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.blue[600],
  },
  radioInner: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: colors.blue[600],
  },
});
