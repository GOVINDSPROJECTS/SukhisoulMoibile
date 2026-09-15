import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NutqHeader } from '../components/NutqHeader';
import LinearGradient from 'react-native-linear-gradient';
import { CommonContinueButton } from '@/components/atoms/CommonContinueButton';

export const NutqPrivacyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleAccept = () => {
    // Navigation action after completing flow
    navigation.navigate('MainTabs');
  };

  const handleReject = () => {
    // Navigation action after completing flow
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <NutqHeader
        title="Questions before Session"
        currentStep={8}
        totalSteps={8}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <AppText variant="body" family="secondary" weight="medium" style={styles.titleText}>
          We value your Privacy
        </AppText>

        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.85} onPress={handleAccept} style={styles.buttonWrapper}>
            <View
              style={styles.acceptButton}
            >
              <AppText variant="body" weight="regular" family='secondary' style={styles.acceptText}>
                Accept
              </AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={handleReject} style={styles.rejectButton}>
            <AppText variant="body" weight="regular" family='secondary' style={styles.rejectText}>
              Reject Non essentials
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: {
    flex: 1,
    paddingHorizontal: normalize(20),
    alignItems: 'center',
    paddingTop: normalize(20),
  },
  titleText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(15),
    textAlign: 'center',
    marginBottom: normalize(40),
  },
  buttonContainer: {
    width: '100%',
    gap: normalize(15),
    alignItems: 'center',
    marginTop: normalize(140),
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: normalize(320),
    borderRadius: normalize(20),
    overflow: 'hidden',
    backgroundColor: colors.lightAppTheme[700]
  },
  acceptButton: {
    width: '100%',
    paddingVertical: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
  rejectButton: {
    width: '100%',
    maxWidth: normalize(320),
    backgroundColor: colors.lightAppTheme[500],
    paddingVertical: normalize(15),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
