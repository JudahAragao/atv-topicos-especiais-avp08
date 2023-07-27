import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Separator from '../../components/Separator';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Ícone mensagem erro
import { useNavigation } from "@react-navigation/native";

export default Agendamentos = ({ route }) => {

    const navigation = useNavigation()

    return <View>
        <Text style={{color: 'black'}}>Agendamentos</Text>
    </View>
}