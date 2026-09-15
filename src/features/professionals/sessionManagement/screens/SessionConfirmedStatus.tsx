import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check, CalendarHeart, Clock, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const SessionConfirmedStatus: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const focusAreas = ['Anxiety', 'CBT', 'Stress'];

  const Label = ({ text }: { text: string }) => (
    <AppText family="primary" weight="semiBold" style={{ fontSize: normalize(9), color: colors.typographyColor.Light, textTransform: 'uppercase', marginBottom: normalize(4) }}>
      {text}
    </AppText>
  );

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
          {/* Top Confirmed Card */}
          <View style={styles.topCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#E6F9F0' }]}>
              <Check size={normalize(24)} color="#00C853" />
            </View>

            <AppText family="primary" weight="bold" style={{ fontSize: normalize(20), color: colors.typographyColor.Dark, marginBottom: normalize(8) }}>
              Session Confirmed!
            </AppText>

            <AppText family="primary" weight="medium" center style={{ fontSize: normalize(12), color: colors.typographyColor.Medium, paddingHorizontal: normalize(20), marginBottom: normalize(16), lineHeight: normalize(18) }}>
              Payment received. Your session is confirmed and successfully added to your schedule.
            </AppText>
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.detailsHeader}>
              <Image source={require('../assets/session-icon.png')} style={{ width: normalize(20), height: normalize(20), marginRight: normalize(8), tintColor: colors.purple[700] }} resizeMode="contain" />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark }}>
                Session Details
              </AppText>
            </View>

            <View style={styles.detailsContent}>
              <View style={styles.rowBlock}>
                <Label text="Client" />
                <View style={styles.clientRow}>
                  <Image source={{ uri: 'https://i.pravatar.cc/150?u=prathmesh' }} style={styles.clientAvatar} />
                  <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                    Prathmesh Deokar
                  </AppText>
                </View>
              </View>

              <View style={styles.rowBlock}>
                <Label text="Date & Time" />
                <View style={styles.iconTextRow}>
                  <Clock size={normalize(12)} color={colors.typographyColor.Dark} style={{ marginRight: normalize(4) }} />
                  <AppText family="primary" weight="bold" style={{ fontSize: normalize(11), color: colors.typographyColor.Dark }}>
                    24 Apr 2024, 10:00 AM
                  </AppText>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.col}>
                  <Label text="Session Type" />
                  <View style={styles.tagsContainer}>
                    {focusAreas.map((area, index) => (
                      <View key={index} style={[styles.tag, { backgroundColor: colors.purple[50] }]}>
                        <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: colors.purple[700] }}>
                          {area}
                        </AppText>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={[styles.col, { alignItems: 'flex-end' }]}>
                  <Label text="Duration" />
                  <View style={styles.iconTextRow}>
                    <Clock size={normalize(12)} color={colors.typographyColor.Dark} style={{ marginRight: normalize(4) }} />
                    <AppText family="primary" weight="bold" style={{ fontSize: normalize(11), color: colors.typographyColor.Dark }}>
                      50 Minutes
                    </AppText>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.row}>
                <View style={styles.col}>
                  <Label text="Amount" />
                  <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                    ₹1,200
                  </AppText>
                </View>
                <View style={[styles.col, { alignItems: 'flex-end' }]}>
                  <Label text="Status" />
                  <View style={styles.statusStack}>
                    <View style={[styles.statusPill, { backgroundColor: '#E6F9F0', marginBottom: normalize(4) }]}>
                      <View style={[styles.statusDot, { backgroundColor: '#00C853' }]} />
                      <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: '#00C853' }}>
                        Paid
                      </AppText>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: '#EBF5FF' }]}>
                      <View style={[styles.statusDot, { backgroundColor: '#2174D4' }]} />
                      <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: '#2174D4' }}>
                        Confirmed
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <View style={styles.infoIconBox}>
              <Clock size={normalize(14)} color={colors.purple[700]} />
            </View>
            <View style={styles.infoTextContainer}>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.purple[800], marginBottom: normalize(2) }}>
                You're all set!
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Medium, lineHeight: normalize(14) }}>
                The client can now join the session using the session link. We have also sent them an email confirmation with all the details.
              </AppText>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SessionReady')}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF', marginRight: normalize(8) }}>
              Session Link
            </AppText>
            <ArrowRight size={normalize(16)} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { backgroundColor: '#FFFFFF', borderColor: colors.purple[200] }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SelectAClient')}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark }}>
              Go to Dashboard
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


  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(24),
    alignItems: 'center',
    marginBottom: normalize(16),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },
  iconCircle: {
    width: normalize(56), height: normalize(56), borderRadius: normalize(28),
    alignItems: 'center', justifyContent: 'center', marginBottom: normalize(16),
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    marginBottom: normalize(20),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },
  detailsHeader: {
    flexDirection: 'row', alignItems: 'center', padding: normalize(16),
  },
  detailsContent: { padding: normalize(16) },
  rowBlock: { marginBottom: normalize(16) },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(16) },
  col: { flex: 1 },
  clientRow: { flexDirection: 'row', alignItems: 'center' },
  clientAvatar: {
    width: normalize(28), height: normalize(28), borderRadius: normalize(14),
    marginRight: normalize(8),
  },
  iconTextRow: { flexDirection: 'row', alignItems: 'flex-start' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: normalize(4) },
  tag: { paddingHorizontal: normalize(8), paddingVertical: normalize(4), borderRadius: normalize(6) },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: normalize(16) },

  statusStack: { alignItems: 'flex-end' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: normalize(10), paddingVertical: normalize(4), borderRadius: normalize(10),
  },
  statusDot: { width: normalize(6), height: normalize(6), borderRadius: normalize(3), marginRight: normalize(4) },

  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#F3E8FF',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(24),
  },
  infoIconBox: {
    width: normalize(28), height: normalize(28), borderRadius: normalize(8),
    backgroundColor: '#E9D5FF', alignItems: 'center', justifyContent: 'center', marginRight: normalize(12),
  },
  infoTextContainer: { flex: 1 },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16), marginBottom: normalize(12),
  },
  secondaryBtn: {
    alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16), borderWidth: 1,
  }
});
