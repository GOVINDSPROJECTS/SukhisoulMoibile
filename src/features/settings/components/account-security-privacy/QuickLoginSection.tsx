import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { CustomToggleSwitch } from './CustomToggleSwitch';

interface QuickLoginSectionProps {
  phone?: string;
  email?: string;
  onPhonePress?: () => void;
  onEmailPress?: () => void;
}

export const QuickLoginSection: React.FC<QuickLoginSectionProps> = ({
  phone = '+91 98765 43210',
  email = 'user@example.com',
  onPhonePress,
  onEmailPress,
}) => {
  const [quickLoginEnabled, setQuickLoginEnabled] = useState(true);
  const [twoStepEnabled, setTwoStepEnabled] = useState(true);

  return (
    <View style={styles.sectionContainer}>
      <AppText
        weight="extraBold"
        family="primary"
        style={styles.sectionTitle}
        color={colors.typographyColor['Dark 2'] || '#003CA3'}
      >
        QUICK LOGIN AND VERIFICATION
      </AppText>

      <View style={styles.card}>
        {/* Item 1: Quick Login */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Quick Login
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              Use biometric or face ID
            </AppText>
          </View>
          <CustomToggleSwitch
            value={quickLoginEnabled}
            onValueChange={(val) => {
              setQuickLoginEnabled(val);
              console.log(`[Account Security] Quick Login toggled: ${val ? 'ON' : 'OFF'}`);
            }}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 2: Two-Step Verification */}
        <View style={styles.row}>
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Two-Step Verification
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              Add an extra layer of security
            </AppText>
          </View>
          <CustomToggleSwitch
            value={twoStepEnabled}
            onValueChange={(val) => {
              setTwoStepEnabled(val);
              console.log(`[Account Security] Two-Step Verification toggled: ${val ? 'ON' : 'OFF'}`);
            }}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 3: Verified Phone Number */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => {
            console.log('[Account Security] Verified Phone Number row pressed');
            onPhonePress?.();
          }}
        >
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Verified Phone Number
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              {phone}
            </AppText>
          </View>

          <View style={styles.verifiedRight}>
            <View style={styles.verifiedPill}>
              <AppText weight="medium" family="secondary" style={styles.verifiedText} color={colors.green[500] || '#10B981'}>
                Verified
              </AppText>
            </View>
            <ChevronRight size={normalize(16)} color={'#64748B'} />
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Item 4: Verified Email */}
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => {
            console.log('[Account Security] Verified Email row pressed');
            onEmailPress?.();
          }}
        >
          <View style={styles.textCol}>
            <AppText weight="bold" family="primary" style={styles.itemTitle} color={colors.typographyColor.Medium || '#1E293B'}>
              Verified Email
            </AppText>
            <AppText weight="regular" family="secondary" style={styles.itemSubtitle} color={'#64748B'}>
              {email}
            </AppText>
          </View>

          <View style={styles.verifiedRight}>
            <View style={styles.verifiedPill}>
              <AppText weight="medium" family="secondary" style={styles.verifiedText} color={colors.green[500] || '#10B981'}>
                Verified
              </AppText>
            </View>
            <ChevronRight size={normalize(16)} color={'#64748B'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: normalize(18),
    marginBottom: normalize(24),
  },
  sectionTitle: {
    fontSize: normalize(15),
    letterSpacing: 0.5,
    marginBottom: normalize(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(18),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(4),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: '#F1F5F9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(14),
  },
  textCol: {
    flex: 1,
    gap: normalize(3),
  },
  itemTitle: {
    fontSize: normalize(13.5),
  },
  itemSubtitle: {
    fontSize: normalize(11.5),
  },
  verifiedRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },
  verifiedPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#D1FADF',
  },
  verifiedText: {
    fontSize: normalize(10.5),
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
