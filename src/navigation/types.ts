import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  OTP: { confirmation: any; phoneNumber: string };
  Register: undefined;
  ForgotPassword: { email?: string };
  PartnershipWebView: { url?: string };
  Home: undefined;
  Psychologist: undefined;
  PsychologistProfile: {
    doctorName?: string;
    doctorId?: string;
    designation?: string;
    price?: number;
    avatarUrl?: string;
    rating?: string;
    experience?: string;
    bio?: string;
    languages?: string[];
    expertise?: string[];
  } | undefined;
  BookTherapy: {
    doctorName: string;
    doctorId: string;
    designation: string;
    price: number;
    selectedDate?: number;
    selectedTime?: string;
  };
  ConfirmBooking: {
    doctorName: string;
    doctorId: string;
    designation: string;
    date: string;
    dateFormatted?: string;
    time: string;
    duration: string;
    price?: number;
    isFamilyCare?: boolean;
  };
  PaymentResult: {
    status: 'success' | 'failed' | 'approval_pending';
    doctorName: string;
    designation: string;
    date: string;
    time: string;
    amount: number;
    transactionId: string;
    planLabel: string;
  };
  Manifest: undefined;
  InboxList: undefined;
  Chat: {
    conversationId?: string;
    professionalUuid?: string;
    doctorName?: string;
    avatarUrl?: string;
    role?: string;
  } | undefined;
  Redeem: undefined;
  RedeemSuccess: undefined;
  RewardsUnlocked: undefined;
  ExplorePsychologists: undefined;
  TherapistDashboard: undefined;
  RescheduleSession: { bookingId?: number; bookingUuid?: string } | undefined;
  TaskHistory: undefined;
  WeeklyGoal: undefined;
  CareNotes: undefined;
  SessionOverview: undefined;
  ReschedulePreferences: {
    reason: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  RescheduleReview: {
    reason: string;
    bookingId?: number;
    bookingUuid?: string;
    preferences: Array<{
      day: number;
      slot: string;
      dayLabel: string;
      fullDateLabel?: string;
      dateString?: string;
    }>;
  };
  RescheduleStatus: {
    status: 'pending' | 'rescheduled';
    date?: string;
    time?: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  RescheduleNewOptions: { bookingId?: number; bookingUuid?: string } | undefined;
  AppointmentDetails: {
    status: 'upcoming' | 'rescheduled' | 'pending_approval';
    date: string;
    time: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  VideoCall: {
    roomUrl: string;
    therapistName?: string;
    sessionUuid?: string;
  };
  // Not-The-Right-Fit flow
  NtfStart: undefined;
  NtfFeedback: undefined;
  NtfSessionStyle: undefined;
  NtfIdealTherapist: undefined;
  NtfImportantIn: undefined;
  NtfPreferences: undefined;
  NtfFindingMatch: undefined;
  NtfMatchFound: undefined;
  // Data Collection flow
  DcNameDob: undefined;
  DcGender: undefined;
  DcContactInfo: undefined;
  DcLanguage: undefined;
  // New User Therapy Questions flow
  NutqIssues: undefined;
  NutqAreas: undefined;
  NutqDuration: undefined;
  NutqHistory: undefined;
  NutqPreferences: undefined;
  NutqSafety: undefined;
  NutqGoals: undefined;
  NutqPrivacy: undefined;
  QbsFeeling: undefined;
  QbsWeekRating: undefined;
  QbsProgress: undefined;
  QbsSleep: undefined;
  QbsEvents: undefined;
  QbsDiscussion: undefined;
  QbsSafety: undefined;

  // Session Completed flow
  SessionCompleted: undefined;
  ReportIssue: undefined;
  ReportIssueSuccess: undefined;

  // Gift Therapy flow
  GiftIntro: undefined;
  GiftRecipient: undefined;
  GiftCustomMessage: undefined;
  GiftRecipientDetails: undefined;
  GiftReviewPay: undefined;
  GiftSuccess: undefined;
  GiftManage: undefined;
  GiftDetails: undefined;

  // Gift Receiver flow
  GiftReceiverUnlock: undefined;
  GiftReceiverProfile: undefined;

  // Family Care flow
  FcFillInfo: undefined;
  FcTherapyInfo: undefined;
  FcSelectTherapist: undefined;
  FcBookSession: {
    doctorName: string;
    doctorId: string;
    designation: string;
    price: number;
  };

  // Notifications & SOS
  Notifications: undefined;
  Sos: undefined;
  SosHelpline: undefined;

  // My Profile & Settings
  MyProfile: undefined;
  Settings: undefined;
  AccountSecurityPrivacy: undefined;
  Transactions: undefined;
  TherapyPlans: undefined;
  InviteFriends: undefined;
  Logout: undefined;
  DeleteAccount: undefined;
  DeleteAccountWarning: undefined;
  DeleteAccountFeedback: undefined;
  DeleteAccountVerification: undefined;
  DeleteAccountScheduled: undefined;
  NotificationsSettings: undefined;
  AboutSukhiSoul: undefined;
  MoreSettings: undefined;
  CustomerServiceCenter: undefined;
  ClearCache: undefined;
  StorageClearCache: undefined;
  GeneralSettings: undefined;
  Health: undefined;
  MeditationPlayer: { trackId?: string; title?: string } | undefined;

  SelectAClient: undefined;
  SessionConfiguration: undefined;
  SessionCreatedStatus: undefined;
  SessionConfirmedStatus: undefined;
  SessionReady: undefined;
  TherapistApprovalDashboard: undefined;
  ReschedulingRequestScreen: undefined;
  ConfirmApprovalScreen: undefined;
  RescheduleSuccessScreen: undefined;
  SuggestAlternativesScreen: undefined;
  ReviewPreferencesScreen: undefined;
  AlternativesSentSuccessScreen: undefined;
  EndSessionScreen: undefined;
  OnboardingStatusScreen: undefined;
  NewClientFormScreen: undefined;
  ClientIdGeneratedScreen: undefined;
  NewClientSessionConfigScreen: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  HabitDetail: { id: string };
  MoodEntry: undefined;
  Settings: undefined;
  Psychologist: undefined;
  PsychologistProfile: {
    doctorName?: string;
    doctorId?: string;
    designation?: string;
    price?: number;
    avatarUrl?: string;
    rating?: string;
    experience?: string;
    bio?: string;
    languages?: string[];
    expertise?: string[];
  } | undefined;
  BookTherapy: {
    doctorName: string;
    doctorId: string;
    designation: string;
    price: number;
    selectedDate?: number;
    selectedTime?: string;
  };
  ConfirmBooking: {
    doctorName: string;
    doctorId: string;
    designation: string;
    date: string;
    dateFormatted?: string;
    time: string;
    duration: string;
    price?: number;
    isFamilyCare?: boolean;
  };
  PaymentResult: {
    status: 'success' | 'failed' | 'approval_pending';
    doctorName: string;
    designation: string;
    date: string;
    time: string;
    amount: number;
    transactionId: string;
    planLabel: string;
  };
  Redeem: undefined;
  InboxList: undefined;
  Chat: {
    conversationId?: string;
    professionalUuid?: string;
    doctorName?: string;
    avatarUrl?: string;
    role?: string;
  } | undefined;
  RedeemSuccess: undefined;
  RewardsUnlocked: undefined;
  ExplorePsychologists: undefined;
  TherapistDashboard: undefined;
  RescheduleSession: { bookingId?: number; bookingUuid?: string } | undefined;
  TaskHistory: undefined;
  WeeklyGoal: undefined;
  CareNotes: undefined;
  SessionOverview: undefined;
  ReschedulePreferences: {
    reason: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  RescheduleReview: {
    reason: string;
    bookingId?: number;
    bookingUuid?: string;
    preferences: Array<{
      day: number;
      slot: string;
      dayLabel: string;
      fullDateLabel?: string;
      dateString?: string;
    }>;
  };
  RescheduleStatus: {
    status: 'pending' | 'rescheduled';
    date?: string;
    time?: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  RescheduleNewOptions: { bookingId?: number; bookingUuid?: string } | undefined;
  AppointmentDetails: {
    status: 'upcoming' | 'rescheduled' | 'pending_approval';
    date: string;
    time: string;
    bookingId?: number;
    bookingUuid?: string;
  };
  VideoCall: {
    roomUrl: string;
    therapistName?: string;
    sessionUuid?: string;
  };
  // Not-The-Right-Fit flow
  NtfStart: undefined;
  NtfFeedback: undefined;
  NtfSessionStyle: undefined;
  NtfIdealTherapist: undefined;
  NtfImportantIn: undefined;
  NtfPreferences: undefined;
  NtfFindingMatch: undefined;
  NtfMatchFound: undefined;

  // Data Collection flow
  DcNameDob: undefined;
  DcGender: undefined;
  DcContactInfo: undefined;
  DcLanguage: undefined;

  // New User Therapy Questions flow
  NutqIssues: undefined;
  NutqAreas: undefined;
  NutqDuration: undefined;
  NutqHistory: undefined;
  NutqPreferences: undefined;
  NutqSafety: undefined;
  NutqGoals: undefined;
  NutqPrivacy: undefined;

  QbsFeeling: undefined;
  QbsWeekRating: undefined;
  QbsProgress: undefined;
  QbsSleep: undefined;
  QbsEvents: undefined;
  QbsDiscussion: undefined;
  QbsSafety: undefined;

  // Session Completed flow
  SessionCompleted: {
    doctorId?: string;
    doctorName?: string;
    designation?: string;
    avatarUrl?: string;
    experience?: string;
  } | undefined;
  ReportIssue: undefined;
  ReportIssueSuccess: undefined;

  // Gift Therapy flow
  GiftIntro: undefined;
  GiftRecipient: undefined;
  GiftCustomMessage: undefined;
  GiftRecipientDetails: undefined;
  GiftReviewPay: undefined;
  GiftSuccess: undefined;
  GiftManage: undefined;
  GiftDetails: undefined;

  // Gift Receiver flow
  GiftReceiverUnlock: undefined;
  GiftReceiverProfile: undefined;

  // Family Care flow
  FcFillInfo: undefined;
  FcTherapyInfo: undefined;
  FcSelectTherapist: undefined;
  FcBookSession: {
    doctorName: string;
    doctorId: string;
    designation: string;
    price: number;
  };

  // Notifications & SOS
  Notifications: undefined;
  Sos: undefined;
  SosHelpline: undefined;

  // My Profile & Settings
  MyProfile: undefined;
  AccountSecurityPrivacy: undefined;
  Transactions: undefined;
  TherapyPlans: undefined;
  InviteFriends: undefined;
  Logout: undefined;
  DeleteAccount: undefined;
  DeleteAccountWarning: undefined;
  DeleteAccountFeedback: undefined;
  DeleteAccountVerification: undefined;
  DeleteAccountScheduled: undefined;
  NotificationsSettings: undefined;
  AboutSukhiSoul: undefined;
  MoreSettings: undefined;
  CustomerServiceCenter: undefined;
  ClearCache: undefined;
  StorageClearCache: undefined;
  GeneralSettings: undefined;
  Health: undefined;
  MeditationPlayer: { trackId?: string; title?: string } | undefined;

  SelectAClient: undefined;
  SessionConfiguration: undefined;
  SessionCreatedStatus: undefined;
  SessionConfirmedStatus: undefined;
  SessionReady: undefined;
  TherapistApprovalDashboard: undefined;
  ReschedulingRequestScreen: undefined;
  ConfirmApprovalScreen: undefined;
  RescheduleSuccessScreen: undefined;
  SuggestAlternativesScreen: undefined;
  ReviewPreferencesScreen: undefined;
  AlternativesSentSuccessScreen: undefined;
  EndSessionScreen: undefined;
  OnboardingStatusScreen: undefined;
  NewClientFormScreen: undefined;
  ClientIdGeneratedScreen: undefined;
  NewClientSessionConfigScreen: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chats: undefined;
  Settings: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
