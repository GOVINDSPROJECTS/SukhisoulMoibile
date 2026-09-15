import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { FinalWarningInfoCard } from '../components/FinalWarningInfoCard';

export const DeleteAccountFinalWarningScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccountSuccessScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
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
            onPress={() => navigation.goBack()}
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

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Block */}
        <View style={styles.titleSection}>
          <AppText family="secondary" weight="bold" style={styles.pageTitle}>
            Final Warning
          </AppText>
          <AppText family="secondary" weight="light" style={styles.pageSubtitle}>
            The action cannot be undone after this
          </AppText>
        </View>

        {/* Circular Warning Icon Badge */}
        <View style={styles.warningCircleContainer}>
          <View style={styles.warningCircle}>
            <AlertTriangle
              size={normalize(42)}
              color="#BE123C"
              strokeWidth={2.2}
            />
          </View>
        </View>

        {/* Highlighted Warning Text */}
        <View style={styles.mainWarningTextWrapper}>
          <AppText family="secondary" weight="medium" style={styles.mainWarningDark}>
            You are about to permanently delete your{' '}
            <AppText family="secondary" weight="bold" style={styles.mainWarningRed}>
              psychologist account
            </AppText>
            .
          </AppText>
        </View>

        {/* Recovery & Data Loss Info Cards */}
        <FinalWarningInfoCard />
      </ScrollView>

      {/* Bottom Fixed Action Buttons */}
      <View style={[styles.bottomActionBar, { paddingBottom: Math.max(insets.bottom, normalize(16)) }]}>
        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <AppText family="secondary" weight="bold" style={styles.cancelBtnText}>
            Cancel
          </AppText>
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDeleteAccount}
          activeOpacity={0.8}
        >
          <AppText family="secondary" weight="bold" style={styles.deleteBtnText}>
            Delete Account
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(40),
    paddingBottom: normalize(24),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: normalize(18),
  },
  pageTitle: {
    fontSize: normalize(20),
    color: '#0F172A',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
    marginTop: normalize(4),
  },
  warningCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(12),
  },
  warningCircle: {
    width: normalize(92),
    height: normalize(92),
    borderRadius: normalize(46),
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWarningTextWrapper: {
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    marginBottom: normalize(20),
  },
  mainWarningDark: {
    fontSize: normalize(15),
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: normalize(26),
  },
  mainWarningRed: {
    fontSize: normalize(15),
    color: '#DC2626',
    textAlign: 'center',
    lineHeight: normalize(26),
  },
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(14),
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  cancelBtn: {
    width: '38%',
    paddingVertical: normalize(14),
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: normalize(15),
    color: '#334155',
  },
  deleteBtn: {
    width: '58%',
    paddingVertical: normalize(14),
    borderRadius: normalize(12),
    backgroundColor: colors.colorPalet['color 1'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontSize: normalize(15),
    color: '#FFFFFF',
  },
});
