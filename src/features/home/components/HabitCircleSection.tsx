import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { MoreVertical, ChevronRight, Briefcase, Moon, Utensils, Pencil, GlassWater } from 'lucide-react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { dailyTaskService, HabitDataResponse } from '../../dailyTask/api/dailyTaskService';

// Custom Meditation Icon SVG to match high-fidelity design exactly
const MeditationIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx="12" cy="5" r="2.2" />
    <Path d="M12 8.5c-1.8 0-3.3 1.5-3.3 3.3v2.8h6.6v-2.8c0-1.8-1.5-3.3-3.3-3.3z" />
    <Path d="M20.5 16.5c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm-17 0c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm12.5-3.6c-.3-.3-.8-.6-1.3-.6h-5.4c-.5 0-1 .3-1.3.6L4.5 17.2V19c0 .6.4 1 1 1h13c.6 0 1-.4 1-1v-1.8l-2.7-4.3z" />
  </Svg>
);

export const HabitCircleSection: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const [habitData, setHabitData] = useState<HabitDataResponse | null>(null);

  useEffect(() => {
    dailyTaskService.fetchHabitData()
      .then(res => setHabitData(res))
      .catch(err => console.log('[HabitCircleSection] Failed to load habit data:', err));
  }, []);

  const activeHabitKey = habitData?.current_routine?.active_habit || 'meditation';
  const routineName = habitData?.current_routine?.name || 'Meditation';
  const untilText = habitData?.current_routine?.until || 'Until 5:00 PM';
  const dateStr = habitData?.current_routine?.date_str || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const nextRoutineName = habitData?.next_routine?.name || 'Work Submission';
  const nextRoutineTime = habitData?.next_routine?.time || '10:30 AM';

  // Circle dimensions
  const size = normalize(240);
  const strokeWidth = normalize(12);
  const radius = (size - strokeWidth) / 2 - normalize(18);
  const center = size / 2;

  // Trigonometry helper to get coordinates on the circle
  const getCoordinates = (angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };

  // Position for 5 icons around the circle
  const iconPositions = [
    { id: 'drink', angle: 300, icon: <GlassWater size={normalize(18)} color="#004BBA" />, isActive: activeHabitKey === 'drink' },
    { id: 'sleep', angle: 50, icon: <Moon size={normalize(18)} color="#004BBA" />, isActive: activeHabitKey === 'sleep' },
    { id: 'meditation', angle: 90, icon: <MeditationIcon color="#004BBA" size={normalize(22)} />, isActive: activeHabitKey === 'meditation' },
    { id: 'lunch', angle: 225, icon: <Utensils size={normalize(18)} color="#004BBA" />, isActive: activeHabitKey === 'lunch' },
    { id: 'work', angle: 150, icon: <Briefcase size={normalize(18)} color="#004BBA" />, isActive: activeHabitKey === 'work' },
  ];

  const innerRadius = radius - strokeWidth / 2;
  const cardSize = innerRadius * 2 - normalize(4);

  return (
    <LinearGradient colors={['#bfdaffff', '#FFFFFF', '#bfdaffff']} style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <AppText variant="h3" weight="bold" style={[styles.title, { color: colors.appThemeColor[950], fontSize: normalize(20) }]}>
            Habit Circle
          </AppText>
          <AppText variant="caption" weight="medium" style={[styles.subtitle, { color: colors.appThemeColor[600], fontSize: normalize(13) }]}>
            Balanced energy cycle
          </AppText>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
          <MoreVertical size={22} color={colors.appThemeColor[800]} />
        </TouchableOpacity>
      </View>

      {/* Edit | View All buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
          <Pencil size={normalize(12)} color="#002966ff" style={styles.actionIcon} />
          <AppText variant="caption" weight="bold" style={[styles.actionLink, { color: '#004BBA', fontSize: normalize(12) }]}>
            Edit
          </AppText>
        </TouchableOpacity>
        <AppText style={[styles.separator, { color: '#CEDEE9', fontSize: normalize(12) }]}>|</AppText>
        <TouchableOpacity activeOpacity={0.7}>
          <AppText variant="caption" weight="bold" style={[styles.actionLink, { color: '#004BBA', fontSize: normalize(12) }]}>
            View All
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Visual Dial Circle */}
      <View style={styles.dialContainer}>
        <View style={{ width: size, height: size, position: 'relative' }}>

          {/* SVG Progress Arc */}
          <Svg width={size} height={size}>
            <Defs>
              <SvgLinearGradient id="dialGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={colors.blue[300]} />
                <Stop offset="50%" stopColor={colors.appThemeColor["200"]} />
                <Stop offset="100%" stopColor={colors.blue[300]} />
              </SvgLinearGradient>
            </Defs>

            {/* Translucent Outer "Halo" Ring */}
            <Circle
              cx={center}
              cy={center}
              r={radius + strokeWidth / 2 + normalize(7)}
              stroke="#D8E5F0"
              strokeWidth={normalize(10)}
              fill="none"
              opacity={0.4}
            />

            {/* Absolute Outer Outline Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius + strokeWidth / 2 + normalize(14)}
              stroke="#B9CDE2"
              strokeWidth={1}
              fill="none"
            />

            {/* Middle Outline Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius + strokeWidth / 2}
              stroke="#B9CDE2"
              strokeWidth={1}
              fill="none"
            />

            {/* Inner Outline Circle */}
            <Circle
              cx={center}
              cy={center}
              r={innerRadius}
              stroke="#B9CDE2"
              strokeWidth={1}
              fill="none"
            />

            {/* Blended Inner Progress Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="url(#dialGrad)"
              strokeWidth={strokeWidth}
              fill="none"
            />
          </Svg>

          {/* Central Label Card */}
          <View
            style={[
              styles.centralCard,
              {
                width: cardSize,
                height: cardSize,
                borderRadius: innerRadius,
                left: center - cardSize / 2,
                top: center - cardSize / 2,
              },
            ]}
          >
            <AppText variant="caption" weight="bold" style={styles.currentText}>
              CURRENT
            </AppText>
            <AppText variant="h3" weight="bold" style={styles.routineName} numberOfLines={2}>
              {routineName}
            </AppText>
            <AppText variant="caption" weight="bold" style={styles.dateText}>
              {dateStr}
            </AppText>
            <AppText variant="caption" weight="medium" style={styles.untilText}>
              {untilText}
            </AppText>
          </View>

          {/* Activity Badges on Perimeter */}
          {iconPositions.map((pos) => {
            const { x, y } = getCoordinates(pos.angle);
            const badgeSize = pos.isActive ? normalize(44) : normalize(36);
            return (
              <View
                key={pos.id}
                style={[
                  pos.isActive ? styles.activePerimeterBadge : styles.perimeterBadge,
                  {
                    left: x - badgeSize / 2,
                    top: y - badgeSize / 2,
                    width: badgeSize,
                    height: badgeSize,
                    borderRadius: badgeSize / 2,
                  },
                ]}
              >
                {pos.icon}
              </View>
            );
          })}

        </View>

        {/* Time markers on top / right / bottom / left */}
        <AppText variant="caption" weight="semiBold" style={[styles.timeLabel, styles.time12am]}>12 AM</AppText>
        <AppText variant="caption" weight="semiBold" style={[styles.timeLabel, styles.time6am]}>6 AM</AppText>
        <AppText variant="caption" weight="semiBold" style={[styles.timeLabel, styles.time12pm]}>12 PM</AppText>
        <AppText variant="caption" weight="semiBold" style={[styles.timeLabel, styles.time6pm]}>6 PM</AppText>
      </View>

      {/* Next in Routine Card */}
      <AppText variant="caption" weight="bold" style={styles.nextSectionTitle}>
        Next in Routine
      </AppText>

      <TouchableOpacity
        style={[styles.nextCard, { backgroundColor: '#FFFFFF', borderColor: '#CEDEE9', borderRadius: borderRadius.l }]}
        activeOpacity={0.8}
      >
        <View style={styles.nextIconWrapper}>
          <Briefcase size={20} color="#004BBA" />
        </View>
        <View style={styles.nextTextContainer}>
          <AppText variant="body" weight="bold" style={styles.nextTextTitle}>
            {nextRoutineName}
          </AppText>
          <AppText variant="caption" weight="bold" style={styles.nextTextTime}>
            {nextRoutineTime}
          </AppText>
        </View>
        <ChevronRight size={20} color="#004BBA" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    marginVertical: normalize(16),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  title: {
    color: '#162731',
  },
  subtitle: {
    marginTop: normalize(1),
  },
  menuButton: {
    padding: normalize(4),
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(6),
    marginBottom: normalize(12),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: normalize(4),
  },
  actionLink: {
    lineHeight: normalize(14),
  },
  separator: {
    marginHorizontal: normalize(8),
    lineHeight: normalize(14),
  },
  dialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(24),
    position: 'relative',
  },
  centralCard: {
    position: 'absolute',
    left: '5%',
    top: '5%',
    width: '90%',
    height: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(8),
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  currentText: {
    fontSize: normalize(10),
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#757C7A',
    marginBottom: normalize(2),
  },
  routineName: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: '#162731',
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  dateText: {
    fontSize: normalize(13),
    fontWeight: '700',
    color: '#2E7BFF',
    marginBottom: normalize(2),
  },
  untilText: {
    fontSize: normalize(11),
    fontWeight: '500',
    color: '#757C7A',
  },
  activePerimeterBadge: {
    position: 'absolute',
    backgroundColor: '#D6E4FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  perimeterBadge: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CEDEE9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  timeLabel: {
    position: 'absolute',
    fontSize: normalize(10),
    fontWeight: '600',
    color: '#8396AA',
  },
  time12am: {
    top: normalize(-20),
    alignSelf: 'center',
  },
  time6am: {
    right: normalize(30),
    top: '46%',
  },
  time12pm: {
    bottom: normalize(-20),
    alignSelf: 'center',
  },
  time6pm: {
    left: normalize(30),
    top: '46%',
  },
  nextSectionTitle: {
    fontSize: normalize(14),
    fontWeight: '700',
    color: '#004BBA',
    marginBottom: normalize(10),
  },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
    borderWidth: 1,
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  nextIconWrapper: {
    width: normalize(46),
    height: normalize(46),
    borderRadius: normalize(23),
    borderWidth: 1.5,
    borderColor: '#CEDEE9',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  nextTextContainer: {
    flex: 1,
  },
  nextTextTitle: {
    color: '#162731',
    fontSize: normalize(15),
  },
  nextTextTime: {
    color: '#004BBA',
    fontSize: normalize(13),
    marginTop: normalize(2),
  },
});
