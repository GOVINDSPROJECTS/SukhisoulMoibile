import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { UpcomingSessionCard } from '../components/UpcomingSessionCard';
import { BookingRequestCard } from '../components/BookingRequestCard';
import { RescheduleAlertBanner } from '../components/RescheduleAlertBanner';
import { DailyAgendaTimeline } from '../components/DailyAgendaTimeline';
import { RecentMessageItem } from '../components/RecentMessageItem';

export const TherapistApprovalDashboard: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView 
      style={[styles.safeArea, { backgroundColor: '#EAF2F9' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#EAF2F9" translucent={false} />
      <View style={{ paddingTop: insets.top }} />
      
      {/* Header Gradient Block */}
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
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>
          
          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Dashboard
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <UpcomingSessionCard />

        {/* Booking Requests */}
        <View style={styles.sectionHeader}>
          <AppText family="primary" weight="bold" style={styles.sectionTitle}>
            Booking Requests
          </AppText>
          <TouchableOpacity style={styles.seeAllBtn}>
            <AppText family="primary" weight="bold" style={styles.seeAllText}>
              See All
            </AppText>
          </TouchableOpacity>
        </View>

        <BookingRequestCard 
          name="Prathmesh Deokar"
          details="24 April at 10:00 AM • 45 Min Session"
          initials="PD"
          avatarColor="#E0F2FE"
        />

        <BookingRequestCard 
          name="Clarique Bhanadrakal"
          details="24 April at 12:00 PM • Initial Therapy"
          initials="CB"
          avatarColor="#E0EAFF"
        />

        {/* Reschedule Requests */}
        <View style={styles.sectionHeader}>
          <AppText family="primary" weight="bold" style={styles.sectionTitle}>
            Reschedule Requests
          </AppText>
        </View>
        <RescheduleAlertBanner />

        {/* Daily Agenda */}
        <DailyAgendaTimeline />

        {/* Recent Messages */}
        <View style={styles.sectionHeader}>
          <AppText family="primary" weight="bold" style={styles.sectionTitle}>
            Recent Messages
          </AppText>
          <TouchableOpacity>
            <AppText family="primary" weight="bold" style={styles.openChatText}>
              Open Chat
            </AppText>
          </TouchableOpacity>
        </View>

        <RecentMessageItem 
          name="Samantha Reed"
          message="Thank you for the link. I have one more doubt..."
          time="11:32 AM"
          initials="SR"
          avatarColor="#E0F2FE"
          isUnread={true}
        />

        <RecentMessageItem 
          name="James Miller"
          message="Could you please share the report..."
          time="09:15 AM"
          initials="JM"
          avatarColor="#DCFCE7"
          isUnread={true}
        />

        <RecentMessageItem 
          name="Prathmesh Deokar"
          message="Good to read the article you..."
          time="Yesterday"
          initials="PD"
          avatarColor="#FFEDD5"
          isUnread={false}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
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
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(40),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
    marginTop: normalize(8),
  },
  sectionTitle: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  seeAllBtn: {
    backgroundColor: '#1E62C4',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
    borderRadius: normalize(12),
  },
  seeAllText: {
    fontSize: normalize(10),
    color: '#FFFFFF',
  },
  openChatText: {
    fontSize: normalize(11),
    color: '#1E62C4',
  },
});
