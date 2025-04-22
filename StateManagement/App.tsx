import React from 'react';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import TodoApp from "./components/TodoApp.tsx";
import rootReducer from "./slices";
import {configureStore} from "@reduxjs/toolkit";
import PostsApp from './components/PostsApp.tsx';
import {RecoilRoot} from "recoil";
import AuthApp from './components/AuthApp';

const store = configureStore({reducer: rootReducer});

function App(): React.JSX.Element {
   return (
       <Provider store={store}>
          <AuthApp />
       </Provider>
   )

}

export default App;
