import * as Service from '../services/Configuracao';

const uriPedido = "pedido";

const recuperaEndereco = async () => {
    return await Service.enderecoApi();
}

export const post = async (itens, codigoLoja) => {
    const enderecoApi = await recuperaEndereco();

    let uri = `${enderecoApi}${uriPedido}`;

    const dadosBasicos = {
        numItensPedido: itens.length,
        valorAcrescimo: 0.00,
        codLoja: codigoLoja,
        codLojaSaidaMercadoria: codigoLoja,
        itens: itens
    }

    const requestInfo = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dadosBasicos)
    }

    const resposta = await fetch(uri, requestInfo);

    return resposta.json();
}

export const get = async () => {
    const enderecoApi = await recuperaEndereco();

    let uri = `${enderecoApi}/pedido`;

    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    const resposta = await fetch(uri, requestInfo);

    return resposta.json();
}