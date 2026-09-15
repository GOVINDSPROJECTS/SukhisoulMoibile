import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { History, RotateCcw } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';

import { SettingsHeader } from '../components/SettingsHeader';
import {
  TransactionHistoryItem,
  TransactionData,
} from '../components/transactions/TransactionHistoryItem';
import { PaymentHelpCard } from '../components/transactions/PaymentHelpCard';
import { useTherapistDashboard } from '../../therapist-dashboard/hooks/useTherapistDashboard';
import { fetchUserPayments } from '../../../api/userProfile';

import { ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { data: dashboardData } = useTherapistDashboard();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const paymentOrders = await fetchUserPayments();
      if (paymentOrders && paymentOrders.length > 0) {
        const mapped = paymentOrders.map((p) => {
          const dateStr = p.created_at
            ? new Date(p.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
            : 'Recent';
          return {
            id: String(p.id),
            transactionCode: `#SS${p.id || p.uuid?.slice(0, 4) || '1001'}`,
            date: dateStr,
            status: (p.status === 'captured' || p.status === 'success' || p.status === 'paid' ? 'Paid' : p.status === 'refunded' ? 'Refunded' : 'Paid') as 'Paid' | 'Refunded',
            amount: typeof p.amount === 'string' ? parseFloat(p.amount) : (p.amount || 500),
          };
        });
        setTransactions(mapped);
        return;
      }

      // Secondary dynamic fallback: recent session bookings from therapist dashboard summary
      if (dashboardData?.recentSessions && dashboardData.recentSessions.length > 0) {
        const mapped = dashboardData.recentSessions.map((s) => ({
          id: s.id,
          transactionCode: `#SS${s.id}`,
          date: s.date || 'Recent',
          status: (s.status === 'missed' || s.raw_status === 'cancelled' || s.raw_status === 'declined' ? 'Refunded' : 'Paid') as 'Paid' | 'Refunded',
          amount: s.amount || 500,
        }));
        setTransactions(mapped);
      }
    } catch (err) {
      console.log('[Transactions] Error loading payments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [dashboardData]);

  // Real-time polling & focus sync
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      const interval = setInterval(() => {
        loadTransactions();
      }, 8000); // Polling every 8s while on Transactions screen
      return () => clearInterval(interval);
    }, [loadTransactions])
  );

  const handleBack = useCallback(() => {
    console.log('[Transactions] Back button pressed');
    navigation.goBack();
  }, [navigation]);

  const handleContactSupport = useCallback(() => {
    console.log('[Transactions] Contact Support pressed -> Navigating to Customer Service Center');
    navigation.navigate('CustomerServiceCenter');
  }, [navigation]);

  const handleTransactionPress = useCallback((item: TransactionData) => {
    console.log(`[Transactions] Selected transaction: ${item.transactionCode}, Amount: ₹${item.amount}`);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* ── Top Header with Subtle Gradient ──────────────────────────── */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerGradient}
      >
        <SettingsHeader
          title="Transactions"
          onBack={handleBack}
        />
      </LinearGradient>

      {/* ── Content Body ─────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadTransactions(true)}
            colors={[colors.typographyColor['Dark 2'] || '#003CA3']}
            tintColor={colors.typographyColor['Dark 2'] || '#003CA3'}
          />
        }
      >
        {/* Section Header: Transaction History with Icon */}
        <View style={styles.sectionHeader}>
          <History
            size={normalize(20)}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={2.4}
          />
          <AppText
            weight="bold"
            family="secondary"
            style={styles.sectionTitle}
            color={colors.typographyColor.Black || '#0F172A'}
          >
            Transaction History
          </AppText>
        </View>

        {/* Transactions List */}
        {loading ? (
          <View style={{ paddingVertical: normalize(30), alignItems: 'center' }}>
            <ActivityIndicator size="small" color={colors.typographyColor['Dark 2'] || '#003CA3'} />
          </View>
        ) : transactions.length > 0 ? (
          <View style={styles.listContainer}>
            {transactions.map((item) => (
              <TransactionHistoryItem
                key={item.id}
                transaction={item}
                onPress={handleTransactionPress}
              />
            ))}
          </View>
        ) : (
          <View style={{ paddingVertical: normalize(24), alignItems: 'center' }}>
            <AppText weight="regular" family="secondary" color={colors.typographyColor.Medium || '#64748B'}>
              No transaction history found.
            </AppText>
          </View>
        )}

        {/* Need Help With Payments Card */}
        <PaymentHelpCard onContactSupport={handleContactSupport} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: normalize(10),
    paddingBottom: normalize(40),
  },
  headerGradient: {
    paddingBottom: normalize(6),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(18),
    marginTop: normalize(6),
  },
  sectionTitle: {
    fontSize: normalize(17),
  },
  listContainer: {
    gap: normalize(2),
  },
});
