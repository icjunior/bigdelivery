import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BtnGravarConfig() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <FontAwesome name="save" size={24} color="#FFFFFF" style={{ paddingRight: 10 }} />
        </TouchableOpacity>
    );
}