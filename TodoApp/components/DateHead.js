import React from 'react';
import {View, Text, StyleSheet, StatusBar} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DateHead({date}) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const {top} = useSafeAreaInsets();

    const formatted = `${year}년 ${month}월 ${day}일`;
    return (
        <>
            <View style={[styles.statusBarPlaceholser, {height: top}]}></View>
            <StatusBar backgroundColor="#26a69a" barStyle="light-content" />
            <View style={styles.block}>
                <Text style={styles.dateText}>{formatted}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    statusBarPlaceholser: {
        backgroundColor: '#26a69a',
    },
    block: {
        padding: 16,
        backgroundColor: '#26a69a',
    },
    dateText: {
        fontSize: 24,
        color: 'white',
    },
});

export default DateHead;