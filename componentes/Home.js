import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Pedido from './Pedido';
import { get } from '../api/PedidoService';
import AsyncStorage from '@react-native-community/async-storage';
import { getMercadoria } from '../api/MercadoriaService';

export default function Home({ navigation }) {

    const [pedidos, setPedidos] = React.useState([]);

    React.useEffect(() => {
        recuperaConfiguracao();
        // buscarItens();
    }, []);

    recuperaConfiguracao = async () => {
        return await AsyncStorage
            .getItem('enderecoApi')
            .then((endereco) => get(endereco).then((lista) => setPedidos(lista)));
    }

    // buscarItens = async () => {
    //     return await AsyncStorage
    //         .getItem('enderecoApi')
    //         .then((endereco) => getMercadoria(endereco, 2)
    //             .then(async (lista) => await AsyncStorage.setItem('mercadorias', lista))
    //         );
    // }

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