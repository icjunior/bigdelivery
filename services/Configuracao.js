import AsyncStorage from '@react-native-community/async-storage';

export const codigoLojaConfig = async () => {
    return await AsyncStorage.getItem('codigoLoja');
}

export const numeroPedidoConfig = async () => {
    return await AsyncStorage.getItem('codigoPedido');
}

export const enderecoApi = async () => {
    return await AsyncStorage.getItem('enderecoApi');
}

export const atualizaNumeroPedido = async (numeroPedido) => {
    try {
        await AsyncStorage.setItem('codigoPedido', JSON.stringify(numeroPedido));
    } catch (e) {
        console.warn(e);
    }
}