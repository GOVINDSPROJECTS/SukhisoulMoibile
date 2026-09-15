import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ShieldCheck, Lock, Clock } from 'lucide-react-native';

interface TrustBadgeItem {
  id: string;
  titleLine1: string;
  titleLine2: string;
  icon: React.ReactNode;
}

export const TrustBadgesRow: React.FC = () => {
  const badges: TrustBadgeItem[] = [
    {
      id: 'verified',
      titleLine1: 'Verified',
      titleLine2: 'Experts',
      icon: <ShieldCheck size={normalize(18)} color={colors.blue[400]} strokeWidth={2} />,
    },
    {
      id: 'private',
      titleLine1: '100%',
      titleLine2: 'Private',
      icon: <Lock size={normalize(16)} color={colors.blue[400]} strokeWidth={2} />,
    },
    {
      id: 'flexible',
      titleLine1: 'Flexible',
      titleLine2: 'Sessions',
      icon: <Clock size={normalize(17)} color={colors.blue[400]} strokeWidth={2} />,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeCard}>
            <View style={styles.iconCircle}>
              {badge.icon}
            </View>
            <View style={styles.textWrapper}>
              <AppText variant="caption" weight="medium" family='secondary' style={styles.badgeText}>
                {badge.titleLine1}
              </AppText>
              <AppText variant="caption" weight="medium" family='secondary' style={styles.badgeText}>
                {badge.titleLine2}
              </AppText>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ backgroundColor: colors.lightTints.blueLightTint[50], height: 25, marginTop: normalize(15) }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(14),
    marginBottom: normalize(12),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    gap: normalize(10),
  },
  badgeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.appThemeColor[100],
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.tintsBlue[900],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(8),
    boxShadow: '0px 0.75px 1.5px rgba(0, 0, 0, 0.05)'
  },
  textWrapper: {
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: normalize(11),
    marginLeft: normalize(7),
    lineHeight: normalize(14),
    color: colors.tintsGrey[600],
  },
});

