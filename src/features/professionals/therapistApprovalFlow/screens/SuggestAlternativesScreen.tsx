import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const SuggestAlternativesScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  
  const [expandedPref, setExpandedPref] = useState<number>(2);

  // Mock state for selected dates/times for each preference
  const [pref1Date, setPref1Date] = useState('12');
  const [pref1Time, setPref1Time] = useState('11:00 AM');
  
  const [pref2Date, setPref2Date] = useState('12');
  const [pref2Time, setPref2Time] = useState('11:00 AM');
  
  const [pref3Date, setPref3Date] = useState('');
  const [pref3Time, setPref3Time] = useState('');

  const dates = [
    { day: 'MON', date: '10' },
    { day: 'TUE', date: '11' },
    { day: 'WED', date: '12' },
    { day: 'THU', date: '13' },
  ];

  const times = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const renderExpandedSection = (
    title: string, 
    selectedDate: string, 
    setSelectedDate: (d: string) => void, 
    selectedTime: string, 
    setSelectedTime: (t: string) => void
  ) => (
    <View style={styles.expandedSection}>
      <AppText family="primary" weight="bold" style={styles.preferenceSectionTitle}>
        {title}
      </AppText>
      
      <AppText family="primary" weight="medium" style={styles.subHeading}>
        CHOOSE DATE
      </AppText>

      {/* Date Selector */}
      <View style={styles.dateSelectorContainer}>
        <TouchableOpacity style={styles.navArrowBtn}>
          <ChevronLeft size={normalize(16)} color="#94A3B8" />
        </TouchableOpacity>
        
        <View style={styles.datesRow}>
          {dates.map((item, index) => {
            const isSelected = selectedDate === item.date;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.dateItem, isSelected && styles.dateItemSelected]}
                onPress={() => setSelectedDate(item.date)}
                activeOpacity={0.8}
              >
                <AppText 
                  family="primary" 
                  weight="medium" 
                  style={[styles.dateDayText, isSelected && styles.textWhite]}
                >
                  {item.day}
                </AppText>
                <AppText 
                  family="primary" 
                  weight="bold" 
                  style={[styles.dateNumText, isSelected && styles.textWhite]}
                >
                  {item.date}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.navArrowBtn}>
          <ChevronRight size={normalize(16)} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Time Selector Grid */}
      <View style={styles.timeGrid}>
        {times.map((time, index) => {
          const isSelected = selectedTime === time;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.timeItem, isSelected && styles.timeItemSelected]}
              onPress={() => setSelectedTime(time)}
              activeOpacity={0.8}
            >
              <AppText 
                family="primary" 
                weight={isSelected ? "bold" : "medium"} 
                style={[styles.timeItemText, isSelected && styles.textWhite]}
              >
                {time}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Slot Summary */}
      {selectedDate && selectedTime && (
        <View style={styles.selectedSlotBox}>
          <View>
            <AppText family="primary" weight="bold" style={styles.selectedSlotTitle}>
              Selected Slot
            </AppText>
            <AppText family="primary" weight="medium" style={styles.selectedSlotSub}>
              wed, Oct {selectedDate}
            </AppText>
          </View>
          <AppText family="primary" weight="bold" style={styles.selectedSlotTime}>
            {selectedTime}
          </AppText>
        </View>
      )}
    </View>
  );

  const renderSummarySection = (
    title: string, 
    selectedDate: string, 
    selectedTime: string, 
    onExpand: () => void
  ) => (
    <TouchableOpacity style={styles.expandedSection} onPress={onExpand} activeOpacity={0.8}>
      <AppText family="primary" weight="bold" style={styles.preferenceSectionTitle}>
        {title}
      </AppText>
      
      <View style={styles.selectedSlotBox}>
        <View>
          <AppText family="primary" weight="bold" style={styles.selectedSlotTitle}>
            Selected Slot
          </AppText>
          <AppText family="primary" weight="medium" style={styles.selectedSlotSub}>
            wed, Oct {selectedDate}
          </AppText>
        </View>
        <AppText family="primary" weight="bold" style={styles.selectedSlotTime}>
          {selectedTime}
        </AppText>
      </View>
    </TouchableOpacity>
  );

  const renderDashedAddButton = (title: string, onExpand: () => void) => (
    <View style={styles.dashedBtnContainer}>
      <AppText family="primary" weight="bold" style={styles.preferenceSectionTitle}>
        {title}
      </AppText>
      <TouchableOpacity style={styles.dashedBtn} activeOpacity={0.7} onPress={onExpand}>
        <Plus size={normalize(16)} color="#2563EB" style={{ marginRight: normalize(8) }} />
        <AppText family="primary" weight="bold" style={styles.dashedBtnText}>
          Add Preference
        </AppText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header Gradient Block */}
      <LinearGradient 
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>
          
          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Reschedule Appointment
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1st Preference */}
        {expandedPref === 1 
          ? renderExpandedSection("1st Preference", pref1Date, setPref1Date, pref1Time, setPref1Time)
          : pref1Date 
            ? renderSummarySection("1st Preference", pref1Date, pref1Time, () => setExpandedPref(1))
            : renderDashedAddButton("Add 1st Preference", () => setExpandedPref(1))
        }

        {/* 2nd Preference */}
        {expandedPref === 2 
          ? renderExpandedSection("2nd Preference", pref2Date, setPref2Date, pref2Time, setPref2Time)
          : pref2Date 
            ? renderSummarySection("2nd Preference", pref2Date, pref2Time, () => setExpandedPref(2))
            : renderDashedAddButton("Add 2nd Preference", () => setExpandedPref(2))
        }

        {/* 3rd Preference */}
        {expandedPref === 3 
          ? renderExpandedSection("Add 3rd Preference", pref3Date, setPref3Date, pref3Time, setPref3Time)
          : pref3Date 
            ? renderSummarySection("3rd Preference", pref3Date, pref3Time, () => setExpandedPref(3))
            : renderDashedAddButton("Add 3rd Preference", () => setExpandedPref(3))
        }

      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.continueBtn}
          onPress={() => navigation.navigate('ReviewPreferencesScreen')}
          activeOpacity={0.8}
        >
          <AppText family="primary" weight="bold" style={styles.continueBtnText}>
            Continue
          </AppText>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    paddingBottom: normalize(40),
  },
  expandedSection: {
    marginBottom: normalize(24),
  },
  preferenceSectionTitle: {
    fontSize: normalize(14),
    color: '#1E293B',
    marginBottom: normalize(16),
  },
  subHeading: {
    fontSize: normalize(10),
    color: '#64748B',
    marginBottom: normalize(16),
    textTransform: 'uppercase',
  },
  dateSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(24),
  },
  navArrowBtn: {
    padding: normalize(4),
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: normalize(12),
  },
  dateItem: {
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(12),
    alignItems: 'center',
    width: normalize(52),
  },
  dateItemSelected: {
    backgroundColor: '#1E62C4', // Shadow would go here if needed
    elevation: 3,
    shadowColor: '#1E62C4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dateDayText: {
    fontSize: normalize(10),
    color: '#64748B',
    marginBottom: normalize(2),
  },
  dateNumText: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(12),
    marginBottom: normalize(24),
    justifyContent: 'space-between',
  },
  timeItem: {
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(8),
    paddingVertical: normalize(12),
    alignItems: 'center',
    width: '30%',
  },
  timeItemSelected: {
    backgroundColor: '#1E62C4',
    elevation: 3,
    shadowColor: '#1E62C4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  timeItemText: {
    fontSize: normalize(12),
    color: '#475569',
  },
  selectedSlotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EBF3FF',
    borderRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
  },
  selectedSlotTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  selectedSlotSub: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  selectedSlotTime: {
    fontSize: normalize(14),
    color: '#1E62C4',
  },
  dashedBtnContainer: {
    marginBottom: normalize(24),
  },
  dashedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#94A3B8',
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    backgroundColor: '#FFFFFF',
  },
  dashedBtnText: {
    fontSize: normalize(14),
    color: '#2563EB',
  },
  footerContainer: {
    paddingHorizontal: normalize(24),
    paddingTop: normalize(16),
    paddingBottom: Platform.OS === 'ios' ? normalize(16) : normalize(24),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  continueBtn: {
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(16),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
