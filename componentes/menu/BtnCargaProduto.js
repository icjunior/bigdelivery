import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Alert, View, Modal, ToastAndroid, ActivityIndicator, Text } from 'react-native';
import { getCarga } from '../../api/MercadoriaService';
import { getCargaVenda } from '../../api/VendaService';
import { codigoLojaConfig } from '../../services/Configuracao';
import { styleModal } from '../styles/StyleModal';

export default function BtnCargaProduto() {
    const [processamento, setProcessamento] = React.useState(false);

    const processarCarga = () => {
        setProcessamento(true);
        codigoLojaConfig()
            .then((codigoLoja) => {
                Promise.all([getCarga(codigoLoja), getCargaVenda(codigoLoja)])
                    .then((values) => {
                        setProcessamento(false);
                        ToastAndroid.showWithGravity(
                            "Carga de produtos e preços executada com sucesso",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    })
                    .catch((erro) => {
                        console.warn(erro);
                    })
            })
            .catch((erro) => {
                console.warn(erro);
            })
    }

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
                                processarCarga();
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