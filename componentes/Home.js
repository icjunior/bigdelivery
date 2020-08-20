import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, SafeAreaView, StyleSheet, Modal, View, ActivityIndicator, Text, Alert } from 'react-native';
import Pedido from './Pedido';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tableConfig } from '../database/TableConfig';
import { listaPedido } from '../repository/PedidoRepository';
import { styleModal } from './styles/StyleModal';

export default function Home({ navigation }) {
    const [pedidos, setPedidos] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(true);

    React.useEffect(() => {
        tableConfig();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            listaPedido()
                .then((resposta) => {
                    setPedidos(resposta);
                    setModalVisible(false);
                })
                .catch((erro) => {
                    console.warn(erro);
                })
        }, [])
    );

    return (
        <SafeAreaView style={estilo.container}>
            <StatusBar style="light" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styleModal.viewPrincipalModal}>
                    <View style={styleModal.viewSecundariaModal}>
                        <ActivityIndicator size="large" color="red" />
                        <Text>Aguarde</Text>
                        <Text>Buscando pedidos</Text>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => {
                            if (item.codPedidoZanthus != null) {
                                Alert.alert('Pedidos', `O pedido ${item.id} já foi integrado com o Zanthus. Impossível abertura`)
                                return;
                            }
                            navigation.navigate('InclusaoItens', {
                                cabecalho: item,
                                produtoScaneado: ''
                            })
                        }}
                    >
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