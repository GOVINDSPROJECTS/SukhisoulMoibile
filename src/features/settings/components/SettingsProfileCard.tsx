import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SettingsProfileCardProps {
  name: string;
  subtitle: string;
  avatarUri?: string | null;
  onPress: () => void;
}

export const SettingsProfileCard: React.FC<SettingsProfileCardProps> = ({
  name,
  subtitle,
  avatarUri,
  onPress,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionLabelParent}>
        <AppText
          weight="medium"
          family="secondary"
          style={styles.sectionLabel}
          color={colors.typographyColor.Light || '#757C7A'}
        >
          Personal Info
        </AppText>
      </View>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <AppText weight="extraBold" color="#FFFFFF" style={styles.avatarInitial}>
                {name.charAt(0)}
              </AppText>
            </View>
          )}
        </View>

        {/* Name & details */}
        <View style={styles.info}>
          <AppText
            weight="extraBold"
            family="primary"
            style={styles.nameText}
            color={colors.typographyColor.Medium || '#1E293B'}
          >
            {name}
          </AppText>
          <AppText
            weight="regular"
            family="secondary"
            style={styles.subtitleText}
            color={colors.typographyColor.Medium || '#757C7A'}
          >
            {subtitle}
          </AppText>
        </View>

        {/* Pencil Edit Icon Button */}
        <View style={styles.editBtn}>
          <Pencil
            size={normalize(17)}
            color={'#ffffff'}
            fill={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={1}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: normalize(24),
  },
  sectionLabelParent: {
    backgroundColor: colors.blue[50],
    marginBottom: normalize(8),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
    borderRadius: normalize(12),
  },
  sectionLabel: {
    fontSize: normalize(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
  },
  avatarWrapper: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(14),
    overflow: 'hidden',
  },
  avatar: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(14),
  },
  avatarFallback: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(14),
    backgroundColor: colors.appThemeColor[500] || '#4F8BB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: normalize(22),
  },
  info: {
    flex: 1,
    gap: normalize(3),
  },
  nameText: {
    fontSize: normalize(14),
  },
  subtitleText: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
  },
  editBtn: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
