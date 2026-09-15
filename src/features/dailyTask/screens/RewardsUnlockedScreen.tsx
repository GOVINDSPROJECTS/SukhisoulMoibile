import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { ChevronLeft } from 'lucide-react-native';
import { ActiveRewards } from '../components/ActiveRewards';
import { UnlockMoreRewards } from '../components/UnlockMoreRewards';
import { GetMorePoints } from '../components/GetMorePoints';

export const RewardsUnlockedScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={normalize(22)} color={colors.typographyColor.Dark} />
        </TouchableOpacity>

        <AppText
          variant="h4"
          weight="bold"
          family="primary"
          color={colors.typographyColor.Dark}
          style={styles.headerTitle}
        >
          Rewards Unlocked
        </AppText>

        {/* Spacer to centre the title */}
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section 1 — Active (unlocked) rewards */}
        <ActiveRewards />

        {/* Section 2 — Unlock more rewards (horizontal scroll) */}
        <UnlockMoreRewards />

        {/* Section 3 — Get More Points */}
        <GetMorePoints />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF5FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    backgroundColor: '#EEF5FB',
  },
  backBtn: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(19),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
  },
  headerSpacer: {
    width: normalize(38),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: normalize(24),
  },
});
