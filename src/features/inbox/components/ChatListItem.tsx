import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface ChatListType {
  id: string;
  name: string;
  avatarUrl: any;
  isOnline: boolean;
  lastMessage: string;
  time: string;
  unreadCount: number;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface ChatListItemProps {
  chat: ChatListType;
  onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, chat.subtitle && styles.containerWithSubtitle]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={typeof chat.avatarUrl === 'string' ? { uri: chat.avatarUrl } : chat.avatarUrl}
          style={styles.avatar}
        />
        {chat.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <AppText style={styles.name} weight="bold" family="secondary">
            {chat.name}
          </AppText>
          <AppText style={styles.time} weight="medium" family='primary'>
            {chat.time}
          </AppText>
        </View>

        {chat.subtitle && (
          <View style={styles.subtitleRow}>
            {chat.icon}
            <AppText style={styles.subtitle} weight="medium">{chat.subtitle}</AppText>
          </View>
        )}

        <View style={styles.bottomRow}>
          <AppText
            style={[styles.message, chat.unreadCount > 0 && styles.messageUnread]}
            numberOfLines={2}
            family='secondary'
            weight='light'
          >
            {chat.lastMessage}
          </AppText>
          {chat.unreadCount > 0 && (
            <View style={styles.badge}>
              <AppText style={styles.badgeText} weight="bold">{chat.unreadCount}</AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: normalize(17),
    backgroundColor: colors.lightAppTheme[50],
    borderRadius: normalize(99),
    marginBottom: normalize(12),
    marginHorizontal: normalize(20),
    alignItems: 'center'
  },
  containerWithSubtitle: {
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)',
    backgroundColor: '#ffffff',
    borderRadius: normalize(16)
  },
  avatarContainer: {
    marginRight: normalize(16),
    position: 'relative',
  },
  avatar: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(99),
    backgroundColor: '#F1F5F9', // Fallback color
  },
  onlineDot: {
    position: 'absolute',
    bottom: normalize(0),
    right: normalize(0),
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    backgroundColor: '#10B981', // Emerald 500
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(2),
  },
  name: {
    fontSize: normalize(14),
    color: '#2D3432',
  },
  time: {
    fontSize: normalize(11),
    color: '#59615F',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(4),
    color: '#59615F',
  },
  subtitle: {
    fontSize: normalize(11),
    color: '#3B82F6', // Brand blue
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: normalize(2),
  },
  message: {
    flex: 1,
    fontSize: normalize(11.5),
    color: '#59615F',
    lineHeight: normalize(15),
    marginRight: normalize(12),
  },
  messageUnread: {
    color: '#64748B',
  },
  badge: {
    backgroundColor: '#3B82F6',
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: normalize(10),
  },
});
