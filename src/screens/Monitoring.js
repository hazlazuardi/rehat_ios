import React, { useEffect, useReducer, useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { generateDummyDataForPreviousWeeks, getMonday, initializeCurrentWeek } from '../data/dummyPanicAttackHistory';
import PrimaryButton from '../components/PrimaryButton';
import { colors, sizes, styles } from '../data/theme';
import { formatDate } from '../helpers/helpers'
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';

const weekIntervalWidth = Dimensions.get('screen').width - 32;

const currentWeekData = generateDummyDataForPreviousWeeks(4);

const initialState = initializeCurrentWeek(currentWeekData);

// Modify this so instead of Date.now(), it's the date from Avatar's app
const currentEpochTime = () => Math.floor(Date.now() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Round down to the nearest day

function Monitoring(props) {
    const scrollViewRef = useRef(null);
    const [data, dispatch] = useReducer(dataReducer, initializeCurrentWeek(initialState));

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
        const today = new Date();
        const standardTimestamp = Math.floor(today.getTime() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
        const weekStartTimestamp = getMonday(standardTimestamp).getTime();

        // Check if the current week exists in the data and if it has 7 days
        if (data[weekStartTimestamp] && Object.keys(data[weekStartTimestamp]).length !== 7) {
            dispatch({ type: 'INITIALIZE_CURRENT_WEEK' });
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



// TODO: add a case to store each entry from Avatar
function dataReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_CURRENT_WEEK': {
            const today = new Date();
            const standardTimestamp = Math.floor(today.getTime() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
            const weekStartTimestamp = getMonday(standardTimestamp).getTime();
            const newState = { ...state };

            // Initialize all days of the current week with a value of 0
            for (let i = 0; i < 7; i++) {
                const dayTimestamp = weekStartTimestamp + i * 24 * 3600 * 1000;
                if (!newState[weekStartTimestamp][dayTimestamp]) {
                    newState[weekStartTimestamp][dayTimestamp] = { date: dayTimestamp, value: 0 };
                }
            }

            return newState;
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

export default Monitoring

