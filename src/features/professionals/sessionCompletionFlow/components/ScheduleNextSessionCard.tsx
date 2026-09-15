import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Flag } from 'lucide-react-native';
import { colors } from '@/theme';

export type ScheduleOption = 'yes' | 'no' | null;

interface ScheduleNextSessionCardProps {
  selectedOption: ScheduleOption;
  onSelectOption: (option: 'yes' | 'no') => void;
}

export const ScheduleNextSessionCard: React.FC<ScheduleNextSessionCardProps> = ({
  selectedOption,
  onSelectOption,
}) => {
  return (
    <View style={styles.card}>
      <AppText family="primary" weight="bold" style={styles.cardTitle}>
        Schedule Next Session
      </AppText>

      {/* Option 1: Yes */}
      <TouchableOpacity
        style={[
          styles.optionBox,
          selectedOption === 'yes' && styles.optionBoxSelected,
        ]}
        activeOpacity={0.7}
        onPress={() => onSelectOption('yes')}
      >
        {/* Radio Circle */}
        <View
          style={[
            styles.radioCircle,
            selectedOption === 'yes' && styles.radioCircleSelected,
          ]}
        >
          {selectedOption === 'yes' && <View style={styles.radioInnerDot} />}
        </View>

        {/* Flag Icon Container */}
        <View style={styles.flagWrapper}>
          <Flag size={normalize(18)} color="#475569" fill="#475569" />
        </View>

        {/* Text Col */}
        <View style={styles.textCol}>
          <AppText family="secondary" weight="bold" style={styles.optionTitle}>
            Yes,
          </AppText>
          <AppText family="secondary" weight="light" style={styles.optionSubtitle}>
            Schedule next session
          </AppText>
        </View>
      </TouchableOpacity>

      {/* Option 2: No */}
      <TouchableOpacity
        style={[
          styles.optionBox,
          selectedOption === 'no' && styles.optionBoxSelected,
        ]}
        activeOpacity={0.7}
        onPress={() => onSelectOption('no')}
      >
        {/* Radio Circle */}
        <View
          style={[
            styles.radioCircle,
            selectedOption === 'no' && styles.radioCircleSelected,
          ]}
        >
          {selectedOption === 'no' && <View style={styles.radioInnerDot} />}
        </View>

        {/* Flag Icon Container */}
        <View style={styles.flagWrapper}>
          <Flag size={normalize(18)} color="#475569" fill="#475569" />
        </View>

        {/* Text Col */}
        <View style={styles.textCol}>
          <AppText family="secondary" weight="bold" style={styles.optionTitle}>
            No
          </AppText>
          <AppText family="secondary" weight="light" style={styles.optionSubtitle}>
            Set Reminder to schedule next session
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Black,
    marginBottom: normalize(14),
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.tintsGrey[50],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(14),
    marginBottom: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  optionBoxSelected: {
    borderWidth: 2,
    borderColor: colors.lightAppTheme[700],
    backgroundColor: colors.blue[50],
  },
  radioCircle: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(99),
    borderWidth: 1.5,
    borderColor: colors.tintsGrey[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  radioCircleSelected: {
    borderWidth: 2,
    borderColor: colors.tintsGrey[100],
  },
  radioInnerDot: {
    width: normalize(15),
    height: normalize(15),
    borderRadius: normalize(99),
    backgroundColor: colors.lightAppTheme[700],
  },
  flagWrapper: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(10),
    backgroundColor: colors.tintsGrey[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  textCol: {
    flex: 1,
  },
  optionTitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Black,
    marginBottom: normalize(2),
  },
  optionSubtitle: {
    fontSize: normalize(11),
    color: colors.typographyColor.Black,
    lineHeight: normalize(15),
  },
});
