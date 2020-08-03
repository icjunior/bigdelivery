const uriMercadoria = "/venda";

export const validaEAN = async (codLoja, codMercadoria) => {
    if(codMercadoria.startsWith('2',0)){
        const uri = `http://localhost:8080/api/${uriMercadoria}/${codLoja}/00000000000002310`;

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
            Alert.alert('Pedidos', 'Não foi possível recuperar o cadastro dos itens.');
        }
    }
}