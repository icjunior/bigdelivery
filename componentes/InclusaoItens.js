import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { codigoLojaConfig } from '../services/Configuracao';
import BtnProximo from './menu/BtnProximo';
import { montaMaterial } from '../services/ItemService';
import { validaEAN } from '../function/ValidaEAN';
import { getMercadoria } from '../api/MercadoriaService';

export default function InclusaoItens({ navigation }) {
    navigation.setOptions({
        headerRight: () => (
            <BtnProximo itens={itens} codigoLoja={codigoLoja} />
        )
    })

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [codigoLoja, setCodigoLoja] = React.useState(0);
    const [codPedidoItem, setCodPedidoItem] = React.useState(1);

    React.useEffect(() => {
        codigoLojaConfig().then(loja => { setCodigoLoja(loja) });
    }, []);

    gravar = () => {
        getMercadoria(null, 2, material)
            .then((resposta) => {
                setDescricao(resposta.descricao);
                setItens([...itens, montaMaterial(codigoLoja, codPedidoItem, material, quantidade, descricao)]);
                setCodPedidoItem(codPedidoItem + 1);
                setQuantidade('');
                setMaterial('');
            })
            .catch((erro) => Alert.alert('Pesquisa de produto', `O produto ${material} não possui cadastro no Zanthus`));
    }

    converteProdutoPesado = (produtoZanthus) => {
        valor = material.substring(7, 12) / 100;
        quantidadeCalculada = valor / produtoZanthus.precoUnitario;
        setMaterial(material.substring(1, 7));
        setQuantidade(quantidadeCalculada.toFixed(3));
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Material:</Text>
                <TextInput
                    placeholder="material"
                    style={{ fontSize: 50 }}
                    onChangeText={material => { setMaterial(material) }}
                    onBlur={() => {
                        if (material.length == 13 && material.startsWith("2")) {
                            validaEAN(2, material).then((resposta) => {
                                converteProdutoPesado(resposta);
                            });
                        }
                    }}
                    value={material.toString()}
                    keyboardType="numeric"
                />
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Quantidade:</Text>
                <TextInput
                    placeholder='quantidade'
                    style={{ fontSize: 50 }}
                    onChangeText={quantidade => setQuantidade(quantidade)}
                    value={quantidade.toString()}
                    autoFocus={true}
                    keyboardType="decimal-pad"
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