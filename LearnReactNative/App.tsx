/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import Greeting from './components/Greeting';
import Box from './components/Box';
import Counter from "./components/Counter";

function App(): React.JSX.Element {
    const [count, setCount] = useState(0);

    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count - 1);
  return (
    <SafeAreaView style={styles.full}>
        <Counter count={count} onIncrease={increase} onDecrease={decrease} />
    </SafeAreaView>
  );
}

const  styles = StyleSheet.create({
    full: {
        flex: 1,
    },
});

export default App;
