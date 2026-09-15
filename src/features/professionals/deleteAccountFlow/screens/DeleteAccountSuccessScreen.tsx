import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const DeleteAccountSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // Calculate 30 days from now
  const getEffectiveDateString = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    const day = targetDate.getDate();
    const month = targetDate.toLocaleString('en-US', { month: 'long' });
    const year = targetDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
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
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="secondary" weight="bold" style={styles.headerTitle}>
            Delete Account
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content Container */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* White Card Container */}
        <View style={styles.cardContainer}>
          {/* Circular Success Badge */}
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Check size={normalize(22)} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>

          {/* Title */}
          <AppText family="primary" weight="bold" style={styles.cardTitle}>
            Account Deleted
          </AppText>

          {/* Subtitle */}
          <AppText family="secondary" weight="regular" style={styles.cardSubtitle}>
            Your request has been submitted successfully. We're sorry to see you go, but we understand your decision.
          </AppText>

          {/* Effective Date Box */}
          <View style={styles.dateBox}>
            <AppText family="secondary" weight="light" style={styles.dateBoxHeader}>
              EFFECTIVE DATE
            </AppText>
            <AppText family="secondary" weight="regular" style={styles.dateBoxDate}>
              {getEffectiveDateString()}
            </AppText>
            <AppText family="secondary" weight="regular" style={styles.dateBoxSubtext}>
              (30 days from now)
            </AppText>
          </View>

          {/* Logout Action Pill */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <AppText family="secondary" weight="regular" style={styles.logoutButtonText}>
              Account is logout from this device
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(40),
    paddingBottom: normalize(32),
    justifyContent: 'center',
  },
  cardContainer: {
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(32),
    alignItems: 'center',
  },
  outerCircle: {
    width: normalize(86),
    height: normalize(86),
    borderRadius: normalize(43),
    backgroundColor: '#CDE5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(4),
  },
  innerCircle: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: '#006195',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: normalize(24),
    color: '#0F172A',
    textAlign: 'center',
    marginTop: normalize(20),
  },
  cardSubtitle: {
    fontSize: normalize(12),
    color: '#526069',
    textAlign: 'center',
    lineHeight: normalize(21),
    marginTop: normalize(10),
    paddingHorizontal: normalize(8),
  },
  dateBox: {
    width: '100%',
    backgroundColor: '#F2F4F6',
    borderRadius: normalize(14),
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(22),
    borderWidth: normalize(1),
    borderColor: '#E6E8EA'
  },
  dateBoxHeader: {
    fontSize: normalize(12.5),
    color: colors.typographyColor.Medium,
    letterSpacing: 0.8,
    marginBottom: normalize(4),
  },
  dateBoxDate: {
    fontSize: normalize(16),
    color: '#0F172A',
    marginBottom: normalize(4),
  },
  dateBoxSubtext: {
    fontSize: normalize(13.5),
    color: '#006195',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#E6E8EA',
    borderRadius: normalize(12),
    paddingVertical: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(18),
  },
  logoutButtonText: {
    fontSize: normalize(13.5),
    color: '#191C1E',
  },
});
