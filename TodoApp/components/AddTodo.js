import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    Keyboard
} from "react-native";

function AddTodo({onInsert}) {
    const [text, setText] = useState('');

    console.log(text);

    const onPress = () => {
        onInsert(text);
        setText('');
        Keyboard.dismiss();
    }

    const button = (
        <View style={styles.buttonStyle}>
            <Image source={require('../assets/icons/add_white/add_white.png')} />
        </View>
    );

    return (
        <View style={styles.block} >
            <TextInput
                placeholder="할일을 입력하세요."
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={onPress}
                returnKeyType="done"
            />
            {Platform.select({
                ios: <TouchableOpacity activeOpacity={0.5} onPress={onPress}>{button}</TouchableOpacity>,
                android: (
                    <View style={styles.buttonStyle}>
                        <TouchableNativeFeedback onPress={onPress}>{button}</TouchableNativeFeedback>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        height: 64,
        paddingHorizontal: 16,
        borderColor: '#bdbdbd',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        backgroundColor: '#26a69a',
        borderRadius: 24,
    },
    circleWrapper: {
        overflow: 'hidden',
        borderRadius: 24,
    },
});

export default AddTodo;