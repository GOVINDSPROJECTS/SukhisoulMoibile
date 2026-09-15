import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Check, LucideIcon } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface RadioCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  /** Optional lucide icon component shown in a colored bubble on the left */
  Icon?: string;
  /** Background color for the icon bubble */
  iconBg?: string;
  /** Icon stroke color */
  iconColor?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  title,
  subtitle,
  selected,
  onPress,
  Icon,
  iconBg,
  iconColor,
}) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {/* Left icon bubble */}
    {Icon && (
      <View style={[styles.iconBubble, { backgroundColor: iconBg ?? colors.lightTints.blueLightTint[50] }]}>
        <Image
          source={typeof Icon === 'string' ? { uri: Icon } : Icon}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    )}

    {/* Text */}
    <View style={styles.content}>
      <AppText
        variant="body"
        weight={selected ? 'semiBold' : 'medium'}
        family='secondary'
        style={[styles.title, selected && styles.titleSelected]}
      >
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="caption" weight="regular" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>

    {/* Radio circle */}
    {/* <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View> */}
    {selected && (
      <View style={styles.checkBadge}>
        <Check size={normalize(15)} color="#FFFFFF" strokeWidth={3} />
      </View>
    )}

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    borderWidth: 1,
    borderColor: "#C3C6D6",
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(14),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(10),
  },
  cardSelected: {
    borderColor: 'transparent',
    backgroundColor: colors.lightTints.blueLightTint[50],
    boxShadow: '0px 0px 0px 2px ' + colors.lightAppTheme[300],
  },
  iconBubble: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    width: normalize(25),
    height: normalize(22),
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    gap: normalize(3),
  },
  title: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(13),
  },
  titleSelected: {
    color: '#1A3A7C',
  },
  subtitle: {
    color: colors.typographyColor.Light,
    fontSize: normalize(11.2),
    lineHeight: normalize(16),
  },
  radio: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 2,
    borderColor: colors.appThemeColor[200],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioSelected: {
    borderColor: colors.lightAppTheme[700],
  },
  radioDot: {
    width: normalize(11),
    height: normalize(11),
    borderRadius: normalize(6),
    backgroundColor: colors.lightAppTheme[700],
  },
  checkBadge: {
    position: 'absolute',
    top: normalize(8),
    right: normalize(8),
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(99),
    backgroundColor: "#0040A1",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
