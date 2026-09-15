import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check, Pencil, ArrowRight, Copy, Link as LinkIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const SessionReadyScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const sessionUrl = 'sukhisoul.com/session/abc123xyz';

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
            <View style={styles.titleIconCircle}>
              <Check size={normalize(20)} color="#FFFFFF" />
            </View>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(20), color: colors.typographyColor.Dark }}>
              Your session is ready
            </AppText>
          </View>

          {/* Share Card */}
          <View style={styles.shareSection}>
            <View style={styles.card}>
              <AppText family="primary" weight="semiBold" style={{ fontSize: normalize(10), color: colors.typographyColor.Medium, textTransform: 'uppercase', marginBottom: normalize(8) }}>
                SESSION URL
              </AppText>

              <View style={styles.urlBox}>
                <LinkIcon size={normalize(16)} color={colors.purple[700]} style={{ marginRight: normalize(8) }} />
                <AppText family="primary" weight="semiBold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                  {sessionUrl}
                </AppText>
              </View>

              <TouchableOpacity style={[styles.copyBtn, { backgroundColor: colors.purple[800] }]} activeOpacity={0.8}>
                <Copy size={normalize(14)} color="#FFFFFF" style={{ marginRight: normalize(8) }} />
                <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: '#FFFFFF' }}>
                  Copy Link
                </AppText>
              </TouchableOpacity>

              <AppText family="primary" weight="semiBold" style={{ fontSize: normalize(10), color: colors.typographyColor.Medium, textTransform: 'uppercase', textAlign: 'center', marginTop: normalize(20), marginBottom: normalize(12) }}>
                QUICK SHARE
              </AppText>

              <View style={styles.shareRow}>
                <TouchableOpacity style={styles.shareIconCircle} activeOpacity={0.7}>
                  <Image source={require('../assets/message.png')} style={{ width: normalize(18), height: normalize(18) }} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareIconCircle} activeOpacity={0.7}>
                  <Image source={require('../assets/mail.png')} style={{ width: normalize(18), height: normalize(18) }} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareIconCircle} activeOpacity={0.7}>
                  <Image source={require('../assets/comment.png')} style={{ width: normalize(18), height: normalize(18) }} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareIconCircle} activeOpacity={0.7}>
                  <Image source={require('../assets/share-icon.png')} style={{ width: normalize(18), height: normalize(18) }} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Message Preview Box */}
            <View style={styles.previewBox}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark, lineHeight: normalize(20) }}>
                Hello Sarah, your virtual therapy session is confirmed for Oct 24 at 2:00 PM. Please use the following link to join our secure meeting room:{'\n'}
                <AppText family="primary" weight="medium" style={{ color: colors.purple[700] }}>
                  https://{sessionUrl}
                </AppText>
                {'\n'}Looking forward to our session!
              </AppText>
            </View>
          </View>

          {/* Patient Info Card */}
          <View style={styles.card}>
            <View style={styles.patientHeader}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=prathmesh' }} style={styles.avatar} />
              <View>
                <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark, marginBottom: normalize(4) }}>
                  Prathmesh Deokar
                </AppText>
                <View style={styles.tagsContainer}>
                  <View style={[styles.tag, { backgroundColor: colors.purple[700] }]}>
                    <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: '#FFFFFF' }}>
                      ANXIETY
                    </AppText>
                  </View>
                  <View style={[styles.tag, { backgroundColor: colors.purple[50] }]}>
                    <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: colors.purple[700] }}>
                      STRESS
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Patient ID
              </AppText>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                #SJ-99381
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Session Type
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                Clinical Assessment
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Date
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                Oct 24, 2023
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Time
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                10:00 AM - 11:00 AM
              </AppText>
            </View>

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Status
              </AppText>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: '#00C853' }]} />
                <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                  Scheduled
                </AppText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Medium }}>
                Session Duration
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                50 Minutes
              </AppText>
            </View>

            <View style={[styles.securePill, { backgroundColor: '#E6F9F0' }]}>
              <Image source={require('../assets/connection.png')} style={{ width: normalize(10), height: normalize(10), marginRight: normalize(6), tintColor: '#00C853' }} resizeMode="contain" />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: '#00C853' }}>
                SECURE CONNECTION HIPAA COMPLIANT
              </AppText>
            </View>
          </View>

          {/* Footer Actions */}
          <View style={styles.footerRow}>
            <View>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                Client Message
              </AppText>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                Preview
              </AppText>
            </View>
            <TouchableOpacity style={styles.editRow}>
              <Pencil size={normalize(12)} color={colors.purple[700]} style={{ marginRight: normalize(4) }} />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.purple[700] }}>
                Edit{'\n'}Template
              </AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SelectAClient')}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF', marginRight: normalize(8) }}>
              Return to Dashboard
            </AppText>
            <ArrowRight size={normalize(16)} color="#FFFFFF" />
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


  titleSection: {
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  titleIconCircle: {
    width: normalize(40), height: normalize(40), borderRadius: normalize(20),
    backgroundColor: '#5E35B1', alignItems: 'center', justifyContent: 'center',
    marginBottom: normalize(12),
  },
  shareSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(24), borderTopRightRadius: normalize(24),
    paddingHorizontal: normalize(20), paddingVertical: normalize(24),
    marginTop: normalize(-12),
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    marginBottom: normalize(16),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },
  urlBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F3E8FF', borderRadius: normalize(8),
    paddingHorizontal: normalize(12), paddingVertical: normalize(14),
    marginBottom: normalize(12),
  },
  copyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: normalize(44), borderRadius: normalize(8),
  },
  shareRow: {
    flexDirection: 'row', justifyContent: 'center', gap: normalize(16),
  },
  shareIconCircle: {
    width: normalize(44), height: normalize(44), borderRadius: normalize(22),
    borderWidth: 1, borderColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },

  previewBox: {
    backgroundColor: '#FFF0F5',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(16),
  },

  patientHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: normalize(48), height: normalize(48), borderRadius: normalize(24), marginRight: normalize(12) },
  tagsContainer: { flexDirection: 'row', gap: normalize(6) },
  tag: { paddingHorizontal: normalize(8), paddingVertical: normalize(4), borderRadius: normalize(4) },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: normalize(16) },

  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: normalize(12),
  },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: normalize(6), height: normalize(6), borderRadius: normalize(3), marginRight: normalize(6) },

  securePill: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: normalize(10), borderRadius: normalize(8), marginTop: normalize(8),
  },

  footerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: normalize(4), marginBottom: normalize(16),
  },
  editRow: { flexDirection: 'row', alignItems: 'center' },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16),
  },
});
