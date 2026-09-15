import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface SavedPlanItem {
  id: string;
  planTitle: string;
  doctorName: string;
  price: string;
  avatarUri: string;
}

const DEFAULT_SAVED_PLANS: SavedPlanItem[] = [
  {
    id: '1',
    planTitle: 'Standard Plan',
    doctorName: 'Dr. Ananya Sharma',
    price: '₹1,799',
    avatarUri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    planTitle: 'Starter Plan',
    doctorName: 'Dr. Neha Kapoor',
    price: '₹1,299',
    avatarUri: 'https://images.unsplash.com/photo-1594824813627-24b898bb6c3a?w=150&auto=format&fit=crop&q=80',
  },
];

interface SavedPlansListProps {
  plans?: SavedPlanItem[];
  onViewPlan?: (plan: SavedPlanItem) => void;
}

export const SavedPlansList: React.FC<SavedPlansListProps> = ({
  plans = DEFAULT_SAVED_PLANS,
  onViewPlan,
}) => {
  return (
    <View style={styles.container}>
      {plans.map((item, index) => (
        <View
          key={item.id}
          style={[styles.row, index !== plans.length - 1 && styles.rowDivider]}
        >
          {/* Doctor Avatar */}
          <Image source={{ uri: item.avatarUri }} style={styles.avatar} />

          {/* Plan & Doctor Info */}
          <View style={styles.infoCol}>
            <AppText
              weight="light"
              family="secondary"
              style={styles.planTitle}
              color={colors.typographyColor.Medium || '#1E293B'}
            >
              {item.planTitle}
            </AppText>
            <AppText
              weight="light"
              family="secondary"
              style={styles.doctorName}
              color={colors.typographyColor.Light || '#64748B'}
            >
              with {item.doctorName}
            </AppText>
          </View>

          {/* Price & View Button */}
          <View style={styles.actionCol}>
            <AppText
              weight="bold"
              family="primary"
              style={styles.priceText}
              color={colors.typographyColor.Medium || '#0F172A'}
            >
              {item.price}
            </AppText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                console.log('[Therapy Plans] View saved plan pressed:', item.planTitle, item.doctorName);
                onViewPlan?.(item);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 10, right: 10 }}
            >
              <AppText
                weight="bold"
                family="primary"
                style={styles.viewBtnText}
                color={colors.typographyColor['Dark 2'] || '#0F172A'}
              >
                VIEW
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    marginBottom: normalize(24),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    gap: normalize(12),
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.tintsGrey[50],
  },
  avatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    backgroundColor: colors.tintsGrey[50],
  },
  infoCol: {
    flex: 1,
    gap: normalize(2),
  },
  planTitle: {
    fontSize: normalize(12),
  },
  doctorName: {
    fontSize: normalize(11),
  },
  actionCol: {
    alignItems: 'flex-end',
    gap: normalize(3),
  },
  priceText: {
    fontSize: normalize(12.5),
  },
  viewBtnText: {
    fontSize: normalize(11),
    letterSpacing: 0.4,
  },
});
