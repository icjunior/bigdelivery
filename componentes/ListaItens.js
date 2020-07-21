import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Item from './Item';
import { post } from '../api/PedidoService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ListaItens({ route, navigation }) {
    const { itens } = route.params;
    const { codigoLoja } = route.params;

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                post(itens, codigoLoja);
            }}>
                <FontAwesome5 name="truck-loading" size={24} color="blue" style={{ padding: 10 }} />
            </TouchableOpacity>
        )
    })


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itens}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.codMercadoria}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});