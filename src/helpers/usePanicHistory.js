import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getStandardTimestamp, useMonitoring } from '../context/MonitoringProvider';
import { Dimensions } from 'react-native';
import { getFirstWeekOfMonth, getMonday } from './helpers';



// Modify this so instead of Date.now(), it's the date from Avatar's app
export const currentEpochTime = () => Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Round down to the nearest day

export const weekIntervalWidth = Dimensions.get('screen').width - 32;

function usePanicHistory(props) {
    const scrollViewRef = useRef(null);

    const {
        data,
        dispatch
    } = useMonitoring()

    const scrollToWeek = (weekTimestamp) => {
        const weekIndices = Object.keys(data).map(Number);
        const weekIndex = weekIndices.indexOf(weekTimestamp);
        if (weekIndex !== -1) {
            const offset = weekIndex * weekIntervalWidth;
            scrollViewRef.current?.scrollTo({ x: offset, animated: false });
        }
    };

    useEffect(() => {
        const today = new Date();
        const standardTimestamp = getStandardTimestamp(today);
        const weekStartTimestamp = getMonday(standardTimestamp).getTime();
        if (data[weekStartTimestamp] && Object.keys(data[weekStartTimestamp]).length !== 7) {
            handleInitializeCurrentWeek(weekStartTimestamp)
        }
    }, [data]);

    useEffect(() => {
        const currentWeekEpoch = getMonday(currentEpochTime()).getTime();
        const weekIndices = Object.keys(data).map(Number);
        const currentWeekIndex = weekIndices.indexOf(currentWeekEpoch);
        if (currentWeekIndex !== -1) {
            const initialOffset = currentWeekIndex * weekIntervalWidth;
            scrollViewRef.current?.scrollTo({ x: initialOffset, animated: false });
        }
    }, [data]);

    useEffect(() => {
        const currentWeekEpoch = getMonday(currentEpochTime()).getTime();
        scrollToWeek(currentWeekEpoch);
    }, [data]);

    const handleInitializeCurrentWeek = useCallback((weekStartTimestamp) => {
        dispatch({ type: 'INITIALIZE_CURRENT_WEEK', payload: weekStartTimestamp });
    }, []);

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

    const handleScrollToToday = useCallback(() => {
        console.log(data)
        scrollToToday(data)
        trigger('impcatHeavy')
    }, [])

    const handleMonthButtonClick = useCallback((year, month) => {
        console.log('gotoMonth', { year, month })
        const firstWeekTimestamp = getFirstWeekOfMonth(year, month);
        scrollToWeek(firstWeekTimestamp);
    }, []);

    return {
        data,
        handleNewData,
        handleClearData,
        handleClearAllData,
        scrollViewRef,
        handleScrollToToday,
        scrollToWeek,
        handleMonthButtonClick
    }
}

usePanicHistory.propTypes = {}

export default usePanicHistory
