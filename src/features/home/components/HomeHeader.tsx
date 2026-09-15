import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { typography, useTheme, colors as themeColors } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Wallet, ChevronDown } from 'lucide-react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { fetchUserProfile, fetchUserRewards } from '../../../api/userProfile';
import type { NavigationProp } from '@navigation/types';

type Props = {
  theme?: 'blue' | 'purple' | 'green' | 'pink';
};

export const HomeHeader: React.FC<Props> = ({
  theme = 'blue',
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const user = useAuthStore((state) => state.user);
  const [selectedClinic, setSelectedClinic] = useState("MY CLINIC - Dr. Arisaka's Care");
  const [displayName, setDisplayName] = useState(user?.displayName || 'User');
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.photoURL || null);
  const [calmPoints, setCalmPoints] = useState<number>(0);
  const animatedColor = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      Promise.allSettled([fetchUserProfile(), fetchUserRewards()])
        .then(([profileRes, rewardRes]) => {
          if (isMounted) {
            if (profileRes.status === 'fulfilled' && profileRes.value) {
              const u = profileRes.value;
              setDisplayName(u.name || user?.displayName || 'User');
              const avatar = u.avatar_url || u.avatar_path || user?.photoURL || null;
              setAvatarUri(avatar);
            }
            if (rewardRes.status === 'fulfilled' && rewardRes.value?.account) {
              setCalmPoints(rewardRes.value.account.balance ?? 0);
            }
          }
        })
        .catch((err) => console.log('[HomeHeader] Error fetching user data:', err));

      return () => {
        isMounted = false;
      };
    }, [user])
  );

  useEffect(() => {
    Animated.timing(animatedColor, {
      toValue:
        theme === 'blue'
          ? 0
          : theme === 'purple'
            ? 1
            : theme === 'green'
              ? 2
              : 3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const handleAvatarPress = useCallback(() => {
    console.log('[HomeHeader] Avatar pressed -> Navigating to MyProfile');
    navigation.navigate('MyProfile');
  }, [navigation]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          // backgroundColor,
        },
      ]}>
      {/* Greeting and Clinic Info */}
      <View style={styles.leftContainer}>
        <AppText style={[styles.welcomeText, { color: '#475467', fontFamily: typography.fontFamily.secondary.light }]}>
          Welcome to Sukhi Soul...
        </AppText>

        <TouchableOpacity
          style={styles.nameDropdownRow}
          activeOpacity={0.8}
          onPress={handleAvatarPress}
        >
          <AppText
            numberOfLines={1}
            style={[styles.nameText, { color: '#101828', fontFamily: typography.fontFamily.tertiary.bold }]}
          >
            {displayName}
          </AppText>
        </TouchableOpacity>

        <View style={styles.clinicContainer}>
          <AppText
            style={[styles.clinicText, { color: '#475467' }]}
            numberOfLines={1}
          >
            {selectedClinic}
          </AppText>
          <ChevronDown size={18} color="#0066CC" style={styles.nameChevronIcon} />
        </View>
      </View>

      {/* Points and Profile Avatar */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[styles.pointsBadge, { backgroundColor: '#FFFFFF', borderRadius: borderRadius.xl }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Transactions')}
        >
          <Wallet size={16} color="#0066CC" fill="#99CCFF" />
          <AppText variant="body" weight="bold" style={[styles.pointsText, { color: '#101828' }]}>
            {calmPoints}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarButton}
          activeOpacity={0.8}
          onPress={handleAvatarPress}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <AppText weight="extraBold" color="#FFFFFF" style={styles.avatarInitial}>
                {displayName.charAt(0).toUpperCase()}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(16),
  },
  leftContainer: {
    flex: 1,
    paddingRight: normalize(8),
  },
  welcomeText: {
    fontSize: normalize(12),
    marginBottom: normalize(2),
  },
  nameText: {
    fontSize: normalize(24),
    lineHeight: normalize(30),
  },
  nameDropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  nameChevronIcon: {
    marginLeft: normalize(6),
  },
  clinicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  clinicText: {
    fontSize: normalize(11),
    letterSpacing: 0.2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(4),
    marginRight: normalize(12),
    borderWidth: 3,
    boxShadow: '0px 2.3px 4.5px rgba(0, 0, 0, 0.05)',
    borderColor: "#F1F5F9"
  },
  pointsText: {
    marginLeft: normalize(8),
    fontSize: normalize(16),
  },
  avatarButton: {
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarFallback: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: '#2E7BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarInitial: {
    fontSize: normalize(18),
  },
});
