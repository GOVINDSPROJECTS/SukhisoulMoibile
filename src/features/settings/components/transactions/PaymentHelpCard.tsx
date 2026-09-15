import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface PaymentHelpCardProps {
  onContactSupport?: () => void;
}

export const PaymentHelpCard: React.FC<PaymentHelpCardProps> = ({
  onContactSupport,
}) => {
  return (
    <View style={styles.card}>
      <AppText
        weight="bold"
        family="primary"
        style={styles.title}
        color={colors.typographyColor.Black || '#0F172A'}
      >
        Need help with payments?
      </AppText>

      <AppText
        weight="regular"
        family="secondary"
        style={styles.subtitle}
        color={colors.typographyColor.Medium || '#64748B'}
      >
        Our support team is available 24/7 to resolve any billing issues or plan queries.
      </AppText>

      <TouchableOpacity
        style={styles.actionLink}
        activeOpacity={0.7}
        onPress={() => {
          console.log('[Transactions] Contact Support link pressed');
          onContactSupport?.();
        }}
      >
        <AppText
          weight="bold"
          family="primary"
          style={styles.linkText}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
        >
          Contact Support
        </AppText>
        <ArrowRight
          size={normalize(16)}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
          strokeWidth={2.2}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(228,233,231,0.40)',
    borderRadius: normalize(32),
    padding: normalize(20),
    marginTop: normalize(16),
    marginBottom: normalize(30),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  title: {
    fontSize: normalize(16),
    marginBottom: normalize(8),
  },
  subtitle: {
    fontSize: normalize(13),
    lineHeight: normalize(19),
    marginBottom: normalize(14),
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: normalize(13.5),
  },
});
