import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Modal, View, ActivityIndicator, Text, Alert } from 'react-native';
import Pedido from './Pedido';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tableConfig } from '../database/TableConfig';
import { listaPedido } from '../repository/PedidoRepository';

export default function Home({ navigation }) {
    const [pedidos, setPedidos] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(true);

    React.useEffect(() => {
        tableConfig();
        listaPedido().then((resposta) => {
            setPedidos(resposta);
            setModalVisible(false);
        })
    }, []);

    return (
        <SafeAreaView style={estilo.container}>
            <StatusBar style="light" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <ActivityIndicator size="large" />
                        <Text>Aguarde</Text>
                        <Text>Processando</Text>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('InclusaoItens', {
                                cabecalho: item,
                                produtoScaneado: ''
                            })
                        }}
                        onLongPress={() => {
                            Alert.alert('Pedido',
                                `Tem certeza que deseja reabrir o pedido ${item.id}`,
                                [
                                    {
                                        text: "Sim",
                                        onPress: () => {
                                            navigation.navigate('InclusaoItens', {
                                                cabecalho: item,
                                                produtoScaneado: null
                                            })
                                        }
                                    },
                                    {
                                        text: "Não",
                                        onPress: () => { return }
                                    }
                                ])
                        }}>
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