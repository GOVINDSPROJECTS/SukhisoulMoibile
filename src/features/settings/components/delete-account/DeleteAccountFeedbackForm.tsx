import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { ChevronDown, Check, X } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

const REASON_OPTIONS = [
  'Privacy or security concerns',
  'Found another alternative/app',
  'Not getting desired results',
  'Subscription/pricing is too high',
  'Temporary break, will return later',
  'Technical issues or bugs',
  'Other reason',
];

const DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6 months – 1 year',
  '1 year or more',
];

interface DeleteAccountFeedbackFormProps {
  onContinue: (feedbackData: {
    reason: string;
    duration: string;
    rating: number;
    suggestions: string;
  }) => void;
  onCancel: () => void;
}

export const DeleteAccountFeedbackForm: React.FC<DeleteAccountFeedbackFormProps> = ({
  onContinue,
  onCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string>('');

  const handleContinue = useCallback(() => {
    console.log('[Delete Account Feedback] Submitted:', {
      reason: selectedReason,
      duration: selectedDuration,
      rating,
      suggestions,
    });
    onContinue({
      reason: selectedReason,
      duration: selectedDuration,
      rating: rating || 0,
      suggestions,
    });
  }, [selectedReason, selectedDuration, rating, suggestions, onContinue]);

  return (
    <View style={styles.container}>
      {/* ── Question 1: Primary Reason ────────────────────────────────────── */}
      <View style={styles.questionBlock}>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.questionTitle}
          color={colors.typographyColor.Light || '#64748B'}
        >
          1. What is the primary reason for leaving?
        </AppText>
        <TouchableOpacity
          style={styles.dropdownInput}
          activeOpacity={0.8}
          onPress={() => setShowReasonModal(true)}
        >
          <AppText
            weight="regular"
            family="secondary"
            style={[
              styles.dropdownText,
              !selectedReason && { color: colors.typographyColor.Light || '#94A3B8' },
            ]}
            numberOfLines={1}
          >
            {selectedReason || 'Select a reason'}
          </AppText>
          <ChevronDown size={normalize(18)} color={colors.typographyColor.Light || '#94A3B8'} />
        </TouchableOpacity>
      </View>

      {/* ── Question 2: Duration ───────────────────────────────────────────── */}
      <View style={styles.questionBlock}>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.questionTitle}
          color={colors.typographyColor.Light || '#64748B'}
        >
          2. How long have you been using SukhiSoul?
        </AppText>
        <View style={styles.radioList}>
          {DURATION_OPTIONS.map((item) => {
            const isSelected = selectedDuration === item;
            return (
              <TouchableOpacity
                key={item}
                style={styles.radioRow}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedDuration(item);
                  console.log(`[Delete Account Feedback] Duration selected: ${item}`);
                }}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <AppText
                  weight="regular"
                  family="secondary"
                  style={styles.radioLabel}
                  color={colors.typographyColor.Light || '#1E293B'}
                >
                  {item}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Question 3: Rating Scale ──────────────────────────────────────── */}
      <View style={styles.questionBlock}>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.questionTitle}
          color={colors.typographyColor.Light || '#64748B'}
        >
          3. How would you rate your overall experience with SukhiSoul?
        </AppText>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = rating === num;
            return (
              <TouchableOpacity
                key={num}
                style={[styles.ratingCircle, isSelected && styles.ratingCircleSelected]}
                activeOpacity={0.8}
                onPress={() => {
                  setRating(num);
                  console.log(`[Delete Account Feedback] Rating selected: ${num}`);
                }}
              >
                <AppText
                  weight={isSelected ? 'bold' : 'regular'}
                  family="secondary"
                  style={[styles.ratingNumber, isSelected && styles.ratingNumberSelected]}
                  color={isSelected ? colors.typographyColor.Light : colors.typographyColor.Dark}
                >
                  {num}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.ratingLabelsRow}>
          <AppText weight="medium" family="secondary" style={styles.ratingScaleLabel}>
            VERY POOR
          </AppText>
          <AppText weight="medium" family="secondary" style={styles.ratingScaleLabel}>
            EXCELLENT
          </AppText>
        </View>
      </View>

      {/* ── Question 4: Improvement suggestions ────────────────────────────── */}
      <View style={styles.questionBlock}>
        <AppText
          weight="regular"
          family="secondary"
          style={styles.questionTitle}
          color={colors.typographyColor.Light || '#64748B'}
        >
          4. What could we have done better?
        </AppText>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            maxLength={1000}
            value={suggestions}
            onChangeText={setSuggestions}
            placeholder="Type your answer here..."
            placeholderTextColor={colors.typographyColor.Light || '#94A3B8'}
            textAlignVertical="top"
          />
          <AppText weight="regular" family="secondary" style={styles.charCounter}>
            {suggestions.length}/1000
          </AppText>
        </View>
      </View>

      {/* ── Bottom Actions ────────────────────────────────────────────────── */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.85}
          onPress={() => {
            console.log('[Delete Account Feedback] Cancel pressed');
            onCancel();
          }}
        >
          <AppText weight="bold" family="primary" style={styles.cancelBtnText} color="#475569">
            Cancel
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.continueBtn}
          >
            <AppText
              weight="bold"
              family="primary"
              style={styles.continueBtnText}
              color="#FFFFFF"
            >
              Continue
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ── Reason Selector Modal ─────────────────────────────────────────── */}
      <Modal
        visible={showReasonModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReasonModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowReasonModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.sheetHeader}>
            <AppText weight="bold" family="primary" style={styles.sheetTitle} color={colors.typographyColor.Black}>
              Select Reason for Leaving
            </AppText>
            <TouchableOpacity onPress={() => setShowReasonModal(false)}>
              <X size={normalize(20)} color={colors.typographyColor.Dark} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: normalize(320) }} showsVerticalScrollIndicator={false}>
            {REASON_OPTIONS.map((opt) => {
              const isSelected = selectedReason === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.modalItem, isSelected && styles.modalItemActive]}
                  onPress={() => {
                    setSelectedReason(opt);
                    console.log(`[Delete Account Feedback] Reason selected: ${opt}`);
                    setShowReasonModal(false);
                  }}
                >
                  <AppText
                    weight={isSelected ? 'bold' : 'regular'}
                    style={[styles.modalItemText, isSelected && { color: colors.typographyColor['Dark 2'] || '#003CA3' }]}
                  >
                    {opt}
                  </AppText>
                  {isSelected && <Check size={normalize(16)} color={colors.typographyColor['Dark 2'] || '#003CA3'} strokeWidth={2.5} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(4),
  },
  questionBlock: {
    marginBottom: normalize(32),
  },
  questionTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(10),
    lineHeight: normalize(18),
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
  },
  dropdownText: {
    fontSize: normalize(13),
    flex: 1,
    color: colors.typographyColor.Black
  },
  radioList: {
    gap: normalize(12),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  radioCircle: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioCircleSelected: {
    borderColor: '#1E6091',
    backgroundColor: '#1E6091',
  },
  radioDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#FFFFFF',
  },
  radioLabel: {
    fontSize: normalize(13),
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(8),
  },
  ratingCircle: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(99),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingCircleSelected: {
    backgroundColor: '#1E6091',
    borderColor: '#1E6091',
  },
  ratingNumber: {
    fontSize: normalize(16),
    color: '#64748B',
  },
  ratingNumberSelected: {
    color: '#FFFFFF',
  },
  ratingLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(4),
  },
  ratingScaleLabel: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Light,
    letterSpacing: 0.5,
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(14),
    padding: normalize(12),
  },
  textArea: {
    fontSize: normalize(13),
    color: colors.typographyColor.Light || '#1E293B',
    minHeight: normalize(90),
    paddingTop: 0,
  },
  charCounter: {
    alignSelf: 'flex-end',
    fontSize: normalize(11),
    color: '#94A3B8',
    marginTop: normalize(4),
  },
  actionsContainer: {
    gap: normalize(12),
    marginTop: normalize(10),
    marginBottom: normalize(40),
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: normalize(99),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: normalize(50),
  },
  cancelBtnText: {
    fontSize: normalize(15),
  },
  continueBtn: {
    backgroundColor: colors.lightAppTheme ? colors.lightAppTheme[700] : '#1E6091',
    borderRadius: normalize(99),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: normalize(50),
  },
  continueBtnText: {
    fontSize: normalize(15),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(18),
    paddingBottom: normalize(30),
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
  },
  sheetTitle: {
    fontSize: normalize(16),
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
  },
  modalItemActive: {
    backgroundColor: '#EDF5FD',
  },
  modalItemText: {
    fontSize: normalize(13.5),
    color: colors.typographyColor.Medium || "#003CA3"
  },
});
