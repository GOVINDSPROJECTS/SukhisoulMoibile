import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface SegmentedControlProps {
  selectedIndex: number;
  onChange: (index: number) => void;
  values: string[];
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  selectedIndex,
  onChange,
  values,
}) => {
  const { colors, typography, borderRadius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[200], borderRadius: borderRadius.full, borderColor:colors.appThemeColor[400],borderWidth:1 }]}>
      {values.map((value, index) => {
        const isActive = selectedIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              {
                borderRadius: borderRadius.full,
                borderWidth : 1,
                borderColor : isActive ? '#CADBE6' : 'transparent',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                // Drop shadow for active tab
                ...(isActive && {
                  shadowColor: colors.lightAppTheme[900],
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.12,
                  shadowRadius: 6,
                  elevation: 2,
                }),
              },
            ]}
            onPress={() => onChange(index)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                {
                  fontFamily: typography.fontFamily.primary.regular,
                  fontWeight: '700',
                  color: isActive ? colors.green[950] : colors.typographyColor.Black, // Consistent deep steel blue
                },
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(4),
    width: '100%',
    height: normalize(52),
    marginBottom: normalize(10),
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: normalize(12),
    textAlign: 'center',
  },
});
