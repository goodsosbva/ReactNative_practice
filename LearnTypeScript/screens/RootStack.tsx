import React from 'react';
import {Button, Text, View} from "react-native";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RouteProp, useRoute, useNavigation} from "@react-navigation/native";
import MainTab, {MainTabNavigationScreenParams} from "./MainTab.tsx";

type RootStackParamList = {
    MainTab: MainTabNavigationScreenParams;
    Detail: {
        id: number;
    }
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();
    const onPress = () => {
        navigation.navigate('Detail', {id: 1});
    }

    return (
        <View>
            <Text>Home</Text>
            <Button title="Open Detail" onPress={onPress} />
        </View>
    )
}

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

function DetailScreen() {
    const {params} = useRoute<DetailScreenRouteProp>();
    return (
        <View>
            <Text>Detail {params.id}</Text>
        </View>
    )
}

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainTab" component={MainTab}  options={{headerShown: false}}/>
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default RootStack;
