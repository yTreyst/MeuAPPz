import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useUserContext } from './UserContext'; // Importando o contexto para acessar os usuários

// Tela Principal (Index)
export default function Index() {
  const { pessoas } = useUserContext(); // Obtendo o array de pessoas (usuários) do contexto
  const [expandido, setExpandido] = useState<number | null>(null);

  // Calcular o total de gastos de todos os membros da família
  const totalGastosFamilia = pessoas.reduce((total, pessoa) => {
    return total + pessoa.gastos.reduce((gastosTotal, gasto) => gastosTotal + gasto.valor, 0);
  }, 0);

  // Calcular o total de ganhos de todos os membros da família
  const totalGanhosFamilia = pessoas.reduce((total, pessoa) => total + pessoa.ganhoMensal, 0);

  // Calcular o saldo familiar (ganhos - gastos)
  const saldoFamilia = totalGanhosFamilia - totalGastosFamilia;

  const toggleExpandido = (id: number) => {
    setExpandido(expandido === id ? null : id); // Alternando entre mostrar e esconder os detalhes
  };

  // Definindo o número de colunas
  const numColumns = 2;  // Exibindo 2 colunas

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Familiar de Gastos</Text>
      
      {/* Exibição do resumo familiar */}
      {pessoas.length === 0 ? (
        <Text style={styles.noUserText}>Não há usuários cadastrados.</Text>
      ) : (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Total de Ganhos: R${totalGanhosFamilia.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Total de Gastos: R${totalGastosFamilia.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Saldo Familiar: R${saldoFamilia.toFixed(2)}</Text>
        </View>
      )}

      {/* Lista de usuários (pessoas) em quadrados */}
      {pessoas.length > 0 && (
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}  // Definindo o número de colunas
          renderItem={({ item }) => {
            const somaGastos = item.gastos.reduce((total, gasto) => total + gasto.valor, 0);
            const saldoRestante = item.ganhoMensal - somaGastos;

            return (
              <View style={styles.userCard}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.ganhoMensal}>Ganho Mensal: R${item.ganhoMensal.toFixed(2)}</Text>
                <Text style={styles.saldoRestante}>Saldo Restante: R${saldoRestante.toFixed(2)}</Text>

                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleExpandido(item.id)}
                >
                  <Text style={styles.expandButtonText}>
                    {expandido === item.id ? 'Esconder Detalhes' : 'Ver Detalhes'}
                  </Text>
                </TouchableOpacity>

                {expandido === item.id && (
                  <View style={styles.details}>
                    <Text>Detalhes do usuário:</Text>
                    {item.gastos.length > 0 ? (
                      <FlatList
                        data={item.gastos}
                        keyExtractor={(gasto) => gasto.id.toString()}
                        renderItem={({ item: gasto }) => (
                          <View style={styles.gastoItem}>
                            <Text>{gasto.descricao}: R${gasto.valor.toFixed(2)}</Text>
                          </View>
                        )}
                      />
                    ) : (
                      <Text style={styles.noGastosText}>Nenhum gasto registrado.</Text>
                    )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noUserText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    minWidth: (Dimensions.get('window').width - 40) / 2, // Ajusta o tamanho do quadrado com base na largura da tela
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ganhoMensal: {
    fontSize: 16,
    marginTop: 5,
  },
  saldoRestante: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  expandButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    color: '#2a95ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  expandButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  details: {
    marginTop: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  gastoItem: {
    marginBottom: 5,
  },
  noGastosText: {
    color: '#888',
  },
});
