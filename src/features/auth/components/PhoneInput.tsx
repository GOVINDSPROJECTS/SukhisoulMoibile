import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  label,
  error,
  placeholder = "Enter your phone number",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <Text style={styles.countryCode}>+91</Text>
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.gray[600],
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  inputError: {
    borderColor: colors.error[500],
  },
  countryCode: {
    ...typography.body1,
    color: colors.gray[800],
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.gray[300],
    marginHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body1,
    color: colors.gray[900],
  },
  errorText: {
    ...typography.caption,
    color: colors.error[500],
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
