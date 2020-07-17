import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaItens from './componentes/ListaItens';
import InclusaoItens from './componentes/InclusaoItens';
import Home from './componentes/Home';
import Configuracoes from './componentes/Configuracoes';
import BtnNovoPedido from './componentes/menu/BtnNovoPedido';
import BtnProximo from './componentes/menu/BtnProximo';
import BtnConfiguracoes from './componentes/menu/BtnConfiguracoes';

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
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <BtnConfiguracoes />
                <BtnNovoPedido />
              </View>
            )
          }} />
        <Stack.Screen
          name="InclusaoItens"
          component={InclusaoItens}
          options={{
            title: 'Inclusão de itens',
            headerBackTitleVisible: false,
            headerRight: () => (
              <BtnProximo />
            )
          }} />
        <Stack.Screen
          name="ListaItens"
          component={ListaItens}
          options={{
            title: 'Itens lançados',
            headerBackTitleVisible: false
          }}
        />
        <Stack.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            title: 'Configurações gerais',
            headerBackTitleVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}