import React, {useRef, useState} from 'react';
import {
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

function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params ?? {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const createChangeTextHandler = (name) => (value) => {
        setForm({...form, [name]: value});
    };

    const onSubmit = () => {
        Keyboard.dismiss();
        console.log(form);
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
