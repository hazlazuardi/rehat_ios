import React, { useMemo, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LineGraph } from 'react-native-graph';
import { sizes } from '../data/theme';
import { groupAndSumDataByWeekAndDay } from '../helpers/helpers';
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';


const weekIntervalWidth = Dimensions.get('screen').width - 32;

function Monitoring() {
    const groupedData = useMemo(() => groupAndSumDataByWeekAndDay(initData), []);
    const [currentWeek, setCurrentWeek] = useState(0);  // State to keep track of the current week

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const weekNumber = Math.floor(scrollPosition / weekIntervalWidth);
        setCurrentWeek(weekNumber);
    };

    const renderLineGraphs = () => {
        return Object.keys(groupedData).map(weekNumber => {
            const weekData = groupedData[weekNumber];
            const points = Object.keys(weekData).map(dayNumber => ({
                date: new Date(1970, 0, 1 + weekNumber * 7 + parseInt(dayNumber)),
                value: weekData[dayNumber].value,
            }));

            console.log('points', points)

            return (
                <View key={weekNumber} style={{ width: weekIntervalWidth, marginHorizontal: sizes.padding.md, marginBottom: sizes.gap.md }}>
                    <LineGraph
                        points={points}
                        // range={{ y: { min: 0, max: Math.max(...points.map(point => point.y)) + 5 } }}
                        color="#6a7ee7"
                        style={{
                            height: 200,
                            backgroundColor: 'blue',
                        }}
                        animated={true}
                    />
                </View>
            );
        });
    };

    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{
                flex: 1,
                // backgroundColor: colors.darkTurquoise
            }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <SafeAreaView>
                    <View style={{
                        padding: sizes.padding.md,
                        gap: sizes.gap.lg,
                        paddingBottom: sizes.padding.lg * 2
                    }}>
                        <Text>This is Monitoring Screen</Text>

                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={weekIntervalWidth}
                            decelerationRate="fast"
                            onScroll={handleScroll}>
                            {renderLineGraphs()}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    );
}

export default Monitoring;
