import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, ArrowRight, Calendar, Calendar1, CalendarDays } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftRecipientDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
          {/* Title & Subtitle */}
          <GiftTitleSubTitle title="Who should receive this gift?" subtitle="We'll send the gift details to them safely." />


          {/* Form Fields */}
          <View style={styles.fieldContainer}>
            <AppText family="secondary" weight="semiBold" style={styles.fieldLabel}>
              Full name
            </AppText>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter their full name"
                placeholderTextColor={colors.tintsGrey[500]}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <AppText family="secondary" weight="semiBold" style={styles.fieldLabel}>
              WhatsApp number
            </AppText>
            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodeBox}>
                <AppText family="secondary" weight="bold" style={styles.countryCodeText}>
                  +91
                </AppText>
              </View>
              <View style={[styles.inputBox, styles.numberInput, { flex: 1 }]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter number"
                  placeholderTextColor={colors.tintsGrey[500]}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <AppText family="secondary" weight="semiBold" style={styles.fieldLabel}>
              Email address <AppText family="secondary" style={styles.optionalText}>(optional)</AppText>
            </AppText>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter email address"
                placeholderTextColor={colors.tintsGrey[500]}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Selected Gift Section */}
          <AppText family="secondary" weight="semiBold" style={styles.sectionTitle}>
            Selected gift
          </AppText>

          <View style={styles.selectedGiftCard}>
            <View style={styles.giftIconContainer}>
              <CalendarDays size={normalize(20)} color="#FF5252" />
            </View>

            <View style={styles.giftDetails}>
              <AppText family="primary" weight="extraBold" style={styles.giftName}>
                Individual Therapy
              </AppText>
              <AppText family="secondary" style={styles.giftSessions}>
                1 Session
              </AppText>
              <AppText family="primary" weight="bold" style={styles.giftPrice}>
                ₹1,499
              </AppText>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('GiftCustomMessage')}
            >
              <AppText family="primary" weight="bold" style={styles.changeBtnText}>
                Change
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.spacer} />

          {/* Next Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('GiftReviewPay')}
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
    paddingTop: normalize(35),
    paddingBottom: normalize(30),
    flexGrow: 1,
  },

  fieldContainer: {
    marginBottom: normalize(18),
  },
  fieldLabel: {
    color: "#334155",
    fontSize: normalize(13),
    marginBottom: normalize(6),
  },
  optionalText: {
    color: colors.tintsGrey[400],
    fontSize: normalize(12),
  },
  inputBox: {
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    backgroundColor: '#FFFFFF',
    height: normalize(48),
    justifyContent: 'center',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(0),
  },
  countryCodeBox: {
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    borderTopLeftRadius: normalize(12),
    borderBottomLeftRadius: normalize(12),
    paddingHorizontal: normalize(16),
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRightWidth: 0,
  },
  numberInput: {
    borderTopLeftRadius: normalize(0),
    borderBottomLeftRadius: normalize(0),
  },
  countryCodeText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  textInput: {
    fontSize: normalize(14),
    color: colors.typographyColor.Black,
    fontWeight: '400',
  },
  sectionTitle: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
    marginTop: normalize(10),
    marginBottom: normalize(10),
  },
  selectedGiftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  giftIconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(20),
  },
  giftDetails: {
    flex: 1,
  },
  giftName: {
    color: "#1E293B",
    fontSize: normalize(14),
  },
  giftSessions: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    marginVertical: normalize(2),
  },
  giftPrice: {
    color: '#FF6B7D',
    fontSize: normalize(14),
  },
  changeBtnText: {
    color: '#FF6B7D',
    fontSize: normalize(12),
  },
  spacer: {
    flex: 1,
    minHeight: normalize(30),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.lightTints.redLightTint2[500],
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
