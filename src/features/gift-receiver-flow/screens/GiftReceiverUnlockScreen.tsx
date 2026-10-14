import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, User, Phone, Ticket, User2 } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftReceiverHeader } from '../components/GiftReceiverHeader';
import { GiftReceiverFormField } from '../components/GiftReceiverFormField';
import { GiftReceiverSoCloseCard } from '../components/GiftReceiverSoCloseCard';
import { GiftReceiverErrorCard } from '../components/GiftReceiverErrorCard';

export const GiftReceiverUnlockScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [couponCode, setCouponCode] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (!couponCode.trim()) {
      Alert.alert('Required Field', 'Please enter your therapy voucher coupon code.');
      return;
    }
    if (!receiverName.trim()) {
      Alert.alert('Required Field', 'Please enter the receiver name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      Alert.alert('Invalid Contact', 'Please enter a valid phone number (at least 10 digits) or Gift ID.');
      return;
    }

    // Supported promo codes for unlock: SUKHI2026, GIFT500, SOULGIFT, WELLNESS
    const normalizedCode = couponCode.trim().toUpperCase();
    if (['SUKHI2026', 'GIFT500', 'SOULGIFT', 'WELLNESS'].includes(normalizedCode)) {
      navigation.navigate('GiftReceiverProfile');
    } else {
      setShowError(true);
    }
  };

  const handleTryAgain = () => {
    setShowError(false);
  };

  const handleDismissError = () => {
    setShowError(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: '#FAF3EB' }} />
      <GiftReceiverHeader title="Gift Therapy" onBack={() => navigation.goBack()} />

      {/* Error Modal */}
      <Modal
        visible={showError}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleDismissError}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={handleDismissError}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
            <GiftReceiverErrorCard onTryAgain={handleTryAgain} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Gift Image */}
          <View style={styles.heroContainer}>
            <Image
              source={require('../assets/gift-receive.webp')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <View style={styles.titleBlock}>
            <AppText family="primary" weight="extraBold" style={styles.title}>
              Unlock Your{'\n'}
              <AppText family="primary" weight="extraBold" style={styles.titlePink}>
                Therapy Gift
              </AppText>
            </AppText>
            <AppText family="secondary" weight='light' style={styles.subtitle}>
              Enter the details below to unlock the therapy{'\n'}session gifted by your loved ones.
            </AppText>
          </View>

          {/* Form Fields */}
          <GiftReceiverFormField
            label="Coupon Code"
            placeholder="Enter coupon code"
            value={couponCode}
            onChangeText={setCouponCode}
            icon={<Ticket size={normalize(16)} color={colors.lightAppTheme[600]} />}
          />

          <GiftReceiverFormField
            label="Receiver Name"
            placeholder="Enter receiver name"
            value={receiverName}
            onChangeText={setReceiverName}
            icon={<User2 size={normalize(16)} color={colors.lightAppTheme[600]} />}
          />

          <GiftReceiverFormField
            label="Verification"
            placeholder="Gift ID number / Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            icon={<Phone size={normalize(16)} color={colors.lightAppTheme[600]} />}
          />

          {/* "You're so close" Banner */}
          <GiftReceiverSoCloseCard />

          {/* Next Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
              Next
            </AppText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
  },
  modalCard: {
    width: '100%',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
    paddingBottom: normalize(30),
    flexGrow: 1,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: normalize(14),
  },
  heroImage: {
    width: normalize(274),
    height: normalize(250),
  },
  titleBlock: {
    marginBottom: normalize(30),
  },
  title: {
    fontSize: normalize(26),
    color: '#1F2937',
    lineHeight: normalize(34),
    marginBottom: normalize(8),
  },
  titlePink: {
    fontSize: normalize(26),
    color: colors.colorPalet['Color 4'],
    lineHeight: normalize(34),
  },
  subtitle: {
    fontSize: normalize(13),
    color: '#6B7280',
    lineHeight: normalize(20),
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(8),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
});
