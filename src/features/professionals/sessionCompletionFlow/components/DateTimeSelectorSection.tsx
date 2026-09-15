import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react-native';
import { CustomReminderModal } from './CustomReminderModal';
import { colors } from '@/theme';

interface DateItem {
  day: string;
  date: number;
  fullDate: string;
}

const DATES_LIST: DateItem[] = [
  { day: 'MON', date: 10, fullDate: 'Mon, Oct 10' },
  { day: 'TUE', date: 11, fullDate: 'Tue, Oct 11' },
  { day: 'WED', date: 12, fullDate: 'Wed, Oct 12' },
  { day: 'THU', date: 13, fullDate: 'Thu, Oct 13' },
  { day: 'FRI', date: 14, fullDate: 'Fri, Oct 14' },
];

const HOURS = ['09', '10', '11', '12', '01'];
const MINUTES = ['58', '59', '00', '01', '02'];
const PERIODS = ['AM', 'PM'];

interface DateTimeSelectorSectionProps {
  selectedDate?: string;
  selectedTime?: string;
  onDateTimeChange?: (date: string, time: string) => void;
}

export const DateTimeSelectorSection: React.FC<DateTimeSelectorSectionProps> = ({
  onDateTimeChange,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // WED 12
  const [selectedHour, setSelectedHour] = useState('11');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [customDateStr, setCustomDateStr] = useState<string | null>(null);

  const selectedDateItem = DATES_LIST[selectedDayIndex] || DATES_LIST[2];
  const displayDate = customDateStr || selectedDateItem.fullDate;
  const timeFormatted = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;

  const handlePrevDay = () => {
    setSelectedDayIndex((prev) => Math.max(0, prev - 1));
    setCustomDateStr(null);
  };

  const handleNextDay = () => {
    setSelectedDayIndex((prev) => Math.min(DATES_LIST.length - 1, prev + 1));
    setCustomDateStr(null);
  };

  const handleHourSelect = (h: string) => {
    setSelectedHour(h);
    onDateTimeChange?.(displayDate, `${h}:${selectedMinute} ${selectedPeriod}`);
  };

  const handleMinuteSelect = (m: string) => {
    setSelectedMinute(m);
    onDateTimeChange?.(displayDate, `${selectedHour}:${m} ${selectedPeriod}`);
  };

  const handlePeriodToggle = () => {
    const next = selectedPeriod === 'AM' ? 'PM' : 'AM';
    setSelectedPeriod(next);
    onDateTimeChange?.(displayDate, `${selectedHour}:${selectedMinute} ${next}`);
  };

  const handleCustomConfirm = ({ date, time }: { date: string; time: string }) => {
    setCustomDateStr(date);
    const [hPart, mAndPeriod] = time.split(':');
    if (hPart && mAndPeriod) {
      const [mPart, pPart] = mAndPeriod.trim().split(' ');
      setSelectedHour(hPart.padStart(2, '0'));
      if (mPart) setSelectedMinute(mPart.padStart(2, '0'));
      if (pPart) setSelectedPeriod(pPart as 'AM' | 'PM');
    }
    onDateTimeChange?.(date, time);
  };

  return (
    <View style={styles.container}>
      {/* Section Header with title and calendar trigger icon */}
      <View style={styles.sectionHeaderRow}>
        <AppText family="secondary" weight="medium" style={styles.sectionTitle}>
          Choose Date and Time
        </AppText>
        <TouchableOpacity
          onPress={() => setCustomModalVisible(true)}
          style={styles.calTriggerBtn}
          activeOpacity={0.7}
        >
          <CalendarIcon size={normalize(18)} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Date Carousel Row */}
      <View style={styles.dateCarouselRow}>
        <TouchableOpacity
          onPress={handlePrevDay}
          style={styles.arrowButton}
          activeOpacity={0.6}
          disabled={selectedDayIndex === 0}
        >
          <ChevronLeft
            size={normalize(18)}
            color={selectedDayIndex === 0 ? '#CBD5E1' : '#64748B'}
          />
        </TouchableOpacity>

        <View style={styles.datesList}>
          {DATES_LIST.slice(0, 4).map((item, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                onPress={() => setSelectedDayIndex(idx)}
                activeOpacity={0.7}
              >
                <AppText
                  family="secondary"
                  weight="regular"
                  style={[styles.dayText, isSelected && styles.dayTextSelected]}
                >
                  {item.day}
                </AppText>
                <AppText
                  family="secondary"
                  weight="semiBold"
                  style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}
                >
                  {item.date}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleNextDay}
          style={styles.arrowButton}
          activeOpacity={0.6}
          disabled={selectedDayIndex >= 3}
        >
          <ChevronRight
            size={normalize(18)}
            color={selectedDayIndex >= 3 ? '#CBD5E1' : '#64748B'}
          />
        </TouchableOpacity>
      </View>

      {/* Time Wheel Selector */}
      <View style={styles.timeWheelContainer}>
        {/* Top Faded Row */}
        <View style={styles.wheelRowFaded}>
          <TouchableOpacity onPress={() => handleHourSelect('10')}>
            <AppText family="secondary" weight="medium" style={styles.fadedDigit}>
              10
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMinuteSelect('59')}>
            <AppText family="secondary" weight="medium" style={styles.fadedDigit}>
              59
            </AppText>
          </TouchableOpacity>
          <View style={styles.emptyPeriodSpace} />
        </View>

        {/* Selected Active Row with Highlight Lines */}
        <View style={styles.selectedTimeRow}>
          <View style={styles.selectionLineTop} />
          <TouchableOpacity
            style={styles.activeTimeItems}
            onPress={() => setCustomModalVisible(true)}
            activeOpacity={0.8}
          >
            <View>
              <AppText family="secondary" weight="bold" style={styles.activeHour}>
                {selectedHour}
              </AppText>
            </View>
            <View>
              <AppText family="secondary" weight="bold" style={styles.activeMinute}>
                {selectedMinute}
              </AppText>
            </View>
            <View>
              <AppText family="secondary" weight="bold" style={styles.activePeriod}>
                {selectedPeriod}
              </AppText>
            </View>
          </TouchableOpacity>
          <View style={styles.selectionLineBottom} />
        </View>

        {/* Bottom Faded Row */}
        <View style={styles.wheelRowFaded}>
          <TouchableOpacity onPress={() => handleHourSelect('12')}>
            <AppText family="secondary" weight="medium" style={styles.fadedDigit}>
              12
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMinuteSelect('01')}>
            <AppText family="secondary" weight="medium" style={styles.fadedDigit}>
              01
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePeriodToggle}>
            <AppText family="secondary" weight="medium" style={styles.fadedDigit}>
              {selectedPeriod === 'AM' ? 'PM' : 'AM'}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Slot Summary Banner - Tappable to open Calendar Modal */}
      <TouchableOpacity
        style={styles.selectedSlotBanner}
        onPress={() => setCustomModalVisible(true)}
        activeOpacity={0.7}
      >
        <View>
          <AppText family="secondary" weight="bold" style={styles.slotLabel}>
            Selected Slot
          </AppText>
          <AppText family="secondary" weight="regular" style={styles.slotDateText}>
            {displayDate}
          </AppText>
        </View>
        <AppText family="secondary" weight="semiBold" style={styles.slotTimeText}>
          {timeFormatted}
        </AppText>
      </TouchableOpacity>

      {/* Calendar & Time Selector Modal */}
      <CustomReminderModal
        visible={customModalVisible}
        onClose={() => setCustomModalVisible(false)}
        onConfirm={handleCustomConfirm}
        initialTime={timeFormatted}
        initialDate={displayDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(16),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  sectionTitle: {
    fontSize: normalize(14),
    color: colors.typographyColor.Medium,
  },
  calTriggerBtn: {
    padding: normalize(4),
  },
  dateCarouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  arrowButton: {
    padding: normalize(4),
  },
  datesList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: normalize(8),
  },
  dateCard: {
    flex: 1,
    marginHorizontal: normalize(4),
    backgroundColor: colors.appThemeColor[50],
    borderRadius: normalize(12),
    paddingVertical: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCardSelected: {
    backgroundColor: colors.lightAppTheme[950],
  },
  dayText: {
    fontSize: normalize(9.5),
    color: colors.tintsGrey[300],
    marginBottom: normalize(2),
  },
  dayTextSelected: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  dateNumber: {
    fontSize: normalize(14),
    color: colors.appThemeColor[950],
  },
  dateNumberSelected: {
    color: '#FFFFFF',
  },
  timeWheelContainer: {
    alignItems: 'center',
    paddingVertical: normalize(8),
    marginBottom: normalize(16),
  },
  wheelRowFaded: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    paddingVertical: normalize(6),
  },
  fadedDigit: {
    fontSize: normalize(14),
    color: '#CBD5E1',
  },
  emptyPeriodSpace: {
    width: normalize(24),
  },
  selectedTimeRow: {
    width: '90%',
    position: 'relative',
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionLineTop: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  selectionLineBottom: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  activeTimeItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  activeHour: {
    fontSize: normalize(22),
    color: colors.blue[300],
  },
  activeMinute: {
    fontSize: normalize(22),
    color: colors.blue[300],
  },
  activePeriod: {
    fontSize: normalize(18),
    color: colors.blue[300],
  },
  selectedSlotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.tintsBlue[200],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
  slotLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  slotDateText: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  slotTimeText: {
    fontSize: normalize(13),
    color: colors.typographyColor['Color 2'],
  },
});
