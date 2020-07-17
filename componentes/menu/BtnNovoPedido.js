import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NovoPedido() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('InclusaoItens') }}>
            <MaterialIcons name="add-circle" size={24} color="blue" style={{paddingRight: 10}} />
        </TouchableOpacity>
    );
}