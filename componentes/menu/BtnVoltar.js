import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

export default function BtnVoltar() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            Alert.alert('Sair do pedido',
                'Atenção. Ao sair do pedido, todos os itens serão perdidos. Tem certeza?',
                [
                    {
                        text: "Sim",
                        onPress: () => { navigation.goBack() }
                    },
                    {
                        text: "Não",
                        onPress: () => { return }
                    }
                ])
        }}>
            <AntDesign name="left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
    )
}