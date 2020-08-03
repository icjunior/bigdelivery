export const montaMaterial = (codigoLoja, codPedidoItem, material, quantidade, descricao) => {
    const lancamento =
    {
        codLoja: codigoLoja,
        codPedidoItem: codPedidoItem,
        codMercadoria: material,
        quantidade: quantidade,
        valorDesconto: 0.00,
        descricao: descricao
    }
    return lancamento;
}