const uriMercadoria = "/venda";

export const validaEAN = async (codLoja, codMercadoria) => {
    if (codMercadoria.startsWith('2', 0)) {
        codMercadoriaConvertida = codMercadoria.substring(1,7);

        const uri = `http://192.0.1.12:8080/api${uriMercadoria}/${codLoja}/${codMercadoriaConvertida}`;

        const requestInfo = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        const resposta = await fetch(uri, requestInfo);

        return resposta.json();
    }
}