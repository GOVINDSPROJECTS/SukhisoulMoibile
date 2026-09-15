import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Search } from 'lucide-react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

import { InboxFilterTabs, InboxFilterTab } from '../components/InboxFilterTabs';
import { ChatListItem, ChatListType } from '../components/ChatListItem';
import { OnlineTherapistItem, OnlineTherapistType } from '../components/OnlineTherapistItem';
import LinearGradient from 'react-native-linear-gradient';
import { chatService, ConversationItem } from '../api/chatService';
import { useProfessionals } from '@features/home/hooks/useProfessionals';
import { getProfessionalAvatar, getPrimaryExpertise, resolveImageUrl, Professional } from '@api/professionals';

export const InboxListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  const [activeTab, setActiveTab] = useState<InboxFilterTab>('All');
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Live online professionals from database
  const { data: apiData } = useProfessionals({ per_page: 10 });
  const professionals: Professional[] = apiData?.data || [];

  const loadConversations = useCallback(async () => {
    try {
      const data = await chatService.fetchConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadConversations();
    }
  }, [isFocused, loadConversations]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadConversations();
  }, [loadConversations]);

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  // Convert API conversations to ChatListType
  const chatListItems: ChatListType[] = conversations.map((c) => ({
    id: c.uuid,
    name: c.other_user_name,
    avatarUrl:
      resolveImageUrl(c.other_user_avatar) ||
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    isOnline: true,
    lastMessage: c.last_message?.content || 'Tap to start conversation',
    time: formatTime(c.last_message?.created_at),
    unreadCount: c.unread_count || 0,
    subtitle: c.designation,
  }));

  // Filter based on active tab
  const filteredChats = chatListItems.filter((chat) => {
    if (activeTab === 'Support') return chat.name.toLowerCase().includes('support');
    return true;
  });

  // Online therapists mapping
  const onlineTherapists: OnlineTherapistType[] = professionals.slice(0, 6).map((pro: Professional) => ({
    id: pro.uuid,
    name: pro.user?.name ?? 'Dr. Expert',
    avatarUrl: getProfessionalAvatar(pro),
    specialty: getPrimaryExpertise(pro) || 'Clinical Psychology',
    availability: 'Available now',
    availableColor: '#10B981',
  }));

  const handleChatPress = (chat: ConversationItem) => {
    navigation.navigate('Chat', {
      conversationId: chat.uuid,
      professionalUuid: chat.professional_uuid,
      doctorName: chat.other_user_name,
      avatarUrl: resolveImageUrl(chat.other_user_avatar) || undefined,
      role: chat.designation,
    });
  };

  const handleOnlineTherapistPress = async (therapist: OnlineTherapistType) => {
    try {
      // Find existing conversation or initiate new one
      const existing = conversations.find((c) => c.professional_uuid === therapist.id);
      if (existing) {
        handleChatPress(existing);
        return;
      }

      const res = await chatService.initiateConversation(therapist.id);
      navigation.navigate('Chat', {
        conversationId: res.uuid,
        professionalUuid: therapist.id,
        doctorName: therapist.name,
        avatarUrl: therapist.avatarUrl,
        role: therapist.specialty,
      });
    } catch (e) {
      console.error('Error starting conversation:', e);
      navigation.navigate('Chat', {
        professionalUuid: therapist.id,
        doctorName: therapist.name,
        avatarUrl: therapist.avatarUrl,
        role: therapist.specialty,
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />
      <LinearGradient
        colors={[colors.lightTints.blueLightTint[50], '#D9EEFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ paddingTop: normalize(10) }}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <AppText style={styles.headerTitle} weight="bold" family="secondary">
            Inbox
          </AppText>
          <AppText style={styles.headerSubtitle} weight="regular">
            All your conversations with psychologists
          </AppText>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate('ExplorePsychologists')}
        >
          <Search size={normalize(18)} color={colors.lightAppTheme[950]} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + normalize(20) }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.blue[600]]} />
        }
      >
        <InboxFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Recent Chats Section */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle} weight="semiBold" family="secondary">
            Recent Chats
          </AppText>
        </View>

        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color={colors.blue[600]} />
          </View>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const rawConv = conversations.find((c) => c.uuid === chat.id);
            return (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onPress={() => rawConv && handleChatPress(rawConv)}
              />
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <AppText variant="body" weight="medium" style={styles.emptyText}>
              No active conversations yet
            </AppText>
            <AppText variant="caption" style={styles.emptySubtext}>
              Tap an online doctor below to start chatting!
            </AppText>
          </View>
        )}

        {/* Online Psychologists Section */}
        <View style={[styles.sectionHeader, styles.onlineHeader]}>
          <View style={styles.onlineHeaderLeft}>
            <AppText style={styles.sectionTitle} weight="semiBold" family="secondary">
              Available Psychologists
            </AppText>
            <AppText style={styles.sectionSubtitle} weight="regular">
              Instant chat & consultation available
            </AppText>
          </View>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineBadgeDot} />
            <AppText style={styles.onlineBadgeText} weight="semiBold">
              {onlineTherapists.length} Online
            </AppText>
          </View>
        </View>

        {onlineTherapists.map((therapist) => (
          <OnlineTherapistItem
            key={therapist.id}
            therapist={therapist}
            onChatPress={() => handleOnlineTherapistPress(therapist)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(16),
    backgroundColor: '#D9EEFF',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: normalize(24),
    color: '#0F172A',
    marginBottom: normalize(2),
  },
  headerSubtitle: {
    fontSize: normalize(12),
    color: '#64748B',
  },
  searchButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: normalize(16),
  },
  sectionHeader: {
    paddingHorizontal: normalize(20),
    marginBottom: normalize(12),
    marginTop: normalize(8),
  },
  sectionTitle: {
    fontSize: normalize(16),
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: normalize(11),
    color: '#64748B',
    marginTop: normalize(1),
  },
  onlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  onlineHeaderLeft: {
    flex: 1,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    borderRadius: normalize(99),
  },
  onlineBadgeDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    backgroundColor: '#16A34A',
    marginRight: normalize(6),
  },
  onlineBadgeText: {
    color: '#15803D',
    fontSize: normalize(11),
  },
  loadingWrapper: {
    paddingVertical: normalize(30),
    alignItems: 'center',
  },
  emptyContainer: {
    padding: normalize(24),
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: normalize(20),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyText: {
    color: '#334155',
    marginBottom: normalize(4),
  },
  emptySubtext: {
    color: '#94A3B8',
    textAlign: 'center',
  },
});
