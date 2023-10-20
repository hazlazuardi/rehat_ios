import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Text, View } from 'react-native';
import { colors, sizes, styles } from '../../data/theme';
import { formatDate } from '../../helpers/helpers';
import { getMondayTimestamp } from '../../helpers/usePanicHistory';
import { getSunday } from './EmotionTriggerAnalysis';
import Chip from '../Chip';
import SecondaryButton from '../SecondaryButton';
import Divider from '../Divider';



const weekIntervalWidth = Dimensions.get('screen').width - 32;

function BarChart({ groupedData, handleScroll }) {

    // console.log('groupedData', groupedData)

    return groupedData.map((weekData, weekIndex) => {

        console.log('weekDataPH', weekData)

        console.log('mondayTimestamp', Object.keys(weekData)[0])




        const mondayThisWeek = getMondayTimestamp(Number(Object.keys(weekData)[0]))
        const sundayThisWeek = getSunday(mondayThisWeek)

        console.log(mondayThisWeek)

        console.log('mondayPH', formatDate(mondayThisWeek).dayString)
        console.log('sundayPH', formatDate(sundayThisWeek).dayString)

        return (
            <View key={weekIndex}>
                <Divider color={colors.whiteSoTransparent} />

                <View style={{
                    // alignSelf: 'flex-start',
                    flexDirection: 'row',
                    gap: sizes.gap.sm,
                    justifyContent: 'space-between',
                    flex: 1,
                    paddingTop: sizes.padding.sm,
                    zIndex: 10000

                    // backgroundColor: 'red'
                }}>
                    <Chip
                        text={`${formatDate(mondayThisWeek).compactDateString} - ${formatDate(sundayThisWeek).compactDateString}`}
                        variant='outlined'
                        color={colors.whiteTransparent}
                        isBlurred
                    />
                </View>
                <View
                    style={{
                        width: weekIntervalWidth,
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        height: 300
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
                                    height: dayData.value * 60,
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
                                    {formatDate(dayData.date).dayString.slice(0, 3)}
                                </Text>
                                <Text style={{ ...styles.text.caption, textAlign: 'center' }}>
                                    {formatDate(dayData.date).compactDateString.slice(0, 5)}
                                </Text>
                                <Text style={{ ...styles.text.caption, textAlign: 'center' }}>
                                    {formatDate(dayData.date).compactDateString.slice(6, 10)}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>
        );
    });
}

BarChart.propTypes = {}

export default BarChart