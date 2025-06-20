import { User } from '@/types/chat';

export const currentUser: User = {
  id: 'user-current',
  name: 'Me',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  status: 'online',
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
  {
    id: 'user-2',
    name: 'Maria Oliveira',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'offline',
    lastSeen: '2023-06-20T14:30:00',
  },
  {
    id: 'user-3',
    name: 'Pedro Santos',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
  {
    id: 'user-4',
    name: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'offline',
    lastSeen: '2023-06-19T23:15:00',
  },
  {
    id: 'user-5',
    name: 'Lucas Ferreira',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
  {
    id: 'user-6',
    name: 'Juliana Almeida',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'offline',
    lastSeen: '2023-06-20T09:45:00',
  },
  {
    id: 'user-7',
    name: 'Família',
    avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
  {
    id: 'user-8',
    name: 'Trabalho',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    status: 'online',
  },
];