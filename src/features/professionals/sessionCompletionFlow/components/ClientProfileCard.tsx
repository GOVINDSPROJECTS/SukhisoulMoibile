import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { CheckCircle2, User } from 'lucide-react-native';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

// Simple User Icon SVG for the view profile button
const UserIcon = (props: any) => (
  <View style={{ width: props.size, height: props.size, borderRadius: props.size / 2, borderWidth: 1, borderColor: props.color, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: props.size * 0.4, height: props.size * 0.4, borderRadius: props.size * 0.2, backgroundColor: props.color, marginBottom: 1 }} />
    <View style={{ width: props.size * 0.6, height: props.size * 0.3, borderTopLeftRadius: props.size * 0.3, borderTopRightRadius: props.size * 0.3, backgroundColor: props.color }} />
  </View>
);

export const ClientProfileCard = () => {
  return (
    <View style={styles.card}>

      <View style={styles.profileRow}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=prathmesh' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.clientBadge}>
            <AppText family="primary" weight="bold" style={styles.clientBadgeText}>CLIENT</AppText>
          </View>
          <View style={styles.nameRow}>
            <AppText family="primary" weight="bold" style={styles.clientName}>Dr. Ananya Sharma</AppText>
            <CheckCircle2 size={normalize(14)} color="#3B82F6" style={{ marginLeft: normalize(4) }} />
          </View>
          <AppText family="primary" weight="medium" style={styles.clientInfo}>
            ID: CL-10234 • 28 Yrs • Female
          </AppText>
          <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.7}>
            <User size={normalize(13)} color={colors.blue[600]} style={{ marginRight: normalize(4) }} />
            <AppText family="primary" weight="semiBold" style={styles.viewProfileBtnText}>View Profile</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(20),
    marginBottom: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 12px 32px rgba(45, 52, 50, 0.04)',
  },
  avatar: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(12),
    marginRight: normalize(12),
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalize(16),
  },
  avatarPlaceholder: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
    backgroundColor: '#CBD5E1',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: normalize(2),
    right: normalize(2),
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
    alignItems: 'flex-start',
  },
  clientBadge: {
    backgroundColor: colors.lightTints.blueLightTint[100],
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(2),
    borderRadius: normalize(12),
    marginBottom: normalize(0),
  },
  clientBadgeText: {
    fontSize: normalize(8),
    color: colors.blue[600],
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(2),
  },
  clientName: {
    fontSize: normalize(16),
    color: colors.typographyColor.Black,
  },
  clientInfo: {
    fontSize: normalize(11),
    color: colors.tintsGrey[500],
    marginBottom: normalize(8),
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(16),
    backgroundColor: colors.blue[50]
  },
  viewProfileBtnText: {
    fontSize: normalize(10),
    color: colors.blue[600],
  },
});
