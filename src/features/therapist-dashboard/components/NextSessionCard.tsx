import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, Clock, RefreshCcw, Video } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { GradientButton } from '@/components/atoms/GradientButton';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

interface NextSessionCardProps {
    dateTime?: string;
    duration?: string;
    onJoin?: () => void;
    onReschedule?: () => void;
    rescheduleInProgress?: boolean;
    rescheduleProgress?: number;
}

export const NextSessionCard: React.FC<NextSessionCardProps> = ({
    dateTime = 'Upcoming Session',
    duration = '50 Minutes',
    onJoin,
    onReschedule,
    rescheduleInProgress = false,
    rescheduleProgress = 60,
}) => {
    const { borderRadius } = useTheme();
    const navigation = useNavigation<NavigationProp>();

    const handleJoin = onJoin || (() => {
        navigation.navigate('AppointmentDetails', {
            status: 'upcoming',
            date: dateTime,
            time: duration ? `${dateTime} • ${duration}` : dateTime,
        });
    });

    return (
        <View style={styles.container}>
            {/* Label */}
            <AppText variant="caption" weight="semiBold" style={styles.sectionLabel}>
                Next Session
            </AppText>
            <AppText variant="h4" weight="extraBold" style={styles.sessionType}>
                Video Therapy Session
            </AppText>

            {/* Detail Card */}
            <View style={[styles.detailCard, { borderRadius: normalize(10) }]}>
                {/* Date & Time */}
                <View style={styles.detailRow}>
                    <View style={styles.detailLeft}>
                        <View style={styles.detailIconRow}>
                            <Calendar size={normalize(15)} color={colors.blue[700]} />

                            <AppText variant="caption" weight="semiBold" style={styles.detailLabel}>
                                Date & Time
                            </AppText>
                        </View>
                        <AppText variant="body" weight="bold" style={styles.detailValue}>
                            {dateTime}
                        </AppText>
                    </View>
                </View>


                {/* Duration + Join */}
                <View style={styles.durationJoinRow}>
                    <View>
                        <View style={styles.detailIconRow}>
                            <Image
                                source={require('../assets/sessions-left.png')}
                                style={[{ width: normalize(10), height: normalize(13), marginRight: normalize(3), marginLeft: normalize(0) }]}
                            />
                            <AppText variant="caption" weight="semiBold" style={styles.detailLabel}>
                                Duration
                            </AppText>
                        </View>
                        <AppText variant="body" weight="bold" style={styles.detailValue}>
                            {duration}
                        </AppText>
                    </View>

                    <TouchableOpacity activeOpacity={0.85} onPress={handleJoin}>
                        <GradientButton
                            borderRadius={borderRadius.full}
                            style={styles.joinBtn}
                        >
                            <AppText variant="body" weight="bold" style={styles.joinText}>
                                Join
                            </AppText>
                        </GradientButton>
                    </TouchableOpacity>
                </View>

                {/* Questions Note */}
                <AppText variant="caption" family='secondary' weight="medium" style={styles.questionsNote}>
                    Questions Visible 30Min Before therapy
                </AppText>

                {/* Reschedule Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.rescheduleBtn, { borderRadius: normalize(99) }]}
                    onPress={onReschedule}
                >
                    <AppText variant="body" family='secondary' weight="semiBold" style={styles.rescheduleText}>
                        Reschedule Session
                    </AppText>
                </TouchableOpacity>
            </View>

            {/* Reschedule In Progress Card */}
            {rescheduleInProgress && (
                <View style={[styles.progressCard, { borderRadius: normalize(10) }]}>
                    <View style={styles.progressHeader}>
                        <View style={styles.rescheduleIconBox}>
                            <Calendar size={normalize(19)} color={colors.blue[800]} />
                        </View>
                        <View style={styles.progressTextBlock}>
                            <AppText variant="body" family='secondary' weight="extraBold" style={styles.progressTitle}>
                                Reschedule in Progress
                            </AppText>
                            <AppText variant="caption" weight="regular" style={styles.progressSubtitle}>
                                We've sent your new preferred time to your therapist
                            </AppText>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarWrapper}>
                        <View style={styles.progressBarTrack}>
                            <LinearGradient
                                colors={[colors.blue[700], colors.blue[600]]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressBarFill, { width: `${rescheduleProgress}%` }]}
                            />
                        </View>
                        <AppText variant="caption" weight="bold" style={styles.progressPercent}>
                            {rescheduleProgress}%
                        </AppText>
                    </View>

                    {/* Footer note */}
                    <View style={[styles.progressFooter, { borderRadius: borderRadius.m }]}>
                        <RefreshCcw size={normalize(20)} color={colors.typographyColor.Dark} style={{ marginRight: normalize(5), marginLeft: normalize(5) }} />
                        <AppText variant="caption" weight="medium" style={styles.progressFooterText}>
                            If not approved, we'll continue and suggest other times
                        </AppText>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(25),
    },
    sectionLabel: {
        color: "#3B82F6",
        fontSize: normalize(12),
        marginBottom: normalize(2),
    },
    sessionType: {
        color: colors.typographyColor.Black,
        fontSize: normalize(18),
        marginBottom: normalize(20),
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        paddingVertical: normalize(25),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(12),
    },
    detailRow: {
        marginBottom: normalize(12),
    },
    detailIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(5),
        marginBottom: normalize(4),
    },
    detailLabel: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(11),
    },
    detailLeft: {
        flex: 1,
    },
    detailValue: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(12),
    },
    divider: {
        height: 1,
        backgroundColor: colors.tintsBlue[400],
        marginBottom: normalize(12),
    },
    durationJoinRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    joinBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        paddingLeft: normalize(22),
        paddingVertical: normalize(10),
        minHeight: normalize(40),
    },
    joinText: {
        color: '#FFFFFF',
        fontSize: normalize(14),
    },
    questionsNote: {
        color: colors.colorPalet['Color 5'],
        fontSize: normalize(10),
        marginTop: normalize(12),
    },
    rescheduleBtn: {
        borderWidth: 1,
        borderColor: colors.tintsGrey[200],
        paddingVertical: normalize(11),
        marginTop: normalize(15),
        alignItems: 'center',
        backgroundColor: colors.appThemeColor[50],
    },
    rescheduleText: {
        color: colors.typographyColor['Color 2'],
        fontSize: normalize(13),
    },

    // Progress Card
    progressCard: {
        backgroundColor: '#FFFFFF',
        paddingVertical: normalize(25),
        paddingHorizontal: normalize(20),
        marginTop: normalize(25)
    },
    rescheduleIconBox: {
        backgroundColor: colors.appThemeColor[75],
        borderRadius: 99,
        padding: normalize(5)
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: normalize(12),
        marginBottom: normalize(14),
    },
    progressTextBlock: {
        flex: 1,
    },
    progressTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(14),
    },
    progressSubtitle: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    progressBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
        marginBottom: normalize(12),
    },
    progressBarTrack: {
        flex: 1,
        height: normalize(10),
        backgroundColor: colors.appThemeColor[75],
        borderRadius: normalize(99),
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: colors.typographyColor.Dark
    },
    progressBarFill: {
        height: '100%',
        borderRadius: normalize(99),
    },
    progressPercent: {
        color: '#000000',
        fontSize: normalize(12),
        backgroundColor: colors.appThemeColor[75],
        borderRadius: normalize(99),
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(0)
    },
    progressFooter: {
        backgroundColor: colors.appThemeColor[50],
        padding: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
    },
    progressFooterText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(10),
        flex: 1,
        lineHeight: normalize(15),
    },
});
