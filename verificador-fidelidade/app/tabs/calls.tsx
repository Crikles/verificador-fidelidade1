import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Plus } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { users } from '@/mocks/users';
import colors from '@/constants/colors';
import PrivacyDisclaimer from '@/components/PrivacyDisclaimer';

// Generate mock call history
const callHistory = users.slice(0, 5).map((user, index) => {
  const callTypes = ['incoming', 'outgoing', 'missed', 'incoming', 'outgoing'];
  const callType = callTypes[index % callTypes.length];
  
  const timeAgo = ['5 min atrás', '1 hora atrás', 'Ontem, 20:30', 'Ontem, 15:45', '2 dias atrás'];
  
  return {
    id: `call-${index}`,
    user,
    type: callType,
    time: timeAgo[index],
    isVideoCall: index % 3 === 0,
  };
});

export default function CallsScreen() {
  const renderCallIcon = (type: string, isVideoCall: boolean) => {
    const iconColor = type === 'missed' ? colors.red : colors.accent;
    
    if (type === 'incoming') {
      return <PhoneIncoming size={18} color={iconColor} />;
    } else if (type === 'outgoing') {
      return <PhoneOutgoing size={18} color={iconColor} />;
    } else {
      return <PhoneMissed size={18} color={iconColor} />;
    }
  };

  return (
    <View style={styles.container}>
      <PrivacyDisclaimer />
      
      <FlatList
        data={callHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.callItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <BlurView intensity={50} style={styles.blurOverlay} tint="light" />
            </View>
            
            <View style={styles.callInfo}>
              <Text style={styles.userName}>{item.user.name}</Text>
              
              <View style={styles.callDetails}>
                {renderCallIcon(item.type, item.isVideoCall)}
                <Text style={[
                  styles.callType,
                  item.type === 'missed' && styles.missedCall
                ]}>
                  {item.isVideoCall ? 'Chamada de vídeo ' : 'Chamada de voz '}
                  {item.type === 'incoming' ? 'recebida' : 
                   item.type === 'outgoing' ? 'realizada' : 'perdida'}
                </Text>
              </View>
            </View>
            
            <View style={styles.callActions}>
              <Text style={styles.callTime}>{item.time}</Text>
              <TouchableOpacity style={styles.callButton}>
                <Phone size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Phone size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  avatar: {
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
  callInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callType: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 6,
  },
  missedCall: {
    color: colors.red,
  },
  callActions: {
    alignItems: 'flex-end',
  },
  callTime: {
    fontSize: 12,
    color: colors.darkGray,
    marginBottom: 8,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
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