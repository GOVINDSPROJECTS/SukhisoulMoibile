import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Hourglass, Info } from 'lucide-react-native';

export const StatusTopCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: colors.lightTints.yellowLightTint[100] || '#FFF3E0' }]}>
        <Hourglass size={normalize(24)} color={colors.yellow[700]} />
      </View>
      
      {/* Titles */}
      <AppText family="primary" weight="bold" style={{ fontSize: normalize(20), color: colors.typographyColor.Dark, marginBottom: normalize(8) }}>
        Payment Pending
      </AppText>
      
      <AppText family="primary" weight="medium" center style={{ fontSize: normalize(12), color: colors.typographyColor.Medium, paddingHorizontal: normalize(20), marginBottom: normalize(24), lineHeight: normalize(18) }}>
        The session has been created successfully. Waiting for the client to complete the payment to confirm the session.
      </AppText>

      {/* Warning Banner */}
      <View style={[styles.warningBanner, { backgroundColor: colors.lightTints.yellowLightTint[50] || '#FBF7E9' }]}>
        <Info size={normalize(16)} color={colors.yellow[700]} style={{ marginTop: normalize(2) }} />
        <View style={styles.warningTextContainer}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(11), color: colors.yellow[700], marginBottom: normalize(2) }}>
            Action Required: Payment from Client
          </AppText>
          <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.yellow[800], lineHeight: normalize(14) }}>
            The client will be able to join the session once the payment is completed. An automated reminder has been sent.
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    marginHorizontal: normalize(20),
    marginTop: normalize(24),
    marginBottom: normalize(16),
    padding: normalize(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  iconCircle: {
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: normalize(16),
    borderRadius: normalize(12),
    width: '100%',
  },
  warningTextContainer: {
    marginLeft: normalize(12),
    flex: 1,
  }
});
