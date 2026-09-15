import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { X, Timer } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

export type PaymentStatus = 'success' | 'failed' | 'approval_pending';

interface PaymentStatusHeaderProps {
  status: PaymentStatus;
}

const CONFIG: Record<
  PaymentStatus,
  { title: string; subtitle: string; titleColor: string }
> = {
  success: {
    title: 'Booking Confirmed!',
    subtitle:
      'Your therapy session has been successfully booked and payment completed.',
    titleColor: '#1E293B',
  },
  failed: {
    title: 'Payment Failed!',
    subtitle:
      "Don't worry, your session is still held for the next 10 minutes. Please check your payment method and try again.",
    titleColor: colors.colorPalet['Color 6'],
  },
  approval_pending: {
    title: 'Approval Pending!',
    subtitle:
      'Your payment was successful. We have notified the therapist and are awaiting approval.',
    titleColor: '#1E293B',
  },
};

export const PaymentStatusHeader: React.FC<PaymentStatusHeaderProps> = ({
  status,
}) => {
  const { borderRadius } = useTheme();
  const { title, subtitle, titleColor } = CONFIG[status];

  const renderIcon = () => {
    if (status === 'failed') {
      return (
        <View
          style={[styles.iconCircle, styles.failedBg, { borderRadius: borderRadius.full }]}
        >
          {/* <X size={normalize(38)} color="#FFFFFF" strokeWidth={3} /> */}
          <AppText variant='h2' weight='bold' style={{ color: 'white', fontSize: normalize(40) }}>X</AppText>
        </View>
      );
    }
    if (status === 'approval_pending') {
      return (
        <View
          style={[styles.iconCircle, styles.pendingBg, { borderRadius: borderRadius.full }]}
        >
          <Image source={require('../../assets/bookingSummary/pending.png')} style={{ width: normalize(110), height: normalize(110) }} />
        </View>
      );
    }
    // success — abstract light-blue oval
    return (
      <LinearGradient
        colors={['#E6F4FF', '#B3DDFF', '#8ACAFF']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.successBlob, { borderRadius: normalize(60) }]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
      <AppText
        variant="h2"
        weight="extraBold"
        style={[styles.title, { color: titleColor }]}
      >
        {title}
      </AppText>
      <AppText variant="caption" weight="regular" style={[styles.subtitle, { color: status === 'failed' ? colors.typographyColor['Color 2'] : colors.typographyColor.Medium }]}>
        {subtitle}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: normalize(80),
    paddingBottom: normalize(8),
    paddingHorizontal: normalize(5),
  },
  iconCircle: {
    width: normalize(90),
    height: normalize(90),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
  },
  failedBg: {
    backgroundColor: colors.colorPalet['Color 6'],
  },
  pendingBg: {
    // backgroundColor: '#FEF3C7',
    // borderWidth: 2,
    // borderColor: '#F6C90E',
  },
  successBlob: {
    width: normalize(100),
    height: normalize(130),
    marginBottom: normalize(20),
  },
  title: {
    fontSize: normalize(24),
    textAlign: 'center',
    marginBottom: normalize(10),
    marginTop: normalize(20)
  },
  subtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor['Color 2'],
    textAlign: 'center',
    lineHeight: normalize(20),
    paddingHorizontal: normalize(8),
  },
});
