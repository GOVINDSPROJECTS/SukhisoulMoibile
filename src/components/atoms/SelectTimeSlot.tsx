import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

import { SlotItem } from '@api/professionals';

export const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

interface SelectTimeSlotProps {
  selectedSlot: string;
  onSlotChange: (slot: string) => void;
  showLabel?: boolean;
  slots?: SlotItem[];
  availableTimes?: string[];
  loading?: boolean;
}

export const SelectTimeSlot: React.FC<SelectTimeSlotProps> = ({
  selectedSlot,
  onSlotChange,
  showLabel = true,
  slots,
  availableTimes,
  loading = false,
}) => {
  const { borderRadius } = useTheme();

  const displaySlots = availableTimes && availableTimes.length > 0
    ? availableTimes
    : (slots && slots.length > 0
      ? slots.map((s) => s.time)
      : TIME_SLOTS);

  return (
    <View>
      {showLabel && (
        <AppText variant="caption" weight="extraBold" style={styles.sectionLabel}>
          SELECT TIME
        </AppText>
      )}
      <View style={styles.grid}>
        {displaySlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            onPress={() => onSlotChange(slot)}
            activeOpacity={0.8}
            style={[
              styles.slot,
              selectedSlot === slot && styles.slotActive,
            ]}
          >
            <AppText
              variant="caption"
              weight={selectedSlot === slot ? 'bold' : 'bold'}
              family='secondary'
              style={[
                styles.slotText,
                selectedSlot === slot && styles.slotTextActive,
              ]}
            >
              {slot}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: 0.8,
    marginBottom: normalize(10),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
  },
  slot: {
    width: '30.5%',
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appThemeColor[50],
    borderWidth: 1,
    borderColor: colors.appThemeColor[50],
    overflow: 'hidden',
    borderRadius: normalize(12),
    marginBottom: normalize(5)
  },
  slotActive: {
    backgroundColor: colors.lightAppTheme[950],
    borderColor: colors.lightAppTheme[950],
    boxShadow: '0px 10px 15px -3px #BFDBFE, 0px 4px 6px -4px #BFDBFE',
  },
  slotText: {
    color: colors.appThemeColor[800],
    fontSize: 12.5,
  },
  slotTextActive: {
    color: '#FFFFFF',

  },

});
