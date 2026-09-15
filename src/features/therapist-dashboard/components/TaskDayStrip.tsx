import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { DayProgress } from '../screens/TaskHistory';

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskDayStripProps {
    days: DayProgress[];
}

// ─── Day Circle ───────────────────────────────────────────────────────────────

const DayCircle: React.FC<{ day: DayProgress }> = ({ day }) => {
    const isHighlighted = day.isHighlighted;
    const isWeekend = day.isWeekend;
    const isSunday = day.isSunday;

    const circleBg = isHighlighted
        ? '#FFFFFF'
        : isWeekend
            ? colors.yellow[100]
            : isSunday
                ? colors.lightTints.redLightTint2[50]
                : colors.lightTints.blueLightTint2[50];

    const borderColor = isHighlighted
        ? colors.typographyColor['Dark 2']
        : isWeekend
            ? colors.yellow[400]
            : isSunday
                ? colors.lightTints.redLightTint2[50]
                : colors.lightTints.blueLightTint2[50];

    const textColor = isHighlighted
        ? colors.blue[700]
        : isWeekend
            ? colors.yellow[700]
            : isSunday
                ? colors.colorPalet['Color 6']
                : colors.appThemeColor[950];

    const labelColor = isHighlighted
        ? colors.typographyColor['Dark 2']
        : colors.typographyColor.Medium;

    return (
        <View style={styles.dayColumn}>
            <View
                style={[
                    styles.circle,
                    {
                        backgroundColor: circleBg,
                        borderColor,
                        borderWidth: isHighlighted ? normalize(2) : normalize(1),
                    },
                ]}
            >
                <AppText
                    variant="caption"
                    family="secondary"
                    weight={isHighlighted ? 'bold' : 'semiBold'}
                    style={[styles.circleText, { color: textColor }]}
                >
                    {day.completed}/{day.total}
                </AppText>
            </View>
            <AppText
                variant="caption"
                family="secondary"
                weight={isHighlighted ? 'bold' : 'regular'}
                style={[styles.dayLabel, { color: labelColor }]}
            >
                {day.label}
            </AppText>
        </View>
    );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const TaskDayStrip: React.FC<TaskDayStripProps> = ({ days }) => {
    return (
        <View style={styles.container}>
            {days.map((day) => (
                <DayCircle key={day.day} day={day} />
            ))}
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: normalize(14),
    },
    dayColumn: {
        alignItems: 'center',
        gap: normalize(4),
    },
    circle: {
        width: normalize(38),
        height: normalize(38),
        borderRadius: normalize(99),
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontSize: normalize(10),
        lineHeight: normalize(13),
    },
    dayLabel: {
        fontSize: normalize(10),
    },
});
