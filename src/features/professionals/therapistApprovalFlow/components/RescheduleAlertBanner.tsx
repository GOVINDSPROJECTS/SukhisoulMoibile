import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { RefreshCcw, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const RescheduleAlertBanner: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <View style={styles.iconContainer}>
          <RefreshCcw size={normalize(14)} color="#DC2626" />
        </View>
        <View style={styles.alertContent}>
          <AppText family="primary" weight="bold" style={styles.alertTitle}>
            Reschedule Request Pending
          </AppText>
          <AppText family="primary" weight="medium" style={styles.alertDesc}>
            1 new request from 10:00 AM session
          </AppText>
        </View>
        <ChevronRight size={normalize(16)} color="#94A3B8" />
      </View>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate('ReschedulingRequestScreen')}
        activeOpacity={0.8}
      >
        <AppText family="primary" weight="bold" style={styles.actionBtnText}>
          View Requests
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightTints.redLightTint[50],
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
  },
  iconContainer: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: normalize(12),
    color: '#DC2626',
    marginBottom: normalize(2),
  },
  alertDesc: {
    fontSize: normalize(10),
    color: '#94A3B8',
  },
  actionBtn: {
    backgroundColor: '#1E62C4',
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
});
