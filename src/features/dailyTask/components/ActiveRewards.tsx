import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Sparkles, Plus, ChevronRight, Calendar, Clock } from 'lucide-react-native';

interface ActiveRewardItem {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  daysLeft: number;
  activatedDate: string;
  daysRemaining: number;
  usedCount: number;
  totalCount: number;
  accentColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const ACTIVE_REWARDS: ActiveRewardItem[] = [
  {
    id: '1',
    title: 'Manifestation\nCreation',
    description: 'Create personalized manifestations with AI guidance and affirmations',
    validUntil: '03 Jul 2026',
    daysLeft: 31,
    activatedDate: '03 Jun 2026',
    daysRemaining: 17,
    usedCount: 3,
    totalCount: 5,
    accentColor: colors.lightTints.purpleLightTint[300],
    iconBg: '#FAF5FF',
    icon: <Sparkles size={normalize(19)} color="#C084FC" />,
  },
  {
    id: '2',
    title: 'Diet Plan Creation',
    description: 'Premium feature where you get to create a customized meal plan!',
    validUntil: '03 Jul 2026',
    daysLeft: 31,
    activatedDate: '03 Jun 2026',
    daysRemaining: 17,
    usedCount: 3,
    totalCount: 5,
    accentColor: '#16A34A',
    iconBg: '#ECFDF5',
    icon: <Plus size={normalize(22)} color="#16A34A" />,
  },
];

const RewardCard: React.FC<{ item: ActiveRewardItem; onContinue?: () => void }> = ({
  item,
  onContinue,
}) => {
  const progressPct = item.usedCount / item.totalCount;

  return (
    <View style={styles.rewardCard}>
      {/* Top row: icon + title + validity + arrow */}
      <View style={styles.cardTopRow}>
        <View style={[styles.rewardIcon, { backgroundColor: item.iconBg }]}>
          {item.icon}
        </View>

        <View style={styles.cardTitleCol}>
          <AppText
            variant="body"
            weight="extraBold"
            family="primary"
            color={"#1E293B"}
            style={styles.rewardTitle}
          >
            {item.title}
          </AppText>
          <AppText
            variant="caption"
            family='secondary'
            weight="light"
            color={"#94A3B8"}
            style={styles.rewardDesc}
          >
            {item.description}
          </AppText>
        </View>

        <View style={styles.validityCol}>
          <AppText
            variant="caption"
            weight="regular"
            color={"#64748B"}
            style={styles.validLabel}
          >
            Valid until
          </AppText>
          <AppText
            variant="caption"
            weight="bold"
            color={item.accentColor}
            style={styles.validDate}
          >
            {item.validUntil}
          </AppText>
          <AppText
            variant="caption"
            weight="semiBold"
            color={"#22C55E"}
            style={styles.daysLeft}
          >
            {item.daysLeft} days left
          </AppText>
        </View>

        <TouchableOpacity style={styles.arrowBtn} activeOpacity={0.8}>
          <ChevronRight size={normalize(16)} color={"#94A3B8"} />
        </TouchableOpacity>
      </View>

      {/* Meta row: Activated date + days remaining */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Calendar size={normalize(11)} color={colors.typographyColor.Medium} />
          <AppText
            variant="caption"
            weight="light"
            family='primary'
            color={"#64748B"}
            style={styles.metaText}
          >
            Activated: {item.activatedDate}
          </AppText>
        </View>
        <View style={styles.metaItem}>
          <Clock size={normalize(11)} color={colors.typographyColor.Medium} />
          <AppText
            variant="caption"
            weight="light"
            family='primary'
            color={"#64748B"}
            style={styles.metaText}
          >
            {item.daysRemaining} days remaining
          </AppText>
        </View>
      </View>

      {/* Progress row */}
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPct * 100}%` as any,
                backgroundColor: item.accentColor,
              },
            ]}
          />
        </View>
        {/* Used count */}
        <AppText
          variant="caption"
          weight="regular"
          color={colors.typographyColor.Medium}
          style={styles.usedText}
        >
          {item.usedCount} / {item.totalCount} used
        </AppText>
        <TouchableOpacity
          style={[styles.continueBtn, { borderColor: item.accentColor }]}
          activeOpacity={0.85}
          onPress={onContinue}
        >
          <AppText
            variant="caption"
            weight="bold"
            color={item.accentColor}
            style={styles.continueBtnText}
          >
            Continue
          </AppText>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export const ActiveRewards: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppText
        variant="h4"
        weight="extraBold"
        family="primary"
        color={"#1E293B"}
        style={styles.sectionTitle}
      >
        Rewards Unlocked
      </AppText>

      {ACTIVE_REWARDS.map(item => (
        <RewardCard key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(20),
  },
  sectionTitle: {
    marginBottom: normalize(14),
  },

  // Card
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(17),
    marginBottom: normalize(14),
    borderWidth: normalize(1),
    borderColor: colors.lightTints.blueLightTint[100]
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(20),
  },
  rewardIcon: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  cardTitleCol: {
    flex: 1,
    marginRight: normalize(8),
  },
  rewardTitle: {
    fontSize: normalize(13),
    lineHeight: normalize(20),
    marginBottom: normalize(4),
  },
  rewardDesc: {
    fontSize: normalize(11),
    lineHeight: normalize(16),
  },
  validityCol: {
    alignItems: 'flex-end',
    marginRight: normalize(4),
  },
  validLabel: {
    fontSize: normalize(10),
    marginBottom: normalize(1),
  },
  validDate: {
    fontSize: normalize(12),
  },
  daysLeft: {
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
  arrowBtn: {
    padding: normalize(4),
    marginTop: normalize(4),
  },

  // Meta
  metaRow: {
    flexDirection: 'row',
    gap: normalize(16),
    marginBottom: normalize(15),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  metaText: {
    fontSize: normalize(11),
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(4),
  },
  progressTrack: {
    flex: 1,
    height: normalize(8),
    backgroundColor: '#E5E7EB',
    borderRadius: normalize(4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: normalize(4),
  },
  continueBtn: {
    borderWidth: 1.5,
    borderRadius: normalize(20),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(4),
  },
  continueBtnText: {
    fontSize: normalize(11.5),
  },
  usedText: {
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
});
