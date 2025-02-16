import {useNavigation} from '@react-navigation/native';
import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import TransparentCircleButton from "./TransparentCircleButton";

function WriteHeader({onSave}) {
    const navigation = useNavigation();
    const onGoBack = () => {
        navigation.pop();
    };

    return (
        <View style={styles.block}>
            <View style={styles.iconButtonWrapper}>
                <TransparentCircleButton
                    onPress={onGoBack}
                    name="arrow-back"
                    color="#424242"
                />
            </View>
            <View style={styles.buttons}>
                <TransparentCircleButton
                    onPress={onGoBack}
                    name="delete-forever"
                    color="#ef5350"
                />
                <TransparentCircleButton
D                    name="check"
                    color="#009688"
                    onPress={onSave}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        height: 48,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default WriteHeader;