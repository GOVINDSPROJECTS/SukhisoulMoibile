import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

// ─── Section Components ───────────────────────────────────────────────────────
import { TherapistCard } from '../components/TherapistCard';
import { SessionSummary } from '../components/SessionSummary';
import { NextSessionCard } from '../components/NextSessionCard';
import { TherapyProgress } from '../components/TherapyProgress';
import { DashboardTabs, DashboardTab } from '../components/DashboardTabs';
import { OverviewTab } from '../components/OverviewTab';
import { TaskTab } from '../components/TaskTab';
import { JournalTab } from '../components/JournalTab';
import { HistoryTab } from '../components/HistoryTab';
import { PaymentTab } from '../components/PaymentTab';

// ─── Tab Content Renderer ─────────────────────────────────────────────────────

const TabContent: React.FC<{ activeTab: DashboardTab }> = ({ activeTab }) => {
    switch (activeTab) {
        case 'Overview': return <OverviewTab />;
        case 'Task': return <TaskTab />;
        case 'Journal': return <JournalTab />;
        case 'History': return <HistoryTab />;
        case 'Payment': return <PaymentTab />;
        default: return <OverviewTab />;
    }
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export const TherapistDashboard: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<DashboardTab>('Overview');

    const { data: dashboardData, isLoading, refetch } = useTherapistDashboard();

    const handleTabChange = useCallback((tab: DashboardTab) => {
        setActiveTab(tab);
    }, []);

    const handleReschedule = useCallback(() => {
        navigation.navigate('RescheduleSession', {
            bookingId: dashboardData?.nextSession?.id ?? undefined,
            bookingUuid: dashboardData?.nextSession?.uuid ?? undefined,
        });
    }, [navigation, dashboardData?.nextSession]);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.appThemeColor[75] }]}
            edges={['bottom', 'left', 'right']}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

            {/* Top Safe Area Color */}
            <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

            {/* Header */}
            <LinearGradient
                colors={[
                    colors.lightTints.blueLightTint[50],
                    colors.lightTints.blueLightTint[100],
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => [
                        styles.backBtn,
                        pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50] },
                    ]}
                >
                    <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
                </Pressable>
                <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
                    My Therapist
                </AppText>
                <View style={styles.headerSpacer} />
            </LinearGradient>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                        colors={[colors.blue[600]]}
                        tintColor={colors.blue[600]}
                    />
                }
            >
                {/* Top gradient wrapper for first section */}
                <LinearGradient
                    colors={[
                        colors.tintsBlue[400],
                        colors.appThemeColor[75],
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.topGradientSection}
                >
                    {/* Therapist Profile Card */}
                    <TherapistCard
                        name={dashboardData?.therapist?.name}
                        designation={dashboardData?.therapist?.designation}
                        experience={dashboardData?.therapist?.experience}
                        imageUrl={dashboardData?.therapist?.imageUrl}
                    />
                </LinearGradient>

                {/* Session Summary */}
                <SessionSummary
                    sessionsDone={dashboardData?.summary?.sessionsDone}
                    sessionsLeft={dashboardData?.summary?.sessionsLeft}
                    nextSessionDate={dashboardData?.summary?.nextSessionDate}
                />

                {/* Next Session */}
                <NextSessionCard
                    dateTime={dashboardData?.nextSession?.dateTime}
                    duration={dashboardData?.nextSession?.duration}
                    rescheduleInProgress={dashboardData?.nextSession?.rescheduleInProgress}
                    rescheduleProgress={dashboardData?.nextSession?.rescheduleProgress}
                    onReschedule={handleReschedule}
                />

                {/* Therapy Progress (below gradient) */}
                <TherapyProgress
                    planName={dashboardData?.progress?.planName}
                    progressLabel={dashboardData?.progress?.progressLabel}
                    progress={dashboardData?.progress?.progress}
                />

                {/* Tab Bar */}
                <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Tab Content */}
                <TabContent activeTab={activeTab} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    headerSpacer: {
        width: normalize(36),
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        // paddingBottom: normalize(40),
    },
    topGradientSection: {
        paddingBottom: normalize(5),
    },
});
