import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import {
  Heart,
  Users,
  Moon,
  Zap,
  BriefcaseMedical,
} from 'lucide-react-native';

interface ExpertiseItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const EXPERTISE_LIST: ExpertiseItem[] = [
  {
    id: '1',
    title: 'Clinical Anxiety',
    subtitle: 'Panic & Phobias',
    icon: <Image source={require('../../assets/expertise-1.png')} style={{ width: 20, height: 20 }} />,
    bgColor: '#FFFFFF',
    iconBgColor: colors.blue[200],
  },
  {
    id: '2',
    title: 'Workplace Stress',
    subtitle: 'Burnout Recovery',
    icon: <BriefcaseMedical size={normalize(20)} color={colors.green[800]} />,
    bgColor: '#FFFFFF',
    iconBgColor: colors.green[200],
  },
  {
    id: '3',
    title: 'Relationship',
    subtitle: 'Couples & Family',
    icon: <Heart size={normalize(20)} color='#E05C7F' />,
    bgColor: '#FFFFFF',
    iconBgColor: colors.lightTints.redLightTint[100],
  },
  {
    id: '4',
    title: 'Depression',
    subtitle: 'Mood Disorders',
    icon: <Moon size={normalize(20)} color={colors.appThemeColor[600]} />,
    bgColor: '#FFFFFF',
    iconBgColor: colors.appThemeColor[50],
  },
  {
    id: '5',
    title: 'Trauma & PTSD',
    subtitle: 'Healing & Recovery',
    icon: <Zap size={normalize(20)} color='#F59E0B' />,
    bgColor: '#FFFFFF',
    iconBgColor: '#FFFBEB',
  },
  {
    id: '6',
    title: 'Social Skills',
    subtitle: 'Group Therapy',
    icon: <Users size={normalize(20)} color={colors.appThemeColor[500]} />,
    bgColor: '#FFFFFF',
    iconBgColor: colors.appThemeColor[75],
  },
];

export const AreasOfExpertise: React.FC = () => {
  const { borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
        Areas of Expertise
      </AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {EXPERTISE_LIST.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={[styles.card, { borderRadius: borderRadius.l }]}
          >
            <View style={[styles.iconWrapper, { backgroundColor: item.iconBgColor, borderRadius: borderRadius.full }]}>
              {item.icon}
            </View>
            <View style={styles.cardInfo}>
              <AppText variant="body" weight="bold" style={styles.cardTitle}>
                {item.title}
              </AppText>
              <AppText variant="caption" weight="regular" style={styles.cardSubtitle}>
                {item.subtitle}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
    backgroundColor: colors.appThemeColor[100]
  },
  sectionTitle: {
    fontSize: normalize(18),
    color: colors.appThemeColor[900],
    marginTop: normalize(10)
  },
  scrollContent: {
    gap: normalize(10),
    paddingRight: normalize(4),
    paddingTop: 20,
    paddingBottom: 30
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
    paddingRight: normalize(25),
    gap: normalize(10),
    minWidth: normalize(155),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
  },
  iconWrapper: {
    width: normalize(45),
    height: normalize(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: "#2D3432",
    fontSize: normalize(15),
  },
  cardSubtitle: {
    color: "#59615F",
    fontSize: normalize(12),
    marginTop: normalize(0),
  },
});
