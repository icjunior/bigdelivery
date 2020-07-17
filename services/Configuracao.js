import AsyncStorage from '@react-native-community/async-storage';

export const codigoLojaConfig = async () => {
    try {
        return await AsyncStorage.getItem('codigoLoja');
    } catch (e) {
        console.warn(`erro ${e}`);
    }
}