import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, MapPin, Search, AtSign } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { DcHeader } from '../components/DcHeader';
import { PrivacyNote } from '../../not-the-right-fit/components/PrivacyNote';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';

export const DcContactInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <DcHeader
        title="Questions before Session"
        currentStep={3}
        totalSteps={4}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Email Section */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Mail size={normalize(32)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
            </View>
          </View>

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
            ID Proof
          </AppText>

          <View style={styles.inputContainer}>
            <AtSign size={normalize(18)} color={"#737785"} style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="e.g. name@example.com"
              placeholderTextColor={"#C3C6D6"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* City Section */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <MapPin size={normalize(32)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
            </View>
          </View>

          <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
            What is your city / location?
          </AppText>

          <View style={styles.inputContainer}>
            <Search size={normalize(18)} color={"#737785"} style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Search for your city.."
              placeholderTextColor={"#C3C6D6"}
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.spacer} />

          <PrivacyNote />

          <CommonContinueButton
            label="Continue"
            onPress={() => navigation.navigate('DcLanguage')}
          />
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
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(20),
  },
  iconCircle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(30),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(15),
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(10),
  },
  inputIcon: {
    marginRight: normalize(10),
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: normalize(16),
    fontSize: normalize(13),
    fontFamily: 'Outfit-Regular',
    color: colors.typographyColor.Black,
  },
  spacer: {
    flex: 1,
    minHeight: normalize(0),
  },
});
