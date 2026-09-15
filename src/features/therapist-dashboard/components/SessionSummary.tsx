import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

interface SessionSummaryProps {
    sessionsDone?: number;
    sessionsLeft?: number;
    nextSessionDate?: string;
    onCalendarPress?: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
    sessionsDone = 0,
    sessionsLeft = 0,
    nextSessionDate = '—',
    onCalendarPress,
}) => {
    const { borderRadius } = useTheme();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View>
                    <AppText variant="h4" weight="extraBold" style={styles.title}>
                        Session Summary
                    </AppText>
                    <AppText variant="caption" weight="regular" style={styles.subtitle}>
                        Done, remaining and missed sessions
                    </AppText>
                </View>
                <TouchableOpacity onPress={onCalendarPress} style={styles.calendarBtn}>
                    <Calendar size={normalize(20)} color={colors.blue[700]} />
                </TouchableOpacity>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                {/* Sessions Done */}
                <View style={[styles.statCard, { borderRadius: borderRadius.m }]}>
                    <View style={styles.statIconRow}>
                        <Check size={normalize(17)} color={colors.green[700]} strokeWidth={3} style={{ width: normalize(12), height: normalize(16), marginRight: normalize(5), marginLeft: normalize(-20) }} />
                        <AppText weight="extraBold" family="primary" style={styles.statNumber}>
                            {sessionsDone}
                        </AppText>
                    </View>
                    <AppText variant="caption" style={styles.statLabel}>SESSIONS DONE</AppText>
                </View>

                {/* Sessions Left */}
                <View style={[styles.statCard, { borderRadius: borderRadius.m }]}>
                    <View style={styles.statIconRow}>
                        <Image
                            source={require('../assets/sessions-left.png')}
                            style={[styles.sessionsLeftIcon, { width: normalize(12), height: normalize(16), marginRight: normalize(5), marginLeft: normalize(-15) }]}
                        />
                        <AppText weight="extraBold" family="primary" style={styles.statNumber}>
                            {sessionsLeft}
                        </AppText>
                    </View>
                    <AppText variant="caption" style={styles.statLabel}>SESSIONS LEFT</AppText>
                </View>

                {/* Next Session */}
                <View style={[styles.statCard, styles.nextSessionCard, { borderRadius: borderRadius.m }]}>
                    <View style={styles.statIconRow}>
                        <Calendar size={normalize(15)} color={colors.blue[700]} />
                        <AppText weight="extraBold" family="primary" style={[styles.statNumber, styles.nextSessionText]}>
                            {nextSessionDate}
                        </AppText>
                    </View>
                    <AppText variant="caption" style={[styles.statLabel, styles.nextSessionLabel]}>
                        NEXT SESSION
                    </AppText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(20),
        marginTop: normalize(25),
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(12),
    },
    title: {
        color: colors.appThemeColor[950],
    },
    subtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },
    calendarBtn: {
        padding: normalize(4),
    },
    statsRow: {
        flexDirection: 'row',
        gap: normalize(10),
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.tintsBlue[600],
    },
    nextSessionCard: {
        backgroundColor: colors.blue[100],
        borderColor: colors.blue[100],
    },
    statIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
    },
    sessionsLeftIcon: {
        width: normalize(11),
        height: normalize(14),
    },
    statNumber: {
        fontSize: normalize(15),
        color: "#2D3432",
    },
    nextSessionText: {
        color: colors.blue[700],
    },
    statLabel: {
        fontSize: normalize(8),
        color: "#59615F",
        marginTop: normalize(3),
        letterSpacing: 0.4,
        textAlign: 'center',
    },
    nextSessionLabel: {
        color: "#59615F",
    },
});
