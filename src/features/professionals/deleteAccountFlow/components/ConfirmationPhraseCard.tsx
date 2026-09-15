import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface ConfirmationPhraseCardProps {
  requiredPhrase?: string;
  phraseInput: string;
  onChangePhraseInput: (text: string) => void;
  onContinue: () => void;
  onCancel: () => void;
}

export const ConfirmationPhraseCard: React.FC<ConfirmationPhraseCardProps> = ({
  requiredPhrase = 'DELETE MY PROFESSIONAL ACCOUNT',
  phraseInput,
  onChangePhraseInput,
  onContinue,
  onCancel,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Check if phrase matches (case-insensitive or exact)
  const isPhraseValid = phraseInput.trim() === requiredPhrase;

  const handleAutofill = () => {
    onChangePhraseInput(requiredPhrase);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Description */}
      <AppText family="secondary" weight="light" style={styles.cardInstruction}>
        To continue, type the following phrase exactly as shown:
      </AppText>

      {/* Target Phrase Box */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleAutofill}
        style={styles.phraseBox}
      >
        <AppText family="secondary" weight="bold" style={styles.phraseText}>
          {requiredPhrase}
        </AppText>
      </TouchableOpacity>

      {/* Input Field */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <TextInput
          value={phraseInput}
          onChangeText={onChangePhraseInput}
          placeholder="Type here..."
          placeholderTextColor="#94A3B8"
          style={styles.textInput}
          autoCapitalize="characters"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          isPhraseValid ? styles.continueButtonActive : styles.continueButtonDisabled,
        ]}
        onPress={onContinue}
        activeOpacity={0.8}
      >
        <AppText
          family="secondary"
          weight="bold"
          style={[
            styles.continueButtonText,
            isPhraseValid ? styles.continueButtonTextActive : styles.continueButtonTextDisabled,
          ]}
        >
          CONTINUE
        </AppText>
      </TouchableOpacity>

      {/* Cancel Deletion Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel}
        activeOpacity={0.7}
      >
        <AppText family="secondary" weight="semiBold" style={styles.cancelButtonText}>
          Cancel Deletion
        </AppText>
      </TouchableOpacity>

      {/* Helper Footer Note */}
      <AppText family="secondary" weight="light" style={styles.helperNote}>
        The button will be enabled when the phrase is typed correctly.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: colors.lightAppTheme[100],
    padding: normalize(20),
    marginVertical: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  cardInstruction: {
    fontSize: normalize(12),
    color: '#475569',
    lineHeight: normalize(20),
    marginBottom: normalize(16),
  },
  phraseBox: {
    backgroundColor: colors.lightTints.redLightTint2[50],
    borderWidth: 1,
    borderColor: colors.lightTints.redLightTint2[200],
    borderRadius: normalize(8),
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  phraseText: {
    fontSize: normalize(11),
    color: '#EF4444',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    marginTop: normalize(16),
    paddingHorizontal: normalize(14),
  },
  inputContainerFocused: {
    borderColor: '#3B82F6',
  },
  textInput: {
    fontSize: normalize(13),
    color: '#0F172A',
    paddingVertical: normalize(12),
  },
  continueButton: {
    borderRadius: normalize(10),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(16),
    borderWidth: normalize(1),
    borderColor: '#CBD5E1',
  },
  continueButtonDisabled: {
    backgroundColor: colors.appThemeColor[50],
  },
  continueButtonActive: {
    backgroundColor: '#DC2626',
  },
  continueButtonText: {
    fontSize: normalize(14),
    letterSpacing: 0.8,
  },
  continueButtonTextDisabled: {
    color: colors.typographyColor.Medium,
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  cancelButton: {
    borderRadius: normalize(10),
    borderWidth: 1.5,
    borderColor: colors.blue[100],
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(12),
  },
  cancelButtonText: {
    fontSize: normalize(14),
    color: colors.typographyColor['Dark 2'],
  },
  helperNote: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
    lineHeight: normalize(18),
    marginTop: normalize(16),
  },
});
