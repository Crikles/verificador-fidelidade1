import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Plus, Camera, Lock } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { users } from '@/mocks/users';
import colors from '@/constants/colors';
import PrivacyDisclaimer from '@/components/PrivacyDisclaimer';

// Filter out the current user
const otherUsers = users.filter(user => user.id !== 'user-current');

export default function StatusScreen() {
  return (
    <View style={styles.container}>
      <PrivacyDisclaimer />
      
      {/* My Status */}
      <View style={styles.myStatusContainer}>
        <View style={styles.myStatusHeader}>
          <View style={styles.myAvatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
              style={styles.myAvatar} 
            />
            <BlurView intensity={50} style={styles.blurOverlay} tint="light" />
            <View style={styles.addStatusButton}>
              <Plus size={18} color={colors.white} />
            </View>
          </View>
          
          <View style={styles.myStatusInfo}>
            <Text style={styles.myStatusTitle}>Meu status</Text>
            <Text style={styles.myStatusSubtitle}>Toque para atualizar seu status</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Recent Updates */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Atualizações recentes</Text>
        
        <FlatList
          data={otherUsers.slice(0, 3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.statusItem}>
              <View style={styles.statusRing}>
                <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
                <BlurView intensity={50} style={styles.blurOverlay} tint="light" />
              </View>
              
              <View style={styles.statusInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.statusTime}>Hoje, 10:30</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {/* Viewed Updates */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Visualizados</Text>
        
        <FlatList
          data={otherUsers.slice(3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.statusItem}>
              <View style={[styles.statusRing, styles.viewedRing]}>
                <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
                <BlurView intensity={50} style={styles.blurOverlay} tint="light" />
              </View>
              
              <View style={styles.statusInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.statusTime}>Ontem, 20:15</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  myStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  myStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myAvatarContainer: {
    position: 'relative',
    marginRight: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  myAvatar: {
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
  addStatusButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
    zIndex: 2,
  },
  myStatusInfo: {
    flex: 1,
  },
  myStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  myStatusSubtitle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  cameraButton: {
    backgroundColor: colors.accent,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.darkGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
  },
  statusRing: {
    padding: 3,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.accent,
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  viewedRing: {
    borderColor: colors.darkGray,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  statusInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  statusTime: {
    fontSize: 14,
    color: colors.darkGray,
  },
});