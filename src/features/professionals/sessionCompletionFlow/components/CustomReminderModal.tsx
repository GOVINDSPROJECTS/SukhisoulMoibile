import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  X,
} from 'lucide-react-native';
import { colors } from '@/theme';

interface CustomReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (datetime: { date: string; time: string }) => void;
  initialDate?: string;
  initialTime?: string;
}

const DAYS_OF_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const HOURS_LIST = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const MINUTES_LIST = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const PERIODS_LIST: ('AM' | 'PM')[] = ['AM', 'PM'];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
}

// 5 rows of 7 days matching the screenshot:
// Row 1: 27, 28, 29, 30 (prev month), 1, 2, 3 (May)
// Row 2: 4, 5, 6, 7, 8, 9, 10
// Row 3: 11, 12, 13, 14 (selected), 15, 16, 17
// Row 4: 18, 19, 20, 21, 22, 23, 24
// Row 5: 25, 26, 27, 28, 29, 30, 31
const WEEKS_DATA: CalendarDay[][] = [
  [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
  ],
  [
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
  ],
  [
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true }, // Default selected day
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
  ],
  [
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
  ],
  [
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
  ],
];

type ActiveDropdown = 'hour' | 'minute' | 'period' | null;

export const CustomReminderModal: React.FC<CustomReminderModalProps> = ({
  visible,
  onClose,
  onConfirm,
  initialTime,
}) => {
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedHour, setSelectedHour] = useState(() => {
    if (initialTime && initialTime.includes(':')) {
      const [h] = initialTime.split(':');
      return h.trim().padStart(2, '0');
    }
    return '09';
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    if (initialTime && initialTime.includes(':')) {
      const parts = initialTime.split(':');
      if (parts[1]) {
        const [m] = parts[1].trim().split(' ');
        return m.padStart(2, '0');
      }
    }
    return '00';
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(() => {
    if (initialTime && initialTime.toUpperCase().includes('PM')) {
      return 'PM';
    }
    return 'AM';
  });

  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  const toggleHourDropdown = () => {
    setActiveDropdown((prev) => (prev === 'hour' ? null : 'hour'));
  };

  const toggleMinuteDropdown = () => {
    setActiveDropdown((prev) => (prev === 'minute' ? null : 'minute'));
  };

  const togglePeriodDropdown = () => {
    setActiveDropdown((prev) => (prev === 'period' ? null : 'period'));
  };

  const formattedSummary = `Wednesday, May ${selectedDay}, 2025 at ${selectedHour}:${selectedMinute} ${selectedPeriod}`;

  const handleConfirm = () => {
    onConfirm({
      date: `May ${selectedDay}, 2025`,
      time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
    });
    setActiveDropdown(null);
    onClose();
  };

  const handleModalClose = () => {
    setActiveDropdown(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleModalClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollInner}
                keyboardShouldPersistTaps="handled"
              >
                {/* Select Date Section */}
                <AppText family="secondary" weight="bold" style={styles.sectionHeading}>
                  Select Date
                </AppText>

                {/* Month Selector Row */}
                <View style={styles.monthRow}>
                  <TouchableOpacity style={styles.navArrow} activeOpacity={0.6}>
                    <ChevronLeft size={normalize(18)} color="#334155" />
                  </TouchableOpacity>
                  <AppText family="secondary" weight="bold" style={styles.monthText}>
                    May 2025
                  </AppText>
                  <TouchableOpacity style={styles.navArrow} activeOpacity={0.6}>
                    <ChevronRight size={normalize(18)} color="#334155" />
                  </TouchableOpacity>
                </View>

                {/* Weekday Labels Header Row (aligned 7 columns) */}
                <View style={styles.weekRow}>
                  {DAYS_OF_WEEK.map((w) => (
                    <View key={w} style={styles.dayCol}>
                      <AppText family="secondary" weight="medium" style={styles.weekdayText}>
                        {w}
                      </AppText>
                    </View>
                  ))}
                </View>

                {/* Calendar Weeks Grid (Row by Row) */}
                <View style={styles.calendarContainer}>
                  {WEEKS_DATA.map((week, wIdx) => (
                    <View key={wIdx} style={styles.weekRow}>
                      {week.map((item, dIdx) => {
                        const isSelected = item.isCurrentMonth && item.day === selectedDay;
                        return (
                          <TouchableOpacity
                            key={dIdx}
                            style={styles.dayCol}
                            disabled={!item.isCurrentMonth}
                            onPress={() => item.isCurrentMonth && setSelectedDay(item.day)}
                            activeOpacity={0.7}
                          >
                            <View style={[styles.dayCell, isSelected && styles.dayCellSelected]}>
                              <AppText
                                family="secondary"
                                weight={isSelected ? 'bold' : 'regular'}
                                style={[
                                  styles.dayText,
                                  !item.isCurrentMonth && styles.dayTextFaded,
                                  isSelected && styles.dayTextSelected,
                                ]}
                              >
                                {item.day}
                              </AppText>
                              {isSelected && <View style={styles.selectedUnderline} />}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))}
                </View>

                {/* Select Time Section */}
                <View style={styles.timeSectionHeaderRow}>
                  <AppText family="secondary" weight="bold" style={styles.sectionHeading}>
                    Select Time
                  </AppText>
                  {activeDropdown && (
                    <TouchableOpacity
                      onPress={() => setActiveDropdown(null)}
                      style={styles.closePickerLink}
                    >
                      <AppText family="secondary" weight="medium" style={styles.closePickerLinkText}>
                        Close Picker
                      </AppText>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.timeDropdownsRow}>
                  {/* Hour Box */}
                  <TouchableOpacity
                    style={[
                      styles.timeBox,
                      activeDropdown === 'hour' && styles.timeBoxActive,
                    ]}
                    onPress={toggleHourDropdown}
                    activeOpacity={0.7}
                  >
                    <Clock
                      size={normalize(14)}
                      color={activeDropdown === 'hour' ? '#2563EB' : '#64748B'}
                      style={styles.timeBoxIcon}
                    />
                    <AppText
                      family="secondary"
                      weight={activeDropdown === 'hour' ? 'bold' : 'medium'}
                      style={[
                        styles.timeBoxText,
                        activeDropdown === 'hour' && styles.timeBoxTextActive,
                      ]}
                    >
                      {selectedHour}
                    </AppText>
                    {activeDropdown === 'hour' ? (
                      <ChevronUp size={normalize(14)} color="#2563EB" />
                    ) : (
                      <ChevronDown size={normalize(14)} color="#64748B" />
                    )}
                  </TouchableOpacity>

                  <AppText family="secondary" weight="bold" style={styles.colonText}>
                    :
                  </AppText>

                  {/* Minute Box */}
                  <TouchableOpacity
                    style={[
                      styles.timeBox,
                      activeDropdown === 'minute' && styles.timeBoxActive,
                    ]}
                    onPress={toggleMinuteDropdown}
                    activeOpacity={0.7}
                  >
                    <AppText
                      family="secondary"
                      weight={activeDropdown === 'minute' ? 'bold' : 'medium'}
                      style={[
                        styles.timeBoxText,
                        activeDropdown === 'minute' && styles.timeBoxTextActive,
                      ]}
                    >
                      {selectedMinute}
                    </AppText>
                    {activeDropdown === 'minute' ? (
                      <ChevronUp size={normalize(14)} color="#2563EB" />
                    ) : (
                      <ChevronDown size={normalize(14)} color="#64748B" />
                    )}
                  </TouchableOpacity>

                  {/* Period Box (AM/PM) */}
                  <TouchableOpacity
                    style={[
                      styles.timeBox,
                      activeDropdown === 'period' && styles.timeBoxActive,
                    ]}
                    onPress={togglePeriodDropdown}
                    activeOpacity={0.7}
                  >
                    <AppText
                      family="secondary"
                      weight={activeDropdown === 'period' ? 'bold' : 'medium'}
                      style={[
                        styles.timeBoxText,
                        activeDropdown === 'period' && styles.timeBoxTextActive,
                      ]}
                    >
                      {selectedPeriod}
                    </AppText>
                    {activeDropdown === 'period' ? (
                      <ChevronUp size={normalize(14)} color="#2563EB" />
                    ) : (
                      <ChevronDown size={normalize(14)} color="#64748B" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Interactive Time Selector Drawer (Visible when tapping any time box) */}
                {activeDropdown !== null && (
                  <View style={styles.timeSelectorDrawer}>
                    {/* Switcher Tabs */}
                    <View style={styles.pickerTabsRow}>
                      <TouchableOpacity
                        style={[
                          styles.pickerTab,
                          activeDropdown === 'hour' && styles.pickerTabActive,
                        ]}
                        onPress={() => setActiveDropdown('hour')}
                        activeOpacity={0.7}
                      >
                        <AppText
                          family="secondary"
                          weight={activeDropdown === 'hour' ? 'bold' : 'medium'}
                          style={[
                            styles.pickerTabText,
                            activeDropdown === 'hour' && styles.pickerTabTextActive,
                          ]}
                        >
                          Hour: {selectedHour}
                        </AppText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.pickerTab,
                          activeDropdown === 'minute' && styles.pickerTabActive,
                        ]}
                        onPress={() => setActiveDropdown('minute')}
                        activeOpacity={0.7}
                      >
                        <AppText
                          family="secondary"
                          weight={activeDropdown === 'minute' ? 'bold' : 'medium'}
                          style={[
                            styles.pickerTabText,
                            activeDropdown === 'minute' && styles.pickerTabTextActive,
                          ]}
                        >
                          Minute: {selectedMinute}
                        </AppText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.pickerTab,
                          activeDropdown === 'period' && styles.pickerTabActive,
                        ]}
                        onPress={() => setActiveDropdown('period')}
                        activeOpacity={0.7}
                      >
                        <AppText
                          family="secondary"
                          weight={activeDropdown === 'period' ? 'bold' : 'medium'}
                          style={[
                            styles.pickerTabText,
                            activeDropdown === 'period' && styles.pickerTabTextActive,
                          ]}
                        >
                          {selectedPeriod}
                        </AppText>
                      </TouchableOpacity>
                    </View>

                    {/* Hour Options Grid */}
                    {activeDropdown === 'hour' && (
                      <View style={styles.pickerOptionsContainer}>
                        <AppText family="secondary" weight="medium" style={styles.pickerSubtitle}>
                          Select Hour (01 - 12):
                        </AppText>
                        <View style={styles.gridOptionsRow}>
                          {HOURS_LIST.map((h) => {
                            const isSel = selectedHour === h;
                            return (
                              <TouchableOpacity
                                key={h}
                                style={[styles.timeChip, isSel && styles.timeChipActive]}
                                onPress={() => {
                                  setSelectedHour(h);
                                  // Auto-advance to minute selector for effortless UX
                                  setActiveDropdown('minute');
                                }}
                                activeOpacity={0.7}
                              >
                                <AppText
                                  family="secondary"
                                  weight={isSel ? 'bold' : 'medium'}
                                  style={[styles.timeChipText, isSel && styles.timeChipTextActive]}
                                >
                                  {h}
                                </AppText>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}

                    {/* Minute Options Grid */}
                    {activeDropdown === 'minute' && (
                      <View style={styles.pickerOptionsContainer}>
                        <AppText family="secondary" weight="medium" style={styles.pickerSubtitle}>
                          Select Minute:
                        </AppText>
                        <View style={styles.gridOptionsRow}>
                          {MINUTES_LIST.map((m) => {
                            const isSel = selectedMinute === m;
                            return (
                              <TouchableOpacity
                                key={m}
                                style={[styles.timeChip, isSel && styles.timeChipActive]}
                                onPress={() => setSelectedMinute(m)}
                                activeOpacity={0.7}
                              >
                                <AppText
                                  family="secondary"
                                  weight={isSel ? 'bold' : 'medium'}
                                  style={[styles.timeChipText, isSel && styles.timeChipTextActive]}
                                >
                                  {m}
                                </AppText>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}

                    {/* Period (AM/PM) Selector */}
                    {activeDropdown === 'period' && (
                      <View style={styles.pickerOptionsContainer}>
                        <AppText family="secondary" weight="medium" style={styles.pickerSubtitle}>
                          Select Period:
                        </AppText>
                        <View style={styles.periodRow}>
                          {PERIODS_LIST.map((p) => {
                            const isSel = selectedPeriod === p;
                            return (
                              <TouchableOpacity
                                key={p}
                                style={[styles.periodChip, isSel && styles.periodChipActive]}
                                onPress={() => {
                                  setSelectedPeriod(p);
                                  setActiveDropdown(null);
                                }}
                                activeOpacity={0.7}
                              >
                                <AppText
                                  family="secondary"
                                  weight={isSel ? 'bold' : 'medium'}
                                  style={[
                                    styles.periodChipText,
                                    isSel && styles.periodChipTextActive,
                                  ]}
                                >
                                  {p}
                                </AppText>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}

                    {/* Set Time Done Button */}
                    <View style={styles.pickerFooterRow}>
                      <TouchableOpacity
                        style={styles.setDoneBtn}
                        onPress={() => setActiveDropdown(null)}
                        activeOpacity={0.7}
                      >
                        <Check size={normalize(13)} color="#FFFFFF" style={{ marginRight: normalize(4) }} />
                        <AppText family="secondary" weight="bold" style={styles.setDoneBtnText}>
                          Done
                        </AppText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Selected Reminder Banner */}
                <View style={styles.summaryRow}>
                  <View style={styles.calIconBox}>
                    <CalendarIcon size={normalize(16)} color="#2563EB" />
                  </View>
                  <View style={styles.summaryTextCol}>
                    <AppText family="secondary" weight="regular" style={styles.summaryLabel}>
                      REMINDER SET FOR
                    </AppText>
                    <AppText family="secondary" weight="medium" style={styles.summaryValue}>
                      {formattedSummary}
                    </AppText>
                  </View>
                </View>

                {/* Cancel & Confirm Action Buttons */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <AppText family="secondary" weight="bold" style={styles.cancelBtnText}>
                      Cancel
                    </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={handleConfirm}
                    activeOpacity={0.8}
                  >
                    <AppText family="secondary" weight="bold" style={styles.confirmBtnText}>
                      Confirm
                    </AppText>
                  </TouchableOpacity>
                </View>

                {/* Bottom Custom Reminder Banner with Close X */}
                <View style={styles.bottomBanner}>
                  <View style={styles.calIconBox}>
                    <CalendarIcon size={normalize(16)} color="#2563EB" />
                  </View>
                  <View style={styles.bottomBannerTextCol}>
                    <AppText family="secondary" weight="bold" style={styles.bottomBannerTitle}>
                      Custom Reminder
                    </AppText>
                    <AppText family="secondary" weight="regular" style={styles.bottomBannerSubtitle}>
                      Select date and time for the reminder
                    </AppText>
                  </View>
                  <TouchableOpacity onPress={onClose} style={styles.closeXBtn}>
                    <X size={normalize(16)} color="#64748B" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
  },
  modalCard: {
    width: '100%',
    maxWidth: normalize(340),
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(16),
    paddingTop: normalize(18),
    paddingBottom: normalize(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  scrollInner: {
    paddingBottom: normalize(4),
  },
  sectionHeading: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(10),
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  navArrow: {
    padding: normalize(4),
  },
  monthText: {
    fontSize: normalize(13),
    color: '#1E293B',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(6),
  },
  dayCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    textAlign: 'center',
    fontSize: normalize(9.5),
    color: colors.typographyColor.Medium,
  },
  calendarContainer: {
    marginBottom: normalize(12),
  },
  dayCell: {
    width: normalize(28),
    height: normalize(26),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayCellSelected: {
    // container
  },
  dayText: {
    fontSize: normalize(11),
    color: '#334155',
  },
  dayTextFaded: {
    color: '#CBD5E1',
  },
  dayTextSelected: {
    color: colors.typographyColor['Dark 2'],
  },
  selectedUnderline: {
    position: 'absolute',
    bottom: 0,
    width: normalize(14),
    height: 2,
    backgroundColor: colors.typographyColor['Dark 2'],
    borderRadius: 1,
  },
  timeSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  closePickerLink: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(6),
  },
  closePickerLinkText: {
    fontSize: normalize(11),
    color: colors.typographyColor['Dark 2'],
  },
  timeDropdownsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
    gap: normalize(10)
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    minWidth: normalize(72),
    backgroundColor: '#FFFFFF',
    flex: 1.
  },
  timeBoxActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  timeBoxIcon: {
    marginRight: normalize(4),
  },
  timeBoxText: {
    fontSize: normalize(12),
    color: '#1E293B',
  },
  timeBoxTextActive: {
    color: colors.typographyColor['Dark 2'],
    fontWeight: 'bold',
  },
  colonText: {
    fontSize: normalize(14),
    color: colors.typographyColor.Medium,
  },
  timeSelectorDrawer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(12),
    padding: normalize(10),
    marginBottom: normalize(14),
  },
  pickerTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E2E8F0',
    borderRadius: normalize(8),
    padding: 2,
    marginBottom: normalize(10),
  },
  pickerTab: {
    flex: 1,
    paddingVertical: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(6),
  },
  pickerTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerTabText: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  pickerTabTextActive: {
    color: colors.typographyColor['Dark 2'],
    fontWeight: 'bold',
  },
  pickerOptionsContainer: {
    marginBottom: normalize(6),
  },
  pickerSubtitle: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(8),
  },
  gridOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -normalize(2),
  },
  timeChip: {
    width: '23%',
    marginHorizontal: '1%',
    marginBottom: normalize(6),
    paddingVertical: normalize(8),
    borderRadius: normalize(8),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeChipActive: {
    backgroundColor: colors.typographyColor['Dark 2'],
    borderColor: '#2563EB',
  },
  timeChipText: {
    fontSize: normalize(11.5),
    color: '#334155',
  },
  timeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: normalize(4),
  },
  periodChip: {
    flex: 1,
    marginHorizontal: normalize(4),
    paddingVertical: normalize(10),
    borderRadius: normalize(8),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodChipActive: {
    backgroundColor: colors.typographyColor['Dark 2'],
    borderColor: '#2563EB',
  },
  periodChipText: {
    fontSize: normalize(12.5),
    color: '#334155',
  },
  periodChipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pickerFooterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: normalize(6),
  },
  setDoneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.typographyColor['Dark 2'],
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(6),
  },
  setDoneBtnText: {
    fontSize: normalize(11),
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  calIconBox: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  summaryTextCol: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(0),
  },
  summaryValue: {
    fontSize: normalize(11.5),
    color: colors.typographyColor.Black,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    paddingVertical: normalize(11),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: normalize(8),
  },
  cancelBtnText: {
    fontSize: normalize(13),
    color: '#1E293B',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: colors.typographyColor['Dark 2'],
    borderRadius: normalize(12),
    paddingVertical: normalize(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(8),
  },
  confirmBtnText: {
    fontSize: normalize(13),
    color: '#FFFFFF',
  },
  bottomBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(10),
    padding: normalize(8),
    backgroundColor: '#FFFFFF',
  },
  bottomBannerTextCol: {
    flex: 1,
  },
  bottomBannerTitle: {
    fontSize: normalize(11.5),
    color: '#1E293B',
  },
  bottomBannerSubtitle: {
    fontSize: normalize(9.5),
    color: colors.typographyColor.Medium,
  },
  closeXBtn: {
    padding: normalize(4),
  },
});
