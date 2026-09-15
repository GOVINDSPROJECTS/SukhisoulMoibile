import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Hourglass, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const AlternativesSentSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

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
            onPress={() => navigation.navigate('TherapistApprovalDashboard')}
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

      <View style={styles.contentContainer}>
        
        <View style={styles.graphicContainer}>
          <View style={styles.yellowCircle}>
            <Hourglass size={normalize(56)} color="#B45309" />
          </View>
        </View>

        <AppText family="primary" weight="bold" style={styles.title}>
          Alternative time slots sent!
        </AppText>

        <AppText family="primary" weight="medium" style={styles.subtitle}>
          Adharva Dikshit will receive the{'\n'}alternative options and can choose a{'\n'}suitable slot.
        </AppText>

        <View style={styles.statusBox}>
          <View style={styles.statusHeader}>
            <Clock size={normalize(14)} color="#2563EB" style={{ marginRight: normalize(8) }} />
            <AppText family="primary" weight="bold" style={styles.statusLabel}>
              Status
            </AppText>
          </View>
          <AppText family="primary" weight="medium" style={styles.statusText}>
            Waiting for patient confirmation
          </AppText>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate('TherapistApprovalDashboard')}
          activeOpacity={0.8}
        >
          <AppText family="primary" weight="bold" style={styles.dashboardBtnText}>
            Back to Dashboard
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
    paddingHorizontal: normalize(24),
    paddingTop: normalize(40),
    paddingBottom: normalize(24),
    alignItems: 'center',
  },
  graphicContainer: {
    marginBottom: normalize(32),
  },
  yellowCircle: {
    width: normalize(140),
    height: normalize(140),
    borderRadius: normalize(70),
    backgroundColor: '#FDE68A', // Light yellow
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(20),
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: normalize(28),
    marginBottom: normalize(12),
  },
  subtitle: {
    fontSize: normalize(12),
    color: '#64748B',
    textAlign: 'center',
    lineHeight: normalize(18),
    marginBottom: normalize(32),
  },
  statusBox: {
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(12),
    padding: normalize(16),
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  statusLabel: {
    fontSize: normalize(12),
    color: '#2563EB',
  },
  statusText: {
    fontSize: normalize(13),
    color: '#475569',
    marginLeft: normalize(22), // Align under the text, offset by icon size
  },
  spacer: {
    flex: 1,
  },
  dashboardBtn: {
    width: '100%',
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(16),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  dashboardBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
