import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../atoms/AppText';
import { useTheme } from '@theme/index';
import { CheckCircle2, Circle } from 'lucide-react-native';

interface HabitCardProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  title,
  description,
  isCompleted,
  onToggle,
  onPress,
}) => {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          padding: spacing.m,
          borderRadius: borderRadius.l,
          marginBottom: spacing.m,
          borderWidth: 1,
          borderColor: isCompleted ? colors.success : colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText variant="h3" weight="semiBold" style={isCompleted && styles.completedText}>
            {title}
          </AppText>
          {description && (
            <AppText variant="caption" style={styles.description}>
              {description}
            </AppText>
          )}
        </View>
        <TouchableOpacity onPress={onToggle}>
          {isCompleted ? (
            <CheckCircle2 color={colors.success} size={28} />
          ) : (
            <Circle color={colors.border} size={28} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    marginTop: 4,
  },
});
