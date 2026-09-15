import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Video, FileText, Calendar } from 'lucide-react-native';

export const UpcomingSessionCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=prathmesh' }} 
            style={styles.avatar} 
          />
          <View style={styles.statusDot} />
        </View>
        <View style={styles.userInfo}>
          <AppText family="primary" weight="bold" style={styles.userName}>
            Prathamesh Deokar
          </AppText>
          <AppText family="primary" weight="medium" style={styles.sessionType}>
            Individual Therapy • Cognitive Behavioral Approach
          </AppText>
        </View>
      </View>

      <View style={styles.infoBoxes}>
        <View style={[styles.infoBox, { backgroundColor: '#F0F5FA' }]}>
          <AppText family="primary" weight="bold" style={styles.infoBoxLabel}>
            LAST NOTES
          </AppText>
          <AppText family="primary" weight="medium" style={[styles.infoBoxValue, { color: '#64748B' }]}>
            Focus on...
          </AppText>
        </View>

        <View style={[styles.infoBox, { backgroundColor: '#F0FDF4' }]}>
          <AppText family="primary" weight="bold" style={[styles.infoBoxLabel, { color: '#065F46' }]}>
            TASK STATUS
          </AppText>
          <View style={styles.nextStepRow}>
            <View style={styles.outlineCheckCircle}>
              <AppText family="primary" weight="bold" style={{ color: '#16A34A', fontSize: normalize(8) }}>✓</AppText>
            </View>
            <AppText family="primary" weight="medium" style={[styles.infoBoxValue, { color: '#16A34A', fontSize: normalize(11), flex: 1 }]} numberOfLines={2}>
              Checked in & Ready
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#1E62C4', flex: 1, marginRight: normalize(8) }]}>
          <Video size={normalize(14)} color="#FFFFFF" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={{ color: '#FFFFFF', fontSize: normalize(12) }}>
            Join Session
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFFFFF', borderColor: '#1E62C4', borderWidth: 1, flex: 1 }]}>
          <FileText size={normalize(14)} color="#1E62C4" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={{ color: '#1E62C4', fontSize: normalize(12) }}>
            Review Questions
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.rescheduleBtn}>
          <Calendar size={normalize(14)} color="#1E62C4" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={{ color: '#1E62C4', fontSize: normalize(12) }}>
            Reschedule
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalize(12),
  },
  avatar: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(12),
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: normalize(16),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  sessionType: {
    fontSize: normalize(11),
    color: '#64748B',
    lineHeight: normalize(16),
  },
  infoBoxes: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(12),
    padding: normalize(12),
    marginRight: normalize(8),
  },
  infoBoxLabel: {
    fontSize: normalize(9),
    color: '#1E62C4',
    marginBottom: normalize(4),
  },
  infoBoxValue: {
    fontSize: normalize(13),
    color: '#1E293B',
  },
  nextStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: normalize(2),
  },
  outlineCheckCircle: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    borderWidth: 1,
    borderColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(4),
    marginTop: normalize(2),
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: normalize(12),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(44),
    borderRadius: normalize(22),
  },
  rescheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(40),
    paddingHorizontal: normalize(24),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: '#CBE3FC',
  },
});
