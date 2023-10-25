import React, { useReducer, createContext, useCallback, useContext, useEffect } from 'react';
import { generateDummyDataForPreviousWeeks, initializeCurrentWeek } from '../data/dummyPanicAttackHistory';
import { watchEvents } from 'react-native-watch-connectivity';
import { formatDate, getMonday } from '../helpers/helpers';
import { trigger } from 'react-native-haptic-feedback';
import { weekIntervalWidth } from '../helpers/usePanicHistory';
import { storage } from '../../App';


const MonitoringContext = createContext(null)

// Keep track of duplicate User Info
const processedTimestamps = new Set();

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

export function initializeWeeks(numPrevWeeks, numNextWeeks) {
    const today = new Date();

    // Adjust today to the start of the day in UTC
    today.setUTCHours(0, 0, 0, 0);

    // Get the Monday of the current week
    const currentWeekMonday = getMonday(today);

    // Calculate the epoch timestamp for the start and end dates
    const startEpoch = currentWeekMonday.getTime() - (numPrevWeeks * 7 * 24 * 3600 * 1000);
    const endEpoch = currentWeekMonday.getTime() + ((numNextWeeks + 1) * 7 * 24 * 3600 * 1000) - 1;  // +1 to include the current week

    const dummyData = {};

    for (let epoch = startEpoch; epoch <= endEpoch; epoch += 24 * 3600 * 1000) {
        const currentDayEpoch = epoch;  // No need to round down as epoch is already at the start of a day

        const weekStartEpoch = getMonday(currentDayEpoch).getTime();

        if (!dummyData[weekStartEpoch]) dummyData[weekStartEpoch] = {};
        if (!dummyData[weekStartEpoch][currentDayEpoch]) dummyData[weekStartEpoch][currentDayEpoch] = { date: currentDayEpoch, value: 0 };

        dummyData[weekStartEpoch][currentDayEpoch].value = 0;
    }

    return dummyData;
}

function findStartOfMonthIndex(weeksData) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return weeksData.findIndex(weekData => {
        const weekStartDate = new Date(weekData[0].dateAdded);
        return weekStartDate >= firstDayOfMonth;
    });
}

function findTodayWeekIndex(weeksData) {
    const now = new Date();
    return weeksData.findIndex(weekData => {
        const weekStartDate = new Date(weekData[0].date);
        const weekEndDate = new Date(weekData[weekData.length - 1].date);
        return weekStartDate <= now && weekEndDate >= now;
    });
}



// Initial State
// const currentWeekData = generateDummyDataForPreviousWeeks(4);
// const initialState = initializeCurrentWeek(currentWeekData);


// Provider Component
export const MonitoringProvider = ({ children }) => {

    const storedData = storage.getString('panicHistory');
    const initialState = storedData ? JSON.parse(storedData) : initializeWeeks(1, 1);

    const [data, dispatch] = useReducer(monitoringReducer, initialState);


    // To Do: Receive userInfo from watch
    useEffect(() => {
        console.log('subsInfo')
        const unsubscribe = watchEvents.on('user-info', userInfo => {
            userInfo.forEach(info => {
                const timestamp = info['timestamp'] * 1000;
                if (!processedTimestamps.has(timestamp)) {
                    console.log('received user info', info['timestamp']);
                    console.log('parsed', formatDate(timestamp).timeString);
                    dispatch({ type: 'addPanicEntry', payload: { date: timestamp, value: 1 } })
                    processedTimestamps.add(timestamp);  // Mark this timestamp as processed
                }
            });
        });
        return () => {
            unsubscribe();
        };

    }, [dispatch])

    const value = {
        data,
        dispatch
    };

    // storage.clearAll()

    return (
        <MonitoringContext.Provider value={{ ...value }}>
            {children}
        </MonitoringContext.Provider>
    );
};

// Reducer
// TODO: add a case to store each entry from Avatar
// Reducer
function monitoringReducer(state, action) {
    switch (action.type) {
        case 'initializePanicHistory': {
            return initializeWeeks(26, 26);
        }
        case 'addPanicEntry': {
            const { date, value } = action.payload;
            const weekStartTimestamp = getWeekStartTimestamp(date);
            const newState = {
                ...state,
                [weekStartTimestamp]: {
                    ...state[weekStartTimestamp],
                    [date]: { date, value: (state[weekStartTimestamp]?.[date]?.value || 0) + value },
                },
            };
            storage.set('panicHistory', JSON.stringify(newState));
            return newState;
        }
        case 'clearTodayHistory': {
            const { date } = action.payload;
            const weekStartTimestamp = getWeekStartTimestamp(date);
            const newState = {
                ...state,
                [weekStartTimestamp]: {
                    ...state[weekStartTimestamp],
                    [date]: { date, value: 0 },
                },
            };
            storage.set('panicHistory', JSON.stringify(newState));
            return newState;
        }
        case 'clearAllHistory': {
            const newState = initializeWeeks(20, 20);
            storage.set('panicHistory', JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
}


// to make it accessible by others
export function useMonitoring() {
    return useContext(MonitoringContext)
}


