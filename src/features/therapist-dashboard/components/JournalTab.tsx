import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Send, Plus, Mic, Star } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

const SUGGESTED_QUESTIONS = [
    '1. Voice Note',
    '2. Why do I feel emotionally tired?',
    '3. How can I improve my sleep?',
    '4. How can I build confidence?',
    '5. What should I do when I feel panic?',
];

export const JournalTab: React.FC = () => {
    const { borderRadius } = useTheme();
    const [journalText, setJournalText] = useState('');
    const [myQuestion, setMyQuestion] = useState('How can I calm my mind faster when I start overthinking?');

    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                {/* Problems I'm Facing */}
                <View style={[styles.card, { borderRadius: normalize(28) }]}>
                    <AppText variant="h4" weight="extraBold" style={styles.cardTitle}>
                        Problems I'm Facing
                    </AppText>
                    <AppText variant="caption" weight="regular" style={styles.cardSubtitle}>
                        Journal what you want your psychologist to understand.
                    </AppText>

                    <TextInput
                        style={[styles.textArea, { borderRadius: borderRadius.xl }]}
                        multiline
                        numberOfLines={5}
                        value={journalText}
                        onChangeText={setJournalText}
                        placeholder="Write your thoughts here..."
                        placeholderTextColor={'#64748B'}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.shareJournalBtn, { borderRadius: normalize(16) }]}
                    >
                        <Send size={normalize(16)} color={colors.lightAppTheme[950]} />
                        <AppText variant="body" weight="semiBold" style={styles.shareJournalText}>
                            Share journal with psychologist
                        </AppText>
                    </TouchableOpacity>
                </View>

                {/* Questions for Next Therapy */}
                <View style={[styles.card, { borderRadius: borderRadius.xl }]}>
                    <View style={[styles.questionsTitleRow, { alignItems: 'flex-start' }]}>
                        <View>
                            <AppText variant="h4" family='secondary' weight="extraBold" style={styles.cardTitle}>
                                Questions for Next Therapy
                            </AppText>
                            <AppText variant="caption" family='secondary' weight="regular" style={styles.cardSubtitle}>
                                Visible 30 minutes before your session.
                            </AppText>
                        </View>
                        <TouchableOpacity
                            style={[styles.addIconBtn, { borderRadius: normalize(99) }]}
                            activeOpacity={0.8}
                        >
                            <Star size={normalize(18)} color="#fff" fill={'#fff'} />
                        </TouchableOpacity>
                    </View>

                    {/* My Question Input */}
                    <View style={[styles.myQuestionBlock, { borderRadius: borderRadius.xl }]}>
                        <View style={styles.myQuestionHeader}>
                            <AppText variant="caption" family='secondary' weight="extraBold" style={styles.myQuestionLabel}>
                                MY QUESTION
                            </AppText>
                            <TouchableOpacity activeOpacity={0.7}>
                                <AppText variant="caption" family='secondary' weight="semiBold" style={styles.addText}>
                                    + Add
                                </AppText>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.questionInput}
                            value={myQuestion}
                            onChangeText={setMyQuestion}
                            multiline
                            placeholder="Type your question..."
                            placeholderTextColor={colors.typographyColor.Medium}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Voice Reflection */}
                    <TouchableOpacity activeOpacity={0.85} style={{ borderRadius: borderRadius.l, marginTop: normalize(12) }}>
                        <LinearGradient
                            colors={[colors.blue[800], colors.blue[800]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.voiceBtn, { borderRadius: borderRadius.l }]}
                        >
                            <Mic size={normalize(16)} color="#fff" />
                            <AppText variant="body" family='secondary' weight="bold" style={styles.voiceBtnText}>
                                Record Voice Reflection
                            </AppText>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Psychologist Questions */}
                <View style={[styles.card, styles.cardQuestions, { borderRadius: borderRadius.xl }]}>
                    <View style={styles.questionsTitleRow}>
                        <AppText variant="h4" family='secondary' weight="extraBold" style={styles.cardTitle}>
                            Psychologist Questions
                        </AppText>
                        <TouchableOpacity>
                            <AppText variant="caption" family='secondary' weight="semiBold" style={styles.tapToAddText}>
                                Tap to add
                            </AppText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.suggestedList}>
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                            <TouchableOpacity
                                key={idx}
                                activeOpacity={0.7}
                                style={[
                                    styles.suggestedItem,
                                    idx < SUGGESTED_QUESTIONS.length - 1 && styles.suggestedItemBorder,
                                ]}
                            >
                                <AppText variant="body" family='secondary' weight="regular" style={styles.suggestedText}>
                                    {q}
                                </AppText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        gap: normalize(16),
        backgroundColor: '#ffffff'
    },
    containerInner: {
        backgroundColor: '#F5F7FF',
        borderTopEndRadius: normalize(32),
        borderTopLeftRadius: normalize(32),
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        marginHorizontal: normalize(-20),
        marginTop: normalize(15),
        gap: normalize(16),
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: normalize(24),
        boxShadow: '0px 4px 20px -2px rgba(0, 0, 0, 0.05)',
    },
    cardTitle: {
        color: "#0F172A",
        marginBottom: normalize(2),
    },
    cardSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginBottom: normalize(12),
    },
    textArea: {
        borderWidth: 1,
        borderColor: colors.appThemeColor[200],
        backgroundColor: 'rgba(244,247,255,0.4)',
        padding: normalize(12),
        fontSize: normalize(13),
        color: '#64748B',
        minHeight: normalize(110),
        marginBottom: normalize(12),
        lineHeight: normalize(20),
    },
    shareJournalBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(8),
        borderWidth: 1.5,
        borderColor: colors.blue[200],
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(26),
    },
    shareJournalText: {
        color: colors.lightAppTheme[950],
        fontSize: normalize(13),
    },

    // Questions section
    questionsTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(12),
    },
    addIconBtn: {
        width: normalize(32),
        height: normalize(32),
        backgroundColor: colors.lightTints.blueLightTint[200],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(5)
    },
    myQuestionBlock: {
        borderWidth: 1,
        borderColor: "#EFF6FF",
        padding: normalize(15),
        backgroundColor: 'rgba(244,247,255,0.30)',
        paddingTop: normalize(24)
    },
    myQuestionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: normalize(8),
    },
    myQuestionLabel: {
        color: colors.appThemeColor[600],
        fontSize: normalize(14),
        letterSpacing: 0.6,
    },
    addText: {
        backgroundColor: '#EEF2FF',
        color: colors.appThemeColor[700],
        fontSize: normalize(12),
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(5),
        borderRadius: normalize(99)
    },
    questionInput: {
        fontSize: normalize(12),
        color: '#64748B',
        lineHeight: normalize(18),
        padding: 0,
        minHeight: normalize(50),
        backgroundColor: '#ffffff',
        borderRadius: normalize(16),
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(15),
        borderWidth: normalize(1),
        borderColor: '#DBEAFE'
    },
    voiceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: normalize(8),
        paddingVertical: normalize(13),
    },
    voiceBtnText: {
        color: '#FFFFFF',
        fontSize: normalize(14),
    },
    tapToAddText: {
        color: colors.appThemeColor[600],
        fontSize: normalize(12),
    },
    suggestedList: {
        marginTop: normalize(4),
    },
    suggestedItem: {
        paddingVertical: normalize(11),
    },
    suggestedItemBorder: {
    },
    suggestedText: {
        color: colors.appThemeColor[950],
        fontSize: normalize(13),
    },
    cardQuestions: {
        backgroundColor: colors.tintsBlue[50],
        borderWidth: 1,
        borderColor: colors.appThemeColor[200]
    },
});
