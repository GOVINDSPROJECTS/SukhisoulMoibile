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
import { Star } from 'lucide-react-native';

interface OverallProgressProps {
  progressPercent?: number; // 0-100
  streakDays?: number;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  progressPercent = 78,
  streakDays = 52,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: progressPercent / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Pulse the star icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={require("../assets/progress-circle-img.png")} style={styles.iconWrapper} />
        <View style={styles.headerTextCol}>
          <AppText
            variant="body"
            weight="extraBold"
            family="primary"
            color={"#1E293B"}
          >
            Overall Progress
          </AppText>
          <AppText
            variant="caption"
            weight="regular"
            family='secondary'
            color={"#64748B"}
          >
            Keep it up, you're almost there!
          </AppText>
        </View>
        <View style={styles.streakBadge}>
          <AppText
            variant="caption"
            weight="regular"
            family='secondary'
            color={"#64748B"}
          >
            Active Streak
          </AppText>
          <View style={styles.streakRow}>
            <AppText style={styles.fire}>🔥</AppText>
            <AppText
              variant="body"
              weight="extraBold"
              color={"#1E293B"}
            >
              {streakDays} Days
            </AppText>
          </View>
        </View>
      </View>

      {/* Progress Track */}
      <View style={styles.trackWrapper}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <Animated.View
          style={[
            styles.thumb,
            {
              left: `${progressPercent}%`,
              transform: [
                { translateX: -normalize(18) },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <View style={styles.thumbInner}>
            <Star fill={"#FB923C"} color={"#FB923C"} size={normalize(12)} />
          </View>
        </Animated.View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(32),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
    borderBottomEndRadius: normalize(24),
    borderBottomLeftRadius: normalize(24),

  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
    gap: normalize(10),
  },
  iconWrapper: {
    width: normalize(40),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  streakBadge: {
    alignItems: 'flex-end',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  fire: {
    fontSize: normalize(13),
  },
  trackWrapper: {
    position: 'relative',
  },
  progressTrack: {
    height: normalize(12),
    backgroundColor: '#F3F4F6',
    borderRadius: normalize(6),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: "#1E5AF0",
    borderRadius: normalize(6),
  },
  thumb: {
    position: 'absolute',
    top: '50%',
    marginTop: -normalize(12),
  },
  thumbInner: {
    borderWidth: 4,
    borderColor: "#1E5AF0",
    borderRadius: normalize(50),
    padding: normalize(2),
    backgroundColor: "#ffffff"
  },
});
