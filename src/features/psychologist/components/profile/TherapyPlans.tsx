import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { Star, ChevronRight, BookOpen, Award, IndianRupee, Sparkles } from 'lucide-react-native';
import { TherapyPlanItem } from '@api/professionals';
import { useTherapyPlans } from '../../hooks/useTherapyPlans';

interface TherapyPlansProps {
  doctorId?: string;
  doctorName?: string;
  basePrice?: number;
  plans?: TherapyPlanItem[];
  loading?: boolean;
  onViewAll?: () => void;
  onSelectPlan?: (plan: TherapyPlanItem) => void;
}

export const TherapyPlans: React.FC<TherapyPlansProps> = ({
  doctorId,
  doctorName,
  basePrice,
  plans: propPlans,
  loading: propLoading,
  onViewAll,
  onSelectPlan,
}) => {
  const { borderRadius } = useTheme();

  // If plans are not provided as props, use reactive query hook with background polling
  const { data: hookPlans = [], isLoading: hookLoading } = useTherapyPlans(
    doctorId || '365b31ac-0448-4928-8492-0b5e8949c831',
    doctorName,
  );

  const plans = propPlans !== undefined ? propPlans : hookPlans;
  const loading = propLoading !== undefined ? propLoading : hookLoading;

  const renderIcon = (plan: TherapyPlanItem, index: number) => {
    if (index === 0) {
      return <Sparkles size={normalize(22)} color={colors.blue[600]} strokeWidth={1.8} />;
    }
    if (plan.is_most_popular || index === 1) {
      return <BookOpen size={normalize(24)} color={colors.blue[600]} strokeWidth={1.5} />;
    }
    return <Award size={normalize(24)} color={colors.appThemeColor[600]} strokeWidth={1.5} />;
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
            Therapy Plans
          </AppText>
          <Star size={normalize(16)} color="#818CF8" fill="#818CF8" style={{ marginLeft: normalize(5), marginTop: normalize(5) }} />
        </View>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7} style={styles.viewAllBtn}>
          <AppText variant="caption" weight="semiBold" style={styles.viewAllText}>
            View All
          </AppText>
          <ChevronRight size={normalize(14)} color="#2563EB" style={{ marginTop: normalize(2) }} />
        </TouchableOpacity>
      </View>

      {/* Plans Scroll */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.lightAppTheme[950]} />
          <AppText variant="caption" weight="medium" style={styles.loadingText}>
            Loading plans...
          </AppText>
        </View>
      ) : plans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText variant="caption" weight="medium" style={styles.emptyText}>
            No custom therapy plans available for this professional.
          </AppText>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={plan.id || plan.uuid || index}
              activeOpacity={0.85}
              onPress={() => onSelectPlan?.(plan)}
            >
              {plan.is_most_popular ? (
                <View
                  style={[styles.popularCard, { borderRadius: borderRadius.xl }]}
                >
                  <View style={[styles.popularBadge, { borderRadius: borderRadius.full }]}>
                    <AppText variant="caption" weight="bold" style={styles.popularBadgeText}>
                      Most Popular
                    </AppText>
                  </View>

                  <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF', borderRadius: borderRadius.full }]}>
                    <BookOpen size={normalize(24)} color="#6366F1" strokeWidth={1.5} />
                  </View>

                  <AppText variant="body" weight="extraBold" numberOfLines={2} style={styles.popularPlanName}>
                    {plan.title || plan.name}
                  </AppText>
                  <AppText variant="caption" weight="medium" style={styles.popularSessions}>
                    {plan.sessions_label || `${plan.total_sessions} Sessions`} • {plan.category || 'CBT'}
                  </AppText>

                  <View style={styles.popularPriceRow}>
                    <IndianRupee size={18} strokeWidth={3} stroke='#0F172A' style={[{ marginRight: -10 }]} />
                    <AppText variant="h3" weight="extraBold" family='secondary' style={styles.popularPrice}>
                      {plan.price_per_session ? `${plan.price_per_session}` : (plan.formatted_price || plan.total_price)}
                    </AppText>
                    <AppText variant="caption" weight="medium" style={{ color: '#6366F1', fontSize: normalize(10), marginTop: normalize(2) }}>
                      /session
                    </AppText>

                    <View style={{ marginTop: normalize(2), backgroundColor: "#EEF2FF", borderRadius: borderRadius.full, padding: 3, marginLeft: normalize(5) }}>
                      <ChevronRight size={normalize(15)} color="#6366F1" />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={[styles.regularCard, { borderRadius: borderRadius.xl }]}>
                  <View style={[styles.iconCircle, { backgroundColor: "#EFF6FF", borderRadius: borderRadius.full }]}>
                    {renderIcon(plan, index)}
                  </View>

                  <AppText variant="body" weight="extraBold" numberOfLines={2} style={styles.planName}>
                    {plan.title || plan.name}
                  </AppText>
                  <AppText variant="caption" weight="medium" style={styles.sessions}>
                    {plan.sessions_label || `${plan.total_sessions} Sessions`} • {plan.category || 'CBT'}
                  </AppText>

                  <View style={styles.priceRow}>
                    <IndianRupee size={15} strokeWidth={3} stroke='#0F172A' style={[{ marginRight: -5 }]} />
                    <AppText variant="h3" weight="extraBold" family='secondary' style={styles.price}>
                      {plan.price_per_session ? `${plan.price_per_session}` : (plan.formatted_price || plan.total_price)}
                    </AppText>
                    <AppText variant="caption" weight="medium" style={{ color: '#64748B', fontSize: normalize(10), marginTop: normalize(2) }}>
                      /session
                    </AppText>

                    <View style={{ marginTop: normalize(2), backgroundColor: "#EFF6FF", borderRadius: borderRadius.full, padding: 3, marginLeft: normalize(5) }}>
                      <ChevronRight size={normalize(15)} color="#3B82F6" />
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: '#1E293B',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(2),
  },
  viewAllText: {
    color: "#2563EB",
    fontSize: normalize(13),
  },
  scrollContent: {
    gap: normalize(12),
    paddingRight: normalize(4),
    paddingTop: 18,
    paddingBottom: 10
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(20),
    gap: normalize(8),
  },
  loadingText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(16),
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    textAlign: 'center',
  },
  regularCard: {
    backgroundColor: '#FFFFFF',
    padding: normalize(16),
    paddingHorizontal: normalize(20),
    minWidth: normalize(155),
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: 'center',
  },
  popularCard: {
    padding: normalize(16),
    paddingTop: normalize(18),
    minWidth: normalize(155),
    alignItems: 'center',
    shadowColor: "#C7D2FE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
    marginTop: normalize(-3),
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: "#C7D2FE",
  },
  popularBadge: {
    backgroundColor: colors.colorPalet.Color,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    marginBottom: normalize(12),
    position: 'absolute',
    top: -15,

  },
  popularBadgeText: {
    color: colors.typographyColor.White,
    fontSize: normalize(10),
  },
  iconCircle: {
    width: normalize(48),
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  planName: {
    color: colors.appThemeColor[900],
    fontSize: normalize(14),
    textAlign: 'center',
  },
  popularPlanName: {
    color: '#1E293B',
    fontSize: normalize(14),
    textAlign: 'center',
  },
  sessions: {
    color: "#3B82F6",
    fontSize: normalize(11),
    marginTop: normalize(2),
    textAlign: 'center',
  },
  popularSessions: {
    color: '#6366F1',
    fontSize: normalize(11),
    marginTop: normalize(2),
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
    gap: normalize(4),
  },
  popularPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
    gap: normalize(8),
  },
  price: {
    color: '#0F172A',
    fontSize: normalize(16),
  },
  popularPrice: {
    color: '#0F172A',
    fontSize: normalize(18),
  },

});
