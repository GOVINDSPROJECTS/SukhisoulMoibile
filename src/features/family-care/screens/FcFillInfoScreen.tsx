import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Camera, HardDriveUpload, Shield, ShieldCheck, Upload, UploadCloud } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppText } from '@components/atoms/AppText';
import { CommonContinueButton } from '@components/atoms/CommonContinueButton';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import { FcDropdown } from '../components/FcDropdown';
import type { NavigationProp } from '@navigation/types';

// ─── Static options ───────────────────────────────────────────────────────────

const RELATION_OPTIONS = ['Sibling', 'Parent', 'Child', 'Spouse', 'Friend'];

const HEALTH_OPTIONS = ['Yes', 'No', "I'm not sure"] as const;
type HealthOption = (typeof HEALTH_OPTIONS)[number];

const THERAPY_REASON_OPTIONS = [
  'Feel more supported',
  'Improve Family Communication',
  'Manage Anxiety or Stress',
  'Deal with Grief or Loss',
  'Other',
];

// ─── Validation ───────────────────────────────────────────────────────────────

interface FormErrors {
  profilePic?: string;
  name?: string;
  age?: string;
  relation?: string;
  healthIssue?: string;
  therapyReason?: string;
}

function validate(
  profilePic: string | null,
  name: string,
  age: string,
  relation: string | null,
  healthIssue: HealthOption | null,
  therapyReason: string | null,
): FormErrors {
  const errors: FormErrors = {};

  if (!profilePic) {
    errors.profilePic = 'Please add a profile picture';
  }
  if (!name.trim()) {
    errors.name = 'Name is required';
  }
  if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
    errors.age = 'Please enter a valid age';
  }
  if (!relation) {
    errors.relation = 'Please select a relation';
  }
  if (!healthIssue) {
    errors.healthIssue = 'Please select an option';
  }
  if (!therapyReason) {
    errors.therapyReason = 'Please select a reason';
  }

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  hasError?: boolean;
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

export const FcFillInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { borderRadius } = useTheme();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState<string | null>(null);
  const [healthIssue, setHealthIssue] = useState<HealthOption | null>(null);
  const [therapyReason, setTherapyReason] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Profile picture picker ─────────────────────────────────────────────────
  const handlePickImage = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
          setProfilePic(response.assets[0].uri);
          setErrors((prev) => ({ ...prev, profilePic: undefined }));
        }
      },
    );
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleContinue = useCallback(() => {
    const newErrors = validate(profilePic, name, age, relation, healthIssue, therapyReason);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigation.navigate('FcTherapyInfo');
  }, [navigation, profilePic, name, age, relation, healthIssue, therapyReason]);

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
        <AppText variant="h4" weight="semiBold" style={styles.headerTitle}>
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
        {/* Section heading */}
        <AppText variant="h4" weight="extraBold" style={styles.sectionHeading}>
          Fill Information
        </AppText>

        {/* ── Profile picture ─────────────────────────────────────────── */}
        <View style={styles.avatarWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePickImage}
            style={[
              styles.avatarCircle,
              { borderRadius: normalize(60) },
              errors.profilePic ? styles.avatarCircleError : null,
            ]}
          >
            {profilePic ? (
              <Image
                source={{ uri: profilePic }}
                style={[styles.avatarImage, { borderRadius: normalize(60) }]}
                resizeMode="cover"
              />
            ) : (
              <Camera size={normalize(28)} color={colors.tintsGrey[500]} />
            )}
          </TouchableOpacity>
          <AppText variant="caption" weight="semiBold" style={styles.avatarLabel}>
            {profilePic ? 'Tap to change picture' : 'Add a profile picture'}
          </AppText>
          {errors.profilePic ? (
            <AppText variant="caption" weight="regular" style={styles.errorText}>
              {errors.profilePic}
            </AppText>
          ) : null}
        </View>

        {/* ── Name input ──────────────────────────────────────────────── */}
        <View style={styles.fieldWrapper}>
          <TextInput
            style={[
              styles.input,
              errors.name ? styles.inputError : null,
            ]}
            placeholder="Name of the family member"
            placeholderTextColor={colors.typographyColor.Medium}
            value={name}
            onChangeText={(t) => {
              setName(t);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name ? (
            <AppText variant="caption" weight="regular" style={styles.errorText}>
              {errors.name}
            </AppText>
          ) : null}
        </View>

        {/* ── Age input ───────────────────────────────────────────────── */}
        <View style={styles.fieldWrapper}>
          <TextInput
            style={[
              styles.input,
              errors.age ? styles.inputError : null,
            ]}
            placeholder="Age"
            placeholderTextColor={colors.typographyColor.Medium}
            keyboardType="numeric"
            value={age}
            onChangeText={(t) => {
              setAge(t);
              if (errors.age) setErrors((prev) => ({ ...prev, age: undefined }));
            }}
          />
          {errors.age ? (
            <AppText variant="caption" weight="regular" style={styles.errorText}>
              {errors.age}
            </AppText>
          ) : null}
        </View>

        {/* ── Relation dropdown ───────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={styles.questionLabel}>
          What is your relation with this person?
        </AppText>
        <FcDropdown
          options={RELATION_OPTIONS}
          value={relation}
          onChange={(val) => {
            setRelation(val);
            if (errors.relation) setErrors((prev) => ({ ...prev, relation: undefined }));
          }}
          placeholder="Select relation"
          hasError={!!errors.relation}
          errorMessage={errors.relation}
        />

        {/* ── Health issues ───────────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={styles.questionLabel}>
          Do they have any Health issues?
        </AppText>
        {HEALTH_OPTIONS.map((opt) => (
          <RadioRow
            key={opt}
            label={opt}
            selected={healthIssue === opt}
            onPress={() => {
              setHealthIssue(opt);
              if (errors.healthIssue) setErrors((prev) => ({ ...prev, healthIssue: undefined }));
            }}
          />
        ))}
        {errors.healthIssue ? (
          <AppText variant="caption" weight="regular" style={[styles.errorText, styles.errorTopSpacing]}>
            {errors.healthIssue}
          </AppText>
        ) : null}

        {/* ── Therapy reason ──────────────────────────────────────────── */}
        <AppText variant="caption" weight="semiBold" style={[styles.questionLabel, { marginTop: normalize(8) }]}>
          Why do you want them to take Therapy?
        </AppText>
        <FcDropdown
          options={THERAPY_REASON_OPTIONS}
          value={therapyReason}
          onChange={(val) => {
            setTherapyReason(val);
            if (errors.therapyReason) setErrors((prev) => ({ ...prev, therapyReason: undefined }));
          }}
          placeholder="Select a reason"
          hasError={!!errors.therapyReason}
          errorMessage={errors.therapyReason}
        />

        {/* ── Privacy note ────────────────────────────────────────────── */}
        <View style={[styles.privacyRow, { borderRadius: borderRadius.m }]}>
          <ShieldCheck size={normalize(17)} color={colors.typographyColor['Dark 2']} />
          <AppText variant="caption" weight="medium" style={styles.privacyText}>
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
    backgroundColor: "#FFFFFF",
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
  sectionHeading: {
    fontSize: normalize(18),
    color: colors.typographyColor.Dark,
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  // Avatar
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  avatarCircle: {
    width: normalize(90),
    height: normalize(90),
    backgroundColor: colors.appThemeColor[50],
    borderWidth: 2,
    borderColor: colors.tintsGrey[400],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarCircleError: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  avatarImage: {
    width: normalize(90),
    height: normalize(90),
  },
  avatarLabel: {
    marginTop: normalize(8),
    color: colors.tintsGrey[600],
    fontSize: normalize(12),
  },
  // Field wrapper
  fieldWrapper: {
    marginBottom: normalize(12),
  },
  // Inputs
  input: {
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
  inputError: {
    borderColor: '#FF3B30',
  },
  // Question labels
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
  errorTopSpacing: {
    marginTop: normalize(-4),
    marginBottom: normalize(8),
  },
});
