import { DatabaseConnection } from '../database/DatabaseConnection';
import { Alert } from 'react-native';

const db = DatabaseConnection.getConnection();

export const gravaCarga = (itens) => {
    db.transaction(
        tx => {
            tx.executeSql("DELETE FROM produto_venda", []);
            itens.map((item) => {
                tx.executeSql("INSERT INTO produto_venda (ean, venda) VALUES (?,?)", [item.codMercadoria, item.precoUnitario]);
            })
        },
        (error) => {
            Alert.alert('Carga de preços', 'Impossível efetuar carga de preços');
        }
    )
}

export const buscaPreco = (ean) => {
    let item;

    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM produto_venda WHERE ean = ?", [("00000000000000000" + ean).slice(-17)], (_, results) => {
                    if (results.rows.length == 0) {
                        reject(`O material ${ean} não possui cadastro no sistema Zanthus`);
                    } else {
                        for (let i = 0; i < results.rows.length; i++) {
                            item = results.rows.item(i);
                        }
                        resolve(item);
                    }
                });
            },
            (error) => {
                reject(error);
            }
        )
    })
}