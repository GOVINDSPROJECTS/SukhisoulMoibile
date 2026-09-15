import React, { useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Clipboard,
    Alert,
} from 'react-native';
import { Pencil, Copy, User } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { ProfileImagePicker } from '@components/atoms/ProfileImagePicker';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileHeaderProps {
    name: string;
    sukhiSoulId: string;
    designation?: string;
    tags: string[];
    avatarUri?: string | null;
    onAvatarSelected: (uri: string) => void;
    isEditing?: boolean;
    onEditNamePress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    sukhiSoulId,
    tags,
    avatarUri,
    onAvatarSelected,
    isEditing = false,
    onEditNamePress,
}) => {
    const handleCopyId = useCallback(() => {
        Clipboard.setString(sukhiSoulId);
        Alert.alert('Copied', 'Sukhi Soul ID copied to clipboard.');
    }, [sukhiSoulId]);

    return (
        <View style={styles.container}>
            {/* Avatar + Name Row */}
            <View style={styles.avatarRow}>
                {/* Avatar with Image Picker */}
                <ProfileImagePicker
                    imageUri={avatarUri}
                    onImageSelected={onAvatarSelected}
                    shape="squircle"
                    size={normalize(80)}
                    showEditBadge
                    badgeIcon="pencil"
                    fallbackInitial={name.charAt(0)}
                    borderColor="rgba(255,255,255,0.7)"
                    borderWidth={2}
                />

                {/* Name + SSU ID */}
                <View style={styles.nameBlock}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onEditNamePress}
                        style={styles.nameRow}
                    >
                        <AppText
                            weight="extraBold"
                            family="primary"
                            style={styles.nameText}
                            color="#FFFFFF"
                        >
                            {name}
                        </AppText>
                        <View style={styles.namePencilBtn}>
                            <Pencil size={normalize(14)} color="#FFFFFF" strokeWidth={2} />
                        </View>
                    </TouchableOpacity>

                    {/* SSU ID Pill */}
                    <TouchableOpacity
                        style={[
                            styles.ssuIdPill,
                            isEditing ? styles.ssuIdPillEditing : styles.ssuIdPillView,
                        ]}
                        onPress={handleCopyId}
                        activeOpacity={0.85}
                    >
                        <User
                            size={normalize(12)}
                            color={isEditing ? colors.typographyColor.Dark : '#FFFFFF'}
                            strokeWidth={2}
                        />
                        <AppText
                            weight="medium"
                            family="secondary"
                            style={styles.ssuIdText}
                            color={isEditing ? colors.typographyColor.Dark : '#FFFFFF'}
                        >
                            Sukhi Soul ID: {sukhiSoulId}
                        </AppText>
                        {!isEditing && (
                            <Copy size={normalize(11)} color="#FFFFFF" strokeWidth={2} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Interest Tags */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsScroll}
                style={styles.tagsScrollView}
            >
                {tags.map((tag) => (
                    <View
                        key={tag}
                        style={[
                            styles.tag,
                            isEditing ? styles.tagEditing : styles.tagView,
                        ]}
                    >
                        <AppText
                            weight="medium"
                            family="secondary"
                            style={styles.tagText}
                            color={isEditing ? colors.typographyColor.Dark : '#FFFFFF'}
                        >
                            {tag}
                        </AppText>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(14),
        paddingBottom: normalize(20),
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(14),
        marginBottom: normalize(16),
    },
    nameBlock: {
        flex: 1,
        gap: normalize(8),
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
    },
    nameText: {
        fontSize: normalize(17),
        marginBottom: normalize(3)
    },
    namePencilBtn: {
        padding: normalize(2),
    },
    ssuIdPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(6),
        alignSelf: 'flex-start',
    },
    ssuIdPillView: {
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderRadius: normalize(6),
    },
    ssuIdPillEditing: {
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(8),
    },
    ssuIdText: {
        fontSize: normalize(11),
    },
    tagsScrollView: {
        marginTop: normalize(15),
        marginHorizontal: normalize(-20),
        paddingBottom: normalize(50),
    },
    tagsScroll: {
        paddingHorizontal: normalize(20),
        gap: normalize(8),
    },
    tag: {
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(4),
        borderRadius: normalize(8),
    },
    tagView: {
        backgroundColor: 'rgba(255,255,255,0.22)',
    },
    tagEditing: {
        backgroundColor: '#FFFFFF',
    },
    tagText: {
        fontSize: normalize(11.5),
    },
});
