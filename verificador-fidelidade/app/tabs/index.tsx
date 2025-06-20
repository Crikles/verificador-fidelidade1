import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageSquarePlus, ShieldCheck } from 'lucide-react-native';
import { useChatStore } from '@/store/chatStore';
import ChatListItem from '@/components/ChatListItem';
import PrivacyDisclaimer from '@/components/PrivacyDisclaimer';
import colors from '@/constants/colors';

export default function ChatsScreen() {
  const router = useRouter();
  const { chats, setActiveChat } = useChatStore();
  
  // Sort chats by last message timestamp (most recent first)
  const sortedChats = [...chats].sort(
    (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp
  );
  
  const handleChatPress = (chatId: string) => {
    setActiveChat(chatId);
    router.push(`/chat/${chatId}`);
  };

  const handleVerificarFidelidade = () => {
    router.push('/resultado-fidelidade');
  };

  return (
    <View style={styles.container}>
      <PrivacyDisclaimer />
      
      <TouchableOpacity 
        style={styles.verificarButton}
        onPress={handleVerificarFidelidade}
        activeOpacity={0.8}
      >
        <ShieldCheck size={20} color={colors.white} />
        <Text style={styles.verificarText}>Verificar Fidelidade</Text>
      </TouchableOpacity>
      
      <FlatList
        data={sortedChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem chat={item} onPress={handleChatPress} />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <MessageSquarePlus size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  listContent: {
    flexGrow: 1,
  },
  verificarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  verificarText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});