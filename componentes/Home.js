import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Modal, View, ActivityIndicator, Text } from 'react-native';
import Pedido from './Pedido';
import { get } from '../api/PedidoService';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

    const [pedidos, setPedidos] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(true);

    React.useEffect(() => {
        recuperaConfiguracao();
    }, []);

    recuperaConfiguracao = async () => {
        return await AsyncStorage
            .getItem('enderecoApi')
            .then((endereco) => {
                get(endereco).then((lista) => {
                    setPedidos(lista);
                    setModalVisible(false);
                })
            });
    }

    return (
        <SafeAreaView style={estilo.container}>
            <StatusBar style="light" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
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
                keyExtractor={(item) => item.codPedido.toString()}
                renderItem={({ item }) =>
                    <Pedido pedido={item} />
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