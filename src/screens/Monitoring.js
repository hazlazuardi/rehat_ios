import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../data/theme';
import { initData } from '../data/dummyPanicAttackHistory'
import { formatDate, groupDaysByWeek, sumValuesByDay } from '../helpers/helpers'

const weekIntervalWidth = Dimensions.get('screen').width - 32;


function Monitoring(props) {


    // Convert data to Array of Week objects
    // Array of week objects contains Array of day objects
    // Array of day objects contains the sum of the number of panic attacks of that day
    // Usage:

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
                        <Text style={{ ...styles.text.header2, color: colors.orange }}>Monitoring</Text>


                        <ScrollView
                            horizontal
                            snapToAlignment='center'
                            snapToInterval={weekIntervalWidth}
                            decelerationRate={'fast'}
                            showsHorizontalScrollIndicator={false}
                        >
                            <BarGraph data={initData} />
                        </ScrollView>

                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    )
}

Monitoring.propTypes = {}


function BarGraph({ data }) {
    const summedData = useMemo(() => sumValuesByDay(data), []);
    const groupedData = useMemo(() => groupDaysByWeek(summedData), []);

    console.log('converted data: ', summedData)
    console.log('converted data: ', groupedData)


    return groupedData.map((weekData, weekNumber) => {
        console.log('Week data: ', weekData);  // Log the data for each week
        return (
            <View key={weekNumber}
                style={{
                    width: weekIntervalWidth,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height: 150
                }}>
                {weekData.map((day, dayIndex) => (
                    <View key={dayIndex}>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: sizes.padding.sm,
                                color: colors.orange
                            }}
                        >
                            {day.value}
                        </Text>
                        <View
                            style={{
                                height: day.value * 10,
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
                                {formatDate(day.date).dateString.slice(0, 3)}
                            </Text>
                            <Text style={{ ...styles.text.caption, textAlign: 'center' }}>
                                {formatDate(day.date).dateNumString.slice(0, 2)}
                            </Text>
                        </View>

                    </View>
                ))}
            </View>
        );
    });
};

export default Monitoring
