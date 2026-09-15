import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Phone, MoreVertical, X, CornerUpLeft, Star, Trash2, Languages, Navigation2, Reply } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export interface ChatHeaderProps {
  selectionCount: number;
  onBack: () => void;
  onClearSelection: () => void;
  onDeleteSelection: () => void;
  therapist: {
    name: string;
    avatarUrl: string;
    role: string;
    isOnline: boolean;
  };
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectionCount,
  onBack,
  onClearSelection,
  onDeleteSelection,
  therapist,
}) => {
  const insets = useSafeAreaInsets();
  const isSelectionMode = selectionCount > 0;

  return (
    <View style={[styles.container, { paddingTop: normalize(12) }]}>
      {isSelectionMode ? (
        // Selection Mode Header
        <View style={styles.headerRow}>
          <View style={styles.leftGroup}>
            <TouchableOpacity onPress={onClearSelection} style={styles.iconButton}>
              <X size={normalize(24)} color={colors.lightAppTheme[950]} />
            </TouchableOpacity>
            <AppText style={styles.selectionText} weight="semiBold">
              {selectionCount} selected
            </AppText>
          </View>
          <View style={styles.rightGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <Reply size={normalize(20)} color={colors.lightAppTheme[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Star size={normalize(20)} color={colors.lightAppTheme[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onDeleteSelection}>
              <Trash2 size={normalize(20)} color={colors.lightAppTheme[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Navigation2 size={normalize(20)} color={colors.lightAppTheme[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MoreVertical size={normalize(20)} color="#1D4ED8" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Normal Mode Header
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack} style={styles.iconButton}>
            <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: therapist.avatarUrl }} style={styles.avatar} />
              {therapist.isOnline && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.textInfo}>
              <AppText style={styles.name} weight="extraBold" family="secondary">
                {therapist.name}
              </AppText>
              <View style={styles.subtitleRow}>
                <AppText style={styles.role} weight='regular' numberOfLines={1} ellipsizeMode='tail'>{therapist.role} • </AppText>
                <AppText style={styles.onlineText}>{therapist.isOnline ? 'Online' : 'Offline'}</AppText>
              </View>
            </View>
          </View>

          <View style={styles.rightGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <Phone size={normalize(20)} color={colors.typographyColor['Dark 2']} fill={colors.typographyColor['Dark 2']} strokeWidth={0} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MoreVertical size={normalize(20)} color="#5C5F61" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightAppTheme[50],
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  selectionText: {
    fontSize: normalize(15),
    color: colors.typographyColor['Dark 2'],
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  iconButton: {
    padding: normalize(8),
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: normalize(3),
  },
  avatarContainer: {
    marginRight: normalize(12),
    position: 'relative',
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: "#ffffff"
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#F8F9FC',
  },
  textInfo: {
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(16),
    color: colors.typographyColor.Dark,
    letterSpacing: -0.4
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  role: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  onlineText: {
    fontSize: normalize(11),
    color: colors.green[500],
  },
});
