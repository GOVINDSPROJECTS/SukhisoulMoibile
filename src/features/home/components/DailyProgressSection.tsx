import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, DimensionValue } from 'react-native';
import { colors } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Smartphone, Droplet, Clock, BarChart2 } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { dailyTaskService, HabitDataResponse } from '../../dailyTask/api/dailyTaskService';

export const DailyProgressSection: React.FC = () => {
  const [habitData, setHabitData] = useState<HabitDataResponse | null>(null);

  useEffect(() => {
    dailyTaskService.fetchHabitData()
      .then(res => setHabitData(res))
      .catch(err => console.log('[DailyProgressSection] Failed to load habit data:', err));
  }, []);

  const progressPct = habitData?.daily_progress?.percentage ?? 72;
  const completedTasks = habitData?.daily_progress?.completed_tasks ?? 5;
  const totalTasks = habitData?.daily_progress?.total_tasks ?? 8;
  const screenTime = habitData?.daily_progress?.screen_time ?? '3h20min';
  const screenTimeTarget = habitData?.daily_progress?.screen_time_target ?? '/ 4h Target';
  const screenTimePct: DimensionValue = `${habitData?.daily_progress?.screen_time_pct ?? 83}%`;
  const waterIntake = habitData?.daily_progress?.water_intake ?? '1.2L';
  const waterTarget = habitData?.daily_progress?.water_target ?? '/ 2.5L Target';
  const waterPct: DimensionValue = `${habitData?.daily_progress?.water_pct ?? 48}%`;

  // Circular progress dimensions for completion card
  const ringSize = normalize(80);
  const ringStrokeWidth = normalize(8);
  const ringRadius = (ringSize - ringStrokeWidth) / 2;
  const ringCenter = ringSize / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringProgress = Math.min(Math.max(progressPct / 100, 0.05), 1);

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        {/* Header with Analytics Icon */}
        <View style={styles.headerRow}>
          <View style={styles.headerIconBox}>
            <BarChart2 size={normalize(18)} color={colors.lightAppTheme[700]} />
          </View>
          <AppText variant="h3" weight="bold" style={styles.title}>
            Daily Progress
          </AppText>
        </View>

        {/* Horizontal Scrollable Progress Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Card 1: Completion Ring */}
          <View style={styles.progressCard}>
            <View style={styles.ringWrapper}>
              <Svg width={ringSize} height={ringSize}>
                <Circle
                  cx={ringCenter}
                  cy={ringCenter}
                  r={ringRadius}
                  stroke={colors.tintsBlue[400]}
                  strokeWidth={ringStrokeWidth}
                  fill="none"
                />
                <Circle
                  cx={ringCenter}
                  cy={ringCenter}
                  r={ringRadius}
                  stroke={colors.blue[500]}
                  strokeWidth={ringStrokeWidth}
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringCircumference * (1 - ringProgress)}
                  strokeLinecap="round"
                  fill="none"
                  transform={`rotate(-90 ${ringCenter} ${ringCenter})`}
                />
              </Svg>
              <View style={styles.ringCenterText}>
                <AppText
                  variant="body"
                  weight="bold"
                  style={styles.ringPercentText}
                >
                  {progressPct}%
                </AppText>
              </View>
            </View>
            <AppText
              variant="caption"
              weight="semiBold"
              style={styles.ringSubtitle}
            >
              Great going!{'\n'}keep it up....
            </AppText>
          </View>

          {/* Card 2: Screen Time Horizontal Bar */}
          <LinearGradient
            colors={[colors.typographyColor.White, colors.blue[100]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.iconBox}>
              <Smartphone size={normalize(18)} color={colors.blue[500]} />
            </View>

            <View style={styles.cardBottomGroup}>
              <AppText variant="caption" weight="semiBold" style={styles.cardLabel}>
                SCREEN TIME
              </AppText>
              <AppText variant="body" weight="bold" style={styles.statMain}>
                {screenTime}{' '}
                <AppText variant="caption" style={styles.statTarget}>
                  {screenTimeTarget}
                </AppText>
              </AppText>

              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: screenTimePct }]} />
              </View>
            </View>
          </LinearGradient>

          {/* Card 3: Water Intake */}
          <LinearGradient
            colors={[colors.blue[50], colors.blue[100]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.iconBox}>
              <Droplet size={normalize(16)} color={colors.blue[600]} />
            </View>

            <View style={styles.cardBottomGroup}>
              <AppText variant="caption" weight="semiBold" style={styles.cardLabel}>
                WATER INTAKE
              </AppText>
              <AppText variant="body" weight="bold" style={styles.statMain}>
                {waterIntake}{' '}
                <AppText variant="caption" style={styles.statTarget}>
                  {waterTarget}
                </AppText>
              </AppText>

              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: waterPct }]} />
              </View>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Bottom Banner: Daily Tasks */}
        <View style={styles.dailyTasksBanner}>
          <View style={styles.clockIconBox}>
            <Clock size={normalize(20)} color={colors.lightAppTheme[700]} />
          </View>
          <View style={styles.tasksTextGroup}>
            <AppText variant="body" weight="bold" family='primary' style={styles.tasksTitle}>
              Daily Tasks
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.tasksSubtitle}>
              {completedTasks} out of {totalTasks} assignments successfully cleared
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginVertical: normalize(12),
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(28),
    padding: normalize(24),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    paddingTop: normalize(32),
    gap: normalize(17),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBox: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(8),
    backgroundColor: colors.blue[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  title: {
    fontSize: normalize(17),
    color: colors.typographyColor['Dark 2'],
  },
  scrollContainer: {
    gap: normalize(12),
    paddingBottom: normalize(4),
  },
  progressCard: {
    width: normalize(155),
    height: normalize(178),
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(22),
    padding: normalize(20),
    justifyContent: 'space-between',
  },
  ringWrapper: {
    width: normalize(80),
    height: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(4),
  },
  ringCenterText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringPercentText: {
    color: colors.appThemeColor[900],
    fontSize: normalize(12),
  },
  ringSubtitle: {
    fontSize: normalize(12),
    textAlign: 'center',
    lineHeight: normalize(16),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(4),
  },
  iconBox: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    backgroundColor: colors.blue[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderColor: colors.appThemeColor[300],
    marginHorizontal: 'auto',
    marginTop: normalize(5),
  },
  cardBottomGroup: {
    width: '100%',
  },
  cardLabel: {
    fontSize: normalize(10),
    color: "#717786",
    letterSpacing: 0.4,
    marginBottom: normalize(2),
  },
  statMain: {
    fontSize: normalize(12),
    color: '#0B1C30',
    marginBottom: normalize(8),
  },
  statTarget: {
    fontSize: normalize(11),
    color: '#717786',
    fontWeight: '400',
  },
  progressBarBg: {
    height: normalize(9),
    width: '100%',
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: normalize(1),
    borderColor: colors.blue[700],
  },
  progressBarFill: {
    height: '100%',
    borderRadius: normalize(99),
    backgroundColor: colors.lightAppTheme[950],
  },
  dailyTasksBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(20),
    padding: normalize(16),
  },
  clockIconBox: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(14),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  tasksTextGroup: {
    flex: 1,
  },
  tasksTitle: {
    fontSize: normalize(14.5),
    color: colors.typographyColor.Dark,
    marginBottom: normalize(2),
  },
  tasksSubtitle: {
    fontSize: normalize(11),
    color: '#8E8E8E',
    lineHeight: normalize(15),
  },
});
