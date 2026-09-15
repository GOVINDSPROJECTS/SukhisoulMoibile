import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';
import { FileText, Smile } from 'lucide-react-native';

interface MoodAssessmentCardProps {
  mood: 'very_low' | 'low' | 'neutral' | 'good' | 'very_good' | 'great';
  setMood: (mood: 'very_low' | 'low' | 'neutral' | 'good' | 'very_good' | 'great') => void;
}

export const MoodAssessmentCard: React.FC<MoodAssessmentCardProps> = ({ mood, setMood }) => {
  return (
    <View style={styles.cardTransparent}>

      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <Smile size={normalize(18)} color="#FFFFFF" />
        </View>
        <View>
          <AppText family="primary" weight="bold" style={styles.numberedTitle}>Mood Assessment</AppText>
          <AppText family="primary" weight="medium" style={styles.subText}>
            How was the client's mood after today's session?
          </AppText>
        </View>
      </View>

      <View style={styles.moodRow}>
        {[
          { id: 'very_low', emoji: '😞', label: 'Very Low' },
          { id: 'low', emoji: '🙁', label: 'Low' },
          { id: 'neutral', emoji: '😐', label: 'Neutral' },
          { id: 'good', emoji: '🙂', label: 'Good' },
          { id: 'very_good', emoji: '😊', label: 'Very Good' },
          { id: 'great', emoji: '😁', label: 'Great' },
        ].map((m) => (
          <TouchableOpacity
            key={m.id}
            style={styles.moodItem}
            onPress={() => setMood(m.id as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.emojiWrapper, mood === m.id && styles.emojiWrapperActive]}>
              <AppText style={styles.emojiText}>{m.emoji}</AppText>
            </View>
            <AppText family="secondary" weight="medium" style={[styles.moodLabel, mood === m.id && styles.moodLabelActive]}>
              {m.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
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
  cardTransparent: {
    paddingHorizontal: normalize(4),
    marginBottom: normalize(16),
  },
  numberedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  numberIconWrapper: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  numberedTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(-3)
  },
  subText: {
    fontSize: normalize(11),
    color: colors.tintsGrey[400],
  },
  subTextDark: {
    fontSize: normalize(12),
    color: '#475569',
    marginLeft: normalize(34),
    marginBottom: normalize(20),
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
  },
  moodItem: {
    alignItems: 'center',
    width: '15.5%',
  },
  emojiWrapper: {
    width: '100%',
    height: normalize(53),
    borderRadius: normalize(8),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(8),
    borderWidth: 2,
    borderColor: colors.tintsGrey[200],
  },
  emojiWrapperActive: {
    borderColor: colors.typographyColor['Dark 2'],
    backgroundColor: '#FFFFFF',
  },
  emojiText: {
    fontSize: normalize(20),
  },
  moodLabel: {
    fontSize: normalize(9),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
  },
  moodLabelActive: {
    color: colors.typographyColor['Dark 2'],
  },
});
