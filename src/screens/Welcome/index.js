import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import * as Animatable from 'react-native-animatable'

import { useNavigation } from "@react-navigation/native";

export default Welcome = () => {
    const navigation = useNavigation()

    return <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Animatable.Image
                animation="flipInY"
                source={require('../../../assets/logo.png')}
                style={{ width:'100%'}}
                resizeMode="contain"
            />
        </View>

        <Animatable.View 
            style={styles.containerForm}
            animation="fadeInUp"
            delay={600}
        >
            <Text style={styles.title}>Agende já a limpeza do seu carro!</Text>
            <Text style={styles.paragrafo}>Faça login para começar</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={()=> navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Começar!</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#00455F'
    },
    containerLogo: {
        flex: 2,
        backgroundColor:'#00455F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor:'#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    paragrafo: {
        color: '#A1A1A1'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#00455F',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }
})