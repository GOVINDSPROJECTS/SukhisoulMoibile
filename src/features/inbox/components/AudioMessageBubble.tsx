import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { CheckCheck, Heart, Play } from 'lucide-react-native';
import { colors } from '@/theme';

export interface AudioMessageType {
  id: string;
  duration: string;
  time: string;
  isUser: boolean;
  isRead?: boolean;
  reaction?: 'heart' | null;
  senderAvatar?: string;
}

interface AudioMessageBubbleProps {
  message: AudioMessageType;
  isSelected?: boolean;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

export const AudioMessageBubble: React.FC<AudioMessageBubbleProps> = ({
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

  // Mock waveform bars (random heights)
  const renderWaveform = () => {
    const bars = [10, 14, 8, 16, 12, 10, 18, 14, 8, 12, 16, 10];
    return (
      <View style={styles.waveformContainer}>
        {bars.map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveformBar,
              { height: normalize(height), opacity: index < 4 ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    );
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
          <View style={styles.audioContent}>
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <Play size={normalize(16)} color="#FFFFFF" fill="#FFFFFF" style={styles.playIcon} />
            </TouchableOpacity>

            {renderWaveform()}

            <AppText style={[styles.durationText, message.isUser ? styles.textUser : styles.textTherapist]} weight="semiBold" family='secondary'>
              {message.duration}
            </AppText>
          </View>
        </View>

        {/* Reaction badge */}
        {message.reaction === 'heart' && (
          <View style={[styles.reactionBadge, message.isUser ? styles.reactionBadgeRight : styles.reactionBadgeLeft]}>
            <Heart size={normalize(12)} color="#EF4444" fill="#EF4444" />
          </View>
        )}

        {/* Footer (Time & Read receipt) */}
        <View style={[styles.footer, message.isUser ? styles.footerRight : styles.footerLeft]}>
          <AppText style={styles.timeText}>{message.time}</AppText>
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
    backgroundColor: 'rgba(2, 117, 198, 0.1)',
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
    marginBottom: normalize(20),
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
  audioContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: '#004D99', // Brand blue
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  playIcon: {
    marginLeft: normalize(2), // Offset play icon slightly to appear centered visually
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(3),
    marginRight: normalize(16),
  },
  waveformBar: {
    width: normalize(3),
    backgroundColor: '#94A3B8', // Slate 400
    borderRadius: normalize(2),
  },
  durationText: {
    fontSize: normalize(12),
  },
  textTherapist: {
    color: '#004D99',
  },
  textUser: {
    color: '#004D99',
  },
  reactionBadge: {
    position: 'absolute',
    bottom: normalize(16),
    backgroundColor: '#FFFFFF',
    padding: normalize(4),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
    color: '#94A3B8',
  },
  readIcon: {
    marginLeft: normalize(4),
  },
});
