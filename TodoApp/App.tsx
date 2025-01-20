/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";

import DateHead from './components/DateHead';
import AddTodo from "./components/AddTodo";
import Empty from "./components/Empty";
import TodoList from "./components/TodoList";
import todosStorage from './storages/todosStorage';

function App(): React.JSX.Element {
     const today  = new Date();

     const [todos, setTodos] = useState([
         {id: 1, text: '작업환경 설정!', done: true},
         {id: 2, text: '리액트 네이티브 기초 공부!', done: false},
         {id: 3, text: '투두리시트 만들어보기', done: false},
     ]);

     // 불러오기
    useEffect(() => {
        todosStorage
            .get()
            .then(setTodos)
            .catch(console.error);
    }, []);

     // 저장
     useEffect(() => {
        todosStorage
            .set(todos)
            .catch(console.error);
    }, [todos]);

     const onInsert = (text: string) => {
         const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

         const todo = {
             id: nextId,
             text,
             done: false,
         };

         setTodos(todos.concat(todo));
     };

     const onToggle = (id: number) => {
         const nextTodos = todos.map(todo =>
         todo.id === id ? {...todo, done: !todo.done} : todo,
         );
         setTodos(nextTodos);
     };

     const onRemove = (id: number) => {
         const nextTodos = todos.filter(todo => todo.id !== id);
         setTodos(nextTodos);
     };

  return (
    <SafeAreaProvider >
        <SafeAreaView edges={['bottom']} style={styles.block}>
            <KeyboardAvoidingView
                behavior={Platform.select({ios: 'padding', android: undefined}) }
                style={styles.avoid}
            >
                <DateHead date={today} />
                {todos.length === 0 ? <Empty /> : <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />}
                <AddTodo onInsert={onInsert} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'white',
    },
    avoid: {
        flex: 1,
    },
});

export default App;
