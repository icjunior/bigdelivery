import * as Service from '../services/Configuracao';

const uriVenda = "/venda/";

const recuperaEndereco = async () => {
    return await Service.enderecoApi();
}

export const getCargaVenda = async (codLoja) => {
    const enderecoApi = await recuperaEndereco();

    const uri = `${enderecoApi}${uriVenda}${codLoja}`;

    const requestInfo = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    resposta = await fetch(uri, requestInfo);

    return resposta.json();
}