import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BrushCleaning, Sparkles, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface OptimizeStorageCardProps {
  cacheSizeMb: number;
  onClearCache?: () => void;
}

export const OptimizeStorageCard: React.FC<OptimizeStorageCardProps> = ({
  cacheSizeMb,
  onClearCache,
}) => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = useCallback(() => {
    if (isClearing) return;

    if (cacheSizeMb === 0) {
      Alert.alert(
        'Storage Optimized',
        'Cache is already clear. Your app is running with maximum storage efficiency.',
        [{ text: 'OK' }]
      );
      return;
    }

    console.log(`[Clear Cache] Initiating cache cleanup of ${cacheSizeMb} MB...`);
    setIsClearing(true);

    setTimeout(() => {
      setIsClearing(false);
      onClearCache?.();
      console.log(`[Clear Cache] Successfully freed ${cacheSizeMb} MB.`);
      Alert.alert(
        'Cache Cleared',
        `Successfully freed ${cacheSizeMb} MB of temporary files and image cache.`,
        [{ text: 'OK', style: 'default' }]
      );
    }, 1200);
  }, [cacheSizeMb, isClearing, onClearCache]);

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <BrushCleaning
            size={normalize(22)}
            color="#FFFFFF"
            strokeWidth={2.2}
          />
        </View>
        <AppText
          weight="semiBold"
          family="secondary"
          style={styles.cardTitle}
          color={colors.typographyColor.Medium}
        >
          Optimize Storage
        </AppText>
      </View>

      {/* Explanatory Description */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.description}
        color={colors.typographyColor.Light}
      >
        Clearing cache removes temporary files that may slow down the app. This action will not delete your workout history, meditation progress, or personal account data.
      </AppText>

      {/* Clear Cache Action Button */}
      <TouchableOpacity

        activeOpacity={0.88}
        onPress={handleClear}
        disabled={isClearing}
      >
        <LinearGradient
          colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.actionBtn,
            cacheSizeMb === 0 && styles.actionBtnCleared,
          ]}
        >

          {isClearing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : cacheSizeMb === 0 ? (
            <Check size={normalize(18)} color="#FFFFFF" strokeWidth={2.4} />
          ) : (
            <Sparkles
              size={normalize(18)}
              color="#FFFFFF"
              strokeWidth={2.2}
            />
          )}
          <AppText
            weight="medium"
            family="secondary"
            style={styles.actionBtnText}
            color="#FFFFFF"
          >
            {isClearing
              ? 'Clearing Cache...'
              : cacheSizeMb === 0
                ? 'Cache Cleared ( 0 MB )'
                : `Clear Cache ( ${cacheSizeMb} MB )`}
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: colors.blue[100],
    padding: normalize(18),
    marginBottom: normalize(26),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(15),
    marginBottom: normalize(15),
  },
  iconBox: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(8),
    backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: normalize(16),
  },
  description: {
    fontSize: normalize(12.5),
    lineHeight: normalize(18.5),
    marginBottom: normalize(18),
  },
  actionBtn: {
    backgroundColor: '#1E609A',
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
    boxShadow: '0px 6px 16px -4px rgba(30, 96, 154, 0.3)',
  },
  actionBtnCleared: {
    backgroundColor: '#059669',
  },
  actionBtnText: {
    fontSize: normalize(14.5),
    letterSpacing: 0.2,
  },
});
