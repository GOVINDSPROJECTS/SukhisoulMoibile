import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, CalendarCheck, Clock, UserRound, IndianRupee, Calendar } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { SelectDatePicker, WEEK_DAYS } from '@components/atoms/SelectDatePicker';
import { SelectTimeSlot, TIME_SLOTS } from '@components/atoms/SelectTimeSlot';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import type { RootStackParamList, NavigationProp } from '@navigation/types';

type FcBookSessionRoute = RouteProp<RootStackParamList, 'FcBookSession'>;

// ─── Screen ───────────────────────────────────────────────────────────────────

export const FcBookSessionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FcBookSessionRoute>();
  const insets = useSafeAreaInsets();
  const { borderRadius } = useTheme();

  const { doctorName, doctorId, designation, price } = route.params;

  const [selectedDay, setSelectedDay] = useState<number>(WEEK_DAYS[2].date);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1]);

  const selectedWeekDay = WEEK_DAYS.find((d) => d.date === selectedDay);
  const dateLabel = selectedWeekDay
    ? `${selectedWeekDay.day}, ${selectedWeekDay.month} ${selectedWeekDay.date}`
    : `Oct ${selectedDay}`;

  const handleContinue = useCallback(() => {
    navigation.navigate('ConfirmBooking', {
      doctorName,
      doctorId,
      designation,
      date: dateLabel,
      time: selectedSlot,
      duration: '45 Minutes',
      price: price || 500,
      isFamilyCare: true,
    });
  }, [navigation, doctorName, doctorId, designation, dateLabel, selectedSlot, price]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />


      {/* ── Header ─────────────────────────────────────────────────────── */}
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
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
          Family Care
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Session Details Card ─────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <UserRound size={normalize(22)} color={colors.blue[800]} />
            </View>
            <AppText variant="h4" weight="bold" style={styles.cardTitle}>
              Session Details
            </AppText>
          </View>

          {[
            { label: 'Therapy Type', value: '1:1 Session' },
            { label: 'Duration', value: '45 Minutes' },
            { label: 'Price', value: null },
          ].map((row) =>
            row.value !== null ? (
              <View key={row.label} style={styles.detailRow}>
                <AppText variant="caption" weight="semiBold" style={styles.detailLabel}>
                  {row.label}
                </AppText>
                <AppText variant="caption" weight="semiBold" style={styles.detailValue}>
                  {row.value}
                </AppText>
              </View>
            ) : (
              <View key="Price" style={styles.detailRow}>
                <AppText variant="caption" weight="semiBold" style={styles.detailLabel}>
                  Price
                </AppText>
                <View style={styles.priceInlineRow}>
                  <IndianRupee
                    size={normalize(12)}
                    color={colors.typographyColor['Color 2']}
                    strokeWidth={3}
                  />
                  <AppText variant="caption" weight="semiBold" style={[styles.detailValue, { color: colors.typographyColor['Color 2'], marginTop: normalize(-2) }]}>
                    {price} rupees
                  </AppText>
                </View>
              </View>
            ),
          )}

          <View style={styles.dividerLine} />

          <View style={[styles.detailRow, { marginTop: normalize(5) }]}>
            <AppText variant="body" weight="bold" style={styles.youPayLabel}>
              You Pay
            </AppText>
            <View style={styles.priceInlineRow}>
              <IndianRupee
                size={normalize(14)}
                color={colors.blue[600]}
                strokeWidth={3}
                style={{ marginTop: normalize(2) }}
              />
              <AppText variant="body" weight="bold" style={styles.youPayAmount}>
                {price}
              </AppText>
            </View>
          </View>
        </View>

        {/* ── Select Date Card ─────────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <Calendar size={normalize(22)} color={colors.blue[800]} />
            </View>
            <AppText variant="h4" weight="bold" style={styles.cardTitle}>
              Select Date
            </AppText>
          </View>
          <SelectDatePicker
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            showLabel={false}
          />
        </View>

        {/* ── Select Time Slot Card ────────────────────────────────────── */}
        <View style={[styles.card, { borderRadius: normalize(28) }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { borderRadius: borderRadius.m }]}>
              <Clock size={normalize(22)} color={colors.blue[800]} />
            </View>
            <AppText variant="h4" weight="bold" style={styles.cardTitle}>
              Select Time Slot
            </AppText>
          </View>
          <SelectTimeSlot
            selectedSlot={selectedSlot}
            onSlotChange={setSelectedSlot}
            showLabel={false}
          />
        </View>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <CommonContinueButton label="Continue" onPress={handleContinue} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    paddingBottom: normalize(40),
    gap: normalize(14),
  },
  // ── Card ────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#FFFFFF',
    padding: normalize(24),
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: '#EDF3F7',
    paddingBottom: normalize(20),
    marginBottom: normalize(20)
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
    gap: normalize(10),
  },
  cardIconBg: {
    width: normalize(40),
    height: normalize(40),
    backgroundColor: colors.appThemeColor[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: normalize(14),
    color: colors.typographyColor.Medium,
  },
  // ── Session rows ─────────────────────────────────────────────────────────
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
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },
  priceInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(1),
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.tintsBlue[50],
    marginVertical: normalize(8),
  },
  youPayLabel: {
    fontSize: normalize(14),
    color: colors.typographyColor.Medium,
  },
  youPayAmount: {
    fontSize: normalize(15),
    color: colors.typographyColor['Color 2'],
  },
});
