import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface CustomToggleSwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
}

export const CustomToggleSwitch: React.FC<CustomToggleSwitchProps> = ({
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
    onValueChange(!value);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [normalize(2), normalize(20)],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', colors.typographyColor['Dark 2'] || '#003CA3'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggle}
      disabled={disabled}
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
  );
};

const styles = StyleSheet.create({
  track: {
    width: normalize(44),
    height: normalize(26),
    borderRadius: normalize(13),
    justifyContent: 'center',
    padding: normalize(2),
  },
  thumb: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
