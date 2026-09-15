import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Share, Linking, Clipboard } from 'react-native';
import { MoreHorizontal, Copy, Check } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface GiftShareRowProps {
  shareUrl?: string;
}

export const GiftShareRow: React.FC<GiftShareRowProps> = ({
  shareUrl = 'https://giftlink.code',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    Clipboard.setString(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  const shareMessage = `Check out this gift therapy session! ${shareUrl}`;

  const handleShare = useCallback(async (label: string) => {
    try {
      switch (label) {
        case 'Whatsapp': {
          try {
            await Linking.openURL(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
          } catch {
            await Linking.openURL(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`);
          }
          break;
        }
        case 'Telegram': {
          try {
            await Linking.openURL(`tg://msg?text=${encodeURIComponent(shareMessage)}`);
          } catch {
            await Linking.openURL(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this gift therapy session!')}`);
          }
          break;
        }
        case 'SMS': {
          const smsUrl = `sms:?body=${encodeURIComponent(shareMessage)}`;
          await Linking.openURL(smsUrl);
          break;
        }
        case 'Mail': {
          const mailUrl = `mailto:?subject=${encodeURIComponent('Gift Therapy Session')}&body=${encodeURIComponent(shareMessage)}`;
          await Linking.openURL(mailUrl);
          break;
        }
        case 'Facebook': {
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          await Linking.openURL(fbUrl);
          break;
        }
        case 'Other':
        default: {
          await Share.share({
            message: shareMessage,
            url: shareUrl,
            title: 'Gift Therapy Session',
          });
          break;
        }
      }
    } catch (error) {
      // User dismissed or error — no-op
    }
  }, [shareUrl, shareMessage]);

  const shareOptions = [
    { label: 'SMS', icon: <Image source={require('../assets/share/sms.png')} style={{ width: 20, height: 20 }} /> },
    { label: 'Whatsapp', icon: <Image source={require('../assets/share/whatsapp.png')} style={{ width: 23, height: 23 }} /> },
    { label: 'Mail', icon: <Image source={require('../assets/share/mail.png')} style={{ width: 20, height: 16 }} /> },
    { label: 'Facebook', icon: <Image source={require('../assets/share/facebook.png')} style={{ width: 25, height: 25 }} /> },
    { label: 'Telegram', icon: <Image source={require('../assets/share/telegram.png')} style={{ width: 30, height: 30 }} /> },
    { label: 'Other', icon: <MoreHorizontal size={normalize(18)} color="#64748B" /> },
  ];

  return (
    <View style={styles.container}>
      <AppText variant="body" family="secondary" weight="bold" style={styles.title}>
        Share your kindness
      </AppText>
      <AppText variant="caption" family="secondary" style={styles.subtitle}>
        Inspire others by gifting wellness.
      </AppText>

      <View style={styles.shareButtonsRow}>
        {shareOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.shareIconItem}
            activeOpacity={0.7}
            onPress={() => handleShare(item.label)}
          >
            <View style={styles.iconCircle}>{item.icon}</View>
            <AppText variant="caption" family="secondary" style={styles.iconLabel}>
              {item.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <AppText variant="caption" family="secondary" style={styles.copyLabel}>
        Copy Link
      </AppText>

      <View style={styles.copyContainer}>
        <AppText
          variant="body"
          family="secondary"
          style={styles.linkText}
          numberOfLines={1}
        >
          {shareUrl}
        </AppText>

        <TouchableOpacity onPress={handleCopy} style={styles.copyBtn} activeOpacity={0.7}>
          {copied ? (
            <Check size={normalize(18)} color="#16A34A" />
          ) : (
            <Copy size={normalize(18)} color="#64748B" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(15),
  },
  title: {
    color: colors.typographyColor.Black,
    fontSize: normalize(16),
  },
  subtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
    marginBottom: normalize(16),
  },
  shareButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  shareIconItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(6),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(6),
    borderWidth: normalize(1),
    borderColor: colors.lightAppTheme[100],
  },
  iconLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
  },
  copyLabel: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
    marginBottom: normalize(6),
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(5),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
  },
  linkText: {
    flex: 1,
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
  },
  copyBtn: {
    padding: normalize(4),
  },
});
