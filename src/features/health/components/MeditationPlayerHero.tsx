import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Music } from 'lucide-react-native';

interface MeditationPlayerHeroProps {
  genreTag?: string;
  minLeft?: string;
  currentTimeStr: string;
  totalTimeStr: string;
  progressRatio: number; // 0 to 1
  onSeek: (ratio: number) => void;
}

export const MeditationPlayerHero: React.FC<MeditationPlayerHeroProps> = ({
  genreTag = 'AMBIENT',
  minLeft = '12:45',
  currentTimeStr,
  totalTimeStr,
  progressRatio,
  onSeek,
}) => {
  const [barWidth, setBarWidth] = React.useState<number>(1);

  const handleBarTouch = (evt: any) => {
    const touchX = evt.nativeEvent.locationX;
    if (barWidth > 0) {
      const clampedRatio = Math.max(0, Math.min(1, touchX / barWidth));
      onSeek(clampedRatio);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Top Hero Image with Overlays */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/meditation_hero.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Top-Left Genre Pill */}
        <View style={styles.genrePill}>
          <Music size={normalize(12)} color="#0F172A" />
          <AppText style={styles.genreText} weight="bold">
            {genreTag}
          </AppText>
        </View>

        {/* Top-Right Time Left Badge */}
        <View style={styles.minLeftBadge}>
          <AppText style={styles.minLeftTime} weight="bold">
            {minLeft}
          </AppText>
          <AppText style={styles.minLeftLabel} weight="semiBold">
            MIN LEFT
          </AppText>
        </View>
      </View>

      {/* Bottom Timeline Section */}
      <View style={styles.timelineSection}>
        {/* Current Time */}
        <AppText style={styles.timeText} weight="medium">
          {currentTimeStr}
        </AppText>

        {/* Interactive Scrubber Bar */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.scrubberTouchable}
          onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
          onPress={handleBarTouch}
        >
          <View style={styles.scrubberTrack}>
            {/* Filled Progress */}
            <View
              style={[
                styles.scrubberFill,
                { width: `${Math.max(2, Math.min(100, progressRatio * 100))}%` },
              ]}
            />
            {/* Scrubber Thumb */}
            <View
              style={[
                styles.scrubberThumb,
                {
                  left: `${Math.max(0, Math.min(97, progressRatio * 100))}%`,
                },
              ]}
            />
          </View>
        </TouchableOpacity>

        {/* Total Time */}
        <AppText style={styles.timeText} weight="medium">
          {totalTimeStr}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: normalize(20),
    marginTop: normalize(18),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(28),
    overflow: 'hidden',
    boxShadow: '0px 10px 30px rgba(59, 130, 246, 0.08)',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  imageWrapper: {
    width: '100%',
    height: normalize(250),
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  genrePill: {
    position: 'absolute',
    top: normalize(16),
    left: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(99),
  },
  genreText: {
    fontSize: normalize(11),
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  minLeftBadge: {
    position: 'absolute',
    top: normalize(16),
    right: normalize(16),
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(14),
    alignItems: 'center',
  },
  minLeftTime: {
    fontSize: normalize(14),
    color: '#FFFFFF',
    lineHeight: normalize(16),
  },
  minLeftLabel: {
    fontSize: normalize(8),
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  timelineSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(18),
    gap: normalize(12),
  },
  timeText: {
    fontSize: normalize(12),
    color: '#334155',
  },
  scrubberTouchable: {
    flex: 1,
    height: normalize(30),
    justifyContent: 'center',
  },
  scrubberTrack: {
    height: normalize(5),
    backgroundColor: '#E2E8F0',
    borderRadius: normalize(99),
    position: 'relative',
    justifyContent: 'center',
  },
  scrubberFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: normalize(99),
  },
  scrubberThumb: {
    position: 'absolute',
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#3B82F6',
    top: -normalize(4.5),
    marginLeft: -normalize(7),
    boxShadow: '0px 2px 4px rgba(59, 130, 246, 0.3)',
  },
});
