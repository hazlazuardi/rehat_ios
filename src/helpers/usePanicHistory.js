import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getStandardTimestamp, useMonitoring } from '../context/MonitoringProvider';
import { Dimensions } from 'react-native';
import { getFirstWeekOfMonth, getMonday } from './helpers';
import { trigger } from 'react-native-haptic-feedback';
import { storage } from '../../App';



// Helper function to get the start of the week (Monday) for a given date
const getMondayTimestamp = (d) => {
    const date = new Date(d);
    const day = date.getUTCDay();
    const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), diff));
    return monday.getTime();
};

export const weekIntervalWidth = Dimensions.get('screen').width - 32;

function usePanicHistory(props) {
    const { data, dispatch } = useMonitoring();
    const scrollViewRef = useRef(null);

    const scrollToCurrentDay = useCallback(() => {
        const today = new Date();
        const currentWeekStartEpoch = getMondayTimestamp(today);
        const weekIndices = Object.keys(data).map(Number);
        const currentWeekIndex = weekIndices.indexOf(currentWeekStartEpoch);

        if (currentWeekIndex !== -1) {
            const scrollOffset = currentWeekIndex * weekIntervalWidth;
            scrollViewRef.current?.scrollTo({ x: scrollOffset, animated: true });
        }

    }, [data]);

    useEffect(() => {
        scrollToCurrentDay();
    }, [data, scrollToCurrentDay]);

    const handleNewData = useCallback((timestamp) => {
        // const epochTime = Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Modify this line
        dispatch({ type: 'ADD_DATA', payload: { date: timestamp, value: 1 } });
    }, []);

    const handleClearData = useCallback(() => {
        const epochTime = Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Modify this line
        dispatch({ type: 'clearTodayHistory', payload: { date: epochTime, value: 1 } });
    }, []);

    const handleClearAllData = useCallback(() => {
        dispatch({ type: 'clearAllHistory' });
    }, []);

    return {
        data,
        scrollViewRef,
        scrollToCurrentDay,
        handleNewData,
        handleClearData,
        handleClearAllData,
    }
}

usePanicHistory.propTypes = {}

export default usePanicHistory
