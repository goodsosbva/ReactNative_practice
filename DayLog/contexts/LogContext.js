import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
    const [logs, setLogs] = useState([
        {
            id: uuidv4(),
            title: 'Log 03',
            body: 'log 03',
            date: new Date().toISOString(),
        },
        {
            id: uuidv4(),
            title: 'Log 013',
            body: 'log 013',
            date: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        },
        {
            id: uuidv4(),
            title: 'Log 0223',
            body: 'log 0223',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        },
    ]);

    const onCreate = ({title, body, date}) => {
        const log = {
            id: uuidv4(),
            title,
            body,
            date,
        };
        setLogs([log, ...logs]);
    };
    return (
        <LogContext.Provider value={{logs, onCreate}}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;