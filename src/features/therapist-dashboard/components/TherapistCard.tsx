import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MessageSquare, CalendarPlus, RefreshCw, Verified, Video } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { GradientButton } from '@/components/atoms/GradientButton';
import { TherapistCardTopInfo } from './TherapistCardTopInfo';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

interface TherapistCardProps {
    onMessage?: () => void;
    onAddSession?: () => void;
    onChangeTherapist?: () => void;
    name?: string;
    designation?: string;
    experience?: string;
    imageUrl?: string;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({
    onMessage,
    onAddSession,
    // onChangeTherapist,
    name = 'Dr. Sameer Joshi',
    designation = 'Sleep Disorders • Anxiety Support',
    experience = '10+ Years Experience',
    imageUrl,
}) => {
    const { borderRadius } = useTheme();
    const navigation = useNavigation<NavigationProp>();
    const onChangeTherapist = () => {
        navigation.navigate('Psychologist');
    };

    const handleMessage = () => {
        if (onMessage) {
            onMessage();
        } else {
            navigation.navigate('Chat', {
                doctorName: name,
                avatarUrl: imageUrl,
                role: designation,
            });
        }
    };

    const handleAddSession = () => {
        if (onAddSession) {
            onAddSession();
        } else {
            navigation.navigate('BookTherapy', {
                doctorName: name,
                doctorId: '1',
                designation: designation,
                price: 500,
            });
        }
    };

    return (
        <LinearGradient
            colors={[
                colors.typographyColor.White,
                colors.typographyColor.White
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.card, { borderRadius: normalize(30) }]}
        >
            {/* Profile Row */}
            <TherapistCardTopInfo name={name} designation={designation} experience={experience} imageUrl={imageUrl} />


            {/* Action Buttons */}
            <View style={styles.actionRow}>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <GradientButton onPress={handleMessage} style={[styles.actionBtn]} borderRadius={borderRadius.full}>
                        <MessageSquare size={normalize(15)} color={colors.typographyColor.White} style={{ marginRight: normalize(8) }} />
                        <AppText variant="body" family='secondary' weight="semiBold" style={styles.messageBtnText}>
                            Message
                        </AppText>
                    </GradientButton>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.actionBtn, styles.addSessionBtnBg]}
                    onPress={handleAddSession}
                >
                    <Video size={normalize(16)} color={colors.lightAppTheme[950]} style={{ marginRight: normalize(3) }} />
                    <AppText variant="caption" family='secondary' weight="semiBold" style={styles.addSessionText}>
                        Add Session
                    </AppText>
                </TouchableOpacity>
            </View>

            {/* Change Therapist */}
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.changeRow}
                onPress={onChangeTherapist}
            >
                <RefreshCw size={normalize(13)} color={colors.colorPalet['Color 5']} />
                <AppText variant="caption" weight="semiBold" style={styles.changeText}>
                    Not the right fit? Change Psychologist
                </AppText>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: normalize(20),
        marginTop: normalize(16),
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(18),
        overflow: 'hidden',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(14),
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: normalize(14),
    },
    avatar: {
        width: normalize(86),
        height: normalize(86),
        borderRadius: normalize(28),
    },
    activeDot: {
        position: 'absolute',
        bottom: 2,
        right: -2,
        width: normalize(18),
        height: normalize(18),
        borderRadius: normalize(9),
        backgroundColor: colors.green[500],
        borderWidth: 2.5,
        borderColor: '#FFFFFF',
    },
    infoWrapper: {
        flex: 1,
    },
    tagWrapper: {
        backgroundColor: colors.lightTints.blueLightTint[100],
        borderRadius: normalize(99),
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(3),
        alignSelf: 'flex-start',
        marginBottom: normalize(5),
    },
    tagText: {
        color: colors.blue[600],
        fontSize: normalize(9),
        letterSpacing: 0.8,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
    },
    doctorName: {
        color: colors.appThemeColor[950],
        fontSize: normalize(15),
        flexShrink: 1,
    },
    verifiedIcon: {
        marginTop: normalize(2),
    },
    speciality: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(2),
    },
    experience: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(1),
    },
    actionRow: {
        flexDirection: 'row',
        gap: normalize(10),
        marginBottom: normalize(12),
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        flex: 1,
        justifyContent: 'center',
        borderRadius: normalize(99),
    },

    addSessionBtnBg: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: colors.lightAppTheme[950],
    },
    messageBtnText: {
        color: colors.typographyColor.White,
        fontSize: normalize(12),
    },
    addSessionText: {
        color: colors.lightAppTheme[950],
        fontSize: normalize(12),
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(5),
        marginTop: normalize(10),
        marginBottom: normalize(10)
    },
    changeText: {
        color: colors.colorPalet['Color 5'],
        fontSize: normalize(11),
    },
});
