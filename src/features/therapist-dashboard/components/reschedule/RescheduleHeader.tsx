import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface RescheduleHeaderProps {
  title: string;
  onBack: () => void;
}

export const RescheduleHeader: React.FC<RescheduleHeaderProps> = ({ title, onBack }) => (
  <LinearGradient
    colors={[
      colors.lightTints.blueLightTint[50],
      colors.lightTints.blueLightTint[100],
    ]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.header}
  >
    <Pressable
      onPress={onBack}
      style={({ pressed }) => [
        styles.backBtn,
        pressed && { borderRadius: normalize(99), backgroundColor: colors.lightTints.blueLightTint[50] },
      ]}
    >
      <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
    </Pressable>
    <AppText variant="h4" weight="bold" style={styles.title}>
      {title}
    </AppText>
    <View style={styles.spacer} />
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(15),
    color: colors.typographyColor['Color 2'],
  },
  spacer: {
    width: normalize(36),
  },
});
