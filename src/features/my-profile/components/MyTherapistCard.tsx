import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MyTherapistCardProps {
    therapistName: string;
    therapistDesignation: string;
    avatarUri?: string;
    onViewPress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MyTherapistCard: React.FC<MyTherapistCardProps> = ({
    therapistName,
    therapistDesignation,
    avatarUri,
    onViewPress,
}) => {
    return (
        <LinearGradient
            colors={[colors.lightTints.blueLightTint[100], colors.tintsBlue[400]]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.card]}
        >
            {/* Therapist Avatar */}
            <View style={styles.avatarWrapper}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarFallback}>
                        <AppText weight="extraBold" color="#FFFFFF" style={styles.avatarInitial}>
                            {therapistName.charAt(0)}
                        </AppText>
                    </View>
                )}
            </View>

            {/* Info */}
            <View style={styles.info}>
                <AppText
                    weight="semiBold"
                    family="secondary"
                    style={styles.myTherapistLabel}
                    color={colors.typographyColor.Medium}
                >
                    My Therapist
                </AppText>
                <AppText
                    weight="extraBold"
                    family="primary"
                    style={styles.therapistName}
                    color={colors.lightAppTheme[950] || '#003CA3'}
                >
                    {therapistName}
                </AppText>
                <AppText
                    weight="medium"
                    family="secondary"
                    style={styles.designation}
                    color={colors.typographyColor.Light}
                >
                    {therapistDesignation}
                </AppText>
            </View>

            {/* View Button */}
            <TouchableOpacity
                style={styles.viewBtn}
                onPress={onViewPress}
                activeOpacity={0.8}
            >
                <AppText
                    weight="bold"
                    family="primary"
                    style={styles.viewBtnText}
                    color={colors.typographyColor['Dark 2'] || '#003CA3'}
                >
                    View
                </AppText>
            </TouchableOpacity>
        </LinearGradient>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    card: {
        marginHorizontal: normalize(20),
        marginTop: normalize(14),
        backgroundColor: '#DCEBFA',
        borderRadius: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        padding: normalize(12),
        gap: normalize(12),
    },
    avatarWrapper: {
        width: normalize(64),
        height: normalize(64),
        borderRadius: normalize(16),
        overflow: 'hidden',
        borderWidth: normalize(2),
        borderColor: '#FFFFFF',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: normalize(16),
    },
    avatarFallback: {
        width: '100%',
        height: '100%',
        borderRadius: normalize(16),
        backgroundColor: colors.appThemeColor[400],
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        fontSize: normalize(22),
    },
    info: {
        flex: 1,
        gap: normalize(2),
    },
    myTherapistLabel: {
        fontSize: normalize(11),
        marginBottom: normalize(-5),
    },
    therapistName: {
        fontSize: normalize(15),
        marginBottom: normalize(-1),
    },
    designation: {
        fontSize: normalize(11),
    },
    viewBtn: {
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(8),
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(12),
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
    },
    viewBtnText: {
        fontSize: normalize(12),
    },
});
