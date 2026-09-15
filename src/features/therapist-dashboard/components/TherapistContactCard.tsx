import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { Phone, Mail, Send, SendHorizonal } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

// ─── Component ────────────────────────────────────────────────────────────────

export const TherapistContactCard: React.FC = () => {
    const [message, setMessage] = useState('');

    return (
        <View style={styles.card}>
            {/* Header row */}
            <View style={styles.headerRow}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400' }}
                    style={styles.avatar}
                />
                <View style={styles.headerText}>
                    <AppText variant="body" family="secondary" weight="bold" style={styles.title}>
                        Need help with your care plan?
                    </AppText>
                    <AppText variant="caption" family="secondary" weight="regular" style={styles.subtitle}>
                        Your therapist is here to help
                    </AppText>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
                    <View style={styles.iconWrapper}>
                        <Phone size={normalize(12)} color={colors.blue[600]} strokeWidth={2} />
                    </View>
                    <AppText variant="caption" family="secondary" weight="semiBold" style={styles.actionText}>
                        Call
                    </AppText>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.actionBtn2]} activeOpacity={0.8}>
                    <View style={styles.iconWrapper}>
                        <Mail size={normalize(12)} color={colors.blue[600]} strokeWidth={2} />
                    </View>
                    <View>
                        <AppText variant="caption" family="secondary" weight="semiBold" style={styles.actionText}>
                            Email
                        </AppText>
                        <AppText variant="caption" family="secondary" weight="semiBold" style={styles.emailText} numberOfLines={1} ellipsizeMode="tail">
                            drsarah@sukhisoul.com
                        </AppText>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Message Input */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask your therapist..."
                    placeholderTextColor={colors.typographyColor.Light}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.8}>
                <SendHorizonal size={normalize(14)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
                <AppText variant="caption" family="secondary" weight="semiBold" style={styles.sendText}>
                    Send
                </AppText>
            </TouchableOpacity>
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(20),
        padding: normalize(16),
        marginHorizontal: normalize(20),
        marginBottom: normalize(30),
        borderWidth: 1,
        borderColor: colors.appThemeColor[50],
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(12),
        marginBottom: normalize(14),
    },
    avatar: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(99),
        borderWidth: 2,
        borderColor: colors.lightAppTheme[600]
    },
    headerText: {
        flex: 1,
    },
    title: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(13),
    },
    subtitle: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11.5),
        marginTop: normalize(2),
    },
    actionsRow: {
        flexDirection: 'row',
        gap: normalize(0),
        marginBottom: normalize(12),
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        backgroundColor: colors.lightTints.blueLightTint[50],
        borderRadius: normalize(10),
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(12),
        borderWidth: 1,
        borderColor: colors.lightTints.blueLightTint[200],
        borderTopRightRadius: normalize(0),
        borderBottomEndRadius: normalize(0),
        width: '45%',
    },
    actionBtn2: {
        width: '55%',
        borderLeftWidth: normalize(0),
        borderTopLeftRadius: normalize(0),
        borderBottomLeftRadius: normalize(0),
        borderTopRightRadius: normalize(10),
        borderBottomEndRadius: normalize(10),
    },
    actionText: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(12),
    },
    iconWrapper: {
        width: normalize(24),
        height: normalize(24),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue[100],
        borderRadius: normalize(99),
    },
    emailText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(10),
        maxWidth: '90%'
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.appThemeColor[100],
        borderRadius: normalize(10),
        paddingLeft: normalize(12),
        paddingRight: normalize(8),
        backgroundColor: '#F8FAFF',
        gap: normalize(8),
    },
    input: {
        flex: 1,
        fontSize: normalize(13),
        color: colors.typographyColor.Black,
        paddingVertical: normalize(12),
        minHeight: normalize(100),
    },
    sendBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(10),
        backgroundColor: colors.blue[50],
        borderRadius: normalize(8),
        minWidth: normalize(90),
        height: normalize(40),
        marginTop: normalize(12),
        marginLeft: 'auto'

    },
    sendText: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(12),
    },
});
