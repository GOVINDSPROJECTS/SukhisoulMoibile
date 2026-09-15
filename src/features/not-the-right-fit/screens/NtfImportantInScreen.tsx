import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  Heart,
  Brain,
  Lightbulb,
  ListChecks,
  Clock,
  Lock,
  MessageCircle,
  Check,
  LucideIcon,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyNote } from '../components/PrivacyNote';

const MAX_SELECT = 3;

interface ImportanceOption {
  id: string;
  label: string;
  Icon: string;
  iconBg: string;
  iconColor: string;
}

const IMPORTANCE_OPTIONS: ImportanceOption[] = [
  { id: 'empathy', label: 'Empathy', Icon: require('../assets/step5-1.png'), iconBg: '#F0F3FF', iconColor: '#D97706' },
  { id: 'expertise', label: 'Expertise in my concern', Icon: require('../assets/step5-2.png'), iconBg: '#F0F3FF', iconColor: '#DB2777' },
  { id: 'practical', label: 'Practical advice', Icon: require('../assets/step5-3.png'), iconBg: '#F0F3FF', iconColor: '#DC2626' },
  { id: 'accountability', label: 'Accountability', Icon: require('../assets/step5-4.png'), iconBg: '#F0F3FF', iconColor: '#7C3AED' },
  { id: 'patience', label: 'Patience', Icon: require('../assets/step5-5.png'), iconBg: '#F0F3FF', iconColor: '#2563EB' },
  { id: 'safe', label: 'Feeling safe', Icon: require('../assets/step5-1.png'), iconBg: '#F0F3FF', iconColor: '#DB2777' },
  { id: 'communication', label: 'Easy communication', Icon: require('../assets/step5-6.png'), iconBg: '#F0F3FF', iconColor: '#059669' },
];

export const NtfImportantInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['empathy', 'expertise', 'practical'])
  );

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_SELECT) {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />

      <NtfHeader currentStep={5} totalSteps={7} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
          style={styles.containerInner}
        >

          <AppText variant="h3" family='secondary' weight="extraBold" style={styles.heading}>
            What's most important to you in a therapist?
          </AppText>
          <AppText variant="caption" family='secondary' weight="regular" style={styles.sub}>
            Select up to {MAX_SELECT}
          </AppText>

          {/* Full-width list rows */}
          <View style={styles.list}>
            {IMPORTANCE_OPTIONS.map(opt => {
              const isSelected = selected.has(opt.id);
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.row, isSelected && styles.rowSelected]}
                  onPress={() => toggle(opt.id)}
                  activeOpacity={0.8}
                >
                  {/* Icon bubble */}
                  <View style={[styles.iconBubble, isSelected && styles.iconBgSelected, { backgroundColor: isSelected ? "#FFFFFF" : opt.iconBg }]}>
                    <Image
                      source={typeof opt.Icon === 'string' ? { uri: opt.Icon } : opt.Icon}
                      style={styles.icon}
                      resizeMode="contain"
                    />

                  </View>

                  {/* Label */}
                  <AppText
                    variant="body"
                    weight={isSelected ? 'medium' : 'medium'}
                    style={[styles.rowLabel, isSelected && styles.rowLabelSelected]}
                  >
                    {opt.label}
                  </AppText>

                  {/* Radio / Check */}
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <Check size={normalize(12)} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Privacy note */}
          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={() => navigation.navigate('NtfPreferences')}
            disabled={selected.size === 0}
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  containerInner: { marginHorizontal: normalize(-15), paddingHorizontal: normalize(15), paddingTop: normalize(25) },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(0),
    paddingBottom: normalize(50),
  },
  heading: {
    color: colors.typographyColor.Black,
    fontSize: normalize(18),
    lineHeight: normalize(26),
    marginBottom: normalize(6),
  },
  sub: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    lineHeight: normalize(18),
    marginBottom: normalize(18),
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
    resizeMode: 'contain',
  },
  list: {
    gap: normalize(16),
    marginBottom: normalize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    borderWidth: 1.5,
    borderColor: "#C3C6D6",
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    backgroundColor: '#FFFFFF',
  },
  rowSelected: {
    borderColor: colors.lightAppTheme[200],
    backgroundColor: '#F0F3FF',
    boxShadow: '0px 0px 0px 1px ' + colors.lightAppTheme[200],
  },
  iconBubble: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconBgSelected: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  rowLabel: {
    flex: 1,
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  rowLabelSelected: {
    color: colors.typographyColor.Dark,
  },
  radio: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 2,
    borderColor: "#C3C6D6",
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioSelected: {
    borderColor: "#0040A1",
    backgroundColor: "#0040A1",
  },
});
