import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Share,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Upload, Settings, ShareIcon } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import LinearGradient from 'react-native-linear-gradient';

import { ProfileHeader } from '../components/ProfileHeader';
import { StatsCard } from '../components/StatsCard';
import { MyTherapistCard } from '../components/MyTherapistCard';
import { PersonalInfoSection } from '../components/PersonalInfoSection';
import type { PersonalInfoData } from '../components/PersonalInfoView';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { useTherapistDashboard } from '../../therapist-dashboard/hooks/useTherapistDashboard';
import { fetchUserProfile, updateUserProfile, fetchUserRewards, uploadUserAvatar } from '../../../api/userProfile';

// ─── Initial Fallback Data ───────────────────────────────────────────────────

const INITIAL_PROFILE = {
    fullName: 'Prathmesh Deokar',
    sukhiSoulId: 'SSU78456',
    designation: 'Software Engineer',
    tags: ['Anxiety', 'Meditation', 'Therapy', 'Journaling', 'Self-care'],
};

const INITIAL_PERSONAL_INFO: PersonalInfoData = {
    fullName: 'Prathmesh Deokar',
    sukhiSoulId: 'SSU78456',
    email: 'prathmeshdeokar@gmail.com',
    phone: '+91 98765 43210',
    emergencyContact: '+91 98765 43210',
    gender: 'Male',
    dateOfBirth: '03 July 1996',
    relationship: 'Single',
    location: 'Mumbai, Maharashtra',
    preferredLanguage: 'English, Hindi',
    education: 'Bachelor of Engineering',
    career: 'Software Engineer',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatBackendDob = (rawDate?: string | null): string => {
    if (!rawDate) return '';
    try {
        const parts = rawDate.split('T')[0].split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${String(day).padStart(2, '0')} ${months[month]} ${year}`;
        }
        const parsed = new Date(rawDate);
        if (!isNaN(parsed.getTime())) {
            const day = String(parsed.getDate()).padStart(2, '0');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${day} ${months[parsed.getMonth()]} ${parsed.getFullYear()}`;
        }
    } catch {
        // ignore
    }
    return rawDate;
};

const formatGender = (rawGender?: string | null): string => {
    if (!rawGender) return '';
    const map: Record<string, string> = {
        'male': 'Male',
        'female': 'Female',
        'non-binary': 'Non-binary',
        'prefer not to say': 'Prefer not to say',
    };
    const lower = rawGender.toLowerCase().trim();
    if (map[lower]) return map[lower];
    return rawGender.charAt(0).toUpperCase() + rawGender.slice(1);
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export const MyProfileScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const user = useAuthStore((state) => state.user);
    const { data: dashboardData } = useTherapistDashboard();

    const [isEditing, setIsEditing] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(user?.photoURL || null);
    const [calmPoints, setCalmPoints] = useState<number>(850);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>(() => ({
        ...INITIAL_PERSONAL_INFO,
        fullName: user?.displayName || INITIAL_PERSONAL_INFO.fullName,
        email: user?.email || INITIAL_PERSONAL_INFO.email,
        phone: user?.phoneNumber || INITIAL_PERSONAL_INFO.phone,
        sukhiSoulId: user?.uid ? `SSU${user.uid.slice(0, 5).toUpperCase()}` : INITIAL_PERSONAL_INFO.sukhiSoulId,
    }));

    // Fetch user profile and rewards on mount
    React.useEffect(() => {
        let isMounted = true;
        const loadBackendData = async () => {
            try {
                const [profileRes, rewardRes] = await Promise.allSettled([
                    fetchUserProfile(),
                    fetchUserRewards(),
                ]);

                if (isMounted && profileRes.status === 'fulfilled' && profileRes.value) {
                    const u = profileRes.value;
                    const avatar = u.avatar_url || u.avatar_path;
                    if (avatar) {
                        setProfilePic(avatar);
                    }
                    setPersonalInfo((prev) => ({
                        ...prev,
                        fullName: u.name || prev.fullName,
                        email: u.email || prev.email,
                        phone: u.phone_number || prev.phone,
                        emergencyContact: u.profile?.emergency_contact_phone || prev.emergencyContact,
                        gender: u.gender ? formatGender(u.gender) : prev.gender,
                        dateOfBirth: u.date_of_birth ? formatBackendDob(u.date_of_birth) : prev.dateOfBirth,
                        relationship: u.profile?.relationship || prev.relationship,
                        location: u.profile?.location || prev.location,
                        preferredLanguage: u.preference?.language || prev.preferredLanguage,
                        education: u.profile?.education || prev.education,
                        career: u.profile?.bio || prev.career,
                    }));
                }

                if (isMounted && rewardRes.status === 'fulfilled' && rewardRes.value?.account) {
                    setCalmPoints(rewardRes.value.account.balance ?? 850);
                }
            } catch (err) {
                console.log('[MyProfile] Error fetching profile/reward details:', err);
            }
        };

        loadBackendData();
        return () => {
            isMounted = false;
        };
    }, []);

    // ── Upload Avatar to Backend ───────────────────────────────────────────────
    const handleAvatarSelected = useCallback(async (uri: string) => {
        setProfilePic(uri);
        try {
            const result = await uploadUserAvatar(uri);
            console.log('[MyProfile] Uploaded avatar to backend:', result);
            if (result?.avatar_url) {
                setProfilePic(result.avatar_url);
            }
        } catch (err) {
            console.error('[MyProfile] Error uploading avatar:', err);
        }
    }, []);

    // ── Save Profile to Backend ────────────────────────────────────────────────
    const handleDataChange = useCallback(async (updated: PersonalInfoData) => {
        setPersonalInfo(updated);
        try {
            await updateUserProfile({
                name: updated.fullName,
                phone_number: updated.phone,
                date_of_birth: updated.dateOfBirth,
                gender: updated.gender?.toLowerCase(),
                education: updated.education,
                relationship: updated.relationship,
                location: updated.location,
                emergency_contact_phone: updated.emergencyContact,
                emergency_contact_name: updated.fullName,
                bio: updated.career,
                preferred_language: updated.preferredLanguage,
                language: updated.preferredLanguage,
            });
            console.log('[MyProfile] Saved updated profile to backend');
        } catch (error) {
            console.error('[MyProfile] Error saving profile to backend:', error);
        }
    }, []);

    // ── Therapist Details ──────────────────────────────────────────────────────
    const therapist = dashboardData?.therapist;
    const therapistName = therapist?.name || 'Dr. Sameer Joshi';
    const therapistDesignation = therapist?.designation || 'Clinical Psychologist';
    const therapistAvatar = therapist?.imageUrl || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400';

    const handleViewTherapist = useCallback(() => {
        navigation.navigate('PsychologistProfile', {
            doctorId: therapist?.uuid || String(therapist?.id || ''),
            doctorName: therapistName,
            designation: therapistDesignation,
            avatarUrl: therapistAvatar,
            experience: therapist?.experience || '8+ Years',
            rating: String(therapist?.rating || '4.9'),
        });
    }, [navigation, therapist, therapistName, therapistDesignation, therapistAvatar]);

    // ── Share Profile ──────────────────────────────────────────────────────────
    const handleShare = useCallback(async () => {
        try {
            const name = personalInfo.fullName || INITIAL_PROFILE.fullName;
            const designation = personalInfo.career || INITIAL_PROFILE.designation;
            const sukhiSoulId = personalInfo.sukhiSoulId || INITIAL_PROFILE.sukhiSoulId;
            const shareUrl = `https://sukhisoul.com/profile/${sukhiSoulId}`;

            const message = [
                `*${name}*`,
                `*${designation}*`,
                '',
                `Sukhi Soul ID: *${sukhiSoulId}*`,
                '',
                shareUrl,
            ].join('\n');

            await Share.share(
                Platform.OS === 'ios'
                    ? { title: name, message, url: shareUrl }
                    : { title: name, message },
            );
        } catch (error) {
            // User cancelled or error — ignore
        }
    }, [personalInfo]);

    // ── Navigate to Settings ───────────────────────────────────────────────────
    const handleSettings = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* ── Blue Curved Header Section ───────────────────────── */}
                    <LinearGradient
                        colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[styles.headerContainer, { paddingTop: insets.top + normalize(10) }]}
                    >

                        {/* Top Nav Bar */}
                        <View style={styles.navBar}>
                            <TouchableOpacity
                                style={styles.navIconBtn}
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.7}
                            >
                                <ArrowLeft size={normalize(22)} color="#FFFFFF" strokeWidth={2.2} />
                            </TouchableOpacity>

                            <AppText
                                weight="semiBold"
                                family="primary"
                                style={styles.navTitle}
                                color="#FFFFFF"
                            >
                                Edit Profile
                            </AppText>

                            <View style={styles.navActions}>
                                {/* Share */}
                                <TouchableOpacity
                                    style={styles.navIconBtn}
                                    onPress={handleShare}
                                    activeOpacity={0.7}
                                >
                                    <ShareIcon size={normalize(20)} color="#FFFFFF" strokeWidth={2.2} />
                                </TouchableOpacity>

                                {/* Settings */}
                                <TouchableOpacity
                                    style={styles.navIconBtn}
                                    onPress={handleSettings}
                                    activeOpacity={0.7}
                                >
                                    <Settings size={normalize(20)} color="#FFFFFF" strokeWidth={2.2} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Profile Header (Avatar picker, Name + edit toggle, SSU ID, Tags) */}
                        <ProfileHeader
                            name={personalInfo.fullName || INITIAL_PROFILE.fullName}
                            sukhiSoulId={personalInfo.sukhiSoulId || INITIAL_PROFILE.sukhiSoulId}
                            tags={INITIAL_PROFILE.tags}
                            avatarUri={profilePic}
                            onAvatarSelected={handleAvatarSelected}
                            isEditing={isEditing}
                            onEditNamePress={() => setIsEditing(true)}
                        />
                    </LinearGradient>

                    {/* ── White Content Body ───────────────────────────────── */}
                    <View style={styles.body}>
                        {/* Stats */}
                        <StatsCard
                            therapySessions={dashboardData?.summary?.sessionsDone ?? 0}
                            calmPoints={calmPoints}
                            daysStreak={23}
                            wellnessScore={78}
                        />

                        {/* My Therapist Card */}
                        <MyTherapistCard
                            therapistName={therapistName}
                            therapistDesignation={therapistDesignation}
                            avatarUri={therapistAvatar}
                            onViewPress={handleViewTherapist}
                        />

                        {/* Personal Info Section — View & Edit Toggled */}
                        <PersonalInfoSection
                            data={personalInfo}
                            onDataChange={handleDataChange}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />

                        <View style={{ height: normalize(40) }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blue[600] || '#1E88E5',
    },
    scroll: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },

    // Header container with curved bottom
    headerContainer: {
        backgroundColor: colors.blue[600] || '#1E88E5',
        borderBottomLeftRadius: normalize(32),
        borderBottomRightRadius: normalize(32),
        paddingBottom: normalize(4),
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(16),
        paddingBottom: normalize(8),
    },
    navTitle: {
        fontSize: normalize(13),
        flex: 1,
        textAlign: 'center',
    },
    navActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(2),
    },
    navIconBtn: {
        width: normalize(38),
        height: normalize(38),
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Body
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom: normalize(10),
    },
});
