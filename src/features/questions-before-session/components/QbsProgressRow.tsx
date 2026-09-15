import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface QbsProgressRowProps {
  title: string;
  subtitle: string;
  iconComponent: React.ReactNode;
  iconBgColor: string;
  selected: boolean;
  onPress: () => void;
}

export const QbsProgressRow: React.FC<QbsProgressRowProps> = ({
  title,
  subtitle,
  iconComponent,
  iconBgColor,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.row, selected && styles.rowSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
      {iconComponent}
    </View>
    <View style={styles.textContainer}>
      <AppText
        variant="body"
        family='secondary'
        weight='medium'
        style={styles.title}
      >
        {title}
      </AppText>
      <AppText
        variant="caption"
        family='secondary'
        style={styles.subtitle}
      >
        {subtitle}
      </AppText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: "#C3C6D6",
    borderRadius: normalize(12),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(18),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(12),
    gap: normalize(24),
  },
  rowSelected: {
    borderColor: colors.lightTints.blueLightTint[100],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.tintsGrey[600],
    fontSize: normalize(14),
    marginBottom: normalize(2),
  },
  subtitle: {
    color: colors.tintsGrey[600],
    fontSize: normalize(10),
  },
});
