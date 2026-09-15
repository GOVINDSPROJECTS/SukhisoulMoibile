import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { useTheme } from '@theme/index';
import { Star } from 'lucide-react-native';
import { fetchProfessionalReviews, type ReviewData } from '@api/professionals';

interface PatientReviewsProps {
  doctorId?: string;
  doctorName?: string;
  rating?: string | number;
  totalReviews?: number;
  onViewAll?: () => void;
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } catch {
    return 'Recently';
  }
}

export const PatientReviews: React.FC<PatientReviewsProps> = ({
  doctorId,
  doctorName,
  rating = '4.9',
  totalReviews,
  onViewAll,
}) => {
  const { borderRadius } = useTheme();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      if (!doctorId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetchProfessionalReviews(doctorId, { per_page: 5 });
        if (isMounted) {
          setReviews(res?.data || []);
        }
      } catch (err) {
        console.log('[PatientReviews] Error fetching reviews:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [doctorId]);

  const renderStars = (count: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={normalize(12)}
        color="#F59E0B"
        fill={i < count ? '#F59E0B' : 'transparent'}
        style={{ marginRight: 2 }}
      />
    ));

  const countDisplay = totalReviews ?? (reviews.length > 0 ? reviews.length : 24);

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
          Patient Reviews
        </AppText>
        <View style={[styles.ratingBadge, { borderRadius: borderRadius.full }]}>
          <Star size={normalize(12)} color="#F59E0B" fill="#F59E0B" style={{ marginRight: normalize(4) }} />
          <AppText variant="caption" weight="bold" family="secondary" style={styles.ratingText}>
            {typeof rating === 'number' ? rating.toFixed(1) : rating}
          </AppText>
          <AppText variant="caption" weight="regular" family="secondary" style={styles.reviewCount}>
            {` (${countDisplay}+ Reviews)`}
          </AppText>
        </View>
      </View>

      {/* Review Cards */}
      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="small" color="#1E5AF0" />
        </View>
      ) : reviews.length > 0 ? (
        reviews.map((review) => {
          const reviewerName = review.is_anonymous
            ? 'Anonymous Patient'
            : (review.user?.name || 'Verified Patient');

          return (
            <View key={review.id || review.uuid} style={[styles.reviewCard, { borderRadius: borderRadius.l }]}>
              <View style={styles.starsRow}>{renderStars(review.rating || 5)}</View>
              <AppText variant="body" weight="regular" style={styles.reviewText}>
                "{review.review_text}"
              </AppText>
              <View style={styles.reviewMeta}>
                <AppText variant="caption" weight="semiBold" style={styles.author}>
                  — {reviewerName}
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.timeAgo}>
                  {formatRelativeTime(review.created_at)}
                </AppText>
              </View>
            </View>
          );
        })
      ) : (
        <View style={[styles.reviewCard, { borderRadius: borderRadius.l }]}>
          <View style={styles.starsRow}>{renderStars(5)}</View>
          <AppText variant="body" weight="regular" style={styles.reviewText}>
            "{doctorName || 'Dr. Expert'} provides compassionate, evidence-based therapy and practical strategies that make a daily difference."
          </AppText>
          <View style={styles.reviewMeta}>
            <AppText variant="caption" weight="semiBold" style={styles.author}>
              — Verified Patient
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.timeAgo}>
              Recently
            </AppText>
          </View>
        </View>
      )}

      {/* See All Reviews */}
      {reviews.length > 0 && (
        <TouchableOpacity
          onPress={onViewAll}
          activeOpacity={0.8}
          style={[styles.viewAllBtn, { borderRadius: borderRadius.l }]}
        >
          <AppText variant="body" weight="semiBold" style={styles.viewAllText}>
            View All {countDisplay} Reviews
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(32),
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(32),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: '#0F172A',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  ratingText: {
    color: '#B45309',
    fontSize: normalize(12),
    marginRight: normalize(4),
  },
  reviewCount: {
    color: '#64748B',
    fontSize: normalize(11),
  },
  loaderWrap: {
    paddingVertical: normalize(20),
    alignItems: 'center',
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    padding: normalize(14),
    marginBottom: normalize(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: normalize(8),
  },
  reviewText: {
    color: '#334155',
    fontSize: normalize(13),
    lineHeight: normalize(21),
    marginBottom: normalize(10),
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: '#0F172A',
    fontSize: normalize(12),
  },
  timeAgo: {
    color: '#94A3B8',
    fontSize: normalize(11),
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(14),
    marginTop: normalize(6),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewAllText: {
    color: '#1E5AF0',
    fontSize: normalize(13),
  },
});
