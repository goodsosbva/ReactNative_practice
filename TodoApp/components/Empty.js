import React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";

function Empty() {
    return (
        <View style={styles.block}>
            <Image
                source={require('../assets/images/young_and_happy.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.descripotion}>야호! 할일이 없습니다.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 200,
    },
    descripotion: {
        fontSize: 24,
        color: '#9e9e9e',
    },
});

export default Empty;