import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Moon, Users, User, Salad, Sparkles } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface ComingSoonItem {
  id: string;
  title: string;
  iconType: 'nutrition' | 'sleep' | 'community' | 'expert';
  iconColor: string;
  iconBg: string;
}

const ITEMS: ComingSoonItem[] = [
  {
    id: 'nutrition',
    title: 'Nutrition\nPlan',
    iconType: 'nutrition',
    iconColor: '#16A34A',
    iconBg: 'transparent',
  },
  {
    id: 'sleep',
    title: 'Sleep\nStories',
    iconType: 'sleep',
    iconColor: '#EAB308',
    iconBg: 'transparent',
  },
  {
    id: 'community',
    title: 'Community',
    iconType: 'community',
    iconColor: '#3B82F6',
    iconBg: 'transparent',
  },
  {
    id: 'expert',
    title: 'Expert\nSessions',
    iconType: 'expert',
    iconColor: '#64748B',
    iconBg: 'transparent',
  },
];

export const ComingSoonSection: React.FC = () => {
  const handleItemPress = (item: ComingSoonItem) => {
    Alert.alert(
      item.title.replace('\n', ' '),
      'This feature is currently in development and will be available in an upcoming update! ✨',
      [{ text: 'Notify Me' }, { text: 'OK', style: 'cancel' }]
    );
  };

  const renderIcon = (type: ComingSoonItem['iconType'], color: string) => {
    switch (type) {
      case 'nutrition':
        return (
          <Image
            source={require('../assets/ico-nutrition.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        );
      case 'sleep':
        return <Image
          source={require('../assets/ico-moon.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />;
      case 'community':
        return <Image
          source={require('../assets/ico-persons.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />;
      case 'expert':
        return <Image
          source={require('../assets/ico-person.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppText style={styles.sectionTitle} weight="extraBold" family='primary'>
        Coming Soon
      </AppText>

      {/* 4 Dashed Cards Row */}
      <View style={styles.cardsRow}>
        {ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.dashedCard}
            activeOpacity={0.75}
            onPress={() => handleItemPress(item)}
          >
            <AppText style={styles.soonBadge} weight="semiBold">
              SOON
            </AppText>

            <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
              {renderIcon(item.iconType, item.iconColor)}
            </View>

            <AppText style={styles.cardTitle} weight="medium">
              {item.title}
            </AppText>
            <View style={styles.overLay}></View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Sparkle Text */}
      <View style={styles.footerContainer}>
        <AppText style={styles.footerText} weight="regular" family='secondary'>
          Exciting features are on the way! ✨
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: '#1B3B36',
    marginBottom: normalize(14),
  },
  cardsRow: {
    flexDirection: 'row',
    gap: normalize(10),

  },
  dashedCard: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#F3F4F6',
    borderRadius: normalize(18),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(6),
    alignItems: 'center',
    position: 'relative'
  },
  soonBadge: {
    fontSize: normalize(9),
    color: '#9CA3AF',
    marginBottom: normalize(8),
    letterSpacing: 0.5,

  },
  iconCircle: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(8),
    padding: normalize(7),
  },
  cardTitle: {
    fontSize: normalize(10),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: normalize(13),
    minHeight: normalize(26),
  },
  overLay: {
    position: 'absolute',
    top: normalize(0),
    right: normalize(0),
    bottom: normalize(0),
    left: normalize(0),
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: normalize(18),
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: normalize(14),
  },
  footerText: {
    fontSize: normalize(11),
    color: '#9CA3AF',
  },
});
