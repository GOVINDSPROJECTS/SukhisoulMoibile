import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SessionInfoRowProps {
  icon: React.ReactNode;
  value: string;
}

export const SessionInfoRow: React.FC<SessionInfoRowProps> = ({ icon, value }) => (
  <View style={styles.row}>
    <View style={styles.iconWrap}>{icon}</View>
    <AppText variant="body" family='secondary' weight="medium" style={styles.value}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(10),
  },
  iconWrap: {
    width: normalize(20),
    alignItems: 'center',
  },
  value: {
    color: colors.typographyColor.Black,
    fontSize: normalize(12),
  },
});
