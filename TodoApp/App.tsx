/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import DateHead from './components/DateHead';
import AddTodo from "./components/AddTodo";
import Empty from "./components/Empty";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

function App(): React.JSX.Element {
     const today  = new Date();
     console.log(today);

  return (
    <SafeAreaProvider >
        <SafeAreaView edges={['bottom']} style={styles.block}>
            <KeyboardAvoidingView
                behavior={Platform.select({ios: 'padding', android: undefined}) }
                style={styles.avoid}
            >
                <DateHead date={today} />
                <Empty />
                <AddTodo />
            </KeyboardAvoidingView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'white',
    },
    avoid: {
        flex: 1,
    }
});

export default App;
