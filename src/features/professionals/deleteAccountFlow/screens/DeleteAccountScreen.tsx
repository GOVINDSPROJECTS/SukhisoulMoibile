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
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { DeleteAccountWarningCard } from '../components/DeleteAccountWarningCard';

export const DeleteAccountScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    navigation.navigate('DeleteAccountFeedbackScreen');
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
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
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
        <View style={styles.topSection}>
          <DeleteAccountWarningCard />
        </View>

        {/* Continue Button at Bottom */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={{}}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.continueButton]}
            >
              <AppText family="primary" weight="bold" style={styles.continueButtonText}>
                Continue
              </AppText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    paddingTop: normalize(20),
    paddingBottom: normalize(36),
  },
  topSection: {
    marginTop: normalize(10),
  },
  bottomSection: {
    marginTop: normalize(40),
  },
  continueButton: {
    backgroundColor: '#1D64B5',
    borderRadius: normalize(12),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
});

