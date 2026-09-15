import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ExternalLink } from 'lucide-react-native';

export const PreviousSessionSummary: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <AppText family="primary" weight="semiBold" style={{ fontSize: normalize(10), color: colors.typographyColor.Medium, textTransform: 'uppercase' }}>
          Previous Session Summary
        </AppText>
        <TouchableOpacity style={styles.historyBtn} activeOpacity={0.7}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700], marginRight: normalize(4) }}>
            Full History
          </AppText>
          <ExternalLink size={normalize(12)} color={colors.purple[700]} />
        </TouchableOpacity>
      </View>

      {/* Key Takeaway */}
      <View style={[styles.keyTakeawayCard, { backgroundColor: colors.purple[50] }]}>
        <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.typographyColor.Dark, textTransform: 'uppercase', marginBottom: normalize(4) }}>
          Key Takeaway (Oct 12)
        </AppText>
        <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark, lineHeight: normalize(16) }}>
          Patient discussed increased anxiety regarding workplace conditions. Focus on grounding techniques was successful.
        </AppText>
      </View>

      {/* Homework Assigned */}
      <View style={styles.listItemRow}>
        <View style={[styles.iconCircle, { backgroundColor: colors.purple[50] }]}>
          <Image source={require('../assets/right.png')} style={{ width: normalize(14), height: normalize(14), tintColor: colors.purple[700] }} resizeMode="contain" />
        </View>
        <View style={styles.listTextContainer}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
            Homework Assigned
          </AppText>
          <AppText family="primary" weight="regular" style={{ fontSize: normalize(11), color: colors.typographyColor.Medium }}>
            Daily 5-minute mindfulness journal.
          </AppText>
        </View>
      </View>

      {/* Mood Baseline */}
      <View style={styles.listItemRow}>
        <View style={[styles.iconCircle, { backgroundColor: colors.purple[50] }]}>
          <Image source={require('../assets/smaile-upload.png')} style={{ width: normalize(14), height: normalize(14), tintColor: colors.purple[700] }} resizeMode="contain" />
        </View>
        <View style={styles.listTextContainer}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
            Mood Baseline
          </AppText>
          <AppText family="primary" weight="regular" style={{ fontSize: normalize(11), color: colors.typographyColor.Medium }}>
            Consistent but slightly elevated stress levels (7/10).
          </AppText>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(16),
    padding: normalize(16),
    marginHorizontal: normalize(20),
    marginBottom: normalize(32),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyTakeawayCard: {
    padding: normalize(12),
    borderRadius: normalize(12),
    marginBottom: normalize(16),
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(16),
  },
  iconCircle: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  listTextContainer: {
    flex: 1,
  }
});
