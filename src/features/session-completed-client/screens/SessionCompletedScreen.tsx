import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp, AppStackParamList } from '@navigation/types';
import { Shield, Star, MessageSquare, Lightbulb, Leaf, ClipboardList, TrendingUp, Heart, Settings, Check, Ellipsis, PenBox } from 'lucide-react-native';

import { FeedbackSuccessCard } from '../components/FeedbackSuccessCard';
import { TherapistCardTopInfo } from '@/features/therapist-dashboard/components/TherapistCardTopInfo';
import { CommonContinueButton } from '@/components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { submitProfessionalReview } from '@api/professionals';

type SessionCompletedRouteProp = RouteProp<AppStackParamList, 'SessionCompleted'>;

const MOODS = [
  { label: 'Very Low', emoji: '😞' },
  { label: 'Low', emoji: '😕' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Good', emoji: '🙂' },
  { label: 'Very Good', emoji: '😊' },
  { label: 'Great', emoji: '🤩' },
];

const FEEDBACK_OPTIONS = [
  { id: 'insights', label: 'Insights', sub: 'New perspectives', icon: Lightbulb, color: colors.blue[500], bg: "#EFF6FF" },
  { id: 'calm', label: 'Calm & Relaxing', sub: 'Helped me relax', icon: Leaf, color: colors.green[500], bg: "#F0FDF4" },
  { id: 'practical', label: 'Practical Advice', sub: 'Actionable steps', icon: ClipboardList, color: colors.blue[500], bg: "#EEF2FF" },
  { id: 'motivational', label: 'Motivational', sub: 'Inspired me', icon: TrendingUp, color: '#9333EA', bg: '#FAF5FF' },
  { id: 'supportive', label: 'Supportive', sub: 'Felt understood', icon: Heart, color: '#E11D48', bg: '#FDF2F8' },
  { id: 'communication', label: 'Communication', sub: 'Clear & easy to talk', icon: MessageSquare, color: colors.blue[500], bg: "#ECFEFF" },
  { id: 'structure', label: 'Structure & Approach', sub: 'Well organized session', icon: Settings, color: '#EA580C', bg: '#FFF7ED' },
  { id: 'other', label: 'Other', sub: 'Something Else', icon: Ellipsis, color: '#6B7280', bg: '#F9FAFB' },
];

export const SessionCompletedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SessionCompletedRouteProp>();
  const insets = useSafeAreaInsets();
  const params = (route.params || {}) as {
    doctorName?: string;
    doctorId?: string;
    designation?: string;
    experience?: string;
    avatarUrl?: string;
  };

  const doctorName = params.doctorName ?? 'Dr. Sameer Joshi';
  const doctorId = params.doctorId ?? 'doc-001';
  const designation = params.designation ?? 'Senior Clinical Psychologist';
  const experience = params.experience ?? '12+ Years Experience';
  const avatarUrl = params.avatarUrl ?? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300';

  const [selectedMood, setSelectedMood] = useState<string>('Good');
  const [rating, setRating] = useState<number>(5);
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>(['insights', 'calm']);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleFeedback = (id: string) => {
    setSelectedFeedback(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmitFeedback = async () => {
    setSubmitting(true);
    try {
      const helpfulLabels = selectedFeedback.map(id => {
        const found = FEEDBACK_OPTIONS.find(f => f.id === id);
        return found ? found.label : id;
      }).join(', ');

      const combinedReview = notes.trim().length > 0
        ? `${notes.trim()} (Helpful: ${helpfulLabels} | Post-Session Mood: ${selectedMood})`
        : `Helpful aspects: ${helpfulLabels} (Post-Session Mood: ${selectedMood})`;

      if (doctorId) {
        await submitProfessionalReview(doctorId, {
          rating: rating || 5,
          review_text: combinedReview,
          is_anonymous: false,
        });
      }
    } catch (err) {
      console.log('[SessionCompleted] Error submitting review:', err);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.blue[50] }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + normalize(40) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <AppText style={styles.headerTitle} weight="bold" family="secondary">
            Session Completed
          </AppText>
          <AppText weight='regular' family='primary' style={styles.headerSub}>
            You've taken a great step towards your mental well-being.
          </AppText>
        </View>

        <View style={styles.card}>
          <TherapistCardTopInfo
            name={doctorName}
            designation={designation}
            experience={experience}
            imageUrl={avatarUrl}
          />
        </View>

        <View style={styles.moodSection}>
          <AppText style={styles.moodTitle} weight="semiBold" family="secondary">
            How are you feeling after today's session?
          </AppText>
          <AppText style={styles.moodSub} family='secondary' weight='light'>
            This helps us tailor your experience even better.
          </AppText>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodScroll}>
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.label;
              return (
                <TouchableOpacity
                  key={mood.label}
                  style={[styles.moodItem, isSelected && styles.moodItemSelected]}
                  onPress={() => setSelectedMood(mood.label)}
                >
                  <View style={[styles.emojiContainer, isSelected && styles.moodItemSelectedContainer]}>
                    <AppText style={styles.emoji}>{mood.emoji}</AppText>
                  </View>
                  <AppText style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}
                    weight={isSelected ? 'extraBold' : 'semiBold'}
                  >
                    {mood.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {isSubmitted ? (
          <FeedbackSuccessCard onEdit={() => setIsSubmitted(false)} />
        ) : (
          <View style={styles.feedbackCard}>
            <AppText style={styles.feedbackCardTitle} weight="bold">
              HOW WOULD YOU RATE THIS SESSION?
            </AppText>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starContainer}>
                  <Star
                    size={normalize(32)}
                    color={star <= rating ? colors.yellow[500] : "#E2E8F0"}
                    fill={star <= rating ? colors.yellow[500] : "#E2E8F0"}
                  />
                  <AppText style={styles.starLabel}>{star}</AppText>
                </TouchableOpacity>
              ))}
            </View>

            <AppText style={styles.feedbackQuestion} weight="extraBold" >
              How was this week's guidance?
            </AppText>
            <AppText style={styles.feedbackSub} weight='regular'>
              Your feedback helps us improve your experience.
            </AppText>

            <View style={styles.feedbackList}>
              <View style={styles.feedbackListHeader}>
                <View style={styles.messageIcon}>
                  <MessageSquare size={normalize(16)} color={"#3B82F6"} />
                </View>
                <View>
                  <AppText style={styles.feedbackListTitle} weight="extraBold">
                    What was most helpful?
                  </AppText>
                  <AppText style={styles.feedbackListSub} weight='regular'>
                    Select all that apply
                  </AppText>
                </View>
              </View>

              {FEEDBACK_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedFeedback.includes(option.id);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.optionRow}
                    onPress={() => toggleFeedback(option.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.optionIconContainer, { backgroundColor: option.bg }]}>
                      <Icon size={normalize(18)} color={option.color} />
                    </View>
                    <View style={styles.optionTextContainer}>
                      <AppText style={styles.optionLabel} weight="extraBold">
                        {option.label}
                      </AppText>
                      <AppText style={styles.optionSub} weight='regular'>
                        {option.sub}
                      </AppText>
                    </View>
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && <Check size={normalize(14)} color="#fff" strokeWidth={3} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.notesContainer}>
              <View style={styles.notesHeader}>
                <View style={styles.editIcon}>
                  <PenBox size={normalize(16)} color={colors.blue[600]} />
                </View>
                <View>
                  <AppText style={styles.notesTitle} weight="extraBold">
                    Additional notes (optional)
                  </AppText>
                  <AppText style={styles.notesSub} weight='regular'>
                    Share any thoughts or suggestions with us
                  </AppText>
                </View>
              </View>

              <View style={styles.textareaWrapper}>
                <TextInput
                  style={styles.textarea}
                  placeholder="Share your thoughts with us..."
                  placeholderTextColor={"#94A3B8"}
                  multiline
                  value={notes}
                  onChangeText={setNotes}
                  maxLength={500}
                />
                <AppText style={styles.charCount} weight='regular'>{notes.length}/500</AppText>
              </View>
            </View>

            <CommonContinueButton
              label={submitting ? "Submitting..." : "Submit Feedback"}
              disabled={selectedFeedback.length === 0 || submitting}
              onPress={handleSubmitFeedback}
            />

          </View>
        )}

        <View style={styles.bottomActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookTherapy', {
              doctorName,
              doctorId,
              designation,
              price: 500,
            })}
          >
            <LinearGradient
              colors={[colors.blue[100], colors.blue[50], colors.lightTints.blueLightTint[100]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.bookBtn, { borderRadius: normalize(99) }]}
            >
              <AppText style={styles.bookBtnText} weight="bold">Book Next Session</AppText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <LinearGradient
              colors={["#C0EFD8", colors.green[50]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.dashBtn, { borderRadius: normalize(99) }]}
            >
              <AppText style={styles.dashBtnText} weight="bold">Continue to Dashboard</AppText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.reportSection}>
            <View style={styles.confidentialRow}>
              <Shield size={normalize(14)} color={colors.blue[500]} />
              <AppText style={styles.confidentialText}>
                Your feedback is confidential and helps maintain clinical quality standards.
              </AppText>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
  },
  header: {
    paddingVertical: normalize(16),
  },
  headerTitle: {
    fontSize: normalize(26),
    color: '#0F172A',
    marginBottom: normalize(4),
  },
  headerSub: {
    fontSize: normalize(13),
    color: '#64748B',
    lineHeight: normalize(18),
  },
  card: {
    marginBottom: normalize(16),
  },
  moodSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  moodTitle: {
    fontSize: normalize(14),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  moodSub: {
    fontSize: normalize(11),
    color: '#64748B',
    marginBottom: normalize(12),
  },
  moodScroll: {
    gap: normalize(10),
  },
  moodItem: {
    alignItems: 'center',
    padding: normalize(8),
    borderRadius: normalize(14),
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
    minWidth: normalize(64),
  },
  moodItemSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  emojiContainer: {
    marginBottom: normalize(4),
  },
  moodItemSelectedContainer: {},
  emoji: {
    fontSize: normalize(22),
  },
  moodLabel: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  moodLabelSelected: {
    color: '#1D4ED8',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  feedbackCardTitle: {
    fontSize: normalize(11),
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: normalize(12),
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: normalize(8),
    marginBottom: normalize(16),
  },
  starContainer: {
    alignItems: 'center',
  },
  starLabel: {
    fontSize: normalize(10),
    color: '#94A3B8',
    marginTop: normalize(2),
  },
  feedbackQuestion: {
    fontSize: normalize(14),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  feedbackSub: {
    fontSize: normalize(11),
    color: '#64748B',
    marginBottom: normalize(12),
  },
  feedbackList: {
    marginBottom: normalize(16),
  },
  feedbackListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginBottom: normalize(10),
  },
  messageIcon: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackListTitle: {
    fontSize: normalize(12),
    color: '#0F172A',
  },
  feedbackListSub: {
    fontSize: normalize(10),
    color: '#94A3B8',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(12),
    backgroundColor: '#F8FAFC',
    marginBottom: normalize(6),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  optionIconContainer: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: normalize(12),
    color: '#0F172A',
  },
  optionSub: {
    fontSize: normalize(10),
    color: '#64748B',
  },
  checkbox: {
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(4),
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  notesContainer: {
    marginBottom: normalize(16),
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginBottom: normalize(8),
  },
  editIcon: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesTitle: {
    fontSize: normalize(12),
    color: '#0F172A',
  },
  notesSub: {
    fontSize: normalize(10),
    color: '#94A3B8',
  },
  textareaWrapper: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(14),
    backgroundColor: '#F8FAFC',
    padding: normalize(10),
  },
  textarea: {
    height: normalize(80),
    textAlignVertical: 'top',
    fontSize: normalize(12),
    color: '#0F172A',
  },
  charCount: {
    fontSize: normalize(10),
    color: '#94A3B8',
    textAlign: 'right',
  },
  bottomActions: {
    gap: normalize(10),
    marginTop: normalize(8),
  },
  bookBtn: {
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontSize: normalize(13),
    color: '#1E40AF',
  },
  dashBtn: {
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashBtnText: {
    fontSize: normalize(13),
    color: '#065F46',
  },
  reportSection: {
    marginTop: normalize(8),
  },
  confidentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    justifyContent: 'center',
  },
  confidentialText: {
    fontSize: normalize(10.5),
    color: '#64748B',
    textAlign: 'center',
  },
});
