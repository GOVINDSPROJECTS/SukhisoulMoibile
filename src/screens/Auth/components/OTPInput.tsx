import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  length?: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({ code, setCode, length = 6 }) => {
  const { colors, typography, borderRadius } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // One Animated.Value per box for the pop-scale effect when a digit arrives
  const scaleAnims = useRef(
    Array.from({ length: 6 }, () => new Animated.Value(1)),
  ).current;

  // Blink cursor effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isFocused) {
      interval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);
    } else {
      setCursorVisible(true);
    }
    return () => clearInterval(interval);
  }, [isFocused]);

  // Pop animation whenever the code length changes (new digit entered)
  useEffect(() => {
    const newIndex = code.length - 1;
    if (newIndex >= 0 && newIndex < length) {
      Animated.sequence([
        Animated.timing(scaleAnims[newIndex], {
          toValue: 1.15,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[newIndex], {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [code.length]);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setCode(cleanText);
    if (cleanText.length === length) {
      Keyboard.dismiss();
    }
  };

  // For 6 boxes: use a fixed width that fits well on all phones
  const BOX_SIZE = length === 6 ? normalize(46) : normalize(56);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.boxesContainer}
        onPress={handlePress}
        activeOpacity={1}
      >
        {Array(length)
          .fill(0)
          .map((_, i) => {
            const char = code[i];
            const isBoxFocused = isFocused && code.length === i;
            const isBoxFilled = code.length > i;

            return (
              <Animated.View
                key={i}
                style={[
                  styles.box,
                  {
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                    borderColor: isBoxFocused
                      ? colors.lightAppTheme[700]
                      : isBoxFilled
                      ? colors.appThemeColor[300]
                      : colors.appThemeColor[200],
                    backgroundColor: isBoxFocused ? '#FFFFFF' : isBoxFilled ? colors.blue[50] : colors.blue[50],
                    borderRadius: borderRadius.m,
                    // Active box gets a stronger border
                    borderWidth: isBoxFocused ? 2 : 1.5,
                    transform: [{ scale: scaleAnims[i] }],
                    // Subtle shadow on focused box
                    ...(isBoxFocused && {
                      shadowColor: colors.lightAppTheme[700],
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.18,
                      shadowRadius: 6,
                      elevation: 3,
                    }),
                  },
                ]}
              >
                {char ? (
                  <Text
                    style={[
                      styles.boxText,
                      {
                        color: '#3D4949',
                        fontSize: typography.fontSize.xl,
                        fontFamily: typography.fontFamily.secondary.medium,
                      },
                    ]}
                  >
                    {char}
                  </Text>
                ) : isBoxFocused && cursorVisible ? (
                  <View
                    style={[
                      styles.cursor,
                      { backgroundColor: colors.lightAppTheme[700] },
                    ]}
                  />
                ) : (
                  <Text
                    style={[
                      styles.placeholderDot,
                      {
                        color: colors.appThemeColor[500],
                        fontSize: normalize(25),
                      },
                    ]}
                  >
                    •
                  </Text>
                )}
              </Animated.View>
            );
          })}
      </TouchableOpacity>

      {/* Hidden real TextInput — captures keyboard input */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: normalize(10),
    marginBottom: normalize(20),
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: normalize(2),
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontWeight: '700',
  },
  placeholderDot: {
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: normalize(24),
  },
  cursor: {
    width: 2,
    height: normalize(22),
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
