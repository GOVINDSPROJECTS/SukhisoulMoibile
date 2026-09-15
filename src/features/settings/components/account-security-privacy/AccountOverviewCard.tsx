import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Check, ChevronRight, Star } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface AccountOverviewCardProps {
  name?: string;
  email?: string;
  avatarUri?: string | null;
  memberSince?: string;
  status?: string;
  calmPoints?: number;
  planName?: string;
  onAvatarPress?: () => void;
  onPlanPress?: () => void;
}

export const AccountOverviewCard: React.FC<AccountOverviewCardProps> = ({
  name = 'User',
  email = 'user@example.com',
  avatarUri,
  memberSince = 'Member since Jan 2026',
  status = 'Active',
  calmPoints = 0,
  planName = 'Individual Therapy Plan',
  onAvatarPress,
  onPlanPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top User Info Row */}
      <View style={styles.userRow}>
        {/* Avatar with Camera Badge */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAvatarPress}
          style={styles.avatarWrapper}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarCircle}>
              <AppText weight="bold" family="primary" style={styles.avatarText}>
                {name.charAt(0).toUpperCase()}
              </AppText>
            </View>
          )}
          <View style={styles.cameraBadge}>
            <Camera size={normalize(12)} color="#FFFFFF" strokeWidth={2} />
          </View>
        </TouchableOpacity>

        {/* Name, Verified & Email */}
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <AppText
              weight="extraBold"
              family="primary"
              style={styles.nameText}
              color={'#0F172A'}
            >
              {name}
            </AppText>
            <View style={styles.verifiedPill}>
              <AppText
                weight="medium"
                family="secondary"
                style={styles.verifiedText}
                color={'#34C759'}
              >
                Verified
              </AppText>
              <Check size={normalize(11)} color={'#16A34A'} strokeWidth={2.5} />
            </View>
          </View>

          <AppText
            weight="regular"
            family="secondary"
            style={styles.emailText}
            color={'#64748B'}
          >
            {email}
          </AppText>

          <AppText
            weight="regular"
            family="secondary"
            style={styles.memberSinceText}
            color={'#94A3B8'}
          >
            {memberSince}
          </AppText>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <AppText
            weight="light"
            family="secondary"
            style={styles.statLabel}
            color={'#94A3B8'}
          >
            ACCOUNT STATUS
          </AppText>
          <View style={styles.statusPill}>
            <AppText
              weight="semiBold"
              family="secondary"
              style={styles.statusText}
              color={colors.colorPalet['Color 10'] || '#10B981'}
            >
              {status}
            </AppText>
          </View>
        </View>

        <View style={styles.statItemRight}>
          <AppText
            weight="light"
            family="secondary"
            style={styles.statLabel}
            color={'#94A3B8'}
          >
            CALM POINTS
          </AppText>
          <View style={styles.pointsRow}>
            <Star
              size={normalize(17)}
              color={'#FACC15'}
              fill={'#FACC15'}
            />
            <AppText
              weight="extraBold"
              family="primary"
              style={styles.pointsValue}
              color={'#0F172A'}
            >
              {calmPoints.toLocaleString()}
            </AppText>
          </View>
        </View>
      </View>

      {/* Member Plan Strip */}
      <TouchableOpacity
        style={styles.planStrip}
        activeOpacity={0.8}
        onPress={onPlanPress}
      >
        <AppText
          weight="medium"
          family="primary"
          style={styles.planLabel}
          color={'#334155'}
        >
          Member Plan
        </AppText>

        <View style={styles.planRight}>
          <AppText
            weight="semiBold"
            family="primary"
            style={styles.planValue}
            color="#8B5CF6"
          >
            {planName}
          </AppText>
          <ChevronRight
            size={normalize(14)}
            color="#8B5CF6"
            strokeWidth={2}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(8),
    padding: normalize(16),
    marginHorizontal: normalize(18),
    marginTop: normalize(26),
    marginBottom: normalize(20),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: '#F1F5F9',

  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(14),
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(99),
    backgroundColor: '#F5F3FF',
  },
  avatarCircle: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(99),
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: normalize(20),
    color: '#8B5CF6',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: normalize(-5),
    right: normalize(-5),
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(88),
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
    gap: normalize(2),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  nameText: {
    fontSize: normalize(16),
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(3),
    backgroundColor: '#F0FDF4',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    borderRadius: normalize(99),
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  verifiedText: {
    fontSize: normalize(10.5),
  },
  emailText: {
    fontSize: normalize(12),
  },
  memberSinceText: {
    fontSize: normalize(11),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(18),
    paddingBottom: normalize(14),
  },
  statItem: {
    gap: normalize(4),
  },
  statItemRight: {
    alignItems: 'flex-end',
    gap: normalize(4),
  },
  statLabel: {
    fontSize: normalize(10.5),
    letterSpacing: 0.5,
  },
  statusPill: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
    borderRadius: normalize(6),
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: normalize(11),
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  pointsValue: {
    fontSize: normalize(14),
    lineHeight: normalize(18),
  },
  planStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F3FF',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
  },
  planLabel: {
    fontSize: normalize(11.5),
  },
  planRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  planValue: {
    fontSize: normalize(11.5),
    lineHeight: normalize(11.5)
  },
});
