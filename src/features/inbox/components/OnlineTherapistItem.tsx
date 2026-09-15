import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { MessageSquare, MessageSquareText } from 'lucide-react-native';

export interface OnlineTherapistType {
  id: string;
  name: string;
  avatarUrl: string;
  specialty: string;
  availability: string;
  availableColor: string;
}

interface OnlineTherapistItemProps {
  therapist: OnlineTherapistType;
  onChatPress: () => void;
}

export const OnlineTherapistItem: React.FC<OnlineTherapistItemProps> = ({ therapist, onChatPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: therapist.avatarUrl }} style={styles.avatar} />
        <View style={[styles.onlineDot, { backgroundColor: therapist.availableColor }]} />
      </View>

      <View style={styles.contentContainer}>
        <AppText style={styles.name} weight="bold" family="secondary">
          {therapist.name}
        </AppText>
        <AppText style={styles.specialty} weight='regular' family='secondary'>
          {therapist.specialty}
        </AppText>
        <AppText style={[styles.availability, { color: therapist.availableColor }]} weight="semiBold">
          {therapist.availability}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.chatButton}
        onPress={onChatPress}
      >
        <MessageSquare size={normalize(14)} color="#FFFFFF" style={styles.chatIcon} />
        <AppText style={styles.chatButtonText} weight="regular" family='secondary'>Chat</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(32),
    marginBottom: normalize(12),
    marginHorizontal: normalize(20),
    boxShadow: '0px 8px 24px rgba(45, 52, 50, 0.02)',
    paddingLeft: normalize(0),
  },
  avatarContainer: {
    marginRight: normalize(16),
    position: 'relative',
  },
  avatar: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(99),
    backgroundColor: '#F1F5F9',
  },
  onlineDot: {
    position: 'absolute',
    bottom: normalize(-4),
    right: normalize(0),
    width: normalize(15),
    height: normalize(15),
    borderRadius: normalize(99),
    backgroundColor: '#10B981', // Emerald 500
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(15),
    color: '#2D3432',
    marginBottom: normalize(2),
  },
  specialty: {
    fontSize: normalize(11.5),
    color: '#59615F',
    marginBottom: normalize(2),
  },
  availability: {
    fontSize: normalize(11),
    color: '#10B981', // Emerald 500
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightAppTheme[950],
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(10),
    borderRadius: normalize(99),
  },
  chatIcon: {
    marginRight: normalize(8),
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
});
