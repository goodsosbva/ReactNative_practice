import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from "./SiginInScreen";
import WelcomeScreen from "./WelcomeScreen";
import {useUserContext} from "../contexts/UserContext";
import MainTab from "./MainTab";

const Stack = createNativeStackNavigator();

function RootStack() {
    const {user} = useUserContext();

    return (
        <Stack.Navigator>
        {user ? (
            <>
                <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
            </>
        ) : (
            <>
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
            </>
        )}
    </Stack.Navigator>
    )}

export default RootStack;
