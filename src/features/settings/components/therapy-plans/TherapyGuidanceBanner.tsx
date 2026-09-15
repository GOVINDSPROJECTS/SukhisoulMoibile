import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquareText, ChevronRight, MessageSquare, MessageSquareDot, MessageSquareMore } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface TherapyGuidanceBannerProps {
  onPress?: () => void;
}

export const TherapyGuidanceBanner: React.FC<TherapyGuidanceBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => {
        console.log('[Therapy Plans] Free Therapy Guidance banner pressed');
        onPress?.();
      }}
    >
      {/* Icon Squircle */}
      <View style={styles.iconWrapper}>
        <MessageSquareMore size={normalize(20)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
      </View>

      {/* Text Info */}
      <View style={styles.textCol}>
        <AppText
          weight="light"
          family="secondary"
          style={styles.title}
          color={colors.typographyColor.Medium || '#1E293B'}
        >
          Free Therapy Guidance
        </AppText>
        <AppText
          weight="light"
          family="secondary"
          style={styles.subtitle}
          color={colors.typographyColor.Light || '#64748B'}
        >
          Get free, personalized guidance.
        </AppText>
      </View>

      {/* Chevron Right */}
      <ChevronRight size={normalize(18)} color={colors.typographyColor.Light || '#0F172A'}
        strokeWidth={2} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(16),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(32),
  },
  iconWrapper: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(12),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  textCol: {
    flex: 1,
    gap: normalize(2),
  },
  title: {
    fontSize: normalize(13),
  },
  subtitle: {
    fontSize: normalize(11),
  },
});
