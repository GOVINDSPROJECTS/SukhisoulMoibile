import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ChevronRight } from 'lucide-react-native';

export const DailyAgendaTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Today' | 'Week'>('Today');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText family="primary" weight="bold" style={styles.title}>
          Daily Agenda
        </AppText>
        <TouchableOpacity style={styles.viewAllRow}>
          <AppText family="primary" weight="bold" style={styles.viewAllText}>
            View All
          </AppText>
          <ChevronRight size={normalize(12)} color="#1E62C4" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Today' && styles.activeTab]}
          onPress={() => setActiveTab('Today')}
        >
          <AppText family="primary" weight="bold" style={[styles.tabText, activeTab === 'Today' && styles.activeTabText]}>
            Today
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Week' && styles.activeTab]}
          onPress={() => setActiveTab('Week')}
        >
          <AppText family="primary" weight="bold" style={[styles.tabText, activeTab === 'Week' && styles.activeTabText]}>
            Week
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.timeline}>
        {/* Item 1 */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineIconContainer}>
            <View style={styles.greenDot} />
            <View style={styles.line} />
          </View>
          <View style={[styles.timelineCard, { backgroundColor: '#F0F9FF', borderColor: '#E0F2FE' }]}>
            <View style={styles.cardHeader}>
              <AppText family="primary" weight="bold" style={styles.timeText}>
                10:00 AM - 10:45 AM
              </AppText>
              <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                <AppText family="primary" weight="bold" style={[styles.badgeText, { color: '#16A34A' }]}>
                  UPCOMING
                </AppText>
              </View>
            </View>
            <AppText family="primary" weight="bold" style={styles.itemName}>
              Prathmesh Deokar
            </AppText>
            <AppText family="primary" weight="medium" style={styles.itemDesc}>
              Cognitive Behavioral Therapy session for stress reduction.
            </AppText>
          </View>
        </View>

        {/* Item 2 */}
        <View style={[styles.timelineItem, { marginBottom: 0 }]}>
          <View style={styles.timelineIconContainer}>
            <View style={styles.blueDot} />
          </View>
          <View style={[styles.timelineCard, { backgroundColor: '#FFFFFF', borderColor: '#F1F5F9' }]}>
            <View style={styles.cardHeader}>
              <AppText family="primary" weight="bold" style={styles.timeText}>
                12:00 PM - 12:45 PM
              </AppText>
              <View style={[styles.badge, { backgroundColor: '#F1F5F9' }]}>
                <AppText family="primary" weight="bold" style={[styles.badgeText, { color: '#64748B' }]}>
                  PENDING
                </AppText>
              </View>
            </View>
            <AppText family="primary" weight="bold" style={styles.itemName}>
              Clarique Bhanadrakal
            </AppText>
            <AppText family="primary" weight="medium" style={styles.itemDesc}>
              Initial Therapy Assessment
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  title: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: normalize(10),
    color: '#1E62C4',
    marginRight: normalize(2),
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  tab: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(16),
    marginRight: normalize(8),
    backgroundColor: '#F8FAFC',
  },
  activeTab: {
    backgroundColor: '#1E62C4',
  },
  tabText: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  timeline: {
    paddingLeft: normalize(4),
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: normalize(16),
  },
  timelineIconContainer: {
    width: normalize(20),
    alignItems: 'center',
    marginRight: normalize(12),
  },
  greenDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#16A34A',
    borderWidth: 2,
    borderColor: '#DCFCE7',
    zIndex: 2,
  },
  blueDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    backgroundColor: '#1E62C4',
    borderWidth: 2,
    borderColor: '#DBEAFE',
    zIndex: 2,
    marginTop: normalize(16),
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    position: 'absolute',
    top: normalize(12),
    bottom: -normalize(24),
    zIndex: 1,
  },
  timelineCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: normalize(12),
    padding: normalize(12),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  timeText: {
    fontSize: normalize(10),
    color: '#1E62C4',
  },
  badge: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(8),
  },
  badgeText: {
    fontSize: normalize(8),
  },
  itemName: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(4),
  },
  itemDesc: {
    fontSize: normalize(11),
    color: '#64748B',
    lineHeight: normalize(16),
  },
});
