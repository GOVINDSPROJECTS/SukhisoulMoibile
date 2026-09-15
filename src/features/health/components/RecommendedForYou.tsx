import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import Svg, { Circle, Path } from 'react-native-svg';

interface RecommendedItem {
  id: string;
  title: string;
  bgColor: string;
  iconType: 'yoga' | 'brain' | 'sound';
}

const ITEMS: RecommendedItem[] = [
  {
    id: 'yoga',
    title: 'Advanced Yoga',
    bgColor: '#E5EEFF',
    iconType: 'yoga',
  },
  {
    id: 'mind',
    title: 'Mind Mapping',
    bgColor: '#B0F0D6',
    iconType: 'brain',
  }
];

export const RecommendedForYou: React.FC = () => {
  const handleItemPress = (item: RecommendedItem) => {
    Alert.alert(
      item.title,
      `Ready to begin ${item.title}? This curated session is tailored to your weekly wellness rhythm.`,
      [{ text: 'Start Session' }, { text: 'Later', style: 'cancel' }]
    );
  };

  const renderIcon = (type: RecommendedItem['iconType']) => {
    switch (type) {
      case 'yoga':
        return (
          <Image
            source={require('../assets/ico-advance-yoga.png')}
            resizeMode="cover"
          />
        );
      case 'brain':
        return (
          <Image
            source={require('../assets/ico-mindmap.png')}
            resizeMode="cover"
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.sectionTitle} weight="regular" family='primary'>
        Recommended for You
      </AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {ITEMS.map((item) => (
          <>
            <TouchableOpacity
              key={item.id}
              style={[styles.card]}
              activeOpacity={0.8}
              onPress={() => handleItemPress(item)}
            >
              <View style={[styles.iconContainerMain, { backgroundColor: item.bgColor }]}>
                <View style={styles.iconContainer}>{renderIcon(item.iconType)}</View>
              </View>

              <AppText style={styles.cardTitle} weight="semiBold" numberOfLines={1}>
                {item.title}
              </AppText>
              <View style={styles.overLay}></View>
            </TouchableOpacity>
          </>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(24),
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: '#0B1C30',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(14),
  },
  scrollList: {
    paddingHorizontal: normalize(20),
    gap: normalize(14),
    position: 'relative',
  },
  card: {
    width: normalize(230),
    borderRadius: normalize(32),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 10px 25px -5px rgba(6, 78, 59, 0.05)',
    marginBottom: normalize(20),
    borderWidth: normalize(1),
    borderColor: '#D9E6DD'
  },
  iconContainerMain: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(32),
    paddingVertical: normalize(20),
    marginBottom: normalize(14),
  },
  iconContainer: {
    width: normalize(52),
    height: normalize(52),
    // borderRadius: normalize(32),
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
    // boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },
  cardTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    textAlign: 'center',
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
});
