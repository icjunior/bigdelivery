import * as React from 'react';
import { View, Text, TextInput, Alert, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Configuracoes({ navigation }) {
    const [codigoLoja, setCodigoLoja] = React.useState('');
    const [enderecoApi, setEnderecoApi] = React.useState('');
    const [codigoPedido, setCodigoPedido] = React.useState('');

    React.useEffect(() => {
        recuperarConfiguracao();
    }, []);

    recuperarConfiguracao = async () => {
        try {
            setCodigoLoja(await AsyncStorage.getItem('codigoLoja'));
            setEnderecoApi(await AsyncStorage.getItem('enderecoApi'));
            setCodigoPedido(await AsyncStorage.getItem('codigoPedido'));
        } catch (e) {
            console.warn("deu erro ao recuperar configuração");
        }
    }

    gravarConfiguracao = async () => {
        try {
            await AsyncStorage.setItem('codigoLoja', codigoLoja);
            await AsyncStorage.setItem('enderecoApi', enderecoApi);
            await AsyncStorage.setItem('codigoPedido', codigoPedido);
        } catch (e) {
            console.warn(e);
        }
        Alert.alert('', 'Configuração salva com sucesso');
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.margem}>
                <Text>Código da loja</Text>
                <TextInput
                    placeholder='Loja'
                    style={styles.fonteMaior}
                    onChangeText={(texto) => setCodigoLoja(texto)}
                    value={codigoLoja}
                />
                <Text>Número do pedido</Text>
                <TextInput
                    placeholder="Pedido"
                    style={styles.fonteMaior}
                    onChangeText={(text) => setCodigoPedido(text)}
                    value={codigoPedido}
                    keyboardType="numeric"
                    autoCapitalize="none" />
                <Text>Endereço da api</Text>
                <TextInput
                    placeholder="http://..."
                    style={styles.fonteMenor}
                    onChangeText={(text) => setEnderecoApi(text)}
                    value={enderecoApi}
                    autoCapitalize="none" />
            </View>
            <View>
                <TouchableOpacity onPress={() => gravarConfiguracao()}>
                    <Text style={styles.botao}>Gravar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    botao: {
        fontSize: 20,
        color: "#4682b4",
        alignSelf: "center",
        paddingTop: 20
    },
    margem: {
        margin: 10
    },
    fonteMaior: {
        fontSize: 50
    },
    fonteMenor: {
        fontSize: 32
    }


});