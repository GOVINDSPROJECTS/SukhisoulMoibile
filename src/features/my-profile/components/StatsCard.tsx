import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BookOpen, Star, Flame, BarChart2, BarChart } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItemProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}

interface StatsCardProps {
    therapySessions: number;
    calmPoints: number;
    daysStreak: number;
    wellnessScore: number; // 0–100
}

// ─── StatItem ─────────────────────────────────────────────────────────────────

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
    <View style={styles.statItem}>
        <View style={styles.iconWrapper}>{icon}</View>
        <AppText
            weight="extraBold"
            family="primary"
            style={styles.statValue}
            color={colors.typographyColor.Black}
        >
            {value}
        </AppText>
        <AppText
            weight="medium"
            family="secondary"
            style={styles.statLabel}
            color={colors.tintsGrey[300]}
        >
            {label}
        </AppText>
    </View>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const StatsCard: React.FC<StatsCardProps> = ({
    therapySessions,
    calmPoints,
    daysStreak,
    wellnessScore,
}) => {
    const iconColor = colors.lightAppTheme[700] || '#2E7BFF';

    return (
        <View style={styles.card}>
            <StatItem
                icon={<BookOpen size={normalize(18)} color={iconColor} strokeWidth={1.8} />}
                value={therapySessions}
                label={`Therapy\nSessions`}
            />
            <StatItem
                icon={<Star size={normalize(18)} color={iconColor} fill={iconColor} strokeWidth={1.8} />}
                value={calmPoints}
                label={`Calm\nPoints`}
            />
            <StatItem
                icon={<Flame size={normalize(18)} color={iconColor} fill={iconColor} strokeWidth={1.8} />}
                value={daysStreak}
                label={`Days\nStreak`}
            />
            <StatItem
                icon={<BarChart size={normalize(18)} color={iconColor} strokeWidth={3} />}
                value={`${wellnessScore}%`}
                label={`Wellness\nScore`}
            />
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    card: {
        marginHorizontal: normalize(20),
        marginTop: normalize(-50),
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(12),
        boxShadow: '0px 20px 25px -5px #DBEAFE, 0px 8px 10px -6px #DBEAFE'
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: normalize(3),
    },
    iconWrapper: {
        marginBottom: normalize(2),
        height: normalize(40),
        width: normalize(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(20),
        backgroundColor: colors.tintsBlue[50],
    },
    statValue: {
        fontSize: normalize(15),
        lineHeight: normalize(22),
    },
    statLabel: {
        fontSize: normalize(10),
        textAlign: 'center',
        lineHeight: normalize(12),
    },
});
