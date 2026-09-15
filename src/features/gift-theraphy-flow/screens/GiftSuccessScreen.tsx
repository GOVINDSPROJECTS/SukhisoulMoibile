import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift, Copy, Check, Calendar } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftShareRow } from '../components/GiftShareRow';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const GiftSuccessScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [copiedCode, setCopiedCode] = useState(false);

  const GIFT_CODE = 'CWJED';

  const handleCopyCode = () => {
    Clipboard.setString(GIFT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: "#FAF3EB" }} />
      <GiftHeader title="Gift Therapy" onBack={() => navigation.navigate('Home')} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top 3D Artwork */}
        <View style={styles.artworkContainer}>
          <Image
            source={require('../assets/gift-purchased.png')}
            style={styles.artworkImage}
            resizeMode="contain"
          />
        </View>

        {/* Success Title */}
        <GiftTitleSubTitle title="Your gift has been Purchased!" subtitle="You've made a difference today ❤️" />

        {/* Gift Details Card */}
        <View style={styles.detailsCard}>
          <AppText family="secondary" weight="bold" style={styles.cardHeaderTitle}>
            Gift details
          </AppText>

          <View style={styles.topRow}>
            <View style={styles.iconBox}>
              <Calendar size={normalize(20)} color="#FF6B81" />
            </View>
            <View style={styles.planInfo}>
              <AppText family="secondary" weight="bold" style={styles.planName}>
                Individual Therapy
              </AppText>
              <AppText family="secondary" weight='light' style={styles.sessionCount}>
                1 Session
              </AppText>
            </View>
          </View>

          <View style={styles.sectionDivider}>
            <AppText variant="caption" family="secondary" style={styles.sectionLabel}>
              SENT TO
            </AppText>
            <AppText family="secondary" weight="semiBold" style={styles.recipientName}>
              Sarah Johnson
            </AppText>
            <AppText family="secondary" weight='medium' style={styles.recipientPhone}>
              +91 98765 43210
            </AppText>
          </View>

          <View style={styles.codeRowContainer}>
            <View style={[styles.iconBox, { backgroundColor: colors.lightTints.redLightTint2[100], borderRadius: normalize(55) }]}>
              <Gift size={normalize(20)} color={colors.colorPalet['Color 6']} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="caption" family="secondary" weight='light' style={styles.sectionLabel}>
                Gift code
              </AppText>
              <AppText family="secondary" weight="medium" style={styles.codeText}>
                {GIFT_CODE}
              </AppText>
            </View>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn} activeOpacity={0.7}>
              {copiedCode ? (
                <Check size={normalize(18)} color="#16A34A" />
              ) : (
                <Copy size={normalize(18)} color="#64748B" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Share Kindness Component */}
        <GiftShareRow shareUrl="https://giftlink.code" />

        {/* Done Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GiftManage')}
        >
          <AppText family="secondary" weight="bold" style={styles.primaryButtonText}>
            Done
          </AppText>
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
    paddingTop: normalize(15),
    paddingBottom: normalize(30),
  },
  artworkContainer: {
    width: '100%',
    height: normalize(288),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(15),
    marginTop: normalize(5)
  },
  artworkImage: {
    width: normalize(300),
    height: normalize(288),

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
    marginBottom: normalize(25),
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(18),
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)'
  },
  cardHeaderTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
    marginBottom: normalize(12),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  planInfo: { flex: 1 },
  planName: {
    color: "#1F2937",
    fontSize: normalize(15),
  },
  sessionCount: {
    color: colors.typographyColor.Light,
    fontSize: normalize(12),
  },
  sectionDivider: {
    marginTop: normalize(14),
    paddingTop: normalize(12),
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionLabel: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
    letterSpacing: 0.5,
    marginBottom: normalize(2),
  },
  recipientName: {
    color: "#1F2937",
    fontSize: normalize(14),
  },
  recipientPhone: {
    color: "#1F2937",
    fontSize: normalize(13),
    marginTop: normalize(2),
  },
  codeRowContainer: {
    marginTop: normalize(14),
    paddingTop: normalize(12),
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: normalize(15),
    padding: normalize(10)
  },
  codeText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(16),
    letterSpacing: 1,
  },
  copyBtn: {
    padding: normalize(8),
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(99),
    paddingVertical: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),

  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
});
