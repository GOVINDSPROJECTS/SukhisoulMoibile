import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { FcDropdown } from '../components/FcDropdown';
import { useFamilyCareStore } from '../store/useFamilyCareStore';
import type { NavigationProp } from '@navigation/types';

// ─── Static options ───────────────────────────────────────────────────────────

const FAMILY_CARE_REASONS = [
  'Improve Family Communication',
  'Manage Anxiety or Stress',
  'Deal with Grief or Loss',
  'Relationship Conflicts',
  'Other',
];

const THERAPY_HISTORY_OPTIONS = ['Yes', 'No', "I'm not sure"] as const;
type TherapyHistoryOption = (typeof THERAPY_HISTORY_OPTIONS)[number];

// ─── Validation ───────────────────────────────────────────────────────────────

interface FormErrors {
  selectedReason?: string;
  therapyHistory?: string;
  therapistNote?: string;
}

function validate(
  selectedReason: string | null,
  therapyHistory: TherapyHistoryOption | null,
  therapistNote: string,
): FormErrors {
  const errors: FormErrors = {};

  if (!selectedReason) {
    errors.selectedReason = 'Please select a reason';
  }
  if (!therapyHistory) {
    errors.therapyHistory = 'Please select an option';
  }
  if (!therapistNote.trim()) {
    errors.therapistNote = 'Please add a note for the therapist';
  }

  return errors;
}

// ─── Sub-component ────────────────────────────────────────────────────────────

interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioRow: React.FC<RadioRowProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.75}
    onPress={onPress}
    style={[styles.radioRow, selected && styles.radioRowActive]}
  >
    <AppText
      variant="caption"
      weight={selected ? 'semiBold' : 'regular'}
      style={[styles.radioLabel, selected && styles.radioLabelActive]}
    >
      {label}
    </AppText>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export const FcTherapyInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { borderRadius } = useTheme();

  const storedInfo = useFamilyCareStore((state) => state.dependentInfo);
  const setDependentTherapyInfo = useFamilyCareStore((state) => state.setDependentTherapyInfo);

  const [selectedReason, setSelectedReason] = useState<string | null>(
    storedInfo.therapyReason || null,
  );
  const [therapyHistory, setTherapyHistory] = useState<TherapyHistoryOption | null>(
    (storedInfo.therapyHistory as TherapyHistoryOption) || null,
  );
  const [therapistNote, setTherapistNote] = useState(storedInfo.therapistNote || '');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleContinue = useCallback(() => {
    const newErrors = validate(selectedReason, therapyHistory, therapistNote);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setDependentTherapyInfo({
      therapyReason: selectedReason || '',
      therapyHistory: therapyHistory || '',
      therapistNote: therapistNote.trim(),
    });
    navigation.navigate('FcSelectTherapist');
  }, [navigation, selectedReason, therapyHistory, therapistNote, setDependentTherapyInfo]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>
        <AppText variant="h4" weight="extraBold" style={styles.headerTitle}>
          Family Care
        </AppText>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Reason dropdown ─────────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={styles.questionLabel}>
          What brings them to Family Care
        </AppText>
        <FcDropdown
          options={FAMILY_CARE_REASONS}
          value={selectedReason}
          onChange={(val) => {
            setSelectedReason(val);
            if (errors.selectedReason) setErrors((prev) => ({ ...prev, selectedReason: undefined }));
          }}
          placeholder="Select a reason"
          hasError={!!errors.selectedReason}
          errorMessage={errors.selectedReason}
        />

        {/* ── Therapy history ─────────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={[styles.questionLabel, { marginTop: normalize(8) }]}>
          Have they attended Therapy before?
        </AppText>
        {THERAPY_HISTORY_OPTIONS.map((opt) => (
          <RadioRow
            key={opt}
            label={opt}
            selected={therapyHistory === opt}
            onPress={() => {
              setTherapyHistory(opt);
              if (errors.therapyHistory) setErrors((prev) => ({ ...prev, therapyHistory: undefined }));
            }}
          />
        ))}
        {errors.therapyHistory ? (
          <AppText variant="caption" weight="regular" style={[styles.errorText, { marginTop: normalize(-4), marginBottom: normalize(8) }]}>
            {errors.therapyHistory}
          </AppText>
        ) : null}

        {/* ── Therapist note ──────────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={[styles.questionLabel, { marginTop: normalize(8) }]}>
          Is there anything you'd like the Therapist to know about your dynamic with them?
        </AppText>
        <View style={styles.fieldWrapper}>
          <TextInput
            style={[
              styles.textArea,
              { borderRadius: borderRadius.m },
              errors.therapistNote ? styles.textAreaError : null,
            ]}
            placeholder="Please type here"
            placeholderTextColor={colors.typographyColor.Medium}
            multiline
            numberOfLines={5}
            value={therapistNote}
            onChangeText={(t) => {
              setTherapistNote(t);
              if (errors.therapistNote) setErrors((prev) => ({ ...prev, therapistNote: undefined }));
            }}
            textAlignVertical="top"
          />
          {errors.therapistNote ? (
            <AppText variant="caption" weight="regular" style={styles.errorText}>
              {errors.therapistNote}
            </AppText>
          ) : null}
        </View>

        {/* ── Privacy note ────────────────────────────────────────────── */}
        <View style={[styles.privacyRow, { borderRadius: borderRadius.m }]}>
          <Shield size={normalize(16)} color={colors.blue[600]} />
          <AppText variant="caption" weight="regular" style={styles.privacyText}>
            Your feedback is private and used only to personalize your therapist matching experience.
          </AppText>
        </View>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <CommonContinueButton label="Continue" onPress={handleContinue} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
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
  headerSpacer: {
    width: normalize(36),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(40),
  },
  questionLabel: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(12),
    marginBottom: normalize(11),
    marginTop: normalize(13),
    textAlign: 'center',
  },
  // Radio rows
  radioRow: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(14),
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    borderRadius: normalize(12),
    marginBottom: normalize(8),
  },
  radioRowActive: {
    backgroundColor: colors.blue[50],
    borderColor: colors.tintsGrey[200],
  },
  radioLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  radioLabelActive: {
    color: colors.lightAppTheme[950],
  },
  // Field wrapper
  fieldWrapper: {
    marginBottom: normalize(12),
  },
  // Textarea
  textArea: {
    minHeight: normalize(130),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(14),
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    borderRadius: normalize(12),
    fontWeight: '400',
  },
  textAreaError: {
    borderColor: '#FF3B30',
  },
  // Privacy
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    backgroundColor: colors.blue[50],
    padding: normalize(16),
    paddingHorizontal: normalize(22),
    marginTop: normalize(12),
    borderWidth: normalize(1),
    borderColor: colors.blue[100]
  },
  privacyText: {
    flex: 1,
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    lineHeight: normalize(17),
  },
  // Errors
  errorText: {
    color: '#FF3B30',
    fontSize: normalize(11),
    marginTop: normalize(4),
    marginLeft: normalize(2),
  },
});
