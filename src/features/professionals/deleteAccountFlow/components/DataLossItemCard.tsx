import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface DataLossItemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const DataLossItemCard: React.FC<DataLossItemCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconBox}>{icon}</View>
      <AppText family="primary" weight="bold" style={styles.titleText}>
        {title}
      </AppText>
      <AppText family="primary" weight="regular" style={styles.descriptionText}>
        {description}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: normalize(16),
    marginBottom: normalize(24),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  iconBox: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  titleText: {
    fontSize: normalize(13.5),
    color: '#0F172A',
    marginBottom: normalize(4),
  },
  descriptionText: {
    fontSize: normalize(11),
    color: '#6B7280',
    lineHeight: normalize(16.5),
  },
});
