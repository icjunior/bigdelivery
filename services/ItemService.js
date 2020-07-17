export const montaMaterial = (codigoLoja, codPedidoItem, material, quantidade) => {
    const lancamento =
    {
        codLoja: codigoLoja,
        codPedidoItem: codPedidoItem,
        codMercadoria: material,
        quantidade: quantidade,
        valorDesconto: 0.00
    }
    return lancamento;
}