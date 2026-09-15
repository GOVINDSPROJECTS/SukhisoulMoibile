import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { User, ChevronRight, Star, UserRound } from 'lucide-react-native';

interface RedeemableReward {
  id: string;
  title: string;
  description: string;
  points: number;
  recommended: boolean;
}

const REDEEMABLE_REWARDS: RedeemableReward[] = [
  {
    id: '1',
    title: 'Therapy Session Access',
    description: 'Premium 1-on-1 expert guidance',
    points: 500,
    recommended: true,
  },
  {
    id: '2',
    title: 'Therapy Session Access',
    description: 'Premium 1-on-1 expert guidance',
    points: 500,
    recommended: true,
  },
];

const RewardTile: React.FC<{ item: RedeemableReward; onRedeem?: () => void }> = ({
  item,
  onRedeem,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryRow}
  >
    <View style={styles.tile}>
      {/* Recommended badge */}
      {item.recommended && (
        <View style={styles.recommendedBadge}>
          <AppText
            variant="caption"
            weight="bold"
            color="#FFFFFF"
            style={styles.recommendedText}
          >
            RECOMMENDED
          </AppText>
        </View>
      )}

      {/* Icon */}
      <View style={styles.tileIconWrapper}>
        <UserRound size={normalize(32)} color={"#ffffff"} />
      </View>

      {/* Title */}
      <AppText
        variant="body"
        weight="bold"
        family="secondary"
        color={"#0F172A"}
        center
        style={styles.tileTitle}
      >
        {item.title}
      </AppText>

      {/* Description */}
      <AppText
        variant="caption"
        weight="regular"
        color={"#64748B"}
        center
        style={styles.tileDesc}
      >
        {item.description}
      </AppText>

      {/* Points badge */}
      <View style={styles.pointsBadge}>
        <Star size={normalize(12)} color="#E84545" fill="#E84545" />
        <AppText
          variant="caption"
          weight="bold"
          family='secondary'
          color="#E84545"
          style={styles.pointsText}
        >
          {item.points} Points
        </AppText>
      </View>

      {/* Redeem Now button */}
      <TouchableOpacity
        style={styles.redeemBtn}
        activeOpacity={0.85}
        onPress={onRedeem}
      >
        <AppText
          variant="caption"
          weight="bold"
          family='secondary'
          color={colors.typographyColor['Dark 2']}
          style={styles.redeemText}
        >
          Redeem Now
        </AppText>
        <ChevronRight size={normalize(13)} strokeWidth={normalize(3)} color={"#B3DDFF"} />
      </TouchableOpacity>
    </View>
  </ScrollView>
);

export const UnlockMoreRewards: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppText
        variant="h4"
        weight="extraBold"
        family="primary"
        color={"#1E293B"}
        style={styles.sectionTitle}
      >
        Unlock More Rewards
      </AppText>

      <FlatList
        data={REDEEMABLE_REWARDS}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.itemSep} />}
        renderItem={({ item }) => <RewardTile item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(18),
    paddingLeft: normalize(16),
  },
  sectionTitle: {
    marginBottom: normalize(16),
  },
  listContent: {
    paddingRight: normalize(16),
  },
  itemSep: {
    width: normalize(12),
  },
  categoryRow: {
    flexDirection: 'row',
    gap: normalize(20),
    marginBottom: normalize(16),
    marginTop: normalize(-12),
    paddingTop: normalize(25)
  },

  // Tile
  tile: {
    width: normalize(200),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    borderWidth: 2,
    borderColor: "#B3DDFF",
    padding: normalize(20),
    paddingTop: normalize(28),
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    marginRight: normalize(10)
  },
  recommendedBadge: {
    position: 'absolute',
    top: normalize(-12),
    alignSelf: 'center',
    backgroundColor: '#EF4444',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    zIndex: 10,
    right: normalize(-10),
    borderWidth: normalize(2),
    borderColor: "#ffffff",
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)'
  },
  recommendedText: {
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  tileIconWrapper: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
    backgroundColor: '#B3DDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tileTitle: {
    fontSize: normalize(13),
    lineHeight: normalize(18),
    marginBottom: normalize(6),
  },
  tileDesc: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
    marginBottom: normalize(12),
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    gap: normalize(4),
    marginBottom: normalize(12),
    borderWidth: normalize(1),
    borderColor: "#FEE2E2"
  },
  pointsText: {
    fontSize: normalize(11),
  },
  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: "#B3DDFF",
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(9),
    gap: normalize(4),
    width: '100%',
    justifyContent: 'center',
    boxShadow: '0px 3px 0px #B3DDFF',
  },
  redeemText: {
    fontSize: normalize(12),
  },
});
