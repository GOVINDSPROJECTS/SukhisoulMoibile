import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Check } from 'lucide-react-native';

interface FeedbackSuccessCardProps {
  onEdit: () => void;
}

export const FeedbackSuccessCard: React.FC<FeedbackSuccessCardProps> = ({ onEdit }) => {
  return (
    <View style={styles.containerRoot}>
      <View style={styles.container}>


        <View style={styles.iconCircle}>
          <Check size={normalize(30)} color="#FFFFFF" strokeWidth={3} />
        </View>
        <AppText style={styles.title} weight="bold">
          Feedback submitted!
        </AppText>
        <AppText style={styles.subtitle} weight='regular'>
          Thank you for helping us improve.
        </AppText>

        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.8}
        >
          <AppText style={styles.editButtonText} weight="semiBold">
            Edit Feedback
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    backgroundColor: '#ffffff',
    borderRadius: normalize(48),
    paddingHorizontal: normalize(32),
    paddingVertical: normalize(32),
    alignItems: 'center',
    marginHorizontal: normalize(20),
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  container: {
    backgroundColor: '#F0FDF4',
    borderRadius: normalize(24),
    padding: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: normalize(1),
    borderColor: "#F0FDF4"
  },
  iconCircle: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: "#22C55E",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  title: {
    fontSize: normalize(20),
    color: "#166534",
    marginBottom: normalize(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: normalize(12),
    color: "#22C55E",
    marginBottom: normalize(24),
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(40),
    borderRadius: normalize(12),
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    color: "#2563EB",
    fontSize: normalize(14),
  },
});
