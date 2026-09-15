import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { AppButton } from '@components/atoms/AppButton';
import { normalize } from '@utils/responsive';
import { colors, typography } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { ArrowLeft, ShieldCheck, ChevronDown, Lock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CommonContinueButton } from '@/components/atoms/CommonContinueButton';

export const ReportIssueScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.8}
          >
            <ArrowLeft size={normalize(22)} color={colors.blue[800]} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText variant="body" family="secondary" weight="semiBold" style={styles.title}>
            Support
          </AppText>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + normalize(40) }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Card 1: Report a Concern */}
          <View style={styles.card}>
            <View style={styles.infoSection}>
              <View style={styles.shieldIcon}>
                <ShieldCheck size={normalize(26)} color={colors.green[500]} />
              </View>
              <View style={styles.infoTextContainer}>
                <AppText style={styles.infoTitle} weight="extraBold">Report a Concern</AppText>
                <AppText style={styles.infoSub} weight="regular">Your safety and comfort are our priority.</AppText>
              </View>
            </View>
            <AppText style={styles.infoDescription} weight="regular">
              We are committed to providing a safe, professional environment. Every report is reviewed by our clinical compliance team within 24 hours. Your feedback helps us maintain the highest standards of care.
            </AppText>
          </View>

          {/* Card 2: Form */}
          <View style={styles.card}>
            <View style={styles.formSection}>
              <AppText style={styles.label} weight="extraBold">Issue Type</AppText>
              <TouchableOpacity style={styles.dropdown}>
                <AppText style={styles.dropdownText} weight="regular">Select the nature of your concern</AppText>
                <ChevronDown size={normalize(20)} color={colors.tintsGrey[400]} />
              </TouchableOpacity>

              <AppText style={styles.label} weight="extraBold">Description</AppText>
              <View style={styles.textareaWrapper}>
                <TextInput
                  style={styles.textarea}
                  placeholder="Please provide details about what happened..."
                  placeholderTextColor={"#6B7280"}
                  multiline
                  value={description}
                  onChangeText={setDescription}
                  maxLength={500}
                />
                <AppText style={styles.charCount} weight="regular">{description.length}/500</AppText>
              </View>

              <View style={styles.anonymousContainer}>
                <View style={styles.anonymousLeft}>
                  <View style={styles.lockIconContainer}>
                    <Lock size={normalize(18)} color={colors.blue[500]} />
                  </View>
                  <View>
                    <AppText style={styles.anonymousTitle} weight="extraBold">Anonymous Submission</AppText>
                    <AppText style={styles.anonymousSub} weight="regular">Hide your identity from the provider</AppText>
                  </View>
                </View>
                <Switch
                  value={isAnonymous}
                  onValueChange={setIsAnonymous}
                  trackColor={{ false: colors.tintsGrey[200], true: colors.blue[500] }}
                  thumbColor="#FFFFFF"
                  style={styles.switch}
                />
              </View>
            </View>
          </View>

          <View style={styles.submitBtn}>
            <CommonContinueButton
              label="Submit Concern"
              onPress={() => navigation.navigate('ReportIssueSuccess')}
            />
          </View>

          <View style={styles.footerPrivacy}>
            <View style={styles.lockIconContainerLight}>
              <Lock size={normalize(16)} color={colors.blue[400]} />
            </View>
            <View style={styles.privacyTextContainer}>
              <AppText style={styles.privacyTitle} weight="extraBold">Your privacy matters</AppText>
              <AppText style={styles.privacySub} weight="regular">All reports are confidential and securely handled. We're here to support you.</AppText>
            </View>
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
  keyboardView: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
  },
  backBtn: {
    padding: normalize(4),
  },
  title: {
    color: colors.blue[600],
    fontSize: normalize(16),
  },
  placeholder: {
    width: normalize(30),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: normalize(18),
    color: colors.blue[700],
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: normalize(35),
    padding: normalize(25),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(24),
    marginBottom: normalize(20),
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  shieldIcon: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(16),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: normalize(18),
    color: "#1E293B",
    marginBottom: normalize(4),
  },
  infoSub: {
    fontSize: normalize(12),
    color: "#64748B",
  },
  infoDescription: {
    fontSize: normalize(12),
    color: "#475569",
    lineHeight: normalize(22),
  },
  formSection: {
  },
  label: {
    fontSize: normalize(14),
    color: "#1E293B",
    marginBottom: normalize(8),
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: normalize(12),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    marginBottom: normalize(24),
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: normalize(13),
    color: "#64748B",
  },
  textareaWrapper: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: normalize(16),
    backgroundColor: '#FFFFFF',
    padding: normalize(16),
    height: normalize(140),
    marginBottom: normalize(24),
    paddingTop: normalize(8),
  },
  textarea: {
    flex: 1,
    fontSize: normalize(13),
    fontFamily: typography.fontFamily.primary.regular,
    color: "#1E293B",
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: normalize(12),
    color: "#94A3B8",
    textAlign: 'right',
    marginTop: normalize(8),
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(235,242,255,0.3)',
    borderRadius: normalize(16),
    padding: normalize(16),
  },
  anonymousLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: normalize(40),
  },
  lockIconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  anonymousTitle: {
    fontSize: normalize(12),
    color: "#1E293B",
    marginBottom: normalize(2),
  },
  anonymousSub: {
    fontSize: normalize(11.5),
    color: "#64748B",
  },
  submitBtn: {
    borderRadius: normalize(99),
    marginBottom: normalize(30),
  },
  switch: {
    position: 'relative',
    right: normalize(-10),
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]

  },
  footerPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: normalize(1),
    borderColor: "#EBF2FF"
  },
  lockIconContainerLight: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(59,130,246,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: normalize(14),
    color: "#1E293B",
    marginBottom: normalize(4),
  },
  privacySub: {
    fontSize: normalize(11),
    color: "#64748B",
    lineHeight: normalize(18),
  },
});
