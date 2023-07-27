import React from "react";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import HomeMenuBottomTab from "../../components/HomeMenuBottomTab";

import firebaseConfig from '../../config/firebase'

export default Login = () => {

    const navigation = useNavigation()

    const auth = getAuth(firebaseConfig);

    const [inputUser, setInputUser] = React.useState({
        email: '',
        password: '',
    });

    const [passwordSecured, setPasswordSecured] = React.useState(true);
    const [statusLoginError, setStatusLoginError] = React.useState(false);
    const [messageLoginError, setMessageLoginError] = React.useState('');

    const handleChangeText = (key, value) => {
        if (statusLoginError) {
            setStatusLoginError(false);
        }
        setInputUser({ ...inputUser, [key]: value });
    }

    const handleRegister = () => {
        setInputUser({ email: '', password: '' });
        navigation.navigate('Register'); //Navega em pilha para tela Register
    }

    const requiredFields = () => {
        if (!inputUser.email || !inputUser.password) {
            return false;
        }
        else
            return true;
    }

    const loginFirebase = () => {
        if (!requiredFields()) {
            setMessageLoginError('Todos os campos são de \npreenchimento obrigatório!');
            setStatusLoginError(true);
        } else {
            signInWithEmailAndPassword(auth, inputUser.email, inputUser.password)
                .then((userCredential) => {
                    setInputUser({ email: '', password: '' })
                    navigation.replace('HomeMenuBottomTab', {
                        screen: 'Home',
                        params: { uid: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email }
                    })
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/wrong-password':
                            setMessageLoginError('"Senha" inválida!');
                            break;
                        case 'auth/user-not-found':
                            setMessageLoginError('"E-mail" (Usuário) não cadastrado!');
                            break;
                        case 'auth/too-many-requests':
                            setMessageLoginError('Bloqueio temporário. Várias tentativas\ncom senha inválida. Tente mais tarde!');
                            break;
                        case 'auth/user-disabled':
                            setMessageLoginError('Conta de e-mail desativada. Contacte\no administrador do sistema!');
                            break;
                        default:
                            setMessageLoginError('"Email" e/ou "Senha" inválidos!');

                    }
                    setStatusLoginError(true);
                });
        }
    }

    return <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
    >
        <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
        >
            <Text style={styles.message}>Login</Text>
        </Animatable.View>

        <Animatable.View
            animation="fadeInUp"
            style={styles.containerForm}
        >
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                placeholder="Digite seu E-mail..."
                style={styles.input}
                value={inputUser.email}
                onChangeText={(value) => handleChangeText('email', value)}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                placeholder="Digite sua senha..."
                style={styles.input}
                value={inputUser.senha}
                secureTextEntry={passwordSecured}
                textContentType="password"
                autoCapitalize="none"
                onChangeText={(value) => handleChangeText('password', value)}
            />

            {statusLoginError === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialIcons
                        name='mood-bad'
                        size={24}
                        color='black'
                    />
                    <Text style={styles.warningAlert}>{messageLoginError}</Text>
                </View>
                :
                <View></View>
            }

            <TouchableOpacity
                style={styles.button}
                onPress={loginFirebase}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={handleRegister}
            >
                <Text style={styles.buttonRegisterText}>Não tenho uma conta!</Text>
            </TouchableOpacity>

        </Animatable.View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00455F'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#00455F',
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#00455F',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    buttonRegisterText: {
        color: '#A1A1A1'
    },
    contentAlert: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert: {
        paddingLeft: 2,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})