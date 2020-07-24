import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { post } from '../../api/PedidoService';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BtnConfiguracoes(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            Alert.alert('Finalização', 'Tem certeza que deseja finalizar o pedido?',
                [
                    {
                        text: 'Sim',
                        onPress: () => {
                            post(props.itens, props.codigoLoja, props.enderecoApi)
                                .then((resposta) => {
                                    Alert.alert(`Pedido ${resposta.codPedido} gerado com sucesso`);
                                    navigation.navigate('Home');
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
    );
}