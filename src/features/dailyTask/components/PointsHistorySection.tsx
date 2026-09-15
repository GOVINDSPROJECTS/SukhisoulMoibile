import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { History, CreditCard, ChevronDown, ArrowRight, ArrowDown } from 'lucide-react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ─── Types ────────────────────────────────────────────────────────────────────

type InnerTab = 'history' | 'payments';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  points: number;
  type: 'earned' | 'spent';
  tag?: string;
  tagNote?: string;
}

interface PaymentItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  points: number;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const HISTORY_DATA: HistoryItem[] = [
  {
    id: '1',
    title: 'Daily Task Completed',
    date: '14 May 2025, 09:30 AM',
    points: 10,
    type: 'earned',
    tag: 'Expires 14 Nov 2025',
  },
  {
    id: '2',
    title: 'Redeemed: Therapy Session',
    date: '13 May 2025, 11:15 AM',
    points: -500,
    type: 'spent',
    tag: 'Spent',
    tagNote: 'Session with Dr. Arisaka',
  },
  {
    id: '3',
    title: 'Journal Streak Bonus',
    date: '13 May 2025, 08:45 AM',
    points: 20,
    type: 'earned',
    tag: 'Expires 13 Nov 2025',
  },
  {
    id: '4',
    title: 'Meditation Milestone',
    date: '12 May 2025, 07:20 PM',
    points: 15,
    type: 'earned',
    tag: 'Expires 12 Nov 2025',
  },
  {
    id: '5',
    title: 'Journal Streak Bonus',
    date: '12 May 2025, 07:20 PM',
    points: 20,
    type: 'earned',
    tag: 'Expires 12 Nov 2025',
  },
  {
    id: '6',
    title: 'Journal Streak Bonus',
    date: '12 May 2025, 07:20 PM',
    points: 20,
    type: 'earned',
    tag: 'Expires 12 Nov 2025',
  },
  {
    id: '7',
    title: 'Journal Streak Bonus',
    date: '12 May 2025, 07:20 PM',
    points: 20,
    type: 'earned',
    tag: 'Expires 12 Nov 2025',
  },
];

const PAYMENT_DATA: PaymentItem[] = [
  {
    id: 'p1',
    title: 'Purchased 500 Points',
    subtitle: 'Paid via UPI',
    date: '14 May, 11:15 AM',
    points: 500,
    amount: '₹250',
    status: 'Completed',
  },
  {
    id: 'p2',
    title: 'Purchased 1,000 Points',
    subtitle: 'Paid via Card •••• 4567',
    date: '10 Apr 2025, 09:30 AM',
    points: 1000,
    amount: '₹500',
    status: 'Completed',
  },
  {
    id: 'p3',
    title: 'Purchased 1,000 Points',
    subtitle: 'Paid via Card •••• 4567',
    date: '10 Apr 2025, 09:30 AM',
    points: 1000,
    amount: '₹500',
    status: 'Completed',
  },
  {
    id: 'p4',
    title: 'Purchased 1,000 Points',
    subtitle: 'Paid via Card •••• 4567',
    date: '10 Apr 2025, 09:30 AM',
    points: 1000,
    amount: '₹500',
    status: 'Completed',
  },
  {
    id: 'p5',
    title: 'Purchased 1,000 Points',
    subtitle: 'Paid via Card •••• 4567',
    date: '10 Apr 2025, 09:30 AM',
    points: 1000,
    amount: '₹500',
    status: 'Completed',
  },
  {
    id: 'p6',
    title: 'Purchased 1,000 Points',
    subtitle: 'Paid via Card •••• 4567',
    date: '10 Apr 2025, 09:30 AM',
    points: 1000,
    amount: '₹500',
    status: 'Completed',
  },
];

// ─── History Row ──────────────────────────────────────────────────────────────

const HistoryRow: React.FC<{ item: HistoryItem }> = ({ item }) => {
  const isEarned = item.type === 'earned';

  return (
    <View style={styles.historyRow}>
      {/* Icon circle */}
      <View
        style={[
          styles.historyIcon,
          { backgroundColor: isEarned ? 'rgba(179,221,255,0.2)' : colors.lightTints.redLightTint2[50] },
        ]}
      >
        <AppText style={[styles.historyIconText, { color: isEarned ? "#396380" : '#BA1A1A' }]}>
          {isEarned ? '+' : '−'}
        </AppText>
      </View>

      {/* Info */}
      <View style={styles.historyInfo}>
        <AppText
          variant="body"
          weight="semiBold"
          family='secondary'
          color={"#0B1C30"}
          style={styles.historyTitle}
        >
          {item.title}
        </AppText>
        <AppText
          variant="caption"
          weight="regular"
          color={"#42474D"}
          style={styles.historyDate}
        >
          {item.date}
        </AppText>

        {/* Tag row */}
        {item.tag && (
          <View style={styles.tagRow}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: isEarned ? colors.green[100] : '#FFDAD6',
                },
              ]}
            >
              <AppText
                variant="caption"
                weight="semiBold"
                color={isEarned ? "#38627F" : '#93000A'}
                style={styles.tagText}
              >
                {item.tag}
              </AppText>
            </View>
            {item.tagNote ? (
              <AppText
                variant="caption"
                weight="light"
                color={"#42474D"}
                style={styles.tagNote}
              >
                {item.tagNote}
              </AppText>
            ) : null}
          </View>
        )}
      </View>

      {/* Points */}
      <AppText
        variant="body"
        weight="bold"
        color={isEarned ? "#396380" : '#BA1A1A'}
        style={styles.historyPoints}
      >
        {isEarned ? `+ ${item.points} pts` : `- ${Math.abs(item.points)} pts`}
      </AppText>
    </View>
  );
};

// ─── Payment Row ──────────────────────────────────────────────────────────────

const PaymentRow: React.FC<{ item: PaymentItem }> = ({ item }) => {
  return (
    <View style={styles.paymentRow}>
      {/* Icon */}
      <View style={styles.paymentIcon}>
        <CreditCard size={normalize(20)} color={colors.yellow[900]} />
      </View>

      {/* Info */}
      <View style={styles.paymentInfo}>
        <AppText
          variant="body"
          weight="bold"
          family='secondary'
          color={"#1A1C1E"}
          style={styles.paymentTitle}
        >
          {item.title}
        </AppText>
        <AppText
          variant="caption"
          weight="regular"
          color={"#44474E"}
        >
          {item.subtitle}
        </AppText>
        <AppText
          variant="caption"
          weight="regular"
          color={"#9CA3AF"}
          style={styles.paymentDate}
        >
          {item.date}
        </AppText>
      </View>

      {/* Right: pts + amount + status */}
      <View style={styles.paymentRight}>
        <AppText
          variant="caption"
          weight="semiBold"
          color={"#B3DDFF"}
          style={styles.paymentPts}
        >
          +{item.points.toLocaleString()} pts
        </AppText>
        <AppText
          variant="body"
          weight="bold"
          color={colors.typographyColor.Black}
          style={styles.paymentAmount}
        >
          {item.amount}
        </AppText>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Completed' && styles.statusCompleted,
          ]}
        >
          <AppText
            variant="caption"
            weight="semiBold"
            family='secondary'
            color={item.status === 'Completed' ? '#2563EB' : '#E84545'}
            style={styles.statusText}
          >
            {item.status}
          </AppText>
        </View>
      </View>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const PointsHistorySection: React.FC = () => {
  const [activeInnerTab, setActiveInnerTab] = useState<InnerTab>('history');
  const [showAll, setShowAll] = useState(false);

  const activityOptions = [
    'All Activity',
    'Earned',
    'Spent',
  ];

  const [selectedActivity, setSelectedActivity] = useState(activityOptions[0]);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);

  const transactionOptions = [
    'All Transactions',
    'Completed',
    'Pending',
    'Failed',
  ];

  const [selectedTransaction, setSelectedTransaction] = useState(
    transactionOptions[0],
  );
  const [showTransactionDropdown, setShowTransactionDropdown] = useState(false);

  const handleTabChange = (tab: InnerTab) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveInnerTab(tab);
    setShowAll(false);
  };

  const displayedHistory = showAll ? HISTORY_DATA : HISTORY_DATA.slice(0, 4);
  const displayedPayment = showAll ? PAYMENT_DATA : PAYMENT_DATA.slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Inner Tab Bar */}
      <View style={styles.innerTabBar}>
        <TouchableOpacity
          style={[
            styles.innerTab,
            activeInnerTab === 'history' && styles.innerTabActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabChange('history')}
        >
          <History
            size={normalize(16)}
            color={
              activeInnerTab === 'history'
                ? colors.typographyColor['Dark 2']
                : colors.typographyColor.Medium
            }
          />
          <AppText
            variant="caption"
            family='secondary'
            weight={activeInnerTab === 'history' ? 'semiBold' : 'semiBold'}
            color={
              activeInnerTab === 'history'
                ? colors.typographyColor.Dark
                : colors.typographyColor.Medium
            }
            style={styles.innerTabText}
          >
            History
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.innerTab,
            activeInnerTab === 'payments' && styles.innerTabActive,
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabChange('payments')}
        >
          <CreditCard
            size={normalize(16)}
            color={
              activeInnerTab === 'payments'
                ? colors.typographyColor['Dark 2']
                : colors.typographyColor.Medium
            }
          />
          <AppText
            variant="caption"
            weight={activeInnerTab === 'payments' ? 'semiBold' : 'semiBold'}
            color={
              activeInnerTab === 'payments'
                ? colors.typographyColor['Dark 2']
                : colors.typographyColor.Medium
            }
            style={styles.innerTabText}
          >
            Payments
          </AppText>
        </TouchableOpacity>
      </View>

      {/* ── History List ─────────────────────────────── */}
      {activeInnerTab === 'history' && (
        <View style={styles.listWrapper}>
          {/* Header row */}
          <View style={styles.sectionHeader}>
            <AppText
              variant="h4"
              weight="bold"
              family="primary"
              color={"#0B1C30"}
              style={{ fontSize: normalize(14), marginTop: normalize(-8) }}
            >
              Points History
            </AppText>

            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.filterBtn}
                activeOpacity={0.8}
                onPress={() => setShowActivityDropdown(prev => !prev)}
              >
                <AppText
                  variant="caption"
                  weight="medium"
                  family="secondary"
                  color="#42474D"
                >
                  {selectedActivity}
                </AppText>

                <ChevronDown
                  size={normalize(13)}
                  color="#42474D"
                />
              </TouchableOpacity>

              {showActivityDropdown && (
                <View style={styles.dropdownMenu}>
                  {activityOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        setSelectedActivity(option);
                        setShowActivityDropdown(false);
                      }}
                    >
                      <AppText
                        variant="caption"
                        weight={
                          selectedActivity === option ? 'semiBold' : 'regular'
                        }
                        style={[styles.dropdownItemText, { color: selectedActivity === option ? '#42474D' : '#42474D', backgroundColor: selectedActivity === option ? colors.tintsBlue[200] : 'white' }]}
                      >
                        {option}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Items */}
          {displayedHistory.map(item => (
            <HistoryRow key={item.id} item={item} />
          ))}

          {/* Separator */}
          <View style={styles.separator} />

          {/* View More */}
          {!showAll && HISTORY_DATA.length > 4 && (
            <TouchableOpacity
              style={styles.viewMoreBtn}
              activeOpacity={0.8}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShowAll(true);
              }}
            >
              <AppText
                variant="body"
                weight="semiBold"
                color={colors.typographyColor.Dark}
              >
                View More
              </AppText>
              <ChevronDown size={normalize(16)} color={colors.typographyColor.Dark} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ── Payment List ─────────────────────────────── */}
      {activeInnerTab === 'payments' && (
        <View style={styles.listWrapper}>
          {/* Header row */}
          <View style={styles.sectionHeader}>
            <AppText
              variant="h4"
              weight="bold"
              family="primary"
              color={"#0B1C30"}
              style={{ fontSize: normalize(14), marginTop: normalize(-8) }}
            >
              Payment History
            </AppText>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.filterBtn}
                activeOpacity={0.8}
                onPress={() => setShowTransactionDropdown(prev => !prev)}
              >
                <AppText
                  variant="caption"
                  weight="medium"
                  family="secondary"
                  color="#42474D"
                >
                  {selectedTransaction}
                </AppText>

                <ChevronDown size={normalize(13)} color="#42474D" />
              </TouchableOpacity>

              {showTransactionDropdown && (
                <View style={styles.dropdownMenu}>
                  {transactionOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        setSelectedTransaction(option);
                        setShowTransactionDropdown(false);
                      }}
                    >
                      <AppText
                        variant="caption"
                        weight={
                          selectedTransaction === option ? 'semiBold' : 'regular'
                        }
                        style={[styles.dropdownItemText, { color: selectedTransaction === option ? '#42474D' : '#42474D', backgroundColor: selectedTransaction === option ? colors.tintsBlue[200] : 'white' }]}
                      >
                        {option}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Items */}
          {displayedPayment.map(item => (
            <PaymentRow key={item.id} item={item} />
          ))}


          {/* Separator */}
          <View style={styles.separator} />

          {/* View More */}
          {!showAll && PAYMENT_DATA.length > 4 && (
            <TouchableOpacity
              style={styles.viewMoreBtn}
              activeOpacity={0.8}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShowAll(true);
              }}
            >
              <AppText
                variant="body"
                weight="semiBold"
                color={colors.typographyColor.Dark}
              >
                View More
              </AppText>
              <ChevronDown size={normalize(16)} color={colors.typographyColor.Dark} />
            </TouchableOpacity>
          )}

        </View>
      )}

    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(16),
    marginTop: normalize(14),
  },

  // ── Inner tab bar
  innerTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.lightTints.blueLightTint2[50],
    borderRadius: normalize(14),
    padding: normalize(8),
    marginBottom: normalize(5)
  },
  innerTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(10),
    borderRadius: normalize(11),
    gap: normalize(6),
  },
  innerTabActive: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  innerTabText: {
    fontSize: normalize(12),
  },

  // ── List wrapper
  listWrapper: {
    marginTop: normalize(20),
  },

  // ── Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: '#C1C7CE',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    gap: normalize(4),
  },

  // ── History row
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(10),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: "#EFF4FF"
  },
  historyIcon: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
    marginTop: normalize(2),
  },
  historyIconText: {
    fontSize: normalize(24),
    fontWeight: '500',
    lineHeight: normalize(22),
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(2),
  },
  historyDate: {
    fontSize: normalize(11),
    marginBottom: normalize(6),
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  tag: {
    borderRadius: normalize(6),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
  },
  tagText: {
    fontSize: normalize(11),
  },
  tagNote: {
    fontSize: normalize(11),
  },
  historyPoints: {
    fontSize: normalize(12),
    marginLeft: normalize(3),
    marginTop: normalize(0),
  },

  // ── Separator
  separator: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginBottom: normalize(12),
  },

  // ── View More
  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
    paddingVertical: normalize(12),
    marginBottom: normalize(20), alignSelf: 'center'
  },

  // ── Payment row
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(14),
    marginBottom: normalize(10),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderWidth: normalize(1),
    borderColor: "#EFF6FF",
  },
  paymentIcon: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
    backgroundColor: colors.yellow[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: normalize(13),
    marginBottom: normalize(2),
  },
  paymentDate: {
    marginTop: normalize(2),
  },
  paymentRight: {
    alignItems: 'flex-end',
    gap: normalize(4),
    marginLeft: normalize(8),
  },
  paymentPts: {
    fontSize: normalize(13),
  },
  paymentAmount: {
    fontSize: normalize(14),
  },
  statusBadge: {
    borderRadius: normalize(99),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    backgroundColor: '#EFF6FF',
    borderWidth: normalize(1),
    borderColor: "#B3DDFF"
  },
  statusCompleted: {
    backgroundColor: '#EFF6FF',
  },
  statusText: {
    fontSize: normalize(9.5),
  },
  dropdownContainer: {
    position: 'relative',
  },

  dropdownMenu: {
    position: 'absolute',
    top: normalize(38),
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: '#d4deeb',
    minWidth: normalize(140),
    overflow: 'hidden',
    zIndex: 100,
    boxShadow: '0 3px 3px rgba(0,0,0,0.05) '
  },
  dropdownItem: {},
  dropdownItemText: {
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
  }
});
