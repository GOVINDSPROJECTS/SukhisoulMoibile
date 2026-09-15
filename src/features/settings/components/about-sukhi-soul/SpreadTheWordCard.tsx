import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Share,
  Clipboard,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  Share2,
  MessageSquare,
  AtSign,
  Link2,
  Ellipsis,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface SpreadTheWordCardProps {
  shareUrl?: string;
  shareMessage?: string;
  onShareApp?: () => void;
  onSmsShare?: () => void;
  onEmailShare?: () => void;
  onLinkCopy?: () => void;
  onMoreShare?: () => void;
}

export const SpreadTheWordCard: React.FC<SpreadTheWordCardProps> = ({
  shareUrl = 'https://sukhisoul.com/app',
  shareMessage = 'Find your calm with Sukhi Soul – a digital mental wellness companion.',
  onShareApp,
  onSmsShare,
  onEmailShare,
  onLinkCopy,
  onMoreShare,
}) => {
  // ── Share App (Native Share) ──────────────────────────────────────────
  const handleShareApp = useCallback(async () => {
    console.log('[About Sukhi Soul] Share App button pressed');
    onShareApp?.();
    try {
      const fullText = `${shareMessage}\n\nDownload now: ${shareUrl}`;
      await Share.share(
        Platform.OS === 'ios'
          ? { title: 'Sukhi Soul', message: fullText, url: shareUrl }
          : { title: 'Sukhi Soul', message: fullText }
      );
    } catch (error) {
      console.log('[About Sukhi Soul] Share dismissed or error:', error);
    }
  }, [shareMessage, shareUrl, onShareApp]);

  // ── SMS Quick Share ───────────────────────────────────────────────────
  const handleSmsShare = useCallback(async () => {
    console.log('[About Sukhi Soul] Quick Share: SMS pressed');
    onSmsShare?.();
    const smsUrl = `sms:?body=${encodeURIComponent(
      `${shareMessage} ${shareUrl}`
    )}`;
    try {
      const supported = await Linking.canOpenURL(smsUrl);
      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        await handleShareApp();
      }
    } catch {
      await handleShareApp();
    }
  }, [shareMessage, shareUrl, onSmsShare, handleShareApp]);

  // ── Email Quick Share ─────────────────────────────────────────────────
  const handleEmailShare = useCallback(async () => {
    console.log('[About Sukhi Soul] Quick Share: Email pressed');
    onEmailShare?.();
    const subject = encodeURIComponent('Experience Sukhi Soul');
    const body = encodeURIComponent(
      `Hello,\n\nI thought you might appreciate Sukhi Soul – a mindful digital mental wellness platform.\n\nLearn more and download: ${shareUrl}\n\nTake care!`
    );
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        await handleShareApp();
      }
    } catch {
      await handleShareApp();
    }
  }, [shareUrl, onEmailShare, handleShareApp]);

  // ── Copy Link ─────────────────────────────────────────────────────────
  const handleLinkCopy = useCallback(() => {
    console.log(`[About Sukhi Soul] Quick Share: Link copied: ${shareUrl}`);
    Clipboard.setString(shareUrl);
    onLinkCopy?.();
    Alert.alert('Link Copied!', 'App link has been copied to your clipboard.', [
      { text: 'OK', style: 'default' },
    ]);
  }, [shareUrl, onLinkCopy]);

  // ── More Sharing Options ──────────────────────────────────────────────
  const handleMoreShare = useCallback(async () => {
    console.log('[About Sukhi Soul] Quick Share: More pressed');
    onMoreShare?.();
    await handleShareApp();
  }, [onMoreShare, handleShareApp]);

  return (
    <View style={styles.wrapper}>
      {/* Section Header */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Medium}
      >
        SPREAD THE WORD
      </AppText>

      {/* Main Card */}
      <View style={styles.card}>
        <AppText
          weight="light"
          family="secondary"
          style={styles.subtitle}
          color={colors.typographyColor.Light}
        >
          Share the calm with your friends and family.
        </AppText>

        {/* Primary Share App Button */}
        <TouchableOpacity
          style={styles.shareAppBtn}
          activeOpacity={0.85}
          onPress={handleShareApp}
        >
          <Share2
            size={normalize(18)}
            color="#FFFFFF"
            strokeWidth={1.5}
          />
          <AppText
            weight="semiBold"
            family="secondary"
            style={styles.shareAppText}
            color="#FFFFFF"
          >
            Share App
          </AppText>
        </TouchableOpacity>

        {/* 4 Quick Share Channels: SMS, Email, Link, More */}
        <View style={styles.channelsRow}>
          {/* SMS */}
          <TouchableOpacity
            style={styles.channelItem}
            activeOpacity={0.7}
            onPress={handleSmsShare}
          >
            <View style={styles.channelCircle}>
              <MessageSquare
                size={normalize(20)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.channelLabel}
              color={colors.typographyColor.Light}
            >
              SMS
            </AppText>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            style={styles.channelItem}
            activeOpacity={0.7}
            onPress={handleEmailShare}
          >
            <View style={styles.channelCircle}>
              <AtSign
                size={normalize(20)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.channelLabel}
              color={colors.typographyColor.Light}
            >
              Email
            </AppText>
          </TouchableOpacity>

          {/* Link */}
          <TouchableOpacity
            style={styles.channelItem}
            activeOpacity={0.7}
            onPress={handleLinkCopy}
          >
            <View style={styles.channelCircle}>
              <Link2
                size={normalize(20)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.channelLabel}
              color={colors.typographyColor.Light}
            >
              Link
            </AppText>
          </TouchableOpacity>

          {/* More */}
          <TouchableOpacity
            style={styles.channelItem}
            activeOpacity={0.7}
            onPress={handleMoreShare}
          >
            <View style={styles.channelCircle}>
              <Ellipsis
                size={normalize(20)}
                color={colors.typographyColor['Dark 2'] || '#003CA3'}
                strokeWidth={2}
              />
            </View>
            <AppText
              weight="medium"
              family="secondary"
              style={styles.channelLabel}
              color={colors.typographyColor.Light}
            >
              More
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: normalize(26),
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
    marginBottom: normalize(8),
    paddingHorizontal: normalize(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
    borderWidth: 1,
    borderColor: colors.tintsGrey[50],
  },
  subtitle: {
    fontSize: normalize(13.5),
    textAlign: 'center',
    marginBottom: normalize(16),
  },
  shareAppBtn: {
    backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
    borderRadius: normalize(8),
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
    width: '100%',
  },
  shareAppText: {
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
  channelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: normalize(20),
    paddingHorizontal: normalize(6),
  },
  channelItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelCircle: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(26),
    backgroundColor: colors.tintsGrey[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(6),
  },
  channelLabel: {
    fontSize: normalize(12),
    textAlign: 'center',
  },
});
