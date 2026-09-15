import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Calendar } from 'lucide-react-native';

interface PreferenceItemProps {
  label: string;
  date: string;
  time: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export const PreferenceItem: React.FC<PreferenceItemProps> = ({
  label,
  date,
  time,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.item, isSelected && styles.selectedItem]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Calendar size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="bold" style={styles.label}>
          {label}
        </AppText>
      </View>
      <View style={styles.rightSection}>
        <AppText family="primary" weight="bold" style={styles.dateText}>
          {date}
        </AppText>
        <AppText family="primary" weight="medium" style={styles.timeText}>
          {time}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedItem: {
    borderColor: '#1E62C4',
    backgroundColor: '#F0F9FF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  label: {
    fontSize: normalize(11),
    color: '#1E293B',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: normalize(10),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  timeText: {
    fontSize: normalize(9),
    color: '#64748B',
  },
});
