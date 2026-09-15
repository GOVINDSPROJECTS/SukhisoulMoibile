import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NotificationToggleRowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}

export const NotificationToggleRow: React.FC<NotificationToggleRowProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
  disabled = false,
}) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const toggle = () => {
    if (disabled) return;
    const nextVal = !value;
    console.log(`[Notification Settings] ${title} toggled to: ${nextVal ? 'ON' : 'OFF'}`);
    onValueChange(nextVal);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [normalize(2), normalize(18)],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', colors.typographyColor['Dark 2'] || '#003CA3'],
  });

  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <AppText
          weight="bold"
          family="primary"
          style={styles.title}
          color={colors.typographyColor.Medium || '#1E293B'}
        >
          {title}
        </AppText>
        {subtitle ? (
          <AppText
            weight="regular"
            family="secondary"
            style={styles.subtitle}
            color={colors.typographyColor.Light || '#64748B'}
          >
            {subtitle}
          </AppText>
        ) : null}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggle}
        disabled={disabled}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Animated.View style={[styles.track, { backgroundColor }]}>
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(10),
    gap: normalize(16),
    paddingHorizontal: normalize(10)
  },
  textCol: {
    flex: 1,
    gap: normalize(2.5),
  },
  title: {
    fontSize: normalize(13.5),
  },
  subtitle: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
  },
  track: {
    width: normalize(44),
    height: normalize(24),
    borderRadius: normalize(12),
    justifyContent: 'center',
    padding: normalize(2),
  },
  thumb: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
});
