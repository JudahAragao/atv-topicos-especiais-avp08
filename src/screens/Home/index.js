import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Separator from '../../components/Separator';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Ícone mensagem erro
import { useNavigation } from "@react-navigation/native";

export default Home = ({ route }) => {
    
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Atenção!',
                        'Deseja sair do aplicativo?',
                        [
                            {
                                text: 'Sim',
                                onPress: () => navigation.replace('Login'),
                            },
                            {
                                text: 'Não',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false }
                    );
                }}
                style={{ padding: 10, position: 'absolute', top: 15, right: 10 }}
            >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Sair</Text>
                <MaterialCommunityIcons name="exit-run" color="#FFF" size={26} />

            </TouchableOpacity>

            <Text style={styles.titleText}>Lava a Jato F&A!</Text>
            <Image
                style={styles.imgLogo}
                source={require('../../../assets/logo.png')}
            />
            <Text style={styles.helloText}>Olá {route.params?.name},</Text>
            <Text style={styles.helloText}>Seja bem-vindo(a)!</Text>
            <Separator marginVertical={10} />
            <Text style={styles.helloText}>Não perca tempo e agende agora</Text>
            <View style={styles.contentAlert}>
                <Text style={styles.helloText}>a lavagem do seu carro </Text>
                <View style={styles.contentAlert}></View>
                <FontAwesome5
                    name='smile-wink'
                    size={24}
                    color='#FFF'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00455F'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    helloText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    imgLogo: {
        marginBottom: 0
    },
    contentAlert: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});