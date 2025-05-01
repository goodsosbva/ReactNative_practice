import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList} from "./tpyes";
import MainTab from "./MainTab";
import ArticleScreen from "./ArticleScreen.tsx";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{headerShown: false}}
            />
            <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
    )
}

export default RootStack;
