import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { CalendarDays, Clock, CalendarHeart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface SessionDetailsCardProps {
  sessionData?: {
    sessionDate?: string;
    startTime?: string;
    duration?: string;
    focusAreas?: string[];
    reason?: string;
    documents?: any[];
  };
}

export const SessionDetailsCard: React.FC<SessionDetailsCardProps> = ({ sessionData }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const focusAreas = sessionData?.focusAreas && sessionData.focusAreas.length > 0
    ? sessionData.focusAreas
    : ['Anxiety', 'CBT', 'Stress'];

  const sessionDateTimeText = sessionData?.sessionDate && sessionData?.startTime
    ? `${sessionData.sessionDate},\n${sessionData.startTime}`
    : '24 Apr 2024,\n10:00 AM';

  const durationText = sessionData?.duration || '50 Minutes (Standard)';

  const Label = ({ text }: { text: string }) => (
    <AppText
      family="primary"
      weight="semiBold"
      style={{
        fontSize: normalize(9),
        color: colors.typographyColor.Light,
        textTransform: 'uppercase',
        marginBottom: normalize(4),
      }}
    >
      {text}
    </AppText>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <CalendarHeart size={normalize(18)} color={colors.purple[700]} style={{ marginRight: normalize(8) }} />
        <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark }}>
          Session Details
        </AppText>
      </View>

      <View style={styles.content}>
        {/* Client */}
        <View style={styles.rowBlock}>
          <Label text="Client" />
          <View style={styles.clientRow}>
            <View style={[styles.initialsCircle, { backgroundColor: colors.purple[50] }]}>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700] }}>
                PD
              </AppText>
            </View>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
              Prathmesh Deokar
            </AppText>
          </View>
        </View>

        {/* Date & Time | Focus Areas */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Label text="Date & Time" />
            <View style={styles.iconTextRow}>
              <CalendarDays size={normalize(12)} color={colors.purple[700]} style={{ marginRight: normalize(4) }} />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(11), color: colors.typographyColor.Dark }}>
                {sessionDateTimeText}
              </AppText>
            </View>
          </View>
          <View style={styles.col}>
            <Label text="Focus Areas" />
            <View style={styles.tagsContainer}>
              {focusAreas.map((area, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: colors.purple[50] }]}>
                  <AppText family="primary" weight="bold" style={{ fontSize: normalize(9), color: colors.purple[700] }}>
                    {area}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Duration | Amount */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Label text="Duration" />
            <View style={styles.iconTextRow}>
              <Clock size={normalize(12)} color={colors.purple[700]} style={{ marginRight: normalize(4) }} />
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: colors.typographyColor.Dark }}>
                {durationText}
              </AppText>
            </View>
          </View>
          <View style={styles.col}>
            <Label text="Amount" />
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
              ₹1,200
            </AppText>
          </View>
        </View>

        {/* Status */}
        <View style={styles.rowBlock}>
          <Label text="Status" />
          <View style={[styles.statusPill, { backgroundColor: colors.lightTints.yellowLightTint[50] || '#FBF7E9' }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.yellow[700] }]} />
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.yellow[800] }}>
              Payment Pending
            </AppText>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SelectAClient')}
        >
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: '#FFFFFF' }}>
            Go to Dashboard
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryBtn, { borderColor: colors.typographyColor.Light }]}
          activeOpacity={0.7}
        >
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
            View Session Details
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    marginHorizontal: normalize(20),
    marginBottom: normalize(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  content: {
    padding: normalize(20),
  },
  rowBlock: {
    marginBottom: normalize(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  col: {
    flex: 1,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialsCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(4),
  },
  tag: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(6),
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(12),
  },
  statusDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    marginRight: normalize(6),
  },
  buttonContainer: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(48),
    borderRadius: normalize(12),
    marginBottom: normalize(12),
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(48),
    borderRadius: normalize(12),
    borderWidth: 1,
  },
});
