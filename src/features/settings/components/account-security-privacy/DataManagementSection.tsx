import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { CustomToggleSwitch } from './CustomToggleSwitch';

export const DataManagementSection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [therapyProgressEnabled, setTherapyProgressEnabled] = useState(true);
  const [moodTrackingEnabled, setMoodTrackingEnabled] = useState(true);
  const [downloadDataEnabled, setDownloadDataEnabled] = useState(true);

  const handleDeleteData = useCallback(() => {
    console.log('[Account Security] Delete Data button pressed');
    Alert.alert(
      'Delete Data',
      'Are you sure? All your chats, mood history, and saved data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('[Account Security] Confirmed delete all data');
            navigation.navigate('DeleteAccountWarning');
          },
        },
      ],
    );
  }, [navigation]);

  return (
    <View style={styles.sectionContainer}>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        DATA MANAGEMENT
      </AppText>

      <View style={styles.card}>
        {/* Item 1: Therapy Progress Data */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Therapy Progress Data
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              View or download progress.
            </AppText>
          </View>
          <CustomToggleSwitch
            value={therapyProgressEnabled}
            onValueChange={(val) => {
              setTherapyProgressEnabled(val);
              console.log(`[Account Security] Therapy Progress Data toggled: ${val ? 'ON' : 'OFF'}`);
            }}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 2: Mood Tracking Data */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Mood Tracking Data
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              View your mood history.
            </AppText>
          </View>
          <CustomToggleSwitch
            value={moodTrackingEnabled}
            onValueChange={(val) => {
              setMoodTrackingEnabled(val);
              console.log(`[Account Security] Mood Tracking Data toggled: ${val ? 'ON' : 'OFF'}`);
            }}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 3: Download Data */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Download Data
            </AppText>
          </View>
          <CustomToggleSwitch
            value={downloadDataEnabled}
            onValueChange={(val) => {
              setDownloadDataEnabled(val);
              console.log(`[Account Security] Download Data toggled: ${val ? 'ON' : 'OFF'}`);
            }}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 4: Delete Data */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Delete Data
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              All chats and saved data will get deleted
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.8}
            onPress={handleDeleteData}
          >
            <AppText weight="medium" family="secondary" style={styles.deleteBtnText} >
              Delete
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
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(4),
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(14),
  },
  textCol: {
    flex: 1,
    gap: normalize(3),
    paddingRight: normalize(8),
  },
  itemTitle: {
    fontSize: normalize(13.5),
  },
  itemSubtitle: {
    fontSize: normalize(11.5),
  },
  deleteBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.lightTints.redLightTint2[100],
    borderRadius: normalize(8),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
  },
  deleteBtnText: {
    fontSize: normalize(12),
    color: colors.colorPalet['Color 5']
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
