import React, {useEffect, useRef} from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorages from '../storages/logsStorage';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
    const initialLogsRef = useRef(null);
    const [logs, setLogs] = useState([]);

    const onModify = (modified) => {
        const nextLogs = logs.map((log) =>
            log.id === modified.id ? modified : log,
        );
        setLogs(nextLogs);
    };

    const onCreate = ({title, body, date}) => {
        const log = {
            id: uuidv4(),
            title,
            body,
            date,
        };
        setLogs([log, ...logs]);
    };

    const onRemove = (id) => {
        const nextLogs = logs.filter((log) => log.id !== id);
        setLogs(nextLogs);
    };

    useEffect(() => {
        (async () => {
            const saveLogs = await logsStorage.get();
            if (saveLogs) {
                initialLogsRef.current = saveLogs;
                setLogs(saveLogs);
            }
        })();
    }, []);

    useEffect(() => {
        if (logs === initialLogsRef.current) {
            return;
        }
        logsStorage.set(logs);
    }, [logs]);

    return (
        <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;
