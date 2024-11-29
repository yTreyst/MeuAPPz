import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Pressable } from 'react-native';
import { useUserContext } from './UserContext';

export default function GastoseGanhos() {
  const { pessoas, updatePessoa, removePessoa } = useUserContext();
  const [expandido, setExpandido] = useState<number | null>(null);
  const [descricaoGasto, setDescricaoGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');

  const addGasto = (id: number) => {
    const novoGasto = {
      id: Date.now(),
      descricao: descricaoGasto,
      valor: parseFloat(valorGasto),
    };

    updatePessoa(id, {
      gastos: [...pessoas.find((pessoa) => pessoa.id === id)?.gastos!, novoGasto],
    });

    setDescricaoGasto('');
    setValorGasto('');
  };

  const removeGasto = (id: number, gastoId: number) => {
    const pessoa = pessoas.find((p) => p.id === id);
    if (!pessoa) return;

    const novosGastos = pessoa.gastos.filter((gasto) => gasto.id !== gastoId);
    updatePessoa(id, { gastos: novosGastos });
  };

  const excluirUsuario = (id: number) => {
    removePessoa(id);
  };

  return (
    <View style={styles.container}>
      {pessoas.length === 0 ? (
        <Text style={styles.noUserText}>
          Não há nenhum usuário cadastrado neste dispositivo até o momento.
        </Text>
      ) : (
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const somaGastos = item.gastos.reduce((total, gasto) => total + gasto.valor, 0);
            const saldoRestante = item.ganhoMensal - somaGastos;

            return (
              <View style={styles.caixa}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.ganhoMensal}>Ganho Mensal: R${item.ganhoMensal.toFixed(2)}</Text>
                <Text style={styles.saldo}>Saldo Restante: R${saldoRestante.toFixed(2)}</Text>
                <View style={styles.buttonContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      { backgroundColor: pressed ? '#2a95ff' : '#2a95ff' },
                    ]}
                    onPress={() => setExpandido(expandido === item.id ? null : item.id)}
                  >
                    <Text style={styles.buttonText}>
                      {expandido === item.id ? 'Esconder Detalhes' : 'Ver Detalhes'}
                    </Text>
                  </Pressable>
                </View>
                {expandido === item.id && (
                  <View style={styles.detalhes}>
                    <Text>Detalhes do usuário:</Text>
                    {item.gastos.length > 0 ? (
                      <FlatList
                        data={item.gastos}
                        keyExtractor={(gasto) => gasto.id.toString()}
                        renderItem={({ item: gasto }) => (
                          <View style={styles.gasto}>
                            <Text>{gasto.descricao}: R${gasto.valor.toFixed(2)}</Text>
                            <Pressable
                              style={styles.button}
                              onPress={() => removeGasto(item.id, gasto.id)}
                            >
                              <Text style={styles.buttonText}>Excluir</Text>
                            </Pressable>
                          </View>
                        )}
                      />
                    ) : (
                      <Text>Nenhum gasto registrado.</Text>
                    )}
                    <TextInput
                      style={styles.input}
                      value={descricaoGasto}
                      onChangeText={setDescricaoGasto}
                      placeholder="Descrição do Gasto"
                    />
                    <TextInput
                      style={styles.input}
                      value={valorGasto}
                      onChangeText={setValorGasto}
                      placeholder="Valor do Gasto"
                      keyboardType="numeric"
                    />
                    <Pressable
                      style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#2a95ff' : '#2a95ff' },
                      ]}
                      onPress={() => addGasto(item.id)}
                    >
                      <Text style={styles.buttonText}>Adicionar Gasto</Text>
                    </Pressable>
                    <Pressable
                      style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#2a95ff' : '#2a95ff' },
                      ]}
                      onPress={() => excluirUsuario(item.id)}
                    >
                      <Text style={styles.buttonText}>Excluir Usuário</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c8c8c8',
  },
  noUserText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  caixa: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    color: 'Black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ganhoMensal: {
    color: 'gray',
    fontSize: 16,
  },
  saldo: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalhes: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  gasto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2a95ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
