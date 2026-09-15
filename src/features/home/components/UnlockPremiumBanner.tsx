import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Crown, ArrowRight } from 'lucide-react-native';

export const UnlockPremiumBanner: React.FC = () => {
  const { colors, borderRadius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.lightAppTheme[50], borderColor: colors.lightAppTheme[100], borderRadius: borderRadius.l, shadowColor: colors.lightAppTheme[700] }]}>
      <View style={styles.leftContent}>
        <View style={styles.titleRow}>
          <Crown size={16} color="#FF9800" fill="#FF9800" style={{ marginRight: normalize(6) }} />
          <AppText variant="body" weight="bold" style={{ color: colors.lightAppTheme[950], fontSize: normalize(12) }}>
            UNLOCK PREMIUM TOOLS
          </AppText>
        </View>
        
        <AppText variant="caption" weight="semiBold" style={[styles.subText, { color: colors.lightAppTheme[700] }]}>
          Advanced daily tracks • Custom analytics • Priority booking
        </AppText>
      </View>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: colors.lightAppTheme[700], borderRadius: borderRadius.m }]}
        activeOpacity={0.8}
      >
        <AppText variant="caption" weight="bold" style={styles.btnText}>
          Explore
        </AppText>
        <ArrowRight size={12} color="#FFFFFF" style={{ marginLeft: normalize(4) }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(14),
    marginVertical: normalize(12),
    borderWidth: 1.5,
    shadowColor: '#4B3BC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
    paddingRight: normalize(8),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  subText: {
    fontSize: normalize(10),
    lineHeight: normalize(14),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(8),
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: normalize(10),
  },
});
