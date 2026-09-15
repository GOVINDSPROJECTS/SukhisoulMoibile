import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Gift, User, Package, Calendar, User2 } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NavigationProp } from '@navigation/types';

export const ActionTiles: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.lightTints.redLightTint[50], colors.lightTints.pinkLightTint[50]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Top 3D Gift Box Illustration */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../assets/gift-img.png')}
            style={styles.giftImage}
            resizeMode="contain"
          />
        </View>

        {/* Small Gifting Tag */}
        <AppText variant="caption" weight="extraBold" style={styles.giftingTag}>
          GIFTING
        </AppText>

        {/* Title and Subtitle Row with Gift Icon */}
        <View style={styles.titleRow}>
          <View style={styles.giftIconContainer}>
            <Gift size={normalize(20)} color="#000000" />
          </View>
          <View style={styles.titleTextGroup}>
            <AppText variant="body" weight="extraBold" style={styles.mainTitle}>
              Gift or Receive Therapy
            </AppText>
            <AppText variant="caption" weight="light" style={styles.subTitle}>
              Send a session to someone you care about.
            </AppText>
          </View>
        </View>

        {/* Bottom Dual Action Buttons Capsule */}
        <View style={styles.buttonsCapsule}>
          {/* Gift Therapy Button */}
          <TouchableOpacity
            style={styles.giftBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('GiftIntro')}
          >
            <View style={styles.btnIconBoxGift}>
              <Package size={normalize(15)} color="#FFFFFF" />
            </View>
            <View style={styles.btnTextGroup}>
              <AppText variant="caption" weight="extraBold" style={styles.giftBtnTextMain}>
                Gift Therapy
              </AppText>
              <AppText variant="caption" weight="light" style={styles.giftBtnTextSub}>
                Send a session
              </AppText>
            </View>
          </TouchableOpacity>

          {/* Receive Therapy Button */}
          <TouchableOpacity
            style={styles.receiveBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('GiftReceiverUnlock')}
          >
            <View style={styles.btnIconBoxReceive}>
              <User2 size={normalize(14)} color="#374151" />
            </View>
            <View style={styles.btnTextGroup}>
              <AppText variant="caption" weight="extraBold" style={styles.receiveBtnTextMain} >
                Receive Therapy
              </AppText>
              <AppText variant="caption" weight="light" style={styles.receiveBtnTextSub}>
                Get a session
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(14),
  },
  card: {
    borderRadius: normalize(28),
    padding: normalize(20),
    alignItems: 'center',
  },
  illustrationWrapper: {
    width: normalize(150),
    height: normalize(130),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(4),
  },
  giftImage: {
    width: '100%',
    height: '100%',
  },
  giftingTag: {
    fontSize: normalize(12),
    color: '#FF8A75',
    letterSpacing: 1,
    marginBottom: normalize(10),
    marginTop: normalize(5)
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: normalize(16),
  },
  giftIconContainer: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(14),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
    borderWidth: normalize(2),
    borderColor: 'rgba(255,138,117,0.3)'
  },
  titleTextGroup: {
    flex: 1,
  },
  mainTitle: {
    fontSize: normalize(16),
    color: colors.typographyColor.Black,
    marginBottom: normalize(2),
  },
  subTitle: {
    fontSize: normalize(11),
    color: colors.typographyColor.Light,
  },
  buttonsCapsule: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(8),
    width: '100%',
    gap: normalize(0),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: '#FDF2F8',
    marginLeft: normalize(-15),
    marginRight: normalize(-15),
  },
  giftBtn: {
    flex: 1,
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(12),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 10px 15px -3px #FED7AA, 0px 4px 6px -4px #FED7AA',
  },
  btnIconBoxGift: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(8),
    backgroundColor: colors.lightTints.redLightTint2[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(8),
  },
  btnTextGroup: {
    flex: 1,
  },
  giftBtnTextMain: {
    fontSize: normalize(11),
    color: '#FFFFFF',
    lineHeight: normalize(13)
  },
  giftBtnTextSub: {
    fontSize: normalize(9),
    color: 'rgba(255, 255, 255, 0.88)',
  },
  receiveBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIconBoxReceive: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(8),
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(8),
  },
  receiveBtnTextMain: {
    fontSize: normalize(11),
    color: '#1F2937',
    lineHeight: normalize(13)
  },
  receiveBtnTextSub: {
    fontSize: normalize(9),
    color: '#6B7280',
  },
});
