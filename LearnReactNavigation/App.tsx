import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
