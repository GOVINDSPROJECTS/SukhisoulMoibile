import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import Svg, { Circle } from 'react-native-svg';

export const HealthProgressCard: React.FC = () => {
  const ringSize = normalize(76);
  const ringStrokeWidth = normalize(7);
  const ringRadius = (ringSize - ringStrokeWidth) / 2;
  const ringCenter = ringSize / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const progressPercent = 0.85; // 85%

  const handleViewInsights = () => {
    Alert.alert(
      'Weekly Wellness Insights 📊',
      '• Meditation: 4 sessions completed (Goal: 5)\n• Daily Hydration: 85% on track\n• Focus Score: +18% increase from last week\n\nYou are among the top 15% active mindfulness practitioners this week!',
      [{ text: 'Got it!' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Left Text & Action */}
        <View style={styles.leftColumn}>
          <AppText style={styles.title} weight="bold">
            Your Progress
          </AppText>
          <AppText style={styles.subtitle} weight="regular">
            You've completed 85% of your weekly goals! Keep pushing.
          </AppText>

          <TouchableOpacity
            style={styles.insightsButton}
            activeOpacity={0.85}
            onPress={handleViewInsights}
          >
            <AppText style={styles.insightsButtonText} weight="semiBold">
              View Insights
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Right Circular Progress Ring */}
        <View style={styles.rightColumn}>
          <View style={styles.ringWrapper}>
            <Svg width={ringSize} height={ringSize}>
              {/* Background Track */}
              <Circle
                cx={ringCenter}
                cy={ringCenter}
                r={ringRadius}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth={ringStrokeWidth}
                fill="none"
              />
              {/* Progress Arc */}
              <Circle
                cx={ringCenter}
                cy={ringCenter}
                r={ringRadius}
                stroke="#5EEAD4"
                strokeWidth={ringStrokeWidth}
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringCircumference * (1 - progressPercent)}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 ${ringCenter} ${ringCenter})`}
              />
            </Svg>

            {/* Centered Percentage */}
            <View style={styles.ringCenter}>
              <AppText style={styles.percentText} weight="bold">
                85%
              </AppText>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardOverlay}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: normalize(20),
    marginTop: normalize(20),
    position: 'relative',
    zIndex: normalize(1),
    left: normalize(0),
    right: normalize(0)
  },
  card: {
    backgroundColor: '#6C7E77',
    borderRadius: normalize(24),
    padding: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(108, 126, 119, 0.25)',
    marginHorizontal: normalize(20),
  },
  leftColumn: {
    flex: 1,
    paddingRight: normalize(14),
  },
  title: {
    fontSize: normalize(18),
    color: '#FFFFFF',
    marginBottom: normalize(4),
  },
  subtitle: {
    fontSize: normalize(11),
    color: '#D4E2DC',
    lineHeight: normalize(16),
    marginBottom: normalize(14),
  },
  insightsButton: {
    backgroundColor: '#66D5B4',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(99),
    alignSelf: 'flex-start',
  },
  insightsButtonText: {
    fontSize: normalize(11),
    color: '#164E3E',
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrapper: {
    width: normalize(76),
    height: normalize(76),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: normalize(16),
    color: '#FFFFFF',
  },
  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.60)',
    zIndex: normalize(10),
  },
});
