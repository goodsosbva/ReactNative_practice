import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from "./SiginInScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
    return <Stack.Navigator>
        <Stack.Screen
            name="SiginIn"
            component={SignInScreen}
            options={{headerShown: false}}
        />
    </Stack.Navigator>
}

export default RootStack;
