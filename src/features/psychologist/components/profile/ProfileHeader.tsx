import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { ArrowLeft, Share2Icon } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProfileHeaderProps {
  onBack?: () => void;
  /** Optional override — if omitted the component uses its own built-in Share sheet */
  onShare?: () => void;
  doctorName?: string;
  designation?: string;
}

const PROFILE_LINK = 'https://yourwebsitelink.here';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onBack,
  onShare,
  doctorName = 'Dr. Ananya Sharma',
  designation = 'Clinical Psychologist',
}) => {
  const handleShare = useCallback(async () => {
    if (onShare) {
      onShare();
      return;
    }

    const shortIntro =
      `${doctorName} is a certified ${designation} with 10+ years of experience ` +
      `specialising in CBT, Anxiety & Stress Management. ` +
      `Book your session today and take the first step towards better mental health...`;

    try {
      await Share.share({
        title: `Meet ${doctorName}`,
        message:
          `👩‍⚕️ *${doctorName}*\n` +
          `🏥 ${designation}\n\n` +
          `${shortIntro}\n\n` +
          `🔗 Book now: ${PROFILE_LINK}`,
      });
    } catch (e) {
      // Share was dismissed or failed silently
    }
  }, [onShare, doctorName, designation]);

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
      <TouchableOpacity onPress={onBack} activeOpacity={0.5} style={styles.iconBtn}>
        <ArrowLeft size={normalize(25)} color={colors.lightAppTheme[950]} strokeWidth={2} />
      </TouchableOpacity>

      <AppText variant="h4" weight="extraBold" style={styles.title}>
        Therapist Profile
      </AppText>

      <TouchableOpacity onPress={handleShare} activeOpacity={0.5} style={styles.iconBtn}>
        <Share2Icon
          size={normalize(20)}
          color={colors.lightAppTheme[950]}
          strokeWidth={2}
        />
      </TouchableOpacity>
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
    borderRadius: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(17),
    color: colors.typographyColor['Color 2'],
  },
});
