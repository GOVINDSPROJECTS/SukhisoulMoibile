import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BadgeCheck, Verified } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { resolveImageUrl } from '@api/professionals';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400';

interface TherapistCardTopInfoProps {
    name?: string;
    designation?: string;
    experience?: string;
    imageUrl?: string;
}

export const TherapistCardTopInfo: React.FC<TherapistCardTopInfoProps> = ({
    name = 'Dr. Sameer Joshi',
    designation = 'Sleep Disorders • Anxiety Support',
    experience = '10+ Years Experience',
    imageUrl,
}) => {
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
        setImgError(false);
    }, [imageUrl]);

    const finalAvatarUri = !imgError && imageUrl
        ? (resolveImageUrl(imageUrl) || DEFAULT_AVATAR)
        : DEFAULT_AVATAR;

    return (
        <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: finalAvatarUri }}
                    style={styles.avatar}
                    onError={() => setImgError(true)}
                />
                <View style={styles.activeDot} />
            </View>

        <View style={styles.infoWrapper}>
            <View style={styles.tagWrapper}>
                <AppText variant="caption" weight="extraBold" style={styles.tagText}>
                    MY THERAPIST
                </AppText>
            </View>
            <View style={styles.nameRow}>
                <AppText variant="h3" weight="extraBold" style={styles.doctorName}>
                    {name}
                </AppText>
                <Verified fill="#0066CC" stroke={colors.appThemeColor[50]} style={styles.verifiedIcon} />
            </View>
            <AppText variant="caption" weight="regular" style={styles.speciality}>
                {designation}
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.experience}>
                {experience}
            </AppText>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.typographyColor.White,
        borderRadius: normalize(30),
        marginHorizontal: normalize(20),
        marginTop: normalize(16),
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(18),
        overflow: 'hidden',

    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: normalize(12),
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(14),
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: normalize(14),
    },
    avatar: {
        width: normalize(86),
        height: normalize(86),
        borderRadius: normalize(28),
    },
    activeDot: {
        position: 'absolute',
        bottom: 2,
        right: -2,
        width: normalize(18),
        height: normalize(18),
        borderRadius: normalize(9),
        backgroundColor: colors.green[500],
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    infoWrapper: {
        flex: 1,
    },
    tagWrapper: {
        backgroundColor: colors.lightTints.blueLightTint[100],
        borderRadius: normalize(99),
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(3),
        alignSelf: 'flex-start',
        marginBottom: normalize(5),
    },
    tagText: {
        color: colors.blue[600],
        fontSize: normalize(9),
        letterSpacing: 0.8,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
    },
    doctorName: {
        color: colors.appThemeColor[950],
        fontSize: normalize(15),
        flexShrink: 1,
    },
    verifiedIcon: {
        marginTop: normalize(2),
    },
    speciality: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    experience: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(1),
    },
});
