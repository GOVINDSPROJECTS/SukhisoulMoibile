import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { TherapistOverviewCard } from '../components/TherapistOverviewCard';
import { SessionPurposeCard } from '../components/SessionPurposeCard';

export const MyTherapistScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleReschedule = () => {
    navigation.navigate('SuggestAlternativesScreen');
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Top Header with Gradient */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],

        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color="#155B92" />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            My Therapist
          </AppText>

          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <LinearGradient
          colors={[
            colors.tintsBlue[400],
            colors.appThemeColor[75],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.1 }}
          style={styles.contentGradient}
        >
          {/* Main Therapist Card */}
          <TherapistOverviewCard
            name="Prathamesh Deokar"
            specialty={"Individual Therapy • Cognitive\nBehavioral Approach"}
            avatarUri="https://i.pravatar.cc/150?u=prathmesh"
            isOnline={true}
            statusBadgeText="Upcoming"
            sessionDate="Mon, 20 May 2024"
            sessionTime="04:00 PM – 05:00 PM"
            sessionLocation="Online Session"
            onViewProfile={() => { }}
            onPreviousNotes={() => { }}
          />

          {/* Session Purpose Card */}
          <SessionPurposeCard
            label="SESSION PURPOSE"
            purpose="Anxiety & Stress Management"
          />

          {/* Reschedule Action Button */}
          <TouchableOpacity
            style={styles.rescheduleActionBtn}
            activeOpacity={0.8}
            onPress={handleReschedule}
          >
            <AppText family="secondary" weight="bold" style={styles.rescheduleBtnText}>
              Reschedule
            </AppText>
          </TouchableOpacity>



          <View style={{ marginVertical: normalize(15) }}>
            <AppText family="secondary" weight="regular" style={{ color: 'red', textAlign: 'center', fontSize: normalize(11) }}>
              DEV ONLY : HIDE/SHOW below cards & above button after apointment reschedule.
            </AppText>
          </View>

          {/* HIDE/SHOW as per requirement. DEV ONLY COMMENT */}

          <View style={styles.successCard}>
            <AppText family="secondary" weight="regular" style={styles.successCardText}>
              This appointment is rescheduled.
            </AppText>
          </View>

        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: normalize(14),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(16.5),
    color: '#155B92',
    letterSpacing: -0.2,
  },
  headerRight: {
    width: normalize(28),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentGradient: {
    flex: 1,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },
  rescheduleActionBtn: {
    backgroundColor: '#1C6199',
    borderRadius: normalize(28),
    height: normalize(52),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1C6199',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  rescheduleBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
  successCard: {
    backgroundColor: colors.green[50],
    borderRadius: normalize(16),
    padding: normalize(15),
    paddingHorizontal: normalize(16),

  },
  successCardText: {
    color: colors.green[900],
    textAlign: 'center',
    fontSize: normalize(12)
  }
});
