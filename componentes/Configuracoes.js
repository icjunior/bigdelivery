import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Configuracoes({ navigation }) {
    let [codigoLoja, setCodigoLoja] = React.useState(0);

    React.useEffect(() => {
        recuperarConfiguracao();
    }, []);

    recuperarConfiguracao = async () => {
        try {
            setCodigoLoja(await AsyncStorage.getItem('codigoLoja'));
        } catch (e) {
            console.warn("deu erro ao recuperar configuração");
        }
    }

    gravarConfiguracao = async () => {
        console.warn(codigoLoja);
        try {
            await AsyncStorage.setItem('codigoLoja', codigoLoja);
        } catch (e) {
            console.warn(e);
        }
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View>
                <Text>Código da loja</Text>
                <TextInput
                    placeholder='Loja'
                    style={{ fontSize: 50 }}
                    onChangeText={(texto) => setCodigoLoja(texto)}
                    value={codigoLoja.toString()}
                />
                <Button title="Gravar" onPress={() => gravarConfiguracao()} />
            </View>
        </View >
    );
}