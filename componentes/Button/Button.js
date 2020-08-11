import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'

export default function Button(props) {
    return (
        <View>
            <TouchableOpacity onPress={() => { props.function }}>
                <Text style={{ fontSize: 20, color: "blue", alignSelf: "center", paddingTop: 20 }}>{props.nameButton}</Text>
            </TouchableOpacity>
        </View>
    );
}