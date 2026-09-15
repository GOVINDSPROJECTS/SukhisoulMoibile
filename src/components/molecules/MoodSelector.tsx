import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../atoms/AppText';
import { useTheme } from '@theme/index';

const MOODS = [
  { label: 'Peaceful', emoji: '😌', color: '#B2EBF2' },
  { label: 'Happy', emoji: '😊', color: '#FFF9C4' },
  { label: 'Productive', emoji: '💪', color: '#C8E6C9' },
  { label: 'Anxious', emoji: '😰', color: '#E1BEE7' },
  { label: 'Sad', emoji: '😔', color: '#D1C4E9' },
];

interface MoodSelectorProps {
  selectedMood?: string;
  onSelect: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="h3" weight="semiBold" style={{ marginBottom: spacing.m }}>
        How are you feeling today?
      </AppText>
      <View style={styles.moodGrid}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.label;
          return (
            <TouchableOpacity
              key={mood.label}
              onPress={() => onSelect(mood.label)}
              style={[
                styles.moodItem,
                {
                  backgroundColor: isSelected ? mood.color : colors.surface,
                  borderRadius: borderRadius.l,
                  padding: spacing.m,
                  borderColor: isSelected ? colors.primary[500] : colors.border,
                  borderWidth: 1,
                },
              ]}
            >
              <AppText style={{ fontSize: 32 }}>{mood.emoji}</AppText>
              <AppText variant="caption" weight={isSelected ? 'bold' : 'regular'}>
                {mood.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
