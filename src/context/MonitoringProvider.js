import React, { useReducer, createContext, useCallback, useContext } from 'react';
import { generateDummyDataForPreviousWeeks, getMonday, initializeCurrentWeek } from '../data/dummyPanicAttackHistory';


const MonitoringContext = createContext(null)

// Helper Functions
export const getStandardTimestamp = (date) => Math.floor(date.getTime() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
export const initializeWeek = (state, weekStartTimestamp) => {
    const newState = { ...state };
    for (let i = 0; i < 7; i++) {
        const dayTimestamp = weekStartTimestamp + i * 24 * 3600 * 1000;
        if (!newState[weekStartTimestamp][dayTimestamp]) {
            newState[weekStartTimestamp][dayTimestamp] = { date: dayTimestamp, value: 0 };
        }
    }
    return newState;
};

// Initial State
const currentWeekData = generateDummyDataForPreviousWeeks(4);
const initialState = initializeCurrentWeek(currentWeekData);

// Reducer
// TODO: add a case to store each entry from Avatar
function monitoringReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_CURRENT_WEEK': {
            const weekStartTimestamp = action.payload;
            return initializeWeek(state, weekStartTimestamp);
        }
        case 'ADD_DATA': {
            const { date, value } = action.payload;
            const standardTimestamp = Math.floor(date / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
            const dayOfWeek = new Date(standardTimestamp).getDay();
            const adjustment = (dayOfWeek + 6) % 7;
            const weekStartTimestamp = standardTimestamp - adjustment * 24 * 3600 * 1000;
            const newState = { ...state };

            if (!newState[weekStartTimestamp]) {
                newState[weekStartTimestamp] = {};
            }

            // Initialize all days of the week with a value of 0, if they don't already exist
            for (let i = 0; i < 7; i++) {
                const dayTimestamp = weekStartTimestamp + i * 24 * 3600 * 1000;
                if (!newState[weekStartTimestamp][dayTimestamp]) {
                    newState[weekStartTimestamp][dayTimestamp] = { date: dayTimestamp, value: 0 };
                }
            }

            // Update the value for the specific day
            if (!newState[weekStartTimestamp][standardTimestamp]) {
                newState[weekStartTimestamp][standardTimestamp] = { date: standardTimestamp, value: 0 };
            }
            newState[weekStartTimestamp][standardTimestamp].value += value;

            return newState;
        }

        case 'clearTodayHistory': {
            const { date } = action.payload;
            const standardTimestamp = Math.floor(date / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
            const weekStartTimestamp = getMonday(standardTimestamp).getTime();

            // Clone the current state
            const newState = { ...state };

            // If the week or day doesn't exist, don't create a new one
            if (!newState[weekStartTimestamp] || !newState[weekStartTimestamp][standardTimestamp]) {
                return state;
            }

            // Set the value for the specific day to 0
            newState[weekStartTimestamp][standardTimestamp].value = 0;

            return newState;
        }

        case 'clearAllHistory': {
            return {}
        }

        default:
            return state;
    }
}

// Provider Component
export const MonitoringProvider = ({ children }) => {
    const [data, dispatch] = useReducer(monitoringReducer, initialState);


    const handleInitializeCurrentWeek = useCallback((weekStartTimestamp) => {
        dispatch({ type: 'INITIALIZE_CURRENT_WEEK', payload: weekStartTimestamp });
    }, []);

    const handleNewData = useCallback(() => {
        const epochTime = Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Modify this line
        dispatch({ type: 'ADD_DATA', payload: { date: epochTime, value: 1 } });
    }, []);

    const handleClearData = useCallback(() => {
        const epochTime = Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Modify this line
        dispatch({ type: 'clearTodayHistory', payload: { date: epochTime, value: 1 } });
    }, []);

    const handleClearAllData = useCallback(() => {
        dispatch({ type: 'clearAllHistory' });
    }, []);

    const value = {
        data,
        handleInitializeCurrentWeek,
        handleNewData,
        handleClearData,
        handleClearAllData,
    };

    return (
        <MonitoringContext.Provider value={{ ...value }}>
            {children}
        </MonitoringContext.Provider>
    );
};

// to make it accessible by others
export function useMonitoring() {
    return useContext(MonitoringContext)
}
