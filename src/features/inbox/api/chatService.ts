import { api } from '@api/client';

export interface ConversationItem {
  uuid: string;
  professional_uuid?: string;
  other_user_name: string;
  other_user_avatar?: string | null;
  designation?: string;
  unread_count: number;
  last_message?: {
    content: string;
    type: 'text' | 'audio' | 'image' | 'document';
    created_at: string;
  } | null;
}

export interface ChatMessage {
  uuid: string;
  sender_id: number;
  is_me: boolean;
  content: string;
  type: 'text' | 'audio' | 'image' | 'document';
  file_url?: string | null;
  file_size?: number | null;
  is_read: boolean;
  created_at: string;
}

export const chatService = {
  /**
   * Fetch all conversations for the user
   */
  async fetchConversations(): Promise<ConversationItem[]> {
    const res = await api.get('/v1/conversations');
    return res.data.data || [];
  },

  /**
   * Start or get an existing conversation with a psychologist
   */
  async initiateConversation(professionalUuid: string): Promise<{ uuid: string; other_user_name: string }> {
    const res = await api.post('/v1/conversations/initiate', {
      professional_uuid: professionalUuid,
    });
    return res.data.data;
  },

  /**
   * Fetch message history for a conversation
   */
  async fetchMessages(conversationUuid: string): Promise<ChatMessage[]> {
    const res = await api.get(`/v1/conversations/${conversationUuid}/messages`);
    return res.data.data?.messages || [];
  },

  /**
   * Send a new message
   */
  async sendMessage(conversationUuid: string, content: string): Promise<ChatMessage> {
    const res = await api.post(`/v1/conversations/${conversationUuid}/messages`, {
      content,
      type: 'text',
    });
    return res.data.data;
  },

  /**
   * Mark all messages in a conversation as read
   */
  async markAsRead(conversationUuid: string): Promise<void> {
    try {
      await api.post(`/v1/conversations/${conversationUuid}/read`);
    } catch (e) {
      // Non-blocking
    }
  },

  /**
   * Delete a single message from the conversation
   */
  async deleteMessage(conversationUuid: string, messageUuid: string): Promise<void> {
    try {
      await api.delete(`/v1/conversations/${conversationUuid}/messages/${messageUuid}`);
    } catch (e) {
      console.warn('Failed to delete message on server:', e);
    }
  },

  /**
   * Bulk delete messages from the conversation
   */
  async deleteMessages(conversationUuid: string, messageUuids: string[]): Promise<void> {
    try {
      await api.delete(`/v1/conversations/${conversationUuid}/messages`, {
        data: { message_ids: messageUuids },
      });
    } catch (e) {
      console.warn('Failed to delete messages on server:', e);
    }
  },
};
