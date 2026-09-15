import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Database } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface StorageUsageCardProps {
  appSizeMb?: number;
  cacheSizeMb?: number;
}

export const StorageUsageCard: React.FC<StorageUsageCardProps> = ({
  appSizeMb = 84,
  cacheSizeMb = 40,
}) => {
  const totalMb = appSizeMb + cacheSizeMb;
  const appRatio = totalMb > 0 ? (appSizeMb / totalMb) * 100 : 100;
  const cacheRatio = totalMb > 0 ? (cacheSizeMb / totalMb) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Label */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.label}
        color={colors.typographyColor.Light}
      >
        TOTAL STORAGE USED
      </AppText>

      {/* Value & Icon Row */}
      <View style={styles.valueRow}>
        <View style={styles.numberGroup}>
          <AppText
            weight="extraBold"
            family="primary"
            style={styles.number}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            {totalMb}
          </AppText>
          <AppText
            weight="medium"
            family="secondary"
            style={styles.unit}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            MB
          </AppText>
        </View>

        <View style={styles.iconCircle}>
          <Database
            size={normalize(20)}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={2.2}
          />
        </View>
      </View>

      {/* Segmented Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.appBarSegment, { width: `${appRatio}%` }]} />
        {cacheSizeMb > 0 ? (
          <View style={[styles.cacheBarSegment, { width: `${cacheRatio}%` }]} />
        ) : null}
      </View>

      {/* Legend Row */}
      <View style={styles.legendRow}>
        {/* App Size */}
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3' }]} />
          <View style={styles.legendTextCol}>
            <AppText
              weight="regular"
              family="secondary"
              style={styles.legendLabel}
              color={colors.typographyColor.Light}
            >
              App Size
            </AppText>
            <AppText
              weight="semiBold"
              family="secondary"
              style={styles.legendValue}
              color={colors.typographyColor.Medium || '#003CA3'}
            >
              {`${appSizeMb} MB`}
            </AppText>
          </View>
        </View>

        {/* Cache Data */}
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.lightTints.redLightTint[200] }]} />
          <View style={styles.legendTextCol}>
            <AppText
              weight="regular"
              family="secondary"
              style={styles.legendLabel}
              color={colors.typographyColor.Light}
            >
              Cache Data
            </AppText>
            <AppText
              weight="semiBold"
              family="secondary"
              style={styles.legendValue}
              color={colors.typographyColor.Medium || '#003CA3'}
            >
              {`${cacheSizeMb} MB`}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
    paddingHorizontal: normalize(2),
  },
  label: {
    fontSize: normalize(11),
    letterSpacing: 0.6,
    marginBottom: normalize(0),
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  numberGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: normalize(5),
  },
  number: {
    fontSize: normalize(36),
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: normalize(15),
  },
  iconCircle: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    height: normalize(8),
    borderRadius: normalize(99),
    backgroundColor: '#E2E8F0',
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: normalize(16),
  },
  appBarSegment: {
    height: '100%',
    backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
  },
  cacheBarSegment: {
    height: '100%',
    backgroundColor: colors.lightTints.redLightTint[200],
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(40),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(8),
  },
  legendDot: {
    width: normalize(7),
    height: normalize(7),
    borderRadius: normalize(3.5),
    marginTop: normalize(5),
  },
  legendTextCol: {
    gap: normalize(2),
  },
  legendLabel: {
    fontSize: normalize(11.5),
  },
  legendValue: {
    fontSize: normalize(14),
  },
});
