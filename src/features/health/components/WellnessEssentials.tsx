import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import Svg, { Path, Circle } from 'react-native-svg';
import { Eye } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@/theme';

interface WellnessEssentialsProps {
  onStartMeditation: () => void;
  onStartVisualization: () => void;
}

export const WellnessEssentials: React.FC<WellnessEssentialsProps> = ({
  onStartMeditation,
  onStartVisualization,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <LinearGradient
        colors={[colors.green[50], colors.typographyColor.White]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientHeader}
      >
        <AppText style={styles.sectionTitle} weight="extraBold" family='primary'>
          Wellness Essentials
        </AppText>
      </LinearGradient>

      {/* Cards Row */}
      <View style={styles.cardsRow}>
        {/* Meditation Card */}
        <View style={styles.meditationCard}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }} />
            <AppText style={styles.xpTextGreen} weight="semiBold">
              +20 XP
            </AppText>
          </View>

          {/* Meditation Icon in Soft Circle */}
          <View style={styles.meditationIconCircle}>
            <Image
              source={require('../assets/ico-yoga.png')}
              style={styles.cardIcons}
              resizeMode="cover"
            />
          </View>

          <AppText style={styles.cardTitle} weight="bold" family='secondary'>
            Meditation
          </AppText>
          <AppText style={styles.cardSubtitle} weight="medium" family='secondary'>
            Calm your mind and relax
          </AppText>

          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={onStartMeditation}
          >
            <AppText style={styles.startButtonText} weight="bold">
              Start
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Visualization Card */}
        <View style={styles.visualizationCard}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }} />
            <AppText style={styles.xpTextBlue} weight="semiBold">
              +25 XP
            </AppText>
          </View>

          {/* Visualization Eye Icon in Soft Circle */}
          <View style={styles.visualizationIconCircle}>

            <Image
              source={require('../assets/ico-eye.png')}
              style={[styles.cardIcons, { width: normalize(20), height: normalize(20) }]}
              resizeMode="cover"
            />

          </View>

          <AppText style={styles.cardTitle} weight="bold">
            Visualization
          </AppText>
          <AppText style={styles.cardSubtitle} weight="regular">
            Improve focus and imagine
          </AppText>

          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={onStartVisualization}
          >
            <AppText style={styles.startButtonText} weight="bold">
              Start
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(16),
  },
  gradientHeader: {
    marginHorizontal: normalize(-20),
    paddingHorizontal: normalize(20),
    marginTop: normalize(-16),
    paddingTop: normalize(10)
  },
  cardIcons: {
    width: normalize(25),
    height: normalize(25),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    resizeMode: 'contain'
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#064E3B',
    marginBottom: normalize(14),
  },
  cardsRow: {
    flexDirection: 'row',
    gap: normalize(14),
  },
  meditationCard: {
    flex: 1,
    backgroundColor: colors.lightTints.darkRedLightTint[50],
    borderRadius: normalize(16),
    padding: normalize(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5EBE6',
  },
  visualizationCard: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    borderRadius: normalize(16),
    padding: normalize(14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEFA',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: normalize(2),
  },
  xpTextGreen: {
    fontSize: normalize(11),
    color: '#047857',
  },
  xpTextBlue: {
    fontSize: normalize(11),
    color: '#1D4ED8',
  },
  meditationIconCircle: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(12),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
  },
  visualizationIconCircle: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  innerEyeCircle: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: normalize(15),
    color: '#1F2937',
    marginBottom: normalize(4),
  },
  cardSubtitle: {
    fontSize: normalize(9.5),
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: normalize(14),
    minHeight: normalize(28),
  },
  startButton: {
    width: '100%',
    backgroundColor: colors.lightAppTheme[950],
    paddingVertical: normalize(8),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: normalize(13),
    color: '#FFFFFF',
  },
});
