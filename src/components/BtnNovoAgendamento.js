import React from "react";
import { View, Text, StyleSheet, VirtualizedList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones das tabs e de botões telas

export default BtnNovoAgendamento = ({size, color}) => {
    return <View style={styles.container}>
        <MaterialCommunityIcons name="plus" color={color} size={26} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#0099ff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: -15
    }
})