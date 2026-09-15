import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  ArrowLeft,
  Calendar,
  Check,
  Grid2X2,
  Mail,
  MessageSquareCheck,
  Gift,
  Bell,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  DynamicNotificationItem,
} from '../hooks/useNotifications';

type TabId = 'all' | 'appointments' | 'tasks' | 'offers';

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'offers', label: 'Offers' },
];

const getNotificationIcon = (iconName: string, iconBg?: string) => {
  switch (iconName) {
    case 'calendar':
      return {
        icon: <Calendar size={normalize(20)} color={colors.typographyColor['Dark 2']} />,
        bg: iconBg || colors.blue[100],
      };
    case 'calendar_alert':
      return {
        icon: <Calendar size={normalize(20)} color={colors.appThemeColor[700]} />,
        bg: iconBg || '#FEF3C7',
      };
    case 'task':
      return {
        icon: <Check size={normalize(20)} strokeWidth={3} color="#ffffff" />,
        bg: iconBg || colors.typographyColor.Dark,
      };
    case 'habit':
      return {
        icon: <Grid2X2 size={normalize(20)} color={colors.typographyColor['Dark 2']} />,
        bg: iconBg || colors.lightTints.blueLightTint[50],
      };
    case 'mail':
    case 'message':
      return {
        icon: <Mail size={normalize(20)} color={colors.typographyColor.Medium} />,
        bg: iconBg || colors.lightTints.blueLightTint[50],
      };
    case 'feedback':
      return {
        icon: <MessageSquareCheck size={normalize(20)} color={colors.blue[500]} />,
        bg: iconBg || colors.blue[50],
      };
    case 'offer':
      return {
        icon: <Gift size={normalize(20)} color="#D97706" />,
        bg: iconBg || '#FEF3C7',
      };
    default:
      return {
        icon: <Sparkles size={normalize(20)} color={colors.blue[600]} />,
        bg: iconBg || colors.lightTints.blueLightTint[50],
      };
  }
};

const NotificationCard: React.FC<{ item: DynamicNotificationItem; onSelect?: () => void }> = ({
  item,
  onSelect,
}) => {
  const { icon, bg } = getNotificationIcon(item.icon, item.icon_bg);

  const renderBody = () => {
    if (!item.highlight || !item.body.includes(item.highlight)) {
      return (
        <AppText variant="caption" weight="regular" family="secondary" style={styles.cardBody}>
          {item.body}
        </AppText>
      );
    }
    const parts = item.body.split(item.highlight);
    return (
      <AppText variant="caption" weight="regular" family="secondary" style={styles.cardBody}>
        {parts[0]}
        <AppText variant="caption" weight="semiBold" family="secondary" style={styles.highlightText}>
          {item.highlight}
        </AppText>
        {parts.slice(1).join(item.highlight)}
      </AppText>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      style={[styles.card, !item.is_read && styles.unreadCard]}
    >
      <View style={[styles.iconBox, { backgroundColor: bg }]}>{icon}</View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <AppText variant="body" weight="semiBold" family="secondary" style={styles.cardTitle}>
            {item.title}
          </AppText>
          <AppText variant="caption" weight="semiBold" family="secondary" style={styles.cardTime}>
            {item.time}
          </AppText>
        </View>
        {renderBody()}
      </View>
      {!item.is_read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const { data, isLoading, isRefetching, refetch } = useNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const allNotifications = data?.all || [];

  const filteredToday = (data?.today || []).filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const filteredYesterday = (data?.yesterday || []).filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const filteredEarlier = (data?.earlier || []).filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const totalFilteredCount =
    filteredToday.length + filteredYesterday.length + filteredEarlier.length;

  const handleNotificationClick = (item: DynamicNotificationItem) => {
    if (!item.is_read) {
      markReadMutation.mutate(item.id);
    }
  };

  const handleMarkAllRead = () => {
    const allIds = (data?.all || []).map((n) => n.id);
    markAllReadMutation.mutate(allIds);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      {/* Header */}
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>
        <AppText variant="h4" weight="bold" style={styles.headerTitle}>
          Notifications
        </AppText>
        {(data?.unread_count ?? 0) > 0 ? (
          <TouchableOpacity
            onPress={handleMarkAllRead}
            activeOpacity={0.7}
            style={styles.markAllBtn}
          >
            <AppText variant="caption" weight="semiBold" style={styles.markAllText}>
              Mark read
            </AppText>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const tabCount =
            tab.id === 'all'
              ? data?.counts?.all
              : data?.counts?.[tab.id];

          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabPill, activeTab === tab.id && styles.tabPillActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.id)}
            >
              <AppText
                variant="caption"
                weight="semiBold"
                style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}
              >
                {tab.label}
                {typeof tabCount === 'number' && tabCount > 0 ? ` (${tabCount})` : ''}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + normalize(100) }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.blue[600]}
            colors={[colors.blue[600]]}
          />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.blue[600]} />
            <AppText variant="caption" style={styles.loadingText}>
              Loading notifications...
            </AppText>
          </View>
        ) : totalFilteredCount === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Bell size={normalize(32)} color={colors.blue[400]} />
            </View>
            <AppText variant="body" weight="bold" style={styles.emptyTitle}>
              No Notifications
            </AppText>
            <AppText variant="caption" style={styles.emptySubtitle}>
              You are all caught up! New session updates and reminders will appear here.
            </AppText>
          </View>
        ) : (
          <>
            {/* Today Section */}
            {filteredToday.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <AppText variant="body" weight="bold" style={styles.sectionTitle}>
                    Today
                  </AppText>
                  <View style={styles.greenDot} />
                </View>

                {filteredToday.map((item) => (
                  <NotificationCard
                    key={item.id}
                    item={item}
                    onSelect={() => handleNotificationClick(item)}
                  />
                ))}
              </>
            )}

            {/* Yesterday Section */}
            {filteredYesterday.length > 0 && (
              <>
                <View style={[styles.sectionHeader, { marginTop: normalize(20) }]}>
                  <AppText variant="body" weight="bold" style={styles.sectionTitle}>
                    Yesterday
                  </AppText>
                </View>

                {filteredYesterday.map((item) => (
                  <NotificationCard
                    key={item.id}
                    item={item}
                    onSelect={() => handleNotificationClick(item)}
                  />
                ))}
              </>
            )}

            {/* Earlier Section */}
            {filteredEarlier.length > 0 && (
              <>
                <View style={[styles.sectionHeader, { marginTop: normalize(20) }]}>
                  <AppText variant="body" weight="bold" style={styles.sectionTitle}>
                    Earlier
                  </AppText>
                </View>

                {filteredEarlier.map((item) => (
                  <NotificationCard
                    key={item.id}
                    item={item}
                    onSelect={() => handleNotificationClick(item)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
    justifyContent: 'space-between',
    marginBottom: normalize(5),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.blue[700],
  },
  headerSpacer: {
    width: normalize(36),
  },
  markAllBtn: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
  },
  markAllText: {
    fontSize: normalize(11.5),
    color: colors.blue[600],
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    gap: normalize(8),
  },
  tabPill: {
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(7),
    borderRadius: normalize(99),
    backgroundColor: '#F1F5F9',
    minHeight: normalize(32),
  },
  tabPillActive: {
    backgroundColor: colors.lightAppTheme[950],
  },
  tabLabel: {
    fontSize: normalize(12),
    color: colors.typographyColor.Dark,
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
    gap: normalize(8),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: colors.appThemeColor[900],
  },
  greenDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.typographyColor['Dark 2'],
    marginTop: normalize(5),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    padding: normalize(14),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  unreadCard: {
    borderColor: '#BFDBFE',
    backgroundColor: '#F8FAFC',
  },
  unreadDot: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.blue[600],
  },
  iconBox: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(99),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  cardContent: {
    flex: 1,
    paddingRight: normalize(8),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(4),
  },
  cardTitle: {
    fontSize: normalize(13.5),
    color: colors.typographyColor.Black,
    flex: 1,
    marginRight: normalize(8),
  },
  cardTime: {
    fontSize: normalize(11),
    color: colors.typographyColor.Medium,
  },
  cardBody: {
    fontSize: normalize(12),
    color: colors.typographyColor.Medium,
    lineHeight: normalize(17),
  },
  highlightText: {
    color: colors.blue[600],
    fontSize: normalize(12),
  },
  loadingContainer: {
    paddingVertical: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: normalize(12),
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  emptyContainer: {
    paddingVertical: normalize(60),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(30),
  },
  emptyIconCircle: {
    width: normalize(70),
    height: normalize(70),
    borderRadius: normalize(35),
    backgroundColor: colors.lightTints.blueLightTint[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(16),
  },
  emptyTitle: {
    fontSize: normalize(16),
    color: colors.typographyColor.Black,
    marginBottom: normalize(6),
  },
  emptySubtitle: {
    fontSize: normalize(12.5),
    color: colors.typographyColor.Medium,
    textAlign: 'center',
    lineHeight: normalize(18),
  },
});
