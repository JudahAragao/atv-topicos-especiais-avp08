import * as React from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable'
import Separator from '../../components/Separator';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Ícone mensagem erro
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {
    const [user, setUser] = React.useState(null);
    const [cellphone, setCellphone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [userType, setUserType] = React.useState('cliente');

    // Inicializar o objeto auth
    const auth = getAuth();
    const db = getFirestore();

    React.useEffect(() => {
        // Verificar se o usuário está logado
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);

            // Função para carregar os dados do perfil do usuário, caso existam
            const loadProfileData = async (userId) => {
                try {
                    // Obter referência do documento na coleção "Profiles"
                    const docRef = doc(db, 'Profiles', userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // Se o documento existir, preencher os campos do formulário com os dados do perfil
                        const data = docSnap.data();
                        setCellphone(data.cellphone || '');
                        setEmail(data.email || '');
                        setName(data.name || '');
                        setUserType(data.userType || '');
                    } else {
                        // Caso não exista documento, limpar os campos do formulário
                        setCellphone('');
                        setEmail('');
                        setName('');
                        setUserType('cliente');
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados do perfil:', error);
                }
            };

            if (user) {
                // Se o usuário estiver logado, carregar os dados do perfil
                loadProfileData(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSaveProfile = async () => {
        if (user) {
            try {
                // Obter o ID do usuário logado
                const { uid } = user;

                // Verificar se já existe um documento na coleção "Profiles" com o ID do usuário
                const docRef = doc(db, 'Profiles', uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Se o documento existir, atualizar os dados do perfil no Firestore
                    await updateDoc(docRef, {
                        cellphone,
                        email,
                        name,
                        userType,
                    });

                    console.log('Dados do perfil atualizados com sucesso!');
                } else {
                    // Caso não exista documento, cadastrar os dados do perfil no Firestore
                    await setDoc(docRef, {
                        userId: uid,
                        cellphone,
                        email,
                        name,
                        userType: 'cliente',
                    });

                    console.log('Dados cadastrados com sucesso!');
                }
            } catch (error) {
                console.error('Erro ao salvar perfil:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} >
            <Animatable.View
                animation="fadeInLeft"
                delay={500}
                style={styles.containerHeader}
            >
                <Text style={styles.message}>Meu Perfil</Text>
            </Animatable.View>

            <Animatable.View
                animation="fadeInUp"
                style={styles.containerForm}
            >
                <Text style={styles.label}>Celular</Text>
                <TextInput
                    placeholder="Celular"
                    value={cellphone}
                    onChangeText={setCellphone}
                    style={styles.input}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <Text style={styles.label}>Nome</Text>
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveProfile}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    );
};

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

export default Perfil;