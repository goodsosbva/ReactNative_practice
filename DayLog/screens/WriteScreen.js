import React, {useContext, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import LogContext from "../contexts/LogContext";
import {useNavigation} from "@react-navigation/native";

function WriteScreen() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigation = useNavigation();

    const {onCreate} = useContext(LogContext);
    const onSave = () => {
        onCreate({
            title,
            body,
            date: new Date().toISOString(),
        });
        navigation.pop();
    }
    return (
        <SafeAreaView style={styles.block} >
            <KeyboardAvoidingView
                style={styles.avoidingVew}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <WriteHeader onSave={onSave} />
                <WriteEditor
                    title={title}
                    body={body}
                    onChangeTitle={setTitle}
                    onChangeBody={setBody}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'white',
    },
    avoidingVew: {
        flex: 1,
    },
});

export default WriteScreen;