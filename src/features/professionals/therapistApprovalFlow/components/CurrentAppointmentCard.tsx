import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Calendar, Clock, Video, Cloud } from 'lucide-react-native';

export const CurrentAppointmentCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <AppText family="primary" weight="bold" style={styles.title}>
        Current Appointment
      </AppText>
      
      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Calendar size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="medium" style={styles.detailText}>
          Mon, 20 May 2024
        </AppText>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Clock size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="medium" style={styles.detailText}>
          04:00 PM - 05:00 PM
        </AppText>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Video size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="medium" style={styles.detailText}>
          Online Session
        </AppText>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Cloud size={normalize(12)} color="#1E62C4" />
        </View>
        <AppText family="primary" weight="medium" style={styles.detailText}>
          Anxiety & Stress Management
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: normalize(12),
    color: '#1E293B',
    marginBottom: normalize(16),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  iconContainer: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  detailText: {
    fontSize: normalize(11),
    color: '#64748B',
  },
});
