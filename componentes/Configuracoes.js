import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Configuracoes({ navigation }) {
    let [codigoLoja, setCodigoLoja] = React.useState(0);
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
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginLeft: 5 }}>
            <View>
                <Text>Código da loja</Text>
                <TextInput
                    placeholder='Loja'
                    style={{ fontSize: 50 }}
                    onChangeText={(texto) => setCodigoLoja(texto)}
                    value={codigoLoja.toString()}
                />
                <Text>Endereço da api</Text>
                <TextInput
                    placeholder="http://..."
                    style={{ fontSize: 32 }}
                    onChangeText={(text) => setEnderecoApi(text)}
                    value={enderecoApi}
                    autoCapitalize="none" />
                <Button title="Gravar" onPress={() => gravarConfiguracao()} />
            </View>
        </View >
    );
}