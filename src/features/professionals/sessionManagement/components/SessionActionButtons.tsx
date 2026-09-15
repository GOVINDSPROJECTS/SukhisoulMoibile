import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface SessionActionButtonsProps {
  onContinue: () => void;
}

export const SessionActionButtons: React.FC<SessionActionButtonsProps> = ({ onContinue }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.continueBtn, { backgroundColor: colors.purple[800] }]} 
        activeOpacity={0.8}
        onPress={onContinue}
      >
        <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF', marginRight: normalize(8) }}>
          Continue
        </AppText>
        <ArrowRight size={normalize(16)} color="#FFFFFF" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.cancelBtn, { borderColor: colors.typographyColor.Light }]} 
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark }}>
          Cancel
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(32),
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(52),
    borderRadius: normalize(16),
    marginBottom: normalize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(52),
    borderRadius: normalize(16),
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  }
});
