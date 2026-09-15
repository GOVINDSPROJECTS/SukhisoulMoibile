import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sprout, Crown, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface TherapyPlanItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  iconType: 'starter' | 'premium' | 'standard';
  isCurrent?: boolean;
  features: PlanFeature[];
}

interface TherapyPlanCardProps {
  plan: TherapyPlanItem;
  onSelect: (plan: TherapyPlanItem) => void;
}

export const TherapyPlanCard: React.FC<TherapyPlanCardProps> = ({ plan, onSelect }) => {
  const isPremium = plan.iconType === 'premium';

  return (
    <View style={[styles.card, isPremium && styles.premiumCard]}>
      {/* ── Top Icon ─────────────────────────────────────────── */}
      <View style={[styles.iconContainer, isPremium && styles.premiumIconContainer]}>
        {plan.iconType === 'starter' ? (
          <Sprout size={normalize(20)} color="#22C55E" strokeWidth={2.2} />
        ) : (
          <Crown size={normalize(20)} color="#D97706" fill="#F59E0B" strokeWidth={1.8} />
        )}
      </View>

      {/* ── Plan Title & Subtitle ─────────────────────────────── */}
      <AppText
        weight="extraBold"
        family="secondary"
        style={styles.title}
        color={colors.typographyColor.Medium || '#0F172A'}
      >
        {plan.title}
      </AppText>

      <AppText
        weight="light"
        family="secondary"
        style={styles.subtitle}
        color={colors.typographyColor.Light || '#64748B'}
      >
        {plan.subtitle}
      </AppText>

      {/* ── Price Row ─────────────────────────────────────────── */}
      <View style={styles.priceRow}>
        <AppText
          weight="light"
          family="secondary"
          style={[styles.priceText, isPremium && styles.premiumPriceText]}
        >
          {plan.price}
        </AppText>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.periodText}
          color={colors.typographyColor.Light || '#64748B'}
        >
          {plan.period || '/ session'}
        </AppText>
      </View>

      {/* ── Features List ─────────────────────────────────────── */}
      <View style={styles.featuresList}>
        {plan.features.map((feat, index) => (
          <View key={index} style={styles.featureRow}>
            {feat.included ? (
              <Check
                size={normalize(13)}
                color={colors.colorPalet['Color 9']}
                strokeWidth={2.4}
                style={styles.checkIcon}
              />
            ) : (
              <View style={styles.bulletDot} />
            )}
            <AppText
              weight="light"
              family="secondary"
              style={[
                styles.featureText,
                !feat.included && styles.featureTextMuted,
              ]}
              color={feat.included ? colors.typographyColor.Medium || '#334155' : '#94A3B8'}
            >
              {feat.text}
            </AppText>
          </View>
        ))}
      </View>

      {/* ── Choose Plan Action Button ─────────────────────────── */}
      <TouchableOpacity
        style={[
          styles.actionBtn,
          isPremium ? styles.premiumActionBtn : styles.outlineActionBtn,
        ]}
        activeOpacity={0.85}
        onPress={() => {
          console.log('[Therapy Plans] Selected plan:', plan.title);
          onSelect(plan);
        }}
      >
        <AppText
          weight="regular"
          family="primary"
          style={[
            styles.actionBtnText,
            isPremium ? styles.premiumActionBtnText : styles.outlineActionBtnText,
          ]}
        >
          {plan.isCurrent ? 'Current Plan' : 'Choose Plan'}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: normalize(280),
    backgroundColor: colors.lightAppTheme[50],
    borderRadius: normalize(16),
    padding: normalize(16),
    marginRight: normalize(14),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    justifyContent: 'space-between',
    minHeight: normalize(380),
    marginBottom: normalize(4),
  },
  premiumCard: {
    backgroundColor: colors.blue[50],
    borderColor: colors.blue[50],
  },
  iconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  premiumIconContainer: {
    backgroundColor: '#FFFBEB',
  },
  title: {
    fontSize: normalize(14),
    marginBottom: normalize(2),
  },
  subtitle: {
    fontSize: normalize(11),
    marginBottom: normalize(16),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: normalize(24),
  },
  priceText: {
    fontSize: normalize(20),
    color: colors.typographyColor.Medium || '#0F172A',
  },
  premiumPriceText: {
    color: colors.typographyColor['Dark 2'] || '#0F172A',
  },
  periodText: {
    fontSize: normalize(11),
    marginLeft: normalize(4),
  },
  featuresList: {
    gap: normalize(8),
    flex: 1,
    marginBottom: normalize(16),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  checkIcon: {
    marginRight: normalize(2),
  },
  bulletDot: {
    width: normalize(4),
    height: normalize(4),
    borderRadius: normalize(2),
    backgroundColor: '#94A3B8',
    marginLeft: normalize(4),
    marginRight: normalize(6),
  },
  featureText: {
    fontSize: normalize(11),
    flex: 1,
  },
  featureTextMuted: {
    color: colors.typographyColor.Light,
  },
  actionBtn: {
    borderRadius: normalize(12),
    paddingVertical: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  actionBtnText: {
    fontSize: normalize(12),
    letterSpacing: 0.2,
  },
  outlineActionBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.appThemeColor[500],
  },
  outlineActionBtnText: {
    color: colors.typographyColor['Dark 2'],
  },
  premiumActionBtn: {
    backgroundColor: colors.appThemeColor[500],
    borderColor: colors.appThemeColor[500],
    borderWidth: normalize(1)
  },
  premiumActionBtnText: {
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
});
