import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, Pencil } from 'lucide-react-native';
import { AppText } from './AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface ProfileImagePickerProps {
  imageUri?: string | null;
  onImageSelected: (uri: string) => void;
  shape?: 'circle' | 'squircle';
  size?: number;
  showEditBadge?: boolean;
  badgeIcon?: 'pencil' | 'camera';
  label?: string;
  errorMessage?: string;
  editable?: boolean;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  fallbackInitial?: string;
  borderColor?: string;
  borderWidth?: number;
}

export const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  imageUri,
  onImageSelected,
  shape = 'circle',
  size = normalize(90),
  showEditBadge = false,
  badgeIcon = 'pencil',
  label,
  errorMessage,
  editable = true,
  style,
  imageStyle,
  fallbackInitial,
  borderColor,
  borderWidth = 2,
}) => {
  const borderRadius = shape === 'circle' ? size / 2 : normalize(18);

  const handlePickImage = useCallback(() => {
    if (!editable) return;
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
          onImageSelected(response.assets[0].uri);
        }
      },
    );
  }, [editable, onImageSelected]);

  const badgeSize = normalize(24);

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity
        activeOpacity={editable ? 0.8 : 1}
        onPress={handlePickImage}
        disabled={!editable}
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius,
            borderWidth: borderWidth,
            borderColor: errorMessage
              ? '#FF3B30'
              : borderColor || colors.tintsGrey[400],
          },
        ]}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[
              styles.image,
              {
                width: size,
                height: size,
                borderRadius: borderRadius - 2,
              },
              imageStyle,
            ]}
            resizeMode="cover"
          />
        ) : fallbackInitial ? (
          <View
            style={[
              styles.fallbackContainer,
              {
                width: size,
                height: size,
                borderRadius: borderRadius - 2,
              },
            ]}
          >
            <AppText
              weight="extraBold"
              color="#FFFFFF"
              style={{ fontSize: size * 0.4 }}
            >
              {fallbackInitial.toUpperCase()}
            </AppText>
          </View>
        ) : (
          <Camera size={normalize(28)} color={colors.tintsGrey[500]} />
        )}

        {/* Edit badge */}
        {showEditBadge && editable && (
          <View
            style={[
              styles.badge,
              {
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
              },
            ]}
          >
            {badgeIcon === 'camera' ? (
              <Camera size={normalize(12)} color={colors.typographyColor.Dark} />
            ) : (
              <Pencil size={normalize(12)} color={colors.typographyColor.Dark} strokeWidth={2.5} />
            )}
          </View>
        )}
      </TouchableOpacity>

      {label ? (
        <AppText variant="caption" weight="semiBold" style={styles.label}>
          {label}
        </AppText>
      ) : null}

      {errorMessage ? (
        <AppText variant="caption" weight="regular" style={styles.errorText}>
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.appThemeColor[50],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    overflow: 'hidden',
  },
  fallbackContainer: {
    backgroundColor: colors.appThemeColor[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: normalize(-4),
    right: normalize(-4),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  label: {
    marginTop: normalize(8),
    color: colors.tintsGrey[600],
    fontSize: normalize(12),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: normalize(11),
    marginTop: normalize(4),
    marginLeft: normalize(2),
  },
});
