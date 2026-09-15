import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Gift, Heart } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export const GiftReceiverSoCloseCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconWrapperInner}>
          <Box size={normalize(18)} color={'#ffffff'} />
        </View>
      </View>
      <View style={styles.textWrapper}>
        <AppText family="secondary" weight="extraBold" style={styles.title}>
          You're so close!
        </AppText>
        <AppText family="secondary" weight="regular" style={styles.subtitle}>
          Complete the details to{'\n'}unlock your therapy gift.
        </AppText>
      </View>
      <Heart
        size={normalize(20)}
        color={colors.lightTints.redLightTint2[200]}
        style={{ marginTop: 'auto', marginBottom: normalize(5) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: normalize(16),
    padding: normalize(14),
    marginBottom: normalize(24),
  },
  iconWrapper: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255, 77, 141, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  iconWrapperInner: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: colors.colorPalet['Color 4'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    color: colors.typographyColor.Black,
    fontSize: normalize(13),
    marginBottom: normalize(2),
  },
  subtitle: {
    color: colors.typographyColor.Light,
    fontSize: normalize(11),
    lineHeight: normalize(16),
  },
});
