import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

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
  placeholder = "98765 43210",
  style,
}) => {
  const { colors, typography, borderRadius } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error?.trim();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <View style={{ display:'flex', flexDirection: 'column' }}>
            <Text style={[styles.label, { color: '#3D4949', fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium, display:'flex', flexDirection: 'column' }]}>{label} <Text style={[{ color: colors.colorPalet['Color 6'] }]}>*</Text>
            </Text>
            {error && (
              <View style={{marginTop:-4}}>
                <Text style={[styles.errorLabel, { color: colors.error, fontSize: typography.caption.fontSize - 1, fontFamily: typography.fontFamily.secondary.semiBold }]}>
                  {error || ' '}
                </Text>
              </View>
            )}
          </View>
          
          
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.blue[50],
            borderColor: hasError ? colors.error : isFocused ? colors.appThemeColor[500] : colors.appThemeColor[300],
            borderRadius: 25,
            // Subtle glow when focused or error (iOS only to prevent Android focus glitches)
            ...(Platform.OS === 'ios' && isFocused && {
              shadowColor: colors.lightAppTheme[700],
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }),
            ...(Platform.OS === 'ios' && hasError && {
              shadowColor: colors.error,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
            })
          },
        ]}
      >
        <View style={styles.countryCodeContainer}>
          <Text style={[{ color: colors.appThemeColor[600], fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.secondary.semiBold }]}>
            +91
          </Text>
          <Text style={[styles.dropdownArrow, { color: colors.tintsGrey[400]}]}> ▾</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.lightAppTheme[100] }]} />
        <TextInput
          style={[styles.input, { color: colors.appThemeColor[600], fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.primary.medium }]}
          value={value}
          onChangeText={(text) => {
            const cleanText = text.replace(/[^0-9]/g, '');
            onChangeText(cleanText);
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.tintsGrey[500]}
          keyboardType="phone-pad"
          maxLength={10}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: normalize(8),
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: normalize(2),
  },
  label: {
    marginBottom: normalize(6),
    marginLeft: normalize(0),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  errorLabel: {
    marginBottom: normalize(6),
    marginRight: normalize(4),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(56),
    paddingHorizontal: normalize(16),
    borderWidth: 1.5,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownArrow: {
    fontWeight: '700',
  },
  divider: {
    width: 1.5,
    height: normalize(24),
    marginHorizontal: normalize(12),
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontWeight: '500',
  },
});
