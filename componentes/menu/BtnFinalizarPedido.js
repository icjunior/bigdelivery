import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { post } from '../../api/PedidoService';
import { Alert, View, ActivityIndicator, Modal, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { atualizaPedido } from '../../repository/PedidoRepository';
import { styleModal } from '../styles/StyleModal';

export default function BtnFinalizarPedido(props) {
    const navigation = useNavigation();
    const itens = props.itens;
    const codigoLoja = props.codigoLoja;
    const codPedido = props.codPedido;
    const [processamento, setProcessamento] = React.useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={processamento}>
                <View style={styleModal.viewPrincipalModal}>
                    <View style={styleModal.viewSecundariaModal}>
                        <ActivityIndicator size="large" color="red" />
                        <Text>Aguarde</Text>
                        <Text>Finalizando pedido</Text>
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
                                post(itens, codigoLoja)
                                    .then((resposta) => {
                                        atualizaPedido(codPedido, resposta.codPedido);
                                        setProcessamento(false);
                                        setTimeout(() => {
                                            Alert.alert(`Pedido ${resposta.codPedido} gerado com sucesso`);
                                            navigation.navigate('Home');
                                        }, 1000);
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
                <FontAwesome5 name="truck-loading" size={24} color="#FFFFFF" style={{ paddingRight: 10 }} />
            </TouchableOpacity>
        </View>
    );
}