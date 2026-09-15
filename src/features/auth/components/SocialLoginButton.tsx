import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { spacing, typography } from '../../../theme';

interface SocialLoginButtonProps {
  onPress: () => void;
  type: 'google' | 'apple';
  loading?: boolean;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  onPress,
  type,
  loading = false,
}) => {
  const isGoogle = type === 'google';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={styles.container}
      activeOpacity={0.7}>
      <View style={styles.content}>
        {isGoogle ? (
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
            style={styles.icon}
          />
        ) : null}
        <Text style={styles.text}>
          Continue with {isGoogle ? 'Google' : 'Apple'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: spacing.xs,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: spacing.sm,
  },
  text: {
    ...typography.body1,
    color: '#333',
    fontWeight: '500',
  },
});
