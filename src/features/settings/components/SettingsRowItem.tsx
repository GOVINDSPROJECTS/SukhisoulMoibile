import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface SettingsBadgeConfig {
  type: 'new' | 'active' | 'custom';
  text?: string;
}

export interface SettingsRowItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: SettingsBadgeConfig;
  onPress: () => void;
  showDivider?: boolean;
}

export const SettingsRowItem: React.FC<SettingsRowItemProps> = ({
  icon,
  title,
  subtitle,
  badge,
  onPress,
  showDivider = false,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {/* Left circular icon container */}
        <View style={styles.iconCircle}>
          {icon}
        </View>

        {/* Text column */}
        <View style={styles.textColumn}>
          <AppText
            weight="semiBold"
            family="secondary"
            style={styles.titleText}
            color={colors.typographyColor.Medium || '#000'}
          >
            {title}
          </AppText>
          <AppText
            weight="regular"
            family="secondary"
            style={styles.subtitleText}
            color={colors.typographyColor.Light || '#757C7A'}
            numberOfLines={2}
          >
            {subtitle}
          </AppText>
        </View>

        {/* Right badge & chevron */}
        <View style={styles.rightContainer}>
          {badge?.type === 'new' && (
            <View style={styles.newBadgeRow}>
              <View style={styles.redDot} />
              <AppText
                weight="medium"
                family="secondary"
                style={styles.newBadgeText}
                color={colors.typographyColor.Light || '#59615F'}
              >
                {badge.text || 'New'}
              </AppText>
            </View>
          )}

          {badge?.type === 'active' && (
            <View style={styles.activePill}>
              <AppText
                weight="semiBold"
                family="secondary"
                style={styles.activePillText}
                color={colors.green[500] || '#10B981'}
              >
                {badge.text || 'Active'}
              </AppText>
            </View>
          )}

          <ChevronRight
            size={normalize(17)}
            color={colors.tintsGrey[200] || '#9CA3AF'}
            strokeWidth={1.8}
          />
        </View>
      </TouchableOpacity>

      {showDivider && <View style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(14),
    gap: normalize(12),
  },
  iconCircle: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    gap: normalize(2),
  },
  titleText: {
    fontSize: normalize(12.5),
  },
  subtitleText: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  newBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  redDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(99),
    backgroundColor: colors.colorPalet['Color 6'],
  },
  newBadgeText: {
    fontSize: normalize(11.5),
  },
  activePill: {
    backgroundColor: colors.green[50],
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: colors.green[50],
  },
  activePillText: {
    fontSize: normalize(11),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: normalize(70),
    marginRight: normalize(14),
  },
});
