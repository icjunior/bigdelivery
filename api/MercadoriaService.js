import { Alert } from 'react-native';

const uriMercadoria = "/mercadoria";

export const getMercadoria = async (enderecoApi, codLoja) => {
    const uri = `${enderecoApi}${uriMercadoria}/${codLoja}`;
    
    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const resposta = await fetch(uri, requestInfo);

    if (resposta.ok) {
        return resposta.json();
    } else {
        Alert.alert('Pedidos', 'Não foi possível recuperar o cadastro dos itens.');
    }
}