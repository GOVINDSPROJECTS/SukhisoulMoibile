import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Flame,
  LifeBuoy,
  HeartOff,
  BookOpen,
  PartyPopper,
  Gift as GiftIcon,
  Ellipsis,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftDropdown, DropdownOption } from '../components/GiftDropdown';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftRecipientScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [recipient, setRecipient] = useState('Friend');
  const [reason, setReason] = useState('Just because I care');

  const recipientOptions: DropdownOption[] = [
    { label: 'Friend', icon: <User size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Partner', icon: <Heart size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Family Member', icon: <Users size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Student', icon: <GraduationCap size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Colleague', icon: <Briefcase size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Someone Special', icon: <Sparkles size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Other', icon: <Ellipsis size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
  ];

  const reasonOptions: DropdownOption[] = [
    { label: 'Just because I care', icon: <Heart size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Stress & Burnout', icon: <Flame size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: "They're going through a difficult time", icon: <LifeBuoy size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Work Stress', icon: <Briefcase size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Breakup', icon: <HeartOff size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Academic Pressure', icon: <BookOpen size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Celebration', icon: <PartyPopper size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Birthday Gift', icon: <GiftIcon size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
    { label: 'Other', icon: <Ellipsis size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} /> },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: "#FAF3EB" }} />
      <GiftHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <GiftTitleSubTitle title="Who is this gift for?" subtitle="Let's choose the recipient and reason for this gift." />

        {/* Dropdown 1 */}
        <GiftDropdown
          label="This gift is for"
          leftIcon={<User size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} />}
          options={recipientOptions}
          selectedValue={recipient}
          onSelect={setRecipient}
          placeholder="Select recipient"
        />

        {/* Dropdown 2 */}
        <GiftDropdown
          label="Why are you gifting this?"
          leftIcon={<Heart size={normalize(18)} color={colors.lightTints.redLightTint2[400]} fill={colors.lightTints.redLightTint2[50]} />}
          options={reasonOptions}
          selectedValue={reason}
          onSelect={setReason}
          placeholder="Select reason"
        />

        {/* Security Note Box */}
        <View style={styles.noteBox}>
          <View style={styles.noteIconContainer}>
            <ShieldCheck size={normalize(20)} color="#10B981" style={styles.noteIcon} />
          </View>
          <AppText family="secondary" style={styles.noteText}>
            Your gift is private and will be delivered securely.
          </AppText>
        </View>

        <View style={styles.spacer} />

        {/* Next Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GiftCustomMessage')}
        >
          <View style={styles.buttonContent}>
            <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
              Next
            </AppText>
            <ArrowRight size={normalize(18)} color="#FFFFFF" style={{ marginLeft: normalize(8) }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(25),
    paddingBottom: normalize(30),
    flexGrow: 1,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F9',
    borderWidth: 1,
    borderColor: '#FFE4E4',
    borderRadius: normalize(14),
    padding: normalize(17),
    marginTop: normalize(10),
  },
  noteIconContainer: {
    backgroundColor: "#FFFFFF",
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    width: normalize(32),
    height: normalize(32),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: normalize(99),
    marginRight: normalize(12),
  },
  noteIcon: {
  },
  noteText: {
    flex: 1,
    color: '#065F46',
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(30),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
});
