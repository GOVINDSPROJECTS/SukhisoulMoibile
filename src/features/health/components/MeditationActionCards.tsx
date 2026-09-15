import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { User, ClipboardList, ChevronRight } from 'lucide-react-native';
import { colors } from '@/theme';

interface MeditationActionCardsProps {
  onOpenAbout: () => void;
  onOpenInstructions: () => void;
}

export const MeditationActionCards: React.FC<MeditationActionCardsProps> = ({
  onOpenAbout,
  onOpenInstructions,
}) => {
  return (
    <View style={styles.container}>
      {/* About this session Card */}
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={onOpenAbout}
      >
        <View style={styles.iconCircle}>
          <User size={normalize(18)} color={colors.typographyColor['Dark 2']} />
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.cardTitle} weight="bold" family='secondary'>
            About this session
          </AppText>
          <AppText style={styles.cardSubtitle} weight="light" family='secondary'>
            Benefits and overview
          </AppText>
        </View>
      </TouchableOpacity>

      {/* Instructions Card */}
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={onOpenInstructions}
      >
        <View style={styles.iconCircle}>
          <ClipboardList size={normalize(18)} color={colors.typographyColor['Dark 2']} />
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.cardTitle} weight="bold" family='secondary'>
            Instructions
          </AppText>
          <AppText style={styles.cardSubtitle} weight="light" family='secondary'>
            How to practice
          </AppText>
        </View>
        <ChevronRight size={normalize(16)} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    marginTop: normalize(24),
    gap: normalize(5),
    // marginHorizontal: normalize(-10)
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: normalize(20),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(12),
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  iconCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(9),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: normalize(11.5),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  cardSubtitle: {
    fontSize: normalize(8.5),
    color: '#64748B',
  },
});
