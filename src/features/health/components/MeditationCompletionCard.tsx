import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Bell, Sparkles } from 'lucide-react-native';

interface MeditationCompletionCardProps {
  completedPercent?: number;
}

export const MeditationCompletionCard: React.FC<MeditationCompletionCardProps> = ({
  completedPercent = 35,
}) => {
  const handlePress = () => {
    Alert.alert(
      'Daily Meditation Streak 🔥',
      `You have completed ${completedPercent}% of your mindfulness goal for today. 10 more minutes to unlock today's Peaceful Mind badge!`,
      [{ text: 'Keep It Up!' }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={handlePress}
      >
        {/* Top Content Row */}
        <View style={styles.topRow}>
          {/* Bell Icon in Circle */}
          <View style={styles.iconCircle}>
            <Bell size={normalize(18)} color="#2563EB" fill="#3B82F6" />
          </View>

          {/* Motivational Text */}
          <View style={styles.textColumn}>
            <AppText style={styles.title} weight="bold">
              Keep going!
            </AppText>
            <AppText style={styles.subtitle} weight="regular">
              You're building a calmer, healthier mind.
            </AppText>
          </View>

          {/* Completed Metric */}
          <View style={styles.percentContainer}>
            <AppText style={styles.percentText} weight="bold">
              {completedPercent}%
            </AppText>
            <AppText style={styles.completedLabel} weight="bold">
              COMPLETED
            </AppText>
          </View>
        </View>

        {/* Horizontal Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(100, Math.max(5, completedPercent))}%` },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(16),
    marginBottom: normalize(24),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(18),
    borderWidth: 1,
    borderColor: '#EDF2F7',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  iconCircle: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(21),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  textColumn: {
    flex: 1,
    paddingRight: normalize(8),
  },
  title: {
    fontSize: normalize(15),
    color: '#1A2B4B',
    marginBottom: normalize(2),
  },
  subtitle: {
    fontSize: normalize(10.5),
    color: '#64748B',
    lineHeight: normalize(15),
  },
  percentContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: normalize(20),
    color: '#4A90E2',
    lineHeight: normalize(24),
  },
  completedLabel: {
    fontSize: normalize(8.5),
    color: '#64748B',
    letterSpacing: 0.5,
  },
  progressBarBackground: {
    width: '100%',
    height: normalize(5),
    backgroundColor: 'rgba(203,219,245,0.3)',
    borderRadius: normalize(99),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: normalize(99),
  },
});
