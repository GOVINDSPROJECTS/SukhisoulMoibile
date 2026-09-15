import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { useTheme } from '@theme/index';
import { Eye, EyeOff } from 'lucide-react-native';
import { normalize } from '@utils/responsive';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
  onRightLabelPress?: () => void;
  rightLabelText?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  label,
  error,
  placeholder = "••••••••",
  style,
  onRightLabelPress,
  rightLabelText,
}) => {
  const { colors, typography, borderRadius } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error?.trim();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <View style={{ display:'flex', flexDirection: 'column' }}>
            <Text style={[styles.label, { color: '#3D4949', fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium, display:'flex', flexDirection: 'column' }]}>{label} <Text style={[{ color: colors.colorPalet['Color 6'] }]}>*</Text>
            </Text>
            {error && (
              <View style={{marginTop:-10,marginBottom:5}}>
                <Text style={[styles.errorText, { color: colors.error, fontSize: typography.caption.fontSize - 1, fontFamily: typography.fontFamily.secondary.semiBold }]}>
                  {error || ' '}
                </Text>
              </View>
            )}
          </View>



          {rightLabelText && onRightLabelPress && (
            <TouchableOpacity onPress={onRightLabelPress} activeOpacity={0.7} style={styles.rightLabelBtn}>
              <Text style={{ color: colors.typographyColor.Medium, fontSize: typography.caption.fontSize, fontFamily: typography.fontFamily.primary.medium }}>
                {rightLabelText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={{ display:'flex', flexDirection: 'column' }}>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.blue[50],
              borderColor: hasError
                ? colors.error
                : isFocused
                  ? colors.appThemeColor[500] : colors.appThemeColor[300],
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
          <TextInput
            style={[styles.input, { color: colors.appThemeColor[600], fontSize: typography.body1.fontSize, fontFamily: typography.fontFamily.primary.medium }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.appThemeColor[400]}
            secureTextEntry={!isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
            style={styles.iconContainer}
          >
            {isPasswordVisible ? (
              <EyeOff size={normalize(20)} color={colors.tintsGrey[500]} />
            ) : (
              <Eye size={normalize(20)} color={colors.tintsGrey[500]} />
            )}
          </TouchableOpacity>
        </View>
        
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
    marginLeft: normalize(4),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rightLabelBtn: {
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
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontWeight: '500',
  },
  iconContainer: {
    padding: normalize(4),
  },
  errorText: {
    marginTop: normalize(6),
    marginLeft: normalize(4),
  },
});
