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