import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpiringPointsBanner } from './ExpiringPointsBanner';
import { PointsStatsSummary } from './PointsStatsSummary';
import { PointsHistorySection } from './PointsHistorySection';

interface EarnedPointsContentProps {
  onOpenRewards?: () => void;
}

export const EarnedPointsContent: React.FC<EarnedPointsContentProps> = ({
  onOpenRewards,
}) => {
  return (
    <View style={styles.container}>
      {/* Section 1: Expiring points alert card */}
      <ExpiringPointsBanner points={120} validTill="13th June 2026" />

      {/* Section 2: Total Accumulated / Spent / Rewards Unlocked */}
      <PointsStatsSummary onRewardsPress={onOpenRewards} />

      {/* Section 3: History / Payments inner tabs + lists */}
      <PointsHistorySection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
});
