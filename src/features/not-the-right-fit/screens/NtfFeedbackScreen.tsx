import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  EarOff,
  BookOpen,
  Headphones,
  XCircle,
  Heart,
  MessageCircle,
  Pencil,
  LucideIcon,
  Ear,
  UserSearch,
  ArrowRightToLine,
  Dot,
  MessagesSquare,
  PenTool,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { NtfHeader } from '../components/NtfHeader';
import { SelectionChip } from '../components/SelectionChip';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyNote } from '../components/PrivacyNote';

interface FeedbackOption {
  id: string;
  label: string;
  Icon: LucideIcon;
  IconImg: string;
  iconBg: string;
  iconColor: string;
}

const FEEDBACK_OPTIONS: FeedbackOption[] = [
  {
    id: 'understood',
    label: "I didn't feel\nunderstood",
    Icon: UserSearch,
    IconImg: null,
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
  {
    id: 'guidance',
    label: 'I wanted more\nguidance',
    Icon: Dot,
    IconImg: require('../assets/arrow-right.png'),
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
  {
    id: 'listened',
    label: 'Wanted someone who listened more',
    Icon: Ear,
    IconImg: null,
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
  {
    id: 'approach',
    label: "The approach didn't suit me",
    Icon: Dot,
    IconImg: require('../assets/id-card.png'),
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
  {
    id: 'empathy',
    label: 'I wanted more empathy',
    Icon: Heart,
    IconImg: null,
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
  {
    id: 'communication',
    label: "Communication style didn't match",
    Icon: MessagesSquare,
    IconImg: null,
    iconBg: '#E7EEFF',
    iconColor: colors.lightAppTheme[900],
  },
];

export const NtfFeedbackScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [other, setOther] = useState('');

  const handleTextInputFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
      <NtfHeader currentStep={2} totalSteps={7} onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={[colors.lightTints.blueLightTint[100], colors.lightTints.blueLightTint[50], colors.typographyColor.White, colors.typographyColor.White, colors.typographyColor.White]}
            style={styles.containerInner}
          >
            <AppText variant="h3" family='secondary' weight="extraBold" style={styles.heading}>
              What was missing from your{'\n'}previous experience?
            </AppText>
            <AppText variant="body" family='secondary' weight="medium" style={styles.sub}>
              Select all that apply. Your feedback helps us find your ideal match.
            </AppText>

            {/* 2-column chip grid */}
            <View style={styles.grid}>
              {FEEDBACK_OPTIONS.map(opt => (
                <View key={opt.id} style={styles.chipWrap}>
                  <SelectionChip
                    label={opt.label}
                    selected={selected.has(opt.id)}
                    onPress={() => toggle(opt.id)}
                    Icon={opt.Icon}
                    IconImg={opt.IconImg}
                    iconBg={opt.iconBg}
                    iconColor={opt.iconColor}
                  />
                </View>
              ))}
            </View>

            {/* Describe other concerns */}
            <View style={styles.otherLabelRow}>
              <PenTool size={normalize(16)} color={colors.blue[800]} strokeWidth={1.7} />
              <AppText variant="caption" family='secondary' weight="regular" style={styles.otherLabel}>
                Describe other concerns
              </AppText>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor={colors.typographyColor.Light}
              value={other}
              onChangeText={setOther}
              multiline
              numberOfLines={3}
              onFocus={handleTextInputFocus}
            />

            {/* Privacy note */}
            <PrivacyNote />

            <CommonContinueButton
              label="Continue"
              onPress={() => navigation.navigate('NtfSessionStyle')}
            />
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(10),
    marginBottom: normalize(20),
  },
  chipWrap: {
    width: '47.5%',
  },
  otherLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginBottom: normalize(8),
  },
  otherLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.tintsGrey[300],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    fontSize: normalize(12),
    color: colors.typographyColor.Black,
    marginBottom: normalize(16),
    minHeight: normalize(72),
    textAlignVertical: 'top',
    backgroundColor: '#FAFBFF',
  },
});
