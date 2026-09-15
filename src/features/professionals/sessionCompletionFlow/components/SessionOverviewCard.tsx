import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { FileText, Calendar, ClipboardList, ChevronRight } from 'lucide-react-native';
import { normalize } from '@utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme';

interface SessionOverviewCardProps {
  sessionSummary: string;
  setSessionSummary: (text: string) => void;
}

export const SessionOverviewCard: React.FC<SessionOverviewCardProps> = ({
  sessionSummary,
  setSessionSummary,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={{ marginBottom: normalize(16), }}>
      {/* Header Row: Blue File Icon + "Session Overview" */}
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <FileText size={normalize(18)} color="#FFFFFF" />
        </View>
        <AppText family="primary" weight="bold" style={styles.cardTitle}>
          Session Overview
        </AppText>
      </View>

      {/* Text Area for Session Summary */}
      <TextInput
        style={styles.textArea}
        multiline={true}
        placeholder="Type session summary here..."
        placeholderTextColor="#94A3B8"
        value={sessionSummary}
        onChangeText={setSessionSummary}
        textAlignVertical="top"
      />

      {/* Action Button: Weekly Goal -> Navigates to WeeklyGoalsScreen */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('WeeklyGoalsScreen')}
      >
        <View style={styles.actionLeftRow}>
          <Calendar size={normalize(16)} color="#2563EB" style={styles.actionIcon} />
          <AppText family="primary" weight="bold" style={styles.actionText}>
            Weekly Goal
          </AppText>
        </View>
        <ChevronRight size={normalize(16)} color="#94A3B8" />
      </TouchableOpacity>

      {/* Action Button: Care Notes -> Navigates to CareNotesScreen */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CareNotesScreen')}
      >
        <View style={styles.actionLeftRow}>
          <ClipboardList size={normalize(16)} color="#2563EB" style={styles.actionIcon} />
          <AppText family="primary" weight="bold" style={styles.actionText}>
            Care Notes
          </AppText>
        </View>
        <ChevronRight size={normalize(16)} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(14),
  },
  iconBox: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    backgroundColor: colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  cardTitle: {
    fontSize: normalize(14),
    color: colors.blue[950],
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    padding: normalize(12),
    minHeight: normalize(90),
    fontSize: normalize(12),
    color: colors.blue[950],
    marginBottom: normalize(12),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(10),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    marginBottom: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  actionLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: normalize(12),
  },
  actionText: {
    fontSize: normalize(12.5),
    color: '#1E293B',
  },
});

