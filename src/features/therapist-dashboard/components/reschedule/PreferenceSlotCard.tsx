import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { SelectDatePicker, WEEK_DAYS } from '@components/atoms/SelectDatePicker';
import { SelectTimeSlot } from '@components/atoms/SelectTimeSlot';
import { SelectedSlotPill } from './SelectedSlotPill';

interface PreferenceSlotCardProps {
  index: 1 | 2 | 3;
  isExpanded: boolean;
  selectedDay: number | null;
  selectedSlot: string | null;
  onDayChange: (day: number) => void;
  onSlotChange: (slot: string) => void;
  onAdd: () => void;
}

const ORDINAL = ['1st', '2nd', '3rd'] as const;

export const PreferenceSlotCard: React.FC<PreferenceSlotCardProps> = ({
  index,
  isExpanded,
  selectedDay,
  selectedSlot,
  onDayChange,
  onSlotChange,
  onAdd,
}) => {
  const ordinal = ORDINAL[index - 1];
  const hasSlot = selectedDay !== null && selectedSlot !== null;
  const weekDay = WEEK_DAYS.find(d => d.date === selectedDay);
  const dayLabel = weekDay ? `${weekDay.day}, ${weekDay.month} ${weekDay.date}` : '';

  return (
    <View style={styles.section}>
      <AppText variant="body" family='secondary' weight="extraBold" style={styles.sectionTitle}>
        {hasSlot && !isExpanded ? `${ordinal} Preference` : `Add ${ordinal} Preference`}
      </AppText>

      {/* Selected slot summary (collapsed state) — tappable to re-edit */}
      {hasSlot && !isExpanded && (
        <SelectedSlotPill dayLabel={dayLabel} slot={selectedSlot!} onPress={onAdd} />
      )}

      {/* Expanded picker */}
      {isExpanded && (
        <View style={styles.pickerContainer}>
          <AppText variant="caption" family='secondary' weight="extraBold" style={styles.pickerLabel}>
            CHOOSE DATE AND TIME
          </AppText>
          <SelectDatePicker
            selectedDay={selectedDay ?? (WEEK_DAYS[0]?.date ?? new Date().getDate())}
            onDayChange={onDayChange}
            showLabel={false}
          />
          <View style={styles.timeSlotsWrapper}>
            <SelectTimeSlot
              selectedSlot={selectedSlot ?? ''}
              onSlotChange={onSlotChange}
              showLabel={false}
            />
          </View>
          {hasSlot && (
            <SelectedSlotPill dayLabel={dayLabel} slot={selectedSlot!} />
          )}
        </View>
      )}

      {/* Add Preference button (not yet expanded, no slot) */}
      {!isExpanded && !hasSlot && (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={onAdd}
          activeOpacity={0.7}
        >
          <Plus size={normalize(14)} color={colors.lightAppTheme[700]} />
          <AppText variant="body" weight="semiBold" style={styles.addBtnText}>
            Add Preference
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: normalize(18),
  },
  sectionTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
    marginBottom: normalize(8),
  },
  pickerLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: 0.8,
    marginBottom: normalize(8),
  },
  pickerContainer: {
    marginTop: normalize(10),
    marginHorizontal: normalize(10)
  },
  timeSlotsWrapper: {
    marginTop: normalize(10),
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    borderStyle: 'dashed',
    borderRadius: normalize(10),
    paddingVertical: normalize(14),
    backgroundColor: colors.appThemeColor[50],
  },
  addBtnText: {
    color: colors.lightAppTheme[700],
    fontSize: normalize(13),
  },
});
