import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles, Heart, Users, ArrowRight, Sun, Box, Smile } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftPlanCard, GiftPlan } from '../components/GiftPlanCard';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftCustomMessageScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [message, setMessage] = useState(
    "Hi Sarah,\n\nYou've been doing so great lately. You deserve this time for yourself. Wishing you peace and happiness! 🎁❤️"
  );
  const [selectedPlanId, setSelectedPlanId] = useState('individual');

  const presetMessages = [
    'Thinking of you 💕',
    'You deserve this',
    'Take care 🌸',
  ];

  const plans: GiftPlan[] = [
    {
      id: 'individual',
      title: 'Individual Therapy',
      description: 'One-on-one sessions with licensed professionals.',
      price: 'From ₹1,499',
      icon: <Sun size={normalize(20)} strokeWidth={2.5} color="#F43F5E" />,
    },
    {
      id: 'couples',
      title: 'Couples Therapy',
      description: 'Strengthen your relationship with guided sessions.',
      price: 'From ₹2,499',
      icon: <Box size={normalize(18)} strokeWidth={2.5} color="#F43F5E" />,
    },
    {
      id: 'family',
      title: 'Family Therapy',
      description: 'Resolve conflicts and build better understanding.',
      price: 'From ₹2,499',
      icon: <Smile size={normalize(18)} strokeWidth={2.5} color="#F43F5E" />,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: "#FAF3EB" }} />
      <GiftHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Banner Image */}
          <View style={styles.photoContainer}>
            <Image
              source={require('../assets/gift-photo.png')}
              style={styles.photoImage}
              resizeMode="contain"
            />
          </View>

          {/* Titles */}
          <GiftTitleSubTitle title="Add a personal touch" subtitle="A kind message can make their journey even more special." />

          {/* Message Section */}
          <AppText family="secondary" weight="semiBold" style={styles.sectionLabel}>
            Your message
          </AppText>

          <View style={styles.textareaContainer}>
            <TextInput
              style={styles.textarea}
              multiline
              maxLength={250}
              placeholder="Write a warm note..."
              placeholderTextColor={colors.tintsGrey[400]}
              value={message}
              onChangeText={setMessage}
            />
            <AppText family="secondary" style={styles.charCount}>
              {message.length}/250
            </AppText>
          </View>

          {/* Suggested Preset Chips */}
          <View style={styles.chipsRow}>
            {presetMessages.map((chip, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.chip}
                activeOpacity={0.7}
                onPress={() => setMessage(chip)}
              >
                <AppText family="secondary" style={styles.chipText}>
                  {chip}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Plan Selection */}
          <AppText family="primary" weight="bold" style={styles.planSectionTitle}>
            Choose the best plan to gift
          </AppText>

          {plans.map((plan) => (
            <GiftPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}

          {/* Next Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('GiftRecipientDetails')}
          >
            <View style={styles.buttonContent}>
              <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
                Next
              </AppText>
              <ArrowRight size={normalize(18)} color="#FFFFFF" style={{ marginLeft: normalize(8) }} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(0),
    paddingBottom: normalize(30),
  },
  photoContainer: {
    width: normalize(180),
    height: normalize(180),
    borderRadius: normalize(0),
    overflow: 'hidden',
    marginBottom: normalize(20),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: normalize(30)
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: normalize(22),
    color: colors.typographyColor.Black,
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  subtitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
    marginBottom: normalize(24),
  },
  sectionLabel: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
    marginBottom: normalize(8),
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: normalize(16),
    padding: normalize(16),
    backgroundColor: '#FFFFFF',
    minHeight: normalize(120),
    marginBottom: normalize(12),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  textarea: {
    fontSize: normalize(13),
    fontFamily: 'Outfit-Regular',
    color: colors.typographyColor.Black,
    textAlignVertical: 'top',
    flex: 1,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: normalize(11),
    color: colors.tintsGrey[400],
    marginTop: normalize(6),
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(8),
    marginBottom: normalize(25),
  },
  chip: {
    backgroundColor: '#FFF5F6',
    borderColor: '#FDECEC',
    borderWidth: 1,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(7),
    borderRadius: normalize(99),
  },
  chipText: {
    color: '#FF5E73',
    fontSize: normalize(12),
  },
  planSectionTitle: {
    fontSize: normalize(16),
    color: colors.typographyColor.Black,
    marginBottom: normalize(14),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(15),
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
