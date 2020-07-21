export const post = async (itens, codigoLoja) => {
    const uri = "http://localhost:8080/api/pedido";

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