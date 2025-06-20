import { Chat, Message } from '@/types/chat';
import { currentUser, users } from './users';

// Helper to generate random messages
const generateMessages = (chatId: string, count: number): Message[] => {
  const messages: Message[] = [];
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < count; i++) {
    const isFromCurrentUser = Math.random() > 0.5;
    const senderId = isFromCurrentUser ? currentUser.id : chatId.replace('chat-', 'user-');
    
    // Random time within the last 7 days
    const timestamp = now - Math.floor(Math.random() * 7 * day);
    
    // Random status for sent messages
    const statusOptions: Message['status'][] = ['sent', 'delivered', 'read'];
    const status = isFromCurrentUser 
      ? statusOptions[Math.floor(Math.random() * statusOptions.length)]
      : 'read';
    
    messages.push({
      id: `msg-${chatId}-${i}`,
      text: getRandomMessage(),
      timestamp,
      senderId,
      status,
    });
  }
  
  // Sort by timestamp
  return messages.sort((a, b) => a.timestamp - b.timestamp);
};

// Random message templates
const getRandomMessage = (): string => {
  const messages = [
    "Olá, tudo bem?",
    "Como vai seu dia?",
    "Vamos almoçar juntos hoje?",
    "Você viu as notícias?",
    "Preciso da sua ajuda com um projeto",
    "Que horas é a reunião amanhã?",
    "Feliz aniversário!",
    "Obrigado pela ajuda ontem",
    "Podemos conversar mais tarde?",
    "Estou atrasado, desculpe",
    "Vou chegar em 10 minutos",
    "Já terminou aquele relatório?",
    "Vamos ao cinema este fim de semana?",
    "O que achou daquele restaurante?",
    "Não vou poder ir hoje, desculpe",
    "Você tem o número da Ana?",
    "Manda o endereço por favor",
    "Conseguiu resolver aquele problema?",
    "Bom dia! Como está?",
    "Boa noite, até amanhã"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Generate individual chats
export const generateChats = (): Chat[] => {
  return users.map((user, index) => {
    const isGroup = index > 5;
    const messageCount = 5 + Math.floor(Math.random() * 20);
    const messages = generateMessages(`chat-${user.id}`, messageCount);
    const lastMessage = messages[messages.length - 1];
    
    return {
      id: `chat-${user.id}`,
      participants: isGroup ? [currentUser, ...users.slice(0, 3)] : [currentUser, user],
      messages,
      unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
      lastMessageTimestamp: lastMessage?.timestamp || Date.now(),
      isGroup: isGroup,
      groupName: isGroup ? user.name : undefined,
      groupAvatar: isGroup ? user.avatar : undefined,
    };
  });
};

// Initial chats data
export const initialChats = generateChats();