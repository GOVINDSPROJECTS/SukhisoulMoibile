import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Info } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { TherapistCard, type TherapistData } from '@features/explore-psychologists/components/TherapistCard';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

// ─── Static data (mirrors ExplorePsychologistsScreen) ─────────────────────────

const THERAPISTS: TherapistData[] = [
  {
    id: 'fc1',
    name: 'Dr. Elena Sofia',
    designation: 'Clinical Psychologist',
    specialty: 'Anxiety & Focus',
    rating: 4.8,
    reviewCount: 94,
    nextSlot: 'Today, 4PM',
    sessionPrice: 55,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'fc2',
    name: 'Dr. Priya Nair',
    designation: 'Child Psychologist',
    specialty: 'Stress & Relationships',
    rating: 4.9,
    reviewCount: 120,
    nextSlot: 'Tomorrow, 10AM',
    sessionPrice: 70,
    currency: '₹',
    hasFreeIntro: false,
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'fc3',
    name: 'Dr. Arjun Mehta',
    designation: 'Psychiatrist',
    specialty: 'Depression & Trauma',
    rating: 4.7,
    reviewCount: 68,
    nextSlot: 'Today, 6PM',
    sessionPrice: 90,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'fc4',
    name: 'Dr. Sneha Kulkarni',
    designation: 'Behavioural Therapist',
    specialty: 'Sleep & Anxiety',
    rating: 4.6,
    reviewCount: 52,
    nextSlot: 'Today, 8PM',
    sessionPrice: 60,
    currency: '₹',
    hasFreeIntro: false,
    avatarUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export const FcSelectTherapistScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleBookNow = useCallback(
    (therapist: TherapistData) => {
      navigation.navigate('FcBookSession', {
        doctorName: therapist.name,
        doctorId: therapist.id,
        designation: therapist.designation,
        price: therapist.sessionPrice,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TherapistData>) => (
      <TherapistCard therapist={item} onBookNow={handleBookNow} />
    ),
    [handleBookNow],
  );

  const keyExtractor = useCallback((item: TherapistData) => item.id, []);

  const ListHeader = (
    <>
      {/* Header gradient */}
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>
        <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
          Family Care
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      {/* Info banner */}
      <View style={styles.infoBanner}>
        <AppText variant="caption" weight="regular" style={styles.infoBannerText}>
          Suggestions are based on the information provided, so make sure you fill accurate information !
        </AppText>
      </View>
    </>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
        <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />
        <FlatList<TherapistData>
          data={THERAPISTS}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={6}
          removeClippedSubviews
        />
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
  headerSpacer: {
    width: normalize(36),
  },
  infoBanner: {
    flexDirection: 'row',
    gap: normalize(8),
    marginHorizontal: normalize(20),
    marginTop: normalize(12),
    marginBottom: normalize(16),
    backgroundColor: colors.appThemeColor[50],
    borderRadius: normalize(12),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(15),
    borderWidth: 1,
    borderColor: colors.tintsGrey[200],
  },
  infoBannerText: {
    flex: 1,
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    lineHeight: normalize(17),
    textAlign: 'center'
  },
  listContent: {
    paddingBottom: normalize(40),
  },
});
