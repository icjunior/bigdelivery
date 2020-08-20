import * as React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MenuConexao() {
    const netInfo = useNetInfo();
    const [backGroundColor, setBackGroundColor] = React.useState('#FFFFFF');
    const [icon, setIcon] = React.useState('lan-connect');

    React.useEffect(() => {
        if (netInfo.isConnected) {
            setBackGroundColor('#FFFFFF');
            setIcon('lan-connect');
        } else {
            setBackGroundColor('#FFFF00');
            setIcon('lan-disconnect');
        }
    }, [netInfo]);

    return (
        <MaterialCommunityIcons name={icon} size={24} color={backGroundColor} style={{ paddingRight: 10 }} />
    )
} 