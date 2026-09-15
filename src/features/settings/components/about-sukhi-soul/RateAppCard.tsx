import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Star, MessageSquare } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface RateAppCardProps {
  version?: string;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  onWriteReview?: () => void;
}

export const RateAppCard: React.FC<RateAppCardProps> = ({
  version = 'v2.41',
  initialRating = 4,
  onRatingChange,
  onWriteReview,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleStarPress = useCallback(
    (index: number) => {
      console.log(`[About Sukhi Soul] Rating changed to ${index} stars`);
      setRating(index);
      onRatingChange?.(index);
    },
    [onRatingChange]
  );

  const handleWriteReview = useCallback(() => {
    console.log('[About Sukhi Soul] Write a Review button pressed');
    onWriteReview?.();
    Alert.alert(
      'Write a Review',
      'Thank you for your review and support! Opening app store review...',
      [{ text: 'OK', style: 'default' }]
    );
  }, [onWriteReview]);

  return (
    <View style={styles.wrapper}>
      {/* Header Row: Label & Version Pill */}
      <View style={styles.headerRow}>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.sectionLabel}
          color={colors.typographyColor.Medium}
        >
          RATE THE APP
        </AppText>
        <View style={styles.versionBadge}>
          <AppText
            weight="light"
            family="secondary"
            style={styles.versionText}
            color={colors.typographyColor['Dark 2']}
          >
            {version}
          </AppText>
        </View>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Interactive 5-Star Row */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFilled = starIndex <= rating;
            return (
              <TouchableOpacity
                key={starIndex}
                activeOpacity={0.7}
                onPress={() => handleStarPress(starIndex)}
                style={styles.starBtn}
              >
                <Star
                  size={normalize(35)}
                  color={isFilled ? '#FFCC00' : '#CBD5E1'}
                  fill={isFilled ? '#FFCC00' : 'transparent'}
                  strokeWidth={isFilled ? 0 : 2}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Write a Review Button */}
        <TouchableOpacity
          style={styles.reviewBtn}
          activeOpacity={0.8}
          onPress={handleWriteReview}
        >
          <MessageSquare
            size={normalize(18)}
            color={colors.typographyColor['Dark 2']}
            strokeWidth={2.2}
          />
          <AppText
            weight="regular"
            family="secondary"
            style={styles.reviewBtnText}
            color={colors.typographyColor['Dark 2']}
          >
            Write a Review
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: normalize(26),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(8),
    paddingHorizontal: normalize(2),
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
  },
  versionBadge: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
  },
  versionText: {
    fontSize: normalize(11),
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(24),
    paddingHorizontal: normalize(24),
    borderWidth: 1,
    borderColor: colors.tintsGrey[50],
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(12),
    marginBottom: normalize(24),
  },
  starBtn: {
    padding: normalize(0),
  },
  reviewBtn: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(8),
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
  },
  reviewBtnText: {
    fontSize: normalize(14.5),
    letterSpacing: 0.2,
  },
});
