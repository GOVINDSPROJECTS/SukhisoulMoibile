import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SettingsSectionCardProps {
  title?: string;
  children: React.ReactNode;
}

export const SettingsSectionCard: React.FC<SettingsSectionCardProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.sectionWrapper}>
      {title ? (
        <View style={styles.sectionLabelParent}>
          <AppText
            weight="medium"
            family="secondary"
            style={styles.sectionTitle}
            color={colors.typographyColor.Light || '#757C7A'}
          >
            {title}
          </AppText>
        </View>
      ) : null}

      <View style={styles.cardContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    marginBottom: normalize(24),
  },
  sectionLabelParent: {
    backgroundColor: colors.blue[50],
    marginBottom: normalize(8),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
    borderRadius: normalize(12),
  },
  sectionTitle: {
    fontSize: normalize(12),
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(32),
    overflow: 'hidden',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: colors.tintsGrey[50]
  },
});
