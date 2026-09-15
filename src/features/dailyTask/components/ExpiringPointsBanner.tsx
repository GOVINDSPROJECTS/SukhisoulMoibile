import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Clock, Star } from 'lucide-react-native';

interface ExpiringPointsBannerProps {
  points?: number;
  validTill?: string;
}

export const ExpiringPointsBanner: React.FC<ExpiringPointsBannerProps> = ({
  points = 120,
  validTill = '13th June 2026',
}) => {
  return (
    <View style={styles.container}>
      {/* Watermark Star */}
      <View style={styles.watermarkStar}>
        <Star fill={colors.lightAppTheme[700]} color={colors.lightAppTheme[700]} strokeWidth={0.0} size={normalize(140)} style={{ opacity: 0.45 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <AppText
            variant="h1"
            weight="extraBold"
            family="primary"
            color={colors.typographyColor.Black}
            style={styles.pointsNumber}
          >
            {points}
          </AppText>
          <AppText
            variant="h4"
            weight="semiBold"
            family="primary"
            color={"#42474D"}
            style={styles.pointsLabel}
          >
            {'  '}pts are expiring soon!
          </AppText>
        </View>

        {/* Valid till badge */}
        <View style={styles.validBadge}>
          <View style={{ backgroundColor: "#ffffff", padding: normalize(4), borderRadius: normalize(100) }} >
            <Clock size={normalize(13)} strokeWidth={2.5} color={colors.colorPalet['Color 6']} />
          </View>
          <AppText
            variant="caption"
            weight="semiBold"
            color="#93000A"
            style={styles.validText}
          >
            Valid till {validTill}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(16),
    marginTop: normalize(30),
    marginBottom: normalize(15),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(20),
    overflow: 'hidden',
    position: 'relative',
    borderWidth: normalize(1),
    borderColor: "#DCE9FF",
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  watermarkStar: {
    position: 'absolute',
    right: normalize(-20),
    top: "-10%",
    zIndex: 0,
  },
  content: {
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: normalize(10),
  },
  pointsNumber: {
    fontSize: normalize(40),
    lineHeight: normalize(44),
  },
  pointsLabel: {
    fontSize: normalize(15),
    lineHeight: normalize(22),
    flexShrink: 1,
  },
  validBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderRadius: normalize(20),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    gap: normalize(5),
    borderWidth: normalize(1),
    borderColor: "#FFDAD6"
  },
  validText: {
    fontSize: normalize(11.5),
  },
});
