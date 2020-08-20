import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Alert, View, Modal, ActivityIndicator, Text } from 'react-native';
import { getCarga } from '../../api/MercadoriaService';
import { getCargaVenda } from '../../api/VendaService';
import { codigoLojaConfig } from '../../services/Configuracao';
import * as VendaRepository from '../../repository/VendaRepository';
import * as MercadoriaRepository from '../../repository/MercadoriaRepository';

export default function BtnCargaProduto() {
    const [processamento, setProcessamento] = React.useState(false);

    return (
        <View>
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
                        <Text>Esse processamento poderá levar alguns minutos</Text>
                        <Text>Não feche o aplicativo</Text>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                Alert.alert('Carga de produtos', 'Executar carga de produtos?',
                    [
                        {
                            text: "Sim",
                            onPress: () => {
                                setProcessamento(true);
                                codigoLojaConfig()
                                    .then((codigoLoja) => {
                                        getCarga(null, codigoLoja)
                                            .then((resposta) => {
                                                MercadoriaRepository.insereMaterial(resposta);
                                                getCargaVenda(codigoLoja)
                                                    .then((resposta) => {
                                                        VendaRepository.gravaCarga(resposta);
                                                        setProcessamento(false);
                                                    })
                                                    .catch((erro) => {
                                                        console.warn(erro);
                                                    })
                                            })
                                            .catch((erro) => {
                                                console.warn(erro);
                                                Alert.alert('Carga de produtos', 'Impossível efetuar carga de produtos');
                                            })
                                    })
                            }
                        },
                        {
                            text: "Não",
                            onPress: () => { return }
                        }
                    ])
            }}>
                <SimpleLineIcons name="social-dropbox" size={24} color="white" style={{ paddingRight: 10 }} />
            </TouchableOpacity>
        </View>
    );
}