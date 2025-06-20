import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lock, Shield } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function PrivacyDisclaimer() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Lock size={16} color={colors.darkGray} />
      </View>
      <Text style={styles.disclaimerText}>
        <Text style={styles.disclaimerTitle}>🔒 Conteúdo ocultado por privacidade{'\n'}</Text>
        De acordo com as diretrizes de privacidade e criptografia do WhatsApp, as mensagens e imagens não podem ser exibidas na íntegra. A verificação de fidelidade é feita com base em padrões de comportamento e metadados — como frequência de contato, conversas, horários e nomes salvos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(240, 240, 240, 0.95)',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    marginRight: 8,
    marginTop: 2,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: colors.darkGray,
    lineHeight: 16,
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});