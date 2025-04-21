import React from 'react';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import AuthApp from './components/AuthApp.tsx'
import TodoApp from "./components/TodoApp.tsx";
import rootReducer from "./slices";
import {configureStore} from "@reduxjs/toolkit";
import PostsApp from './components/PostsApp.tsx';

const store = configureStore({reducer: rootReducer});

function App(): React.JSX.Element {
   return (
       <Provider store={store}>
          <PostsApp />
       </Provider>
   )

}

export default App;
