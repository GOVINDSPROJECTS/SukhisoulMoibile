import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Gift } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface DailyTaskHeaderProps {
  userName?: string;
  currentPoints?: number;
  maxPoints?: number;
  expiringPoints?: number;
  avatarUrl?: string;
  onRedeemPress?: () => void;
}

export const DailyTaskHeader: React.FC<DailyTaskHeaderProps> = ({
  userName = 'Atharva',
  currentPoints = 950,
  maxPoints = 1200,
  expiringPoints = 120,
  onRedeemPress,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progress = Math.min(currentPoints / maxPoints, 1);
  const navigation = useNavigation<any>();

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* User greeting row */}
      <View style={styles.greetingRow}>
        <View style={styles.avatarPlaceholder}>
          <Image
            source={require('@assets/dummy.webp')}
            style={styles.avatar}
          />
        </View>

        <View style={styles.greetingText}>
          <AppText
            variant="h4"
            weight="bold"
            family="secondary"
            color="#1E293B"
          >
            Hi {userName}!...
          </AppText>
          <AppText
            variant="caption"
            weight="regular"
            family="secondary"
            color="#64748B"
          >
            You're doing great. Keep going!
          </AppText>
        </View>

        <AppText
          variant="caption"
          weight="medium"
          family="secondary"
          color={colors.typographyColor.Medium}
          style={{ fontSize: normalize(9.5), marginTop: normalize(3) }}
        >
          {currentPoints}/{maxPoints}pts
        </AppText>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth }]}
        />
      </View>

      {/* Expiry notice */}
      <View style={styles.expiryRow}>
        <AppText
          variant="caption"
          weight="medium"
          family='secondary'
          color={colors.typographyColor.Medium}
        >
          {expiringPoints} points are getting{' '}
          <AppText
            variant="caption"
            weight="medium"
            family='secondary'
            color={colors.colorPalet['Color 6']}
          >
            expired
          </AppText>{' '}
          in a week!
        </AppText>
      </View>

      {/* Redeem Button */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint2[50],
          colors.lightTints.blueLightTint2[100],
        ]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: normalize(12),
          paddingVertical: normalize(14),
          borderWidth: 0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.redeemBtn}
          onPress={() => { navigation.navigate('Redeem', {}); }}
        >
          <Gift size={normalize(18)} color={colors.typographyColor['Dark 2']} />
          <AppText
            variant="body"
            weight="semiBold"
            family='secondary'
            color={colors.typographyColor['Dark 2']}
            style={styles.redeemText}
          >
            Redeem Points
          </AppText>
          <ChevronRight size={normalize(16)} color={colors.typographyColor['Dark 2']} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(4),
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(12),
  },
  avatarPlaceholder: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: colors.gray['100'],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    overflow: 'hidden',
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: colors.tintsGrey[50],
    borderWidth: 2.5,
    borderColor: colors.lightAppTheme[100],
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)'
  },
  avatarInitial: {
    fontSize: normalize(18),
  },
  greetingText: {
    flex: 1,
  },
  progressTrack: {
    height: normalize(10),
    backgroundColor: colors.appThemeColor[75],
    borderRadius: normalize(6),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.lightAppTheme[700],
    borderRadius: normalize(6),
  },
  expiryRow: {
    marginTop: normalize(8),
    marginBottom: normalize(16),
  },
  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
  },
  redeemText: {
    fontSize: normalize(15),
  },
});
