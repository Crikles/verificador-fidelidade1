import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, CheckCheck, Trash2 } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Message } from '@/types/chat';
import { formatTime } from '@/utils/date';
import colors from '@/constants/colors';

interface MessageBubbleProps {
  message: Message;
  isFromCurrentUser: boolean;
  onDelete?: (messageId: string) => void;
}

export default function MessageBubble({ 
  message, 
  isFromCurrentUser,
  onDelete
}: MessageBubbleProps) {
  const [showActions, setShowActions] = React.useState(false);
  
  const handleLongPress = () => {
    if (isFromCurrentUser && !message.isDeleted) {
      setShowActions(true);
    }
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(message.id);
      setShowActions(false);
    }
  };

  return (
    <View style={[
      styles.container,
      isFromCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={handleLongPress}
        onPress={() => setShowActions(false)}
        style={[
          styles.bubble,
          isFromCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
          message.isDeleted && styles.deletedBubble
        ]}
      >
        <View style={styles.messageTextContainer}>
          <Text style={[
            styles.messageText,
            message.isDeleted && styles.deletedText
          ]}>
            {message.text}
          </Text>
          <BlurView intensity={40} style={styles.blurTextOverlay} tint={isFromCurrentUser ? "default" : "light"} />
        </View>
        
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
          
          {isFromCurrentUser && !message.isDeleted && (
            <View style={styles.statusContainer}>
              {message.status === 'read' ? (
                <CheckCheck size={14} color={colors.blue} />
              ) : message.status === 'delivered' ? (
                <CheckCheck size={14} color={colors.darkGray} />
              ) : (
                <Check size={14} color={colors.darkGray} />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <Trash2 size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    overflow: 'hidden',
  },
  currentUserBubble: {
    backgroundColor: colors.lightGreen,
    borderTopRightRadius: 2,
  },
  otherUserBubble: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 2,
  },
  deletedBubble: {
    backgroundColor: colors.mediumGray,
  },
  messageTextContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  messageText: {
    fontSize: 16,
    color: colors.black,
  },
  blurTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  deletedText: {
    fontStyle: 'italic',
    color: colors.darkGray,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 11,
    color: colors.darkGray,
    marginRight: 4,
  },
  statusContainer: {
    marginLeft: 2,
  },
  actionsContainer: {
    position: 'absolute',
    top: -40,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
});