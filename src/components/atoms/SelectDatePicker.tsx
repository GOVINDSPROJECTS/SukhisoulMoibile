import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export interface WeekDay {
  day: string;
  date: number;
  month: string;
  dateString?: string;
  fullDate?: Date;
}

export const generateWeekDays = (): WeekDay[] => {
  const days: WeekDay[] = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    days.push({
      day: i === 0 ? 'TODAY' : dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      dateString: `${yyyy}-${mm}-${dd}`,
      fullDate: d,
    });
  }
  return days;
};

export const WEEK_DAYS: WeekDay[] = generateWeekDays();

interface SelectDatePickerProps {
  selectedDay: number;
  onDayChange: (date: number) => void;
  showLabel?: boolean;
}

export const SelectDatePicker: React.FC<SelectDatePickerProps> = ({
  selectedDay,
  onDayChange,
  showLabel = true,
}) => {
  const { borderRadius } = useTheme();

  return (
    <View>
      {showLabel && (
        <AppText variant="caption" weight="extraBold" style={styles.sectionLabel}>
          UPCOMING WEEK
        </AppText>
      )}

      <View style={styles.weekRow}>
        <TouchableOpacity activeOpacity={0.7}>
          <ChevronLeft size={normalize(18)} color={colors.appThemeColor[700]} />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekScrollContent}
        >
          {WEEK_DAYS.map((item) => (
            <TouchableOpacity
              key={item.date}
              onPress={() => onDayChange(item.date)}
              activeOpacity={0.8}
              style={[
                styles.dayItem,
                { borderRadius: 12 },
                selectedDay === item.date && styles.dayItemActive,
              ]}
            >
              <AppText
                variant="caption"
                weight="medium"
                style={[
                  styles.dayLabel,
                  selectedDay === item.date && styles.dayLabelActive,
                ]}
              >
                {item.day}
              </AppText>
              <AppText
                variant="body"
                weight="extraBold"
                family='secondary'
                style={[
                  styles.dayDate,
                  selectedDay === item.date && styles.dayDateActive,
                ]}
              >
                {item.date}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity activeOpacity={0.7}>
          <ChevronRight size={normalize(18)} color={colors.appThemeColor[700]} />
        </TouchableOpacity>
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
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  weekScrollContent: {
    gap: normalize(8),
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
    marginTop: normalize(-5)
  },
  dayItem: {
    width: normalize(53),
    height: normalize(60),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appThemeColor[50],
    borderWidth: 1,
    borderColor: colors.appThemeColor[50],
    overflow: 'hidden',
  },
  dayItemActive: {
    backgroundColor: colors.lightAppTheme[950],
    borderColor: colors.appThemeColor[50],
    boxShadow: '0px 10px 15px -3px #BFDBFE, 0px 4px 6px -4px #BFDBFE',

  },
  dayLabel: {
    color: colors.tintsGrey[300],
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  dayLabelActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  dayDate: {
    color: colors.appThemeColor[950],
    fontSize: normalize(16),
    marginTop: normalize(0),
  },
  dayDateActive: {
    color: '#FFFFFF',
  },
});
