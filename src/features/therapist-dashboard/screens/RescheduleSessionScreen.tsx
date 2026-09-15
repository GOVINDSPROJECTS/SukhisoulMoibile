import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp, RootStackParamList } from '@navigation/types';
import { RescheduleHeader } from '../components/reschedule/RescheduleHeader';
import { RescheduleTherapistCard } from '../components/reschedule/RescheduleTherapistCard';
import { SessionInfoRow } from '../components/reschedule/SessionInfoRow';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

const MAX_REASON_LENGTH = 250;

type RouteProps = RouteProp<RootStackParamList, 'RescheduleSession'>;

export const RescheduleSessionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState('');
  const { data: dashboardData } = useTherapistDashboard();
  const sessionPurpose = dashboardData?.progress?.planName ?? 'Anxiety & Stress Management';

  const bookingId = route.params?.bookingId ?? dashboardData?.nextSession?.id ?? undefined;
  const bookingUuid = route.params?.bookingUuid ?? dashboardData?.nextSession?.uuid ?? undefined;

  const handleReschedule = useCallback(() => {
    navigation.navigate('ReschedulePreferences', {
      reason,
      bookingId,
      bookingUuid,
    });
  }, [navigation, reason, bookingId, bookingUuid]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.appThemeColor[75] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <RescheduleHeader
        title="My Therapist"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={[
              colors.tintsBlue[400],
              colors.appThemeColor[75],
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.topGradientSection}
          >
            {/* Therapist Card */}
            <RescheduleTherapistCard status="upcoming" />
          </LinearGradient>

          <View style={styles.card}>

            <AppText variant="caption" family='secondary' weight="semiBold" style={styles.purposeLabel}>
              SESSION PURPOSE
            </AppText>
            <AppText variant="body" family='secondary' weight="bold" style={styles.purposeValue}>
              {sessionPurpose}
            </AppText>
          </View>

          <AppText variant="body" weight="extraBold" style={styles.reasonTitle}>
            Reason
          </AppText>
          {/* Reason Card */}
          <View style={[styles.card, { paddingVertical: normalize(0), paddingHorizontal: normalize(0), paddingBottom: normalize(10), paddingRight: normalize(10) }]}>
            <TextInput
              style={styles.reasonInput}
              placeholder="Eg. Not available at requested times, Have a full schedule, etc."
              placeholderTextColor={"#94A3B8"}
              multiline
              maxLength={MAX_REASON_LENGTH}
              value={reason}
              onChangeText={setReason}
              textAlignVertical="top"
            />
            <AppText variant="caption" weight="regular" style={styles.charCount}>
              {reason.length}/{MAX_REASON_LENGTH}
            </AppText>
          </View>

          <CommonContinueButton label="Reschedule" onPress={handleReschedule} />
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topGradientSection: {
    paddingBottom: normalize(5),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    // paddingHorizontal: normalize(16),
    // paddingTop: normalize(16),
    paddingBottom: normalize(15),
    gap: normalize(12),
  },
  card: {
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(16),
    marginHorizontal: normalize(20),
    marginTop: normalize(10),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(18),
    overflow: 'hidden',
  },

  purposeLabel: {
    color: "#718096",
    fontSize: normalize(10),
    letterSpacing: 0.6,
    marginBottom: normalize(4),
  },
  purposeValue: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  reasonTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
    marginBottom: normalize(-10),
    marginTop: normalize(10),
    marginHorizontal: normalize(20),
  },
  reasonInput: {
    // borderWidth: 1,
    // borderColor: colors.appThemeColor[200],
    borderRadius: normalize(16),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    fontSize: normalize(13),
    color: colors.typographyColor.Dark,
    minHeight: normalize(100),
    backgroundColor: 'transparent',
  },
  charCount: {
    color: "#94A3B8",
    fontSize: normalize(11),
    textAlign: 'right',
    marginTop: normalize(6),
  },
});
