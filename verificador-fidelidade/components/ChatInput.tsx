import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Send, Mic, Paperclip, Camera } from 'lucide-react-native';
import colors from '@/constants/colors';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Paperclip size={22} color={colors.darkGray} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
        />
        
        <TouchableOpacity style={styles.iconButton}>
          <Camera size={22} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.sendButton}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        {message.trim() ? (
          <Send size={22} color={colors.white} />
        ) : (
          <Mic size={22} color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});