import * as Service from '../services/Configuracao';

const uriMercadoria = "/mercadoria";

const recuperaEndereco = async () => {
    return await Service.enderecoApi();
}

export const getMercadoria = async (codLoja, codMercadoria) => {
    const enderecoApi = await recuperaEndereco();

    const uri = `${enderecoApi}${uriMercadoria}/${codLoja}/${codMercadoria}`;

    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const resposta = await fetch(uri, requestInfo);

    return resposta.json();
}

export const getCarga = async (codLoja) => {
    const enderecoApi = await recuperaEndereco();

    const uri = `${enderecoApi}${uriMercadoria}/${codLoja}`;

    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const resposta = await fetch(uri, requestInfo);

    return resposta.json();
}