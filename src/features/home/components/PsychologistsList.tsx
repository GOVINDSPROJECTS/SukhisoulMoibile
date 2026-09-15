import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Star, Clock, ChevronDown, Heart } from 'lucide-react-native';
import { useTopRatedProfessionals } from '@features/home/hooks/useProfessionals';
import {
  getProfessionalAvatar,
  getPrimaryExpertise,
  type Professional,
} from '@api/professionals';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

// ─── Skeleton row ─────────────────────────────────────────────────────────────
const SkeletonRow: React.FC = () => (
  <View style={styles.therapistCard}>
    <View style={styles.skeletonAvatar} />
    <View style={{ flex: 1, paddingLeft: normalize(12) }}>
      <View style={[styles.skeletonLine, { width: '40%', marginBottom: normalize(6) }]} />
      <View style={[styles.skeletonLine, { width: '70%', marginBottom: normalize(4) }]} />
      <View style={[styles.skeletonLine, { width: '55%' }]} />
    </View>
  </View>
);

// ─── Single therapist card ────────────────────────────────────────────────────
const TherapistCard: React.FC<{
  pro: Professional;
}> = ({ pro }) => {
  const navigation = useNavigation<NavigationProp>();
  const imageUrl = getProfessionalAvatar(pro);
  const ratingStr = pro.rating ? parseFloat(pro.rating).toFixed(1) : '4.8';
  const reviewCount = pro.total_reviews
    ? `${pro.total_reviews} reviews`
    : '94 reviews';
  const specialty = getPrimaryExpertise(pro) || 'Anxiety & Focus';

  const doctorFee = pro.consultation_fee
    ? Math.round(Number(pro.consultation_fee))
    : (pro.session_rate_video ? Math.round(Number(pro.session_rate_video)) : 500);

  const handleCardPress = () => {
    navigation.navigate('PsychologistProfile', {
      doctorId: pro.uuid,
      doctorName: pro.user?.name ?? 'Dr. Expert',
      designation: specialty,
      price: doctorFee,
      avatarUrl: imageUrl,
      rating: ratingStr,
      experience: pro.years_experience ? `${pro.years_experience}+` : '7+',
      bio: pro.bio,
      languages: pro.languages_spoken,
      expertise: pro.expertise,
    });
  };

  const handleBookNow = () => {
    navigation.navigate('BookTherapy', {
      doctorId: pro.uuid,
      doctorName: pro.user?.name ?? 'Dr. Expert',
      designation: specialty,
      price: doctorFee,
    });
  };

  return (
    <TouchableOpacity
      style={styles.therapistCard}
      activeOpacity={0.9}
      onPress={handleCardPress}
    >
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.therapistAvatar} />
      </View>

      {/* Right content */}
      <View style={styles.infoWrapper}>
        {/* Rating row */}
        <View style={styles.ratingRowTop}>
          <Star size={normalize(11)} color="#F59E0B" fill="#F59E0B" style={{ marginRight: normalize(3) }} />
          <AppText variant="caption" weight="bold" style={styles.ratingVal}>
            {ratingStr}{' '}
            <AppText variant="caption" weight="regular" style={styles.reviewCount}>
              ({reviewCount})
            </AppText>
          </AppText>
        </View>

        {/* Doctor Name */}
        <AppText
          variant="body"
          weight="bold"
          style={styles.docName}
          numberOfLines={1}
        >
          {pro.user?.name ?? 'Dr. Vikey Sharma'}
        </AppText>

        {/* Specialty */}
        <AppText
          variant="caption"
          weight="regular"
          style={styles.specialtyText}
          numberOfLines={1}
        >
          {specialty}
        </AppText>

        {/* Next Slot Row & Book Now Button */}
        <View style={styles.cardBottomRow}>
          <View style={styles.slotRow}>
            <Clock size={normalize(11)} color={colors.blue[600]} style={{ marginRight: normalize(4) }} />
            <AppText variant="caption" weight="medium" style={styles.slotText}>
              Next Slot: Today, 6PM
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.bookNowBtn}
            activeOpacity={0.85}
            onPress={handleBookNow}
          >
            <AppText variant="caption" weight="bold" style={styles.bookNowBtnText}>
              Book Now
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const PsychologistsList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, isError, refetch } = useTopRatedProfessionals(10);

  const professionals = data?.data ?? [];

  const miniAvatarUrls = professionals
    .slice(0, 3)
    .map((p) => getProfessionalAvatar(p));

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerContainer}>
        <AppText
          variant="h3"
          weight="medium"
          style={styles.title}
        >
          Book our best {'\n'}psychologists
        </AppText>
        <AppText
          variant="caption"
          weight="regular"
          style={styles.subtitle}
        >
          Vetted experts specializing in holistic mental well-being.
        </AppText>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dropdownLink}
          onPress={() => navigation.navigate('ExplorePsychologists')}
        >
          <AppText
            variant="caption"
            weight="bold"
            style={styles.seeAllExpertsText}
          >
            See All Experts
          </AppText>
          <ChevronDown size={normalize(14)} color={colors.blue[700]} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        {isLoading ? (
          [0, 1, 2].map((i) => <SkeletonRow key={i} />)
        ) : isError ? (
          <TouchableOpacity
            onPress={() => refetch()}
            style={styles.errorContainer}
          >
            <AppText
              variant="caption"
              weight="semiBold"
              style={{ color: '#E53935', textAlign: 'center' }}
            >
              Failed to load. Tap to retry.
            </AppText>
          </TouchableOpacity>
        ) : (
          professionals.map((pro) => (
            <TherapistCard
              key={pro.uuid}
              pro={pro}
            />
          ))
        )}
      </View>

      {/* See all button with overlapping mini-avatars */}
      {!isLoading && !isError && miniAvatarUrls.length > 0 && (
        <TouchableOpacity
          style={styles.seeAllBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ExplorePsychologists')}
        >
          <View style={styles.avatarsOverlap}>
            {miniAvatarUrls.map((url, idx) => (
              <Image
                key={idx}
                source={{ uri: url }}
                style={[styles.miniAvatar, { left: idx * 16 }]}
              />
            ))}
          </View>
          <AppText
            variant="body"
            weight="bold"
            style={styles.seeAllBtnText}
          >
            See all 100+ psychologists
          </AppText>
        </TouchableOpacity>
      )}

      {/* Footer Brand Logo Text */}
      <View style={styles.footerBrand}>
        <AppText
          variant="caption"
          weight="semiBold"
          style={{ color: colors.typographyColor['Color 2'], letterSpacing: 0.5, fontSize: normalize(13) }}
        >
          Sukhi Soul
        </AppText>
        <View style={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: normalize(30)
        }}>
          <AppText
            variant="caption"
            weight="medium"
            style={{
              color: colors.typographyColor.Medium,
              fontSize: normalize(12),
            }}
          >
            Your Shield Partner
          </AppText>
          <Heart size={normalize(16)} fill={colors.lightTints.blueLightTint[200]} color={colors.blue[700]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(14),
    paddingHorizontal: normalize(20),
    marginBottom: normalize(-125)
  },
  headerContainer: {
    marginBottom: normalize(12),
  },
  title: {
    fontSize: normalize(13),
    color: '#37392F',
    lineHeight: normalize(20),
  },
  subtitle: {
    fontSize: normalize(12),
    color: '#64655B',
    lineHeight: normalize(16),
    marginTop: normalize(10),
  },
  dropdownLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(8),
    alignSelf: 'flex-start',
  },
  seeAllExpertsText: {
    fontSize: normalize(12.5),
    color: colors.typographyColor['Color 2'],
    marginRight: normalize(4),
  },
  listContainer: {
    marginVertical: normalize(6),
  },
  therapistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(22),
    padding: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: colors.blue[100],
    shadowColor: colors.appThemeColor[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarWrapper: {
    marginRight: normalize(14),
  },
  therapistAvatar: {
    width: normalize(85),
    height: normalize(85),
    borderRadius: normalize(32),
    backgroundColor: colors.blue[50],
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
    borderColor: '#B2C2D9',
    borderWidth: normalize(1),

  },
  infoWrapper: {
    flex: 1,
  },
  ratingRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(2),
  },
  ratingVal: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  reviewCount: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Medium,
  },
  docName: {
    fontSize: normalize(14.5),
    color: colors.typographyColor.Black,
    marginBottom: normalize(1),
  },
  specialtyText: {
    fontSize: normalize(11.5),
    color: '#3E6752',
    marginBottom: normalize(6),
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  slotText: {
    fontSize: normalize(10.5),
    color: colors.blue[600],
  },
  bookNowBtn: {
    backgroundColor: colors.blue[600],
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(11.5),
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    borderWidth: 1,
    borderColor: colors.blue[100],
    height: normalize(48),
    marginTop: normalize(8),
    marginBottom: normalize(16),
    position: 'relative',
    shadowColor: colors.appThemeColor[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  avatarsOverlap: {
    position: 'absolute',
    left: '12%',
    height: normalize(28),
    width: normalize(56),
    justifyContent: 'center',
  },
  miniAvatar: {
    position: 'absolute',
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  seeAllBtnText: {
    fontSize: normalize(13),
    color: colors.blue[700],
  },
  skeletonAvatar: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(20),
    backgroundColor: colors.blue[100],
  },
  skeletonLine: {
    height: normalize(10),
    borderRadius: normalize(4),
    backgroundColor: colors.blue[100],
  },
  errorContainer: {
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    marginBottom: normalize(12),
  },
  footerBrand: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.appThemeColor[75],
    marginVertical: normalize(14),
    marginHorizontal: normalize(-20),
    paddingVertical: normalize(130),
    paddingHorizontal: normalize(20)
  },
});
