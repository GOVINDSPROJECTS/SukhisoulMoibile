import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Gift } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface GiftSummaryCardProps {
  title?: string;
  planName?: string;
  sessionCount?: string;
  price?: string;
  recipientName?: string;
  recipientPhone?: string;
  message?: string;
  onEditMessage?: () => void;
  showEdit?: boolean;
  code?: string;
  badge?: string;
}

export const GiftSummaryCard: React.FC<GiftSummaryCardProps> = ({
  title,
  planName = 'Individual Therapy',
  sessionCount = '1 Session',
  price = '₹1,499',
  recipientName,
  recipientPhone,
  message,
  onEditMessage,
  showEdit = false,
  code,
  badge,
}) => {
  return (
    <View style={styles.card}>
      {title ? (
        <AppText variant="body" family="secondary" weight="semiBold" style={styles.cardHeaderTitle}>
          {title}
        </AppText>
      ) : null}

      <View style={styles.cardInner}>

        <View style={styles.topRow}>
          <View style={styles.iconBox}>
            <Calendar size={normalize(20)} color={colors.lightTints.redLightTint2[500]} />
          </View>

          <View style={styles.planInfo}>
            <View style={styles.planTitleRow}>
              <AppText variant="body" family="secondary" weight="bold" style={styles.planName}>
                {planName}
              </AppText>
              {badge ? (
                <View style={styles.badgeView}>
                  <AppText style={styles.badgeText}>{badge}</AppText>
                </View>
              ) : null}
            </View>
            <AppText variant="caption" family="secondary" weight='regular' style={styles.sessionCount}>
              {sessionCount}
            </AppText>
          </View>

          {price ? (
            <AppText variant="body" family="secondary" weight="bold" style={styles.price}>
              {price}
            </AppText>
          ) : null}
        </View>

        {(recipientName || recipientPhone) && (
          <View style={styles.sectionDivider}>
            <AppText variant="caption" family="secondary" weight='regular' style={styles.sectionLabel}>
              RECIPIENT
            </AppText>
            <View style={styles.recipientRow}>
              <AppText variant="body" family="secondary" weight="semiBold" style={styles.recipientName}>
                {recipientName || 'John Doe'}
              </AppText>
              {recipientPhone ? (
                <AppText variant="body" family="secondary" weight="medium" style={styles.recipientPhone}>
                  {recipientPhone}
                </AppText>
              ) : null}
            </View>
          </View>
        )}

        {message ? (
          <View style={styles.sectionDivider}>
            <View style={styles.messageHeaderRow}>
              <AppText variant="caption" family="secondary" style={styles.sectionLabel}>
                MESSAGE
              </AppText>
              {showEdit && onEditMessage ? (
                <TouchableOpacity onPress={onEditMessage} activeOpacity={0.7}>
                  <AppText variant="caption" family="secondary" weight="semiBold" style={styles.editBtnText}>
                    Edit
                  </AppText>
                </TouchableOpacity>
              ) : null}
            </View>
            <AppText
              variant="caption"
              family="secondary"
              weight='regular'
              numberOfLines={2}
              style={styles.messageText}
            >
              {message}
            </AppText>
          </View>
        ) : null}

        {code ? (
          <View style={styles.codeRow}>
            <AppText variant="caption" family="secondary" style={styles.sectionLabel}>
              GIFT CODE:
            </AppText>
            <AppText variant="body" family="secondary" weight="bold" style={styles.codeText}>
              {code}
            </AppText>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderRadius: normalize(24),
    padding: normalize(24),
    marginBottom: normalize(20),
    borderWidth: 1,
    borderColor: colors.lightTints.redLightTint2[100],
  },
  cardHeaderTitle: {
    color: colors.typographyColor.Black,
    fontSize: normalize(15),
    marginBottom: normalize(14),
  },
  cardInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    backgroundColor: colors.lightTints.redLightTint2[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  planInfo: {
    flex: 1,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  planName: {
    color: colors.typographyColor.Black,
    fontSize: normalize(13),
  },
  badgeView: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    borderRadius: normalize(6),
  },
  badgeText: {
    color: '#166534',
    fontSize: normalize(10),
    fontWeight: '700',
  },
  sessionCount: {
    color: colors.typographyColor.Light,
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
  price: {
    color: "#1F2937",
    fontSize: normalize(15),
  },
  sectionDivider: {
    marginTop: normalize(14),
    paddingTop: normalize(12),
    boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.05)',
  },
  sectionLabel: {
    color: "#9CA3AF",
    fontSize: normalize(11),
    letterSpacing: 0.5,
    marginBottom: normalize(4),
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipientName: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  recipientPhone: {
    color: "#1F2937",
    fontSize: normalize(12),
  },
  messageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  editBtnText: {
    color: '#FF5252',
    fontSize: normalize(12),
  },
  messageText: {
    color: "#4B5563",
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },
  codeRow: {
    marginTop: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  codeText: {
    color: '#FF5252',
    fontSize: normalize(16),
    letterSpacing: 1,
  },
});
