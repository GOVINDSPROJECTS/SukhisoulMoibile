import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { X, Sparkles, BookOpen, Award, IndianRupee, CheckCircle2 } from 'lucide-react-native';
import type { TherapyPlanItem } from '@api/professionals';

interface AllPlansModalProps {
  visible: boolean;
  onClose: () => void;
  plans: TherapyPlanItem[];
  doctorName: string;
  onSelectPlan: (plan: TherapyPlanItem) => void;
}

export const AllPlansModal: React.FC<AllPlansModalProps> = ({
  visible,
  onClose,
  plans,
  doctorName,
  onSelectPlan,
}) => {
  const { borderRadius } = useTheme();

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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={[styles.modalSheet, { borderTopLeftRadius: normalize(28), borderTopRightRadius: normalize(28) }]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <AppText variant="h3" weight="extraBold" style={styles.title}>
                All Therapy Plans
              </AppText>
              <AppText variant="caption" weight="medium" style={styles.subtitle}>
                Custom care plans by {doctorName}
              </AppText>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <X size={normalize(22)} color={colors.typographyColor.Medium} />
            </TouchableOpacity>
          </View>

          {/* Plans List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {plans.length === 0 ? (
              <View style={styles.emptyWrap}>
                <AppText variant="caption" weight="medium" style={styles.emptyText}>
                  No plans found. Please check back soon.
                </AppText>
              </View>
            ) : (
              plans.map((plan, index) => (
                <View
                  key={plan.id || plan.uuid || index}
                  style={[
                    styles.planCard,
                    { borderRadius: borderRadius.xl },
                    plan.is_most_popular && styles.popularPlanCard,
                  ]}
                >
                  {plan.is_most_popular && (
                    <View style={[styles.popularBadge, { borderRadius: borderRadius.full }]}>
                      <AppText variant="caption" weight="bold" style={styles.popularBadgeText}>
                        MOST POPULAR
                      </AppText>
                    </View>
                  )}

                  <View style={styles.cardTopRow}>
                    <View style={[styles.iconWrap, { borderRadius: borderRadius.m }]}>
                      {renderIcon(plan, index)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <AppText variant="body" weight="extraBold" style={styles.planTitle}>
                        {plan.title || plan.name}
                      </AppText>
                      <AppText variant="caption" weight="semiBold" style={styles.categoryLabel}>
                        {plan.category || 'Specialist Plan'} • {plan.sessions_label || `${plan.total_sessions} Sessions`}
                      </AppText>
                    </View>
                  </View>

                  {plan.description ? (
                    <AppText variant="caption" weight="regular" style={styles.descText}>
                      {plan.description}
                    </AppText>
                  ) : null}

                  <View style={styles.divider} />

                  <View style={styles.cardBottomRow}>
                    <View>
                      <View style={styles.priceRow}>
                        <IndianRupee size={normalize(18)} color={colors.appThemeColor[950]} strokeWidth={3} />
                        <AppText variant="h3" weight="extraBold" family="secondary" style={styles.priceValue}>
                          {plan.formatted_price || (typeof plan.total_price === 'number' ? plan.total_price.toLocaleString('en-IN') : plan.total_price)}
                        </AppText>
                        <AppText variant="caption" weight="regular" style={styles.priceUnit}>
                          {' total'}
                        </AppText>
                      </View>
                      {plan.savings_label ? (
                        <View style={styles.savingsChip}>
                          <CheckCircle2 size={normalize(12)} color="#15803D" strokeWidth={2.5} />
                          <AppText variant="caption" weight="bold" style={styles.savingsText}>
                            {plan.savings_label}
                          </AppText>
                        </View>
                      ) : null}
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        onClose();
                        onSelectPlan(plan);
                      }}
                      style={styles.selectBtnWrapper}
                    >
                      <LinearGradient
                        colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[styles.selectBtnGradient, { borderRadius: borderRadius.full }]}
                      >
                        <AppText variant="caption" weight="bold" style={styles.selectBtnText}>
                          Select Plan
                        </AppText>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    maxHeight: '85%',
    paddingTop: normalize(20),
    paddingBottom: normalize(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    color: '#0F172A',
    fontSize: normalize(18),
  },
  subtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    marginTop: normalize(2),
  },
  closeBtn: {
    padding: normalize(6),
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(99),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(20),
    gap: normalize(14),
  },
  emptyWrap: {
    paddingVertical: normalize(30),
    alignItems: 'center',
  },
  emptyText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: normalize(16),
    position: 'relative',
  },
  popularPlanCard: {
    borderColor: '#818CF8',
    backgroundColor: '#FAF5FF',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 18,
    backgroundColor: '#6366F1',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: normalize(9),
    letterSpacing: 0.5,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(8),
  },
  iconWrap: {
    width: normalize(44),
    height: normalize(44),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitle: {
    color: '#0F172A',
    fontSize: normalize(15),
  },
  categoryLabel: {
    color: '#2563EB',
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
  descText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    lineHeight: normalize(17),
    marginTop: normalize(4),
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: normalize(12),
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValue: {
    color: '#0F172A',
    fontSize: normalize(18),
  },
  priceUnit: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  savingsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    marginTop: normalize(2),
  },
  savingsText: {
    color: '#15803D',
    fontSize: normalize(10),
  },
  selectBtnWrapper: {
    minWidth: normalize(110),
  },
  selectBtnGradient: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
  },
});
