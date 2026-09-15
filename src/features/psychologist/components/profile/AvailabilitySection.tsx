import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { CalendarCheck, IndianRupee } from 'lucide-react-native';
import { SelectDatePicker, WEEK_DAYS, WeekDay } from '@components/atoms/SelectDatePicker';
import { SelectTimeSlot, TIME_SLOTS } from '@components/atoms/SelectTimeSlot';
import { fetchProfessionalSlots, SlotItem } from '@api/professionals';

interface AvailabilitySectionProps {
  doctorId?: string;
  price?: number;
  onBookTherapy?: (params: { date: number; time: string; dateString?: string }) => void;
  initialDay?: number;
  initialSlot?: string;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  doctorId,
  price,
  onBookTherapy,
  initialDay,
  initialSlot,
}) => {
  const { borderRadius } = useTheme();

  const [selectedDay, setSelectedDay] = useState<number>(
    initialDay ?? WEEK_DAYS[0]?.date ?? new Date().getDate()
  );
  const [selectedDateString, setSelectedDateString] = useState<string>(
    WEEK_DAYS.find((d) => d.date === (initialDay ?? WEEK_DAYS[0]?.date))?.dateString ??
      WEEK_DAYS[0]?.dateString ??
      new Date().toISOString().split('T')[0]
  );
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>(
    initialSlot ?? ''
  );
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);

  // Fetch real-time slots whenever selected date or doctorId changes
  useEffect(() => {
    let isMounted = true;
    setLoadingSlots(true);

    fetchProfessionalSlots(doctorId || '1', selectedDateString)
      .then((data) => {
        if (!isMounted) return;
        setSlots(data.slots || []);
        const avail = data.available_times || [];
        setAvailableTimes(avail);

        if (avail.length > 0) {
          setSelectedSlot((prev) => (avail.includes(prev) ? prev : avail[0]));
        } else {
          setSelectedSlot('');
        }
      })
      .catch((err) => {
        console.log('Error fetching slots for AvailabilitySection:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [doctorId, selectedDateString]);

  const handleDayChange = (dayNum: number, item?: WeekDay) => {
    setSelectedDay(dayNum);
    if (item?.dateString) {
      setSelectedDateString(item.dateString);
    } else {
      const match = WEEK_DAYS.find((d) => d.date === dayNum);
      if (match?.dateString) {
        setSelectedDateString(match.dateString);
      }
    }
  };

  const selectedWeekDay = WEEK_DAYS.find((d) => d.date === selectedDay) || WEEK_DAYS[0];
  const nextSlotDateLabel = selectedWeekDay
    ? `${selectedWeekDay.day === 'TODAY' ? 'Today' : selectedWeekDay.day}, ${selectedWeekDay.month} ${selectedWeekDay.date}`
    : `Day ${selectedDay}`;

  const nextAvailableTime = loadingSlots
    ? 'Checking...'
    : availableTimes.length > 0
    ? availableTimes[0]
    : 'None Available';

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <CalendarCheck size={normalize(18)} color={colors.blue[600]} style={{ marginRight: normalize(6) }} />
        <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
          Availability
        </AppText>
      </View>

      {/* Next Slot Banner */}
      <View style={[styles.nextSlotBanner, { borderRadius: borderRadius.full }]}>
        <View>
          <AppText variant="body" weight="extraBold" style={styles.nextSlotLabel}>
            Next Available Slot
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.nextSlotDate}>
            {nextSlotDateLabel}
          </AppText>
        </View>
        <AppText variant="h3" weight="extraBold" style={styles.nextSlotTime}>
          {nextAvailableTime}
        </AppText>
      </View>

      {/* Reusable Time Slot Picker */}
      <View style={styles.timeSectionWrapper}>
        <SelectTimeSlot
          selectedSlot={selectedSlot}
          onSlotChange={setSelectedSlot}
          slots={slots}
          availableTimes={availableTimes}
          loading={loadingSlots}
          showLabel={false}
        />
      </View>

      {/* Reusable Date Picker */}
      <AppText variant="caption" weight="extraBold" style={styles.upcomingWeekLabel}>
        UPCOMING WEEK
      </AppText>
      <View style={styles.dateSectionWrapper}>
        <SelectDatePicker
          selectedDay={selectedDay}
          onDayChange={handleDayChange}
          showLabel={false}
        />
      </View>

      {/* Session Fee */}
      <View style={styles.feeRow}>
        <AppText variant="body" weight="regular" style={styles.feeLabel}>
          Session Fee
        </AppText>
        <View style={styles.feeValueRow}>
          <IndianRupee size={20} strokeWidth={3} stroke='#0F172A' style={[{ marginRight: normalize(-1) }]} />
          <AppText variant="h3" weight="black" family='secondary' style={styles.feeValue}>
            {price ?? 500}
          </AppText>
          <AppText variant="caption" weight="regular" family='secondary' style={styles.feeUnit}>
            {' /50m'}
          </AppText>
        </View>
      </View>

      {/* Book Therapy Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={!selectedSlot || availableTimes.length === 0}
        onPress={() => onBookTherapy?.({ date: selectedDay, time: selectedSlot, dateString: selectedDateString })}
        style={[
          styles.bookBtnWrapper,
          (!selectedSlot || availableTimes.length === 0) && { opacity: 0.6 },
        ]}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bookBtnGradient}
        >
          <AppText variant="body" weight="bold" style={styles.bookBtnText}>
            Book Therapy
          </AppText>
        </LinearGradient>
      </TouchableOpacity>

      {/* Confidential Badge */}
      <AppText variant="caption" weight="medium" style={styles.confidentialText}>
        100% CONFIDENTIAL & SECURE
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(14),
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: colors.appThemeColor[900],
  },
  nextSlotBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.tintsBlue[200],
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(20),
    marginBottom: normalize(25),
  },
  nextSlotLabel: {
    color: "#2D3432",
    fontSize: normalize(14),
  },
  nextSlotDate: {
    color: '#59615F',
    fontSize: normalize(12),
    marginTop: normalize(-2),
  },
  nextSlotTime: {
    color: '#375EA4',
    fontSize: normalize(18),
  },
  timeSectionWrapper: {
    marginBottom: normalize(40),
  },
  upcomingWeekLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    letterSpacing: 0.8,
    marginBottom: normalize(10),
  },
  dateSectionWrapper: {
    marginBottom: normalize(40),
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
    borderTopWidth: 1,
    borderTopColor: 'rgba(172,180,177,0.10)',
    paddingTop: normalize(12),
  },
  feeLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  feeValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeValue: {
    color: colors.appThemeColor[900],
    fontSize: normalize(20),
  },
  feeUnit: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  bookBtnWrapper: {
    width: '100%',
    borderRadius: normalize(99),
    overflow: 'hidden',
    marginBottom: normalize(20),
    maxWidth: normalize(270),
    marginHorizontal: 'auto'
  },
  bookBtnGradient: {
    width: '100%',
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: normalize(54),
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
  confidentialText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: normalize(0.5),
    textAlign: 'center',
    marginTop: normalize(8),
  },
});
