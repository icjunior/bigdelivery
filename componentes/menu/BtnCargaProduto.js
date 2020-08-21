import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Alert, View, Modal, ActivityIndicator, Text } from 'react-native';
import { getCarga } from '../../api/MercadoriaService';
import { getCargaVenda } from '../../api/VendaService';
import { codigoLojaConfig } from '../../services/Configuracao';
import * as VendaRepository from '../../repository/VendaRepository';
import * as MercadoriaRepository from '../../repository/MercadoriaRepository';
import { styleModal } from '../styles/StyleModal';

export default function BtnCargaProduto() {
    const [processamento, setProcessamento] = React.useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={processamento}>
                <View style={styleModal.viewPrincipalModal}>
                    <View style={styleModal.viewSecundariaModal}>
                        <ActivityIndicator size="large" color="red" />
                        <Text>Aguarde</Text>
                        <Text>Processando carga de produtos e preços</Text>
                        <Text>Isso poderá levar alguns minutos</Text>
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
                                        getCarga(codigoLoja)
                                            .then((resposta) => {
                                                MercadoriaRepository.insereMaterial(resposta);
                                                getCargaVenda(codigoLoja)
                                                    .then((resposta) => {
                                                        VendaRepository.gravaCarga(resposta);
                                                        setProcessamento(false);
                                                        setTimeout(() => {
                                                            Alert.alert(`Carga de produtos e preços executada`);
                                                        }, 2);
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