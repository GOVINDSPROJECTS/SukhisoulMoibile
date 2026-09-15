import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Image, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Gift,
  Heart,
  Phone,
  Calendar,
  Clock,
  UserCheck,
  Headphones,
  Download,
  Share2,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  CheckCircle2,
  User2,
  UserSquare,
  UserSquare2,
  User,
  MessageSquare,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { GiftHeader } from '../components/GiftHeader';
import { GiftTitleSubTitle } from '../components/GiftTitleSubTitle';

export const SectionHeader: React.FC<{ title: string, iconUser: any, color: string, fill?: string }> = ({ title, iconUser, color, fill }) => {
  const IconUser = iconUser;
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>
        {/* {iconUser} */}
        <IconUser size={normalize(13)} color={color} fill={fill} />
      </View>
      <AppText variant="caption" family="secondary" weight='semiBold' style={styles.sectionLabel}>
        {title}
      </AppText>
    </View>
  );
};

export const GiftDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const handleShareGift = useCallback(async () => {
    try {
      await Share.share({
        message:
          'I\'ve gifted a therapy session to Sarah Johnson via Sukhi Soul. Spread wellness! 🎁\nhttps://sukhisoul.app/gift/CWJED',
        title: 'Gift Therapy – Sukhi Soul',
      });
    } catch (_) {
      // dismissed or error — no-op
    }
  }, []);

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
        <GiftTitleSubTitle title="Gift Therapy Details" subtitle="You've sent a gift of care" />


        {/* Top Pink Card */}
        <View style={styles.topCard}>
          <View style={styles.giftIconBoxParent}>
            <View style={styles.giftIconBox}>
              <Gift size={normalize(30)} color="#FF5252" />
            </View>
          </View>
          <View style={styles.topCardInfo}>
            <AppText family="secondary" weight="extraBold" style={styles.topCardTitle}>
              Individual Therapy
            </AppText>
            <AppText family="secondary" weight='light' style={styles.topCardSubtitle}>
              1 Session
            </AppText>
            <View style={styles.sentBadgeRow}>
              <View style={styles.greenCheckBadge}>
                <CheckCircle2 size={normalize(18)} color="#ffffff" fill={colors.lightTints.redLightTint2[500]} style={{ marginRight: normalize(4) }} />
                <AppText family='primary' weight='semiBold' style={styles.sentBadgeText}>SENT</AppText>
              </View>
            </View>
          </View>
          <View>
            <Image source={require('../assets/gift-final-icon.png')} style={{ width: 50, height: 50 }} />
          </View>
        </View>

        {/* Sent To Section */}
        <SectionHeader title='Sent To' iconUser={User2} color="#FF7D8A" fill="#FF7D8A" />
        <View style={styles.sectionCard}>
          <View style={styles.recipientRow}>
            <View style={styles.avatarCircle}>
              <AppText family="secondary" weight="bold" style={styles.avatarText}>
                SJ
              </AppText>
            </View>
            <View style={styles.recipientInfo}>
              <AppText family="secondary" weight="bold" style={styles.recipientName}>
                Sarah Johnson
              </AppText>
              <View style={styles.phoneRow}>
                <View style={styles.greenDot} >
                  <Image source={require('../assets/whatsapp.png')} style={{ width: normalize(8), height: normalize(8) }} />
                </View>
                <AppText family="secondary" weight='light' style={styles.phoneText}>
                  +91 98765 43210
                </AppText>
              </View>
            </View>
            <TouchableOpacity style={styles.phoneBtn} activeOpacity={0.7}>
              <Phone size={normalize(18)} fill={colors.lightTints.redLightTint2[500]} color={'transparent'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Section */}
        <SectionHeader title='Your Message' iconUser={MessageSquare} color="#FF7D8A" fill="#FF7D8A" />
        <View style={styles.sectionCard2}>
          <View style={styles.messageBox}>
            <AppText family="secondary" weight='light' style={styles.quotedMessage}>
              "You are strong, and you deserve care and happiness. Take this step towards a better you."
            </AppText>
            <Heart size={normalize(50)} color={colors.lightTints.redLightTint2[100]} fill={colors.lightTints.redLightTint2[100]} style={styles.messageHeart} />
          </View>
        </View>

        {/* Session Details Section */}
        <SectionHeader title='Session Details' iconUser={Calendar} color="#FF7D8A" fill="transparent" />
        <View style={styles.sectionCard3}>

          <View style={[styles.detailRow, styles.border]}>
            <View style={styles.detailLeft}>
              <Calendar size={normalize(16)} color={colors.lightTints.redLightTint2[500]} style={styles.detailIcon} />
              <AppText family="secondary" style={styles.detailKey}>
                Session Type
              </AppText>
            </View>
            <AppText family="secondary" weight="semiBold" style={styles.detailVal}>
              Individual Therapy
            </AppText>
          </View>

          <View style={[styles.detailRow, styles.border]}>
            <View style={styles.detailLeft}>
              <Calendar size={normalize(16)} color={colors.lightTints.redLightTint2[500]} style={styles.detailIcon} />
              <AppText family="secondary" style={styles.detailKey}>
                Sessions
              </AppText>
            </View>
            <AppText family="secondary" weight="semiBold" style={styles.detailVal}>
              1 Session
            </AppText>
          </View>

          <View style={[styles.detailRow, styles.border]}>
            <View style={styles.detailLeft}>
              <Clock size={normalize(16)} color={colors.lightTints.redLightTint2[500]} style={styles.detailIcon} />
              <AppText family="secondary" style={styles.detailKey}>
                Validity
              </AppText>
            </View>
            <AppText family="secondary" weight="semiBold" style={styles.detailVal}>
              3 Months from activation
            </AppText>
          </View>

          <View style={[styles.detailRow, styles.noBorder]}>
            <View style={styles.detailLeft}>
              <UserCheck size={normalize(16)} color={colors.lightTints.redLightTint2[500]} style={styles.detailIcon} />
              <AppText family="secondary" style={styles.detailKey}>
                Who can use it?
              </AppText>
            </View>
            <AppText family="secondary" weight="semiBold" style={[styles.detailVal, { flex: 1, textAlign: 'right' }]}>
              Recipient can book with any available therapist
            </AppText>
          </View>
        </View>

        <View style={{ marginTop: normalize(10) }}></View>

        {/* Sent On Section */}
        <SectionHeader title='Sent On' iconUser={Clock} color="#FF7D8A" fill="transparent" />
        <View style={[styles.sectionCard3, { marginBottom: normalize(20) }]}>
          <View style={styles.timestampRow}>
            <View style={styles.timeItem}>
              <Calendar size={normalize(16)} color="#FF5252" style={{ marginRight: normalize(6) }} />
              <AppText family="secondary" weight="medium" style={styles.timeText}>
                23 May 2025
              </AppText>
            </View>
            <View style={styles.timeItem}>
              <Clock size={normalize(16)} color="#FF5252" style={{ marginRight: normalize(6) }} />
              <AppText family="secondary" weight="medium" style={styles.timeText}>
                10:45 AM
              </AppText>
            </View>
          </View>
        </View>

        {/* Support Banner */}
        <TouchableOpacity style={styles.supportBanner} activeOpacity={0.8}>
          <View style={styles.supportIconBox}>
            <Headphones size={normalize(20)} color={colors.lightTints.redLightTint2[500]} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText family="secondary" weight="extraBold" style={styles.supportTitle}>
              Need help?
            </AppText>
            <AppText family="secondary" weight='light' style={styles.supportSubtitle}>
              We're here for you.
            </AppText>
          </View>
          <View style={styles.contactSupportBtn}>
            <AppText family="secondary" weight="bold" style={styles.contactSupportText}>
              Contact {'\n'}Support
            </AppText>
            <ChevronRight size={normalize(17)} color="#FF5252" />
          </View>
        </TouchableOpacity>

        {/* Bottom Buttons Row */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity style={styles.receiptButton} activeOpacity={0.8}>
            <Download size={normalize(21)} color={colors.lightTints.redLightTint2[500]} style={{ marginRight: normalize(6) }} />
            <AppText family="secondary" weight="semiBold" style={styles.receiptButtonText}>
              Download{'\n'}Receipt
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.85} onPress={handleShareGift}>
            <Share2 size={normalize(21)} color="#FFFFFF" style={{ marginRight: normalize(6) }} />
            <AppText family="secondary" weight="semiBold" style={styles.shareButtonText}>
              Share Gift
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    paddingBottom: normalize(35),
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
    marginBottom: normalize(20),
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  giftIconBoxParent: {
    backgroundColor: '#ffffff',
    padding: normalize(12),
    borderRadius: normalize(12),
    marginRight: normalize(16),
  },
  giftIconBox: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(8),
    backgroundColor: '#FEF0F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardInfo: { flex: 1 },
  topCardTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(15),
  },
  topCardSubtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(12),
    marginVertical: normalize(2),
  },
  sentBadgeRow: {
    flexDirection: 'row',
    marginTop: normalize(2),
  },
  greenCheckBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    paddingLeft: normalize(6),
    borderRadius: normalize(99),
    borderWidth: normalize(1),
    borderColor: '#FFDCE0',
  },
  sentBadgeText: {
    color: colors.lightTints.redLightTint2[500],
    fontSize: normalize(10),
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  sectionIcon: {
    marginRight: normalize(6),
    fontSize: normalize(12),
    backgroundColor: '#FFF5F6',
    borderRadius: normalize(6),
    height: normalize(20),
    width: normalize(20),
    alignItems: 'center',
    justifyContent: 'center'

  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(14),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  sectionCard2: {
    marginBottom: normalize(14),
  },
  sectionCard3: {
    marginBottom: normalize(14),
    borderRadius: normalize(16),
    borderWidth: normalize(1),
    borderColor: '#F3F4F6',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  sectionLabel: {
    color: '#1F2937',
    fontSize: normalize(11.5),
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#FFF5F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    borderWidth: normalize(1),
    borderColor: '#FFDCE0'
  },
  avatarText: {
    color: colors.lightTints.redLightTint2[500],
    fontSize: normalize(15),
  },
  recipientInfo: { flex: 1 },
  recipientName: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  greenDot: {
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(99),
    backgroundColor: colors.green[500],
    marginRight: normalize(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {
    color: '#6B7280',
    fontSize: normalize(12),
  },
  phoneBtn: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(19),
    backgroundColor: '#FFF5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    borderRadius: normalize(16),
    padding: normalize(20),
    borderWidth: 1,
    borderColor: '#FFDCE0',
  },
  quotedMessage: {
    flex: 1,
    color: colors.typographyColor.Dark,
    fontSize: normalize(13),
    lineHeight: normalize(18),
    paddingRight: normalize(10),
  },
  messageHeart: {
    // alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginBottom: normalize(-7)
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  noBorder: { borderWidth: 0 },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: normalize(8),
  },
  detailKey: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  detailVal: {
    color: colors.typographyColor.Black,
    fontSize: normalize(12),
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(0),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: '#F3F4F6',
    borderRadius: normalize(16),
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(16),
    width: '50%'
  },
  timeText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(12),
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F6',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: '#FFDCE0',
  },
  supportIconBox: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  supportTitle: {
    color: colors.lightTints.redLightTint2[500],
    fontSize: normalize(14),
  },
  supportSubtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11),
  },
  contactSupportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: normalize(1),
    borderColor: '#FFDCE0',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(19),
    paddingVertical: normalize(8),
  },
  contactSupportText: {
    color: '#FF5252',
    fontSize: normalize(12),
    marginRight: normalize(5),
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    gap: '4%',
  },
  receiptButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#FF7D8A',
    borderRadius: normalize(12),
    paddingVertical: normalize(14),
    backgroundColor: '#FFFFFF',
    gap: normalize(10),
    paddingLeft: normalize(20),
    paddingRight: normalize(25),
    width: '48%',
  },
  receiptButtonText: {
    color: colors.lightTints.redLightTint2[500],
    fontSize: normalize(13),
    textAlign: 'center',
  },
  shareButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightTints.redLightTint2[500],
    borderRadius: normalize(12),
    paddingVertical: normalize(14),
    width: '48%',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
