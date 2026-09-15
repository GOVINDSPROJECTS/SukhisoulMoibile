import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Gift, WandSparkles, CheckCircle2 } from 'lucide-react-native';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel: string;
  bgColor: string;
  delay?: number;
  isImage: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  sublabel,
  bgColor,
  delay = 0,
  isImage = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statCard,
        { backgroundColor: bgColor },
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.iconWrapper}>
        {icon}
      </View>
      {isImage === true ? (
        <Image style={styles.imageIcon} source={require("../assets/goal-icon.png")} />
      ) : null}
      <AppText
        variant="caption"
        weight="regular"
        color={"#64748B"}
        style={[styles.statLabel, { flexShrink: 1 }]}
        numberOfLines={1}
      >
        {label}
      </AppText>
      <AppText
        variant="h3"
        weight="extraBold"
        family="secondary"
        color={"#1E293B"}
        style={styles.statValue}
      >
        {value}
      </AppText>
      <AppText
        variant="caption"
        weight="regular"
        color={"#64748B"}
        style={[styles.statLabel, { flexShrink: 1, marginTop: normalize(-2) }]}
      >
        {sublabel}
      </AppText>
    </Animated.View>
  );
};

interface WeeklyStatsProps {
  todayEarnings?: number;
  pointsCanEarn?: number;
  goalsMetPercentage?: number;
}

export const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  todayEarnings = 30,
  pointsCanEarn = 500,
  goalsMetPercentage = 75,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Today's Earning */}
        <StatCard
          icon={<WandSparkles size={normalize(22)} color="#6366F1" />}
          value={String(todayEarnings)}
          label="Today's Earning"
          sublabel="Points"
          bgColor="#EFF6FF"
          delay={0}
          isImage={false}
        />

        {/* Points Can Earn */}
        <StatCard
          icon={<Gift size={normalize(22)} color="#F97316" />}
          value={String(pointsCanEarn)}
          label="Points Can Earn"
          sublabel="This Week"
          bgColor="#FFF7ED"
          delay={100}
          isImage={false}
        />

        {/* Goals Met */}
        <StatCard
          icon={<CheckCircle2 size={normalize(22)} color={colors.green['500']} />}
          value={`${goalsMetPercentage}%`}
          label="Goals Met"
          sublabel="This Week"
          bgColor="#F0FDF4"
          delay={200}
          isImage={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(24),
  },
  row: {
    flexDirection: 'row',
    gap: normalize(10),
  },
  statCard: {
    flex: 1,
    borderRadius: normalize(16),
    padding: normalize(15),
    gap: normalize(4),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
  },
  iconWrapper: {
    backgroundColor: "#ffffff",
    width: normalize(32),
    height: normalize(32),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(8),
  },
  imageIcon: {
    position: 'absolute',
    right: 0,
    width: '55%',
    height: '55%',
    resizeMode: "contain",
    top: "30%",
  },
  statLabel: {
    fontSize: normalize(9.5),
    marginTop: normalize(6),
  },
  statValue: {
    fontSize: normalize(22),
    lineHeight: normalize(26),
  },
});
