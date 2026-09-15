import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { CheckCheck, Heart } from 'lucide-react-native';
import { colors } from '@/theme';

export interface ChatMessageType {
  id: string;
  text: string;
  time: string;
  isUser: boolean;
  isRead?: boolean;
  reaction?: 'heart' | null;
  senderAvatar?: string; // Only needed if not user
}

interface ChatMessageBubbleProps {
  message: ChatMessageType;
  isSelected?: boolean;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  isSelected = false,
  onLongPress,
  onDoubleTap,
}) => {
  const lastTap = useRef<number | null>(null);

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      if (onDoubleTap) onDoubleTap();
    } else {
      lastTap.current = now;
    }
  };

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={handlePress}
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        message.isUser ? styles.containerRight : styles.containerLeft,
      ]}
    >
      {!message.isUser && message.senderAvatar && (
        <Image source={{ uri: message.senderAvatar }} style={styles.avatar} />
      )}

      <View style={[styles.bubbleWrapper, message.isUser ? styles.bubbleWrapperRight : styles.bubbleWrapperLeft]}>
        <View
          style={[
            styles.bubble,
            message.isUser ? styles.bubbleUser : styles.bubbleTherapist,
          ]}
        >
          <AppText style={[styles.text, message.isUser ? styles.textUser : styles.textTherapist]}>
            {message.text}
          </AppText>
        </View>

        {/* Reaction badge */}
        {message.reaction === 'heart' && (
          <View style={[styles.reactionBadge, message.isUser ? styles.reactionBadgeRight : styles.reactionBadgeLeft]}>
            <Heart size={normalize(14)} color="#EF4444" fill="#EF4444" />
          </View>
        )}

        {/* Footer (Time & Read receipt) */}
        <View style={[styles.footer, message.isUser ? styles.footerRight : styles.footerLeft]}>
          <AppText style={styles.timeText} family='secondary' weight='light'>{message.time}</AppText>
          {message.isUser && (
            <CheckCheck
              size={normalize(14)}
              color={message.isRead ? '#0275C6' : '#94A3B8'}
              style={styles.readIcon}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    width: '100%',
    marginBottom: normalize(15),
  },
  containerSelected: {
    backgroundColor: 'rgba(2, 117, 198, 0.1)', // Light brand blue
  },
  containerLeft: {
    justifyContent: 'flex-start',
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(14),
    marginRight: normalize(10),
    alignSelf: 'flex-end',
    marginBottom: normalize(20), // Align with bottom of bubble, above timestamp
  },
  bubbleWrapper: {
    maxWidth: '75%',
    position: 'relative',
  },
  bubbleWrapperLeft: {
    alignItems: 'flex-start',
  },
  bubbleWrapperRight: {
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    borderRadius: normalize(20),
    borderWidth: 1,
  },
  bubbleTherapist: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C2C6D4',
    borderRadius: normalize(16),
    borderTopLeftRadius: normalize(0),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  bubbleUser: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderColor: 'transparent',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: normalize(18),
    borderTopRightRadius: normalize(0),
  },
  text: {
    fontSize: normalize(12),
    lineHeight: normalize(20),
  },
  textTherapist: {
    color: '#334155',
  },
  textUser: {
    color: colors.typographyColor.Medium,
  },
  reactionBadge: {
    position: 'absolute',
    bottom: normalize(16), // Position above the timestamp
    backgroundColor: '#FFFFFF',
    padding: normalize(4),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
    width: normalize(30),
    height: normalize(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionBadgeLeft: {
    right: normalize(-10),
  },
  reactionBadgeRight: {
    left: normalize(-10),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(4),
  },
  footerLeft: {
    justifyContent: 'flex-start',
  },
  footerRight: {
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  readIcon: {
    marginLeft: normalize(4),
  },
});
