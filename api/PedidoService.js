import { Alert } from 'react-native';

export const post = async (itens, codigoLoja, enderecoApi) => {
    let uri = `${enderecoApi}/pedido`;

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

    if (resposta.ok) {
        return resposta.json();
    } else {
        Alert.alert('Finalização', 'Não foi possível finalizar o pedido');
    }
}

export const get = async (enderecoApi) => {
    let uri = `${enderecoApi}/pedido`;

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
        Alert.alert('Pedidos', 'Não foi recuperar a lista de pedidos');
    }
}