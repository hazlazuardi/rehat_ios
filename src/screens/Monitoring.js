import React, { useEffect, useReducer, useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { generateDummyDataForPreviousWeeks } from '../data/dummyPanicAttackHistory';
import PrimaryButton from '../components/PrimaryButton';
import { colors, sizes, styles } from '../data/theme';
import { formatDate } from '../helpers/helpers'
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';

const weekIntervalWidth = Dimensions.get('screen').width - 32;

const currentWeekData = generateDummyDataForPreviousWeeks(4);
const currentEpochTime = () => Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Round down to the nearest day

function Monitoring(props) {
    const scrollViewRef = useRef(null);
    const [data, dispatch] = useReducer(dataReducer, currentWeekData);

    const handleNewData = () => {
        const epochTime = currentEpochTime();
        dispatch({ type: 'ADD_DATA', payload: { date: epochTime, value: 1 } });
    };

    const handleClearData = () => {
        const epochTime = currentEpochTime();
        dispatch({ type: 'clearTodayHistory', payload: { date: epochTime, value: 1 } });
    };

    const handleClearAllData = () => {
        const epochTime = currentEpochTime();
        dispatch({ type: 'clearAllHistory' });
    };


    useEffect(() => {
        const currentWeekEpoch = Math.floor((currentEpochTime() - new Date(1970, 0, 1).getTime()) / (7 * 24 * 3600 * 1000)) * 7 * 24 * 3600 * 1000;
        const weekIndices = Object.keys(data).map(Number);
        const currentWeekIndex = weekIndices.indexOf(currentWeekEpoch);
        if (currentWeekIndex !== -1) {
            const initialOffset = currentWeekIndex * weekIntervalWidth;
            scrollViewRef.current?.scrollTo({ x: initialOffset, animated: false });
        }
    }, [data]);

    return (
        <BlurredEllipsesBackground >
            <ScrollView
                style={{ flex: 1 }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <SafeAreaView>

                    <View style={{
                        padding: sizes.padding.md,
                        gap: sizes.gap.lg,
                        paddingBottom: sizes.padding.lg * 2
                    }}>
                        <Text style={{ ...styles.text.header2, color: colors.orange }}>Monitoring</Text>


                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            snapToAlignment='center'
                            snapToInterval={weekIntervalWidth}
                            decelerationRate={'fast'}
                            showsHorizontalScrollIndicator={false}
                        >
                            <BarGraph groupedData={Object.values(data)} />
                        </ScrollView>

                        <PrimaryButton
                            color='green'
                            text='Generate'
                            onPress={handleNewData}
                        />
                        <PrimaryButton
                            color='red'
                            text='Clear'
                            onPress={handleClearData}
                        />
                        <PrimaryButton
                            color='red'
                            text='Clear All'
                            onPress={handleClearAllData}
                        />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    );
}
Monitoring.propTypes = {}


function BarGraph({ groupedData }) {
    return groupedData.map((weekData, weekIndex) => {

        console.log('weekData', weekData)
        return (
            <View key={weekIndex}
                style={{
                    width: weekIntervalWidth,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height: 150
                }}>
                {Object.entries(weekData).map(([dayEpoch, dayData], dayIndex) => (
                    <View key={dayIndex}>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: sizes.padding.sm,
                                color: colors.orange
                            }}
                        >
                            {dayData.value}
                        </Text>
                        <View
                            style={{
                                height: dayData.value * 10,
                                width: weekIntervalWidth / 7,
                                backgroundColor: colors.orange,
                                borderTopStartRadius: 20,
                                borderTopEndRadius: 20
                            }}
                        >
                        </View>
                        <View
                            style={{
                                textAlign: 'center',
                                marginTop: sizes.padding.sm,
                                color: colors.white,
                                // width: '100%'
                            }}
                        >
                            <Text style={{ ...styles.text.caption, textAlign: 'center' }}>
                                {formatDate(dayData.date).dateString.slice(0, 3)}
                            </Text>
                            <Text style={{ ...styles.text.caption, textAlign: 'center' }}>
                                {formatDate(dayData.date).dateNumString.slice(0, 2)}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    });
};


function dataReducer(state, action) {
    switch (action.type) {
        case 'ADD_DATA': {
            const { date, value } = action.payload;
            const standardTimestamp = Math.floor(date / (24 * 3600 * 1000)) * 24 * 3600 * 1000;

            // Adjust the epoch time to set Monday as the first day of the week
            const dayOfWeek = new Date(standardTimestamp).getDay();

            // Adjust for Sunday or other days
            const adjustment = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            const weekStartTimestamp = standardTimestamp - adjustment * 24 * 3600 * 1000;

            // Clone the current state
            const newState = { ...state };

            // Ensure the week object exists
            if (!newState[weekStartTimestamp]) {
                newState[weekStartTimestamp] = {};
                // Initialize all days of the week with a value of 0
                for (let i = 0; i < 7; i++) {
                    const dayTimestamp = weekStartTimestamp + i * 24 * 3600 * 1000;
                    newState[weekStartTimestamp][dayTimestamp] = { date: dayTimestamp, value: 0 };
                }
            }

            // Update the value for the specific day
            // initialize with date and value
            if (!newState[weekStartTimestamp][standardTimestamp]) newState[weekStartTimestamp][standardTimestamp] = { date: standardTimestamp, value: 0 };
            newState[weekStartTimestamp][standardTimestamp].value += value;

            return newState;
        }

        case 'clearTodayHistory': {
            const { date, value } = action.payload;
            const standardTimestamp = Math.floor(date / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
            // Calculate the epoch time of the Monday of the week
            const weekNumber = Math.floor((standardTimestamp - new Date(1970, 0, 1)) / (7 * 24 * 3600 * 1000)) * 7 * 24 * 3600 * 1000;

            // Clone the current state
            const newState = { ...state };

            // Ensure the week and day objects exist
            if (!newState[weekNumber]) newState[weekNumber] = {};

            // initialize with date and value
            if (!newState[weekNumber][standardTimestamp]) newState[weekNumber][standardTimestamp] = { date: standardTimestamp, value: 0 };

            // Update the value for the specific day
            newState[weekNumber][standardTimestamp].value = 0;

            return newState;

        }
        case 'clearAllHistory': {
            return {}
        }
        default:
            return state;
    }
}

export default Monitoring

