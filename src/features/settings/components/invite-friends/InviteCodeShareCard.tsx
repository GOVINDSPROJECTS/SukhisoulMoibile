import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Copy, Link2, Check, Link } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface InviteCodeShareCardProps {
  inviteCode?: string;
  shareUrl?: string;
  onCodeCopied?: (code: string) => void;
  onShareLink?: () => void;
}

export const InviteCodeShareCard: React.FC<InviteCodeShareCardProps> = ({
  inviteCode = 'SUKHI2024',
  shareUrl = 'https://sukhisoul.com/invite/SUKHI2024',
  onCodeCopied,
  onShareLink,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    console.log(`[Invite Friends] Copy invite code button pressed: ${inviteCode}`);
    Clipboard.setString(inviteCode);
    setIsCopied(true);
    onCodeCopied?.(inviteCode);
    Alert.alert('Copied!', `Invite code ${inviteCode} copied to clipboard.`);
    setTimeout(() => setIsCopied(false), 2500);
  }, [inviteCode, onCodeCopied]);

  const handleShare = useCallback(async () => {
    console.log('[Invite Friends] Share Invite Link button pressed');
    onShareLink?.();
    try {
      const message = `Hey! Join me on Sukhi Soul to start your mental wellness journey. Use my invite code: *${inviteCode}* to earn bonus Calm Points!\n\n${shareUrl}`;
      await Share.share(
        Platform.OS === 'ios'
          ? { title: 'Join Sukhi Soul', message, url: shareUrl }
          : { title: 'Join Sukhi Soul', message },
      );
    } catch (error) {
      console.log('[Invite Friends] Share cancelled or error:', error);
    }
  }, [inviteCode, shareUrl, onShareLink]);

  return (
    <View style={styles.card}>
      {/* Label */}
      <AppText
        weight="medium"
        family="secondary"
        style={styles.label}
        color={colors.typographyColor['Theme Medium']}
      >
        YOUR INVITE CODE
      </AppText>

      {/* Invite Code Row with Copy Button */}
      <TouchableOpacity
        style={styles.codeRow}
        activeOpacity={0.75}
        onPress={handleCopy}
      >
        <AppText
          weight="extraBold"
          family="primary"
          style={styles.codeText}
          color={colors.typographyColor.Black || '#0F172A'}
        >
          {inviteCode}
        </AppText>
        <View style={styles.copyBtn}>
          {isCopied ? (
            <Check size={normalize(18)} color="#10B981" strokeWidth={2.5} />
          ) : (
            <Copy size={normalize(18)} color={colors.appThemeColor[400]} strokeWidth={2} />
          )}
        </View>
      </TouchableOpacity>

      {/* Share Invite Link Button */}
      <TouchableOpacity
        style={styles.shareBtn}
        activeOpacity={0.85}
        onPress={handleShare}
      >
        <Link size={normalize(18)} color="#FFFFFF" strokeWidth={2.5} />
        <AppText
          weight="bold"
          family="primary"
          style={styles.shareBtnText}
          color="#FFFFFF"
        >
          Share Invite Link
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(24),
    alignItems: 'center',
    marginBottom: normalize(18),
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.05)',

  },
  label: {
    fontSize: normalize(15),
    letterSpacing: 0.6,
    marginBottom: normalize(8),
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(22),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
  },
  codeText: {
    fontSize: normalize(26),
    letterSpacing: 1.5,
  },
  copyBtn: {
    padding: normalize(4),
  },
  shareBtn: {
    backgroundColor: colors.lightAppTheme[700],
    borderRadius: normalize(17),
    paddingVertical: normalize(15),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
  },
  shareBtnText: {
    fontSize: normalize(15),
    letterSpacing: 0.2,
  },
});
