import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Gift } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface GiftTitleSubTitleProps {
    title?: string;
    subtitle?: string;
}

export const GiftTitleSubTitle: React.FC<GiftTitleSubTitleProps> = ({
    title,
    subtitle,
}) => {
    return (
        <View>
            <AppText family="primary" weight="extraBold" style={styles.title}>
                {title}
            </AppText>
            <AppText family="secondary" style={styles.subtitle}>
                {subtitle}
            </AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(22),
        color: colors.typographyColor.Black,
        textAlign: 'center',
        marginBottom: normalize(6),
    },
    subtitle: {
        fontSize: normalize(13),
        color: colors.typographyColor.Light,
        textAlign: 'center',
        marginBottom: normalize(30),
    },
});
