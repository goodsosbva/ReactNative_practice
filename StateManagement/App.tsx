import React from 'react';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import AuthApp from './components/AuthApp.tsx'
import rootReducer from "./slice";

const store = createStore(rootReducer);

function App(): React.JSX.Element {
   return (
       <Provider store={store}>
          <AuthApp />
       </Provider>
   )

}

export default App;
