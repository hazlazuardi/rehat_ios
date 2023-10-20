import React, { useCallback, useEffect, useRef } from 'react';
import { getMondayTimestamp } from './usePanicHistory';
import { Dimensions } from 'react-native';
// import { getMondayTimestamp } from '../../helpers/helpers';  // Assuming this function is correctly implemented as discussed earlier

export const weekIntervalWidth = Dimensions.get('screen').width - 32;

function useEmotionHistory(weeksData) {
    const scrollViewRef = useRef(null);

    const scrollToCurrentWeek = useCallback(() => {
        const today = new Date();
        const currentWeekStartEpoch = getMondayTimestamp(today);
        const weekIndices = weeksData.map(weekData => getMondayTimestamp(weekData[0].dateAdded));
        const currentWeekIndex = weekIndices.indexOf(currentWeekStartEpoch);

        if (currentWeekIndex !== -1) {
            const scrollOffset = currentWeekIndex * weekIntervalWidth;
            scrollViewRef.current?.scrollTo({ x: scrollOffset, animated: true });
        }
    }, [weeksData]);

    useEffect(() => {
        scrollToCurrentWeek();
    }, [weeksData, scrollToCurrentWeek]);

    return {
        scrollViewRef,
        scrollToCurrentWeek,
    };
}
export default useEmotionHistory;
