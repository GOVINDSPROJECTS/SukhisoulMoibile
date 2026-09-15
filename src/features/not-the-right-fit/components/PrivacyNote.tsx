import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface PrivacyNoteProps {

}

export const PrivacyNote: React.FC<PrivacyNoteProps> = () => {

    return (
        <View style={styles.privacyRow}>
            <ShieldCheck size={normalize(26)} color={"#0040A1"} strokeWidth={2} />
            <AppText variant="body" family='secondary' weight="regular" style={styles.privacyText}>
                Your feedback is private and used only to personalize your therapist matching experience.
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    privacyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(16),
        backgroundColor: '#F0F3FF',
        borderRadius: normalize(10),
        padding: normalize(16),
        marginBottom: normalize(8),
        borderWidth: 1,
        borderColor: 'rgba(195,198,214,0.30)',
        marginTop: normalize(25),
        paddingHorizontal: normalize(24),
    },
    privacyText: {
        flex: 1,
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        lineHeight: normalize(17),
    },

});