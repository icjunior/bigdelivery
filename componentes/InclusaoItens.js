import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { codigoLojaConfig } from '../services/Configuracao';
import BtnProximo from './menu/BtnProximo';
import { montaMaterial } from '../services/ItemService';
import { validaEAN } from '../function/ValidaEAN';
import { getMercadoria } from '../api/MercadoriaService';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function InclusaoItens({ route, navigation }) {
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

    React.useEffect(() => {
        setMaterial(route.params.produtoScaneado);
    }, [route.params?.produtoScaneado]);

    gravar = () => {
        getMercadoria(null, 2, material)
            .then((resposta) => {
                setItens([...itens, montaMaterial(codigoLoja, codPedidoItem, material, quantidade, resposta.descricao)]);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <StatusBar style="light" />
            <View style={{ flexDirection: "row" }}>
                <View style={{ margin: 10, flexGrow: 1 }}>
                    <Text style={{ fontSize: 20 }}>Material:</Text>
                    <TextInput
                        placeholder="material"
                        style={{ fontSize: 40 }}
                        onChangeText={material => { setMaterial(material) }}
                        onBlur={() => {
                            if (material.length == 13 && material.startsWith("2")) {
                                validaEAN(2, material)
                                    .then((resposta) => {
                                        converteProdutoPesado(resposta);
                                    })
                                    .catch((erro) => {
                                        Alert.alert('Pesquisa', 'Não foi possível encontrar o cadastro do produto')
                                    });
                            }
                        }}
                        value={material.toString()}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ justifyContent: "center", paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
                        <MaterialIcons name="camera-alt" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20 }}>Quantidade:</Text>
                <TextInput
                    placeholder='quantidade'
                    style={{ fontSize: 50 }}
                    onChangeText={quantidade => setQuantidade(quantidade)}
                    value={quantidade.toString()}
                    keyboardType="decimal-pad"
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    if (material == '' || quantidade == '') {
                        Alert.alert('', 'Campos obrigatórios não preenchidos. Tente novamente');
                        return;
                    }
                    gravar();
                }}>
                    <Text style={{ fontSize: 20, color: "#4682b4", alignSelf: "center", paddingTop: 20 }}>Gravar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}