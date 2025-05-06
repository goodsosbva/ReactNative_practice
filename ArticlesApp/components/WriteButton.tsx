import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StyleSheet, Pressable, Platform, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProp} from '../screens/types';

function WriteButton() {
    const navigation = useNavigation<RootStackNavigationProp>();
    const onPress = () => {
        navigation.navigate('Write', {});
    };


    return (
        <Pressable
            style={({pressed}) => [
                styles.button,
                Platform.OS === 'ios' && pressed && styles.pressed,
            ]}
            onPress={onPress}
            android_ripple={{color: '#eeeeee'}}
        >                               
            <MaterialIcons name='add-circle' size={24} />
            <Text style={styles.text}>새 글 작성</Text>
        </Pressable>
    );
}   


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderBottomColor: '#cfd8dc',
        borderBottomWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 8,
    },
    pressed: {
        backgroundColor: '#eeeeee',
    },
});

export default WriteButton;
