import React, { useReducer, createContext, useCallback, useContext } from 'react';
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

function getWeekStartTimestamp(timestamp) {
    const standardTimestamp = Math.floor(timestamp / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
    const dayOfWeek = new Date(standardTimestamp).getDay();
    const adjustment = (dayOfWeek + 6) % 7;
    return standardTimestamp - adjustment * 24 * 3600 * 1000;
}


// Initial State
// const currentWeekData = generateDummyDataForPreviousWeeks(4);
// const initialState = initializeCurrentWeek(currentWeekData);


// Provider Component
export const MonitoringProvider = ({ children }) => {
    const [data, dispatch] = useReducer(monitoringReducer, initializeWeeks(1, 1));


    // To Do: Receive userInfo from watch
    const unsubscribe = watchEvents.on('user-info', userInfo => {
        userInfo.forEach(info => {
            const timestamp = info['timestamp'] * 1000;
            if (!processedTimestamps.has(timestamp)) {
                console.log('received user info', info['timestamp']);
                console.log('parsed', formatDate(timestamp).timeString);
                dispatch({ type: 'ADD_DATA', payload: { date: timestamp, value: 1 } })
                processedTimestamps.add(timestamp);  // Mark this timestamp as processed
            }
        });
    });

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
function monitoringReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_CURRENT_WEEK': {
            const weekStartTimestamp = action.payload;
            // return initializeWeek(state, weekStartTimestamp);
            return initializeWeeks(26, 26)
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
            // return generateDummyDataForPreviousWeeks(20)
            return initializeWeeks(20, 20)
        }

        default:
            return state;
    }
}


// to make it accessible by others
export function useMonitoring() {
    return useContext(MonitoringContext)
}


