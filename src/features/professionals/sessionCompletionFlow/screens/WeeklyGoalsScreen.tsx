import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export const WeeklyGoalsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [selectedWeek, setSelectedWeek] = useState('Week 1');

  const handleAddGoalLater = () => {
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

          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            Weekly Goal
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
          {/* Main White Card */}
          <View style={styles.mainCard}>
            {/* Section Header */}
            <AppText family="primary" weight="medium" style={styles.selectWeekLabel}>
              SELECT WEEK
            </AppText>

            {/* Week Selector Segmented Row */}
            <View style={styles.weekSegmentContainer}>
              {WEEKS.map((week, index) => {
                const isSelected = selectedWeek === week;
                const isLast = index === WEEKS.length - 1;
                return (
                  <TouchableOpacity
                    key={week}
                    style={[
                      styles.weekTab,
                      isSelected && styles.weekTabActive,
                      !isLast && !isSelected && styles.weekTabBorderRight,
                    ]}
                    onPress={() => setSelectedWeek(week)}
                    activeOpacity={0.7}
                  >
                    <AppText
                      family="secondary"
                      weight={isSelected ? 'regular' : 'regular'}
                      style={[
                        styles.weekTabText,
                        isSelected && styles.weekTabTextActive,
                      ]}
                    >
                      {week}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Skipped Status Mint Card */}
            <View style={styles.statusCard}>
              {/* Green Checkmark Badge */}
              <View style={styles.checkCircle}>
                <Check size={normalize(22)} color="#FFFFFF" strokeWidth={3} />
              </View>

              {/* Title */}
              <AppText family="secondary" weight="bold" style={styles.statusTitle}>
                Goal skipped for this week
              </AppText>

              {/* Subtitle */}
              <AppText family="secondary" weight="light" style={styles.statusSubtitle}>
                You can add or update it anytime later.
              </AppText>

              {/* Add Goal Later Button */}
              <TouchableOpacity
                style={styles.addGoalBtn}
                onPress={handleAddGoalLater}
                activeOpacity={0.7}
              >
                <AppText family="secondary" weight="medium" style={styles.addGoalBtnText}>
                  Add Goal Later
                </AppText>
              </TouchableOpacity>
            </View>
          </View>

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
    // paddingBottom: normalize(32),
    minHeight: '85%',
    justifyContent: 'space-between',
  },
  gradientBg: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
    height: '100%',
    justifyContent: 'space-between'
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    minHeight: normalize(560),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
  selectWeekLabel: {
    fontSize: normalize(10.5),
    color: colors.tintsGrey[500],
    letterSpacing: 0.5,
    marginBottom: normalize(12),
  },
  weekSegmentContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: normalize(12),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: normalize(24),
  },
  weekTab: {
    flex: 1,
    paddingVertical: normalize(7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  weekTabActive: {
    backgroundColor: colors.blue[600],
  },
  weekTabBorderRight: {
    borderRightWidth: 1,
    borderRightColor: colors.tintsGrey[200],
  },
  weekTabText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Light,
  },
  weekTabTextActive: {
    color: '#FFFFFF',
  },
  statusCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: colors.green[200],
    borderRadius: normalize(16),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    backgroundColor: colors.green[400],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(14),
  },
  statusTitle: {
    fontSize: normalize(13.5),
    color: colors.green[700],
    marginBottom: normalize(6),
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: normalize(11.5),
    color: colors.green[700],
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  addGoalBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.blue[100],
    borderRadius: normalize(8),
    paddingVertical: normalize(9),
    paddingHorizontal: normalize(24),
    alignItems: 'center',
  },
  addGoalBtnText: {
    fontSize: normalize(12),
    color: colors.blue[600],
  },
  securityText: {
    fontSize: normalize(10),
    color: colors.tintsGrey[600],
    letterSpacing: 0.6,
    textAlign: 'center',
    marginTop: normalize(24),
  },
});
