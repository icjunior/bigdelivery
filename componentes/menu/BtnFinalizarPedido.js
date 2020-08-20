import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { post } from '../../api/PedidoService';
import { Alert, View, ActivityIndicator, Modal, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { atualizaPedido } from '../../repository/PedidoRepository';

export default function BtnFinalizarPedido(props) {
    const navigation = useNavigation();
    const itens = props.itens;
    const codigoLoja = props.codigoLoja;
    const enderecoApi = props.enderecoApi;
    const codPedido = props.codPedido;
    const [processamento, setProcessamento] = React.useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={processamento}>
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
            <TouchableOpacity onPress={() => {
                Alert.alert('Finalização', 'Tem certeza que deseja finalizar o pedido?',
                    [
                        {
                            text: 'Sim',
                            onPress: () => {
                                setProcessamento(true);
                                post(itens, codigoLoja, enderecoApi)
                                    .then((resposta) => {
                                        atualizaPedido(codPedido, resposta.codPedido);
                                        setProcessamento(false);
                                        setTimeout(() => {
                                            Alert.alert(`Pedido ${resposta.codPedido} gerado com sucesso`);
                                            navigation.push('Home', { codPedido: codPedido });
                                        }, 1);
                                    })
                                    .catch((erro) => {
                                        console.warn(erro);
                                    });
                            }
                        },
                        {
                            text: 'Não',
                            onPress: () => {
                                return;
                            }
                        }
                    ]
                )
            }}>
                <FontAwesome5 name="truck-loading" size={24} color="#FFFFFF" style={{ padding: 10 }} />
            </TouchableOpacity>
        </View>
    );
}