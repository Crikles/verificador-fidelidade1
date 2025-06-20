import React, { useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useChatStore } from '@/store/chatStore';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import PrivacyDisclaimer from '@/components/PrivacyDisclaimer';
import colors from '@/constants/colors';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { chats, currentUser, sendMessage, markAsRead, deleteMessage } = useChatStore();
  const flatListRef = useRef<FlatList>(null);
  
  const chat = chats.find(c => c.id === id);
  
  useEffect(() => {
    if (chat && chat.unreadCount > 0) {
      markAsRead(chat.id);
    }
  }, [chat]);
  
  if (!chat) {
    return null;
  }
  
  const handleSendMessage = (text: string) => {
    sendMessage(chat.id, text);
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(chat.id, messageId);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ChatHeader chat={chat} />
      
      <PrivacyDisclaimer />
      
      <FlatList
        ref={flatListRef}
        data={chat.messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isFromCurrentUser={item.senderId === currentUser.id}
            onDelete={handleDeleteMessage}
          />
        )}
      />
      
      <ChatInput onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  messagesList: {
    padding: 10,
    paddingBottom: 20,
  },
});