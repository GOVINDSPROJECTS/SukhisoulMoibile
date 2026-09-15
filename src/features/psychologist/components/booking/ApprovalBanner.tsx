import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Timer } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

export const ApprovalBanner: React.FC = () => {
  const { borderRadius } = useTheme();

  return (
    <View style={[styles.banner, { borderRadius: normalize(28) }]}>
      <View style={[styles.iconWrap, { borderRadius: borderRadius.m }]}>
        <Image source={require('../../assets/bookingSummary/pending-icon.png')} style={{ width: normalize(20), height: normalize(25) }} />
      </View>
      <View style={styles.textWrap}>
        <AppText variant="caption" weight="bold" style={styles.title}>
          Approval Pending
        </AppText>
        <AppText variant="caption" weight="regular" style={styles.subtitle}>
          Your booking is under review by the psychologist. You will be
          notified once approved.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E5',
    borderWidth: 1,
    borderColor: colors.lightTints.yellowLightTint[100],
    padding: normalize(14),
    gap: normalize(15),
    paddingTop: normalize(18),
    paddingBottom: normalize(10),
  },
  iconWrap: {
    width: normalize(40),
    height: normalize(45),
    backgroundColor: colors.lightTints.yellowLightTint[100],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: normalize(5)
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: normalize(13),
    color: '#111827',
    marginBottom: normalize(3),
  },
  subtitle: {
    fontSize: normalize(11),
    color: '#4B5563',
    lineHeight: normalize(16),
  },
});
