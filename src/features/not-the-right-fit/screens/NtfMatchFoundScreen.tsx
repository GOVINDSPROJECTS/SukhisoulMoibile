import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
  FlatList,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldCheck } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { TherapistMatchCard } from '../components/TherapistMatchCard';
import LinearGradient from 'react-native-linear-gradient';
import { TherapistCard, type TherapistData } from '../../explore-psychologists/components/TherapistCard';

const STATIC_THERAPISTS: TherapistData[] = [
  {
    id: '1',
    name: 'Dr. Elena Sofia',
    designation: 'Clinical Psychologist',
    specialty: 'Anxiety & Focus',
    rating: 4.8,
    reviewCount: 94,
    nextSlot: 'Today, 4PM',
    sessionPrice: 55,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    name: 'Marcus Chen, PhD',
    designation: 'Psychotherapist',
    specialty: 'Anxiety & Focus',
    rating: 4.8,
    reviewCount: 94,
    nextSlot: 'Today, 4PM',
    sessionPrice: 55,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '3',
    name: 'Dr. Vikey Sharma',
    designation: 'Counselling Psychologist',
    specialty: 'Anxiety & Focus',
    rating: 4.8,
    reviewCount: 94,
    nextSlot: 'Today, 4PM',
    sessionPrice: 55,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '4',
    name: 'Dr. Priya Nair',
    designation: 'Child Psychologist',
    specialty: 'Stress & Relationships',
    rating: 4.9,
    reviewCount: 120,
    nextSlot: 'Tomorrow, 10AM',
    sessionPrice: 70,
    currency: '₹',
    hasFreeIntro: false,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '5',
    name: 'Dr. Arjun Mehta',
    designation: 'Psychiatrist',
    specialty: 'Depression & Trauma',
    rating: 4.7,
    reviewCount: 68,
    nextSlot: 'Today, 6PM',
    sessionPrice: 90,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '6',
    name: 'Dr. Sneha Kulkarni',
    designation: 'Behavioural Therapist',
    specialty: 'Sleep & Anxiety',
    rating: 4.6,
    reviewCount: 52,
    nextSlot: 'Today, 8PM',
    sessionPrice: 60,
    currency: '₹',
    hasFreeIntro: false,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
  },
];

const MATCHES = [
  {
    id: '1',
    name: 'Dr. Elena Sofia',
    speciality: 'Anxiety & Focus',
    rating: 4.8,
    reviews: 94,
    nextSlot: 'Today, 4PM',
    pricePerHr: '55',
    photo: require('@assets/dummy.webp'),
  },
  {
    id: '2',
    name: 'Dr. Elena Sofia',
    speciality: 'Anxiety & Focus',
    rating: 4.8,
    reviews: 94,
    nextSlot: 'Today, 4PM',
    pricePerHr: '55',
    photo: require('@assets/dummy.webp'),
  },
];

export const NtfMatchFoundScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const handleBookNow = useCallback(
    (therapist: TherapistData) => {
      navigation.navigate('BookTherapy', {
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
    <View
      style={styles.containerInner}
    >
      <AppText variant="h3" family='secondary' weight="extraBold" style={styles.heading} center>
        We've found psychologists who{'\n'}match your preferences
      </AppText>
    </View>
  );
  const ListFooter = (
    <View style={[styles.reassureBanner, { marginBottom: insets.bottom + normalize(16), marginHorizontal: normalize(20) }]}>
      <ShieldCheck size={normalize(20)} color={colors.lightAppTheme[700]} strokeWidth={1.5} />
      <View style={styles.reassureText}>
        <AppText variant="body" weight="semiBold" style={styles.reassureTitle}>
          Your journey matters
        </AppText>
        <AppText variant="caption" weight="regular" style={styles.reassureSub}>
          You can always change your therapist if you feel you need a better match.
        </AppText>
      </View>
    </View>
  );
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />

      {/* <NtfHeader currentStep={8} totalSteps={8} onBack={() => navigation.goBack()} /> */}
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
        style={{ marginBottom: normalize(100) }}
      >
        <FlatList<TherapistData>
          data={STATIC_THERAPISTS}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={8}
          removeClippedSubviews
        />
      </LinearGradient>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#F8F9FF' },
  containerInner: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(30),
    paddingBottom: normalize(15),
  },
  scroll: { flex: 1 },
  heading: {
    color: colors.typographyColor.Black,
    fontSize: normalize(18),
    lineHeight: normalize(26),
    marginBottom: normalize(16),
  },
  reassureBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(12),
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(14),
    padding: normalize(14),
    marginTop: normalize(6),
  },
  reassureText: { flex: 1, gap: normalize(3) },
  reassureTitle: {
    color: colors.lightAppTheme[700],
    fontSize: normalize(13),
  },
  reassureSub: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11.5),
    lineHeight: normalize(17),
  },
});
