import * as Service from '../services/Configuracao';

const uriVenda = "/venda/";

export const getCargaVenda = async (codLoja) => {
    const enderecoApi = await Service.enderecoApi();

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