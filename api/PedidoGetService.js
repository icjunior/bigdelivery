export default PedidoGetService = async (itens) => {
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