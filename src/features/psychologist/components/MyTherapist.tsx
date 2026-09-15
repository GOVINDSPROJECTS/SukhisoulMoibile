import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image, Text } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ArrowRight, Calendar, CalendarPlus, Check, CheckCheckIcon, CheckIcon, ChevronRight, Link, Verified, Video, } from 'lucide-react-native';
import { GradientButton } from '@/components/atoms/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';
import { CommonSessionCard } from './session/CommonSessionCard';
import { useTherapistDashboard } from '@/features/therapist-dashboard/hooks/useTherapistDashboard';
import { resolveImageUrl } from '@api/professionals';
import { useQbsStore } from '@/features/questions-before-session/store/useQbsStore';
import { api } from '@api/client';

export const MyTherapist: React.FC = () => {
    const { borderRadius } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const { data: dashboardData, refetch } = useTherapistDashboard();
    const resetQuiz = useQbsStore(s => s.resetQuiz);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const therapist = dashboardData?.therapist;
    const summary = dashboardData?.summary;
    const nextSession = dashboardData?.nextSession;

    const handleReschedule = useCallback(() => {
        navigation.navigate('RescheduleSession');
    }, [navigation]);

    const handleQuiz = useCallback(() => {
        if (!nextSession?.is_qbs_completed) {
            resetQuiz();
        }
        navigation.navigate('QbsFeeling');
    }, [navigation, nextSession, resetQuiz]);

    const handleApprove = useCallback(() => {
        navigation.navigate('AppointmentDetails', {
            status: 'upcoming',
            date: nextSession?.dateTime ?? 'Upcoming Session',
            time: nextSession?.duration ? `${nextSession.dateTime} • ${nextSession.duration}` : (nextSession?.dateTime ?? 'Scheduled Time'),
        });
    }, [navigation, nextSession]);

    const handleChooseTime = useCallback(() => {
        navigation.navigate('RescheduleSession');
    }, [navigation]);

    const handleJoinCall = useCallback(async () => {
        const sessionUuid = (nextSession as any)?.session_uuid;
        const directRoomUrl = (nextSession as any)?.room_url || (nextSession as any)?.daily_room_url;

        if (sessionUuid) {
            try {
                const res = await api.post(`/v1/sessions/${sessionUuid}/join`);
                const joinUrl = res.data?.data?.join_url || res.data?.data?.room_url || directRoomUrl;
                if (joinUrl) {
                    navigation.navigate('VideoCall', {
                        roomUrl: joinUrl,
                        therapistName: therapist?.name ?? 'Your Therapist',
                        sessionUuid,
                    });
                    return;
                }
            } catch (err) {
                console.warn('Could not call join API, falling back to direct room URL', err);
            }
        }

        if (directRoomUrl) {
            navigation.navigate('VideoCall', {
                roomUrl: directRoomUrl,
                therapistName: therapist?.name ?? 'Your Therapist',
                sessionUuid,
            });
            return;
        }

        navigation.navigate('AppointmentDetails', {
            status: 'upcoming',
            date: nextSession?.dateTime ?? 'Upcoming Session',
            time: nextSession?.duration ? `${nextSession?.dateTime ?? 'Scheduled'} • ${nextSession?.duration}` : 'Scheduled Session',
        });
    }, [nextSession, therapist?.name, navigation]);

    return (
        <>

            <View style={styles.parent}>
                <Image source={require('../assets/mascot-bg.png')} style={styles.bgMascot} />

                <LinearGradient
                    colors={[colors.lightTints.blueLightTint[100], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[200], colors.tintsBlue[400]]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.quizCard,
                        {
                            borderRadius: borderRadius.xl,
                            overflow: 'hidden',
                            width: '100%',
                        },
                    ]}
                >
                    <View style={styles.chatCard}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate('PsychologistProfile', {
                                doctorName: therapist?.name ?? 'Dr. Sameer Joshi',
                                doctorId: String(therapist?.id ?? 1),
                                designation: therapist?.designation ?? 'Clinical Psychologist',
                                avatarUrl: resolveImageUrl(therapist?.imageUrl),
                                experience: therapist?.experience,
                            })}
                            style={styles.chatAvatarWrapper}
                        >
                            <Image
                                source={{ uri: resolveImageUrl(therapist?.imageUrl) || 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400' }}
                                style={styles.chatAvatar}
                            />
                            <View style={styles.activeDotBadge}>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.chatInfoWrapper}>
                            <AppText variant="caption" weight="extraBold" style={styles.quizTag}>
                                MY THERAPIST
                            </AppText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <AppText variant="h3" weight="extraBold" style={styles.chatName}>
                                    {therapist?.name ?? 'Dr. Sameer Joshi'}
                                </AppText>
                                <Verified fill={'#0066CC'} stroke={colors.appThemeColor[50]} style={{ marginTop: 5 }} />
                            </View>
                            <AppText variant="caption" weight="regular" style={styles.chatSnippet} numberOfLines={1}>
                                {therapist?.designation ?? 'Clinical Psychologist'}
                            </AppText>
                            <AppText variant="caption" weight="regular" style={styles.chatSnippet} numberOfLines={1}>
                                {therapist?.experience ?? '8+ Years Experience'}
                            </AppText>
                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 15, width: '100%' }}>

                        {/* Session status card */}
                        <CommonSessionCard
                            status={(nextSession?.status ?? (nextSession?.rescheduleInProgress ? 'rescheduling_request' : 'confirmed')) as any}
                            dateTime={nextSession?.dateTime}
                            duration={nextSession?.duration}
                            originalTime={nextSession?.dateTime}
                            requestedNewTime={nextSession?.dateTime}
                            isCompleted={nextSession?.is_qbs_completed}
                            onApproveTime={handleApprove}
                            onChooseAnotherTime={handleChooseTime}
                            onReschedule={handleReschedule}
                            onStartQuiz={handleQuiz}
                            onJoin={handleJoinCall}
                        />

                        {/* Three Mini Cards */}
                        <View style={styles.miniCardsRow}>
                            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                    <Check size={17} color={colors.green[700]} style={{ width: 12, height: 15, marginRight: 5, marginLeft: -20 }} strokeWidth={3} />
                                    <AppText weight="extraBold" family="primary" style={styles.miniCardTitle}>
                                        {summary?.sessionsDone ?? 0}
                                    </AppText>
                                </View>
                                <AppText variant="caption" style={styles.miniCardSub}>SESSIONS DONE</AppText>
                            </View>
                            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                    <Image source={require('../assets/sessions-left.png')} style={{ width: 12, height: 15, marginRight: 5, marginLeft: -15 }} />
                                    <AppText weight="extraBold" family="primary" style={styles.miniCardTitle}>
                                        {summary?.sessionsLeft ?? (nextSession ? 1 : 0)}
                                    </AppText>
                                </View>
                                <AppText variant="caption" style={styles.miniCardSub}>SESSIONS LEFT</AppText>
                            </View>
                            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                    <Calendar size={17} color={colors.blue[700]} />
                                    <AppText weight="extraBold" family="primary" style={styles.miniCardTitle}>
                                        {summary?.nextSessionDate ?? (nextSession?.dateFormatted ?? '—')}
                                    </AppText>
                                </View>
                                <AppText variant="caption" style={styles.miniCardSub}>NEXT SESSION</AppText>
                            </View>
                        </View>

                        {/* Take Quiz button */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={{ borderRadius: 99 }}
                        >
                            <GradientButton
                                borderRadius={99}
                                onPress={() => navigation.navigate('TherapistDashboard')}
                                style={[
                                    styles.exploreBestBtn,
                                    {
                                        borderRadius: 99,
                                        overflow: 'hidden',
                                    },
                                ]}
                            >
                                <CalendarPlus
                                    size={16}
                                    color="#fff"
                                    style={{ marginRight: normalize(6) }}
                                />
                                <AppText
                                    variant="body"
                                    weight="bold"
                                    style={[styles.exploreBestText, { marginRight: normalize(30) }]}
                                >
                                    Open Dashboard
                                </AppText>
                                <View style={{ marginRight: normalize(-6), backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: borderRadius.full, padding: normalize(6), }}>
                                    <ArrowRight
                                        size={20}
                                        color="#fff"
                                    />
                                </View>

                            </GradientButton>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

            </View >
        </>
    );
};

const styles = StyleSheet.create({
    chatAvatarWrapper: {
        width: normalize(96),
        height: normalize(96),
        position: 'relative',
        marginRight: normalize(12),
    },
    chatAvatar: {
        width: normalize(96),
        height: normalize(96),
        borderRadius: normalize(32),
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: normalize(16),
        marginTop: normalize(10),
    },
    flexRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'
    },
    btnToJoin: {
        backgroundColor: colors.tintsBlue[400],
        borderRadius: 11,
        color: colors.blue[500],
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        minHeight: 35,

    },

    chatInfoWrapper: {
        flex: 1,
    },
    chatName: {
        color: '#2D3432',
    },
    chatSnippet: {
        fontSize: normalize(11),
        color: '#59615F',
        marginTop: normalize(2),
    },
    chatTime: {
        fontSize: normalize(10),
        color: '#59615F',
        alignSelf: 'flex-start',
        marginTop: normalize(2),
    },


    parent: {
        position: 'relative',
        paddingHorizontal: normalize(20),
        width: '100%',
    },
    bgMascot: {
        position: 'absolute',
        right: -20,
        top: -20,
        width: 180,
        height: 180,
        zIndex: -1
    },
    myTherapistContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    activeDotBadge: {
        position: 'absolute',
        bottom: 0,
        right: -2,
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(9),
        backgroundColor: colors.green[500],
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },

    quizCard: {
        marginHorizontal: normalize(0),
        paddingVertical: normalize(25),
        paddingHorizontal: normalize(0),
        position: 'relative',
        marginTop: normalize(24),
        width: '100%',
    },
    quizTag: {
        color: colors.blue[600],
        fontSize: normalize(10),
        letterSpacing: 0.8,
        marginBottom: normalize(4),
        backgroundColor: colors.lightTints.blueLightTint[100],
        display: 'flex',
        width: normalize(120),
        padding: normalize(3),
        borderRadius: normalize(99),
        textAlign: 'center'
    },
    quizTitle: {
        fontSize: normalize(20),
        color: '#2D3432',
        marginBottom: normalize(8),
    },
    quizDesc: {
        fontSize: normalize(14),
        lineHeight: normalize(24),
        color: '#59615F',
        marginBottom: normalize(16),
    },
    takeQuizBtn: {
        marginTop: 15
    },
    takeQuizBtnText: {
        color: '#FFFFFF',
        fontSize: normalize(13),
    },
    miniCardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalize(20),
    },
    miniCard: {
        width: '31%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingVertical: normalize(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    miniCardTitle: {
        fontSize: normalize(14),
        color: colors.blue[800],
    },
    miniCardSub: {
        fontSize: normalize(8.6),
        color: '#59615F',
        marginTop: normalize(2),
        letterSpacing: 0.5,
    },
    exploreBestBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        // borderColor: '#BFE0FF',
        marginHorizontal: normalize(0),
        marginTop: normalize(18),
        paddingTop: normalize(6),
        paddingBottom: normalize(6),
        minHeight: normalize(60),
    },
    exploreBestText: {
        color: '#ffffff',
        fontSize: normalize(13),
    },


});
