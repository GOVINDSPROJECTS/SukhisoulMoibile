import React, { memo } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, Clock, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

export interface TherapistData {
  id: string;
  name: string;
  designation: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  nextSlot: string;
  sessionPrice: number;
  currency: string;
  hasFreeIntro: boolean;
  avatarUrl: string;
  bio?: string;
  languages?: string[];
  expertise?: string[];
  experience?: string;
}

interface TherapistCardProps {
  therapist: TherapistData;
  onBookNow: (therapist: TherapistData) => void;
  onPressProfile?: (therapist: TherapistData) => void;
}

const TherapistCardComponent: React.FC<TherapistCardProps> = ({
  therapist,
  onBookNow,
  onPressProfile,
}) => {
  const { borderRadius } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPressProfile && onPressProfile(therapist)}
      style={[styles.card, { borderRadius: borderRadius.xl }]}
    >
      {/* Top row: avatar + info + FREE badge */}
      <View style={styles.topRow}>
        {/* Avatar */}
        <Image
          source={{ uri: therapist.avatarUrl }}
          style={styles.avatar}
        />

        {/* Info column */}
        <View style={styles.infoCol}>
          {/* FREE 15-MIN badge — aligned top right of info column */}
          {therapist.hasFreeIntro && (
            <View style={styles.freeBadge}>
              <View style={styles.checkIconRoot}>
                <Check
                  size={normalize(8)}
                  color={colors.typographyColor.White}
                  strokeWidth={4}
                  style={styles.checkIcon}
                />
              </View>
              <AppText variant="caption" weight="extraBold" style={styles.freeBadgeText}>
                FREE 15-MIN INTRO AVAILABLE
              </AppText>
            </View>
          )}

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Star size={normalize(12)} color="#F4B942" fill="#F4B942" />
            <AppText variant="caption" weight="semiBold" family="secondary" style={styles.ratingValue}>
              {therapist.rating.toFixed(1)}
            </AppText>
            <AppText variant="caption" style={styles.ratingCount} family="secondary">
              ({therapist.reviewCount} reviews)
            </AppText>
          </View>

          {/* Name */}
          <AppText weight="extraBold" family="primary" style={styles.name} numberOfLines={1}>
            {therapist.name}
          </AppText>

          {/* Specialty */}
          <AppText variant="caption" weight="regular" style={styles.specialty} numberOfLines={1}>
            {therapist.specialty}
          </AppText>

          {/* Next Slot */}
          <View style={styles.slotRow}>
            <Clock
              size={normalize(12)}
              color={colors.typographyColor['Dark 2']}
              strokeWidth={2}
            />
            <AppText variant="caption" weight="medium" family="secondary" style={styles.slotText}>
              Next Slot: {therapist.nextSlot}
            </AppText>
          </View>
        </View>
      </View>

      {/* Footer: price + Book Now */}
      <View style={styles.footer}>
        <View>
          <AppText variant="caption" weight="medium" style={styles.priceLabel}>
            SESSION PRICE
          </AppText>
          <View style={styles.priceRow}>
            <AppText weight="extraBold" family="primary" style={styles.priceValue}>
              {therapist.currency}{therapist.sessionPrice}
            </AppText>
            <AppText variant="caption" weight="medium" style={styles.perHr}>
              /hr
            </AppText>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onBookNow(therapist)}
          style={{ borderRadius: borderRadius.full }}
        >
          <LinearGradient
            colors={[colors.lightTints.blueLightTint[400], colors.lightAppTheme[700]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.bookBtn, { borderRadius: borderRadius.full }]}
          >
            <AppText variant="caption" weight="bold" style={styles.bookBtnText}>
              Book Now
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const TherapistCard = memo(TherapistCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: normalize(20),
    marginBottom: normalize(14),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(14),
  },
  avatar: {
    width: normalize(72),
    height: normalize(72),
    borderRadius: normalize(36),
    backgroundColor: '#E2E8F0',
  },
  infoCol: {
    flex: 1,
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    borderRadius: normalize(12),
    alignSelf: 'flex-start',
    marginBottom: normalize(4),
    gap: normalize(4),
  },
  checkIconRoot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {},
  freeBadgeText: {
    color: '#FFFFFF',
    fontSize: normalize(9),
    letterSpacing: 0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    marginBottom: normalize(2),
  },
  ratingValue: {
    fontSize: normalize(12),
    color: '#1E293B',
  },
  ratingCount: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  name: {
    fontSize: normalize(16),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  specialty: {
    fontSize: normalize(12),
    color: '#64748B',
    marginBottom: normalize(6),
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  slotText: {
    fontSize: normalize(11),
    color: '#475569',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(14),
    paddingTop: normalize(12),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceLabel: {
    fontSize: normalize(10),
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: normalize(2),
  },
  priceValue: {
    fontSize: normalize(18),
    color: '#0F172A',
  },
  perHr: {
    fontSize: normalize(12),
    color: '#64748B',
  },
  bookBtn: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
  },
});
