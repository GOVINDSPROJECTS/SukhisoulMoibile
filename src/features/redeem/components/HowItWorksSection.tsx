import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

// ── Step data ────────────────────────────────────────────────────────────────
// Icons: using existing psychologist assets — user will replace them
const STEPS = [
  {
    step: 1,
    label: 'Complete\nTasks',
    icon: require('../../redeem/assets/how-1.png'),
  },
  {
    step: 2,
    label: 'Earn\nPoints',
    icon: require('../../redeem/assets/how-2.png'),
  },
  {
    step: 3,
    label: 'Redeem\nPoints',
    icon: require('../../redeem/assets/how-3.png'),
  },
  {
    step: 4,
    label: 'Buy\nMissing\nPoints',
    icon: require('../../redeem/assets/how-4.png'),
  },
  {
    step: 5,
    label: 'Book\nTherapy',
    icon: require('../../redeem/assets/how-5.png'),
  },
];

// ── Example session values (static placeholder) ───────────────────────────────
const SESSION_COST = 1200;
const YOUR_BALANCE = 950;
const MISSING_POINTS = SESSION_COST - YOUR_BALANCE;

// ── Component ─────────────────────────────────────────────────────────────────
export const HowItWorksSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* ── Header row ─────────────────────────────────────────────────────── */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerRow}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View>
          <AppText variant="h2" weight="extraBold" style={styles.title}>
            How It Works
          </AppText>
          <AppText variant="caption" weight="medium" style={styles.subtitle}>
            Small steps today, Better you tomorrow
          </AppText>
        </View>
        {expanded ? (
          <ChevronUp size={normalize(22)} color={colors.typographyColor.Medium} strokeWidth={2} />
        ) : (
          <ChevronDown size={normalize(22)} color={colors.typographyColor.Medium} strokeWidth={2} />
        )}
      </TouchableOpacity>

      {/* ── Expanded content ───────────────────────────────────────────────── */}
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />

          {/* ── 5-step horizontal strip ──────────────────────────────────── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stepsRow}
          >
            {STEPS.map((item, index) => (
              <View key={item.step} style={styles.stepWrapper}>
                {/* Numbered badge */}
                <View style={styles.stepBadge}>
                  <AppText variant="caption" weight="bold" style={styles.stepNumber}>
                    {item.step}
                  </AppText>
                </View>

                {/* Icon card */}
                <View style={styles.iconCard}>
                  <Image
                    source={item.icon}
                    style={styles.stepIcon}
                    resizeMode="contain"
                  />
                </View>

                {/* Label */}
                <AppText variant="caption" weight="bold" style={styles.stepLabel} center>
                  {item.label}
                </AppText>

                {/* Arrow connector (not after last) */}
                {/* {index < STEPS.length - 1 && (
                  <View style={styles.arrowConnector}>
                    <AppText style={styles.arrowText}>›</AppText>
                  </View>
                )} */}
              </View>
            ))}
          </ScrollView>

          {/* ── Example Therapy Session ───────────────────────────────────── */}
          <View style={styles.exampleCard}>
            <AppText variant="h4" weight="bold" style={styles.exampleTitle}>
              Example Theraphy Session
            </AppText>

            <View style={styles.mathRow}>
              {/* Session Cost */}
              <View style={styles.mathItem}>
                <AppText variant="caption" weight="extraBold" style={styles.mathLabel}>
                  Session cost
                </AppText>
                <AppText variant="h3" weight="extraBold" style={styles.mathValueDark}>
                  {SESSION_COST}
                </AppText>
              </View>

              <AppText variant='h2' weight="extraBold" style={styles.mathOperator}>-</AppText>

              {/* Your Balance */}
              <View style={styles.mathItem}>
                <AppText variant="caption" weight="extraBold" style={styles.mathLabel}>
                  Your Balance
                </AppText>
                <AppText variant="h3" weight="extraBold" style={styles.mathValueBlue}>
                  {YOUR_BALANCE}
                </AppText>
              </View>

              <AppText variant='h3' weight="semiBold" style={styles.mathOperator}>=</AppText>

              {/* Missing Points */}
              <View style={styles.mathItem}>
                <AppText variant="caption" weight="extraBold" style={styles.mathLabel}>
                  Missing points
                </AppText>
                <AppText variant="h3" weight="extraBold" style={styles.mathValueRed}>
                  {MISSING_POINTS}
                </AppText>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tintsBlue[400],
    marginHorizontal: normalize(0),
    padding: normalize(20),
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.appThemeColor[900],
  },
  subtitle: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    marginTop: normalize(2),
  },

  // ── Expanded ─────────────────────────────────────────────────────────────────
  expandedContent: {
    marginTop: normalize(16),
  },
  divider: {
    height: 1,
    marginBottom: normalize(30),
  },

  // ── Steps strip ─────────────────────────────────────────────────────────────
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: normalize(4),
    gap: normalize(4),
    width: '100%',
    backgroundColor: colors.lightTints.blueLightTint[50],
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: normalize(20),
    marginBottom: normalize(20),
    paddingTop: normalize(10),
    paddingHorizontal: normalize(5)
  },
  stepWrapper: {
    alignItems: 'center',
    width: '19.5%',
    position: 'relative',
  },
  stepBadge: {
    width: normalize(26),
    height: normalize(26),
    borderRadius: normalize(13),
    backgroundColor: colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(6),
    zIndex: 1,
  },
  stepNumber: {
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
  iconCard: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(8),
  },
  stepIcon: {
    width: normalize(40),
    height: normalize(40),
  },
  stepLabel: {
    fontSize: normalize(9),
    color: colors.appThemeColor[900],
    textAlign: 'center',
    lineHeight: normalize(14),
  },
  arrowConnector: {
    position: 'absolute',
    right: normalize(-10),
    top: normalize(44),
  },
  arrowText: {
    fontSize: normalize(20),
    color: colors.blue[400],
    fontWeight: '300',
  },

  // ── Example card ─────────────────────────────────────────────────────────────
  exampleCard: {
    // backgroundColor: '#FFFFFF',
    // borderRadius: normalize(14),
    // padding: normalize(16),
    marginTop: normalize(16),
  },
  exampleTitle: {
    color: colors.blue[600],
    marginBottom: normalize(12),
  },
  mathRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(-15)
  },
  mathItem: {
    alignItems: 'center',
    flex: 1,
  },
  mathLabel: {
    fontSize: normalize(10),
    color: colors.typographyColor.Black,
    marginBottom: normalize(4),
    textAlign: 'center',
  },
  mathOperator: {
    // fontSize: normalize(22),
    color: colors.typographyColor['Dark 2'],
    fontWeight: '700',
    marginTop: normalize(14),
    paddingHorizontal: normalize(4),
  },
  mathValueDark: {
    fontSize: normalize(28),
    color: colors.typographyColor['Dark 2'],
  },
  mathValueBlue: {
    fontSize: normalize(28),
    color: 'rgb(16,185,129)',
  },
  mathValueRed: {
    fontSize: normalize(28),
    color: 'rgb(239,68,68)',
  },
});
