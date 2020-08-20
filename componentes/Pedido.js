import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

export default function Pedido(props) {

    const dataFormatada = format(new Date(props.pedido.datahora), 'dd/MM/yyyy');

    return (
        <View style={estilo.container}>
            <View style={{flexGrow: 3}}>
                <Text style={estilo.titulo}>Pedido</Text>
                <Text style={estilo.variavel}>{props.pedido.id}</Text>
            </View>
            <View style={estilo.containerCampoData}>
                <Text style={estilo.titulo}>Valor</Text>
                <Text style={estilo.variavel}>{dataFormatada}</Text>
            </View>
            <View style={{ flexGrow: 2, alignItems: "center" }}>
                <Text style={estilo.titulo}>Pedido Zanthus</Text>
                <Text style={estilo.variavel}>{props.pedido.codPedidoZanthus}</Text>
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