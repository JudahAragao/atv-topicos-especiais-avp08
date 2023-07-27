import * as React from 'react';
import { KeyboardAvoidingView, Platform, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Ícones inputs e mensagem erro
import Separator from '../../components/Separator';
import { useNavigation } from "@react-navigation/native";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import firebaseConfig from '../../config/firebase'

import * as Animatable from 'react-native-animatable'


export default Register = () => {

    const navigation = useNavigation()

    const [inputUser, setInputUser] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordSecured, setPasswordSecured] = React.useState(true);
    const [passwordConfirmSecured, setPasswordConfirmSecured] = React.useState(true);
    const [statusRegisterError, setStatusRegisterError] = React.useState(false);
    const [messageRegisterError, setMessageRegisterError] = React.useState('');

    // Variáveis de estado dos inputs sendo atualizadas a cada digitação
    const handleChangeText = (key, value) => {
        if (statusRegisterError) {
            setStatusRegisterError(false);
        }
        setInputUser({ ...inputUser, [key]: value });
    };

    const handleLogin = () => {
        setInputUser({ email: '', password: '' });
        navigation.navigate('Login'); //Navega em pilha para tela Login
    }

    // Checa campos de preenchimento obrigatório
    function requiredFields() {
        if (!inputUser.email || !inputUser.password || !passwordConfirm) {
            return false;
        } else {
            return true;
        }
    }

    // Checa se "Senha" e "Confirma Senha" coincidem
    function validPassword() {
        if (inputUser.password !== passwordConfirm) {
            return false;
        } else {
            return true;
        }
    }

    // Função do botão "Salvar"
    const registerFirebase = () => {
        if (!requiredFields()) {
            setMessageRegisterError('Todos os campos são de \npreenchimento obrigatório!');
            setStatusRegisterError(true);
        } else {
            if (!validPassword()) {
                setMessageRegisterError('Os campos "Senha" e "Confirma Senha" \nnão coincidem!');
                setStatusRegisterError(true);
            } else {
                const auth = getAuth(app);
                createUserWithEmailAndPassword(auth, inputUser.email, inputUser.password)
                    .then((userCredential) => {
                        navigation.replace('HomeMenuBottomTab', {
                            screen: 'Home',
                            params: { uid: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email }
                        })
                    })
                    .catch((error) => {
                        if (error.code === 'auth/email-already-in-use') {
                            setMessageRegisterError('"E-mail" (Usuário) já cadastrado!');
                        } else {
                            setMessageRegisterError('"E-mail" e/ou "Senha" inválidos!\n(Senha com mínimo de 6 caracteres)');
                        }
                        setStatusRegisterError(true);
                    });
            }
        }
    }

    return <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
        >
            <Text style={styles.message}>Cadastro</Text>
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
                value={inputUser.password}
                secureTextEntry={passwordSecured}
                textContentType="password"
                autoCapitalize="none"
                onChangeText={(value) => handleChangeText('password', value)}
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                placeholder="Confirme sua senha..."
                style={styles.input}
                value={passwordConfirm}
                secureTextEntry={passwordConfirmSecured}
                textContentType="password"
                autoCapitalize="none"
                onChangeText={(value) => setPasswordConfirm(value)}
            />

            {statusRegisterError === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialIcons
                        name='mood-bad'
                        size={24}
                        color='black'
                    />
                    <Text style={styles.warningAlert}>{messageRegisterError}</Text>
                </View>
                :
                <View></View>
            }

            <TouchableOpacity
                style={styles.button}
                onPress={registerFirebase}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleLogin}
            >
                <Text style={styles.buttonLoginText}>Já tenho uma conta!</Text>
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
    buttonLogin: {
        marginTop: 14,
        alignSelf: 'center'
    },
    buttonLoginText: {
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