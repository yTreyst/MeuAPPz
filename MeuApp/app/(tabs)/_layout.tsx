import React from 'react';
import { useColorScheme, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { UserProvider } from './UserContext';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Ícone da barra de navegação
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Layout principal com navegação por abas
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const darkColor = '#767676'; // Cor escura para ícones e texto

  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: darkColor, // Cor ativa dos ícones e texto
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            backgroundColor: 'white', // Garantindo que a cor de fundo da barra de navegação seja branca
          },
          tabBarIconStyle: {
            color: darkColor, // Ícones em cor escura
          },
          tabBarLabelStyle: {
            color: darkColor, // Texto em cor escura
          },
          tabBarItemStyle: {
            opacity: 1, // Opacidade normal para as abas inativas
          },
        }}
      >
        {/* Tela de Cadastro */}
        <Tabs.Screen
          name="Cadastro"
          options={{
            title: 'Cadastro',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="user-plus" color={color} />
            ),
          }}
        />
        {/* Tela Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'OrçaFamilia Home',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="home" color={color} />
            ),
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={28}
                      color={Colors[colorScheme ?? 'dark'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        {/* Tela de Usuários */}
        <Tabs.Screen
          name="CadastroUsuario"
          options={{
            title: 'Cadastro de Usuários',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="users" color={color} />
            ),
          }}
        />
        {/* Tela de Gastos e Ganhos */}
        <Tabs.Screen
          name="GastoseGanhos"
          options={{
            title: 'Gastos e Ganhos',
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="money" color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
