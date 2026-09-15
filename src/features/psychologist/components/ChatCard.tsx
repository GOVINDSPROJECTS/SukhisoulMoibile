import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { resolveImageUrl } from '@api/professionals';

interface ChatCardProps {
  avatar: string;
  drName: string;
  chatSnippet: string;
  chatTime: string;
  onPress?: () => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({ avatar, drName, chatSnippet, chatTime, onPress }) => {
  const { borderRadius } = useTheme();

  return (
    <>
      <TouchableOpacity
        style={[styles.chatCard, { borderRadius: 32 }]}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <View style={styles.chatAvatarWrapper}>
          <Image
            source={{ uri: resolveImageUrl(avatar) || 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400' }}
            style={styles.chatAvatar}
          />
          <View style={styles.activeDotBadge}>
            <AppText style={styles.activeDotText}>1</AppText>
          </View>
        </View>
        <View style={styles.chatInfoWrapper}>
          <AppText variant="body" weight="extraBold" style={styles.chatName}>{drName}</AppText>
          <AppText variant="caption" weight="regular" style={styles.chatSnippet} numberOfLines={1}>{chatSnippet}</AppText>
        </View>
        <AppText variant="caption" style={styles.chatTime}>{chatTime}</AppText>
      </TouchableOpacity>

    </>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#2D3432',
  },
  sectionSubtitle: {
    fontSize: normalize(11),
    color: '#59615F',
    marginTop: normalize(2),
  },

  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightAppTheme[50],
    padding: normalize(16),
    marginTop: normalize(10),
  },
  chatAvatarWrapper: {
    width: normalize(44),
    height: normalize(44),
    position: 'relative',
    marginRight: normalize(12),
  },
  chatAvatar: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
  },
  activeDotBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    backgroundColor: '#375EA4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  activeDotText: {
    color: '#FFFFFF',
    fontSize: normalize(8),
    fontWeight: 'bold',
  },
  chatInfoWrapper: {
    flex: 1,
  },
  chatName: {
    fontSize: normalize(14),
    color: '#2D3432',
  },
  chatSnippet: {
    fontSize: normalize(11),
    color: '#59615F',
    marginTop: normalize(2),
  },
  chatTime: {
    fontSize: normalize(10),
    color: '#59615F',
    alignSelf: 'flex-start',
    marginTop: normalize(2),
  },
});
