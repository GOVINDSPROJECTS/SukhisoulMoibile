import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { Calendar, FileText, Minus, Plus } from 'lucide-react-native';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface RecommendedSessionsCardProps {
  recommendedSessions: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  reasonText: string;
  setReasonText: (text: string) => void;
}

export const RecommendedSessionsCard: React.FC<RecommendedSessionsCardProps> = ({
  recommendedSessions,
  handleDecrement,
  handleIncrement,
  reasonText,
  setReasonText,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.numberedTitleRow}>
        <View style={styles.numberIconWrapper}>
          <Calendar size={normalize(19)} color="#ffffff" />
        </View>
        <View>
          <AppText family="primary" weight="bold" style={styles.numberedTitle}>Recommended Sessions</AppText>
          <AppText family="primary" weight="medium" style={styles.subText}>
            How many additional sessions do you recommend?
          </AppText>
        </View>
      </View>

      <AppText family="primary" weight="medium" style={styles.inputLabel}>Select sessions</AppText>
      <View style={styles.counterRow}>
        <TouchableOpacity style={styles.counterBtn} onPress={handleDecrement}>
          <Minus size={normalize(16)} color="#475569" />
        </TouchableOpacity>
        <AppText family="primary" weight="bold" style={styles.counterText}>{recommendedSessions}</AppText>
        <TouchableOpacity style={styles.counterBtn} onPress={handleIncrement}>
          <Plus size={normalize(16)} color="#475569" />
        </TouchableOpacity>
      </View>

      <AppText family="primary" weight="medium" style={styles.inputLabel}>Reason for recommendation (Optional):</AppText>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          multiline
          value={reasonText}
          onChangeText={setReasonText}
          textAlignVertical="top"
        />
        <AppText family="primary" weight="medium" style={styles.charCount}>
          {reasonText.length}/200
        </AppText>
      </View>

      <View style={styles.saveBtnWrapper}>
        <TouchableOpacity style={styles.saveSmallBtn} activeOpacity={0.8}>
          <AppText family="primary" weight="bold" style={styles.saveSmallBtnText}>Save</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  numberedTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(20),
  },
  numberIconWrapper: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(6),
    backgroundColor: colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
    marginTop: normalize(6)
  },
  numberedTitle: {
    fontSize: normalize(13),
    color: colors.blue[950],
  },
  subText: {
    fontSize: normalize(11),
    color: colors.tintsGrey[400],
  },
  inputLabel: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(8),
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(8),
    padding: normalize(4),
    marginBottom: normalize(20),
  },
  counterBtn: {
    padding: normalize(10),
  },
  counterText: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  textAreaContainer: {
    position: 'relative',
    marginBottom: normalize(16),
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(8),
    padding: normalize(12),
    height: normalize(80),
    fontSize: normalize(12),
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
  },
  charCount: {
    position: 'absolute',
    bottom: normalize(8),
    right: normalize(12),
    fontSize: normalize(9),
    color: colors.typographyColor.Medium,
  },
  saveBtnWrapper: {
    alignItems: 'center',
  },
  saveSmallBtn: {
    backgroundColor: colors.typographyColor['Dark 2'],
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(32),
    borderRadius: normalize(20),
    width: '100%',
  },
  saveSmallBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
    textAlign: 'center'
  },
});
