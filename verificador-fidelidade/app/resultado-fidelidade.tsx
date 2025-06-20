import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function TelaResultadoFidelidade() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simular análise em andamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleVerRelatorio = () => {
    // Aqui você pode navegar para uma tela de relatório detalhado
    // ou mostrar mais informações
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Analisando conversas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <CheckCircle size={80} color={colors.accent} style={styles.icon} />
        
        <Text style={styles.resultTitle}>
          ✅ Após a verificação, concluímos que seu cônjuge é fiel!
        </Text>
        
        <Text style={styles.resultDescription}>
          Nenhum comportamento suspeito foi detectado nas últimas conversas do WhatsApp.
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleVerRelatorio}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  resultDescription: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});