import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NewOptionItemProps {
  index: 1 | 2 | 3;
  date: string;
  time: string;
  selected: boolean;
  onSelect: () => void;
}

export const NewOptionItem: React.FC<NewOptionItemProps> = ({
  index,
  date,
  time,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.container, selected && styles.containerSelected]}
    onPress={onSelect}
    activeOpacity={0.8}
  >
    <View style={styles.content}>
      <AppText variant="body" family='secondary' weight="bold" style={styles.optionLabel}>
        OPTION {index}
      </AppText>
      <View style={styles.detailRow}>
        <AppText variant="body" family='secondary' weight="bold" style={styles.detailText}>
          {date}
        </AppText>
      </View>
      <View style={styles.detailRow}>
        <AppText variant="caption" weight="semiBold" style={styles.timeText}>
          {time}
        </AppText>
      </View>
    </View>

    {/* Radio indicator */}
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F8FF',
    borderRadius: normalize(16),
    padding: normalize(14),
    marginBottom: normalize(10),
  },
  containerSelected: {
    // borderColor: colors.lightAppTheme[700],
    // backgroundColor: colors.lightTints.blueLightTint[50],
  },
  content: {
    flex: 1,
    gap: normalize(4),
  },
  optionLabel: {
    color: "#4A5B78",
    fontSize: normalize(10),
    letterSpacing: 0.5,
    marginBottom: normalize(4),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  detailText: {
    color: "#1A2E4E",
    fontSize: normalize(12),
  },
  timeText: {
    color: "#4A5B78",
    fontSize: normalize(11),
  },
  radio: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    borderWidth: 2,
    borderColor: "#6B7280",
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(12),
  },
  radioSelected: {
    borderColor: "#2563EB",
    borderWidth: 0
  },
  radioDot: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: "#2563EB",
  },
});
