import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { User, Pencil } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { PersonalInfoView, PersonalInfoData } from './PersonalInfoView';
import { EditPersonalInfoForm } from './EditPersonalInfoForm';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalInfoSectionProps {
    data: PersonalInfoData;
    onDataChange: (updated: PersonalInfoData) => void;
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
    data,
    onDataChange,
    isEditing,
    setIsEditing,
}) => {
    const handleEdit = useCallback(() => setIsEditing(true), [setIsEditing]);

    const handleSave = useCallback(
        (updated: PersonalInfoData) => {
            onDataChange(updated);
            setIsEditing(false);
        },
        [onDataChange, setIsEditing],
    );

    const handleCancel = useCallback(() => setIsEditing(false), [setIsEditing]);

    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.headerLeftIcon}>
                        <User size={normalize(18)} color={colors.blue[600] || '#1E88E5'} strokeWidth={2} />
                    </View>
                    <AppText
                        weight="extraBold"
                        family="primary"
                        style={styles.headerTitle}
                        color={colors.typographyColor.Black}
                    >
                        Personal Information
                    </AppText>
                </View>

                {!isEditing && (
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={handleEdit}
                        activeOpacity={0.8}
                    >
                        <Pencil size={normalize(12)} color={colors.blue[600] || '#1E88E5'} strokeWidth={2} />
                        <AppText
                            weight="semiBold"
                            family="primary"
                            style={styles.editBtnText}
                            color={colors.blue[600] || '#1E88E5'}
                        >
                            Edit
                        </AppText>
                    </TouchableOpacity>
                )}
            </View>

            {/* Content: View or Edit */}
            {isEditing ? (
                <EditPersonalInfoForm
                    data={data}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <PersonalInfoView
                    data={data}
                    onFieldPress={handleEdit}
                />
            )}
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(18),
        paddingHorizontal: normalize(4),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(8),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
    },
    headerLeftIcon: {
        width: normalize(36),
        height: normalize(36),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(9),
        backgroundColor: colors.tintsBlue[50],
        marginLeft: normalize(-5)
    },
    headerTitle: {
        fontSize: normalize(15.5),
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(6),
        borderRadius: normalize(8),
        backgroundColor: colors.tintsBlue[50],
        borderWidth: normalize(1),
        borderColor: colors.lightTints.blueLightTint[50]
    },
    editBtnText: {
        fontSize: normalize(12.5),
    },
});
