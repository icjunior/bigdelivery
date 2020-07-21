import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { codigoLojaConfig } from '../services/Configuracao';
import BtnProximo from './menu/BtnProximo';
import { montaMaterial } from '../services/ItemService';

export default function InclusaoItens({ navigation }) {
    navigation.setOptions({
        headerRight: () => (
            <BtnProximo itens={itens} codigoLoja={codigoLoja} />
        )
    })

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [codigoLoja, setCodigoLoja] = React.useState(0);
    const [codPedidoItem, setCodPedidoItem] = React.useState(1);

    React.useEffect(() => {
        codigoLojaConfig().then(loja => { setCodigoLoja(loja) });
    }, []);

    gravar = () => {
        setItens([...itens, montaMaterial(codigoLoja, codPedidoItem, material, quantidade)]);
        setCodPedidoItem(codPedidoItem + 1);
        setQuantidade('');
        setMaterial('');
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Quantidade:</Text>
                <TextInput
                    placeholder='quantidade'
                    style={{ fontSize: 50 }}
                    onChangeText={quantidade => setQuantidade(quantidade)}
                    value={quantidade.toString()}
                    autoFocus={true}
                />
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Material:</Text>
                <TextInput
                    placeholder="material"
                    style={{ fontSize: 50 }}
                    onChangeText={material => setMaterial(material)}
                    value={material.toString()}
                />
            </View>
            <Button title="Gravar" onPress={() => {
                if (material == '' || quantidade == '') {
                    Alert.alert('', 'Campos obrigatórios não preenchidos. Tente novamente');
                    return;
                }
                gravar();
            }} />
        </View >
    );
}