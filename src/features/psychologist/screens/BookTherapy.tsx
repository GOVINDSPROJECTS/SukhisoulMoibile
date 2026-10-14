import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import {
  ArrowLeft,
  UserRound,
  FileText,
  Clock,
  CalendarCheck,
  BadgeCheck,
  IndianRupee,
} from 'lucide-react-native';
import { SelectDatePicker, WEEK_DAYS, WeekDay } from '@components/atoms/SelectDatePicker';
import { SelectTimeSlot, TIME_SLOTS } from '@components/atoms/SelectTimeSlot';
import { fetchProfessionalSlots, SlotItem } from '@api/professionals';
import type { RootStackParamList, NavigationProp } from '@navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BookTherapyRoute = RouteProp<RootStackParamList, 'BookTherapy'>;

const REASON_TAGS = ['Anxiety', 'Stress', 'Relationships', 'Work-life balance'];

export const BookTherapy: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BookTherapyRoute>();
  const { borderRadius } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    doctorName,
    doctorId,
    designation,
    price,
    selectedDate: initialDate,
    selectedTime: initialTime,
  } = route.params;

  const [selectedDay, setSelectedDay] = useState<number>(
    initialDate ?? WEEK_DAYS[0]?.date ?? new Date().getDate()
  );
  const [selectedDateString, setSelectedDateString] = useState<string>(
    WEEK_DAYS.find((d) => d.date === (initialDate ?? WEEK_DAYS[0]?.date))?.dateString ??
      WEEK_DAYS[0]?.dateString ??
      new Date().toISOString().split('T')[0]
  );
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>(
    initialTime ?? TIME_SLOTS[0]
  );
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');

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
        console.log('Error fetching slots:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [doctorId, selectedDateString]);

  const handleDayChange = useCallback((dayNum: number, item?: WeekDay) => {
    setSelectedDay(dayNum);
    if (item?.dateString) {
      setSelectedDateString(item.dateString);
    } else {
      const match = WEEK_DAYS.find((d) => d.date === dayNum);
      if (match?.dateString) {
        setSelectedDateString(match.dateString);
      }
    }
  }, []);

  const toggleReason = useCallback((tag: string) => {
    setSelectedReasons((prev) =>
      prev.includes(tag) ? prev.filter((r) => r !== tag) : [...prev, tag]
    );
  }, []);

  const selectedWeekDay = WEEK_DAYS.find((d) => d.date === selectedDay) || WEEK_DAYS[0];
  const dateLabel = selectedWeekDay
    ? `${selectedWeekDay.day}, ${selectedWeekDay.month} ${selectedWeekDay.date}`
    : `${selectedDay}`;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]} edges={['bottom', 'left', 'right']}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={false}
      />
      <View style={{ paddingTop: insets.top }}></View>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>
        <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
          Book Free Therapy
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Session Details ─────────────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <UserRound size={normalize(23)} color={colors.blue[700]} />
            </View>
            <AppText variant="h4" weight="extraBold" style={styles.cardTitle}>
              Session Details
            </AppText>
          </View>

          {[
            { label: 'Therapist', value: doctorName },
            { label: 'Therapy Type', value: '1:1 Session' },
            { label: 'Duration', value: '50 Minutes' },
          ].map((row) => (
            <View key={row.label} style={styles.detailRow}>
              <AppText variant="caption" weight="regular" style={styles.detailLabel}>
                {row.label}
              </AppText>
              <AppText variant="caption" weight="semiBold" style={styles.detailValue}>
                {row.value}
              </AppText>
            </View>
          ))}
          <View key="Price" style={styles.detailRow}>
            <AppText variant="caption" weight="regular" style={styles.detailLabel}>
              Price
            </AppText>
            <View style={{ flexDirection: "row", alignItems: "center", gap: normalize(0), paddingHorizontal: normalize(4), borderRadius: borderRadius.m, justifyContent: "center" }}>
              <IndianRupee size={normalize(14)} color={colors.appThemeColor[800]} strokeWidth={3} />
              <AppText variant="caption" weight="semiBold" style={[styles.detailValue, { marginTop: -2 }]}>{price}</AppText>
            </View>
          </View>

          <View style={[styles.dividerLine, { marginTop: normalize(12) }]} />

          <View style={[styles.detailRow, { marginTop: normalize(12) }]}>
            <AppText variant="body" weight="extraBold" style={styles.youPayLabel}>
              You Pay
            </AppText>
            <View style={{ alignItems: 'flex-end' }}>

              <View style={{ flexDirection: "row", alignItems: "center", gap: normalize(0), paddingHorizontal: normalize(4), borderRadius: borderRadius.m, justifyContent: "center" }}>
                <IndianRupee size={normalize(14)} color={colors.blue[600]} strokeWidth={3} style={{ marginTop: normalize(4) }} />
                <AppText variant="body" weight="extraBold" style={styles.youPayAmount}>
                  {price}
                </AppText>
              </View>
              <AppText variant="caption" weight="bold" style={styles.youPayDesignation}>
                ({designation})
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Reason for Therapy ──────────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <FileText size={normalize(23)} color={colors.blue[700]} />
            </View>
            <AppText variant="h4" weight="extraBold" style={styles.cardTitle}>
              Reason for Therapy
            </AppText>
          </View>

          <View style={styles.reasonTagsRow}>
            {REASON_TAGS.map((tag) => {
              const active = selectedReasons.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleReason(tag)}
                  activeOpacity={0.8}
                  style={[
                    styles.reasonTag,
                    { borderRadius: borderRadius.full },
                    active && styles.reasonTagActive,
                  ]}
                >
                  <AppText
                    variant="caption"
                    weight="medium"
                    style={[styles.reasonTagText, active && styles.reasonTagTextActive]}
                  >
                    {tag}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={[styles.reasonInput, { borderRadius: normalize(12) }]}
            placeholder="Other reasons or specific details..."
            placeholderTextColor={colors.typographyColor.Medium}
            multiline
            numberOfLines={4}
            value={otherReason}
            onChangeText={setOtherReason}
            textAlignVertical="top"
          />
        </View>

        {/* ── Select Date ─────────────────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <CalendarCheck size={normalize(23)} color={colors.blue[700]} />
            </View>
            <AppText variant="h4" weight="extraBold" style={styles.cardTitle}>
              Select Date
            </AppText>
          </View>

          <SelectDatePicker
            selectedDay={selectedDay}
            onDayChange={handleDayChange}
            showLabel={false}
          />
        </View>

        {/* ── Select Time Slot ────────────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <Clock size={normalize(23)} color={colors.blue[700]} />
            </View>
            <AppText variant="h4" weight="extraBold" style={styles.cardTitle}>
              Select Time Slot
            </AppText>
          </View>

          <SelectTimeSlot
            selectedSlot={selectedSlot}
            onSlotChange={setSelectedSlot}
            slots={slots}
            availableTimes={availableTimes}
            loading={loadingSlots}
            showLabel={false}
          />
        </View>

        {/* ── Book Button ─────────────────────────────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.bookBtnWrapper,
            (!selectedSlot || availableTimes.length === 0) && { opacity: 0.6 },
          ]}
          disabled={!selectedSlot || availableTimes.length === 0}
          onPress={() => {
            if (!selectedSlot) {
              Alert.alert('Slot Required', 'Please select an available time slot for your therapy session.');
              return;
            }
            navigation.navigate('ConfirmBooking', {
              doctorName,
              doctorId,
              designation,
              date: selectedDateString,
              dateFormatted: dateLabel,
              time: selectedSlot,
              duration: '50 Minutes',
              price: price || 500,
            });
          }}
        >
          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.bookBtnGradient, { borderRadius: normalize(99) }]}
          >
            <AppText variant="body" weight="bold" style={styles.bookBtnText}>
              Book Therapy
            </AppText>
          </LinearGradient>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.appThemeColor[50],
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
  headerSpacer: {
    width: normalize(36),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    paddingBottom: normalize(36),
    gap: normalize(14),
  },

  // ── Card ────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#FFFFFF',
    padding: normalize(24),
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(14),
    gap: normalize(10),
  },
  cardIconBg: {
    width: normalize(40),
    height: normalize(40),
    backgroundColor: "#EFF6FF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: normalize(16),
    color: colors.appThemeColor[900],
  },

  // ── Session Details ──────────────────────────────────────────────────────
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  detailLabel: {
    color: colors.tintsGrey[500],
    fontSize: normalize(12),
  },
  detailValue: {
    color: "#000000",
    fontSize: normalize(12),
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.tintsGrey[100],
  },
  youPayLabel: {
    fontSize: normalize(14),
    color: colors.appThemeColor[900],
  },
  youPayAmount: {
    fontSize: normalize(15),
    color: colors.blue[600],
  },
  youPayDesignation: {
    fontSize: normalize(10),
    color: colors.green[500],
    marginTop: normalize(1),
  },

  // ── Reason ──────────────────────────────────────────────────────────────
  reasonTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(8),
    marginBottom: normalize(12),
  },
  reasonTag: {
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(7),
    borderWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: 'rgba(248,250,252,0.50)',
  },
  reasonTagActive: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderColor: colors.blue[600],
  },
  reasonTagText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },
  reasonTagTextActive: {
    color: colors.blue[700],
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    backgroundColor: 'rgba(248,250,252,0.50)',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    minHeight: normalize(120),
    fontFamily: 'Manrope-Regular',
  },

  // ── Book Button ─────────────────────────────────────────────────────────
  bookBtnWrapper: {
    marginTop: normalize(6),
    borderRadius: normalize(99),
    overflow: 'hidden',
  },
  bookBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(16),
    minHeight: normalize(56),
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  summaryText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    textAlign: 'center',
    marginTop: normalize(4),
  },
  confidentialText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: normalize(2),
  },
});
