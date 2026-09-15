import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { TherapistContactCard } from '../components/TherapistContactCard';

// ─── Static Data ──────────────────────────────────────────────────────────────

const SESSION_NOTES = [
    'Client showed high receptivity to breathwork.',
    'Still struggling with verbalizing needs during conflicts.',
    'Client showed significant improvement in managing anxiety triggers.',
    'Continue grounding techniques.',
    'Review sleep hygiene next session.',
];

const TAGS = ['#drinkmorewater', '#meditate', '#meditate', '#meditate'];

// ─── Screen ──────────────────────────────────────────────────────────────────

export const SessionOverview: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: '#FFFFFF' }]}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
            <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

            {/* Header */}
            <LinearGradient
                colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
                </TouchableOpacity>
                <AppText variant="h4" weight="bold" style={styles.headerTitle}>
                    Session Overview
                </AppText>
                <View style={styles.headerSpacer} />
            </LinearGradient>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Recent Session Banner */}
                    <View style={styles.sessionBanner}>
                        <View style={styles.sessionNumBox}>
                            <AppText variant="h3" family="secondary" weight="extraBold" style={styles.sessionNum}>
                                04
                            </AppText>
                        </View>
                        <View style={styles.sessionBannerText}>
                            <AppText variant="caption" family="secondary" weight="extraBold" style={styles.sessionTitleText}>
                                RECENT SESSION
                            </AppText>
                            <AppText variant="body" family="secondary" weight="extraBold" style={styles.sessionTitleText}>
                                #04: SOMATIC TECHNIQUES
                            </AppText>
                            <View style={styles.sessionMetaRow}>
                                <AppText variant="caption" family="secondary" weight="light" style={styles.sessionMeta}>
                                    Completed on May 18, 2024 • 50 mins
                                </AppText>
                            </View>
                        </View>
                    </View>

                    {/* Session Overview Section */}
                    <View style={styles.section}>
                        <AppText variant="body" family="secondary" weight="extraBold" style={styles.overviewHeading}>
                            SESSION OVERVIEW
                        </AppText>
                        <View style={styles.notesList}>
                            {SESSION_NOTES.map((note, idx) => (
                                <View key={idx} style={styles.noteRow}>
                                    <AppText style={styles.noteBullet}>•</AppText>
                                    <AppText variant="caption" family="secondary" weight="regular" style={styles.noteText}>
                                        {note}
                                    </AppText>
                                </View>
                            ))}
                        </View>

                        {/* Tags */}
                        <View style={styles.tagsBlock}>
                            {TAGS.map((tag, idx) => (
                                <AppText key={idx} variant="caption" family="secondary" weight="regular" style={styles.tag}>
                                    {tag}
                                </AppText>
                            ))}
                        </View>
                    </View>

                    {/* Spacer */}
                    <View style={{ height: normalize(16) }} />
                    {/* Therapist contact card — sticks at bottom */}
                    <TherapistContactCard />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(14),
    },
    backBtn: {
        width: normalize(36),
        height: normalize(36),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: normalize(17),
        color: colors.typographyColor['Color 2'],
    },
    headerSpacer: { width: normalize(36) },

    scroll: { flex: 1 },
    scrollContent: {
        paddingTop: normalize(20),
        paddingBottom: normalize(10),
    },

    // Session Banner
    sessionBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(14),
        backgroundColor: colors.appThemeColor[50],
        marginHorizontal: normalize(20),
        borderRadius: normalize(20),
        padding: normalize(24),
        marginBottom: normalize(22),
        borderWidth: 1,
        borderColor: colors.appThemeColor[50],
    },
    sessionNumBox: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: normalize(16),
        backgroundColor: colors.typographyColor['Color 2'],
        justifyContent: 'center',
        alignItems: 'center',
    },
    sessionNum: {
        color: '#FFFFFF',
        fontSize: normalize(17),
    },
    sessionBannerText: {
        flex: 1,
    },
    recentLabel: {
        color: colors.typographyColor.Light,
        fontSize: normalize(9),
        letterSpacing: 0.5,
    },
    sessionTitleText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
        marginTop: normalize(2),
    },
    sessionMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
        marginTop: normalize(4),
    },
    sessionMeta: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11),
    },

    // Overview section
    section: {
        paddingHorizontal: normalize(20),
    },
    overviewHeading: {
        color: colors.typographyColor['Color 2'],
        fontSize: normalize(13),
        letterSpacing: 0.4,
        marginBottom: normalize(12),
    },
    notesList: {
        gap: normalize(6),
        marginBottom: normalize(14),
    },
    noteRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: normalize(6),
    },
    noteBullet: {
        color: colors.typographyColor.Light,
        fontSize: normalize(13),
        lineHeight: normalize(20),
    },
    noteText: {
        flex: 1,
        color: colors.typographyColor.Light,
        fontSize: normalize(13),
        lineHeight: normalize(20),
    },
    tagsBlock: {
        marginTop: normalize(4),
        gap: normalize(2),
    },
    tag: {
        color: colors.typographyColor.Light,
        fontSize: normalize(13),
        lineHeight: normalize(20),
    },
});
