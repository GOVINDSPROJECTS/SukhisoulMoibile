import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Switch } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, User, Calendar, Clock, ChevronDown, Repeat, Info, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const NewClientSessionConfigScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [sessionType, setSessionType] = useState('Initial Consultation (60 min)');
  const [duration, setDuration] = useState('60 min');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const Label = ({ text, rightText }: { text: string, rightText?: string }) => (
    <View style={styles.labelRow}>
      <AppText family="primary" weight="semiBold" style={styles.labelText}>
        {text}
      </AppText>
      {rightText && (
        <AppText family="primary" weight="medium" style={styles.labelRightText}>
          {rightText}
        </AppText>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Header Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
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
            Dashboard
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
      >
        <LinearGradient
          colors={[
            colors.tintsBlue[400],
            colors.appThemeColor[75],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.1 }}
          style={styles.gradientBg}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.breadcrumbRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light }}>
                Dashboard
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light, marginHorizontal: normalize(4) }}>
                •
              </AppText>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700] }}>
                New Client
              </AppText>
            </View>

            <AppText family="primary" weight="black" style={{ fontSize: normalize(24), color: colors.typographyColor.Dark, marginTop: normalize(4) }}>
              Configure Onboarding
            </AppText>
          </View>

          {/* Client Summary Card */}
          <View style={styles.card}>
            <View style={styles.clientHeader}>
              <View style={styles.avatar}>
                <User size={normalize(24)} color="#FFFFFF" />
              </View>
              <View style={{ marginLeft: normalize(12) }}>
                <AppText family="primary" weight="bold" style={{ fontSize: normalize(16), color: colors.typographyColor.Dark }}>
                  Riya Mehta
                </AppText>
                <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.typographyColor.Medium }}>
                  New Patient Intake
                </AppText>
              </View>
            </View>

            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <AppText family="primary" weight="medium" style={styles.gridLabel}>Email</AppText>
                <AppText family="primary" weight="bold" style={styles.gridValue}>riya.mehta@email.com</AppText>
              </View>
              <View style={[styles.gridItem, { alignItems: 'flex-end' }]}>
                <AppText family="primary" weight="medium" style={styles.gridLabel}>Phone</AppText>
                <AppText family="primary" weight="bold" style={styles.gridValue}>+91 98765 43210</AppText>
              </View>
            </View>

            <View style={[styles.gridContainer, { marginTop: normalize(16) }]}>
              <View style={styles.gridItem}>
                <AppText family="primary" weight="medium" style={styles.gridLabel}>Date Added</AppText>
                <AppText family="primary" weight="bold" style={styles.gridValue}>24 Apr 2024</AppText>
              </View>
              <View style={[styles.gridItem, { alignItems: 'flex-end' }]}>
                <AppText family="primary" weight="medium" style={styles.gridLabel}>Added By</AppText>
                <AppText family="primary" weight="bold" style={styles.gridValue}>Dr. Clara Kapoor</AppText>
              </View>
            </View>
          </View>

          {/* Configuration Form Card */}
          <View style={styles.card}>
            <View style={styles.formHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.purple[50] }]}>
                <Calendar size={normalize(16)} color={colors.purple[700]} />
              </View>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark, marginLeft: normalize(12) }}>
                Initial Session Configuration
              </AppText>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="Session Type" />
              <TouchableOpacity style={styles.inputContainer} activeOpacity={0.7}>
                <AppText family="primary" weight="medium" style={styles.inputValue}>
                  {sessionType}
                </AppText>
                <ChevronDown size={normalize(16)} color={colors.typographyColor.Medium} />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="Duration" />
              <View style={styles.durationRow}>
                {['60 min', '45 min', '90 min'].map((dur) => (
                  <TouchableOpacity
                    key={dur}
                    style={[
                      styles.durationPill,
                      duration === dur ? { backgroundColor: colors.purple[700], borderColor: colors.purple[700] } : null
                    ]}
                    onPress={() => setDuration(dur)}
                    activeOpacity={0.7}
                  >
                    <AppText family="primary" weight="bold" style={[
                      styles.durationText,
                      duration === dur ? { color: '#FFFFFF' } : null
                    ]}>
                      {dur.split(' ')[0]}
                    </AppText>
                    <AppText family="primary" weight="medium" style={[
                      { fontSize: normalize(10), color: colors.typographyColor.Light, textAlign: 'center' },
                      duration === dur ? { color: '#E0E7FF' } : null
                    ]}>
                      {dur.split(' ')[1]}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="Session Date" />
              <View style={styles.inputContainer}>
                <Calendar size={normalize(16)} color={colors.typographyColor.Medium} style={{ marginRight: normalize(10) }} />
                <TextInput
                  style={styles.textInput}
                  value={date}
                  onChangeText={setDate}
                  placeholder="mm / dd / yyyy"
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="Session Time" />
              <View style={styles.inputContainer}>
                <Clock size={normalize(16)} color={colors.typographyColor.Medium} style={{ marginRight: normalize(10) }} />
                <TextInput
                  style={styles.textInput}
                  value={time}
                  onChangeText={setTime}
                  placeholder="-- : --"
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="Pre-session Notes (Confidential)" rightText="Optional" />
              <View style={[styles.inputContainer, { height: normalize(100), alignItems: 'flex-start', paddingTop: normalize(12) }]}>
                <TextInput
                  style={[styles.textInput, { textAlignVertical: 'top' }]}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  placeholder="Add any specific concerns or focus areas for the first intake session..."
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.recurringBox}>
              <View style={styles.recurringInfo}>
                <View style={[styles.iconBox, { backgroundColor: colors.purple[50], marginRight: normalize(12) }]}>
                  <Repeat size={normalize(16)} color={colors.purple[700]} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                    Recurring Session
                  </AppText>
                  <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Medium, marginTop: normalize(2) }}>
                    Automatically schedule future appointments
                  </AppText>
                </View>
              </View>
              <Switch
                value={isRecurring}
                onValueChange={setIsRecurring}
                trackColor={{ false: '#E2E8F0', true: colors.purple[200] }}
                thumbColor={isRecurring ? colors.purple[700] : '#FFFFFF'}
              />
            </View>

          </View>

          {/* Guidelines Banner */}
          <View style={styles.guidelinesBanner}>
            <View style={styles.guidelinesHeader}>
              <Info size={normalize(16)} color={colors.purple[700]} style={{ marginRight: normalize(8) }} />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.purple[700] }}>
                Therapist Guidelines
              </AppText>
            </View>
            <View style={styles.guidelineRow}>
              <CheckCircle2 size={normalize(12)} color={colors.purple[600]} style={styles.guidelineIcon} />
              <AppText family="primary" weight="medium" style={styles.guidelineText}>
                Ensure you have confirmed the patient's insurance eligibility before scheduling the first 60-minute intake.
              </AppText>
            </View>
            <View style={styles.guidelineRow}>
              <CheckCircle2 size={normalize(12)} color={colors.purple[600]} style={styles.guidelineIcon} />
              <AppText family="primary" weight="medium" style={styles.guidelineText}>
                Initial consultations are typically coded as CPT 90791 for behavioral health assessments.
              </AppText>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SessionCreatedStatus')}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF' }}>
              Continue to Billing
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            activeOpacity={0.7}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.purple[700] }}>
              Save Draft
            </AppText>
          </TouchableOpacity>

        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  headerGradient: { paddingBottom: normalize(12) },
  headerContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: normalize(20), paddingVertical: normalize(14),
  },
  backButton: { padding: normalize(4) },
  headerTitle: { fontSize: normalize(15), color: '#155B92' },
  headerRight: { width: normalize(24) },
  scrollContent: {
  },
  gradientBg: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },


  titleSection: { marginBottom: normalize(20) },
  breadcrumbRow: { flexDirection: 'row', alignItems: 'center' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    marginBottom: normalize(16),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },

  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
  },
  gridLabel: {
    fontSize: normalize(9),
    color: colors.typographyColor.Light,
    marginBottom: normalize(4),
  },
  gridValue: {
    fontSize: normalize(11),
    color: colors.appThemeColor[800],
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  iconBox: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  fieldGroup: { marginBottom: normalize(16) },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  labelText: {
    fontSize: normalize(10), color: colors.typographyColor.Light,
  },
  labelRightText: {
    fontSize: normalize(10), color: colors.typographyColor.Light,
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E8ECEF',
    borderRadius: normalize(8),
    height: normalize(48), paddingHorizontal: normalize(14),
  },
  textInput: {
    flex: 1, fontFamily: 'Outfit-Medium', fontSize: normalize(13), color: colors.appThemeColor[800],
    padding: 0,
  },
  inputValue: {
    fontSize: normalize(13), color: colors.appThemeColor[800],
  },

  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: normalize(12),
  },
  durationPill: {
    flex: 1,
    height: normalize(60),
    borderWidth: 1,
    borderColor: '#E8ECEF',
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: normalize(16),
    color: colors.appThemeColor[800],
    marginBottom: normalize(2),
  },

  recurringBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: normalize(16),
    borderRadius: normalize(12),
    marginTop: normalize(8),
  },
  recurringInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  guidelinesBanner: {
    backgroundColor: '#EFF6FF',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(24),
  },
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(8),
  },
  guidelineIcon: {
    marginTop: normalize(2),
    marginRight: normalize(8),
  },
  guidelineText: {
    flex: 1,
    fontSize: normalize(11),
    lineHeight: normalize(16),
    color: '#1E293B',
  },

  primaryBtn: {
    alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16),
    marginBottom: normalize(12),
  },
  secondaryBtn: {
    alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16),
    backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E8ECEF',
  }
});
