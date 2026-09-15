import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NotificationSectionProps {
  title: string;
  children: React.ReactNode;
}

export const NotificationSection: React.FC<NotificationSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        {title}
      </AppText>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(13.5),
    letterSpacing: 0.6,
    marginBottom: normalize(12),
  },
  contentContainer: {
    gap: normalize(8),
  },
});
