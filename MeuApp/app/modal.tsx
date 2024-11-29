import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quem somos?</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <div style= {styles.caixa}><text>O Família Financeira nasceu de uma experiência pessoal. Seu criador, ao perceber as dificuldades de organizar as finanças da própria família, decidiu criar uma solução simples e acessível para ajudar as famílias a controlarem seus gastos de forma colaborativa. Com o app, cada membro da família pode registrar seus gastos, definir orçamentos e acompanhar as finanças de maneira conjunta. Criado por uma única pessoa, o Família Financeira tem como missão tornar o gerenciamento financeiro mais fácil, transparente e eficiente, ajudando a transformar a organização de gastos em um trabalho em equipe. Seja bem-vindo ao Família Financeira, onde juntos, sua família pode alcançar mais equilíbrio financeiro!</text>
        </div>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  caixa: {
    marginVertical: 30,
    height: 'auto', // A altura agora é ajustada automaticamente de acordo com o conteúdo
    width: '80%',
    backgroundColor: 'lightgray',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify', // Alinha o texto ao centro
    overflow: 'hidden', // Garante que o texto não saia da caixa
  },
});
