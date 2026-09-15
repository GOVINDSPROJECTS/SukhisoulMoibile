import { colors, useTheme } from '@/theme';
import { normalize } from '@/utils/responsive';
import { AppText } from '@components/atoms/AppText';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';
import { Calendar, Check, ChevronRight, Clock, Link, Video } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colorTokens } from '@/theme/tokens';
import { useQbsStore } from '../../../questions-before-session/store/useQbsStore';

// ─── Types ──────────────────────────────────────────────────────────────────

export type SessionStatus =
  | 'confirmed'
  | 'missed'
  | 'therapist_missed'
  | 'approval_pending'
  | 'rescheduling_request';

export interface CommonSessionCardProps {
  status: SessionStatus;
  dateTime?: string;
  duration?: string;
  originalTime?: string;
  requestedNewTime?: string;
  isCompleted?: boolean;
  onJoin?: () => void;
  onReschedule?: () => void;
  onStartQuiz?: () => void;
  onApproveTime?: () => void;
  onChooseAnotherTime?: () => void;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Header row: icon + title + date & duration */
const SessionHeader: React.FC<{
  title: string;
  titleColor?: string;
  iconSource: any;
  iconBg?: string;
  dateTime: string;
  duration: string;
}> = ({ title, titleColor = '#2D3432', iconSource, iconBg, dateTime, duration }) => (
  <View style={styles.headerRow}>
    <View style={[styles.iconWrapper, iconBg ? { backgroundColor: iconBg } : {}]}>
      <Image source={iconSource} style={styles.iconImage} />
    </View>
    <View style={styles.headerInfo}>
      <AppText variant="h4" weight="extraBold" style={[styles.sessionTitle, { color: titleColor }]}>
        {title}
      </AppText>
      <View style={styles.metaRow}>
        <View style={[styles.metaItem, { width: '65%' }]}>
          <Calendar size={13} color={colors.blue[700]} />
          <AppText variant="caption" weight="regular" style={styles.metaLabel}>Date & Time</AppText>
        </View>
        <View style={styles.metaItem}>
          <Image source={require('../../assets/sessions-left.png')} style={styles.durationIcon} />
          <AppText variant="caption" weight="regular" style={styles.metaLabel}>Duration</AppText>
        </View>
      </View>
      <View style={styles.metaRow}>
        <AppText variant="caption" weight="semiBold" style={[styles.metaValue, { width: '65%' }]}>
          {dateTime}
        </AppText>
        <AppText variant="caption" weight="semiBold" style={[styles.metaValue, { width: '35%' }]}>
          {duration}
        </AppText>
      </View>
    </View>
  </View>
);

/** Join session button (blue pill) */
const JoinButton: React.FC<{ onPress?: () => void; tintColor?: string; bgColor?: string; dateTime?: string; duration?: string }> = ({
  onPress,
  tintColor = colors.blue[500],
  bgColor = colors.tintsBlue[400],
  dateTime,
  duration,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const handleJoin = onPress || (() => {
    navigation.navigate('AppointmentDetails', {
      status: 'upcoming',
      date: dateTime ?? 'Upcoming Session',
      time: duration ? `${dateTime ?? 'Scheduled'} • ${duration}` : (dateTime ?? 'Scheduled Session'),
    });
  });

  return (
    <TouchableOpacity activeOpacity={0.6} style={{ borderRadius: 11, marginTop: normalize(12) }} onPress={handleJoin}>
      <View style={[styles.joinBtn, { backgroundColor: bgColor }]}>
        <Video size={15} color={tintColor} />
        <View style={styles.joinBtnCenter}>
          <Link size={14} color={tintColor} />
          <AppText variant="caption" weight="medium" style={[styles.joinBtnText, { color: tintColor }]}>
            Click Here To Join Your Theraphy
          </AppText>
        </View>
        <ChevronRight size={16} color={tintColor} />
      </View>
    </TouchableOpacity>
  );
};

// ─── Status Variants ─────────────────────────────────────────────────────────

/** confirmed */
const ConfirmedCard: React.FC<Pick<CommonSessionCardProps, 'dateTime' | 'duration' | 'isCompleted' | 'onJoin' | 'onStartQuiz'>> = ({
  dateTime = 'Upcoming Session',
  duration = '50 Minutes',
  isCompleted: isCompletedProp,
  onJoin,
  onStartQuiz,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const storeIsCompleted = useQbsStore(s => s.isCompleted);
  const isQbsCompleted = isCompletedProp ?? storeIsCompleted;
  const handleStart = onStartQuiz || (() => navigation.navigate('QbsFeeling'));

  return (
    <View style={styles.card}>
      <SessionHeader
        title="Confirmed Session"
        iconSource={require('../../assets/calender-icon.png')}
        dateTime={dateTime}
        duration={duration}
      />
      <JoinButton onPress={onJoin} dateTime={dateTime} duration={duration} />
      <View style={styles.questionsRow}>
        <View style={styles.questionsText}>
          <AppText variant="h4" weight="extraBold" style={styles.questionsTitle}>Questions Before Theraphy</AppText>
          <AppText variant="caption" weight="medium" style={styles.questionsSubtitle}>
            {isQbsCompleted ? 'Responses submitted to your therapist' : 'Help your therapist understand you better'}
          </AppText>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleStart}>
          <LinearGradient
            colors={isQbsCompleted ? ['#16A34A', '#15803D'] : [colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.startNowBtn, isQbsCompleted && { minWidth: normalize(100) }]}
          >
            <AppText variant="body" weight="bold" style={styles.startNowText}>
              {isQbsCompleted ? 'Completed ✓' : 'Start Now'}
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/** missed (user missed the session) */
const MissedCard: React.FC<Pick<CommonSessionCardProps, 'dateTime' | 'duration' | 'onJoin' | 'onReschedule'>> = ({
  dateTime = 'Upcoming Session',
  duration = '50 Minutes',
  onJoin,
  onReschedule,
}) => (
  <View style={styles.card}>
    <SessionHeader
      title="You Missed Your Session"
      titleColor={"#000000"}
      iconSource={require('../../assets/you-missed.png')}
      iconBg={colors.lightTints.redLightTint2[50]}
      dateTime={dateTime}
      duration={duration}
    />
    <JoinButton
      onPress={onJoin}
      tintColor={colors.blue[500]}
      bgColor={colors.lightTints.redLightTint2[50]}
      dateTime={dateTime}
      duration={duration}
    />
    <View style={styles.rescheduleRow}>
      <View style={styles.rescheduleClockWrapper}>
        <Clock size={22} color={colors.colorPalet['Color 5']} />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        <AppText variant="caption" weight="extraBold" style={styles.rescheduleTitle}>Want to Reschedule ?</AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={styles.rescheduleTextBlock}>
            <AppText variant="caption" weight="regular" style={styles.rescheduleSubtitle}>
              Life happens. Let's find a new time that works for you.
            </AppText>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={onReschedule} style={[styles.rescheduleOutlineBtn, { width: '40%' }]}>
            <AppText variant="caption" weight="extraBold" style={styles.rescheduleOutlineText}>
              Reschedule Session
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

/** therapist_missed */
const TherapistMissedCard: React.FC<Pick<CommonSessionCardProps, 'dateTime' | 'duration' | 'onJoin'>> = ({
  dateTime = 'Upcoming Session',
  duration = '50 Minutes',
  onJoin,
}) => (
  <View style={styles.card}>
    <SessionHeader
      title="Your Therapist Missed The Session"
      titleColor={"#000000"}
      iconSource={require('../../assets/therapist-missed.png')}
      iconBg={colors.lightTints.redLightTint2[50]}
      dateTime={dateTime}
      duration={duration}
    />
    <JoinButton
      onPress={onJoin}
      tintColor={colors.blue[500]}
      bgColor={colors.lightTints.redLightTint2[50]}
      dateTime={dateTime}
      duration={duration}
    />
    <View style={styles.rescheduleRow}>
      <View style={styles.rescheduleClockWrapper}>
        <Clock size={22} color={colors.colorPalet['Color 5']} />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        <AppText variant="caption" weight="extraBold" style={styles.rescheduleTitle}>We'll Reschedule for You</AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={styles.rescheduleTextBlock}>
            <AppText variant="caption" weight="regular" style={styles.rescheduleSubtitle}>
              We're finding a new time that works for you. You'll be notified shortly.
            </AppText>
          </View>
          <AppText variant="caption" weight="bold" style={styles.reschedulingInProgress}>
            Rescheduling{'\n'}In Progress
          </AppText>
        </View>
      </View>

    </View>
  </View>
);

/** approval_pending */
const ApprovalPendingCard: React.FC<Pick<CommonSessionCardProps, 'dateTime' | 'duration' | 'isCompleted' | 'onJoin' | 'onStartQuiz'>> = ({
  dateTime = 'Upcoming Session',
  duration = '50 Minutes',
  isCompleted: isCompletedProp,
  onJoin,
  onStartQuiz,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const storeIsCompleted = useQbsStore(s => s.isCompleted);
  const isQbsCompleted = isCompletedProp ?? storeIsCompleted;
  const handleStart = onStartQuiz || (() => navigation.navigate('QbsFeeling'));

  return (
    <View style={[styles.card, { backgroundColor: "#ffffff" }]}>
      <SessionHeader
        title="Approval Pending"
        titleColor="#000"
        iconSource={require('../../assets/approval-pending.png')}
        iconBg={colors.yellow[200]}
        dateTime={dateTime}
        duration={duration}
      />
      <JoinButton
        onPress={onJoin}
        tintColor={colors.blue[500]}
        bgColor={colors.lightTints.yellowLightTint[100]}
        dateTime={dateTime}
        duration={duration}
      />
      <View style={styles.questionsRow}>
        <View style={styles.questionsText}>
          <AppText variant="h4" weight="extraBold" style={[styles.questionsTitle, { color: colors.typographyColor['Dark 2'] }]}>
            Questions Before Theraphy
          </AppText>
          <AppText variant="caption" weight="medium" style={[styles.questionsSubtitle, { color: colors.typographyColor['Dark 2'] }]}>
            {isQbsCompleted ? 'Responses submitted to your therapist' : 'Help your therapist understand you better'}
          </AppText>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleStart}>
          <LinearGradient
            colors={isQbsCompleted ? ['#16A34A', '#15803D'] : [colors.lightAppTheme[700], colors.lightAppTheme[950]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.startNowBtn, { minWidth: normalize(isQbsCompleted ? 100 : 95) }]}
          >
            <AppText variant="body" weight="bold" style={styles.startNowText}>
              {isQbsCompleted ? 'Completed ✓' : 'Start Now'}
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/** rescheduling_request */
const ReschedulingRequestCard: React.FC<
  Pick<CommonSessionCardProps, 'originalTime' | 'requestedNewTime' | 'onApproveTime' | 'onChooseAnotherTime'>
> = ({
  originalTime = 'Fri, Oct 24 • 10:00 AM',
  requestedNewTime = 'Fri, Oct 24 • 2:00 PM',
  onApproveTime,
  onChooseAnotherTime,
}) => (
    <View style={styles.card}>
      <AppText variant="h4" weight="extraBold" style={[styles.sessionTitle, { marginBottom: normalize(4) }]}>
        Rescheduling Request
      </AppText>
      <AppText variant="caption" weight="regular" style={styles.rescheduleSubtitle}>
        They requested to reschedule your session
      </AppText>

      {/* Original → Requested Time */}
      <View style={styles.timelineRow}>
        <View style={styles.timelineItem}>
          <View style={styles.timeChip}>
            <Calendar size={20} color={colorTokens.purple[800]} />
            <View>
              <AppText variant="caption" weight="regular" style={styles.metaLabel}>Original Session</AppText>
              <AppText variant="caption" weight="semiBold" style={styles.timeChipText}>{originalTime}</AppText>
            </View>
          </View>
        </View>
        <View style={styles.arrow}>
          <AppText style={{ fontSize: normalize(18), color: colors.typographyColor['Color 2'] }}>→</AppText>
        </View>
        <View style={styles.timelineItem}>
          <View style={styles.timeChip}>
            <Calendar size={20} color={colorTokens.purple[800]} />
            <View>
              <AppText variant="caption" weight="regular" style={styles.metaLabel}>Requested New Time</AppText>
              <AppText variant="caption" weight="semiBold" style={styles.timeChipText}>{requestedNewTime}</AppText>
            </View>
          </View>
        </View>
      </View>

      {/* Waiting pill */}
      <View style={[styles.waitingPill, { backgroundColor: colorTokens.purple[50] }]}>
        <Clock size={20} color={colors.colorPalet['Color 2']} />
        <View style={{ marginLeft: normalize(10) }}>
          <AppText variant="caption" weight="semiBold" style={{ color: colorTokens.purple[800], fontSize: normalize(11) }}>
            Waiting for therapist to confirm
          </AppText>
          <AppText variant="caption" weight="regular" style={{ color: colors.typographyColor.Medium, fontSize: normalize(9.5) }}>
            We'll notify you once they respond
          </AppText>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.reschActionRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.reschBtn, { borderColor: "#cfc5df", paddingHorizontal: normalize(9) }]}
          onPress={onApproveTime}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <AppText style={styles.reschBtnIcon}>
              <Check size={18} color={colorTokens.purple[800]} />
            </AppText>
            <AppText variant="caption" weight="semiBold" style={[styles.reschBtnText, { color: colorTokens.purple[800] }]}>Approve Time</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.reschBtn, { borderColor: "#cfc5df", paddingHorizontal: normalize(9) }]}
          onPress={onChooseAnotherTime}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Calendar size={18} color={colorTokens.purple[800]} />
            <AppText variant="caption" weight="semiBold" style={[styles.reschBtnText, { color: colorTokens.purple[800], fontSize: normalize(9) }]}>Choose Another Time</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

// ─── Main Component ───────────────────────────────────────────────────────────

export const CommonSessionCard: React.FC<CommonSessionCardProps> = (props) => {
  const { status = 'confirmed', ...rest } = props;

  switch (status) {
    case 'confirmed':
      return <ConfirmedCard {...rest} />;
    case 'missed':
      return <MissedCard {...rest} />;
    case 'therapist_missed':
      return <TherapistMissedCard {...rest} />;
    case 'approval_pending':
      return <ApprovalPendingCard {...rest} />;
    case 'rescheduling_request':
      return <ReschedulingRequestCard {...rest} />;
    default:
      return null;
  }
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(15),
    padding: normalize(16),
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    marginRight: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: normalize(40),
    height: normalize(40),
  },
  headerInfo: {
    flex: 1,
  },
  sessionTitle: {
    color: '#2D3432',
    fontSize: normalize(13),
    marginBottom: normalize(4),
    marginTop: normalize(-5)
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    gap: 4,
  },
  metaLabel: {
    color: colors.typographyColor['Color 2'],
    fontSize: normalize(9.5),
  },
  metaValue: {
    color: colors.typographyColor['Color 2'],
    fontSize: normalize(9),
  },
  durationIcon: {
    width: 10,
    height: 13,
  },

  // Join button
  joinBtn: {
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
    minHeight: normalize(35),
  },
  joinBtnCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  joinBtnText: {
    fontSize: normalize(9),
  },

  // Questions before therapy
  questionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(15),
  },
  questionsText: {
    flex: 1,
    marginRight: normalize(10),
    gap: 3,
  },
  questionsTitle: {
    color: colors.blue[500],
    fontSize: normalize(11.5),
  },
  questionsSubtitle: {
    color: colors.blue[500],
    fontSize: normalize(9),
  },
  startNowBtn: {
    borderRadius: 50,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(14),
  },
  startNowText: {
    color: '#FFFFFF',
    fontSize: normalize(11),
    textAlign: 'center',
  },

  // Reschedule row
  rescheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(14),
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderRadius: normalize(12),
    padding: normalize(10),
    gap: normalize(8),
  },
  rescheduleClockWrapper: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    borderWidth: 1.5,
    borderColor: colors.colorPalet['Color 5'],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescheduleTextBlock: {
    flex: 1,
    gap: 2,
  },
  rescheduleTitle: {
    color: '#2D3432',
    fontSize: normalize(11),
  },
  rescheduleSubtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(9),
  },
  rescheduleOutlineBtn: {
    borderWidth: 1.5,
    borderColor: colors.colorPalet['Color 5'],
    borderRadius: 99,
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(10),
  },
  rescheduleOutlineText: {
    color: colors.colorPalet['Color 5'],
    fontSize: normalize(8),
    textAlign: 'center',

  },
  reschedulingInProgress: {
    color: colors.colorPalet['Color 5'],
    fontSize: normalize(10),
    textAlign: 'right',
  },

  // Rescheduling Request
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: normalize(5),
    marginBottom: normalize(5),
    gap: normalize(8),
  },
  timelineItem: {
    flex: 1,
    gap: 6,
  },
  arrow: {
    paddingTop: normalize(14),
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    // backgroundColor: colors.tintsBlue[50],
    // borderRadius: normalize(8),
    // paddingVertical: normalize(6),
    // paddingHorizontal: normalize(8),
  },
  timeChipText: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(8.5),
  },
  waitingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(12),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(18),
    marginTop: normalize(12),
  },
  reschActionRow: {
    flexDirection: 'row',
    gap: normalize(10),
    marginTop: normalize(14),
    alignItems: 'center',
    justifyContent: 'center'
  },
  reschBtn: {
    // flex: 1,
    borderWidth: 1.5,
    borderRadius: normalize(10),
    paddingVertical: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  reschBtnIcon: {
    fontSize: normalize(14),
    color: colors.typographyColor.Dark,
  },
  reschBtnText: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(9),
  },
});