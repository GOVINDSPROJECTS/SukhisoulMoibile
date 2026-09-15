import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, ArrowRight, Check, Copy, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const ClientIdGeneratedScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
      <AppText family="primary" weight="medium" style={styles.detailLabel}>
        {label}
      </AppText>
      <AppText family="primary" weight="medium" style={styles.detailValue}>
        {value}
      </AppText>
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

      <View style={styles.content}>

        {/* Main Success Card */}
        <View style={styles.card}>
          <View style={styles.successIconBadge}>
            <Check size={normalize(24)} color="#22C55E" />
          </View>

          <AppText family="primary" weight="bold" style={styles.successTitle}>
            Client ID Generated!
          </AppText>

          <View style={styles.patientIdBadge}>
            <View>
              <AppText family="primary" weight="medium" style={styles.patientIdLabel}>
                PATIENT ID
              </AppText>
              <AppText family="primary" weight="bold" style={styles.patientIdValue}>
                SSPH-250424-0147
              </AppText>
            </View>
            <TouchableOpacity style={styles.copyButton} activeOpacity={0.7}>
              <Copy size={normalize(16)} color="#22C55E" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <DetailRow label="Client Name" value="Riya Mehta" />
            <DetailRow label="Email" value="riya.mehta@email.com" />
            <DetailRow label="Phone" value="+91 98765 43210" />
            <DetailRow label="Date Added" value="24 Apr 2024, 10:30 AM" />
            <DetailRow label="Added By" value="Dr. Clara Kapoor" />
          </View>

          <View style={[styles.infoBanner, { backgroundColor: colors.purple[50] }]}>
            <Info size={normalize(14)} color={colors.purple[700]} style={styles.infoIcon} />
            <AppText family="primary" weight="medium" style={[styles.infoText, { color: colors.typographyColor.Dark }]}>
              You can now proceed to schedule the session for this client.
            </AppText>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('NewClientSessionConfigScreen')}
        >
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF', marginRight: normalize(8) }}>
            Continue to Session Details
          </AppText>
          <ArrowRight size={normalize(16)} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SelectAClient')}
        >
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Medium }}>
            Cancel
          </AppText>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerGradient: { paddingBottom: normalize(12) },
  headerContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: normalize(20), paddingVertical: normalize(14),
  },
  backButton: { padding: normalize(4) },
  headerTitle: { fontSize: normalize(15), color: '#155B92' },
  headerRight: { width: normalize(24) },

  content: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(24),
    flex: 1,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(24),
    alignItems: 'center',
    marginBottom: normalize(24),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 4,
  },
  successIconBadge: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(26),
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  successTitle: {
    fontSize: normalize(16),
    color: '#22C55E',
    marginBottom: normalize(24),
  },

  patientIdBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: normalize(12),
    width: '100%',
    padding: normalize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(24),
  },
  patientIdLabel: {
    fontSize: normalize(10),
    color: '#22C55E',
    textTransform: 'uppercase',
    marginBottom: normalize(4),
  },
  patientIdValue: {
    fontSize: normalize(14),
    color: colors.appThemeColor[800],
  },
  copyButton: {
    backgroundColor: '#FFFFFF',
    padding: normalize(8),
    borderRadius: normalize(8),
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },

  detailsContainer: {
    width: '100%',
    marginBottom: normalize(24),
    gap: normalize(12),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Light,
  },
  detailValue: {
    fontSize: normalize(12),
    color: colors.appThemeColor[800],
  },

  infoBanner: {
    flexDirection: 'row',
    borderRadius: normalize(12),
    padding: normalize(16),
    width: '100%',
  },
  infoIcon: {
    marginTop: normalize(2),
    marginRight: normalize(8),
  },
  infoText: {
    fontSize: normalize(11),
    lineHeight: normalize(16),
    flex: 1,
  },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16),
    marginBottom: normalize(16),
  },
  cancelBtn: {
    alignItems: 'center', justifyContent: 'center',
    height: normalize(48),
  }
});
