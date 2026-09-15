import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import {
    Code2,
    Mail,
    Phone,
    User,
    Calendar,
    Heart,
    MapPin,
    Globe,
    TrendingUp,
    Copy,
    ChevronRight,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PersonalInfoData {
    fullName: string;
    sukhiSoulId: string;
    email: string;
    phone: string;
    emergencyContact: string;
    gender: string;
    dateOfBirth: string;
    relationship: string;
    location: string;
    preferredLanguage: string;
    education: string;
    career: string;
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    placeholder?: string;
    isCopyable?: boolean;
    onPress?: () => void;
}

// ─── InfoRow ─────────────────────────────────────────────────────────────────

const InfoRow: React.FC<InfoRowProps> = memo(({
    icon,
    label,
    value,
    placeholder,
    isCopyable,
    onPress,
}) => {
    const displayValue = value || placeholder || '—';
    const isEmpty = !value;

    return (
        <TouchableOpacity
            style={styles.row}
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>{icon}</View>
                <AppText
                    weight="semiBold"
                    family="primary"
                    style={styles.rowLabel}
                    color={colors.typographyColor.Medium}
                >
                    {label}
                </AppText>
            </View>

            <View style={styles.rowRight}>
                <AppText
                    weight="regular"
                    family="secondary"
                    style={styles.rowValue}
                    color={isEmpty ? colors.typographyColor.Light : colors.typographyColor.Light}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                >
                    {displayValue}
                </AppText>
                {isCopyable ? (
                    <Copy size={normalize(13)} color={colors.typographyColor.Light} strokeWidth={2} />
                ) : (
                    <ChevronRight size={normalize(14)} color={colors.typographyColor.Light} strokeWidth={1.8} />
                )}
            </View>
        </TouchableOpacity>
    );
});

// ─── Component ────────────────────────────────────────────────────────────────

interface PersonalInfoViewProps {
    data: PersonalInfoData;
    onFieldPress?: () => void;
}

export const PersonalInfoView: React.FC<PersonalInfoViewProps> = ({
    data,
    onFieldPress,
}) => {
    const iconSize = normalize(16);
    const iconColor = colors.appThemeColor[500] || '#2E7BFF';

    const handleCopyId = useCallback(() => {
        Clipboard.setString(data.sukhiSoulId);
        Alert.alert('Copied', 'Sukhi Soul ID copied to clipboard.');
    }, [data.sukhiSoulId]);

    return (
        <View style={styles.container}>
            <InfoRow
                icon={<Code2 size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Sukhi Soul ID"
                value={data.sukhiSoulId}
                isCopyable
                onPress={handleCopyId}
            />

            <InfoRow
                icon={<Mail size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Email"
                value={data.email}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<Phone size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Phone"
                value={data.phone}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<Phone size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Emergency contact"
                value={data.emergencyContact}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<User size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Gender"
                value={data.gender}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<Calendar size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Date of Birth"
                value={data.dateOfBirth}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<Heart size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Relationship"
                value={data.relationship}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<MapPin size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Location"
                value={data.location}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<Globe size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Preferred Language"
                value={data.preferredLanguage}
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<TrendingUp size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Education"
                value={data.education}
                placeholder="Enter your education"
                onPress={onFieldPress}
            />

            <InfoRow
                icon={<TrendingUp size={iconSize} color={iconColor} strokeWidth={2} />}
                label="Career"
                value={data.career}
                placeholder="Enter a career"
                onPress={onFieldPress}
            />
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(0),
        marginTop: normalize(6),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(0),
        gap: normalize(8),
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        flex: 1,
    },
    rowIcon: {
        width: normalize(20),
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: normalize(12.5),
        color: colors.typographyColor.Dark,
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        maxWidth: '55%',
    },
    rowValue: {
        fontSize: normalize(12.5),
        textAlign: 'right',
        flexShrink: 1,
    },
});
