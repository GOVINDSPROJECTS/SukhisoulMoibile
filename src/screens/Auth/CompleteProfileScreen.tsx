import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react-native';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { AuthButton } from './components/AuthButton';

export const CompleteProfileScreen = () => {
  const { colors, typography, borderRadius } = useTheme();
  const { user, completeProfile, isLoading } = useAuthStore();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // B2B detection state
  const [detectedOrg, setDetectedOrg] = useState<{
    name: string;
    type: 'school' | 'college' | 'company';
    badge: string;
  } | null>(null);

  useEffect(() => {
    if (!email || !email.includes('@')) {
      setDetectedOrg(null);
      return;
    }

    const domain = email.trim().split('@')[1]?.toLowerCase();
    if (domain === 'stanford.edu') {
      setDetectedOrg({
        name: 'Stanford University',
        type: 'college',
        badge: 'Stanford University Student Account',
      });
    } else if (domain === 'google.com') {
      setDetectedOrg({
        name: 'Google LLC',
        type: 'company',
        badge: 'Google LLC Employee Account',
      });
    } else {
      setDetectedOrg(null);
    }
  }, [email]);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await completeProfile({ name: trimmedName, email: trimmedEmail });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.primary[900], fontSize: typography.h2.fontSize, fontFamily: typography.fontFamily.secondary.medium }]}>
              Welcome! ✨
            </Text>
            <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
              Just a few more details to get you started on your journey.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted, fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.gray[50],
                    borderColor: isNameFocused ? colors.primary[500] : colors.gray[200],
                    borderRadius: borderRadius.m,
                    color: colors.text,
                    fontSize: typography.body1.fontSize,
                    fontFamily: typography.fontFamily.primary.medium,
                  },
                ]}
                placeholder="e.g. John Doe"
                placeholderTextColor={colors.gray[400]}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textMuted, fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
                Email Address
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.gray[50],
                    borderColor: isEmailFocused ? colors.primary[500] : colors.gray[200],
                    borderRadius: borderRadius.m,
                    color: colors.text,
                    fontSize: typography.body1.fontSize,
                    fontFamily: typography.fontFamily.primary.medium,
                  },
                ]}
                placeholder="e.g. john@example.com"
                placeholderTextColor={colors.gray[400]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>

            {/* B2B Dynamic Badge */}
            {detectedOrg && (
              <View
                style={[
                  styles.b2bBadge,
                  {
                    backgroundColor: colors.primary[50],
                    borderColor: colors.primary[200],
                    borderRadius: borderRadius.m,
                  },
                ]}
              >
                {detectedOrg.type === 'company' ? (
                  <Briefcase size={normalize(18)} color={colors.primary[500]} style={styles.badgeIcon} />
                ) : (
                  <GraduationCap size={normalize(18)} color={colors.primary[500]} style={styles.badgeIcon} />
                )}
                <View style={styles.badgeTextContainer}>
                  <Text style={[styles.badgeTitle, { color: colors.primary[800], fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium }]}>
                    Collaborated Account Detected
                  </Text>
                  <Text style={[styles.badgeSubtitle, { color: colors.primary[600], fontSize: typography.caption.fontSize - 1, fontFamily: typography.fontFamily.primary.medium }]}>
                    {detectedOrg.badge}
                  </Text>
                </View>
                <Sparkles size={normalize(16)} color={colors.accent} style={styles.badgeAccentIcon} />
              </View>
            )}

            {/* Submit Button */}
            <AuthButton
              title="Complete Profile"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!name || !email}
              style={styles.submitButton}
            />
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: normalize(24),
    justifyContent: 'center',
  },
  header: {
    marginBottom: normalize(32),
  },
  title: {
    fontWeight: '700',
    marginBottom: normalize(8),
  },
  subtitle: {
    lineHeight: normalize(24),
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: normalize(20),
  },
  label: {
    marginBottom: normalize(6),
    marginLeft: normalize(4),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: normalize(56),
    paddingHorizontal: normalize(16),
    borderWidth: 1.5,
  },
  b2bBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
    borderWidth: 1,
    marginTop: normalize(4),
    marginBottom: normalize(16),
  },
  badgeIcon: {
    marginRight: normalize(10),
  },
  badgeTextContainer: {
    flex: 1,
  },
  badgeTitle: {
    fontWeight: '700',
    marginBottom: normalize(2),
  },
  badgeSubtitle: {
    fontWeight: '500',
  },
  badgeAccentIcon: {
    marginLeft: normalize(6),
  },
  submitButton: {
    marginTop: normalize(12),
  },
});
