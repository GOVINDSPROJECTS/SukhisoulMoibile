import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface QbsTextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const QbsTextArea: React.FC<QbsTextAreaProps> = ({
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
        placeholderTextColor={colors.tintsGrey[400]}
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
    borderColor: "#C3C6D6",
    borderRadius: normalize(10),
    padding: normalize(15),
    backgroundColor: '#F7F9FF',
    height: normalize(110),
    marginBottom: normalize(20),
  },
  input: {
    flex: 1,
    fontSize: normalize(13),
    color: colors.typographyColor.Black,
    padding: 0,
  },
  charCount: {
    color: colors.typographyColor.Light,
    fontSize: normalize(10),
    textAlign: 'right',
    marginTop: normalize(4),
  },
});
