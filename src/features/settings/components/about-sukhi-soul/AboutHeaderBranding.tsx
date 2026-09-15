import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface AboutHeaderBrandingProps {
  title?: string;
}

export const AboutHeaderBranding: React.FC<AboutHeaderBrandingProps> = ({
  title = 'Sukhi Soul',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.title}
        color={colors.typographyColor.Dark || '#0F2851'}
      >
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(26),
    marginBottom: normalize(26),
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  logo: {
    width: normalize(68),
    height: normalize(68),
  },
  title: {
    fontSize: normalize(23),
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
