import { DatabaseConnection } from '../database/DatabaseConnection';
import { Alert } from 'react-native';

const db = DatabaseConnection.getConnection();

export const criaPedido = (codPedido, codigoLoja) => {
    let dataPedido = new Date();

    db.transaction(
        tx => {
            tx.executeSql("insert into pedido (id, codigo_loja, datahora) values (?,?,?)", [codPedido, codigoLoja, dataPedido.toISOString()]);
        },
        (error) => {
            console.warn(error);
        },
        null
    );
}

export const gravaItem = (codPedido, codigoLoja, codPedidoItem, material, quantidade) => {
    db.transaction(
        tx => {
            tx.executeSql("insert into item_pedido (codigo_pedido,codigo_loja, cod_pedido_item, material, quantidade) values (?,?,?,?,?)", [codPedido, codigoLoja, codPedidoItem, material, quantidade]);
        },
        (error) => {
            console.warn(error);
        }
    );
}

export const atualizaPedido = (codPedido, codPedidoZanthus) => {
    db.transaction(
        tx => {
            tx.executeSql("update pedido set codPedidoZanthus = ? where id = ?", [codPedidoZanthus, codPedido]);
        },
        (error) => {
            console.warn(error);
        }
    )
}

export const carregaItem = (codPedido) => {
    let itens = [];
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("select "
                    + "id, codigo_pedido as codPedido, codigo_loja as codigoLoja, cod_pedido_item as codPedidoItem, material as codMercadoria, quantidade "
                    + "from item_pedido where codigo_pedido = ? ", [codPedido], (_, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            itens.push(results.rows.item(i));
                        }
                        resolve(itens);
                    })
            },
            (error) => {
                reject(error);
            }
        )
    })
}

export const apagaItemPedido = (codPedido, codigoLoja, codPedidoItem) => {
    db.transaction(
        tx => {
            tx.executeSql("DELETE FROM item_pedido WHERE codigo_pedido = ? AND codigo_loja = ? AND cod_pedido_item = ?",
                [codPedido, codigoLoja, codPedidoItem]);
        },
        (error) => {
            Alert.alert('Exclusão de item', `Não foi possível eliminar o item ${codPedidoZanthus} do pedido`)
        }
    )
}

export const listaPedido = () => {
    let pedidos = [];
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM pedido", [], (_, results) => {
                    for (let i = 0; i < results.rows.length; ++i) {
                        pedidos.push(results.rows.item(i));
                    }

                    resolve(pedidos);
                });
            },
            (error) => {
                reject(error);
            }
        )
    })
}