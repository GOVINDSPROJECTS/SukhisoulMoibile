import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface GiftReceiverFormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const GiftReceiverFormField: React.FC<GiftReceiverFormFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => {
  return (
    <View style={styles.container}>
      <AppText family="secondary" weight="medium" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.inputRow}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <TextInput
          style={[styles.textInput, icon && styles.textInputWithIcon]}
          placeholder={placeholder}
          placeholderTextColor={'#9CA3AF'}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(18),
    paddingBottom: normalize(10)
  },
  label: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    letterSpacing: 0.8,
    marginBottom: normalize(6),
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(16),
    padding: normalize(10),
    borderWidth: normalize(1),
    borderColor: colors.tintsGrey[100],

  },
  iconWrapper: {
    marginRight: normalize(10),
  },
  textInput: {
    flex: 1,
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    fontWeight: '400',
    padding: 0,
    margin: 0,
  },
  textInputWithIcon: {
    // extra left padding covered by iconWrapper margin
  },
});
