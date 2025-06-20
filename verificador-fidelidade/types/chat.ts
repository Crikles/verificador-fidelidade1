export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  senderId: string;
  status: 'sent' | 'delivered' | 'read';
  isDeleted?: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  lastMessageTimestamp: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}