import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { AppStackParamList, NavigationProp } from '@navigation/types';

import { ChatHeader } from '../components/ChatHeader';
import { ChatMessageBubble, ChatMessageType } from '../components/ChatMessageBubble';
import { AudioMessageBubble, AudioMessageType } from '../components/AudioMessageBubble';
import { ChatInputBar } from '../components/ChatInputBar';
import LinearGradient from 'react-native-linear-gradient';
import { LockKeyhole } from 'lucide-react-native';
import { chatService, ChatMessage } from '../api/chatService';

type AnyMessageType =
  | (ChatMessageType & { type: 'text' })
  | (AudioMessageType & { type: 'audio' });

type ChatRouteProp = RouteProp<AppStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatRouteProp>();

  const [conversationId, setConversationId] = useState<string | undefined>(
    route.params?.conversationId
  );
  const [messages, setMessages] = useState<AnyMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const pollTimerRef = useRef<any>(null);

  const therapist = {
    name: route.params?.doctorName ?? 'Doctor',
    avatarUrl:
      route.params?.avatarUrl ??
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    role: route.params?.role ?? 'Clinical Psychologist',
    isOnline: true,
  };

  const isSelectionMode = selectedIds.size > 0;

  // Format message timestamp
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  // Map API message to UI message
  const mapApiMessage = (m: ChatMessage): AnyMessageType => ({
    id: m.uuid,
    type: (m.type === 'audio' ? 'audio' : 'text') as any,
    text: m.content,
    time: formatTime(m.created_at),
    isUser: m.is_me,
    isRead: m.is_read,
    senderAvatar: !m.is_me ? therapist.avatarUrl : undefined,
  });

  // Load messages from backend
  const loadMessages = useCallback(
    async (convId: string, showSpinner = false) => {
      if (showSpinner) setIsLoading(true);
      try {
        const data = await chatService.fetchMessages(convId);
        const mapped = data.map(mapApiMessage);
        setMessages(mapped);
        chatService.markAsRead(convId);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      } finally {
        if (showSpinner) setIsLoading(false);
      }
    },
    [therapist.avatarUrl]
  );

  // Initialize conversation if needed
  useEffect(() => {
    let isMounted = true;

    async function initChat() {
      let currentConvId = conversationId;

      if (!currentConvId && route.params?.professionalUuid) {
        try {
          const res = await chatService.initiateConversation(route.params.professionalUuid);
          currentConvId = res.uuid;
          if (isMounted) setConversationId(res.uuid);
        } catch (e) {
          console.error('Error initiating conversation:', e);
        }
      }

      if (currentConvId && isMounted) {
        await loadMessages(currentConvId, true);

        // Start fast 1.2s polling for real-time replies
        pollTimerRef.current = setInterval(() => {
          if (currentConvId) {
            loadMessages(currentConvId, false);
          }
        }, 1200);
      } else {
        setIsLoading(false);
      }
    }

    initChat();

    return () => {
      isMounted = false;
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [conversationId, route.params?.professionalUuid, loadMessages]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isSending) return;

    setInputText('');

    // Optimistic UI message
    const tempId = 'temp-' + Date.now();
    const optimisticMessage: AnyMessageType = {
      id: tempId,
      type: 'text',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
      isRead: false,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    let targetConvId = conversationId;

    try {
      setIsSending(true);

      if (!targetConvId && route.params?.professionalUuid) {
        const initRes = await chatService.initiateConversation(route.params.professionalUuid);
        targetConvId = initRes.uuid;
        setConversationId(initRes.uuid);
      }

      if (targetConvId) {
        const serverMsg = await chatService.sendMessage(targetConvId, text);
        // Replace optimistic message with server message
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? mapApiMessage(serverMsg) : msg))
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleMessageLongPress = (id: string) => {
    toggleSelection(id);
  };

  const handleMessagePress = (id: string) => {
    if (isSelectionMode) {
      toggleSelection(id);
    }
  };

  const handleDoubleTap = (id: string) => {
    if (isSelectionMode) return;

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            reaction: msg.reaction === 'heart' ? null : 'heart',
          };
        }
        return msg;
      })
    );
  };

  const confirmDelete = () => {
    setMessages((prev) => prev.filter((msg) => !selectedIds.has(msg.id)));
    setSelectedIds(new Set());
    setIsDeleteModalVisible(false);
  };

  const renderMessage = ({ item }: { item: AnyMessageType }) => {
    const isSelected = selectedIds.has(item.id);
    const commonProps = {
      isSelected,
      onLongPress: () => handleMessageLongPress(item.id),
      onDoubleTap: () => handleDoubleTap(item.id),
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleMessagePress(item.id)}
        style={[styles.chatInner, { width: '100%' }]}
      >
        {item.type === 'text' ? (
          <ChatMessageBubble message={item} {...commonProps} />
        ) : (
          <AudioMessageBubble message={item} {...commonProps} />
        )}
      </TouchableOpacity>
    );
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

      <ChatHeader
        selectionCount={selectedIds.size}
        onBack={() => navigation.goBack()}
        onClearSelection={() => setSelectedIds(new Set())}
        onDeleteSelection={() => setIsDeleteModalVisible(true)}
        therapist={therapist}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.blue[600]} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            ListHeaderComponent={
              <View style={styles.encryptionHeader}>
                <View style={styles.encryptionBadge}>
                  <LockKeyhole size={normalize(12)} color={colors.tintsGrey[500]} />
                  <AppText style={styles.encryptionText} weight="medium">
                    MESSAGES ARE END-TO-END ENCRYPTED
                  </AppText>
                </View>
                <View style={styles.dateSeparator}>
                  <AppText style={styles.dateText} family="secondary" weight="regular">
                    Today
                  </AppText>
                </View>
              </View>
            }
          />
        )}

        <ChatInputBar value={inputText} onChangeText={setInputText} onSend={handleSend} />
      </KeyboardAvoidingView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle} weight="semiBold">
              Delete {selectedIds.size} message{selectedIds.size > 1 ? 's' : ''}?
            </AppText>
            <AppText style={styles.modalDescription}>
              This will remove the selected messages for you.
            </AppText>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <AppText style={styles.cancelButtonText} weight="medium">
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <AppText style={styles.deleteButtonText} weight="semiBold">
                  Delete
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(16),
    flexGrow: 1,
  },
  chatInner: {
    marginVertical: normalize(2),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  encryptionHeader: {
    alignItems: 'center',
    marginVertical: normalize(14),
  },
  encryptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(99),
    gap: normalize(6),
    marginBottom: normalize(10),
  },
  encryptionText: {
    fontSize: normalize(9.5),
    color: '#64748B',
    letterSpacing: 0.5,
  },
  dateSeparator: {
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
  },
  dateText: {
    fontSize: normalize(11),
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(20),
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(20),
    width: '100%',
    maxWidth: normalize(320),
  },
  modalTitle: {
    fontSize: normalize(16),
    color: '#0F172A',
    marginBottom: normalize(6),
  },
  modalDescription: {
    fontSize: normalize(13),
    color: '#64748B',
    marginBottom: normalize(20),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: normalize(10),
  },
  modalButton: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    borderRadius: normalize(10),
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    color: '#475467',
    fontSize: normalize(13),
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
});
