import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize, SCREEN_WIDTH } from '@utils/responsive';
import { Gift } from 'lucide-react-native';

export const HealingCarousels: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = SCREEN_WIDTH - normalize(48); // Full width minus horizontal padding of home

  const slides = [
    {
      id: '1',
      title: 'The Gift of Healing',
      description: 'Gift therapy. Because everyone deserves to feel heard, supported, and understood.',
      badgeText: 'THERAPY GIFT',
      imageUrl: 'https://images.unsplash.com/photo-1502325966718-85a90488dc29?auto=format&fit=crop&q=80&w=600&h=338',
    },
    {
      id: '2',
      title: 'Mindfulness Retreat',
      description: 'Connect with your inner peace and rejuvenate your soul in our custom group sessions.',
      badgeText: 'RETREAT PRO',
      imageUrl: 'https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?auto=format&fit=crop&q=80&w=600&h=338',
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / cardWidth);
    if (index !== activeIndex && index >= 0 && index < slides.length) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.cardContainer, { width: cardWidth }]}>
            <ImageBackground
              source={{ uri: slide.imageUrl }}
              style={styles.bgImage}
              borderRadius={normalize(13)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsRow}>
        {slides.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              {
                width: idx === activeIndex ? normalize(24) : normalize(8),
                backgroundColor: idx === activeIndex ? colors.blue[700] : colors.blue[100],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(12)
  },
  scrollContent: {
    paddingVertical: normalize(4),
    paddingRight: normalize(12),
    paddingBottom: normalize(10)
  },
  cardContainer: {
    height: normalize(160),
    marginRight: normalize(0),
    borderWidth: normalize(7),
    borderColor: '#e0eaf0',
    borderRadius: normalize(20),
    marginLeft: normalize(12),
    boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.15)',

  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(22, 39, 49, 0.45)', // Custom dark blue-grey tint overlay
    padding: normalize(16),
    justifyContent: 'space-between',
  },
  watermark: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: normalize(20),
    lineHeight: normalize(24),
    marginTop: normalize(8),
  },
  cardDesc: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: normalize(10),
    lineHeight: normalize(14),
    marginVertical: normalize(6),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(4),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(12),
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: normalize(8),
    letterSpacing: 0.5,
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(12),
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(12),
  },
  dot: {
    height: normalize(6),
    borderRadius: normalize(3),
    marginHorizontal: normalize(3),
  },
});
