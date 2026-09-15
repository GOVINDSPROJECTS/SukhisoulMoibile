import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, User } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface PreferenceReviewItemProps {
  index: 1 | 2 | 3;
  date: string;
  time: string;
  onChange: () => void;
}

const ORDINAL_LABELS = ['1ST PREFERENCE', '2ND PREFERENCE', '3RD PREFERENCE'] as const;

export const PreferenceReviewItem: React.FC<PreferenceReviewItemProps> = ({
  index,
  date,
  time,
  onChange,
}) => (
  <View style={styles.container}>
    {/* Header row */}
    <View style={styles.headerRow}>
      <View style={styles.iconCircle}>
        <User size={normalize(19)} color={colors.lightAppTheme[700]} strokeWidth={1.8} />
      </View>
      <AppText variant="caption" weight="semiBold" style={styles.label}>
        {ORDINAL_LABELS[index - 1]}
      </AppText>
    </View>

    {/* Date */}
    <View style={styles.detailRow}>
      <Calendar size={normalize(13)} color={colors.blue[600]} strokeWidth={1.5} />
      <AppText variant="caption" family='secondary' weight="semiBold" style={styles.detailText}>
        {date}
      </AppText>
    </View>

    {/* Time */}
    <View style={styles.detailRow}>
      <Clock size={normalize(13)} color={colors.blue[600]} strokeWidth={1.5} />
      <AppText variant="caption" family='secondary' weight="semiBold" style={styles.detailText}>
        {time}
      </AppText>
    </View>

    {/* Change link */}
    <TouchableOpacity onPress={onChange} activeOpacity={0.7}>
      <AppText variant="caption" weight="semiBold" style={styles.changeLink}>
        Change
      </AppText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(14),
    marginBottom: normalize(12),
    borderWidth: 1,
    borderColor: "#F3F4F6",
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(10),
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: "#EFF6FF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: "#9CA3AF",
    fontSize: normalize(11),
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(6),
  },
  detailText: {
    color: "#374151",
    fontSize: normalize(12),
  },
  changeLink: {
    color: "#1D61D1",
    fontSize: normalize(12),
    marginTop: normalize(5),
    paddingVertical: normalize(5),
  },
});
