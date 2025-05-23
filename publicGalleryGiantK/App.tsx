import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./screens/RootStack";
import {UserContextProvider} from "./contexts/UserContext";


function App(): React.JSX.Element {
  return (
      <UserContextProvider>
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
      </UserContextProvider>
  );
}

export default App;
