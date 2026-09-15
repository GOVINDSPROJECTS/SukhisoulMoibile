import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ChevronRight } from 'lucide-react-native';
import { GradientButton } from '@/components/atoms/GradientButton';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

export const MyPsychologist: React.FC = () => {
  const { borderRadius } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <View style={styles.parent}>
        <Image source={require('../assets/mascot-bg.png')} style={styles.bgMascot} />
        <ImageBackground
          source={require('../assets/box-blur-bg.png')}
          resizeMode="cover"
          imageStyle={{
            borderRadius: borderRadius.xl,
          }}
          style={[
            styles.quizCard,
            {
              borderRadius: borderRadius.xl,
              overflow: 'hidden',
            },
          ]}
        >
          <AppText variant="caption" weight="bold" style={styles.quizTag}>
            MY PSYCHOLOGIST
          </AppText>
          <AppText variant="h2" weight="bold" style={styles.quizTitle}>
            Find your right therapist
          </AppText>
          <AppText variant="caption" weight="regular" style={styles.quizDesc}>
            Start with a quick matching quiz or explore experts based on stress, anxiety, sleep, or relationship support.
          </AppText>

          <GradientButton
            borderRadius={15}
            style={styles.takeQuizBtn}>
            <AppText variant="body" weight="bold" style={styles.takeQuizBtnText}>
              Take Quiz
            </AppText>
            <ChevronRight size={16} color="#FFFFFF" style={{ marginLeft: normalize(4) }} />
          </GradientButton>

          {/* Three Mini Cards */}
          <View style={styles.miniCardsRow}>
            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
              <AppText weight="bold" family="primary" style={styles.miniCardTitle}>Quiz</AppText>
              <AppText variant="caption" style={styles.miniCardSub}>MATCH</AppText>
            </View>
            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
              <AppText weight="bold" family="primary" style={styles.miniCardTitle}>12+</AppText>
              <AppText variant="caption" style={styles.miniCardSub}>EXPERTS</AppText>
            </View>
            <View style={[styles.miniCard, { borderRadius: borderRadius.m }]}>
              <AppText weight="bold" family="primary" style={styles.miniCardTitle}>Book Now</AppText>
              <AppText variant="caption" style={styles.miniCardSub}>STAFF</AppText>
            </View>
          </View>

          {/* Explore Our Best Psychologist overlap button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ borderRadius: borderRadius.xl }}
          >
            <ImageBackground
              source={require('../assets/double-shadow-button.png')}
              resizeMode="stretch"
              imageStyle={{
                borderRadius: borderRadius.xl,
              }}
              style={[
                styles.exploreBestBtn,
                {
                  borderRadius: borderRadius.xl,
                  overflow: 'hidden',
                },
              ]}
            >
              <AppText
                variant="body"
                weight="bold"
                style={styles.exploreBestText}
                onPress={() => navigation.navigate('ExplorePsychologists')}
              >
                Explore Our Best Psychologist
              </AppText>

              <ChevronRight
                size={16}
                color="#0066CC"
                style={{ marginLeft: normalize(6) }}
              />
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    position: 'relative',
    paddingHorizontal: normalize(20),
  },
  bgMascot: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 180,
    height: 180
  },
  quizCard: {
    marginHorizontal: normalize(0),
    paddingVertical: normalize(25),
    paddingHorizontal: normalize(20),
    position: 'relative',
    marginTop: normalize(24),
  },
  quizTag: {
    color: '#0066CC',
    fontSize: normalize(10),
    letterSpacing: 0.8,
    marginBottom: normalize(4),
  },
  quizTitle: {
    fontSize: normalize(23),
    color: '#2D3432',
    marginBottom: normalize(8),
  },
  quizDesc: {
    fontSize: normalize(14),
    lineHeight: normalize(24),
    color: '#59615F',
    marginBottom: normalize(16),
  },
  takeQuizBtn: {
    marginTop: 15
  },
  takeQuizBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
  miniCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(20),
  },
  miniCard: {
    width: '31%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  miniCardTitle: {
    fontSize: normalize(14),
    color: '#2D3432',
  },
  miniCardSub: {
    fontSize: normalize(8.6),
    color: '#59615F',
    marginTop: normalize(2),
    letterSpacing: 0.5,
  },
  exploreBestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    // borderColor: '#BFE0FF',
    marginHorizontal: normalize(0),
    marginTop: normalize(18),
    paddingTop: normalize(6),
    paddingBottom: normalize(15),
    minHeight: normalize(60),
  },
  exploreBestText: {
    color: '#0066CC',
    fontSize: normalize(13),
  },


});
