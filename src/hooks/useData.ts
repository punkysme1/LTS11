// src/hooks/useData.ts
import { useState, useEffect } from 'react';
import { dataStore } from '../dataStore';

export const useData = () => {
    const [dataState, setDataState] = useState(dataStore.getState());

    useEffect(() => {
        const unsubscribe = dataStore.subscribe(newState => {
            setDataState(newState);
        });
        return () => unsubscribe();
    }, []);

    return dataState;
};