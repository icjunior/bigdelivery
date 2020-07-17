import * as React from 'react';
import { FlatList, SafeAreaView, StatusBar, Alert, StyleSheet } from 'react-native';
import Pedido from './Pedido';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get } from '../api/PedidoService';

const pedidos = [
    {
        codigo: 1, data: "07/07/2020", valorTotal: 100.00
    },
    {
        codigo: 2, data: "08/07/2020", valorTotal: 200.00
    }
]

export default function Home({ navigation }) {

    const [pedidos, setPedidos] = React.useState([]);

    React.useEffect(() => {
        get(setPedidos);
    }, []);

    return (
        <SafeAreaView style={estilo.container}>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate('InclusaoItens', { pedido: pedido })}>
                        <Pedido pedido={item} />
                    </TouchableOpacity>
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