import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Chat } from '@/types/chat';
import { formatTime } from '@/utils/date';
import colors from '@/constants/colors';

interface ChatListItemProps {
  chat: Chat;
  onPress: (chatId: string) => void;
}

export default function ChatListItem({ chat, onPress }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const isLastMessageFromCurrentUser = lastMessage?.senderId === 'user-current';
  
  // Get the other participant for 1:1 chats, or use group info
  const chatName = chat.isGroup 
    ? chat.groupName 
    : chat.participants.find(p => p.id !== 'user-current')?.name || '';
  
  const chatAvatar = chat.isGroup 
    ? chat.groupAvatar 
    : chat.participants.find(p => p.id !== 'user-current')?.avatar || '';
  
  // Truncate message text if too long
  const messagePreview = lastMessage?.isDeleted 
    ? "Esta mensagem foi apagada" 
    : lastMessage?.text || '';
  
  const truncatedMessage = messagePreview.length > 40 
    ? `${messagePreview.substring(0, 37)}...` 
    : messagePreview;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(chat.id)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chatAvatar }} style={styles.avatarImage} />
        <BlurView intensity={50} style={styles.blurOverlay} tint="light" />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{chatName}</Text>
          <Text style={styles.time}>{lastMessage ? formatTime(lastMessage.timestamp) : ''}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <View style={styles.messagePreview}>
            {isLastMessageFromCurrentUser && (
              <View style={styles.statusContainer}>
                {lastMessage?.status === 'read' ? (
                  <CheckCheck size={16} color={colors.blue} />
                ) : lastMessage?.status === 'delivered' ? (
                  <CheckCheck size={16} color={colors.darkGray} />
                ) : (
                  <Check size={16} color={colors.darkGray} />
                )}
              </View>
            )}
            <View style={styles.blurredTextContainer}>
              <Text 
                style={[
                  styles.message, 
                  chat.unreadCount > 0 && !isLastMessageFromCurrentUser && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {isLastMessageFromCurrentUser ? 'Você: ' : ''}{truncatedMessage}
              </Text>
              <BlurView intensity={30} style={styles.blurTextOverlay} tint="light" />
            </View>
          </View>
          
          {chat.unreadCount > 0 && !isLastMessageFromCurrentUser && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    backgroundColor: colors.white,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  time: {
    fontSize: 12,
    color: colors.darkGray,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    marginRight: 4,
  },
  blurredTextContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  message: {
    fontSize: 14,
    color: colors.darkGray,
  },
  blurTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unreadMessage: {
    fontWeight: '500',
    color: colors.black,
  },
  unreadBadge: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});