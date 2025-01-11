import React from "react";
import {View, StyleSheet} from 'react-native';

function Box(props) {
    return <View style={[styles.box, styles.rounded]} />;
}

const styles = StyleSheet.create({
    box: {
        width: 64,
        height: 64,
        backgroundColor: 'black',
    },
    rounded: {
        borderRadius: 16,
    },
});

export default Box;