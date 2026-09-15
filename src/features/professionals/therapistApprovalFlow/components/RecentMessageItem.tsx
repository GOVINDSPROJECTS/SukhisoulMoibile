import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';

interface RecentMessageItemProps {
  name: string;
  message: string;
  time: string;
  initials: string;
  avatarColor: string;
  isUnread?: boolean;
}

export const RecentMessageItem: React.FC<RecentMessageItemProps> = ({
  name,
  message,
  time,
  initials,
  avatarColor,
  isUnread = false,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <AppText family="primary" weight="bold" style={styles.initials}>
            {initials}
          </AppText>
        </View>
        {isUnread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.content}>
        <AppText family="primary" weight="bold" style={styles.name}>
          {name}
        </AppText>
        <AppText family="primary" weight="medium" style={[styles.message, isUnread && styles.unreadMessage]} numberOfLines={1}>
          {message}
        </AppText>
      </View>
      <AppText family="primary" weight="medium" style={styles.time}>
        {time}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalize(12),
  },
  avatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: '#DC2626',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginRight: normalize(12),
  },
  name: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  message: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  unreadMessage: {
    color: '#1E293B',
    fontWeight: '600',
  },
  time: {
    fontSize: normalize(9),
    color: '#94A3B8',
  },
});
