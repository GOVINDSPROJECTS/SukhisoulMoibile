import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, User, RefreshCcw, CalendarPlus, Calendar, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const ReviewPreferencesScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const preferences = [
    {
      id: 1,
      title: '1ST PREFERENCE',
      icon: <User size={normalize(14)} color="#3B82F6" />,
      date: 'Wed, 22 May 2024',
      time: '04:00 PM – 05:00 PM'
    },
    {
      id: 2,
      title: '2ND PREFERENCE',
      icon: <RefreshCcw size={normalize(14)} color="#3B82F6" />,
      date: 'Fri, 24 May 2024',
      time: '11:00 AM – 12:00 PM'
    },
    {
      id: 3,
      title: '3RD PREFERENCE',
      icon: <CalendarPlus size={normalize(14)} color="#3B82F6" />,
      date: 'Mon, 27 May 2024',
      time: '03:00 PM – 04:00 PM'
    }
  ];

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
        
        <AppText family="primary" weight="bold" style={styles.screenTitle}>
          Review Preferences
        </AppText>
        <AppText family="primary" weight="medium" style={styles.screenSubtitle}>
          Review and change preference
        </AppText>

        {preferences.map((pref, index) => (
          <View key={pref.id} style={styles.preferenceCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapper}>
                {pref.icon}
              </View>
              <AppText family="primary" weight="bold" style={styles.preferenceLabel}>
                {pref.title}
              </AppText>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={normalize(14)} color="#1E62C4" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.detailText}>
                {pref.date}
              </AppText>
            </View>

            <View style={styles.detailRow}>
              <Clock size={normalize(14)} color="#1E62C4" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.detailText}>
                {pref.time}
              </AppText>
            </View>

            <TouchableOpacity style={styles.changeBtn} activeOpacity={0.7}>
              <AppText family="primary" weight="bold" style={styles.changeBtnText}>
                Change
              </AppText>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.continueBtn}
          onPress={() => navigation.navigate('AlternativesSentSuccessScreen')}
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
  screenTitle: {
    fontSize: normalize(16),
    color: '#1E293B',
    marginBottom: normalize(4),
  },
  screenSubtitle: {
    fontSize: normalize(12),
    color: '#94A3B8',
    marginBottom: normalize(24),
  },
  preferenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  iconWrapper: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(8),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  preferenceLabel: {
    fontSize: normalize(11),
    color: '#94A3B8',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  detailText: {
    fontSize: normalize(13),
    color: '#1E293B',
  },
  changeBtn: {
    marginTop: normalize(4),
    alignSelf: 'flex-start',
  },
  changeBtnText: {
    fontSize: normalize(12),
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
