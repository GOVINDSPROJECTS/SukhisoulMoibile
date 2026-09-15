import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Pen, PenBox, Pencil, PenLine, PenTool } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SelectedSlotPillProps {
  dayLabel: string;
  slot: string;
  onPress?: () => void;
}

export const SelectedSlotPill: React.FC<SelectedSlotPillProps> = ({ dayLabel, slot, onPress }) => (
  <TouchableOpacity
    style={styles.pill}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    <View>
      <AppText variant="caption" family='secondary' weight="bold" style={styles.label}>
        Selected Slot
      </AppText>
      <AppText variant="caption" family='secondary' weight="medium" style={styles.dayLabel}>
        {dayLabel}
      </AppText>
    </View>
    <View style={styles.rightRow}>
      <AppText variant="body" family='secondary' weight="bold" style={styles.slot}>
        {slot}
      </AppText>
      {onPress && (
        <Pencil size={normalize(12)} color={"#375EA4"} strokeWidth={1.8} style={styles.editIcon} fill={"#375EA4"} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.tintsBlue[200],
    borderRadius: normalize(99),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
    marginTop: normalize(10),
  },
  label: {
    color: colors.typographyColor.Black,
    fontSize: normalize(12),
  },
  dayLabel: {
    color: "#59615F",
    fontSize: normalize(10),
    marginTop: normalize(2),
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  slot: {
    color: "#375EA4",
    fontSize: normalize(13),
  },
  editIcon: {
    marginTop: normalize(1),
  },
});

