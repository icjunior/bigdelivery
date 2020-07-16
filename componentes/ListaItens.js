import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Button } from 'react-native';
import Item from './Item';

export default function ListaItens({ route, navigation }) {
    const { itens } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itens}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.codMercadoria}
            />
            <Button title="Finalizar"></Button>
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