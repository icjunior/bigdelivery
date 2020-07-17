export const post = async (itens, codigoLoja) => {
    const uri = "http://localhost:8080/api/pedido";

    console.warn(codigoLoja);

    const dadosBasicos = {
        //dataEntrega: "2020-06-19T00:00:00",
        numItensPedido: itens.length,
        valorAcrescimo: 0.00,
        codLoja: codigoLoja,
        //valorPedido: 150.00,
        //dataPedido: "2020-06-19T00:00:00",
        //dataCadastro: "2020-06-19T00:00:00",
        //dataUltimaAlteracao: "2020-06-19T00:00:00",
        codLojaSaidaMercadoria: codigoLoja,
        //codFuncionarioLiberador: 60,
        //situacao: 2,
        //codVendedor: 60,
        //flgTipoCobrancaFrete: 0,
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
        throw new Error("Não foi possível gerar pedido");
    }
}

export const get = async () => {
    const uri = "http://localhost:8080/api/pedido";

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
        throw new Error("Não foi possível obter lista de pedidos");
    }
}