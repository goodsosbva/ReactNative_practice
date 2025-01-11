/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import Greeting from './components/Greeting';
import Box from './components/Box';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = useState(true);

  const onPress = () => {
      setVisible(!visible);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const name = 'JSX';

  return (
    <SafeAreaView style={backgroundStyle}>
        <Button title={'토글'} onPress={onPress} />
        {visible ? <Box rounded={true} /> : null }

    </SafeAreaView>
  );
}

export default App;
