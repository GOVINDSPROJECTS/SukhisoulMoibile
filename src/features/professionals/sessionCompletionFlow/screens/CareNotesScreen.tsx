import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Pencil, Download } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const CareNotesScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [selectedFocus, setSelectedFocus] = useState('Anxiety management & coping skills');
  const [workOnText, setWorkOnText] = useState(
    'Practice breathing exercises daily\nTrack anxiety triggers\nComplete thought journal\nFollow grounding techniques'
  );
  const [takeCareText, setTakeCareText] = useState(
    'Maintain sleep schedule\nAvoid skipping meals\nTake prescribed medication\nReach out when feeling overwhelmed\nPractice self-care activities'
  );
  const [nextFocusArea, setNextFocusArea] = useState('Building consistency in daily practice');

  const handleSaveNotes = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Header Gradient Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>

          <AppText family="secondary" weight="medium" style={styles.headerTitle}>
            Care Note
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content Container */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
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
          {/* Main Care Notes Card */}
          <View style={styles.mainCard}>
            {/* Section 1: SELECTED FOCUS */}
            <View style={styles.sectionBlock}>
              <AppText family="secondary" weight="medium" style={styles.sectionLabel}>
                SELECTED FOCUS
              </AppText>
              <View style={styles.singleLineInputBox}>
                <TextInput
                  style={styles.singleLineTextInput}
                  value={selectedFocus}
                  onChangeText={setSelectedFocus}
                  placeholder="Enter selected focus..."
                  placeholderTextColor="#94A3B8"
                />
                <Pencil size={normalize(16)} color="#2563EB" style={styles.pencilIcon} />
              </View>
            </View>

            {/* Section 2: WHAT YOU HAVE TO WORK ON */}
            <View style={styles.sectionBlock}>
              <AppText family="secondary" weight="medium" style={styles.sectionLabel}>
                WHAT YOU HAVE TO WORK ON
              </AppText>
              <View style={styles.multilineInputBox}>
                <TextInput
                  style={styles.multilineTextInput}
                  value={workOnText}
                  onChangeText={setWorkOnText}
                  multiline={true}
                  textAlignVertical="top"
                  placeholder="Enter work on items..."
                  placeholderTextColor="#94A3B8"
                />
                <View style={styles.multilinePencilRow}>
                  <Pencil size={normalize(16)} color="#2563EB" />
                </View>
              </View>
            </View>

            {/* Section 3: WHAT ARE IMPORTANT THINGS U SHOULD TAKE CARE OF */}
            <View style={styles.sectionBlock}>
              <AppText family="secondary" weight="medium" style={styles.sectionLabel}>
                WHAT ARE IMPORTANT THINGS U SHOULD TAKE CARE OF
              </AppText>
              <View style={styles.multilineInputBox}>
                <TextInput
                  style={styles.multilineTextInput}
                  value={takeCareText}
                  onChangeText={setTakeCareText}
                  multiline={true}
                  textAlignVertical="top"
                  placeholder="Enter care items..."
                  placeholderTextColor="#94A3B8"
                />
                <View style={styles.multilinePencilRow}>
                  <Pencil size={normalize(16)} color="#2563EB" />
                </View>
              </View>
            </View>

            {/* Section 4: NEXT FOCUS AREA */}
            <View style={styles.sectionBlockLast}>
              <AppText family="secondary" weight="medium" style={styles.sectionLabel}>
                NEXT FOCUS AREA
              </AppText>
              <View style={styles.singleLineInputBox}>
                <TextInput
                  style={styles.singleLineTextInput}
                  value={nextFocusArea}
                  onChangeText={setNextFocusArea}
                  placeholder="Enter next focus area..."
                  placeholderTextColor="#94A3B8"
                />
                <Pencil size={normalize(16)} color={colors.typographyColor['Color 2']} style={styles.pencilIcon} />
              </View>
            </View>
          </View>

          {/* Save Notes Button */}
          <TouchableOpacity
            style={styles.saveNotesBtn}
            onPress={handleSaveNotes}
            activeOpacity={0.8}
          >
            <Download size={normalize(18)} color="#FFFFFF" style={styles.saveIcon} />
            <AppText family="secondary" weight="medium" style={styles.saveNotesBtnText}>
              Save Notes
            </AppText>
          </TouchableOpacity>

          {/* Security Footer Note */}
          <AppText family="secondary" weight="regular" style={styles.securityText}>
            ALL INFORMATION IS SECURE AND ENCRYPTED
          </AppText>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
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
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    // paddingHorizontal: normalize(16),
    // paddingTop: normalize(16),
    // paddingBottom: normalize(48),
  },
  gradientBg: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
  sectionBlock: {
    marginBottom: normalize(18),
  },
  sectionBlockLast: {
    marginBottom: normalize(4),
  },
  sectionLabel: {
    fontSize: normalize(10.5),
    color: colors.typographyColor.Medium,
    letterSpacing: 0.5,
    marginBottom: normalize(8),
  },
  singleLineInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  singleLineTextInput: {
    flex: 1,
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    padding: 0,
  },
  pencilIcon: {
    marginLeft: normalize(8),
  },
  multilineInputBox: {
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingTop: normalize(12),
    paddingBottom: normalize(10),
    backgroundColor: '#FFFFFF',
    minHeight: normalize(110),
  },
  multilineTextInput: {
    flex: 1,
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(20),
    padding: 0,
  },
  multilinePencilRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: normalize(6),
  },
  saveNotesBtn: {
    backgroundColor: colors.typographyColor['Dark 2'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    borderRadius: normalize(12),
    marginTop: normalize(24),
    marginBottom: normalize(16),
  },
  saveIcon: {
    marginRight: normalize(8),
  },
  saveNotesBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14.5),
  },
  securityText: {
    fontSize: normalize(9.5),
    color: colors.typographyColor.Medium,
    letterSpacing: 0.6,
    textAlign: 'center',
  },
});
