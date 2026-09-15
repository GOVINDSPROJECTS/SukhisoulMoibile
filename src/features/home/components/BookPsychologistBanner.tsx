import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

export const BookPsychologistBanner: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* --- Top badge ------------------------------------------------------------------ */}
        <View style={styles.liveBadge}>
          <View style={styles.greenDot} />
          <AppText variant="caption" weight="medium" style={styles.liveBadgeText}>
            Free Care Live Option Locked
          </AppText>
        </View>

        {/* --- Title ----------------------------------------------------------------------- */}
        <AppText variant="h2" weight="extraBold" style={styles.titleDark}>
          Book Your session
        </AppText>
        <AppText variant="h2" weight="extraBold" style={styles.titleBlue}>
          completely free
        </AppText>

        {/* --- Subtitle ------------------------------------------------------------------ */}
        <AppText variant="caption" weight="regular" style={styles.subtitle}>
          Talk with certified mental{'\n'}health experts anytime.
        </AppText>

        {/* --- Action Buttons --------------------------------------------------------- */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('NutqIssues')}
          >
            <AppText variant="body" weight="bold" style={styles.btnPrimaryText}>
              Claim Free Slot
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('ExplorePsychologists')}
          >
            <AppText variant="body" weight="bold" style={styles.btnSecondaryText}>
              How it works
            </AppText>
          </TouchableOpacity>
        </View>

        {/* --- Divider -------------------------------------------------------------------- */}
        <View style={styles.divider} />

        {/* --- Confidentiality Footer --------------------------------------------- */}
        <View style={styles.footerCapsule}>
          <Lock
            size={normalize(13)}
            color={colors.typographyColor['Dark 2']}
            style={{ marginRight: normalize(6) }}
          />
          <AppText variant="caption" weight="medium" style={styles.footerText}>
            Your conversations are safe and confidential.
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(23),
    backgroundColor: colors.lightTints.blueLightTint[50]
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(40),
    padding: normalize(25),
    paddingBottom: normalize(20),
    boxShadow: '0px 4px 20px rgba(179, 221, 255, 0.2)',
  },

  // Live badge
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.blue[50],
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    borderRadius: normalize(99),
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: colors.blue[100],
    gap: normalize(10),
  },
  greenDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.green[500],
  },
  liveBadgeText: {
    fontSize: normalize(11.5),
    color: colors.typographyColor['Dark 2'],
  },

  // Title
  titleDark: {
    fontSize: normalize(26),
    color: colors.lightAppTheme[950],
    lineHeight: normalize(32),
  },
  titleBlue: {
    fontSize: normalize(26),
    color: '#8BC4F5',
    lineHeight: normalize(32),
    marginBottom: normalize(8),
    marginTop: normalize(-5)
  },

  // Subtitle
  subtitle: {
    fontSize: normalize(13.5),
    color: colors.tintsGrey[600],
    lineHeight: normalize(19),
    marginBottom: normalize(20),
  },

  // Buttons
  buttonsRow: {
    flexDirection: 'row',
    gap: normalize(12),
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: normalize(10),
    marginBottom: normalize(25),
  },
  btnPrimary: {
    backgroundColor: colors.lightTints.blueLightTint[100],
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnPrimaryText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(12),
  },
  btnSecondary: {
    backgroundColor: colors.blue[50],
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnSecondaryText: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(12),
  },

  // Divider
  divider: {
    height: normalize(5),
    backgroundColor: colors.tintsBlue[950],
    marginBottom: normalize(20),
  },

  // Footer Capsule
  footerCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightTints.blueLightTint[50],
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(99),
    borderWidth: normalize(1),
    borderColor: colors.tintsBlue[50]
  },
  footerText: {
    fontSize: normalize(10.5),
    color: colors.typographyColor['Dark 2'],
  },
});

