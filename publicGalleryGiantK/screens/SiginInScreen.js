import {getUser} from '../lib/users';
import React, {useRef, useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButton from "../components/SignButton";
import SignInForm from "../components/SignForm";
import {signIn, signUp} from "../lib/auth";
import {useUserContext} from "../contexts/UserContext";

function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params ?? {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState();
    const {setUser} = useUserContext();

    const createChangeTextHandler = (name) => (value) => {
        setForm({...form, [name]: value});
    };

    const onSubmit = async () => {
        Keyboard.dismiss();

        const {email, password, confirmPassword} = form;

        if (isSignUp && password !== confirmPassword) {
            Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
        }
        const info = {email, password};
        setLoading(true);
        try {
            const {user} = isSignUp ? await signUp(info) : await signIn(info);
            const profile = await getUser(user.uid);
            if (!profile) {
                navigation.navigate('Welcome', {uid: user.uid})
            } else {
                setUser(profile);
            }
            console.log(user);
        } catch (e) {
            const messages = {
                'auth/email-already-in-use': '이미 가입된 이메일',
                'auth/wrong-password': '잘못된 비번',
                'auth/user-not-found': '존재하지 않는 계정',
                'auth/invalid-email': '유효하지 않는 이메일 주소',
            }
            const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
            Alert.alert('실패', msg);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.KeyboardAvoidingView}
            behavior={Platform.select({ios: 'padding'})}>
            <SafeAreaView style={styles.fullscreen}>
                <Text style={styles.text}>PublicGallery</Text>
                <View style={styles.form}>

                    <View style={styles.buttons}>
                        <SignInForm
                            isSignUp={isSignUp}
                            onSubmit={onSubmit}
                            form={form}
                            createChangeTextHandler={createChangeTextHandler}
                        />
                        <SignButton
                            isSignUp={isSignUp}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    KeyboardAvoidingView: {
        flex: 1,
    },
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    form: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal: 16,
    },
    buttons: {
        marginTop: 64,
    },
});

export default SignInScreen;
