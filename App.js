import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaItens from './componentes/ListaItens';
import InclusaoItens from './componentes/InclusaoItens';
import Home from './componentes/Home';
import Configuracoes from './componentes/Configuracoes';
import BtnProximo from './componentes/menu/BtnProximo';
import BtnVoltar from './componentes/menu/BtnVoltar';
import Scanner from './componentes/Scanner';
import MenuConexao from './componentes/menu/MenuConexao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Pedidos',
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: '#FFFFFF' }
          }} />
        <Stack.Screen
          name="InclusaoItens"
          component={InclusaoItens}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <MenuConexao />
                <BtnProximo />
              </View>
            ),
            // headerLeft: () => (
            //   <View>
            //     <BtnVoltar />
            //   </View>
            // ),
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: '#FFFFFF' }
          }}
        />
        <Stack.Screen
          name="ListaItens"
          component={ListaItens}
          options={{
            title: 'Itens lançados',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerBackTitleStyle: { color: '#FFFFFF' }
          }}
        />
        <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            title: 'Configurações gerais',
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: 'red' },
            headerTitleStyle: { color: '#FFFFFF' }
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}