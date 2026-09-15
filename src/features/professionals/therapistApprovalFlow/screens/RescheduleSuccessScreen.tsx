import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const RescheduleSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
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
            onPress={() => navigation.navigate('TherapistApprovalDashboard')}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Appointment Status
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>

        <View style={styles.graphicContainer}>
          <Image
            source={require('../assets/Hero Icon & Status.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <AppText family="primary" weight="bold" style={styles.title}>
          Appointment{'\n'}Rescheduled!
        </AppText>

        <AppText family="primary" weight="medium" style={styles.subtitle}>
          Your appointment has been successfully{'\n'}rescheduled.
        </AppText>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Calendar size={normalize(14)} color="#1E62C4" />
            </View>
            <AppText family="primary" weight="bold" style={styles.detailText}>
              Wed, 22 May 2024
            </AppText>
          </View>
          <View style={[styles.detailRow, { marginBottom: 0 }]}>
            <View style={styles.iconContainer}>
              <Clock size={normalize(14)} color="#1E62C4" />
            </View>
            <AppText family="primary" weight="bold" style={styles.detailText}>
              04:00 PM – 05:00 PM
            </AppText>
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => navigation.navigate('TherapistApprovalDashboard')}
          activeOpacity={0.8}
        >
          <AppText family="primary" weight="bold" style={styles.viewBtnText}>
            View appointment
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    paddingHorizontal: normalize(24),
    paddingTop: normalize(40),
    paddingBottom: normalize(24),
    alignItems: 'center',
  },
  graphicContainer: {
    marginBottom: normalize(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: normalize(500),
    height: normalize(220),
  },
  title: {
    fontSize: normalize(22),
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: normalize(30),
    marginBottom: normalize(12),
  },
  subtitle: {
    fontSize: normalize(12),
    color: '#64748B',
    textAlign: 'center',
    lineHeight: normalize(18),
    marginBottom: normalize(32),
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(16),
    padding: normalize(20),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  iconContainer: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(8),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailText: {
    fontSize: normalize(12),
    color: '#1E293B',
  },
  spacer: {
    flex: 1,
  },
  viewBtn: {
    width: '100%',
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(16),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
