import React, { useCallback, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Plus, ArrowRight, MoreVertical } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';
import { colors } from '@/theme';

// ─── Static family members data ───────────────────────────────────────────────

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatarUrl: string;
}

const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fm1',
    name: 'Ashwika',
    relation: 'Sibling',
    avatarUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'fm2',
    name: 'Ashwika',
    relation: 'Parent',
    avatarUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'fm3',
    name: 'Ashwika',
    relation: 'Spouse',
    avatarUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
];

// ─── Member row sub-component ─────────────────────────────────────────────────

interface MemberRowProps {
  member: FamilyMember;
  isLast: boolean;
  onCheckProgress: (member: FamilyMember) => void;
  onMenuPress: (member: FamilyMember) => void;
}

const MemberRow: React.FC<MemberRowProps> = memo(
  ({ member, isLast, onCheckProgress, onMenuPress }) => (
    <View style={[styles.memberRow, !isLast && styles.memberRowBorder]}>
      {/* Avatar */}
      <Image
        source={{ uri: member.avatarUrl }}
        style={styles.memberAvatar}
        resizeMode="cover"
      />

      {/* Name + CTA */}
      <View style={styles.memberInfo}>
        <AppText variant="body" weight="semiBold" style={styles.memberName}>
          {member.name}
        </AppText>
        <View style={styles.progressRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onCheckProgress(member)}
          >
            <AppText variant="caption" weight="medium" style={styles.progressLabel}>
              Check progress
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onCheckProgress(member)}
            style={styles.arrowButton}
          >
            <ArrowRight size={normalize(12)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3-dot menu */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onMenuPress(member)}
        style={styles.menuButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MoreVertical size={normalize(18)} color={colors.appThemeColor[700]} />
      </TouchableOpacity>
    </View>
  ),
);

// ─── Main component ───────────────────────────────────────────────────────────

export const FamilyCare: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCheckProgress = useCallback((_member: FamilyMember) => {
    // TODO: navigate to member progress screen
  }, []);

  const handleMenuPress = useCallback((_member: FamilyMember) => {
    // TODO: open action sheet (edit / remove)
  }, []);

  return (
    <>
      <View style={styles.sectionContainer}>
        {/* Section heading */}
        <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
          Family Care
        </AppText>

        {/* ── Manage card ─────────────────────────────────────────────── */}
        <View style={styles.familyCard}>
          <View style={styles.familyIconContainer}>
            <Image
              source={require('../assets/familyCareIcon.png')}
              style={styles.familyIcon}
            />
          </View>
          <View style={styles.familyTextContainer}>
            <AppText variant="body" weight="bold" style={styles.familyTextTitle}>
              Manage Family Therapy
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.familyTextSub}>
              Extend the sanctuary to your loved ones.
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.plusButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FcFillInfo')}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ── Members list card ────────────────────────────────────────── */}
        <View style={styles.membersCard}>
          {FAMILY_MEMBERS.map((member, index) => (
            <MemberRow
              key={member.id}
              member={member}
              isLast={index === FAMILY_MEMBERS.length - 1}
              onCheckProgress={handleCheckProgress}
              onMenuPress={handleMenuPress}
            />
          ))}
        </View>
      </View>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    color: '#2D3432',
  },
  sectionSubtitle: {
    fontSize: normalize(11),
    color: '#59615F',
    marginTop: normalize(2),
  },

  // ── Manage card ────────────────────────────────────────────────────────────
  familyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.appThemeColor[50],
    padding: normalize(14),
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingVertical: normalize(20),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
  },
  familyIconContainer: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  familyIcon: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(22),
  },
  familyTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  familyTextTitle: {
    fontSize: normalize(14),
    color: '#2D3432',
  },
  familyTextSub: {
    fontSize: normalize(12),
    color: '#59615F',
    marginTop: normalize(4),
    lineHeight: normalize(16),
  },
  plusButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(22),
    backgroundColor: '#005BC2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#005BC2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // ── Members list card ──────────────────────────────────────────────────────
  membersCard: {
    backgroundColor: '#EDF3F7',
    borderRadius: normalize(20),
    marginTop: normalize(18),
    borderWidth: 1,
    borderColor: '#D5DBE2',
    overflow: 'hidden',
    boxShadow: '0px 8px 32px rgba(55, 94, 164, 0.03)',
    gap: normalize(16),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
    backgroundColor: colors.tintsBlue[50],
    borderRadius: normalize(15),
    overflow: 'hidden',
    gap: normalize(10)

  },
  memberRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.tintsGrey[50],
  },
  memberAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    backgroundColor: colors.appThemeColor[100],
    marginRight: normalize(8),
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: normalize(14),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(3),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  progressLabel: {
    fontSize: normalize(11),
    color: colors.typographyColor.Light,
    textDecorationLine: 'underline',
  },
  arrowButton: {
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(11),
    backgroundColor: colors.typographyColor['Color 2'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    padding: normalize(4),
    marginLeft: normalize(8),
  },
});
