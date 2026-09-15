import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Info, ChevronDown, Check, InfoIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const REASONS_LIST = [
  'Found another platform',
  'Not enough client requests',
  'Pricing or platform commission',
  'Technical difficulties or bugs',
  'Taking a break from practice',
  'Moving away or closing practice',
  'Other',
];

const TENURE_OPTIONS = [
  'Less than 3 months',
  '3 - 6 months',
  '6 months - 1 year',
  '1 year or more',
];

const RATINGS = [1, 2, 3, 4, 5];

export const DeleteAccountFeedbackScreenProf: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [selectedReason, setSelectedReason] = useState<string>('');
  const [reasonDropdownVisible, setReasonDropdownVisible] = useState(false);

  const [selectedTenure, setSelectedTenure] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(4); // Default 4 as shown in screenshot
  const [betterFeedback, setBetterFeedback] = useState<string>('');
  const [additionalFeedback, setAdditionalFeedback] = useState<string>('');

  const handleContinue = () => {
    navigation.navigate('DeleteAccountTermsScreen');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Delete Account
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Form Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Main Heading & Subtitle */}
        <AppText family="primary" weight="bold" style={styles.pageHeading}>
          Help Us Understand
        </AppText>
        <AppText family="primary" weight="regular" style={styles.pageSubtitle}>
          Your feedback helps us improve and serve you better. Why are you leaving?
        </AppText>

        {/* Why we ask Info Card */}
        <View style={styles.whyWeAskCard}>
          <View style={styles.infoCircle}>
            <Info size={normalize(27)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <View style={styles.whyWeAskTextCol}>
            <AppText family="primary" weight="bold" style={styles.whyWeAskTitle}>
              Why we ask
            </AppText>
            <AppText family="primary" weight="regular" style={styles.whyWeAskDesc}>
              We value your contribution to our community. Understanding your reasons helps us refine our tools for other therapists.
            </AppText>
          </View>
        </View>

        {/* Question 1: Primary Reason */}
        <View style={styles.questionSection}>
          <AppText family="primary" weight="bold" style={styles.questionTitle}>
            1. What is the primary reason for leaving?
          </AppText>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => setReasonDropdownVisible(true)}
            activeOpacity={0.7}
          >
            <AppText
              family="primary"
              weight="medium"
              style={[
                styles.dropdownValueText,
                !selectedReason && styles.dropdownPlaceholderText,
              ]}
            >
              {selectedReason || 'Select a reason'}
            </AppText>
            <ChevronDown size={normalize(16)} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Question 2: Tenure Radio Options */}
        <View style={styles.questionSection}>
          <AppText family="primary" weight="bold" style={styles.questionTitle}>
            2. How long have you been using SukhiSoul?
          </AppText>
          {TENURE_OPTIONS.map((option) => {
            const isSelected = selectedTenure === option;
            return (
              <TouchableOpacity
                key={option}
                style={styles.radioOptionRow}
                onPress={() => setSelectedTenure(option)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioInnerDot} />}
                </View>
                <AppText family="primary" weight="medium" style={styles.radioOptionText}>
                  {option}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Question 3: Rating (1 - 5) */}
        <View style={styles.questionSection}>
          <AppText family="primary" weight="bold" style={styles.questionTitle}>
            3. How would you rate your overall experience?
          </AppText>
          <View style={styles.ratingRow}>
            {RATINGS.map((rating) => {
              const isSelected = selectedRating === rating;
              return (
                <TouchableOpacity
                  key={rating}
                  style={[styles.ratingBox, isSelected && styles.ratingBoxActive]}
                  onPress={() => setSelectedRating(rating)}
                  activeOpacity={0.7}
                >
                  <AppText
                    family="primary"
                    weight="bold"
                    style={[styles.ratingText, isSelected && styles.ratingTextActive]}
                  >
                    {rating}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.ratingLabelsRow}>
            <AppText family="primary" weight="bold" style={styles.ratingSubLabel}>
              POOR
            </AppText>
            <AppText family="primary" weight="bold" style={styles.ratingSubLabel}>
              EXCELLENT
            </AppText>
          </View>
        </View>

        {/* Question 4: What could we have done better */}
        <View style={styles.questionSection}>
          <AppText family="primary" weight="bold" style={styles.questionTitle}>
            4. What could we have done better?
          </AppText>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textAreaInput}
              multiline={true}
              placeholder="Type your answer here..."
              placeholderTextColor="#94A3B8"
              maxLength={1000}
              value={betterFeedback}
              onChangeText={setBetterFeedback}
              textAlignVertical="top"
            />
            <AppText family="primary" weight="regular" style={styles.charCounter}>
              {betterFeedback.length}/1000
            </AppText>
          </View>
        </View>

        {/* Question 5: Anything else */}
        <View style={styles.questionSection}>
          <AppText family="primary" weight="bold" style={styles.questionTitle}>
            5. Is there anything else you would like us to know?
          </AppText>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textAreaInput}
              multiline={true}
              placeholder="Type your answer here..."
              placeholderTextColor="#94A3B8"
              maxLength={1000}
              value={additionalFeedback}
              onChangeText={setAdditionalFeedback}
              textAlignVertical="top"
            />
            <AppText family="primary" weight="regular" style={styles.charCounter}>
              {additionalFeedback.length}/1000
            </AppText>
          </View>
        </View>

        {/* Bottom Actions Row */}
        <View style={styles.bottomActionsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <AppText family="primary" weight="bold" style={styles.cancelButtonText}>
              Cancel
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, }}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.continueButton]}
            >
              <AppText family="primary" weight="bold" style={styles.continueButtonText}>
                Continue
              </AppText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reason Dropdown Modal */}
      <Modal
        visible={reasonDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReasonDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setReasonDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdownModalCard}>
                <AppText family="primary" weight="bold" style={styles.dropdownModalTitle}>
                  Select Primary Reason
                </AppText>
                {REASONS_LIST.map((reason, idx) => {
                  const isSel = selectedReason === reason;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.dropdownItemRow,
                        idx === REASONS_LIST.length - 1 && { borderBottomWidth: 0 },
                      ]}
                      onPress={() => {
                        setSelectedReason(reason);
                        setReasonDropdownVisible(false);
                      }}
                    >
                      <AppText
                        family="primary"
                        weight={isSel ? 'bold' : 'medium'}
                        style={[
                          styles.dropdownItemText,
                          isSel && styles.dropdownItemTextActive,
                        ]}
                      >
                        {reason}
                      </AppText>
                      {isSel && <Check size={normalize(16)} color="#2563EB" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(32),
  },
  pageHeading: {
    fontSize: normalize(21),
    color: '#0F172A',
    marginBottom: normalize(4),
  },
  pageSubtitle: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(18),
    marginBottom: normalize(18),
  },
  whyWeAskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderRadius: normalize(14),
    padding: normalize(14),
    marginBottom: normalize(22),
    borderWidth: normalize(1),
    borderColor: '#DBEAFE'
  },
  infoCircle: {
    width: normalize(26),
    height: normalize(26),
    borderRadius: normalize(13),
    backgroundColor: colors.lightAppTheme[700],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
    marginTop: 2,
  },
  whyWeAskTextCol: {
    flex: 1,
  },
  whyWeAskTitle: {
    fontSize: normalize(13),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  whyWeAskDesc: {
    fontSize: normalize(11),
    color: '#475569',
    lineHeight: normalize(16),
  },
  questionSection: {
    marginBottom: normalize(26),
  },
  questionTitle: {
    fontSize: normalize(12.5),
    color: '#1E293B',
    marginBottom: normalize(10),
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.appThemeColor[100],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  dropdownValueText: {
    fontSize: normalize(12),
    color: '#1E293B',
  },
  dropdownPlaceholderText: {
    color: colors.typographyColor.Medium,
  },
  radioOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.appThemeColor[100],
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginBottom: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  radioCircle: {
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    borderWidth: 1.5,
    borderColor: colors.appThemeColor[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  radioCircleSelected: {
    borderColor: '#2563EB',
  },
  radioInnerDot: {
    width: normalize(9),
    height: normalize(9),
    borderRadius: normalize(4.5),
    backgroundColor: colors.typographyColor['Dark 2'],
  },
  radioOptionText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Light,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(4),
  },
  ratingBox: {
    flex: 1,
    marginHorizontal: normalize(4),
    aspectRatio: 1,
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: colors.appThemeColor[100],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  ratingBoxActive: {
    backgroundColor: '#0047AB',
    borderColor: '#0047AB',
  },
  ratingText: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  ratingTextActive: {
    color: '#FFFFFF',
  },
  ratingLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(6),
    marginTop: normalize(4),
  },
  ratingSubLabel: {
    fontSize: normalize(8.5),
    color: colors.typographyColor.Light,
    letterSpacing: 0.4,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(10),
    padding: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  textAreaInput: {
    fontSize: normalize(12),
    color: '#1E293B',
    minHeight: normalize(75),
    padding: 0,
    marginBottom: normalize(4),
  },
  charCounter: {
    fontSize: normalize(9.5),
    color: colors.typographyColor.Medium,
    textAlign: 'right',
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: normalize(16),
    marginTop: normalize(8),
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: normalize(8),
  },
  cancelButtonText: {
    fontSize: normalize(13.5),
    color: '#334155',
  },
  continueButton: {

    backgroundColor: '#1D64B5',
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(8),
  },
  continueButtonText: {
    fontSize: normalize(13.5),
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
  },
  dropdownModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  dropdownModalTitle: {
    fontSize: normalize(14),
    color: '#0F172A',
    marginBottom: normalize(14),
  },
  dropdownItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownItemText: {
    fontSize: normalize(12.5),
    color: '#334155',
  },
  dropdownItemTextActive: {
    color: colors.typographyColor['Dark 2'],
  },
});
