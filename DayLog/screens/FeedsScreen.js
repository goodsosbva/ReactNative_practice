import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import LogContext from '../contexts/LogContext';
import FloatingWriteButton from '../components/FloatingWriteButton';

function FeedsScreen() {
    const {text, setText} = useContext(LogContext);
    return (
       <View style={styles.block}>
           <FloatingWriteButton />
       </View>
    );
}

function Box({children}) {
    return <View style={styles.box}>{children('Hello World')}</View>;
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    }
});

export default FeedsScreen;