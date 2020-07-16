import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Item(props) {
    return (
        <View style={styles.container}>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Mercadoria</Text>
                <Text style={styles.variavel}>{props.item.codMercadoria}</Text>
            </View>
            <View style={estilo.containerCampos}>
                <Text style={estilo.titulo}>Quantidade</Text>
                <Text style={styles.variavel}>{props.item.quantidade}</Text>
            </View>
            <View style={estilo.containerBotao}>
                <TouchableOpacity onPress={() => console.warn('vou apagar')}>
                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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