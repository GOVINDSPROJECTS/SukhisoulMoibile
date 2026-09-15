import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { colors, spacing } from '../../../theme';

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  length?: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({ code, setCode, length = 6 }) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    // Only allow numbers
    const cleanText = text.replace(/[^0-9]/g, '');
    setCode(cleanText);
    
    if (cleanText.length === length) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxesContainer} onStartShouldSetResponder={() => true} onResponderRelease={handlePress}>
        {Array(length).fill(0).map((_, i) => (
          <View
            key={i}
            style={[
              styles.box,
              code.length === i && styles.boxActive,
              code.length > i && styles.boxFilled,
            ]}>
            <View style={styles.text}>
              {code[i] ? <View style={styles.dot} /> : null}
              {code.length === i ? <View style={styles.cursor} /> : null}
            </View>
          </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxActive: {
    borderColor: colors.primary[500],
    backgroundColor: '#FFF',
  },
  boxFilled: {
    borderColor: colors.primary[200],
  },
  text: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary[800],
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: colors.primary[500],
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
