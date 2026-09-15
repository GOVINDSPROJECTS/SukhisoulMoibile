import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Settings, Puzzle, Target, Timer } from 'lucide-react-native';
import { colors } from '@/theme';

interface BrainExerciseItem {
  id: string;
  title: string;
  xp: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  iconType: 'settings' | 'puzzle' | 'target' | 'timer';
}

const EXERCISES: BrainExerciseItem[] = [
  {
    id: 'memory',
    title: 'Memory Game',
    xp: '+15 XP',
    bgColor: colors.blue[50],
    iconBg: '#FFFFFF',
    iconColor: '#64748B',
    iconType: 'settings',
  },
  {
    id: 'puzzle',
    title: 'Puzzle Challenge',
    xp: '+20 XP',
    bgColor: '#ECFDF5',
    iconBg: '#FFFFFF',
    iconColor: '#10B981',
    iconType: 'puzzle',
  },
  {
    id: 'focus',
    title: 'Focus Exercise',
    xp: '+15 XP',
    bgColor: '#FFF7ED',
    iconBg: '#FFFFFF',
    iconColor: '#F97316',
    iconType: 'target',
  },
  {
    id: 'speed',
    title: 'Speed Quiz',
    xp: '+25 XP',
    bgColor: '#FAF5FF',
    iconBg: '#FFFFFF',
    iconColor: '#8B5CF6',
    iconType: 'timer',
  },
];

export const BrainExercises: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExercisePress = (item: BrainExerciseItem) => {
    setActiveExercise(item.id);
    Alert.alert(
      item.title,
      `Starting ${item.title} to earn ${item.xp}! Ready to train your brain?`,
      [{ text: 'Start Now', style: 'default' }]
    );
  };

  const renderIcon = (type: BrainExerciseItem['iconType'], color: string) => {
    switch (type) {
      case 'settings':
        return <Image
          source={require('../assets/ico-setting.png')}
          style={{ width: normalize(22), height: normalize(28) }}
          resizeMode="contain"
        />;
      case 'puzzle':
        return <Image
          source={require('../assets/ico-puzzle.png')}
          style={{ width: normalize(22), height: normalize(28) }}
          resizeMode="contain"
        />;
      case 'target':
        return <Image
          source={require('../assets/ico-goal.png')}
          style={{ width: normalize(22), height: normalize(28) }}
          resizeMode="contain"
        />;
      case 'timer':
        return <Image
          source={require('../assets/ico-alarm.png')}
          style={{ width: normalize(22), height: normalize(28) }}
          resizeMode="contain"
        />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText style={styles.sectionTitle} weight="extraBold" family='primary'>
          Brain Exercises
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <AppText style={styles.viewAllText} weight="semiBold">
            {isExpanded ? 'Show Less' : 'View All'}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* 2x2 Grid */}
      <View style={styles.grid}>
        {EXERCISES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.exerciseCard, { backgroundColor: item.bgColor }]}
            activeOpacity={0.8}
            onPress={() => handleExercisePress(item)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
              {renderIcon(item.iconType, item.iconColor)}
            </View>

            <View style={styles.textContainer}>
              <AppText
                style={styles.exerciseTitle}
                weight="extraBold"
                family='secondary'
                numberOfLines={1}
              >
                {item.title}
              </AppText>
              <AppText style={styles.exerciseXp} weight="medium">
                {item.xp}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(32),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(2),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#064E3B',
    marginBottom: normalize(14),
  },
  viewAllText: {
    fontSize: normalize(12),
    color: '#059669',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(12),
  },
  exerciseCard: {
    width: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(18),
  },
  iconContainer: {
    width: normalize(30),
    height: normalize(44),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
    padding: normalize(8)
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseTitle: {
    fontSize: normalize(11),
    color: '#1F2937',
    marginBottom: normalize(2),
  },
  exerciseXp: {
    fontSize: normalize(10),
    color: '#059669',
  },
});
