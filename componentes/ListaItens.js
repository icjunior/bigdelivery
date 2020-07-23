import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import Item from './Item';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnFinalizarPedido from './menu/BtnFinalizarPedido';

export default function ListaItens({ route, navigation }) {
    const { itens } = route.params;
    const { codigoLoja } = route.params;
    const [refresh, setRefresh] = React.useState();
    const [enderecoApi, setEnderecoApi] = React.useState('');

    React.useEffect(() => {
        recuperaConfiguracao();
    }, [])

    recuperaConfiguracao = async () => {
        return await AsyncStorage
            .getItem('enderecoApi')
            .then((endereco) => setEnderecoApi(endereco));
    }

    navigation.setOptions({
        headerRight: () => (
            <BtnFinalizarPedido codigoLoja={codigoLoja} itens={itens} enderecoApi={enderecoApi} />
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
        alignContent: "center",
        marginRight: 5
    }
});