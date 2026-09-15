import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface BlockedContact {
  id: string;
  name: string;
  designation: string;
  avatarUri?: string;
}

const INITIAL_BLOCKED: BlockedContact[] = [
  {
    id: '1',
    name: 'Dr.Ashish sharma',
    designation: 'Therapy expert',
    avatarUri: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  },
];

export const PrivacyControlsSection: React.FC = () => {
  const [blockedList, setBlockedList] = useState<BlockedContact[]>(INITIAL_BLOCKED);

  const handleUnblock = useCallback((contact: BlockedContact) => {
    console.log(`[Account Security] Unblock button pressed for: ${contact.name}`);
    Alert.alert(
      'Unblock Contact',
      `Are you sure you want to unblock ${contact.name}? They will be able to message you.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          style: 'default',
          onPress: () => {
            console.log(`[Account Security] Unblocked contact: ${contact.name}`);
            setBlockedList((prev) => prev.filter((c) => c.id !== contact.id));
          },
        },
      ],
    );
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        PRIVACY CONTROLS
      </AppText>

      <View style={styles.outerContainer}>
        <AppText weight="bold" family="primary" style={styles.headerTitle} color={colors.typographyColor.Medium || '#1E293B'}>
          Blocked Contacts
        </AppText>
        <AppText weight="regular" family="secondary" style={styles.headerSubtitle} color={'#64748B'}>
          Manage blocked contacts
        </AppText>

        {blockedList.length > 0 ? (
          blockedList.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              {/* Doctor Avatar */}
              <View style={styles.avatarWrapper}>
                {contact.avatarUri ? (
                  <Image source={{ uri: contact.avatarUri }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <AppText weight="bold" color="#FFFFFF">
                      {contact.name.charAt(0)}
                    </AppText>
                  </View>
                )}
              </View>

              {/* Name & Role */}
              <View style={styles.infoCol}>
                <AppText weight="regular" family="secondary" style={styles.contactName} color={colors.typographyColor.Medium || '#1E293B'}>
                  {contact.name}
                </AppText>
                <AppText weight="regular" family="secondary" style={styles.contactRole} color={colors.typographyColor.Medium || '#64748B'}>
                  {contact.designation}
                </AppText>
              </View>

              {/* Unblock Button */}
              <TouchableOpacity
                style={styles.unblockBtn}
                activeOpacity={0.8}
                onPress={() => handleUnblock(contact)}
              >
                <AppText weight="regular" family="secondary" style={styles.unblockText} color="#1D4ED8">
                  Unblock
                </AppText>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <AppText weight="regular" family="secondary" style={styles.emptyText} color={colors.typographyColor.Light || '#94A3B8'}>
              No blocked contacts
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: normalize(18),
    marginBottom: normalize(32),
  },
  sectionTitle: {
    fontSize: normalize(15),
    letterSpacing: 0.5,
    marginBottom: normalize(12),
  },
  outerContainer: {
    gap: normalize(6),
  },
  headerTitle: {
    fontSize: normalize(13.5),
  },
  headerSubtitle: {
    fontSize: normalize(11.5),
    marginBottom: normalize(8),
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.blue[50],
    borderRadius: normalize(16),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  avatarWrapper: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(22),
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(22),
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(22),
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    gap: normalize(2),
  },
  contactName: {
    fontSize: normalize(13),
  },
  contactRole: {
    fontSize: normalize(11),
  },
  unblockBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.tintsGrey[50],
    borderRadius: normalize(14),
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(6),
  },
  unblockText: {
    fontSize: normalize(12),
    color: colors.typographyColor['Dark 2']
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(14),
    paddingVertical: normalize(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyText: {
    fontSize: normalize(12),
  },
});
