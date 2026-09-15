import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Star, Clock } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface TherapistMatchCardProps {
  name: string;
  speciality: string;
  rating: number;
  reviews: number;
  nextSlot: string;
  pricePerHr: string;
  photo: ImageSourcePropType;
  onBook: () => void;
}

export const TherapistMatchCard: React.FC<TherapistMatchCardProps> = ({
  name,
  speciality,
  rating,
  reviews,
  nextSlot,
  pricePerHr,
  photo,
  onBook,
}) => (
  <View style={styles.card}>
    {/* Intro badge */}
    <View style={styles.introBadge}>
      <View style={styles.introBlue} />
      <AppText variant="caption" weight="bold" style={styles.introText}>
        FREE 15-MIN INTRO AVAILABLE
      </AppText>
    </View>

    <View style={styles.body}>
      {/* Photo */}
      <Image source={photo} style={styles.photo} />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <Star size={normalize(12)} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <AppText variant="caption" weight="semiBold" style={styles.ratingText}>
            {rating} ({reviews} reviews)
          </AppText>
        </View>
        <AppText variant="body" weight="extraBold" style={styles.name}>
          {name}
        </AppText>
        <AppText variant="caption" weight="regular" style={styles.speciality}>
          {speciality}
        </AppText>
        <View style={styles.slotRow}>
          <Clock size={normalize(11)} color={colors.typographyColor.Medium} strokeWidth={1.5} />
          <AppText variant="caption" weight="regular" style={styles.slotText}>
            Next Slot: {nextSlot}
          </AppText>
        </View>
      </View>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <View>
        <AppText variant="caption" weight="regular" style={styles.priceLabel}>
          SESSION PRICE
        </AppText>
        <AppText variant="body" weight="extraBold" style={styles.price}>
          ₹{pricePerHr}/hr
        </AppText>
      </View>

      <TouchableOpacity onPress={onBook} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bookBtn}
        >
          <AppText variant="body" weight="bold" style={styles.bookBtnText}>
            Book Now
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  introBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginBottom: normalize(10),
  },
  introBlue: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.lightAppTheme[700],
  },
  introText: {
    color: colors.lightAppTheme[700],
    fontSize: normalize(10),
    letterSpacing: 0.3,
  },
  body: {
    flexDirection: 'row',
    gap: normalize(12),
    marginBottom: normalize(14),
  },
  photo: {
    width: normalize(72),
    height: normalize(72),
    borderRadius: normalize(12),
    backgroundColor: colors.gray[50]
  },
  info: {
    flex: 1,
    gap: normalize(2),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  ratingText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  name: {
    color: '#1E293B',
    fontSize: normalize(14),
    marginTop: normalize(2),
  },
  speciality: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    marginTop: normalize(4),
  },
  slotText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.appThemeColor[75],
    paddingTop: normalize(12),
  },
  priceLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  price: {
    color: '#1E293B',
    fontSize: normalize(16),
    marginTop: normalize(2),
  },
  bookBtn: {
    borderRadius: normalize(30),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(22),
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
});
