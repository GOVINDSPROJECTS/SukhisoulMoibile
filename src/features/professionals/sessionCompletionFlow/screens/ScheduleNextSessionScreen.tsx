import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { ScheduleNextSessionCard, ScheduleOption } from '../components/ScheduleNextSessionCard';
import { DateTimeSelectorSection } from '../components/DateTimeSelectorSection';
import { SessionReminderSection } from '../components/SessionReminderSection';

export const ScheduleNextSessionScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [selectedOption, setSelectedOption] = useState<ScheduleOption>('yes');

  const handleScheduleNextSession = () => {
    Alert.alert(
      'Schedule Next Session',
      'Proceeding to schedule the next appointment for the client.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TherapistApprovalDashboard'),
        },
      ]
    );
  };

  const handleSaveReminder = () => {
    Alert.alert(
      'Session Completed',
      'Follow-up schedule and reminder settings have been saved successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TherapistApprovalDashboard'),
        },
      ]
    );
  };

  const isYesSelected = selectedOption === 'yes';

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
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
            {isYesSelected ? 'End session' : 'Task'}
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Card: Schedule Next Session */}
        <ScheduleNextSessionCard
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
        />

        {/* Dynamic content depending on Yes vs No */}
        {isYesSelected ? (
          /* "Yes" Selected Layout - Matches Screenshot 1 */
          <View style={styles.yesContentContainer}>
            <TouchableOpacity
              style={styles.scheduleBtn}
              onPress={handleScheduleNextSession}
              activeOpacity={0.8}
            >
              <AppText family="primary" weight="bold" style={styles.scheduleBtnText}>
                Schedule Next Session
              </AppText>
            </TouchableOpacity>

            <AppText family="primary" weight="medium" style={styles.securityText}>
              ALL INFORMATION IS SECURE AND ENCRYPTED
            </AppText>
          </View>
        ) : (
          /* "No" Selected Layout - Matches Screenshot 2 */
          <View style={styles.noContentContainer}>
            <View style={styles.mainConfigCard}>
              <DateTimeSelectorSection />
              <SessionReminderSection />
            </View>

            <TouchableOpacity
              style={styles.saveOutlineBtn}
              onPress={handleSaveReminder}
              activeOpacity={0.8}
            >
              <AppText family="primary" weight="bold" style={styles.saveOutlineBtnText}>
                Save
              </AppText>
            </TouchableOpacity>
          </View>
        )}
        {/* </LinearGradient> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
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
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
    backgroundColor: colors.appThemeColor[75]
  },
  gradientBg: {
  },
  yesContentContainer: {
    marginTop: normalize(8),
  },
  scheduleBtn: {
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(15),
    borderRadius: normalize(28),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D64B5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    marginTop: normalize(20),
    marginBottom: normalize(18),
  },
  scheduleBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
  securityText: {
    fontSize: normalize(10.5),
    color: '#5B7B9A',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  noContentContainer: {
    marginTop: normalize(8),
  },
  mainConfigCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    paddingVertical: normalize(30),
    marginTop: normalize(8),
    marginBottom: normalize(24),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  saveOutlineBtn: {
    borderWidth: 1.5,
    borderColor: colors.typographyColor['Dark 2'],
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(10),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
  },
  saveOutlineBtnText: {
    color: '#1D64B5',
    fontSize: normalize(15),
  },
});
