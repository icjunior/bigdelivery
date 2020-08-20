import { DatabaseConnection } from '../database/DatabaseConnection';

const db = DatabaseConnection.getConnection();

export const insereMaterial = (itens) => {
    db.transaction(
        tx => {
            tx.executeSql("DELETE FROM produto", []);
            itens.map((item) => {
                tx.executeSql("INSERT INTO produto (ean, descricao) VALUES (?,?)", [item.codMercadoria, item.descricao]);
            })
        },
        (error) => {
            Alert.alert('Carga de preços', 'Impossível efetuar carga de preços');
        }
    )
}

export const buscaItem = (ean) => {
    let item;
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("select "
                    + "id, ean, descricao "
                    + "from produto where ean = ? ", [ean], (_, results) => {
                        if (results.rows.length == 0) {
                            reject(`O material ${ean} não possui cadastro no sistema Zanthus`);
                        } else {
                            for (let i = 0; i < results.rows.length; i++) {
                                item = results.rows.item(i);
                            }
                            resolve(item.descricao);
                        }
                    }
                )
            }
        )
    })
}