import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { IndianRupee, CheckCircle2, Box, Sparkles, Calendar } from 'lucide-react-native';

export type PlanId = 'single' | 'journey' | 'soul';

interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  unit: string;
  originalPrice?: number;
  badge?: string;
  savings?: string;
  validity?: string;
  icon: React.ReactNode;
}

interface SessionPlanSelectorProps {
  selectedPlan: PlanId;
  onSelectPlan: (id: PlanId) => void;
  planPrices?: Record<PlanId, number>;
}

const PLANS: Plan[] = [
  {
    id: 'single',
    name: 'Single Session',
    description: 'Perfect for a quick reset\nor check-in.',
    price: 1200,
    unit: '/session',
    icon: <Calendar size={normalize(22)} color={colors.blue[600]} strokeWidth={2} />,
  },
  {
    id: 'journey',
    name: 'Journey 4-Pack',
    description: 'Consistent growth with\nfour 60-min sessions.',
    price: 3900,
    unit: '',
    originalPrice: 4800,
    badge: 'BEST VALUE',
    savings: 'Save 20%',
    validity: 'Valid for 6 months',
    icon: <Box size={normalize(22)} color={colors.blue[700]} strokeWidth={2} />,
  },
  {
    id: 'soul',
    name: 'Soul\nTransformation',
    description: '12 sessions + lifetime\ncommunity access.',
    price: 9500,
    unit: '/year',
    icon: <Sparkles size={normalize(22)} color={colors.appThemeColor[600]} strokeWidth={2} />,
  },
];

export const SessionPlanSelector: React.FC<SessionPlanSelectorProps> = ({
  selectedPlan,
  onSelectPlan,
  planPrices,
}) => {
  const { borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      {PLANS.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        const currentPrice = planPrices ? (planPrices[plan.id] ?? plan.price) : plan.price;
        const origPrice = planPrices
          ? (plan.id === 'journey' ? Math.round(currentPrice * 1.25) : undefined)
          : plan.originalPrice;

        return (
          <TouchableOpacity
            key={plan.id}
            activeOpacity={0.8}
            onPress={() => onSelectPlan(plan.id)}
            style={[
              styles.card,
              { borderRadius: normalize(16) },
              isSelected && styles.cardSelected,
            ]}
          >
            {/* Best Value badge */}
            {plan.badge && (
              <View style={[styles.badge, { borderRadius: borderRadius.full }]}>
                <AppText variant="caption" weight="bold" style={styles.badgeText}>
                  {plan.badge}
                </AppText>
              </View>
            )}

            <View style={styles.cardRow}>
              {/* Icon */}
              <View style={[styles.iconWrap, { borderRadius: borderRadius.m }]}>
                {plan.icon}
              </View>

              {/* Info */}
              <View style={styles.info}>
                <AppText variant="body" weight="extraBold" style={styles.planName}>
                  {plan.name}
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.planDesc}>
                  {plan.description}
                </AppText>

              </View>

              {/* Price */}
              <View style={styles.priceCol}>
                <View style={styles.priceRow}>
                  <IndianRupee size={normalize(15)} color={colors.blue[700]} strokeWidth={2.5} style={{ marginTop: normalize(0), marginRight: normalize(-1) }} />
                  <AppText variant="body" weight="extraBold" family='secondary' style={styles.price}>
                    {currentPrice.toLocaleString('en-IN')}
                  </AppText>
                </View>
                {plan.unit ? (
                  <AppText variant="caption" weight="regular" family='secondary' style={styles.unit}>
                    {plan.unit}
                  </AppText>
                ) : null}
                {origPrice ? (
                  <View style={styles.priceRow}>
                    <AppText variant="caption" weight="regular" family='primary' style={[styles.strikePrice, { marginTop: normalize(-1) }]}>₹</AppText>
                    <AppText variant="caption" weight="regular" family='secondary' style={styles.strikePrice}>
                      {origPrice.toLocaleString('en-IN')}
                    </AppText>
                  </View>
                ) : null}
              </View>
            </View>
            {/* Savings / validity chips */}
            {(plan.savings || plan.validity) && (
              <View style={styles.dividerFooter}>
                <View style={styles.chipsRow}>
                  {plan.savings && (
                    <View style={styles.chip}>
                      <CheckCircle2 size={normalize(15)} color={'#3E6752'} strokeWidth={2.2} />
                      <AppText variant="caption" weight="semiBold" style={[styles.chipText, { color: '#3E6752' }]}>
                        {plan.savings}
                      </AppText>
                    </View>
                  )}
                  {plan.validity && (
                    <View style={styles.chip}>
                      <CheckCircle2 size={normalize(15)} color={'#3E6752'} strokeWidth={2.2} />
                      <AppText variant="caption" weight="semiBold" style={[styles.chipText, { color: '#3E6752' }]}>
                        {plan.validity}
                      </AppText>
                    </View>
                  )}
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: normalize(10),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'transparent',
    padding: normalize(14),
    position: 'relative',
    paddingTop: normalize(20)

  },
  cardSelected: {
    borderColor: colors.blue[300],
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 26,
    backgroundColor: '#375EA4',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),

  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(12),
  },
  iconWrap: {
    width: normalize(44),
    height: normalize(44),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
  planName: {
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    lineHeight: normalize(18),
  },
  planDesc: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    marginTop: normalize(2),
    lineHeight: normalize(15),
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(6),
    marginTop: normalize(6),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
    marginRight: normalize(13)
  },
  chipText: {
    fontSize: normalize(10),
    color: colors.green[700],
  },
  priceCol: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: normalize(15),
    color: colors.blue[700],
  },
  unit: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
    marginTop: normalize(1),
  },
  strikePrice: {
    fontSize: normalize(10),
    color: "#59615F",
    textDecorationLine: 'line-through',
    marginTop: normalize(2),
  },
  dividerFooter: {
    marginTop: normalize(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(172, 180, 177, 0.10)',
    paddingTop: normalize(3),
    paddingHorizontal: normalize(10)
  },
});
