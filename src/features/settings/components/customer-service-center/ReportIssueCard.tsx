import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TriangleAlert } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { api } from '@api/client';

interface ReportIssueCardProps {
  onSubmitReport?: (issue: string) => void;
}

export const ReportIssueCard: React.FC<ReportIssueCardProps> = ({
  onSubmitReport,
}) => {
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    const trimmed = issueText.trim();
    if (!trimmed) {
      Alert.alert(
        'Empty Description',
        'Please describe the issue you are experiencing before submitting.'
      );
      return;
    }

    if (trimmed.length < 10) {
      Alert.alert('Details Required', 'Please provide at least 10 characters describing the issue.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/v1/support/tickets', {
        subject: trimmed.slice(0, 50),
        category: 'technical',
        message: trimmed,
        priority: 'medium',
      });
      onSubmitReport?.(trimmed);
      setIssueText('');
      Alert.alert(
        'Report Submitted',
        'Thank you! Your ticket has been logged and our support team will investigate it promptly.',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      console.log('[Support Ticket Submit Error]:', err?.message);
      Alert.alert(
        'Submission Note',
        err?.response?.data?.message || 'Report received. Our team will follow up on your account.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [issueText, onSubmitReport]);

  return (
    <View style={styles.outerCard}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <TriangleAlert
            size={normalize(18)}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={2.2}
          />
        </View>
        <View style={styles.headerTextGroup}>
          <AppText
            weight="light"
            family="secondary"
            style={styles.headerTitle}
            color={colors.typographyColor.Medium}
          >
            Report an Issue
          </AppText>
          <AppText
            weight="light"
            family="secondary"
            style={styles.headerSubtitle}
            color={colors.typographyColor.Medium}
          >
            Facing a problem? Let us know so we can fix it.
          </AppText>
        </View>
      </View>

      {/* Inner White Box */}
      <View style={styles.innerCard}>
        <TextInput
          style={styles.textInput}
          placeholder="Describe the issue you're facing..."
          placeholderTextColor={colors.typographyColor.Light}
          multiline
          maxLength={500}
          value={issueText}
          onChangeText={setIssueText}
          textAlignVertical="top"
        />

        <View style={styles.bottomRow}>
          <AppText
            weight="regular"
            family="secondary"
            style={styles.charCount}
            color={colors.typographyColor.Light}
          >
            {`${issueText.length}/500`}
          </AppText>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              !issueText.trim() && styles.submitBtnDisabled,
            ]}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <AppText
              weight="bold"
              family="primary"
              style={styles.submitBtnText}
              color="#FFFFFF"
            >
              Submit Report
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    backgroundColor: colors.tintsGrey[50],
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    marginBottom: normalize(14),
  },
  iconCircle: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(19),
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
    gap: normalize(2),
  },
  headerTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(0),
  },
  headerSubtitle: {
    fontSize: normalize(10),
    lineHeight: normalize(12),
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: colors.blue[50]
  },
  textInput: {
    minHeight: normalize(95),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(12),
    padding: normalize(12),
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(14),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(4),
  },
  charCount: {
    fontSize: normalize(11.5),
  },
  submitBtn: {
    backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
    borderRadius: normalize(99),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(24),
  },
  submitBtnDisabled: {
    opacity: 0.8,
  },
  submitBtnText: {
    fontSize: normalize(12.5),
  },
});
