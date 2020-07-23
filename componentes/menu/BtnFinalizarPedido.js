import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { post } from '../../api/PedidoService';

export default function BtnConfiguracoes(props) {
    return (
        <TouchableOpacity onPress={() => {
            post(props.itens, props.codigoLoja);
        }}>
            <FontAwesome5 name="truck-loading" size={24} color="#FFFFFF" style={{ padding: 10 }} />
        </TouchableOpacity>
    );
}