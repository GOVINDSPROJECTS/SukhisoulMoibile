import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

interface TherapyProgressProps {
    planName?: string;
    progressLabel?: string;
    progress?: number;
}

export const TherapyProgress: React.FC<TherapyProgressProps> = ({
    planName = 'CBT Anxiety plan progress',
    progressLabel = 'Therapy Progress',
    progress = 40,
}) => {
    const { borderRadius } = useTheme();

    return (
        <View style={[styles.container, { borderRadius: normalize(10) }]}>
            <View style={styles.headerRow}>
                <View>
                    <AppText variant="h4" family='secondary' weight="extraBold" style={styles.title}>
                        {progressLabel}
                    </AppText>
                    <AppText variant="caption" family='secondary' weight="regular" style={styles.subtitle}>
                        {planName}
                    </AppText>
                </View>
                <AppText variant="h4" weight="bold" style={styles.percent}>
                    {progress}%
                </AppText>
            </View>

            {/* Progress Bar */}
            <View style={styles.barTrack}>
                <LinearGradient
                    colors={[colors.blue[700], colors.blue[600]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${progress}%` }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(20),
        backgroundColor: '#FFFFFF',
        paddingVertical: normalize(20),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(12),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: normalize(12),
    },
    title: {
        color: colors.typographyColor.Black,
        fontSize: normalize(14),
    },
    subtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    percent: {
        color: colors.appThemeColor[700],
        fontSize: normalize(13),
    },
    barTrack: {
        height: normalize(10),
        backgroundColor: colors.appThemeColor[75],
        borderRadius: normalize(99),
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: normalize(99),
    },
});
