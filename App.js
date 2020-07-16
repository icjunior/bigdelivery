import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaItens from './componentes/ListaItens';
import InclusaoItens from './componentes/InclusaoItens';
import Home from './componentes/Home';
import NovoPedido from './componentes/menu/NovoPedido';

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
              <NovoPedido />
            )
          }} />
        <Stack.Screen
          name="InclusaoItens"
          component={InclusaoItens}
          options={{
            title: 'Inclusão de itens',
            headerBackTitleVisible: false
          }} />
        <Stack.Screen
          name="ListaItens"
          component={ListaItens}
          options={{
            title: 'Itens lançados',
            headerBackTitleVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}