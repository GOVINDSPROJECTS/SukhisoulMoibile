import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import { AppText } from '@components/atoms/AppText';
import type { NavigationProp } from '@navigation/types';

import { ExploreHeader } from '../components/ExploreHeader';
import { ExploreSearchBar } from '../components/ExploreSearchBar';
import { SpecialtyFilterTabs, type SpecialtyKey } from '../components/SpecialtyFilterTabs';
import { FilterBottomSheet, type FilterState } from '../components/FilterBottomSheet';
import { TherapistCard, type TherapistData } from '../components/TherapistCard';
import LinearGradient from 'react-native-linear-gradient';

import { useProfessionals } from '@features/home/hooks/useProfessionals';
import { getProfessionalAvatar } from '@api/professionals';

// ─── Static Fallback Data ───────────────────────────────────────────────────

const STATIC_THERAPISTS: TherapistData[] = [
  {
    id: '365b31ac-0448-4928-8492-0b5e8949c831',
    name: 'Dr. Sameer Joshi',
    designation: 'Senior Clinical Psychologist',
    specialty: 'Stress, Anxiety & Relationships',
    rating: 4.9,
    reviewCount: 42,
    nextSlot: 'Today, 4:00 PM',
    sessionPrice: 500,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    experience: '12+ yrs',
    languages: ['English', 'Hindi', 'Marathi'],
    expertise: ['Cognitive Behavioral Therapy (CBT)', 'Stress Management', 'Mindfulness'],
  },
  {
    id: '2',
    name: 'Dr. Ananya Sharma',
    designation: 'Child & Adolescent Psychologist',
    specialty: 'Depression, Focus & Family Care',
    rating: 4.85,
    reviewCount: 38,
    nextSlot: 'Tomorrow, 10:00 AM',
    sessionPrice: 600,
    currency: '₹',
    hasFreeIntro: false,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813583-11b01777b789?auto=format&fit=crop&q=80&w=300',
    experience: '8+ yrs',
    languages: ['English', 'Hindi'],
    expertise: ['Child Therapy', 'Depression', 'Emotional Resilience'],
  },
  {
    id: '3',
    name: 'Dr. Vikram Sethi',
    designation: 'Neuropsychologist & Counselor',
    specialty: 'Trauma, Sleep & Panic Disorders',
    rating: 4.92,
    reviewCount: 65,
    nextSlot: 'Today, 6:30 PM',
    sessionPrice: 750,
    currency: '₹',
    hasFreeIntro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    experience: '15+ yrs',
    languages: ['English', 'Hindi', 'Punjabi'],
    expertise: ['Trauma Recovery', 'Sleep Hygiene', 'PTSD'],
  },
];

// ─── Screen ────────────────────────────────────────────────────────────────────

export const ExplorePsychologistsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const { data: apiData, isLoading, isRefetching, refetch } = useProfessionals({ per_page: 50 });
  const rawProfessionals = apiData?.data ?? [];

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const realTherapists: TherapistData[] = useMemo(() => {
    if (!rawProfessionals || rawProfessionals.length === 0) return STATIC_THERAPISTS;
    return rawProfessionals.map((pro) => ({
      id: pro.uuid,
      name: pro.user?.name ?? 'Dr. Expert',
      designation: pro.highest_qualification || 'Clinical Psychologist',
      specialty: Array.isArray(pro.expertise) ? pro.expertise.join(', ') : (pro.expertise || 'Holistic Mental Health'),
      rating: pro.rating ? parseFloat(pro.rating) : 4.8,
      reviewCount: pro.total_reviews || 30,
      nextSlot: 'Today, Available',
      sessionPrice: pro.consultation_fee ? Math.round(parseFloat(pro.consultation_fee)) : 500,
      currency: '₹',
      hasFreeIntro: !!pro.offers_free_intro_session,
      avatarUrl: getProfessionalAvatar(pro),
      bio: pro.bio,
      languages: Array.isArray(pro.languages_spoken) ? pro.languages_spoken : ['English', 'Hindi'],
      expertise: Array.isArray(pro.expertise) ? pro.expertise : ['Anxiety', 'Stress'],
      experience: pro.years_experience ? `${pro.years_experience}+ yrs` : '7+ yrs',
    }));
  }, [rawProfessionals]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyKey>('all');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    concerns: [],
    availability: [],
    modes: [],
    priceRange: [],
    languages: [],
    rating: [],
  });

  const handleFilterApply = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
  }, []);

  // Filter therapists by specialty, search query, and bottom sheet filters
  const filtered = useMemo(() => {
    let list = realTherapists;

    // Specialty filter tab
    if (selectedSpecialty !== 'all') {
      const spec = selectedSpecialty.toLowerCase();
      list = list.filter((t) => {
        const fullSpec = `${t.specialty} ${t.expertise?.join(' ') || ''}`.toLowerCase();
        return fullSpec.includes(spec);
      });
    }

    // Text Search query (matches name, specialty, designation, languages, bio)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((t) => {
        const nameMatch = t.name.toLowerCase().includes(q);
        const specMatch = t.specialty.toLowerCase().includes(q);
        const desigMatch = t.designation.toLowerCase().includes(q);
        const expMatch = t.expertise?.some((e) => e.toLowerCase().includes(q)) ?? false;
        const langMatch = t.languages?.some((l) => l.toLowerCase().includes(q)) ?? false;
        const bioMatch = t.bio?.toLowerCase().includes(q) ?? false;

        return nameMatch || specMatch || desigMatch || expMatch || langMatch || bioMatch;
      });
    }

    // Modal filters (price range, rating, languages)
    if (activeFilters.languages.length > 0) {
      list = list.filter((t) =>
        t.languages?.some((lang) => activeFilters.languages.includes(lang))
      );
    }

    if (activeFilters.rating.length > 0) {
      const minRating = Math.min(...activeFilters.rating.map((r) => parseFloat(r.replace('+', ''))));
      list = list.filter((t) => t.rating >= minRating);
    }

    return list;
  }, [realTherapists, selectedSpecialty, searchQuery, activeFilters]);

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

  const handlePressProfile = useCallback(
    (therapist: TherapistData) => {
      navigation.navigate('PsychologistProfile', {
        doctorId: therapist.id,
        doctorName: therapist.name,
        designation: therapist.designation,
        price: therapist.sessionPrice,
        avatarUrl: therapist.avatarUrl,
        rating: therapist.rating.toFixed(1),
        experience: therapist.experience || '7+ yrs',
        bio: therapist.bio,
        languages: therapist.languages,
        expertise: therapist.expertise,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TherapistData>) => (
      <TherapistCard
        therapist={item}
        onBookNow={handleBookNow}
        onPressProfile={handlePressProfile}
      />
    ),
    [handleBookNow, handlePressProfile],
  );

  const keyExtractor = useCallback((item: TherapistData) => item.id, []);

  const ListEmpty = (
    <View style={styles.emptyContainer}>
      <AppText variant="body" weight="bold" color="#1E293B" style={styles.emptyTitle}>
        No therapists found
      </AppText>
      <AppText variant="caption" color="#64748B" style={styles.emptySubtitle}>
        {searchQuery
          ? `No results matching "${searchQuery}". Try searching for another name or concern.`
          : 'Try selecting a different specialty or clearing filters.'}
      </AppText>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['bottom', 'left', 'right']}
      >
        <View style={{ paddingTop: insets.top }} />

        {/* Sticky Header */}
        <ExploreHeader />

        {/* Pinned Top Hero, Search Bar & Specialty Tabs */}
        <LinearGradient
          colors={[
            colors.appThemeColor[50],
            colors.lightTints.blueLightTint[100],
          ]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pinnedHeader}
        >
          {/* Hero section */}
          <View style={styles.heroSection}>
            <AppText weight="extraBold" family="primary" style={styles.heroTitle}>
              Book our best{'\n'}psychologists
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.heroSubtitle}>
              Vetted experts specializing in holistic mental well-being.
            </AppText>
          </View>

          {/* Search Bar */}
          <ExploreSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => setFilterVisible(true)}
          />

          {/* Specialty Filter Tabs */}
          <SpecialtyFilterTabs
            selected={selectedSpecialty}
            onSelect={setSelectedSpecialty}
          />
        </LinearGradient>

        {/* Search Results Summary */}
        <View style={styles.resultsBar}>
          <AppText variant="caption" weight="bold" color="#475569">
            {isLoading ? 'Loading psychologists...' : `Showing ${filtered.length} verified psychologists`}
          </AppText>
          {searchQuery.trim().length > 0 && (
            <AppText variant="caption" weight="medium" color="#2563EB">
              for "{searchQuery.trim()}"
            </AppText>
          )}
        </View>

        {/* Therapist List */}
        {isLoading && rawProfessionals.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1E5AF0" />
            <AppText variant="caption" color="#64748B" style={{ marginTop: 8 }}>
              Finding best psychologists...
            </AppText>
          </View>
        ) : (
          <FlatList<TherapistData>
            data={filtered}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={ListEmpty}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={8}
            keyboardShouldPersistTaps="handled"
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        )}
      </SafeAreaView>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleFilterApply}
        initialFilters={activeFilters}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  pinnedHeader: {
    width: '100%',
    paddingBottom: normalize(4),
  },
  heroSection: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(14),
    paddingBottom: normalize(12),
  },
  heroTitle: {
    fontSize: normalize(26),
    color: '#1E293B',
    lineHeight: normalize(32),
  },
  heroSubtitle: {
    fontSize: normalize(12.5),
    color: '#475569',
    marginTop: normalize(4),
    lineHeight: normalize(18),
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
  listContent: {
    paddingBottom: normalize(40),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(40),
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: normalize(40),
    paddingHorizontal: normalize(32),
  },
  emptyTitle: {
    fontSize: normalize(15),
    marginBottom: normalize(4),
  },
  emptySubtitle: {
    textAlign: 'center',
    fontSize: normalize(12),
    lineHeight: normalize(18),
  },
});
