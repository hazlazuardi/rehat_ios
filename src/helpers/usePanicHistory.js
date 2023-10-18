import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { getStandardTimestamp, useMonitoring } from '../context/MonitoringProvider';
import { Dimensions } from 'react-native';
import { getMonday } from './helpers';



// Modify this so instead of Date.now(), it's the date from Avatar's app
const currentEpochTime = () => Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Round down to the nearest day

export const weekIntervalWidth = Dimensions.get('screen').width - 32;

function usePanicHistory(props) {
    const scrollViewRef = useRef(null);

    const {
        data,
        handleInitializeCurrentWeek,
        handleNewData,
        handleClearData,
        handleClearAllData,
    } = useMonitoring()

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

    return {
        data,
        handleNewData,
        handleClearData,
        handleClearAllData,
        scrollViewRef,
    }
}

usePanicHistory.propTypes = {}

export default usePanicHistory
