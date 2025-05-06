import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList} from "./types.ts";
import MainTab from "./MainTab";
import ArticleScreen from "./ArticleScreen.tsx";
import RegisterScreen from "./RegisterScreen.tsx";
import LoginScreen from "./LoginScreen.tsx";
import MyArtilcesScreen from './RegisterScreen.tsx';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import WriteScreen from './WriteScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    useAuthLoadEffect();
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{headerShown: false}}
            />
            <Stack.Screen name="Register" component={RegisterScreen} options={{title: '회원가입'}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{title: '로그인'}} />
            <Stack.Screen name="MyArticles" component={MyArtilcesScreen} options={{title: '내 게시글'}} />
            <Stack.Screen name="Article" component={ArticleScreen} options={{title: '게시글'}} />
            <Stack.Screen name="Write" component={WriteScreen} options={{title: '새 글 작성'}} />
        </Stack.Navigator>
        
    )
}

export default RootStack;
