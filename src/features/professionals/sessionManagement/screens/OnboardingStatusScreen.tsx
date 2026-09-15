import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check, Clock, Download, FileText, ShieldCheck, HeadphonesIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const OnboardingStatusScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Header Gradient Block */}
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
        style={styles.scroll}
      ><LinearGradient
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
                Clients
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light, marginHorizontal: normalize(4) }}>
                ›
              </AppText>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700] }}>
                Sarah Jenkins
              </AppText>
            </View>

            <AppText family="primary" weight="bold" style={{ fontSize: normalize(20), color: '#444455', marginTop: normalize(8) }}>
              Onboarding Status
            </AppText>
          </View>

          {/* Profile Card */}
          <LinearGradient
            colors={['#7050A1', '#5B3D8A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?u=sarah' }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <AppText family="primary" weight="bold" style={styles.profileName}>
                  Sarah Jenkins
                </AppText>
                <AppText family="primary" weight="medium" style={styles.profileId}>
                  ID: #SJ-99231
                </AppText>
              </View>
            </View>
            <View style={styles.contactInfo}>
              <AppText family="primary" weight="medium" style={styles.contactText}>
                ✉ sarah.j@example.com
              </AppText>
              <AppText family="primary" weight="medium" style={styles.contactText}>
                📞 (555) 212-3456
              </AppText>
            </View>
          </LinearGradient>

          {/* Registration Milestone */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText family="primary" weight="bold" style={styles.cardTitle}>
                Registration Milestone
              </AppText>
              <View style={styles.milestoneBadge}>
                <AppText family="primary" weight="bold" style={styles.milestoneBadgeText}>
                  75% COMPLETE
                </AppText>
              </View>
            </View>

            <View style={styles.timeline}>
              {/* Step 1 */}
              <View style={styles.timelineStep}>
                <View style={styles.timelineIconContainer}>
                  <View style={styles.purpleCircle}>
                    <Check size={normalize(12)} color="#FFFFFF" />
                  </View>
                  <View style={styles.timelineLinePurple} />
                </View>
                <View style={styles.timelineContent}>
                  <AppText family="primary" weight="bold" style={styles.stepTitle}>Invite Sent</AppText>
                  <AppText family="primary" weight="medium" style={styles.stepDesc}>Invitation link sent to sarah.j@example.com on Oct 24, 2023.</AppText>
                  <AppText family="primary" weight="bold" style={styles.stepTimePurple}>SENT 2 DAYS AGO</AppText>
                </View>
              </View>

              {/* Step 2 */}
              <View style={styles.timelineStep}>
                <View style={styles.timelineIconContainer}>
                  <View style={styles.purpleCircle}>
                    <Check size={normalize(12)} color="#FFFFFF" />
                  </View>
                  <View style={styles.timelineLinePurple} />
                </View>
                <View style={styles.timelineContent}>
                  <AppText family="primary" weight="bold" style={styles.stepTitle}>Invite Opened</AppText>
                  <AppText family="primary" weight="medium" style={styles.stepDesc}>The patient successfully accessed the secure onboarding portal.</AppText>
                  <AppText family="primary" weight="bold" style={styles.stepTimePurple}>OPENED YESTERDAY AT 2:14 PM</AppText>
                </View>
              </View>

              {/* Step 3 */}
              <View style={styles.timelineStep}>
                <View style={styles.timelineIconContainer}>
                  <View style={styles.purpleCircle}>
                    <Check size={normalize(12)} color="#FFFFFF" />
                  </View>
                  <View style={styles.timelineLineGray} />
                </View>
                <View style={styles.timelineContent}>
                  <AppText family="primary" weight="bold" style={styles.stepTitle}>Details Submitted</AppText>
                  <AppText family="primary" weight="medium" style={styles.stepDesc}>Intake forms, medical history, and insurance details are verified.</AppText>
                  <AppText family="primary" weight="bold" style={styles.stepTimePurple}>VERIFIED 4 HOURS AGO</AppText>
                </View>
              </View>

              {/* Step 4 */}
              <View style={styles.timelineStep}>
                <View style={styles.timelineIconContainer}>
                  <View style={styles.grayCircle}>
                    <Clock size={normalize(12)} color="#A0AAB5" />
                  </View>
                  <View style={styles.timelineLineGray} />
                </View>
                <View style={styles.timelineContent}>
                  <AppText family="primary" weight="bold" style={styles.stepTitleGray}>Payment Pending</AppText>
                  <AppText family="primary" weight="medium" style={styles.stepDescGray}>Waiting for the client to complete the payment.</AppText>
                </View>
              </View>

              {/* Step 5 */}
              <View style={[styles.timelineStep, { marginBottom: 0 }]}>
                <View style={styles.timelineIconContainer}>
                  <View style={styles.grayCircle}>
                    <Check size={normalize(12)} color="#A0AAB5" />
                  </View>
                </View>
                <View style={styles.timelineContent}>
                  <AppText family="primary" weight="bold" style={styles.stepTitleGray}>Ready to Join</AppText>
                  <AppText family="primary" weight="medium" style={styles.stepDescGray}>Waiting for final confirmation from the patient's mobile app...</AppText>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.card}>
            <AppText family="primary" weight="bold" style={styles.cardTitleMargin}>
              Recent Activity
            </AppText>

            <View style={styles.activityItem}>
              <View style={styles.bulletPoint} />
              <View style={styles.activityContent}>
                <AppText family="primary" weight="bold" style={styles.activityTitle}>Insurance Validated</AppText>
                <AppText family="primary" weight="medium" style={styles.activityDesc}>BlueShield PPO #19321</AppText>
                <AppText family="primary" weight="medium" style={styles.activityTime}>Today, 10:45 AM</AppText>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.bulletPoint} />
              <View style={styles.activityContent}>
                <AppText family="primary" weight="bold" style={styles.activityTitle}>Documents Signed</AppText>
                <AppText family="primary" weight="medium" style={styles.activityDesc}>Privacy Policy, HIPAA Consent</AppText>
                <AppText family="primary" weight="medium" style={styles.activityTime}>Today, 09:12 AM</AppText>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.bulletPoint, { backgroundColor: '#CBD5E1' }]} />
              <View style={styles.activityContent}>
                <AppText family="primary" weight="bold" style={[styles.activityTitle, { color: '#64748B' }]}>System Notification</AppText>
                <AppText family="primary" weight="medium" style={styles.activityDesc}>Auto-reminder suppressed</AppText>
                <AppText family="primary" weight="medium" style={styles.activityTime}>Yesterday, 8:20 PM</AppText>
              </View>
            </View>
          </View>

          {/* Required Documentation */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <AppText family="primary" weight="bold" style={styles.cardTitle}>
                Required Documentation
              </AppText>
              <AppText family="primary" weight="bold" style={styles.downloadAllText}>
                ALL DOWNLOADED
              </AppText>
            </View>

            <View style={styles.docItem}>
              <View style={styles.docIconBox}>
                <FileText size={normalize(16)} color={colors.purple[700]} />
              </View>
              <View style={styles.docContent}>
                <AppText family="primary" weight="bold" style={styles.docTitle}>Initial Intake Assessment</AppText>
                <View style={styles.docSubtitleRow}>
                  <View style={styles.docBadge}>
                    <AppText family="primary" weight="bold" style={styles.docBadgeText}>Clinical</AppText>
                  </View>
                  <AppText family="primary" weight="medium" style={styles.docDate}>Oct 25, 2023</AppText>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadBtn}>
                <Download size={normalize(16)} color={colors.purple[700]} />
              </TouchableOpacity>
            </View>

            <View style={styles.docItem}>
              <View style={[styles.docIconBox, { backgroundColor: '#F8F5FE' }]}>
                <ShieldCheck size={normalize(16)} color={colors.purple[700]} />
              </View>
              <View style={styles.docContent}>
                <AppText family="primary" weight="bold" style={styles.docTitle}>HIPAA Consent & Privacy</AppText>
                <View style={styles.docSubtitleRow}>
                  <View style={styles.docBadge}>
                    <AppText family="primary" weight="bold" style={styles.docBadgeText}>Legal</AppText>
                  </View>
                  <AppText family="primary" weight="medium" style={styles.docDate}>Oct 25, 2023</AppText>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadBtn}>
                <Download size={normalize(16)} color={colors.purple[700]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Banner */}
          <View style={styles.supportBanner}>
            <View style={styles.supportIconBox}>
              <HeadphonesIcon size={normalize(20)} color={colors.typographyColor.Dark} />
            </View>
            <View style={styles.supportContent}>
              <AppText family="primary" weight="bold" style={styles.supportTitle}>
                Need assistance?
              </AppText>
              <AppText family="primary" weight="medium" style={styles.supportDesc}>
                Our onboarding specialists are available to help Sarah with the portal.
              </AppText>
              <TouchableOpacity>
                <AppText family="primary" weight="bold" style={styles.supportLink}>
                  Contact Support
                </AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.outlineBtn, { borderColor: '#E8ECEF', backgroundColor: '#FFFFFF' }]}
              activeOpacity={0.7}
            >
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark }}>
                Resend Link
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SelectAClient')}
            >
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF' }}>
                Go to Dashboard
              </AppText>
            </TouchableOpacity>
          </View>
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

  profileCard: {
    borderRadius: normalize(16),
    padding: normalize(20),
    marginBottom: normalize(20),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  avatar: {
    width: normalize(56), height: normalize(56),
    borderRadius: normalize(16),
    borderWidth: 2, borderColor: '#FFFFFF',
    marginRight: normalize(16),
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: normalize(16), color: '#FFFFFF', marginBottom: normalize(4) },
  profileId: { fontSize: normalize(12), color: '#E5DDF5' },
  contactInfo: { marginTop: normalize(4) },
  contactText: { fontSize: normalize(11), color: '#E5DDF5', marginBottom: normalize(6) },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    marginBottom: normalize(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  cardTitle: { fontSize: normalize(14), color: colors.appThemeColor[800] },
  cardTitleMargin: { fontSize: normalize(14), color: colors.appThemeColor[800], marginBottom: normalize(20) },

  milestoneBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: normalize(8), paddingVertical: normalize(4),
    borderRadius: normalize(12),
  },
  milestoneBadgeText: { fontSize: normalize(8), color: '#7E22CE' },

  timeline: { paddingLeft: normalize(4) },
  timelineStep: {
    flexDirection: 'row',
    marginBottom: normalize(20),
  },
  timelineIconContainer: {
    width: normalize(24),
    alignItems: 'center',
    marginRight: normalize(16),
  },
  purpleCircle: {
    width: normalize(24), height: normalize(24),
    borderRadius: normalize(12),
    backgroundColor: '#7050A1',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  grayCircle: {
    width: normalize(24), height: normalize(24),
    borderRadius: normalize(12),
    backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  timelineLinePurple: {
    width: 2, flex: 1,
    backgroundColor: '#7050A1',
    position: 'absolute', top: normalize(24), bottom: -normalize(20),
    zIndex: 1,
  },
  timelineLineGray: {
    width: 2, flex: 1,
    backgroundColor: '#E2E8F0',
    position: 'absolute', top: normalize(24), bottom: -normalize(20),
    zIndex: 1,
  },
  timelineContent: { flex: 1, paddingTop: normalize(2) },
  stepTitle: { fontSize: normalize(13), color: colors.appThemeColor[800], marginBottom: normalize(4) },
  stepTitleGray: { fontSize: normalize(13), color: '#94A3B8', marginBottom: normalize(4) },
  stepDesc: { fontSize: normalize(11), color: '#64748B', lineHeight: normalize(16), marginBottom: normalize(6) },
  stepDescGray: { fontSize: normalize(11), color: '#94A3B8', lineHeight: normalize(16), marginBottom: normalize(6) },
  stepTimePurple: { fontSize: normalize(9), color: '#7050A1', textTransform: 'uppercase' },

  activityItem: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  bulletPoint: {
    width: normalize(8), height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#7050A1',
    marginTop: normalize(6),
    marginRight: normalize(12),
  },
  activityContent: { flex: 1 },
  activityTitle: { fontSize: normalize(13), color: colors.appThemeColor[800], marginBottom: normalize(2) },
  activityDesc: { fontSize: normalize(11), color: '#64748B', marginBottom: normalize(4) },
  activityTime: { fontSize: normalize(10), color: '#94A3B8' },

  downloadAllText: { fontSize: normalize(9), color: '#7050A1', textTransform: 'uppercase' },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(12),
    padding: normalize(12),
    marginBottom: normalize(12),
  },
  docIconBox: {
    width: normalize(40), height: normalize(40),
    borderRadius: normalize(8),
    backgroundColor: '#F3E8FF',
    alignItems: 'center', justifyContent: 'center',
    marginRight: normalize(12),
  },
  docContent: { flex: 1 },
  docTitle: { fontSize: normalize(12), color: colors.appThemeColor[800], marginBottom: normalize(6) },
  docSubtitleRow: { flexDirection: 'row', alignItems: 'center' },
  docBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: normalize(6), paddingVertical: normalize(2),
    borderRadius: normalize(8), marginRight: normalize(8),
  },
  docBadgeText: { fontSize: normalize(9), color: '#7050A1' },
  docDate: { fontSize: normalize(10), color: '#94A3B8' },
  downloadBtn: { padding: normalize(8) },

  supportBanner: {
    backgroundColor: '#FEF08A',
    borderRadius: normalize(16),
    padding: normalize(20),
    flexDirection: 'row',
    marginBottom: normalize(24),
  },
  supportIconBox: {
    width: normalize(40), height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    marginRight: normalize(16),
  },
  supportContent: { flex: 1 },
  supportTitle: { fontSize: normalize(14), color: colors.appThemeColor[800], marginBottom: normalize(4) },
  supportDesc: { fontSize: normalize(11), color: '#475569', lineHeight: normalize(16), marginBottom: normalize(8) },
  supportLink: { fontSize: normalize(12), color: colors.appThemeColor[800], textDecorationLine: 'underline' },

  bottomButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  outlineBtn: {
    flex: 1, borderWidth: 1,
    height: normalize(48), borderRadius: normalize(12),
    alignItems: 'center', justifyContent: 'center',
    marginRight: normalize(12),
  },
  primaryBtn: {
    flex: 1, height: normalize(48), borderRadius: normalize(12),
    alignItems: 'center', justifyContent: 'center',
  },
});
