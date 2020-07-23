import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import Item from './Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnFinalizarPedido from './menu/BtnFinalizarPedido';

export default function ListaItens({ route, navigation }) {
    const { itens } = route.params;
    const { codigoLoja } = route.params;
    const [refresh, setRefresh] = React.useState();

    navigation.setOptions({
        headerRight: () => (
            <BtnFinalizarPedido codigoLoja={codigoLoja} itens={itens} />
        )
    })

    const excluirItem = (item) => {
        setRefresh(!refresh);
        itens.splice(itens.indexOf(item), 1);
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itens}
                renderItem={({ item }) => (
                    <View style={styles.containerView}>
                        <Item item={item} />
                        <View style={styles.containerBotao}>
                            <TouchableOpacity onPress={() => {
                                excluirItem(item);
                            }}>
                                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.codMercadoria}
                extraData={refresh}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    containerView: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: "row"
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    containerBotao: {
        justifyContent: "center",
        alignContent: "center"
    }
});