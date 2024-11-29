import React, { createContext, useContext, useState, ReactNode } from 'react';

type Gasto = {
  id: number;
  descricao: string;
  valor: number;
};

type Pessoa = {
  id: number;
  nome: string;
  ganhoMensal: number;
  gastos: Gasto[];
};

type UserContextType = {
  pessoas: Pessoa[];
  addPessoa: (novaPessoa: Pessoa) => void;
  updatePessoa: (id: number, updatedPessoa: Partial<Pessoa>) => void;
  removePessoa: (id: number) => void; // Função para excluir usuário
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const addPessoa = (novaPessoa: Pessoa) => {
    setPessoas((prev) => [...prev, novaPessoa]);
  };

  const updatePessoa = (id: number, updatedPessoa: Partial<Pessoa>) => {
    setPessoas((prev) =>
      prev.map((pessoa) => (pessoa.id === id ? { ...pessoa, ...updatedPessoa } : pessoa))
    );
  };

  // Função para excluir um usuário
  const removePessoa = (id: number) => {
    setPessoas((prev) => prev.filter((pessoa) => pessoa.id !== id));
  };

  return (
    <UserContext.Provider value={{ pessoas, addPessoa, updatePessoa, removePessoa }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};