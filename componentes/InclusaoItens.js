import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import pedidoService from '../api/PedidoService';

export default function InclusaoItens({ navigation }) {

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [quantidade, setQuantidade] = React.useState(0);

    function gravarMaterial() {
        const lancamento =
        {
            codLoja: 13,
            codPedido: 15,
            codPedidoItem: 2,
            codMercadoria: material,
            precoUnitario: 15.00,
            quantidade: quantidade,
            valorDesconto: 0.00
        }
        setItens([...itens, lancamento]);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Quantidade:</Text>
                <TextInput
                    placeholder='Digite'
                    style={{ fontSize: 50 }}
                    onChangeText={quantidade => setQuantidade(quantidade)}></TextInput>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Material:</Text>
                <TextInput
                    placeholder="Digite"
                    style={{ fontSize: 50 }}
                    onChangeText={material => setMaterial(material)}></TextInput>
            </View>
            <Button title="Gravar" onPress={() => gravarMaterial()}></Button>

            <Button title="Finalizar" onPress={() => pedidoService(itens)}></Button>

            <Button title="Finalizar" onPress={() => { navigation.navigate('ListaItens', { itens: itens }) }}></Button>

            <Button title="Finalizar" onPress={() => { Alert.alert('', 'Teste') }}></Button>
        </View >
    );
}