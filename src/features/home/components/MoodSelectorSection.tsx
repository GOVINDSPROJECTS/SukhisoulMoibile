import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const MoodSelectorSection: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: 'awful', image: require('../assets/Frame 425.png'), label: 'Awful', activeColor: '#E6F2FF' },
    { id: 'bad', image: require('../assets/Frame 426.png'), label: 'Bad', activeColor: '#FFEBE6' },
    { id: 'okay', image: require('../assets/Frame 427.png'), label: 'Okay', activeColor: '#F0F0F0' },
    { id: 'good', image: require('../assets/Frame 428.png'), label: 'Good', activeColor: '#E8F5E9' },
    { id: 'happy', image: require('../assets/Frame 429.png'), label: 'Happy', activeColor: '#FFF9C4' },
  ];

  const handleSelectMood = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedMood(selectedMood === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <AppText
        variant="h3"
        weight="bold"
        style={[styles.title, { color: '#101828', fontSize: normalize(16) }]}
      >
        How are you feeling today?
      </AppText>

      <View style={styles.moodsRow}>
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <TouchableOpacity
              key={mood.id}
              style={styles.moodItemWrapper}
              onPress={() => handleSelectMood(mood.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? mood.activeColor : '#FFFFFF',
                    borderColor: isSelected ? colors.lightAppTheme[600] : 'transparent',
                    borderWidth: isSelected ? 1.5 : 0,
                    borderRadius: borderRadius.l,
                    transform: [{ scale: isSelected ? 1.05 : 1.0 }],
                    shadowOpacity: isSelected ? 0.08 : 0.04,
                    elevation: isSelected ? 4 : 2,
                  }
                ]}
              >
                <Image
                  source={mood.image}
                  style={styles.moodImage}
                  resizeMode="contain"
                />
                <AppText
                  variant="caption"
                  weight={isSelected ? 'bold' : 'medium'}
                  style={[styles.label, { color: isSelected ? '#101828' : '#344054' }]}
                >
                  {mood.label}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -normalize(20),
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(10),
    backgroundColor: '#DDE8F0', // Soft greyish-blue container background matching mockup
    marginBottom: normalize(0),
  },
  title: {
    fontSize: normalize(16),
    marginBottom: normalize(12),
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItemWrapper: {
    width: '18%',
    alignItems: 'center',
  },
  card: {
    width: normalize(65),
    height: normalize(65),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(8),
    // Shadow
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  moodImage: {
    width: normalize(32),
    height: normalize(32),
  },
  label: {
    fontSize: normalize(11),
    textAlign: 'center',
    marginTop: normalize(2),
  },
});
