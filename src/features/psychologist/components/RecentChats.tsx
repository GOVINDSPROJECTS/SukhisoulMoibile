import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { ChatCard } from './ChatCard';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';
import { chatService, ConversationItem } from '../../inbox/api/chatService';

export const RecentChats: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await chatService.fetchConversations();
        setConversations(data.slice(0, 3));
      } catch (e) {
        console.error('Error fetching recent chats:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleChatPress = (chat: ConversationItem) => {
    navigation.navigate('Chat', {
      conversationId: chat.uuid,
      professionalUuid: chat.professional_uuid,
      doctorName: chat.other_user_name,
      avatarUrl: chat.other_user_avatar || undefined,
      role: chat.designation,
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
        Recent Chats
      </AppText>

      {isLoading ? (
        <ActivityIndicator size="small" color="#0066CC" style={{ marginVertical: normalize(12) }} />
      ) : conversations.length > 0 ? (
        conversations.map((c) => (
          <ChatCard
            key={c.uuid}
            avatar={
              c.other_user_avatar ||
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
            }
            drName={c.other_user_name}
            chatSnippet={c.last_message?.content || 'Tap to open chat'}
            chatTime="Recent"
            onPress={() => handleChatPress(c)}
          />
        ))
      ) : (
        <ChatCard
          avatar="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=150"
          drName="Dr. Sameer Joshi"
          chatSnippet="Hello! Welcome to SukhiSoul. How are you feeling today?"
          chatTime="1h ago"
          onPress={() =>
            navigation.navigate('Chat', {
              doctorName: 'Dr. Sameer Joshi',
              role: 'M.D. in Psychiatry',
            })
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    color: '#2D3432',
  },
});
