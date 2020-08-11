import { Alert } from 'react-native';

const uriMercadoria = "/mercadoria";

export const getMercadoria = async (enderecoApi, codLoja, codMercadoria) => {
    const uri = `http://192.0.1.12:8080/api${uriMercadoria}/${codLoja}/${codMercadoria}`;

    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const resposta = await fetch(uri, requestInfo);

    return resposta.json();
}