import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { post } from '../api/PedidoService';
import AsyncStorage from '@react-native-community/async-storage';
import { codigoLojaConfig } from '../services/Configuracao';

export default function InclusaoItens({ navigation }) {

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [quantidade, setQuantidade] = React.useState(0);
    const [codigoLoja, setCodigoLoja] = React.useState();
    const [codPedidoItem, setCodPedidoItem] = React.useState(1);

    React.useEffect(() => {
        codigoLojaConfig().then(loja => { setCodigoLoja(loja) });
    }, []);

    gravarMaterial = () => {
        const lancamento =
        {
            codLoja: codigoLoja,
            codPedidoItem: codPedidoItem,
            codMercadoria: material,
            quantidade: quantidade,
            valorDesconto: 0.00
        }
        setItens([...itens, lancamento]);
        setCodPedidoItem(codPedidoItem + 1);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Quantidade:</Text>
                <TextInput
                    placeholder='quantidade'
                    style={{ fontSize: 50 }}
                    onChangeText={quantidade => setQuantidade(quantidade)} />
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Material:</Text>
                <TextInput
                    placeholder="material"
                    style={{ fontSize: 50 }}
                    onChangeText={material => setMaterial(material)} />
            </View>
            <Button title="Gravar" onPress={() => gravarMaterial()} />

            {/* <Button title="Finalizar" onPress={() => post(itens, codigoLoja)}></Button>

            <Button title="Finalizar" onPress={() => { navigation.navigate('ListaItens', { itens: itens }) }}></Button> */}
        </View >
    );
}