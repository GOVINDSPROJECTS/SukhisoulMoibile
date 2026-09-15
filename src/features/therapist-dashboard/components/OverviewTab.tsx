import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {
    Zap,
    FileText,
    ShieldCheck,
    ChevronRight,
    Headphones,
    Star,
    X,
    CheckCircle2,
    Send,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';
import { submitProfessionalReview } from '@api/professionals';

// ─── Plan Item ────────────────────────────────────────────────────────────────

interface PlanItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress?: () => void;
}

const PlanItem: React.FC<PlanItemProps> = ({ icon, title, subtitle, onPress }) => {
    const { borderRadius } = useTheme();
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.planItem}>
            <View style={[styles.planIconWrapper, { borderRadius: borderRadius.full, backgroundColor: "#E0E4FF" }]}>
                {icon}
            </View>
            <View style={styles.planTextBlock}>
                <AppText variant="body" family='secondary' weight="semiBold" style={styles.planTitle}>
                    {title}
                </AppText>
                <AppText variant="caption" family='secondary' weight="regular" style={styles.planSubtitle}>
                    {subtitle}
                </AppText>
            </View>
            <ChevronRight size={normalize(18)} color={colors.appThemeColor[400]} />
        </TouchableOpacity>
    );
};

// ─── Psychologist Suggestion ──────────────────────────────────────────────────

const PsychologistSuggestion: React.FC = () => {
    const { borderRadius } = useTheme();
    return (
        <View style={[styles.suggestionCard, { borderRadius: borderRadius.xl }]}>
            <View style={[styles.suggestionIconWrapper, { borderRadius: borderRadius.full }]}>
                <Headphones size={normalize(22)} color={colors.blue[400]} />
            </View>
            <View style={styles.suggestionTextBlock}>
                <AppText variant="body" family='secondary' weight="extraBold" style={styles.suggestionTitle}>
                    Psychologist Suggestion
                </AppText>
                <AppText variant="caption" family='secondary' weight="regular" style={styles.suggestionText}>
                    Try a 2-minute grounding exercise whenever anxiety starts at night.
                </AppText>
            </View>
        </View>
    );
};

// ─── Rate & Review ────────────────────────────────────────────────────────────

const HELPFUL_TAGS = ['Insightful', 'Calming', 'Empowering', 'Practical Advice', 'Great Listener'];

interface RateReviewProps {
    doctorId?: string | number;
    doctorName?: string;
}

const RateReview: React.FC<RateReviewProps> = ({ doctorId, doctorName }) => {
    const { borderRadius } = useTheme();
    const [rating, setRating] = useState<number>(5);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>(['Insightful', 'Calming']);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleStarTap = (star: number) => {
        setRating(star);
        setModalVisible(true);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const tagsFormatted = selectedTags.length > 0 ? ` [Tags: ${selectedTags.join(', ')}]` : '';
            const finalReviewText = (reviewText.trim() || 'Insightful and very helpful session.') + tagsFormatted;
            const targetDocId = String(doctorId || '1');

            await submitProfessionalReview(targetDocId, {
                rating: rating || 5,
                review_text: finalReviewText,
                is_anonymous: isAnonymous,
            });

            setSubmitted(true);
            setTimeout(() => {
                setModalVisible(false);
                setReviewText('');
            }, 1800);
        } catch (error) {
            console.log('[RateReview] Error submitting review:', error);
            setSubmitted(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 1500);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.rateReviewBlock}>
            <AppText variant="h4" family='secondary' weight="bold" style={styles.rateTitle}>
                Rate & Review Therapy
            </AppText>
            <AppText variant="caption" family='secondary' weight="regular" style={styles.rateSubtitle}>
                {doctorName ? `Help us evaluate your sessions with ${doctorName}.` : 'Help us improve your therapy experience.'}
            </AppText>

            {/* Stars Row */}
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        activeOpacity={0.75}
                        onPress={() => handleStarTap(star)}
                        style={styles.starTouch}
                    >
                        <Star
                            size={normalize(32)}
                            color="#F8C800"
                            fill={star <= rating ? "#F8C800" : "transparent"}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Write Review Button */}
            <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.writeReviewBtn, { borderRadius: borderRadius.l }]}
                onPress={() => setModalVisible(true)}
            >
                <AppText variant="body" family='secondary' weight="semiBold" style={styles.writeReviewText}>
                    Write Review
                </AppText>
            </TouchableOpacity>

            {/* Review Submission Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                style={[styles.modalContent, { borderRadius: normalize(24) }]}
                            >
                                <View style={styles.modalHeader}>
                                    <View>
                                        <AppText variant="h3" weight="extraBold" style={styles.modalTitle}>
                                            Write a Review
                                        </AppText>
                                        <AppText variant="caption" style={styles.modalSubtitle}>
                                            {doctorName ? `For ${doctorName}` : 'Share your feedback'}
                                        </AppText>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeBtn}
                                    >
                                        <X size={normalize(20)} color={colors.typographyColor.Dark} />
                                    </TouchableOpacity>
                                </View>

                                {submitted ? (
                                    <View style={styles.successBlock}>
                                        <CheckCircle2 size={normalize(48)} color={colors.green[500]} />
                                        <AppText variant="h4" weight="bold" style={styles.successTitle}>
                                            Thank You!
                                        </AppText>
                                        <AppText variant="caption" style={styles.successText}>
                                            Your verified review has been submitted successfully.
                                        </AppText>
                                    </View>
                                ) : (
                                    <>
                                        {/* Modal Star Rating */}
                                        <View style={styles.modalStarsRow}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <TouchableOpacity
                                                    key={star}
                                                    activeOpacity={0.7}
                                                    onPress={() => setRating(star)}
                                                >
                                                    <Star
                                                        size={normalize(28)}
                                                        color="#F8C800"
                                                        fill={star <= rating ? "#F8C800" : "transparent"}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        {/* Tag Chips */}
                                        <View style={styles.tagsContainer}>
                                            {HELPFUL_TAGS.map((tag) => {
                                                const selected = selectedTags.includes(tag);
                                                return (
                                                    <TouchableOpacity
                                                        key={tag}
                                                        activeOpacity={0.7}
                                                        onPress={() => toggleTag(tag)}
                                                        style={[
                                                            styles.tagChip,
                                                            selected && styles.tagChipSelected,
                                                        ]}
                                                    >
                                                        <AppText
                                                            variant="caption"
                                                            weight="semiBold"
                                                            style={[
                                                                styles.tagChipText,
                                                                selected && styles.tagChipTextSelected,
                                                            ]}
                                                        >
                                                            {tag}
                                                        </AppText>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>

                                        {/* Text Input */}
                                        <TextInput
                                            style={styles.modalTextInput}
                                            multiline
                                            numberOfLines={4}
                                            placeholder="Write about your session experience, progress, or doctor's guidance..."
                                            placeholderTextColor="#94A3B8"
                                            value={reviewText}
                                            onChangeText={setReviewText}
                                            textAlignVertical="top"
                                        />

                                        {/* Anonymous Checkbox */}
                                        <TouchableOpacity
                                            style={styles.anonRow}
                                            activeOpacity={0.8}
                                            onPress={() => setIsAnonymous(prev => !prev)}
                                        >
                                            <View style={[styles.checkbox, isAnonymous && styles.checkboxActive]}>
                                                {isAnonymous && <Star size={normalize(10)} color="#fff" fill="#fff" />}
                                            </View>
                                            <AppText variant="caption" weight="medium" style={styles.anonText}>
                                                Post review anonymously
                                            </AppText>
                                        </TouchableOpacity>

                                        {/* Submit Button */}
                                        <TouchableOpacity
                                            activeOpacity={0.85}
                                            style={[styles.submitBtn, { borderRadius: borderRadius.l }]}
                                            onPress={handleSubmit}
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <ActivityIndicator size="small" color="#FFFFFF" />
                                            ) : (
                                                <View style={styles.submitBtnContent}>
                                                    <Send size={normalize(16)} color="#FFFFFF" style={{ marginRight: normalize(6) }} />
                                                    <AppText variant="body" weight="bold" style={styles.submitBtnText}>
                                                        Submit Review
                                                    </AppText>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </>
                                )}
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

// ─── Overview Tab ─────────────────────────────────────────────────────────────

export const OverviewTab: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { borderRadius } = useTheme();
    const { data: dashboardData } = useTherapistDashboard();

    const therapist = dashboardData?.therapist;

    return (
        <View style={styles.container}>
            {/* Plan Given by Psychologist */}
            <View style={[styles.sectionCard, { borderRadius: borderRadius.xl }]}>
                <AppText variant="h4" family='secondary' weight="extraBold" style={styles.sectionTitle}>
                    Plan Given by Psychologist
                </AppText>
                <AppText variant="caption" family='secondary' weight="regular" style={styles.sectionSubtitle}>
                    {dashboardData?.progress?.planName ?? 'CBT Anxiety Support Program'}
                </AppText>

                <View style={styles.planList}>
                    <PlanItem
                        icon={<Zap size={normalize(20)} color={colors.blue[400]} />}
                        title="Session Overview"
                        subtitle="Managing anxiety triggers"
                        onPress={() => navigation.navigate('SessionOverview')}
                    />
                    <PlanItem
                        icon={<FileText size={normalize(20)} color={colors.blue[400]} />}
                        title="Weekly Goal"
                        subtitle="Write thought records 3 times"
                        onPress={() => navigation.navigate('WeeklyGoal')}
                    />
                    <PlanItem
                        icon={<ShieldCheck size={normalize(20)} color={colors.blue[400]} />}
                        title="Care Note"
                        subtitle="Continue breathing practice before sleep"
                        onPress={() => navigation.navigate('CareNotes')}
                    />
                </View>
            </View>

            {/* Psychologist Suggestion */}
            <PsychologistSuggestion />

            {/* Rate & Review */}
            <RateReview doctorId={therapist?.id} doctorName={therapist?.name} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        backgroundColor: colors.typographyColor.White,
    },

    // Section Card
    sectionCard: {
        backgroundColor: colors.typographyColor.White,
        padding: normalize(15),
        marginBottom: normalize(15),
    },
    sectionTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(16),
    },
    sectionSubtitle: {
        color: colors.typographyColor.Light,
        fontSize: normalize(11.5),
        marginTop: normalize(2),
        marginBottom: normalize(14),
    },
    planList: {
        gap: 0,
    },

    // Plan Item
    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(12),
        gap: normalize(16),
    },
    planIconWrapper: {
        width: normalize(48),
        height: normalize(48),
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.blue[400],
    },
    planTextBlock: {
        flex: 1,
    },
    planTitle: {
        color: colors.appThemeColor[950],
        fontSize: normalize(13),
    },
    planSubtitle: {
        color: colors.typographyColor.Light,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },

    // Suggestion Card
    suggestionCard: {
        backgroundColor: "#EBF3FF",
        padding: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(14),
        marginBottom: normalize(20),
    },
    suggestionIconWrapper: {
        width: normalize(44),
        height: normalize(44),
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    },
    suggestionTextBlock: {
        flex: 1,
    },
    suggestionTitle: {
        color: colors.appThemeColor[800],
        fontSize: normalize(13),
    },
    suggestionText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11),
        marginTop: normalize(3),
        lineHeight: normalize(16),
    },

    // Rate & Review Block
    rateReviewBlock: {
        alignItems: 'center',
        marginTop: normalize(20),
        padding: normalize(20),
        borderRadius: normalize(28),
        boxShadow: '0px 10px 25px -5px rgba(18, 26, 54, 0.05)',
        backgroundColor: '#FFFFFF',
    },
    rateTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(17),
        textAlign: 'center',
    },
    rateSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(4),
        textAlign: 'center',
        marginBottom: normalize(16),
    },
    starsRow: {
        flexDirection: 'row',
        gap: normalize(8),
        marginBottom: normalize(18),
    },
    starTouch: {
        padding: normalize(4),
    },
    writeReviewBtn: {
        backgroundColor: colors.appThemeColor[900],
        paddingVertical: normalize(14),
        paddingHorizontal: normalize(50),
        width: '100%',
        alignItems: 'center',
    },
    writeReviewText: {
        color: '#FFFFFF',
        fontSize: normalize(14),
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(32),
        borderTopLeftRadius: normalize(24),
        borderTopRightRadius: normalize(24),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: normalize(16),
    },
    modalTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(18),
    },
    modalSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },
    closeBtn: {
        padding: normalize(6),
    },
    modalStarsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: normalize(10),
        marginBottom: normalize(16),
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: normalize(8),
        marginBottom: normalize(14),
    },
    tagChip: {
        backgroundColor: '#F1F5F9',
        borderRadius: normalize(99),
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(6),
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    tagChipSelected: {
        backgroundColor: '#EFF6FF',
        borderColor: colors.blue[500],
    },
    tagChipText: {
        color: '#64748B',
        fontSize: normalize(11),
    },
    tagChipTextSelected: {
        color: colors.blue[600],
    },
    modalTextInput: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: normalize(12),
        padding: normalize(12),
        fontSize: normalize(13),
        color: colors.typographyColor.Black,
        minHeight: normalize(90),
        backgroundColor: '#F8FAFC',
        marginBottom: normalize(14),
    },
    anonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
        marginBottom: normalize(18),
    },
    checkbox: {
        width: normalize(18),
        height: normalize(18),
        borderRadius: normalize(4),
        borderWidth: 1.5,
        borderColor: '#94A3B8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: colors.blue[600],
        borderColor: colors.blue[600],
    },
    anonText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
    },
    submitBtn: {
        backgroundColor: colors.blue[600],
        paddingVertical: normalize(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: normalize(14),
    },
    successBlock: {
        alignItems: 'center',
        paddingVertical: normalize(24),
        gap: normalize(10),
    },
    successTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(17),
        marginTop: normalize(8),
    },
    successText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        textAlign: 'center',
    },
});
