import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NutqTextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const NutqTextArea: React.FC<NutqTextAreaProps> = ({
  value,
  onChangeText,
  placeholder = 'Please share...',
  maxLength = 300,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.typographyColor.Light}
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
      />
      <AppText variant="caption" style={styles.charCount}>
        {value.length}/{maxLength}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(195,198,214,0.6)',
    borderRadius: normalize(10),
    padding: normalize(12),
    backgroundColor: '#FFFFFF',
    height: normalize(120),
  },
  input: {
    flex: 1,
    fontSize: normalize(13),
    fontFamily: 'Outfit-Regular',
    color: colors.typographyColor.Black,
    padding: 0,
  },
  charCount: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(10),
    textAlign: 'right',
    marginTop: normalize(4),
  },
});
