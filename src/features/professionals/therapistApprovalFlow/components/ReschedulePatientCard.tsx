import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';

export const ReschedulePatientCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: 'https://i.pravatar.cc/150?u=prathmesh' }} 
        style={styles.avatar} 
      />
      <View style={styles.userInfo}>
        <AppText family="primary" weight="bold" style={styles.userName}>
          Prathamesh
          {'\n'}Deokar
        </AppText>
        <AppText family="primary" weight="medium" style={styles.patientId}>
          Patient ID: P10234
        </AppText>
      </View>
      <TouchableOpacity style={styles.viewProfileBtn}>
        <AppText family="primary" weight="bold" style={styles.viewProfileText}>
          View{'\n'}Profile
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    marginRight: normalize(12),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: normalize(14),
    color: '#1E293B',
    lineHeight: normalize(18),
    marginBottom: normalize(2),
  },
  patientId: {
    fontSize: normalize(10),
    color: '#64748B',
  },
  viewProfileBtn: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: '#CBE3FC',
  },
  viewProfileText: {
    fontSize: normalize(10),
    color: '#1E62C4',
    textAlign: 'center',
  },
});
