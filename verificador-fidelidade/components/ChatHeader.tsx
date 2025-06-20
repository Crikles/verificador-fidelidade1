import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, MoreVertical, Phone, Video, Lock } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Chat } from '@/types/chat';
import { formatLastSeen } from '@/utils/date';
import colors from '@/constants/colors';

interface ChatHeaderProps {
  chat: Chat;
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const router = useRouter();
  
  // Get the other participant for 1:1 chats, or use group info
  const chatName = chat.isGroup 
    ? chat.groupName 
    : chat.participants.find(p => p.id !== 'user-current')?.name || '';
  
  const chatAvatar = chat.isGroup 
    ? chat.groupAvatar 
    : chat.participants.find(p => p.id !== 'user-current')?.avatar || '';
  
  const otherUser = chat.participants.find(p => p.id !== 'user-current');
  const statusText = chat.isGroup 
    ? `${chat.participants.length} participantes` 
    : otherUser?.status === 'online' 
      ? 'Online'
      : formatLastSeen(otherUser?.lastSeen);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.8}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: chatAvatar }} style={styles.avatar} />
            <BlurView intensity={50} style={styles.blurOverlay} tint="dark" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>{chatName}</Text>
            <Text style={styles.status} numberOfLines={1}>{statusText}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Video size={22} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <Phone size={22} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <MoreVertical size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    height: 60,
    paddingHorizontal: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
});