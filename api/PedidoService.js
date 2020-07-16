const ContatoService = async (itens) => {
    const uri = "http://localhost:8080/api/pedido";

    const dadosBasicos = {
        codPedido: 15,
        dataEntrega: "2020-06-19T00:00:00",
        numItensPedido: 2,
        valorAcrescimo: 0.00,
        codLoja: 13,
        valorPedido: 150.00,
        dataPedido: "2020-06-19T00:00:00",
        dataCadastro: "2020-06-19T00:00:00",
        dataUltimaAlteracao: "2020-06-19T00:00:00",
        codLojaSaidaMercadoria: 13,
        codFuncionarioLiberador: 60,
        situacao: 2,
        codVendedor: 60,
        flgTipoCobrancaFrete: 0,
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
        throw new Error("Não foi possível cadastrar contato");
    }
}

export default ContatoService;