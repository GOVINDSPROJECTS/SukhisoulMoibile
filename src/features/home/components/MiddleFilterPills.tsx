import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { MessageSquare, CheckSquare, Clock } from 'lucide-react-native';

export const MiddleFilterPills: React.FC = () => {
  const { borderRadius } = useTheme();

  const pills = [
    {
      id: 'talk',
      label: 'Talk to',
      icon: <MessageSquare size={16} color="#004BBA" />,
      bgColor: '#E6F0FA',
      borderColor: '#CBE3FC',
      textColor: '#004BBA',
    },
    {
      id: 'tasks',
      label: 'Daily tasks',
      icon: <CheckSquare size={16} color="#6B21A8" />,
      bgColor: '#F3E8FF',
      borderColor: '#E9D5FF',
      textColor: '#6B21A8',
    },
    {
      id: 'tracker',
      label: 'Habit Tracker',
      icon: <Clock size={16} color="#0369A1" />,
      bgColor: '#E0F2FE',
      borderColor: '#BAE6FD',
      textColor: '#0369A1',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {pills.map((pill) => (
          <TouchableOpacity
            key={pill.id}
            style={[
              styles.pill,
              {
                backgroundColor: pill.bgColor,
                borderColor: pill.borderColor,
                borderRadius: borderRadius.full,
              },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>{pill.icon}</View>
            <AppText
              variant="caption"
              weight="bold"
              style={[styles.label, { color: pill.textColor }]}
            >
              {pill.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(10),
  },
  scrollContainer: {
    paddingHorizontal: normalize(20),
    gap: normalize(10),
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    borderWidth: 1.5,
  },
  iconContainer: {
    marginRight: normalize(8),
  },
  label: {
    fontSize: normalize(13),
  },
});
