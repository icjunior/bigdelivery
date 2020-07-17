import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BtnConfiguracoes() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Configuracoes') }}>
            <AntDesign name="setting" size={24} color="blue" style={{ paddingRight: 10 }} />
        </TouchableOpacity>
    );
}