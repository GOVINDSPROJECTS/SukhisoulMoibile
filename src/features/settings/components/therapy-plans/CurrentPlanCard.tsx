import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Crown, Star } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface CurrentPlanCardProps {
  planName?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  doctorExperience?: string;
  doctorRating?: string;
  doctorReviewsCount?: number;
  doctorAvatarUri?: string;
  nextSessionDate?: string;
  nextSessionTime?: string;
  sessionsCompleted?: number;
  totalSessions?: number;
  planStartDate?: string;
  planValidTill?: string;
  onManagePlan?: () => void;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  planName = 'Premium Plan',
  doctorName = 'Dr. Rohan Mehta',
  doctorSpecialty = 'Counselling Psychologist',
  doctorExperience = '7+ Years',
  doctorRating = '4.8',
  doctorReviewsCount = 98,
  doctorAvatarUri = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
  nextSessionDate = '24 May 2024',
  nextSessionTime = '6:00 PM',
  sessionsCompleted = 3,
  totalSessions = 8,
  planStartDate = '10 May 2024',
  planValidTill = '10 Aug 2024',
  onManagePlan,
}) => {
  const sessionsLeft = totalSessions - sessionsCompleted;
  const progressRatio = Math.min(Math.max(sessionsLeft / totalSessions, 0), 1);

  return (
    <View style={styles.cardContainer}>
      {/* ── Doctor & Plan Info Row ─────────────────────────────── */}
      <View style={styles.topRow}>
        {/* Doctor Avatar with Star Badge */}
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: doctorAvatarUri }} style={styles.avatar} />
          <View style={styles.starBadge}>
            <Star size={normalize(12)} color="#F59E0B" fill="#F59E0B" />
          </View>
        </View>

        {/* Doctor & Plan Text */}
        <View style={styles.infoCol}>
          <View style={styles.planTitleRow}>
            <AppText
              weight="extraBold"
              family="primary"
              style={styles.planName}
              color={colors.typographyColor.Medium || '#0F172A'}
            >
              {planName}
            </AppText>
            <Crown size={normalize(15)} color="#D97706" fill="#F59E0B" strokeWidth={1.5} />
          </View>

          <AppText
            weight="light"
            family="secondary"
            style={styles.doctorName}
            color={colors.typographyColor.Medium || '#334155'}
          >
            with {doctorName}
          </AppText>

          <AppText
            weight="light"
            family="secondary"
            style={styles.specialty}
            color={colors.typographyColor.Light || '#64748B'}
          >
            {doctorSpecialty} • {doctorExperience}
          </AppText>

          <AppText
            weight="semiBold"
            family="secondary"
            style={styles.ratingText}
            color="#D97706"
          >
            {doctorRating} ({doctorReviewsCount})
          </AppText>
        </View>
      </View>

      {/* ── Metrics Grid (2 columns, 2 rows) ───────────────────── */}
      <View style={styles.metricsContainer}>
        {/* Row 1: Next Session & Sessions Left */}
        <View style={styles.metricRow}>
          {/* Next Session */}
          <View style={styles.metricCol}>
            <AppText weight="semiBold" family="secondary" style={styles.metricLabel}>
              NEXT SESSION
            </AppText>
            <AppText weight="light" family="secondary" style={styles.metricValue}>
              {nextSessionDate}
            </AppText>
            <AppText weight="light" family="secondary" style={styles.sessionTimeText}>
              {nextSessionTime}
            </AppText>
          </View>

          {/* Sessions Left with Progress Bar */}
          <View style={styles.metricCol}>
            <AppText weight="semiBold" family="secondary" style={styles.metricLabel}>
              SESSIONS LEFT
            </AppText>
            <AppText weight="light" family="secondary" style={styles.metricValue}>
              {sessionsLeft} of {totalSessions}
            </AppText>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Row 2: Plan Started & Valid Till */}
        <View style={styles.metricRow}>
          <View style={styles.metricCol}>
            <AppText weight="semiBold" family="secondary" style={styles.metricLabel}>
              PLAN STARTED
            </AppText>
            <AppText weight="light" family="secondary" style={styles.metricValue}>
              {planStartDate}
            </AppText>
          </View>

          <View style={styles.metricCol}>
            <AppText weight="semiBold" family="secondary" style={styles.metricLabel}>
              VALID TILL
            </AppText>
            <AppText weight="light" family="secondary" style={styles.metricValue}>
              {planValidTill}
            </AppText>
          </View>
        </View>
      </View>

      {/* ── Manage Plan Button ─────────────────────────────────── */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          console.log('[Therapy Plans] Manage Plan pressed for:', planName);
          onManagePlan?.();
        }}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.manageBtn}
        >
          <AppText
            weight="bold"
            family="primary"
            style={styles.manageBtnText}
            color="#FFFFFF"
          >
            Manage Plan
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    paddingBottom: normalize(16),
    marginBottom: normalize(0),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    paddingBottom: normalize(14),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(16),
    marginHorizontal: normalize(-15),
    marginBottom: normalize(10)
  },
  avatarWrapper: {
    position: 'relative',
    width: normalize(64),
    height: normalize(64),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(99),
    borderWidth: 2,
    borderColor: colors.typographyColor['Dark 2'],
  },
  starBadge: {
    position: 'absolute',
    bottom: -normalize(2),
    right: -normalize(2),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    padding: normalize(4),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  infoCol: {
    flex: 1,
    gap: normalize(2),
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  planName: {
    fontSize: normalize(15),
  },
  doctorName: {
    fontSize: normalize(11),
  },
  specialty: {
    fontSize: normalize(11),
  },
  ratingText: {
    fontSize: normalize(11),
    marginTop: normalize(1),
  },
  metricsContainer: {
    paddingTop: normalize(14),
    paddingBottom: normalize(14),
    gap: normalize(14),
    marginBottom: normalize(10)
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCol: {
    flex: 1,
    gap: normalize(2),
  },
  metricLabel: {
    fontSize: normalize(9.5),
    color: colors.typographyColor.Light,
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: normalize(12.5),
    color: '#0F172A',
  },
  sessionTimeText: {
    fontSize: normalize(12),
    color: '#1E6091',
  },
  progressBarBackground: {
    height: normalize(4.5),
    backgroundColor: '#E2E8F0',
    borderRadius: normalize(3),
    marginTop: normalize(5),
    width: '85%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.typographyColor['Dark 2'],
    borderRadius: normalize(3),
  },
  manageBtn: {
    backgroundColor: colors.lightAppTheme ? colors.lightAppTheme[700] : '#1E6091',
    borderRadius: normalize(10),
    paddingVertical: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  manageBtnText: {
    fontSize: normalize(14),
    letterSpacing: 0.2,
  },
});
