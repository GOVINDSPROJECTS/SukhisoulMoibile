import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

import { useNotifications } from '@/features/notifications/hooks/useNotifications';

interface ExploreHeaderProps {
  hasNotification?: boolean;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  hasNotification,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { data: notifData } = useNotifications();
  const showDot = hasNotification !== undefined ? hasNotification : (notifData?.unread_count ?? 0) > 0;

  return (
    <LinearGradient
      colors={[
        colors.lightTints.blueLightTint[50],
        colors.lightTints.blueLightTint[100],
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Back button — exact same pattern as RedeemScreen */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.iconBtn,
          pressed && { backgroundColor: colors.lightTints.blueLightTint[50], borderRadius: normalize(99) },
        ]}
      >
        <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
      </Pressable>

      {/* Centered title */}
      <AppText variant="h4" weight="bold" style={styles.title}>
        Therapist Profile
      </AppText>

      {/* Bell with notification dot */}
      <Pressable
        onPress={() => navigation.navigate('Notifications')}
        style={({ pressed }) => [
          styles.iconBtn, {
            backgroundColor: colors.appThemeColor[50], borderRadius: normalize(99)
          },
          pressed && { backgroundColor: colors.lightTints.blueLightTint[100] },
        ]}
      >
        <Bell size={normalize(20)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        {showDot && <View style={styles.notifDot} />}
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  iconBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
  notifDot: {
    position: 'absolute',
    top: normalize(4),
    right: normalize(4),
    width: normalize(7),
    height: normalize(7),
    borderRadius: normalize(4),
    backgroundColor: '#E53935',
    borderWidth: 1.2,
    borderColor: '#FFFFFF',
  },
});
