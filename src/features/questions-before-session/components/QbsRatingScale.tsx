import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Star } from 'lucide-react-native';

interface QbsRatingScaleProps {
  value: number;
  onChange: (value: number) => void;
}

export const QbsRatingScale: React.FC<QbsRatingScaleProps> = ({ value, onChange }) => {

  const getRatingText = () => {
    switch (value) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={normalize(40)}
              fill={value >= star ? colors.blue[600] : 'transparent'}
              color={value >= star ? colors.blue[600] : colors.tintsGrey[200]}
              strokeWidth={1.5}
            />
          ))}
        </View>

        <AppText variant="body" weight="medium" family="secondary" style={styles.ratingText}>
          {getRatingText()}
        </AppText>
      </View>

      <View style={styles.numbersWrapper}>
        <View style={styles.numbersContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.numberBox, value === num && styles.numberBoxSelected]}
              onPress={() => onChange(num)}
              activeOpacity={0.8}
            >
              <AppText
                family='secondary'
                weight='semiBold'
                style={[styles.numberText, value === num && styles.numberTextSelected]}
              >
                {num}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.labelsContainer}>
          <AppText style={styles.extremeLabel}>Poor</AppText>
          <AppText style={styles.extremeLabel}>Excellent</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: normalize(30),
  },
  container: {
    backgroundColor: colors.appThemeColor[50],
    borderRadius: normalize(20),
    paddingTop: normalize(40),
    paddingBottom: normalize(20),
    paddingHorizontal: normalize(20),
    alignItems: 'center',
    marginBottom: normalize(25),
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: normalize(6),
    marginBottom: normalize(20),
  },
  ratingText: {
    color: colors.blue[800],
    fontSize: normalize(16),
  },
  numbersWrapper: {
    width: '100%',
  },
  numbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(8),
  },
  numberBox: {
    width: normalize(55),
    height: normalize(40),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: colors.tintsGrey[200],
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBoxSelected: {
    borderColor: colors.blue[400],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  numberText: {
    fontSize: normalize(16),
    color: colors.typographyColor['Theme Medium'],
  },
  numberTextSelected: {
    color: colors.blue[800],
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(2),
  },
  extremeLabel: {
    fontSize: normalize(11),
    color: colors.tintsGrey[500],
    fontFamily: 'Outfit-Regular',
  },
});
