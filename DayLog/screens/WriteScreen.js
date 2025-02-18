import React, {useContext, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Alert, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import LogContext from "../contexts/LogContext";
import {useNavigation, useRoute} from '@react-navigation/native';

function WriteScreen() {
    const route = useRoute();
    const log = route.params?.log;

    const [title, setTitle] = useState(log?.title ?? '');
    const [body, setBody] = useState(log?.body ?? '');
    const navigation = useNavigation();

    const {onCreate, onModify, onRemove} = useContext(LogContext);
    const onSave = () => {
        if (log) {
            onModify({
                id: log.id,
                date: log.date,
                title,
                body,
            });
        } else {
            onCreate({
                title,
                body,
                date: new Date().toISOString(),
            });
        }
        navigation.pop();
    };

    const onAskRemove = () => {
        Alert.alert(
            '삭제',
            '정말로 삭제?',
            [
                { text: '취소', style: 'cancel'},
                {
                    text: '삭제',
                    onPress: () => {
                        onRemove(log?.id);
                        navigation.pop();
                    },
                    style: 'destructive',
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <SafeAreaView style={styles.block} >
            <KeyboardAvoidingView
                style={styles.avoidingVew}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <WriteHeader onSave={onSave} onAskRemove={onAskRemove} isEditing={!!log} />
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