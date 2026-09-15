import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface SelectedClientHeaderProps {
  name: string;
  since: string;
  primaryGoal: string;
  lastSession: string;
  recommendedSlot: string;
  imageUrl: string;
}

export const SelectedClientHeader: React.FC<SelectedClientHeaderProps> = ({
  name,
  since,
  primaryGoal,
  lastSession,
  recommendedSlot,
  imageUrl
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Profile Row */}
      <View style={styles.profileRow}>
        <Image source={{ uri: imageUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(16), color: colors.typographyColor.Black }} numberOfLines={2}>
              {name}
            </AppText>
          </View>
          <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.typographyColor.Medium }}>
            Active Patient since {since}
          </AppText>
        </View>
        <View style={[styles.badge, { backgroundColor: colors.green[50] }]}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(8), color: colors.green[700], letterSpacing: 0.5 }}>
            ACTIVE
          </AppText>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <AppText family="secondary" weight="semiBold" style={{ fontSize: normalize(9), color: colors.typographyColor.Medium, textTransform: 'uppercase', marginBottom: normalize(-4) }}>
            Primary Goal
          </AppText>
          <AppText family="secondary" weight="bold" style={{ fontSize: normalize(13), color: colors.purple[900] }}>
            {primaryGoal}
          </AppText>
        </View>

        <View style={styles.statBox}>
          <AppText family="secondary" weight="semiBold" style={{ fontSize: normalize(9), color: colors.typographyColor.Medium, textTransform: 'uppercase', marginBottom: normalize(-4) }}>
            Last Session
          </AppText>
          <AppText family="secondary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Black }}>
            {lastSession}
          </AppText>
        </View>
      </View>

      {/* Recommended Slot */}
      <View style={[styles.slotBanner, { backgroundColor: colors.yellow[50] }]}>
        <Image source={require('../assets/calender.png')} style={{ width: normalize(25), height: normalize(25), tintColor: colors.yellow[800], marginRight: normalize(8) }} resizeMode="contain" />
        <View>
          <AppText family="secondary" weight="semiBold" style={{ fontSize: normalize(12), color: colors.yellow[800] }}>
            Recommended Slot
          </AppText>
          <AppText family="secondary" weight="light" style={{ fontSize: normalize(12), color: colors.yellow[900] }}>
            {recommendedSlot}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    marginHorizontal: normalize(20),
    marginTop: normalize(16),
    borderWidth: normalize(1),
    borderColor: colors.purple[50]
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    marginRight: normalize(12),
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(-3),
  },
  badge: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(99),
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  statBox: {
    flex: 1,
  },
  slotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
    borderRadius: normalize(10),
    borderWidth: normalize(1),
    borderColor: colors.yellow[300]
  }
});
