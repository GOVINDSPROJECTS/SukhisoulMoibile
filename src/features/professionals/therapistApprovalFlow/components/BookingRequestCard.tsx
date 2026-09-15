import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Check, X, Calendar } from 'lucide-react-native';

interface BookingRequestCardProps {
  name: string;
  details: string;
  initials: string;
  avatarColor: string;
}

export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  name,
  details,
  initials,
  avatarColor,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <AppText family="primary" weight="bold" style={styles.initials}>
            {initials}
          </AppText>
        </View>
        <View style={styles.userInfo}>
          <AppText family="primary" weight="bold" style={styles.userName}>
            {name}
          </AppText>
          <AppText family="primary" weight="medium" style={styles.userDetails}>
            {details}
          </AppText>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.acceptBtn}>
          <Check size={normalize(12)} color="#16A34A" style={{ marginRight: normalize(4) }} />
          <AppText family="primary" weight="bold" style={styles.acceptText}>Accept</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn}>
          <X size={normalize(12)} color="#DC2626" style={{ marginRight: normalize(4) }} />
          <AppText family="primary" weight="bold" style={styles.declineText}>Decline</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rescheduleBtn}>
          <Calendar size={normalize(12)} color="#64748B" style={{ marginRight: normalize(4) }} />
          <AppText family="primary" weight="bold" style={styles.rescheduleText}>Reschedule</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  avatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  initials: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: normalize(14),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  userDetails: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    backgroundColor: '#F0FDF4',
    borderRadius: normalize(8),
    flex: 1,
    marginRight: normalize(8),
  },
  acceptText: {
    color: '#16A34A',
    fontSize: normalize(11),
  },
  declineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    backgroundColor: colors.lightTints.redLightTint[50],
    borderRadius: normalize(8),
    flex: 1,
    marginRight: normalize(8),
  },
  declineText: {
    color: '#DC2626',
    fontSize: normalize(11),
  },
  rescheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(8),
    flex: 1.2,
  },
  rescheduleText: {
    color: '#64748B',
    fontSize: normalize(11),
  },
});
