import React from 'react';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import AuthApp from './components/AuthApp.tsx'
import TodoApp from "./components/TodoApp.tsx";
import rootReducer from "./slices";

const store = createStore(rootReducer);

function App(): React.JSX.Element {
   return (
       <Provider store={store}>
          <TodoApp />
       </Provider>
   )

}

export default App;
