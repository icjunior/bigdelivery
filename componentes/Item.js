import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Item(props) {
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Mercadoria</Text>
                <Text style={estilo.variavel}>{props.item.codMercadoria}</Text>
            </View>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Quantidade</Text>
                <Text style={estilo.variavel}>{props.item.quantidade}</Text>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: "row"
    },
    containerCampos: {
        paddingRight: 30
    },
    containerBotao: {
        justifyContent: "center",
        alignContent: "center"
    },
    variavel: {
        fontSize: 32,
    },
    titulo: {
        fontSize: 10
    }
});