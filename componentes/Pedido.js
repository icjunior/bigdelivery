import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pedido(props) {
    return (
        <View style={estilo.container}>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Pedido</Text>
                <Text style={estilo.variavel}>{props.pedido.codPedido}</Text>
            </View>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Valor</Text>
                <Text style={estilo.variavel}>{props.pedido.valorPedido}</Text>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    titulo: {
        fontSize: 10
    },
    variavel: {
        fontSize: 32
    },
    containerCampos: {
        flex: 1
    },
    containerCampoData: {
        flexGrow: 1
    }
})