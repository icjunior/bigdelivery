import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

export default function NovoPedido(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            if (props.itens.length == 0) {
                Alert.alert('', 'Nenhum item lançado no pedido. Impossível finalizar.');
                return;
            }
            navigation.navigate('ListaItens', { itens: props.itens, codigoLoja: props.codigoLoja })
        }}>
            <MaterialIcons name="queue-play-next" size={24} color="blue" style={{ paddingRight: 10 }} />
        </TouchableOpacity>
    );
}