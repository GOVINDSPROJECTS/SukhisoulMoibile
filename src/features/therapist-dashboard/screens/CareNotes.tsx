import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Pencil, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { TherapistContactCard } from '../components/TherapistContactCard';

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
    <AppText variant="caption" family="secondary" weight="bold" style={styles.sectionLabel}>
        {label}
    </AppText>
);

// ─── Editable Block ───────────────────────────────────────────────────────────
// Each block manages its own edit / loading / saved state independently.

interface EditableBlockProps {
    initialLines: string[];
}

const EditableBlock: React.FC<EditableBlockProps> = ({ initialLines }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Join lines into a single TextInput value (one line per entry)
    const [text, setText] = useState(initialLines.join('\n'));
    // Snapshot before edit — allows discarding changes if needed
    const savedText = useRef(initialLines.join('\n'));

    const handlePencilPress = useCallback(() => {
        // Enter edit mode
        setIsEditing(true);
    }, []);

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(() => {
            savedText.current = text;
            setIsSubmitting(false);
            setIsEditing(false);
        }, 2000);
    }, [isSubmitting, text]);

    const lines = text.split('\n').filter(Boolean);

    return (
        <View
            style={[
                styles.editableBlock,
                isEditing && styles.editableBlockActive,
            ]}
        >
            <View style={styles.editableContent}>
                {isEditing ? (
                    <TextInput
                        style={styles.editableInput}
                        value={text}
                        onChangeText={setText}
                        multiline
                        autoFocus
                        textAlignVertical="top"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                ) : (
                    lines.map((line, idx) => (
                        <AppText
                            key={idx}
                            variant="caption"
                            family="secondary"
                            weight="regular"
                            style={styles.editableLine}
                        >
                            {line}
                        </AppText>
                    ))
                )}
            </View>

            {/* Action icon: pencil → submit (checkmark with loader) */}
            <TouchableOpacity
                style={[
                    styles.actionIconBtn,
                    isEditing && styles.actionIconBtnActive,
                ]}
                onPress={isEditing ? handleSubmit : handlePencilPress}
                activeOpacity={0.75}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator
                        size="small"
                        color={colors.green[500]}
                    />
                ) : isEditing ? (
                    <Check size={normalize(15)} color={colors.green[500]} strokeWidth={2.5} />
                ) : (
                    <Pencil size={normalize(15)} color={colors.blue[500]} strokeWidth={2} />
                )}
            </TouchableOpacity>
        </View>
    );
};

// ─── Editable Focus Row ───────────────────────────────────────────────────────

const EditableFocusRow: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [text, setText] = useState('Anxiety management & coping skills');
    const savedText = useRef(text);

    const handlePencilPress = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleSubmit = useCallback(() => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(() => {
            savedText.current = text;
            setIsSubmitting(false);
            setIsEditing(false);
        }, 2000);
    }, [isSubmitting, text]);

    return (
        <View style={[styles.focusRow, isEditing && styles.focusRowActive]}>
            {isEditing ? (
                <TextInput
                    style={styles.focusInput}
                    value={text}
                    onChangeText={setText}
                    autoFocus
                    placeholderTextColor={colors.typographyColor.Light}
                />
            ) : (
                <AppText
                    variant="body"
                    family="secondary"
                    weight="regular"
                    style={styles.focusText}
                >
                    {text}
                </AppText>
            )}
            <TouchableOpacity
                onPress={isEditing ? handleSubmit : handlePencilPress}
                activeOpacity={0.75}
                disabled={isSubmitting}
                style={[styles.actionIconBtn, isEditing && styles.actionIconBtnActive]}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color={colors.green[500]} />
                ) : isEditing ? (
                    <Check size={normalize(15)} color={colors.green[500]} strokeWidth={2.5} />
                ) : (
                    <Pencil size={normalize(15)} color={colors.blue[500]} strokeWidth={2} />
                )}
            </TouchableOpacity>
        </View>
    );
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export const CareNotes: React.FC = () => {
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
                <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
                    Care Notes
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
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ paddingHorizontal: normalize(20) }}>
                        {/* Page Title */}
                        <AppText variant="h3" family="secondary" weight="extraBold" style={styles.pageTitle}>
                            Care Notes
                        </AppText>

                        {/* Selected Focus */}
                        <SectionLabel label="SELECTED FOCUS" />
                        <EditableFocusRow />

                        {/* What you have to work on */}
                        <SectionLabel label="WHAT YOU HAVE TO WORK ON" />
                        <EditableBlock
                            initialLines={[
                                'Practice breathing exercises daily',
                                'Track anxiety triggers',
                                'Complete thought journal',
                                'Follow grounding techniques',
                            ]}
                        />

                        {/* Important things to take care of */}
                        <SectionLabel label="WHAT ARE IMPORTANT THINGS U SHOULD TAKE CARE OF" />
                        <EditableBlock
                            initialLines={[
                                'Maintain sleep schedule',
                                'Avoid skipping meals',
                                'Take prescribed medication',
                                'Reach out when feeling overwhelmed',
                                'Practice self-care activities',
                            ]}
                        />

                        <View style={{ height: normalize(20) }} />
                    </View>

                    {/* Therapist contact card */}
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
        paddingHorizontal: normalize(0),
        paddingTop: normalize(22),
        paddingBottom: normalize(20),
    },

    pageTitle: {
        color: colors.typographyColor.Dark,
        fontSize: normalize(22),
        marginBottom: normalize(20),
    },

    sectionLabel: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(10),
        letterSpacing: 0.6,
        marginBottom: normalize(8),
        marginTop: normalize(4),
    },

    // ─── Focus Row ────────────────────────────────────────────────────────────
    focusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.appThemeColor[50],
        borderRadius: normalize(10),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(12),
        backgroundColor: colors.appThemeColor[50],
        marginBottom: normalize(20),
        gap: normalize(8),
    },
    focusRowActive: {
        borderColor: colors.blue[300],
        backgroundColor: '#FFFFFF',
    },
    focusInput: {
        flex: 1,
        fontSize: normalize(13),
        color: colors.typographyColor.Dark,
        paddingVertical: 0,
    },
    focusText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
        flex: 1,
    },

    // ─── Editable Block ───────────────────────────────────────────────────────
    editableBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.lightTints.blueLightTint[200],
        borderRadius: normalize(10),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(14),
        backgroundColor: '#FAFCFF',
        marginBottom: normalize(20),
        gap: normalize(10),
    },
    editableBlockActive: {
        borderColor: colors.blue[300],
        backgroundColor: '#FFFFFF',
    },
    editableContent: {
        flex: 1,
        gap: normalize(4),
    },
    editableLine: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
        lineHeight: normalize(20),
    },
    editableInput: {
        flex: 1,
        fontSize: normalize(13),
        color: colors.typographyColor.Dark,
        lineHeight: normalize(22),
        minHeight: normalize(80),
        paddingVertical: 0,
    },

    // ─── Shared action icon button ─────────────────────────────────────────────
    actionIconBtn: {
        width: normalize(28),
        height: normalize(28),
        borderRadius: normalize(8),
        // backgroundColor: colors.lightTints.blueLightTint[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(2),
    },
    actionIconBtnActive: {
        backgroundColor: colors.green[100],
    },

    editIcon: {
        paddingTop: normalize(2),
    },
});
