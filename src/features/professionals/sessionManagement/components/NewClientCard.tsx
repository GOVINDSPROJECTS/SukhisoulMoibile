import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { UserPlus, ArrowRight, Plus, PlusCircle } from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';

export const NewClientCard: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container]}>
      <View style={[styles.iconContainer]}>
        <PlusCircle size={normalize(24)} color={colors.purple[900]} />
      </View>

      <AppText family="secondary" weight="bold" style={{ fontSize: normalize(16), color: colors.typographyColor.Black, marginTop: normalize(12) }}>
        New Client?
      </AppText>

      <AppText family="secondary" weight="regular" center style={{ fontSize: normalize(10), color: colors.tintsGrey[500], marginTop: normalize(4), marginHorizontal: normalize(24) }}>
        Register a new patient to start their clinical journey.
      </AppText>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('NewClientFormScreen')}
      >
        <AppText family="secondary" weight="medium" style={{ fontSize: normalize(12), color: colors.purple[700], marginRight: normalize(4) }}>
          Add Profile
        </AppText>
        <ArrowRight size={normalize(14)} color={colors.purple[700]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: normalize(20),
    borderColor: colors.blue[200],
    padding: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    marginVertical: normalize(12),
  },
  iconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple[50]
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(16),
  }
});
