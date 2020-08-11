import * as React from 'react';
import { View, Text, TextInput, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Configuracoes({ navigation }) {
    let [codigoLoja, setCodigoLoja] = React.useState('');
    let [enderecoApi, setEnderecoApi] = React.useState('');

    React.useEffect(() => {
        recuperarConfiguracao();
    }, []);

    recuperarConfiguracao = async () => {
        try {
            setCodigoLoja(await AsyncStorage.getItem('codigoLoja'));
            setEnderecoApi(await AsyncStorage.getItem('enderecoApi'));
        } catch (e) {
            console.warn("deu erro ao recuperar configuração");
        }
    }

    gravarConfiguracao = async () => {
        try {
            await AsyncStorage.setItem('codigoLoja', codigoLoja);
            await AsyncStorage.setItem('enderecoApi', enderecoApi);
        } catch (e) {
            console.warn(e);
        }
        Alert.alert('', 'Configuração salva com sucesso');
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <StatusBar style="light" />
            <View>
                <Text>Código da loja</Text>
                <TextInput
                    placeholder='Loja'
                    style={{ fontSize: 50 }}
                    onChangeText={(texto) => setCodigoLoja(texto)}
                    value={codigoLoja}
                />
                <Text>Endereço da api</Text>
                <TextInput
                    placeholder="http://..."
                    style={{ fontSize: 32 }}
                    onChangeText={(text) => setEnderecoApi(text)}
                    value={enderecoApi}
                    autoCapitalize="none" />
            </View>
            <View>
                <TouchableOpacity onPress={() => gravarConfiguracao()}>
                    <Text style={{ fontSize: 20, color: "#4682b4", alignSelf: "center", paddingTop: 20 }}>Gravar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}