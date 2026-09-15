import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, X, Check, Calendar, Clock } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api/client';

export const ConfirmApprovalScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route?.params;
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

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
            Confirm Approval
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <View style={styles.darkBackground}>
        {/* Placeholder for top content like patient mini card if it exists in the dark area, based on standard design */}
        <View style={styles.patientMiniCard}>
            <View style={styles.avatarRow}>
                <View style={styles.avatarPlaceholder} />
                <View style={styles.patientDetails}>
                    <AppText family="primary" weight="bold" style={styles.patientName}>Prathamesh Deokar</AppText>
                    <AppText family="primary" weight="medium" style={styles.patientId}>Patient ID: P10234</AppText>
                </View>
                <TouchableOpacity style={styles.viewProfileBtn}>
                    <AppText family="primary" weight="bold" style={styles.viewProfileText}>View Profile</AppText>
                </TouchableOpacity>
            </View>
        </View>


        <View style={styles.bottomSheet}>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <X size={normalize(20)} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Check size={normalize(24)} color="#16A34A" />
              </View>
            </View>
          </View>

          <AppText family="primary" weight="bold" style={styles.title}>
            Approve this{'\n'}reschedule request?
          </AppText>

          <AppText family="primary" weight="medium" style={styles.subtitle}>
            This will reschedule the appointment to:
          </AppText>

          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Calendar size={normalize(14)} color="#065F46" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.detailText}>
                {params?.fullDateLabel || params?.dayLabel || params?.date || 'Upcoming Date'}
              </AppText>
            </View>
            <View style={[styles.detailRow, { marginBottom: 0 }]}>
              <Clock size={normalize(14)} color="#065F46" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.detailText}>
                {params?.time || params?.timeSlot || '10:00 AM – 11:00 AM'}
              </AppText>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.confirmBtn}
            onPress={async () => {
              try {
                await api.post('/v1/bookings/reschedule', {
                  booking_id: params?.bookingId,
                  booking_uuid: params?.bookingUuid,
                  new_date: params?.dateString || params?.new_date || new Date().toISOString().split('T')[0],
                  new_time: params?.time || params?.timeSlot || '10:00 AM',
                });
                queryClient.invalidateQueries({ queryKey: ['therapist-dashboard'] });
              } catch (e) {
                console.log('[ConfirmApproval] Error confirming reschedule:', e);
              }
              navigation.navigate('RescheduleSuccessScreen');
            }}
            activeOpacity={0.8}
          >
            <AppText family="primary" weight="bold" style={styles.confirmBtnText}>
              Confirm Approval
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <AppText family="primary" weight="bold" style={styles.cancelBtnText}>
              Cancel
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
  darkBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
  },
  patientMiniCard: {
      backgroundColor: '#E2E8F0',
      margin: normalize(16),
      padding: normalize(12),
      borderRadius: normalize(12),
  },
  avatarRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  avatarPlaceholder: {
      width: normalize(40),
      height: normalize(40),
      borderRadius: normalize(20),
      backgroundColor: '#94A3B8',
      marginRight: normalize(12),
  },
  patientDetails: {
      flex: 1,
  },
  patientName: {
      fontSize: normalize(13),
      color: '#1E293B',
      marginBottom: normalize(2),
  },
  patientId: {
      fontSize: normalize(10),
      color: '#64748B',
  },
  viewProfileBtn: {
      borderWidth: 1,
      borderColor: '#CBD5E1',
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(6),
      borderRadius: normalize(8),
  },
  viewProfileText: {
      color: '#3B82F6',
      fontSize: normalize(10),
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(32),
    borderTopRightRadius: normalize(32),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(24),
    paddingBottom: normalize(40),
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: normalize(20),
    right: normalize(20),
    padding: normalize(8),
  },
  iconWrapper: {
    marginBottom: normalize(20),
  },
  outerCircle: {
    width: normalize(72),
    height: normalize(72),
    borderRadius: normalize(36),
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  innerCircle: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(20),
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: normalize(28),
    marginBottom: normalize(8),
  },
  subtitle: {
    fontSize: normalize(12),
    color: '#64748B',
    textAlign: 'center',
    marginBottom: normalize(24),
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(32),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  detailText: {
    fontSize: normalize(12),
    color: '#065F46',
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: normalize(16),
    borderRadius: normalize(16),
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
  cancelBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(16),
    borderRadius: normalize(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  cancelBtnText: {
    color: '#2563EB',
    fontSize: normalize(14),
  },
});
