import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Info, MessageCircleQuestion } from 'lucide-react-native';

export const ClinicalTipCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.appThemeColor[50] }]}>
        <Info size={normalize(16)} color={colors.purple[900]} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Black }}>
            Clinical Tip
          </AppText>
          <View style={styles.helpContainer}>
            <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.purple[900], marginRight: normalize(4) }}>
              Need help?
            </AppText>
            <MessageCircleQuestion size={normalize(14)} color={colors.purple[900]} />
          </View>
        </View>
        <AppText family="primary" weight="regular" style={{ fontSize: normalize(11), color: colors.typographyColor.Light, marginTop: normalize(2) }}>
          You can search by diagnosis codes (ICD-10) to find specific cohorts.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: normalize(16),
    padding: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    width: '100%',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderColor: colors.lightAppTheme[50]
  },
  iconContainer: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
