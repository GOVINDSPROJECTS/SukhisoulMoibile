import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

export const EliteWellnessBanner: React.FC = () => {
  const handleUpgradePress = () => {
    Alert.alert(
      'Elite Wellness Journey 🌟',
      'Unlock 30% OFF your annual premium membership! Includes unlimited 1-on-1 meditation sessions, customized nutrition plans, and mental wellness tracking.',
      [
        { text: 'Claim 30% OFF', style: 'default' },
        { text: 'Later', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10B981', '#10B981', '#006C49']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Left Content */}
        <View style={styles.leftContent}>
          {/* 30% OFF Badge */}
          <View style={styles.discountBadge}>
            <AppText style={styles.discountText} weight="bold">
              30% OFF
            </AppText>
          </View>

          {/* Title */}
          <AppText style={styles.title} weight="bold">
            Elite Wellness{'\n'}Journey
          </AppText>

          {/* Upgrade Button */}
          <TouchableOpacity
            style={styles.upgradeBtn}
            activeOpacity={0.85}
            onPress={handleUpgradePress}
          >
            <AppText style={styles.upgradeBtnText} weight="bold">
              Upgrade Now
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Right Image Container */}
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/yoga_banner.png')}
            style={styles.yogaImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardOverlay}></View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(24),
  },
  card: {
    borderRadius: normalize(24),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: normalize(150),
    position: 'relative',
    boxShadow: '0px 4px 12px rgba(94, 155, 138, 0.25)',
  },
  leftContent: {
    flex: 1.1,
    paddingVertical: normalize(18),
    paddingLeft: normalize(18),
    paddingRight: normalize(6),
    zIndex: 2,
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(99),
    alignSelf: 'flex-start',
    marginBottom: normalize(8),
  },
  discountText: {
    fontSize: normalize(10),
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: normalize(20),
    lineHeight: normalize(24),
    color: '#FFFFFF',
    marginBottom: normalize(14),
  },
  upgradeBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(9),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(99),
    alignSelf: 'flex-start',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
    zIndex: -1
  },
  upgradeBtnText: {
    fontSize: normalize(12),
    color: '#006C49',
  },
  imageWrapper: {
    width: normalize(130),
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  yogaImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  cardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.60)',
    zIndex: normalize(10),
  },
});
