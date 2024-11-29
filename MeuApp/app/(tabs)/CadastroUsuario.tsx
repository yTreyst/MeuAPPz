import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useUserContext } from './UserContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CadastroUsuario() {
  const { addPessoa } = useUserContext();
  const [novoNome, setNovoNome] = useState('');
  const [novoGanho, setNovoGanho] = useState('');

  const handleAddPessoa = () => {
    if (!novoNome || !novoGanho) {
      alert('Preencha todos os campos para adicionar um usuário!');
      return;
    }

    const novaPessoa = {
      id: Date.now(),
      nome: novoNome,
      ganhoMensal: parseFloat(novoGanho),
      gastos: [],
    };

    addPessoa(novaPessoa);
    setNovoNome('');
    setNovoGanho('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome name="user-plus" size={24} color="#000" style={styles.icon} />
        <Text style={styles.title}>Cadastrar Usuário</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={novoNome}
        onChangeText={setNovoNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Ganho Mensal"
        keyboardType="numeric"
        value={novoGanho}
        onChangeText={setNovoGanho}
      />
      <View style={styles.buttonContainer}>
        <Button color={'#2a95ff'} title="Adicionar Pessoa" onPress={handleAddPessoa} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c8c8c8',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center', // Centraliza o botão horizontalmente
    marginTop: 10, // Espaço acima do botão
  },
});
