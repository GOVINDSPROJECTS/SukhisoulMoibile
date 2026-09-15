import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Check, Gift } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SevenDayItem } from '../api/dailyTaskService';

const DEFAULT_DAYS: SevenDayItem[] = [
  { label: 'Today', completed: true, isToday: true },
  { label: '2 Day', completed: false, isToday: false },
  { label: '3 Day', completed: false, isToday: false },
  { label: '4 Day', completed: false, isToday: false },
  { label: '5 Day', completed: false, isToday: false },
  { label: '6 Day', completed: false, isToday: false },
  { label: '7 Day', completed: false, isToday: false },
  { label: '', completed: false, isToday: false },
];

const DayCircle: React.FC<{ item: SevenDayItem; isBonus?: boolean }> = ({
  item,
  isBonus,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (item.isToday) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 6,
      }).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [item.isToday]);

  if (isBonus) {
    return (
      <View style={styles.dayColumn}>
        <View style={styles.bonusCircle}>
          <Gift size={normalize(20)} color={colors.typographyColor['Dark 2']} />
          <AppText
            variant="caption"
            weight="bold"
            color={colors.typographyColor['Dark 2']}
            style={styles.bonusPts}
          >
            Bonus{'\n'}100{'\n'}pts
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.dayColumn}>
      <Animated.View
        style={[
          styles.dayCircle,
          item.completed && styles.dayCircleCompleted,
          item.isToday && { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {item.completed ? (
          <View>
            <Check size={normalize(15)} color={"#ffffff"} strokeWidth={normalize(4)} />
          </View>
        ) : null}
      </Animated.View>
      <AppText
        variant="caption"
        weight="medium"
        color={colors.typographyColor.Medium}
        style={styles.dayLabel}
      >
        {item.label}
      </AppText>
    </View>
  );
};

interface SevenDayProgressProps {
  days?: SevenDayItem[];
  onViewRewards?: () => void;
}

export const SevenDayProgress: React.FC<SevenDayProgressProps> = ({
  days = DEFAULT_DAYS,
  onViewRewards,
}) => {
  const displayDays = days.length >= 8 ? days : DEFAULT_DAYS;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.headerRow}>
        <AppText
          variant="h4"
          weight="extraBold"
          family="primary"
          color={"#27272A"}
          style={{ fontSize: normalize(15) }}
        >
          7 Day Progress
        </AppText>
        <View style={styles.bonusBadge}>
          <AppText
            variant="caption"
            weight="semiBold"
            family="secondary"
            color={colors.typographyColor['Dark 2']}
            style={{ fontSize: normalize(11.5) }}
          >
            Bonus on Day 7
          </AppText>
          <Gift size={normalize(13)} color={colors.typographyColor['Dark 2']} />
        </View>
      </View>

      {/* Day circles */}
      <View style={styles.daysRow}>
        {displayDays.slice(0, 7).map((day, index) => (
          <DayCircle key={index} item={day} />
        ))}
        <DayCircle item={displayDays[7] || { label: '', completed: false, isToday: false }} isBonus />
      </View>

      {/* Reward Banner */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[100],
          colors.typographyColor.White,
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.rewardBanner}
      >
        <View style={styles.rewardLeft}>
          <Gift size={normalize(20)} color={colors.appThemeColor['600']} />
          <AppText
            variant="body"
            weight="extraBold"
            color={colors.typographyColor.Dark}
            style={styles.rewardText}
          >
            Complete 7 Days &amp;{'\n'}Unlock Bonus Rewards!
          </AppText>
        </View>
        <TouchableOpacity
          style={styles.viewRewardsBtn}
          activeOpacity={0.85}
          onPress={onViewRewards}
        >
          <AppText
            variant="caption"
            weight="bold"
            color="#FFFFFF"
            style={styles.viewRewardsText}
          >
            View Rewards →
          </AppText>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(24),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  bonusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(20),
  },
  dayColumn: {
    alignItems: 'center',
    gap: normalize(6),
  },
  dayCircle: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(19),
    borderWidth: 2,
    borderColor: colors.lightAppTheme['300'],
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: colors.lightAppTheme['700'],
    borderColor: colors.lightAppTheme['700'],
  },
  dayLabel: {
    fontSize: normalize(10),
    textAlign: 'center',
    marginTop: normalize(4),
  },
  bonusCircle: {
    width: normalize(54),
    height: normalize(80),
    borderRadius: normalize(12),
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderWidth: 2,
    borderColor: colors.lightTints.blueLightTint[200],
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(4),
    marginTop: normalize(-8),
  },
  bonusPts: {
    fontSize: normalize(9),
    textAlign: 'center',
    lineHeight: normalize(12),
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDF4FB',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: colors.lightTints.blueLightTint[100],
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(7),
    flex: 1,
  },
  rewardText: {
    fontSize: normalize(11.5),
    lineHeight: normalize(17),
    flex: 1,
  },
  viewRewardsBtn: {
    backgroundColor: colors.lightAppTheme['700'],
    borderRadius: normalize(99),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
  },
  viewRewardsText: {
    fontSize: normalize(11),
  },
});
