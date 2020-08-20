import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Button, Modal, ActivityIndicator } from 'react-native';
import { codigoLojaConfig } from '../services/Configuracao';
import { numeroPedidoConfig } from '../services/Configuracao';
import BtnProximo from './menu/BtnProximo';
import { montaMaterial } from '../services/ItemService';
import { validaEAN } from '../function/ValidaEAN';
import { getMercadoria } from '../api/MercadoriaService';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { atualizaNumeroPedido } from '../services/Configuracao';
import * as repository from '../repository/PedidoRepository';
import * as mercadoriaRepository from '../repository/MercadoriaRepository';

export default function InclusaoItens({ route, navigation }) {
    navigation.setOptions({
        headerRight: () => (
            <BtnProximo itens={itens} codigoLoja={codigoLoja} codPedido={codPedido} />
        )
    });

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [codigoLoja, setCodigoLoja] = React.useState(0);
    const [codPedidoItem, setCodPedidoItem] = React.useState(1);
    const [processamento, setProcessamento] = React.useState(false);
    const [codPedido, setCodPedido] = React.useState(0);

    React.useEffect(() => {
        if (route.params?.cabecalho == undefined) {
            codigoLojaConfig()
                .then(loja => {
                    setCodigoLoja(loja);
                    numeroPedidoConfig().then(
                        (pedido) => {
                            setCodPedido(++pedido);
                        }
                    )
                })
                .catch((erro) => {
                    Alert.alert('Parâmetros', 'Erro ao recuperar código da loja nos parâmetros.');
                    console.warn(erro);
                });
        } else {
            let { cabecalho } = route.params;
            setCodigoLoja(cabecalho.codigo_loja);
            setCodPedido(cabecalho.id);
            repository.carregaItem(cabecalho.id)
                .then((itens) => {
                    setItens(itens);
                })
                .catch((error) => {
                    console.warn(error);
                })
        }
    }, []);

    React.useEffect(() => {
        if (codigoLoja != 0 && codPedido != 0 && route.params?.cabecalho == undefined) {
            repository.criaPedido(codPedido, codigoLoja);
            atualizaNumeroPedido(codPedido);
        }
    }, [codigoLoja, codPedido]);

    React.useEffect(() => {
        if (route.params.produtoScaneado != null) {
            setMaterial(route.params.produtoScaneado);
        }
    }, [route.params.produtoScaneado]);

    gravar = () => {
        mercadoriaRepository.buscaItem(("00000000000000000" + material).slice(-17))
            .then((descricao) => {
                setItens([...itens, montaMaterial(codigoLoja, codPedidoItem, material, quantidade, descricao)]);
                setCodPedidoItem(codPedidoItem + 1);
                repository.gravaItem(codPedido, codigoLoja, codPedidoItem, material, quantidade);
                setQuantidade('');
                setMaterial('');
                setProcessamento(false);
            })
            .catch((erro) => {
                setProcessamento(false);
                setTimeout(() => {
                    Alert.alert('Pesquisa de produtos', `O produto ${material} não possui cadastro no Zanthus`);
                }, 1);
            })
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={processamento}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <ActivityIndicator size="large" />
                        <Text>Aguarde</Text>
                        <Text>Processando</Text>
                    </View>
                </View>
            </Modal>

            <View>
                <Text style={{ fontSize: 20, margin: 10 }}>Pedido número: {codPedido}</Text>
            </View>
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
                <Button title="Gravar" onPress={() => {
                    if (material == '' || quantidade == '') {
                        Alert.alert('', 'Campos obrigatórios não preenchidos. Tente novamente');
                        return;
                    }
                    setProcessamento(true);
                    gravar();
                }} />
            </View>
        </SafeAreaView>
    );
}