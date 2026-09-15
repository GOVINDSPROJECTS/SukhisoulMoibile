import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { SelectedClientHeader } from '../components/SelectedClientHeader';
import { SessionFormInputs } from '../components/SessionFormInputs';
import { SupportingDocuments, DocumentItem } from '../components/SupportingDocuments';
import { PreviousSessionSummary } from '../components/PreviousSessionSummary';
import { SessionActionButtons } from '../components/SessionActionButtons';

export const SessionConfiguration: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Default to today's date formatted MM/DD/YYYY
  const getTodayFormatted = () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${today.getFullYear()}`;
  };

  const [formData, setFormData] = useState({
    sessionDate: getTodayFormatted(),
    startTime: '10:00 AM',
    duration: '50 Minutes (Standard)',
    recurrence: 'One-time Session',
    reason: '',
    notes: '',
    focusAreas: ['Anxiety', 'CBT', 'Stress'],
  });

  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFormDataChange = (updatedData: typeof formData) => {
    setFormData(updatedData);

    // Clear specific field errors dynamically
    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      if (updatedData.sessionDate && nextErrors.sessionDate) delete nextErrors.sessionDate;
      if (updatedData.startTime && nextErrors.startTime) delete nextErrors.startTime;
      if (updatedData.reason && nextErrors.reason) delete nextErrors.reason;
      return nextErrors;
    });
  };

  const handleContinue = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.sessionDate || !formData.sessionDate.trim()) {
      newErrors.sessionDate = 'Date required';
    }
    if (!formData.startTime || !formData.startTime.trim()) {
      newErrors.startTime = 'Time required';
    }
    if (!formData.reason || !formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Auto-scroll to top so user sees the validation errors
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    navigation.navigate('SessionCreatedStatus', {
      sessionData: {
        ...formData,
        documents,
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Dashboard
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
      >
        <LinearGradient
          colors={[
            colors.tintsBlue[400],
            colors.appThemeColor[75],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.1 }}
          style={styles.gradientBg}
        >
          <View style={styles.titleSection}>
            <View style={styles.breadcrumbRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.typographyColor.Light }}>
                New Session
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.typographyColor.Light, marginHorizontal: normalize(4) }}>
                ›
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.purple[700] }}>
                Create New
              </AppText>
            </View>

            <AppText family="primary" weight="extraBold" style={{ fontSize: normalize(24), color: colors.typographyColor.Black, marginTop: normalize(4), letterSpacing: -0.5 }}>
              Session Configuration
            </AppText>
          </View>

          <SelectedClientHeader
            name="Prathmesh Deokar"
            since="2023"
            primaryGoal="Stress"
            lastSession="Oct 12, 2023"
            recommendedSlot="Oct 24, 12:00 AM"
            imageUrl="https://i.pravatar.cc/150?u=prathmesh"
          />

          <View style={styles.formCard}>
            <SessionFormInputs
              formData={formData}
              setFormData={handleFormDataChange}
              errors={errors}
            />
            <SupportingDocuments
              documents={documents}
              setDocuments={setDocuments}
            />
          </View>

          <PreviousSessionSummary />
          <SessionActionButtons onContinue={handleContinue} />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  titleSection: {
    paddingHorizontal: normalize(20),
    marginTop: normalize(16),
    marginBottom: normalize(5),
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    marginHorizontal: normalize(20),
    marginTop: normalize(16),
    marginBottom: normalize(16),
    borderWidth: normalize(1),
    borderColor: colors.lightTints.purpleLightTint[50],
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  scrollContent: {},
  gradientBg: {
    paddingBottom: normalize(40),
  },
});
