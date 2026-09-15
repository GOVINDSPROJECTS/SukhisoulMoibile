import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';

export const BottomRecommendedCard: React.FC = () => {
    const { borderRadius } = useTheme();

    return (
        <>
            <View style={[styles.programCard, { borderRadius: borderRadius.xl }]}>
                <View style={styles.programHeaderRow}>
                    <View style={styles.programColumns}>
                        <AppText variant="caption" weight="medium" style={styles.programTag}>
                            RECOMMENDED FOR YOU
                        </AppText>
                        <AppText variant="h2" weight="bold" style={styles.programTitle}>
                            Sleep Anxiety{'\n'}Recovery Program
                        </AppText>
                    </View>
                    <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
                        <Image source={require('../assets/share-btn.png')} style={styles.shareBtnImg} />
                    </TouchableOpacity>
                </View>


                <AppText variant="caption" style={styles.programDesc}>
                    Personalized therapist sessions, calming tasks and guided emotional support.
                </AppText>

                <View style={styles.programButtonsRow}>
                    <TouchableOpacity style={[styles.explorePlanBtn, { borderRadius: 6 }]} activeOpacity={0.8}>
                        <AppText variant="caption" weight="bold" style={styles.explorePlanText}>
                            Explore Plan
                        </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bookExpertBtn, { borderRadius: 6 }]} activeOpacity={0.8}>
                        <AppText variant="caption" weight="bold" style={styles.bookExpertText}>
                            Book Expert
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

    programCard: {
        backgroundColor: '#E6F0FA',
        marginHorizontal: normalize(20),
        marginTop: normalize(24),
        padding: normalize(20),
        shadowColor: '#162731',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    programColumns: {
        flexDirection: 'column',
    },
    programHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(8),
    },
    programTag: {
        color: '#375EA4',
        fontSize: normalize(9),
        letterSpacing: 0.8,
    },
    shareBtn: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(99),
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareBtnImg: { width: '100%', height: '100%' },
    programTitle: {
        fontSize: normalize(20),
        color: '#00306E',
        marginTop: normalize(6),
        marginBottom: normalize(7),
        lineHeight: normalize(28),
    },
    programDesc: {
        fontSize: normalize(14),
        lineHeight: normalize(20),
        color: colors.typographyColor.Light,
        marginBottom: normalize(7),
    },
    programButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalize(15),
        marginBottom: normalize(0),
    },
    explorePlanBtn: {
        backgroundColor: colors.lightAppTheme[950],
        paddingVertical: normalize(10),
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    explorePlanText: {
        color: '#FFFFFF',
        fontSize: normalize(12),
    },
    bookExpertBtn: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#d7e0e98e',
        paddingVertical: normalize(10),
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookExpertText: {
        color: '#000000',
        fontSize: normalize(12),
    },

});
