import React from 'react';
import {Text} from 'react-native';
import Profile from "./Profile.tsx";
import MessageForm from "./MessageForm.tsx";
import Counter from "./Counter.tsx";
import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./screens/RootStack.tsx";
import qs from 'qs';

function App(): React.JSX.Element {

  return (
     <NavigationContainer>
         <RootStack />
     </NavigationContainer>
  );
}

export default App;
