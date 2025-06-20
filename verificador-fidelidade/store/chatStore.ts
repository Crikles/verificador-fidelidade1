import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat, Message, User } from '@/types/chat';
import { initialChats } from '@/mocks/chats';
import { currentUser } from '@/mocks/users';

interface ChatState {
  chats: Chat[];
  currentUser: User;
  activeChat: string | null;
  
  // Actions
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: initialChats,
      currentUser,
      activeChat: null,
      
      setActiveChat: (chatId) => set({ activeChat: chatId }),
      
      sendMessage: (chatId, text) => {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          text,
          timestamp: Date.now(),
          senderId: currentUser.id,
          status: 'sent',
        };
        
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, newMessage],
                lastMessageTimestamp: newMessage.timestamp,
              };
            }
            return chat;
          }),
        }));
        
        // Simulate message delivery after 1 second
        setTimeout(() => {
          set((state) => ({
            chats: state.chats.map((chat) => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  messages: chat.messages.map((msg) => {
                    if (msg.id === newMessage.id) {
                      return { ...msg, status: 'delivered' };
                    }
                    return msg;
                  }),
                };
              }
              return chat;
            }),
          }));
        }, 1000);
      },
      
      markAsRead: (chatId) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                unreadCount: 0,
                messages: chat.messages.map((msg) => {
                  if (msg.senderId === currentUser.id && msg.status === 'delivered') {
                    return { ...msg, status: 'read' };
                  }
                  return msg;
                }),
              };
            }
            return chat;
          }),
        }));
      },
      
      deleteMessage: (chatId, messageId) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: chat.messages.map((msg) => {
                  if (msg.id === messageId) {
                    return { ...msg, isDeleted: true, text: "Esta mensagem foi apagada" };
                  }
                  return msg;
                }),
              };
            }
            return chat;
          }),
        }));
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);