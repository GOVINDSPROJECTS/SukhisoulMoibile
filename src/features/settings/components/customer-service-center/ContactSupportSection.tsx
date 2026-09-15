import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { MessageCircle, Mail, Phone, ChevronDown, MessageCircleMore, ChevronRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface ContactSupportSectionProps {
  whatsappNumber?: string;
  supportEmail?: string;
  phoneNumber?: string;
  onChatPress?: () => void;
  onEmailPress?: () => void;
  onCallPress?: () => void;
}

export const ContactSupportSection: React.FC<ContactSupportSectionProps> = ({
  whatsappNumber = '919876543210',
  supportEmail = 'support@sukhisoul.com',
  phoneNumber = '+919876543210',
  onChatPress,
  onEmailPress,
  onCallPress,
}) => {
  // ── 1. Chat with us (WhatsApp) ────────────────────────────────────────
  const handleChat = useCallback(async () => {
    console.log(`[Contact Support] Chat with us -> WhatsApp +${whatsappNumber}`);
    onChatPress?.();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      'Hello Sukhi Soul Support, I need assistance.'
    )}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(`whatsapp://send?phone=${whatsappNumber}`);
      }
    } catch {
      Alert.alert(
        'WhatsApp Not Available',
        `Could not open WhatsApp. Please reach us at +91 98765 43210.`,
        [{ text: 'OK' }]
      );
    }
  }, [whatsappNumber, onChatPress]);

  // ── 2. Email us ───────────────────────────────────────────────────────
  const handleEmail = useCallback(async () => {
    console.log(`[Contact Support] Email us -> ${supportEmail}`);
    onEmailPress?.();
    const emailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(
      'Sukhi Soul Support Inquiry'
    )}`;
    try {
      await Linking.openURL(emailUrl);
    } catch {
      Alert.alert(
        'Email Client Not Found',
        `Please send your inquiry directly to ${supportEmail}.`,
        [{ text: 'OK' }]
      );
    }
  }, [supportEmail, onEmailPress]);

  // ── 3. Call us ────────────────────────────────────────────────────────
  const handleCall = useCallback(async () => {
    console.log(`[Contact Support] Call us -> ${phoneNumber}`);
    onCallPress?.();
    const telUrl = `tel:${phoneNumber}`;
    try {
      await Linking.openURL(telUrl);
    } catch {
      Alert.alert(
        'Dialer Not Available',
        `Please dial ${phoneNumber} directly from your phone.`,
        [{ text: 'OK' }]
      );
    }
  }, [phoneNumber, onCallPress]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppText
        weight="bold"
        family="secondary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        CONTACT SUPPORT
      </AppText>

      {/* Contact Cards List */}
      <View style={styles.cardsList}>
        {/* Chat with us */}
        <TouchableOpacity
          style={styles.contactCard}
          activeOpacity={0.75}
          onPress={handleChat}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <MessageCircleMore
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <View style={styles.textGroup}>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardTitle}
                color={colors.typographyColor.Medium}
              >
                Chat with us
              </AppText>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardSubtitle}
                color={colors.typographyColor.Medium}
              >
                Instant support
              </AppText>
            </View>
          </View>
          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Light}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* Email us */}
        <TouchableOpacity
          style={styles.contactCard}
          activeOpacity={0.75}
          onPress={handleEmail}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <Mail
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <View style={styles.textGroup}>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardTitle}
                color={colors.typographyColor.Medium}
              >
                Email us
              </AppText>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardSubtitle}
                color={colors.typographyColor.Medium}
              >
                support@sukhisoul.com
              </AppText>
            </View>
          </View>
          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Light}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* Call us */}
        <TouchableOpacity
          style={styles.contactCard}
          activeOpacity={0.75}
          onPress={handleCall}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <Phone
                size={normalize(18)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2.2}
              />
            </View>
            <View style={styles.textGroup}>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardTitle}
                color={colors.typographyColor.Medium}
              >
                Call us
              </AppText>
              <AppText
                weight="light"
                family="secondary"
                style={styles.cardSubtitle}
                color={colors.typographyColor.Medium}
              >
                +91 98765 43210
              </AppText>
            </View>
          </View>
          <ChevronRight
            size={normalize(18)}
            color={colors.typographyColor.Light}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(24),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: normalize(16)
  },
  sectionTitle: {
    fontSize: normalize(13.5),
    letterSpacing: 0.2,
    marginBottom: normalize(12),
  },
  cardsList: {
    gap: normalize(10),
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.blue[50],
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  iconCircle: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(19),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    gap: normalize(2),
  },
  cardTitle: {
    fontSize: normalize(13.5),
  },
  cardSubtitle: {
    fontSize: normalize(11.5),
  },
});
