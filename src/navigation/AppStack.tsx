import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList, MainTabParamList } from './types';
import { useTheme, typography, colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Bell, Phone } from 'lucide-react-native';
import type { NavigationProp } from './types';

// ─── Tab bar PNG icon assets ───────────────────────────────────────────────────
const TAB_ICONS: Record<string, { default: ReturnType<typeof require>; active: ReturnType<typeof require> }> = {
  Home: { default: require('../assets/home.png'), active: require('../assets/home-active.png') },
  Chats: { default: require('../assets/chat.png'), active: require('../assets/chat-active.png') },
  Settings: { default: require('../assets/setting.png'), active: require('../assets/setting-active.png') },
};
import { HomeScreen } from '../features/home/screens/HomeScreen';

{/* Inbox flow */ }
import { InboxListScreen } from '../features/inbox/screens/InboxListScreen';
import { ChatScreen } from '../features/inbox/screens/ChatScreen';
import { VideoCallScreen } from '../features/video-call/screens/VideoCallScreen';

import { HabitsScreen } from '@screens/Placeholders';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen';
import { PsychologistProfile } from '../features/psychologist/screens/PsychologistProfile';
import { BookTherapy } from '../features/psychologist/screens/BookTherapy';
import { ConfirmBooking } from '../features/psychologist/screens/ConfirmBooking';
import { PaymentResult } from '../features/psychologist/screens/PaymentResult';
import { RedeemScreen } from '../features/redeem/screens/RedeemScreen';
import { RedeemSuccessScreen } from '../features/redeem/screens/RedeemSuccessScreen';
import { ExplorePsychologistsScreen } from '../features/explore-psychologists/screens/ExplorePsychologistsScreen';
import { TherapistDashboard } from '../features/therapist-dashboard/screens/TherapistDashboard';
import { RescheduleSessionScreen } from '../features/therapist-dashboard/screens/RescheduleSessionScreen';
import { ReschedulePreferencesScreen } from '../features/therapist-dashboard/screens/ReschedulePreferencesScreen';
import { RescheduleReviewScreen } from '../features/therapist-dashboard/screens/RescheduleReviewScreen';
import { RescheduleStatusScreen } from '../features/therapist-dashboard/screens/RescheduleStatusScreen';
import { RescheduleNewOptionsScreen } from '../features/therapist-dashboard/screens/RescheduleNewOptionsScreen';
import { AppointmentDetailsScreen } from '../features/therapist-dashboard/screens/AppointmentDetailsScreen';
import { TaskHistory } from '../features/therapist-dashboard/screens/TaskHistory';
import { WeeklyGoal } from '../features/therapist-dashboard/screens/WeeklyGoal';
import { CareNotes } from '../features/therapist-dashboard/screens/CareNotes';
import { SessionOverview } from '../features/therapist-dashboard/screens/SessionOverview';

{/* Not-The-Right-Fit flow */ }
import { NtfStartScreen } from '../features/not-the-right-fit/screens/NtfStartScreen';
import { NtfFeedbackScreen } from '../features/not-the-right-fit/screens/NtfFeedbackScreen';
import { NtfSessionStyleScreen } from '../features/not-the-right-fit/screens/NtfSessionStyleScreen';
import { NtfIdealTherapistScreen } from '../features/not-the-right-fit/screens/NtfIdealTherapistScreen';
import { NtfImportantInScreen } from '../features/not-the-right-fit/screens/NtfImportantInScreen';
import { NtfPreferencesScreen } from '../features/not-the-right-fit/screens/NtfPreferencesScreen';
import { NtfFindingMatchScreen } from '../features/not-the-right-fit/screens/NtfFindingMatchScreen';
import { NtfMatchFoundScreen } from '../features/not-the-right-fit/screens/NtfMatchFoundScreen';
import { RewardsUnlockedScreen } from '../features/dailyTask/screens/RewardsUnlockedScreen';

{/* Data Collection flow */ }
import { DcNameDobScreen } from '../features/data-collection-questions/screens/DcNameDobScreen';
import { DcGenderScreen } from '../features/data-collection-questions/screens/DcGenderScreen';
import { DcContactInfoScreen } from '../features/data-collection-questions/screens/DcContactInfoScreen';
import { DcLanguageScreen } from '../features/data-collection-questions/screens/DcLanguageScreen';

{/* New User therapy questions */ }

import { NutqIssuesScreen } from '../features/new-user-therapy-questions/screens/NutqIssuesScreen';
import { NutqAreasScreen } from '../features/new-user-therapy-questions/screens/NutqAreasScreen';
import { NutqDurationScreen } from '../features/new-user-therapy-questions/screens/NutqDurationScreen';
import { NutqHistoryScreen } from '../features/new-user-therapy-questions/screens/NutqHistoryScreen';
import { NutqPreferencesScreen } from '../features/new-user-therapy-questions/screens/NutqPreferencesScreen';
import { NutqSafetyScreen } from '../features/new-user-therapy-questions/screens/NutqSafetyScreen';
import { NutqGoalsScreen } from '../features/new-user-therapy-questions/screens/NutqGoalsScreen';
import { NutqPrivacyScreen } from '../features/new-user-therapy-questions/screens/NutqPrivacyScreen';

{/* Questions before Session flow */ }
import { QbsFeelingScreen } from '../features/questions-before-session/screens/QbsFeelingScreen';
import { QbsWeekRatingScreen } from '../features/questions-before-session/screens/QbsWeekRatingScreen';
import { QbsProgressScreen } from '../features/questions-before-session/screens/QbsProgressScreen';
import { QbsSleepScreen } from '../features/questions-before-session/screens/QbsSleepScreen';
import { QbsEventsScreen } from '../features/questions-before-session/screens/QbsEventsScreen';
import { QbsDiscussionScreen } from '../features/questions-before-session/screens/QbsDiscussionScreen';
import { QbsSafetyScreen } from '../features/questions-before-session/screens/QbsSafetyScreen';

{/* Session Completed flow */ }
import { SessionCompletedScreen } from '../features/session-completed-client/screens/SessionCompletedScreen';
import { ReportIssueScreen } from '../features/session-completed-client/screens/ReportIssueScreen';
import { ReportIssueSuccessScreen } from '../features/session-completed-client/screens/ReportIssueSuccessScreen';

{/* Gift Therapy flow */ }
import { GiftIntroScreen } from '../features/gift-theraphy-flow/screens/GiftIntroScreen';
import { GiftRecipientScreen } from '../features/gift-theraphy-flow/screens/GiftRecipientScreen';
import { GiftCustomMessageScreen } from '../features/gift-theraphy-flow/screens/GiftCustomMessageScreen';
import { GiftRecipientDetailsScreen } from '../features/gift-theraphy-flow/screens/GiftRecipientDetailsScreen';
import { GiftReviewPayScreen } from '../features/gift-theraphy-flow/screens/GiftReviewPayScreen';
import { GiftSuccessScreen } from '../features/gift-theraphy-flow/screens/GiftSuccessScreen';
import { GiftManageScreen } from '../features/gift-theraphy-flow/screens/GiftManageScreen';
import { GiftDetailsScreen } from '../features/gift-theraphy-flow/screens/GiftDetailsScreen';

{/* Gift Receiver flow */ }
import { GiftReceiverUnlockScreen } from '../features/gift-receiver-flow/screens/GiftReceiverUnlockScreen';
import { GiftReceiverProfileScreen } from '../features/gift-receiver-flow/screens/GiftReceiverProfileScreen';

{/* Family Care flow */ }
import { FcFillInfoScreen } from '../features/family-care/screens/FcFillInfoScreen';
import { FcTherapyInfoScreen } from '../features/family-care/screens/FcTherapyInfoScreen';
import { FcSelectTherapistScreen } from '../features/family-care/screens/FcSelectTherapistScreen';
import { FcBookSessionScreen } from '../features/family-care/screens/FcBookSessionScreen';

{/* Notifications */ }
import { NotificationsScreen } from '../features/notifications/screens/NotificationsScreen';

{/* SOS */ }
import { SosScreen } from '../features/sos/screens/SosScreen';
import { SosHelplineScreen } from '../features/sos/screens/SosHelplineScreen';

{/* My Profile */ }
import { MyProfileScreen } from '../features/my-profile/screens/MyProfileScreen';

{/* Settings Screens */ }
import { AccountSecurityPrivacyScreen } from '../features/settings/screens/AccountSecurityPrivacyScreen';
import { TransactionsScreen } from '../features/settings/screens/TransactionsScreen';
import { TherapyPlansScreen } from '../features/settings/screens/TherapyPlansScreen';
import { InviteFriendsScreen } from '../features/settings/screens/InviteFriendsScreen';
import { LogoutScreen } from '../features/settings/screens/LogoutScreen';
import { DeleteAccountWarningScreen } from '../features/settings/screens/DeleteAccountWarningScreen';
import { DeleteAccountFeedbackScreen } from '../features/settings/screens/DeleteAccountFeedbackScreen';
import { DeleteAccountVerificationScreen } from '../features/settings/screens/DeleteAccountVerificationScreen';
import { DeleteAccountScheduledScreen } from '../features/settings/screens/DeleteAccountScheduledScreen';
import { NotificationsSettingsScreen } from '../features/settings/screens/NotificationsSettingsScreen';
import { AboutSukhiSoulScreen } from '../features/settings/screens/AboutSukhiSoulScreen';
import { MoreSettingsScreen } from '../features/settings/screens/MoreSettingsScreen';
import { CustomerServiceCenterScreen } from '../features/settings/screens/CustomerServiceCenterScreen';
import { ClearCacheScreen } from '../features/settings/screens/ClearCacheScreen';
import { GeneralSettingsScreen } from '../features/settings/screens/GeneralSettingsScreen';

{/* Health flow */ }
import { HealthScreen } from '../features/health/screens/HealthScreen';
import { MeditationPlayerScreen } from '../features/health/screens/MeditationPlayerScreen';

{ /* Professionals */ }
import { SelectAClient } from '../features/professionals/sessionManagement/screens/SelectAClient';
import { SessionConfiguration } from '../features/professionals/sessionManagement/screens/SessionConfiguration';
import { SessionCreatedStatus } from '../features/professionals/sessionManagement/screens/SessionCreatedStatus';
import { SessionConfirmedStatus } from '../features/professionals/sessionManagement/screens/SessionConfirmedStatus';
import { SessionReadyScreen } from '../features/professionals/sessionManagement/screens/SessionReadyScreen';
import { NewClientFormScreen } from '../features/professionals/sessionManagement/screens/NewClientFormScreen';
import { ClientIdGeneratedScreen } from '../features/professionals/sessionManagement/screens/ClientIdGeneratedScreen';
import { NewClientSessionConfigScreen } from '../features/professionals/sessionManagement/screens/NewClientSessionConfigScreen';
import { OnboardingStatusScreen } from '../features/professionals/sessionManagement/screens/OnboardingStatusScreen';
import { TherapistApprovalDashboard } from '../features/professionals/therapistApprovalFlow/screens/TherapistApprovalDashboard';
import { ReschedulingRequestScreen } from '../features/professionals/therapistApprovalFlow/screens/ReschedulingRequestScreen';
import { ConfirmApprovalScreen } from '../features/professionals/therapistApprovalFlow/screens/ConfirmApprovalScreen';
import { RescheduleSuccessScreen } from '../features/professionals/therapistApprovalFlow/screens/RescheduleSuccessScreen';
import { SuggestAlternativesScreen } from '../features/professionals/therapistApprovalFlow/screens/SuggestAlternativesScreen';
import { ReviewPreferencesScreen } from '../features/professionals/therapistApprovalFlow/screens/ReviewPreferencesScreen';
import { AlternativesSentSuccessScreen } from '../features/professionals/therapistApprovalFlow/screens/AlternativesSentSuccessScreen';
import { EndSessionScreen } from '../features/professionals/sessionCompletionFlow/screens/EndSessionScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<AppStackParamList>();

import { useNotifications } from '../features/notifications/hooks/useNotifications';

interface CustomTabBarProps extends BottomTabBarProps { }

const FloatingButtons: React.FC = () => {
  const nav = useNavigation<NavigationProp>();
  const { data: notifData } = useNotifications();
  const hasUnread = (notifData?.unread_count ?? 0) > 0;

  return (
    <View style={styles.floatingBtnsWrapper}>
      {/* Bell / Notification */}
      <TouchableOpacity
        style={styles.fabBtn}
        activeOpacity={0.85}
        onPress={() => nav.navigate('Notifications')}
      >
        <Bell size={normalize(25)} color={colors.typographyColor['Dark 2']} strokeWidth={2.3} />
        {/* Red notification dot - only show when there are unread notifications */}
        {hasUnread && <View style={styles.fabNotifDot} />}
      </TouchableOpacity>

      {/* SOS */}
      <TouchableOpacity
        style={styles.fabBtn}
        activeOpacity={0.85}
        onPress={() => nav.navigate('Sos')}
      >
        <Phone size={normalize(25)} color={colors.colorPalet['Color 6']} fill={colors.colorPalet['Color 6']} strokeWidth={1} />
        <View style={styles.fabSosBadge}>
          <Text style={styles.fabSosBadgeText}>SOS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <>
      {/* Floating Bell + SOS buttons (sticky, above tab bar) */}
      <FloatingButtons />

      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const icons = TAB_ICONS[route.name];
          const iconSource = isFocused ? icons?.active : icons?.default;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              {isFocused ? (
                <View style={styles.activeTabBubble}>
                  <Image
                    source={iconSource}
                    style={styles.tabIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.activeTabText}>
                    {label as string}
                  </Text>
                </View>
              ) : (
                <View style={styles.inactiveTabContainer}>
                  <Image
                    source={iconSource}
                    style={styles.tabIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.inactiveTabText}>
                    {label as string}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Chats"
        component={InboxListScreen}
        options={{
          tabBarLabel: 'Chats',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};


export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="PsychologistProfile" component={PsychologistProfile} />
      <Stack.Screen name="BookTherapy" component={BookTherapy} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
      <Stack.Screen name="Redeem" component={RedeemScreen} />
      <Stack.Screen name="RedeemSuccess" component={RedeemSuccessScreen} />
      <Stack.Screen name="ExplorePsychologists" component={ExplorePsychologistsScreen} />
      <Stack.Screen name="TherapistDashboard" component={TherapistDashboard} />
      <Stack.Screen name="RescheduleSession" component={RescheduleSessionScreen} />
      <Stack.Screen name="ReschedulePreferences" component={ReschedulePreferencesScreen} />
      <Stack.Screen name="RescheduleReview" component={RescheduleReviewScreen} />
      <Stack.Screen name="RescheduleStatus" component={RescheduleStatusScreen} />
      <Stack.Screen name="RescheduleNewOptions" component={RescheduleNewOptionsScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      <Stack.Screen name="TaskHistory" component={TaskHistory} />
      <Stack.Screen name="WeeklyGoal" component={WeeklyGoal} />
      <Stack.Screen name="CareNotes" component={CareNotes} />
      <Stack.Screen name="SessionOverview" component={SessionOverview} />

      <Stack.Screen name="InboxList" component={InboxListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      {/* Not-The-Right-Fit flow */}
      <Stack.Screen name="NtfStart" component={NtfStartScreen} />
      <Stack.Screen name="NtfFeedback" component={NtfFeedbackScreen} />
      <Stack.Screen name="NtfSessionStyle" component={NtfSessionStyleScreen} />
      <Stack.Screen name="NtfIdealTherapist" component={NtfIdealTherapistScreen} />
      <Stack.Screen name="NtfImportantIn" component={NtfImportantInScreen} />
      <Stack.Screen name="NtfPreferences" component={NtfPreferencesScreen} />
      <Stack.Screen name="NtfFindingMatch" component={NtfFindingMatchScreen} />
      <Stack.Screen name="NtfMatchFound" component={NtfMatchFoundScreen} />
      <Stack.Screen name="RewardsUnlocked" component={RewardsUnlockedScreen} />

      {/* Data Collection flow */}
      <Stack.Screen name="DcNameDob" component={DcNameDobScreen} />
      <Stack.Screen name="DcGender" component={DcGenderScreen} />
      <Stack.Screen name="DcContactInfo" component={DcContactInfoScreen} />
      <Stack.Screen name="DcLanguage" component={DcLanguageScreen} />

      {/* New User Therapy Questions flow */}
      <Stack.Screen name="NutqIssues" component={NutqIssuesScreen} />
      <Stack.Screen name="NutqAreas" component={NutqAreasScreen} />
      <Stack.Screen name="NutqDuration" component={NutqDurationScreen} />
      <Stack.Screen name="NutqHistory" component={NutqHistoryScreen} />
      <Stack.Screen name="NutqPreferences" component={NutqPreferencesScreen} />
      <Stack.Screen name="NutqSafety" component={NutqSafetyScreen} />
      <Stack.Screen name="NutqGoals" component={NutqGoalsScreen} />
      <Stack.Screen name="NutqPrivacy" component={NutqPrivacyScreen} />

      {/* Questions before Session flow */}
      <Stack.Screen name="QbsFeeling" component={QbsFeelingScreen} />
      <Stack.Screen name="QbsWeekRating" component={QbsWeekRatingScreen} />
      <Stack.Screen name="QbsProgress" component={QbsProgressScreen} />
      <Stack.Screen name="QbsSleep" component={QbsSleepScreen} />
      <Stack.Screen name="QbsEvents" component={QbsEventsScreen} />
      <Stack.Screen name="QbsDiscussion" component={QbsDiscussionScreen} />
      <Stack.Screen name="QbsSafety" component={QbsSafetyScreen} />

      {/* Session Completed flow */}
      <Stack.Screen name="SessionCompleted" component={SessionCompletedScreen} />
      <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
      <Stack.Screen name="ReportIssueSuccess" component={ReportIssueSuccessScreen} />

      {/* Gift Therapy flow */}
      <Stack.Screen name="GiftIntro" component={GiftIntroScreen} />
      <Stack.Screen name="GiftRecipient" component={GiftRecipientScreen} />
      <Stack.Screen name="GiftCustomMessage" component={GiftCustomMessageScreen} />
      <Stack.Screen name="GiftRecipientDetails" component={GiftRecipientDetailsScreen} />
      <Stack.Screen name="GiftReviewPay" component={GiftReviewPayScreen} />
      <Stack.Screen name="GiftSuccess" component={GiftSuccessScreen} />
      <Stack.Screen name="GiftManage" component={GiftManageScreen} />
      <Stack.Screen name="GiftDetails" component={GiftDetailsScreen} />

      {/* Gift Receiver flow */}
      <Stack.Screen name="GiftReceiverUnlock" component={GiftReceiverUnlockScreen} />
      <Stack.Screen name="GiftReceiverProfile" component={GiftReceiverProfileScreen} />

      {/* Family Care flow */}
      <Stack.Screen name="FcFillInfo" component={FcFillInfoScreen} />
      <Stack.Screen name="FcTherapyInfo" component={FcTherapyInfoScreen} />
      <Stack.Screen name="FcSelectTherapist" component={FcSelectTherapistScreen} />
      <Stack.Screen name="FcBookSession" component={FcBookSessionScreen} />

      {/* Notifications & SOS */}
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Sos" component={SosScreen} />
      <Stack.Screen name="SosHelpline" component={SosHelplineScreen} />

      {/* My Profile */}
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />

      {/* Settings */}
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AccountSecurityPrivacy" component={AccountSecurityPrivacyScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="TherapyPlans" component={TherapyPlansScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountWarningScreen} />
      <Stack.Screen name="DeleteAccountWarning" component={DeleteAccountWarningScreen} />
      <Stack.Screen name="DeleteAccountFeedback" component={DeleteAccountFeedbackScreen} />
      <Stack.Screen name="DeleteAccountVerification" component={DeleteAccountVerificationScreen} />
      <Stack.Screen name="DeleteAccountScheduled" component={DeleteAccountScheduledScreen} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} />
      <Stack.Screen name="AboutSukhiSoul" component={AboutSukhiSoulScreen} />
      <Stack.Screen name="MoreSettings" component={MoreSettingsScreen} />
      <Stack.Screen name="CustomerServiceCenter" component={CustomerServiceCenterScreen} />
      <Stack.Screen name="ClearCache" component={ClearCacheScreen} />
      <Stack.Screen name="StorageClearCache" component={ClearCacheScreen} />
      <Stack.Screen name="GeneralSettings" component={GeneralSettingsScreen} />

      {/* Health & Meditation */}
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />

      {/* Professionals */}
      <Stack.Screen name="SelectAClient" component={SelectAClient} />
      <Stack.Screen name="SessionConfiguration" component={SessionConfiguration} />
      <Stack.Screen name="SessionCreatedStatus" component={SessionCreatedStatus} />
      <Stack.Screen name="SessionConfirmedStatus" component={SessionConfirmedStatus} />
      <Stack.Screen name="SessionReady" component={SessionReadyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewClientFormScreen" component={NewClientFormScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ClientIdGeneratedScreen" component={ClientIdGeneratedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewClientSessionConfigScreen" component={NewClientSessionConfigScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingStatusScreen" component={OnboardingStatusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TherapistApprovalDashboard" component={TherapistApprovalDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="ReschedulingRequestScreen" component={ReschedulingRequestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ConfirmApprovalScreen" component={ConfirmApprovalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RescheduleSuccessScreen" component={RescheduleSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SuggestAlternativesScreen" component={SuggestAlternativesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ReviewPreferencesScreen" component={ReviewPreferencesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AlternativesSentSuccessScreen" component={AlternativesSentSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EndSessionScreen" component={EndSessionScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: normalize(1),
    left: normalize(1),
    right: normalize(1),
    backgroundColor: '#EAF0FC',
    height: normalize(86),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(40),
    borderTopWidth: 0,
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeTabBubble: {
    backgroundColor: colors.blue[100],
    borderRadius: normalize(20),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(70),
    minWidth: normalize(105),
  },
  inactiveTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(70),
  },
  activeTabText: {
    color: colors.blue[700],
    fontSize: normalize(12),
    fontFamily: typography.fontFamily.primary.semiBold,
    marginTop: normalize(4),
    textAlign: 'center',
  },
  inactiveTabText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    fontFamily: typography.fontFamily.primary.regular,
    marginTop: normalize(4),
    textAlign: 'center',
  },
  tabIcon: {
    width: normalize(24),
    height: normalize(24),
  },

  // ── Floating Action Buttons (Bell + SOS) ────────────────────────────────────
  floatingBtnsWrapper: {
    position: 'absolute',
    right: normalize(16),
    bottom: normalize(100), // sits above the tab bar
    alignItems: 'center',
    gap: normalize(10),
    zIndex: 999,
    elevation: 20,
  },
  fabBtn: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  fabNotifDot: {
    position: 'absolute',
    top: normalize(0),
    right: normalize(0),
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(99),
    backgroundColor: '#EF4444',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  fabSosBadge: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(6),
    backgroundColor: colors.colorPalet['Color 6'],
    borderRadius: normalize(4),
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(2),
  },
  fabSosBadgeText: {
    color: '#FFFFFF',
    fontSize: normalize(7),
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
