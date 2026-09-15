import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Check, LucideIcon } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SelectionChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Optional lucide icon component */
  Icon?: LucideIcon;
  IconImg?: any;
  /** Icon background color */
  iconBg?: string;
  /** Icon color */
  iconColor?: string;
}

export const SelectionChip: React.FC<SelectionChipProps> = ({
  label,
  selected,
  onPress,
  Icon,
  IconImg,
  iconBg,
  iconColor,
}) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {(Icon || IconImg) && (
      <View style={[styles.iconBubble, { backgroundColor: iconBg ?? colors.lightTints.blueLightTint[50] }]}>
        {IconImg ? (
          <Image
            source={typeof IconImg === 'string' ? { uri: IconImg } : IconImg}
            style={{ width: normalize(23), height: normalize(23) }}
            resizeMode="contain"
          />
        ) : Icon ? (
          <Icon size={normalize(23)} color={selected ? colors.blue[600] : iconColor ?? colors.blue[800]} strokeWidth={2.1} />
        ) : null}
      </View>
    )}


    {/* Label */}
    <AppText
      variant="caption"
      weight={selected ? 'medium' : 'regular'}
      style={[styles.label, selected && styles.labelSelected]}
    >
      {label}
    </AppText>

    {/* Selected check badge */}
    {selected && (
      <View style={styles.checkBadge}>
        <Check size={normalize(10)} color="#FFFFFF" strokeWidth={3} />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: "#C3C6D6",
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
    backgroundColor: '#FFFFFF',
    flex: 1,
    minHeight: normalize(88),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  chipSelected: {
    borderWidth: 1.5,
    borderColor: colors.lightAppTheme[200],
    backgroundColor: '#EBF2FF',
  },
  iconBubble: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(8),
  },
  label: {
    color: colors.typographyColor.Light,
    fontSize: normalize(11.5),
    lineHeight: normalize(16),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelSelected: {
    color: colors.typographyColor.Light,
  },
  checkBadge: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    backgroundColor: colors.lightAppTheme[700],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
