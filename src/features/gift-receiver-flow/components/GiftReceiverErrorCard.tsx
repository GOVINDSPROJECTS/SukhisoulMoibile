import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface GiftReceiverErrorCardProps {
  onTryAgain: () => void;
}

export const GiftReceiverErrorCard: React.FC<GiftReceiverErrorCardProps> = ({ onTryAgain }) => {
  return (
    <View style={styles.container}>
      <AppText family="secondary" weight="extraBold" style={styles.title}>
        Incorrect details
      </AppText>
      <AppText family="secondary" weight='regular' style={styles.description}>
        The gift details you entered don't match{'\n'}our records.
      </AppText>

      <AppText family="secondary" weight="medium" style={styles.suggestion}>
        Please check the gift details shared{'\n'}with you on WhatsApp and try again.
      </AppText>

      <TouchableOpacity style={styles.tryAgainBtn} activeOpacity={0.8} onPress={onTryAgain}>
        <AppText family="secondary" weight="semiBold" style={styles.tryAgainText}>
          Try Again
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(0),
    marginBottom: normalize(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.appThemeColor[300],
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    paddingTop: normalize(30)
  },
  title: {
    color: colors.typographyColor.Black,
    fontSize: normalize(18),
    marginBottom: normalize(12),
    textAlign: 'center',
  },
  description: {
    color: colors.colorPalet['color 1'],
    fontSize: normalize(12),
    textAlign: 'center',
    lineHeight: normalize(18),
    marginBottom: normalize(12),
  },
  suggestion: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(12),
    textAlign: 'center',
    lineHeight: normalize(18),
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: normalize(16),
  },
  tryAgainBtn: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: normalize(18),
    backgroundColor: colors.appThemeColor[50],
    marginTop: normalize(10),
    borderTopWidth: normalize(1),
    borderTopColor: colors.appThemeColor[300]
  },
  tryAgainText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(14),
  },
});
