import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Pedido from './Pedido';
import { get } from '../api/PedidoService';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home() {

    const [pedidos, setPedidos] = React.useState([]);

    React.useEffect(() => {
        recuperaConfiguracao();
    }, []);

    recuperaConfiguracao = async () => {
        return await AsyncStorage
            .getItem('enderecoApi')
            .then((endereco) => get(endereco).then((lista) => setPedidos(lista)));
    }

    return (
        <SafeAreaView style={estilo.container}>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.codPedido.toString()}
                renderItem={({ item }) =>
                    <Pedido pedido={item} />
                }>
            </FlatList>
        </SafeAreaView >
    );
}

const estilo = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1
    }
})