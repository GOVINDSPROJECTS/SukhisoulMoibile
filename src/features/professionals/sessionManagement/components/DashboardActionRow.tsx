import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Filter } from 'lucide-react-native';

export const DashboardActionRow: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFFFFF' }]} activeOpacity={0.7}>
        <Filter size={normalize(13)} color={colors.typographyColor.Black} style={{ marginRight: normalize(6) }} />
        <AppText family="secondary" weight="regular" style={{ fontSize: normalize(12), color: colors.typographyColor.Black }}>
          Filter
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFFFFF' }]} activeOpacity={0.7}>
        <Image
          source={require('../assets/recently-active.png')}
          style={{ width: normalize(14), height: normalize(14), marginRight: normalize(6), tintColor: colors.typographyColor.Black }}
          resizeMode="contain"
        />
        <AppText family="secondary" weight="regular" style={{ fontSize: normalize(12), color: colors.typographyColor.Black }}>
          Recently Active
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: normalize(30),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(12),
    flex: 0.48,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    height: normalize(37)


  }
});
