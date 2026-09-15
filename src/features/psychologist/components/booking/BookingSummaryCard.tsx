import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Users,
  CalendarDays,
  Clock3,
  Timer,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

interface BookingSummaryCardProps {
  therapistName: string;
  date: string;
  time: string;
  duration: string;
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      {icon}
      <AppText variant="caption" weight="regular" style={styles.label}>
        {label}
      </AppText>
    </View>
    <AppText variant="caption" weight="semiBold" style={styles.value}>
      {value}
    </AppText>
  </View>
);

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  therapistName,
  date,
  time,
  duration,
}) => {

  return (
    <View style={[styles.card, { borderRadius: normalize(32) }]}>
      <AppText variant="body" weight="extraBold" style={styles.title}>
        Booking Summary
      </AppText>

      <SummaryRow
        icon={<Image source={require('../../assets/bookingSummary/ico1.png')} style={{ width: 20, height: 20, }} />}
        label="Therapist"
        value={therapistName}
      />
      <SummaryRow
        icon={<Image source={require('../../assets/bookingSummary/ico2.png')} style={{ width: 20, height: 20, }} />}
        label="Date"
        value={date}
      />
      <SummaryRow
        icon={<Image source={require('../../assets/bookingSummary/ico3.png')} style={{ width: 20, height: 20, }} />}
        label="Time"
        value={time}
      />
      <SummaryRow
        icon={<Image source={require('../../assets/bookingSummary/ico4.png')} style={{ width: 20, height: 20, }} />}
        label="Duration"
        value={duration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: normalize(24),
    paddingTop: normalize(32),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  title: {
    fontSize: normalize(15),
    color: colors.blue[700],
    marginBottom: normalize(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  icon: {
    marginRight: normalize(2),
  },
  imageIcon: {
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(2),
  },
  label: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },
  value: {
    color: '#000000',
    fontSize: normalize(12),
  },
});
