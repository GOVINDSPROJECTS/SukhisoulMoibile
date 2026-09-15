import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image, Pressable } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Wallet, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const FreeTherapy: React.FC = () => {
  const { borderRadius } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={[styles.freeSessionCard, { borderRadius: borderRadius.xl }]}>
        <View style={styles.freeSessionHeader}>
          <View>
            <Image source={require('../assets/gift-icon.png')} style={styles.freeSessionIcon} />
          </View>
          <View>
            <AppText variant="caption" weight="semiBold" style={styles.freeSessionTag}>
              FREE SESSION
            </AppText>
            <AppText variant="h3" weight="semiBold" style={styles.freeSessionTitle}>
              Take Free Therapy
            </AppText>
            <AppText variant="caption" style={styles.freeSessionDesc}>
              Redeem points with a certified psychologist
            </AppText>
          </View>
        </View>

        <View style={styles.freeSessionFooter}>
          <View style={[styles.pointsBadgeMini, { borderRadius: borderRadius.xl }]}>
            {/* <Wallet size={14} color={colors.blue[700]} style={{ marginRight: normalize(8) }} /> */}
            <Image source={require('../assets/wallet.png')} style={styles.walletIcon} />
            <AppText variant="caption" weight="semiBold" style={{ color: '#1E293B' }}>
              950
            </AppText>
          </View>

          <Pressable
            onPress={() => { navigation.navigate('Redeem', {}); }}
            style={({ pressed }) => [styles.redeemBtn, { borderRadius: borderRadius.m }, pressed && { backgroundColor: colors.lightTints.blueLightTint[100], }]}>
            <AppText variant="caption" weight="medium" style={styles.redeemBtnText}>
              Redeem
            </AppText>
            <ArrowRight size={13} color={colors.typographyColor['Dark 2']} style={{ marginLeft: normalize(4) }} />
          </Pressable>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  freeSessionCard: {
    backgroundColor: colors.tintsBlue[50],
    borderWidth: 1,
    borderColor: colors.blue[300],
    marginHorizontal: normalize(20),
    marginTop: normalize(24),
    padding: normalize(16),
  },
  freeSessionHeader: {
    marginBottom: normalize(12),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeSessionIcon: {
    width: normalize(50),
    height: normalize(50),
    marginRight: normalize(12),
  },
  freeSessionTag: {
    color: colors.colorPalet['color 1'],
    fontSize: normalize(9),
    letterSpacing: 0.8,
  },
  freeSessionTitle: {
    fontSize: normalize(16),
    color: colors.blue[800],
    marginTop: normalize(2),
  },
  freeSessionDesc: {
    fontSize: normalize(11),
    color: colors.typographyColor['Color 2'],
    marginTop: normalize(2),
  },
  freeSessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletIcon: {
    width: normalize(25),
    height: normalize(20),
    marginRight: normalize(12),
  },
  pointsBadgeMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderWidth: 1,
    borderColor: colors.tintsGrey[300],
    shadowColor: '#0000002f',
    shadowOffset: { width: 0, height: 2.26 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 4.52,
  },
  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderWidth: 1.5,
    borderColor: colors.blue['200'],
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
  },
  redeemBtnText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
  },

});
