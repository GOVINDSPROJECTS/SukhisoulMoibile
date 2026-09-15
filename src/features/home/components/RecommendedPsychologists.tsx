import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Star, Clock, ArrowRight } from 'lucide-react-native';
import { useFeaturedProfessionals } from '@features/home/hooks/useProfessionals';
import {
  getProfessionalAvatar,
  getPrimaryExpertise,
  getExperienceLabel,
  type Professional,
} from '@api/professionals';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

// --- Skeleton card shown while loading ---------------------------------------
const SkeletonCard: React.FC = () => (
  <View style={[styles.card, styles.skeletonCard]}>
    <View style={styles.skeletonImageContainer}>
      <View style={styles.skeletonAvatar} />
    </View>
    <View style={styles.skeletonLine} />
    <View style={[styles.skeletonLine, { width: '60%', marginTop: normalize(6) }]} />
    <View style={[styles.skeletonLine, { width: '80%', marginTop: normalize(8) }]} />
  </View>
);

// --- Single doctor card -------------------------------------------------------
const PsychologistCard: React.FC<{
  pro: Professional;
}> = ({ pro }) => {
  const navigation = useNavigation<NavigationProp>();
  const imageUrl = getProfessionalAvatar(pro);
  const primaryExpertise = getPrimaryExpertise(pro);
  const experienceLabel = getExperienceLabel(pro);
  const ratingStr = pro.rating ? parseFloat(pro.rating).toFixed(1) : '4.9';

  const doctorFee = pro.consultation_fee
    ? Math.round(Number(pro.consultation_fee))
    : (pro.session_rate_video ? Math.round(Number(pro.session_rate_video)) : 500);

  const handleCardPress = () => {
    navigation.navigate('PsychologistProfile', {
      doctorId: pro.uuid,
      doctorName: pro.user?.name ?? 'Dr. Expert',
      designation: primaryExpertise,
      price: doctorFee,
      avatarUrl: imageUrl,
      rating: ratingStr,
      experience: experienceLabel,
      bio: pro.bio,
      languages: pro.languages_spoken,
      expertise: pro.expertise,
    });
  };

  const handleBookPress = () => {
    navigation.navigate('BookTherapy', {
      doctorId: pro.uuid,
      doctorName: pro.user?.name ?? 'Dr. Expert',
      designation: primaryExpertise,
      price: doctorFee,
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={handleCardPress}
    >
      {/* Avatar Container with rating badge and online dot */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.avatar} />

        {/* Top-left Rating Badge */}
        <View style={styles.ratingBadge}>
          <Star size={normalize(10)} color="#F59E0B" fill="#F59E0B" style={{ marginRight: normalize(3) }} />
          <AppText variant="caption" weight="bold" style={styles.ratingText}>
            {ratingStr}
          </AppText>
        </View>

        {/* Top-right Online Indicator */}
        <View style={styles.onlineDot} />
      </View>

      {/* Doctor Info */}
      <View style={styles.infoWrapper}>
        <AppText
          variant="body"
          weight="bold"
          style={styles.docName}
          numberOfLines={1}
        >
          {pro.user?.name ?? 'Dr. Ananya S.'}
        </AppText>

        <AppText
          variant="caption"
          weight="regular"
          style={styles.specialty}
          numberOfLines={1}
        >
          {primaryExpertise || 'Anxiety Specialist'}
        </AppText>

        <AppText
          variant="caption"
          weight="regular"
          style={styles.experience}
          numberOfLines={1}
        >
          {experienceLabel || '6+ Years Experience.'}
        </AppText>
      </View>

      {/* Bottom Row: Time and Book Button */}
      <View style={styles.bottomRow}>
        <View style={styles.timeContainer}>
          <Clock size={normalize(12)} color={colors.blue[600]} style={{ marginRight: normalize(4) }} />
          <AppText
            variant="caption"
            weight="medium"
            style={styles.timeText}
            numberOfLines={1}
          >
            7PM Today
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          activeOpacity={0.85}
          onPress={handleBookPress}
        >
          <AppText variant="caption" weight="bold" style={styles.bookBtnText}>
            Book
          </AppText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// --- Main component -----------------------------------------------------------
export const RecommendedPsychologists: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading, isError, refetch } = useFeaturedProfessionals(6);

  const professionals = data?.data ?? [];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <AppText
          variant="h3"
          weight="extraBold"
          style={styles.title}
        >
          RECOMMENDED EXPERTS
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ExplorePsychologists')}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: normalize(4) }}
        >
          <AppText
            variant="caption"
            weight="bold"
            family='secondary'
            style={styles.viewAll}
          >
            See all
          </AppText>
          <ArrowRight size={normalize(14)} color={colors.blue[700]} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {isError ? (
        <TouchableOpacity onPress={() => refetch()} style={styles.errorContainer}>
          <AppText
            variant="caption"
            weight="semiBold"
            style={{ color: '#E53935', textAlign: 'center' }}
          >
            Could not load psychologists. Tap to retry.
          </AppText>
        </TouchableOpacity>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {isLoading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : professionals.map((pro) => (
              <PsychologistCard
                key={pro.uuid}
                pro={pro}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(12),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(14),
    paddingHorizontal: normalize(20),
  },
  title: {
    fontSize: normalize(15),
    color: colors.typographyColor['Theme Medium'],
    letterSpacing: 0.2,
  },
  viewAll: {
    fontSize: normalize(12.5),
    color: colors.blue[700],
  },
  scrollContainer: {
    paddingHorizontal: normalize(20),
    gap: normalize(12),
    marginBottom: normalize(20)
  },
  card: {
    width: normalize(175),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(12),
    paddingVertical: normalize(15),
    borderWidth: 1,
    borderColor: colors.appThemeColor[100],
    boxShadow: '5px 5px 1px rgba(0, 0, 0, 0.1)',
    marginRight: normalize(5)
  },
  imageWrapper: {
    position: 'relative',
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(15),
    padding: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: normalize(112),
    borderRadius: normalize(15),
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  ratingBadge: {
    position: 'absolute',
    top: normalize(12),
    left: normalize(12),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2.5),
    borderRadius: normalize(8),
  },
  ratingText: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Dark,
  },
  onlineDot: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.green[400],
  },
  infoWrapper: {
    paddingHorizontal: normalize(4),
    paddingTop: normalize(10),
    paddingBottom: normalize(8),
  },
  docName: {
    fontSize: normalize(14),
    color: '#1F2937',
    marginBottom: normalize(2),
  },
  specialty: {
    fontSize: normalize(11.5),
    color: '#8E8E8E',
    marginBottom: normalize(2),
  },
  experience: {
    fontSize: normalize(11),
    color: '#8E8E8E',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(4),
    paddingTop: normalize(4),
    paddingBottom: normalize(2),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeText: {
    fontSize: normalize(11),
    color: colors.typographyColor['Color 2'],
  },
  bookBtn: {
    backgroundColor: colors.lightAppTheme[700],
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
  },
  skeletonCard: {
    alignItems: 'center',
  },
  skeletonImageContainer: {
    width: '100%',
    height: normalize(112),
    borderRadius: normalize(18),
    backgroundColor: colors.blue[50],
    marginBottom: normalize(10),
  },
  skeletonAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(14),
    backgroundColor: colors.blue[100],
  },
  skeletonLine: {
    height: normalize(10),
    width: '85%',
    borderRadius: normalize(4),
    backgroundColor: colors.blue[100],
  },
  errorContainer: {
    marginHorizontal: normalize(20),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
});
