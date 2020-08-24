import * as Service from '../services/Configuracao';
import * as VendaRepository from '../repository/VendaRepository';

const uriVenda = "venda/";

const recuperaEndereco = async () => {
    return await Service.enderecoApi();
}

export const getCargaVenda = async (codLoja) => {
    return new Promise(async (resolve, reject) => {
        const enderecoApi = await recuperaEndereco();

        const uri = `${enderecoApi}${uriVenda}${codLoja}`;

        const requestInfo = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        const resposta = await fetch(uri, requestInfo);
        const dadosNovos = await resposta.json();

        VendaRepository.gravaCarga(dadosNovos)
            .then((resposta) => {
                resolve(resposta);
            })
            .catch((erro) => {
                reject(false);
            })
    })
}