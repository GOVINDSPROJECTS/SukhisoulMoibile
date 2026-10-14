import { api } from '@api/client';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { ChatMessage } from '../api/chatService';

type MessageCallback = (message: ChatMessage) => void;

interface RealtimeConfig {
  host: string;
  port: number;
  appKey: string;
  scheme: 'ws' | 'wss';
}

const DEFAULT_CONFIG: RealtimeConfig = {
  host: __DEV__ ? 'localhost' : 'api.sukhisoul.com',
  port: __DEV__ ? 8080 : 443,
  appKey: 'sukhisoul',
  scheme: __DEV__ ? 'ws' : 'wss',
};

class ChatRealtimeService {
  private socket: WebSocket | null = null;
  private socketId: string | null = null;
  private isConnecting: boolean = false;
  private activeSubscriptions = new Map<string, Set<MessageCallback>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private fallbackPollTimer: ReturnType<typeof setInterval> | null = null;
  private config: RealtimeConfig = DEFAULT_CONFIG;

  constructor() {
    this.connect();
  }

  public setConfig(customConfig: Partial<RealtimeConfig>) {
    this.config = { ...this.config, ...customConfig };
  }

  /**
   * Establish WebSocket connection to Pusher / Laravel Reverb
   */
  public connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      const url = `${this.config.scheme}://${this.config.host}:${this.config.port}/app/${this.config.appKey}?protocol=7&client=js&version=8.4.0&flash=false`;
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        this.isConnecting = false;
        console.log('[WebSocket] Connection opened to', this.config.host);
        this.startHeartbeat();
      };

      this.socket.onmessage = (event) => {
        this.handleSocketMessage(event.data);
      };

      this.socket.onerror = (err) => {
        console.warn('[WebSocket] Connection warning:', (err as any)?.message || 'Socket failed to connect');
        this.isConnecting = false;
      };

      this.socket.onclose = (event) => {
        console.log('[WebSocket] Connection closed:', event.code, event.reason);
        this.socket = null;
        this.socketId = null;
        this.isConnecting = false;
        this.stopHeartbeat();
        this.scheduleReconnect();
      };
    } catch (e) {
      console.warn('[WebSocket] Init failed:', e);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingTimer = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.activeSubscriptions.size > 0) {
        this.connect();
      }
    }, 10000);
  }

  /**
   * Handle incoming raw Pusher protocol frame
   */
  private handleSocketMessage(rawData: string) {
    try {
      const parsed = JSON.parse(rawData);
      const { event, channel, data } = parsed;

      if (event === 'pusher:connection_established') {
        const connData = typeof data === 'string' ? JSON.parse(data) : data;
        this.socketId = connData.socket_id;
        console.log('[WebSocket] Connected with socket_id:', this.socketId);

        // Re-subscribe any pending channels
        this.activeSubscriptions.forEach((_, conversationUuid) => {
          this.subscribeChannel(conversationUuid);
        });
        return;
      }

      if (event === 'pusher:ping') {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify({ event: 'pusher:pong', data: {} }));
        }
        return;
      }

      // Check for message.sent event
      if (event === 'message.sent' || event.endsWith('MessageSentEvent')) {
        const payload = typeof data === 'string' ? JSON.parse(data) : data;
        const convUuid = payload.conversation_id || channel?.replace('private-conversation.', '');

        if (convUuid && this.activeSubscriptions.has(convUuid)) {
          const callbacks = this.activeSubscriptions.get(convUuid);
          const authState = useAuthStore.getState();
          const currentUserId = authState.backendUser?.id;
          const isMe = payload.is_me !== undefined
            ? Boolean(payload.is_me)
            : Boolean(currentUserId && payload.sender_id === currentUserId);

          const formattedMessage: ChatMessage = {
            uuid: payload.uuid,
            sender_id: payload.sender_id,
            is_me: isMe,
            content: payload.content,
            type: payload.type || 'text',
            file_url: payload.file_url,
            file_size: payload.file_size,
            is_read: payload.is_read || false,
            created_at: payload.created_at || new Date().toISOString(),
          };

          callbacks?.forEach((cb) => {
            try {
              cb(formattedMessage);
            } catch (err) {
              console.error('[WebSocket] Callback error:', err);
            }
          });
        }
      }
    } catch (e) {
      // Non-JSON frame, ignore
    }
  }

  /**
   * Authenticate and join private channel for a conversation
   */
  private async subscribeChannel(conversationUuid: string) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN || !this.socketId) {
      return;
    }

    const channelName = `private-conversation.${conversationUuid}`;

    try {
      // Call backend to authorize socket for this private channel
      const res = await api.post('/v1/broadcasting/auth', {
        socket_id: this.socketId,
        channel_name: channelName,
      });

      const authData = res.data;
      if (authData?.auth && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            event: 'pusher:subscribe',
            data: {
              auth: authData.auth,
              channel: channelName,
            },
          })
        );
        console.log(`[WebSocket] Subscribed to ${channelName}`);
      }
    } catch (err) {
      console.warn(`[WebSocket] Channel auth failed for ${channelName}:`, err);
    }
  }

  /**
   * Subscribe to incoming messages for a specific conversation
   */
  public subscribeToConversation(
    conversationUuid: string,
    onMessage: MessageCallback
  ): () => void {
    if (!this.activeSubscriptions.has(conversationUuid)) {
      this.activeSubscriptions.set(conversationUuid, new Set());
      this.subscribeChannel(conversationUuid);
    }

    this.activeSubscriptions.get(conversationUuid)?.add(onMessage);

    // Make sure socket is active
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connect();
    }

    // Return unsubscribe cleaner
    return () => {
      const subs = this.activeSubscriptions.get(conversationUuid);
      if (subs) {
        subs.delete(onMessage);
        if (subs.size === 0) {
          this.activeSubscriptions.delete(conversationUuid);
          if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
              JSON.stringify({
                event: 'pusher:unsubscribe',
                data: {
                  channel: `private-conversation.${conversationUuid}`,
                },
              })
            );
          }
        }
      }
    };
  }

  public isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

export const chatRealtimeService = new ChatRealtimeService();
