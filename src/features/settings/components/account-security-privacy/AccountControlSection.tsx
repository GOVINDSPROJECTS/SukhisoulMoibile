import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MonitorSmartphone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

export const AccountControlSection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogoutThisDevice = useCallback(() => {
    console.log('[Account Security] Log Out This Devices pressed');
    Alert.alert('Log Out This Device', 'Are you sure you want to log out from this device?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          console.log('[Account Security] Confirmed log out this device');
          navigation.navigate('Logout');
        },
      },
    ]);
  }, [navigation]);

  const handleLogoutAllDevices = useCallback(() => {
    console.log('[Account Security] Log Out All Devices pressed');
    Alert.alert('Log Out All Devices', 'This will log you out from all other active sessions and devices.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out All',
        style: 'destructive',
        onPress: () => {
          console.log('[Account Security] Confirmed log out all devices');
          navigation.navigate('Logout');
        },
      },
    ]);
  }, [navigation]);

  return (
    <View style={styles.sectionContainer}>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        ACCOUNT CONTROL
      </AppText>

      <View style={styles.card}>
        {/* Device Icon Circle */}
        <View style={styles.cardInner}>
          <View style={styles.iconCircle}>
            <MonitorSmartphone size={normalize(26)} color="#576065" strokeWidth={1.8} />
          </View>
          {/* Title and Subtitle */}
          <View>
            <AppText weight="bold" family="primary" style={styles.cardTitle} color={'#0B1C30'}>
              Login Devices
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.cardSubtitle} color={'#42474D'}>
              2 active devices
            </AppText>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.blueOutlineBtn}
            activeOpacity={0.75}
            onPress={handleLogoutThisDevice}
          >
            <AppText weight="medium" family="secondary" style={styles.blueBtnText}>
              Log Out This Devices
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.redOutlineBtn}
            activeOpacity={0.75}
            onPress={handleLogoutAllDevices}
          >
            <AppText weight="medium" family="secondary" style={styles.redBtnText}>
              Log Out All Devices
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: normalize(18),
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(15),
    letterSpacing: 0.5,
    marginBottom: normalize(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
    borderWidth: normalize(1),
    borderColor: colors.appThemeColor[75]
  },
  cardInner: {
    flexDirection: 'row',
    gap: normalize(10),
    alignItems: 'center',
  },
  iconCircle: {
    width: normalize(55),
    height: normalize(55),
    borderRadius: normalize(30),
    backgroundColor: '#D0D9DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  cardTitle: {
    fontSize: normalize(14),
    marginBottom: normalize(2),
  },
  cardSubtitle: {
    fontSize: normalize(12),
    marginBottom: normalize(16),
  },
  btnGroup: {
    width: '100%',
    alignItems: 'center',
    gap: normalize(10),
  },
  blueOutlineBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.lightTints.blueLightTint[100],
    borderRadius: normalize(8),
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
    minWidth: normalize(180),
    alignItems: 'center',
  },
  blueBtnText: {
    fontSize: normalize(12.5),
    color: colors.typographyColor['Dark 2']
  },
  redOutlineBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.lightTints.redLightTint2[100],
    borderRadius: normalize(8),
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
    minWidth: normalize(180),
    alignItems: 'center',
  },
  redBtnText: {
    fontSize: normalize(12.5),
    color: colors.colorPalet['Color 5']
  },
});
