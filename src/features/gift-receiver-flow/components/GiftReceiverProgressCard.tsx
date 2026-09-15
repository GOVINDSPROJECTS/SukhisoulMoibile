import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface ProfileItem {
  label: string;
  completed: boolean;
}

interface GiftReceiverProgressCardProps {
  progressPercent: number;
  items: ProfileItem[];
}

export const GiftReceiverProgressCard: React.FC<GiftReceiverProgressCardProps> = ({
  progressPercent,
  items,
}) => {
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText family="secondary" weight="bold" style={styles.headerTitle}>
          Profile Progress
        </AppText>
        <AppText family="secondary" weight="bold" style={styles.percentText}>
          {progressPercent}%
        </AppText>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* Items */}
      {items.map((item, index) => (
        <View
          key={index}
          style={[styles.itemRow, index < items.length - 1 && styles.itemBorder]}
        >
          {item.completed ? (
            <CheckCircle2
              size={normalize(22)}
              color="#FFFFFF"
              fill={colors.colorPalet['Color 4']}
            />
          ) : (
            <View style={styles.incompleteCircle}>
              <Circle size={normalize(20)} strokeWidth={2} color={colors.colorPalet['Color 4']} />
            </View>
          )}
          <AppText
            family="secondary"
            weight={item.completed ? 'medium' : 'semiBold'}
            style={[
              styles.itemLabel,
              !item.completed && styles.itemLabelActive,
            ]}
          >
            {item.label}
          </AppText>
          <AppText
            family="secondary"
            weight="semiBold"
            style={[
              styles.editText,
              !item.completed && styles.editTextActive,
            ]}
          >
            Edit
          </AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(18),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.04)',
    marginBottom: normalize(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  headerTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  percentText: {
    color: colors.colorPalet['Color 4'],
    fontSize: normalize(14),
  },
  progressTrack: {
    height: normalize(10),
    backgroundColor: colors.lightAppTheme[50],
    borderRadius: normalize(99),
    marginBottom: normalize(16),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.colorPalet['Color 4'],
    borderRadius: normalize(99),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  incompleteCircle: {
    width: normalize(22),
    height: normalize(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    flex: 1,
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
    marginLeft: normalize(10),
  },
  itemLabelActive: {
    color: colors.colorPalet['Color 4'],
  },
  editText: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
  },
  editTextActive: {
    color: colors.colorPalet['Color 4'],
  },
});
