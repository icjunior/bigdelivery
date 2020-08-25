import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Button, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { codigoLojaConfig } from '../services/Configuracao';
import { numeroPedidoConfig } from '../services/Configuracao';
import BtnProximo from './menu/BtnProximo';
import { montaMaterial } from '../services/ItemService';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { atualizaNumeroPedido } from '../services/Configuracao';
import * as repository from '../repository/PedidoRepository';
import * as mercadoriaRepository from '../repository/MercadoriaRepository';
import { styleModal } from './styles/StyleModal';
import { buscaPreco } from '../repository/VendaRepository';
import MenuConexao from './menu/MenuConexao';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function InclusaoItens({ route }) {
    const navigation = useNavigation();

    navigation.setOptions({
        headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
                <MenuConexao />
                <BtnProximo itens={itens} codigoLoja={codigoLoja} codPedido={codPedido} />
            </View>
        )
    });

    const [itens, setItens] = React.useState([]);
    const [material, setMaterial] = React.useState('');
    const [quantidade, setQuantidade] = React.useState('');
    const [codigoLoja, setCodigoLoja] = React.useState(0);
    const [codPedidoItem, setCodPedidoItem] = React.useState(1);
    const [processamento, setProcessamento] = React.useState(false);
    const [codPedido, setCodPedido] = React.useState(0);

    const [scanearProduto, setScanearProduto] = React.useState(false);
    const [produto, setProduto] = React.useState('');
    const [scanned, setScanned] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(null);

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
        setMaterial(produto);
        validaProdutoPesado(produto);
    }, [produto]);

    const validaProdutoPesado = (produto) => {
        if (produto.length == 13 && produto.startsWith("2")) {
            buscaPreco(produto.substring(1, 7))
                .then((resposta) => {
                    converteProdutoPesado(resposta);
                })
                .catch((erro) => {
                    Alert.alert('Pesquisa', 'Não foi possível encontrar o preço do produto')
                });
        }
    }

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
        quantidadeCalculada = valor / produtoZanthus.venda;
        setMaterial(material.substring(1, 7));
        setQuantidade(quantidadeCalculada.toFixed(3));
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProduto(data);
        setScanearProduto(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <StatusBar style="light" />
            <Modal
                animationType="slide"
                transparent={true}
                visible={processamento}>
                <View style={styleModal.viewPrincipalModal}>
                    <View style={styleModal.viewSecundariaModal}>
                        <ActivityIndicator size="large" color="red" />
                        <Text>Aguarde</Text>
                        <Text>Processando</Text>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide"
                transparent={true}
                visible={scanearProduto}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Button title="Fechar câmera" onPress={() => {
                        setProduto("2012638010694");
                        setScanearProduto(false)

                    }} />
                    {scanned && <Button title={'Toque na tela novamente para scanear outro produto'} onPress={() => setScanned(false)} />}
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
                        onBlur={() => { validaProdutoPesado(material); }}
                        value={material.toString()}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ justifyContent: "center", paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => {
                        (async () => {
                            const { status } = await BarCodeScanner.requestPermissionsAsync();
                            setHasPermission(status === 'granted');
                            setScanearProduto(true);
                        })();
                    }}>
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
            <View style={{ margin: 10 }}>
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