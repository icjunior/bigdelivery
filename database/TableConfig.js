import { DatabaseConnection } from '../database/DatabaseConnection';

const db = DatabaseConnection.getConnection();

export const tableConfig = () => {
    db.transaction(
        tx => {
            tx.executeSql(
                "create table if not exists pedido ( "
                + "id integer primary key not null, "
                + "codigo_loja int, "
                + "datahora datetime, "
                + "codPedidoZanthus int "
                + ");"
            );
            tx.executeSql(
                "create table if not exists item_pedido ( "
                + "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                + "codigo_pedido int, "
                + "codigo_loja int, "
                + "cod_pedido_item int, "
                + "material text, "
                + "quantidade numeric(10,2) "
                + ");"
            );
            tx.executeSql(
                "create table if not exists produto ( "
                + "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                + "ean varchar(17), "
                + " descricao text "
                + ");"
            );
            tx.executeSql(
                "create table if not exists produto_venda ( "
                + "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                + "ean varchar(17), "
                + "venda numeric(10,5));"
            );
        },
        (error) => {
            console.warn(error);
        });
}