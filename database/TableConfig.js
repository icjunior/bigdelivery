import { DatabaseConnection } from '../database/DatabaseConnection';

const db = DatabaseConnection.getConnection();

export const tableConfig = () => {
    db.transaction(
        tx => {
            //tx.executeSql("drop table pedido");
            tx.executeSql(
                "create table if not exists pedido (id integer primary key not null, codigo_loja int, datahora datetime, codPedidoZanthus int);"
            );
            //tx.executeSql("insert into pedido (id, codigo_loja, datahora) values (?,?,?)", [2, 2, (new Date().toISOString())]);
            // tx.executeSql("select * from pedido", [], (_, { rows: { _array } }) =>
            //     console.log(_array)
            // );
            //tx.executeSql("drop table item_pedido");
            tx.executeSql(
                "create table if not exists item_pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo_pedido int, codigo_loja int, cod_pedido_item int, material text, quantidade numeric(10,2));"
            );
            tx.executeSql("DROP TABLE produto");
            tx.executeSql(
                "create table if not exists produto (id INTEGER PRIMARY KEY AUTOINCREMENT, ean varchar(17), descricao text);"
            );
            tx.executeSql("DROP TABLE produto_venda");
            tx.executeSql(
                "create table if not exists produto_venda (id INTEGER PRIMARY KEY AUTOINCREMENT, ean varchar(17), venda numeric(10,5));"
            );
        },
        (error) => {
            console.warn(error);
        });
}