import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import LinearGradient from 'react-native-linear-gradient';

interface GiftHeaderProps {
  title?: string;
  onBack: () => void;
}

export const GiftHeader: React.FC<GiftHeaderProps> = ({
  title = 'Gift Therapy',
  onBack,
}) => {
  return (
    <LinearGradient
      colors={['#FAF3EB', colors.lightTints.skinLightTint[100]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={normalize(22)} color={colors.yellow[900]} strokeWidth={2.2} />
        </TouchableOpacity>

        <AppText variant="body" family="secondary" weight="semiBold" style={styles.title}>
          {title}
        </AppText>

        <View style={styles.placeholder} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: normalize(10),
    paddingBottom: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 213, 184, 0.25)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  backBtn: {
    padding: normalize(4),
  },
  title: {
    color: colors.yellow[900],
    fontSize: normalize(16),
  },
  placeholder: {
    width: normalize(30),
  },
});
