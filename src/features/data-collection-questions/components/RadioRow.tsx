import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Check, LucideIcon } from 'lucide-react-native';

interface PreferenceRadioRowProps {
    label: string;
    Icon?: LucideIcon;
    selected: boolean;
    onPress: () => void;
}

export const RadioRow: React.FC<PreferenceRadioRowProps> = ({ label, Icon, selected, onPress }) => (
    <TouchableOpacity
        style={[styles.row, selected && styles.rowSelected]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.leftContainer}>
            {Icon && (
                <View style={styles.iconContainer}>
                    <Icon size={normalize(20)} color={selected ? colors.blue[600] : colors.tintsGrey[600]} strokeWidth={2.2} />
                </View>
            )}
            <AppText
                variant="body"
                weight={selected ? 'medium' : 'medium'}
                family='secondary'
                style={[styles.label]}
            >
                {label}
            </AppText>
        </View>
        {/* <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View> */}
        {selected && (
            <View style={styles.checkBadge}>
                <Check size={normalize(14)} color="#FFFFFF" strokeWidth={3} />
            </View>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: colors.tintsGrey[100],
        borderRadius: normalize(12),
        paddingVertical: normalize(13),
        paddingHorizontal: normalize(16),
        backgroundColor: '#FFFFFF',
        marginBottom: normalize(16),
    },
    rowSelected: {
        borderColor: colors.lightTints.blueLightTint[100],
        backgroundColor: colors.lightTints.blueLightTint[50],
        // boxShadow: '0px 0px 0px 2px #0040A1'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
    },

    radio: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        borderWidth: 2,
        borderColor: colors.appThemeColor[300],
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: colors.lightAppTheme[700],
    },
    radioDot: {
        width: normalize(10),
        height: normalize(10),
        borderRadius: normalize(5),
        backgroundColor: colors.lightAppTheme[700],
    },
    checkBadge: {
        // position: 'absolute',
        // top: normalize(8),
        // right: normalize(8),
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(99),
        backgroundColor: colors.blue[600],
        alignItems: 'center',
        justifyContent: 'center',
    },
});
