import React from 'react';
import {SafeAreaView, View, Text, Button, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../slices';
import {authorize, logout} from "../slices/auth.ts";
import useAuthActions from "../hooks/useAuthActions.ts";
import useUser from "../hooks/useUser";

function AuthStatus() {
    const user = useUser();

    return (
        <View style={styles.status}>
            <Text style={styles.text}>
                {user ? user.displayName : '로그인하세요'}
            </Text>
        </View>
    );
}

function AuthButtons() {
    const {authorize, logout} = useAuthActions();
    const onPressLogin = () => {
        authorize({
            id: 1,
            username: 'khs',
            displayName: 'kwon hs',
        });
    }

    return (
        <View>
            <Button title="로그인" onPress={onPressLogin}  />
            <Button title="로그아웃" onPress={logout}  />
        </View>
    )
}

function AuthApp() {
    return (
        <SafeAreaView style={styles.block}>
            <AuthStatus />
            <AuthButtons />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {flex: 1},
    status: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text: {fontSize: 20},
})

export default AuthApp;
