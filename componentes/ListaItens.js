import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Alert, AsyncStorage } from 'react-native';
import Item from './Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnFinalizarPedido from './menu/BtnFinalizarPedido';
import { StatusBar } from 'expo-status-bar';
import * as pedidoRepository from '../repository/PedidoRepository';
import MenuConexao from './menu/MenuConexao';

export default function ListaItens({ route, navigation }) {
    const { itens } = route.params;
    const { codigoLoja } = route.params;
    const { codPedido } = route.params;
    const [refresh, setRefresh] = React.useState();

    navigation.setOptions({
        headerRight: () => (
            <View style={{ flexDirection: "row" }}>
                <MenuConexao />
                <BtnFinalizarPedido codigoLoja={codigoLoja} itens={itens} codPedido={codPedido} />
            </View>
        )
    })

    const excluirItem = (item) => {
        itens.splice(itens.indexOf(item), 1);
        pedidoRepository.apagaItemPedido(codPedido, codigoLoja, item.codPedidoItem);
        setRefresh(!refresh);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                data={itens}
                renderItem={({ item }) => (
                    <View style={styles.containerView}>
                        <Item item={item} />
                        <View style={styles.containerBotao}>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('Excluir item',
                                    `Tem certeza que deseja excluir o item ${item.codMercadoria}?`,
                                    [
                                        {
                                            text: "Sim",
                                            onPress: () => { excluirItem(item); }
                                        },
                                        {
                                            text: "Não",
                                            onPress: () => { return }
                                        }
                                    ])
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
        marginHorizontal: 5,
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
        alignContent: "center",
        marginRight: 5
    }
});