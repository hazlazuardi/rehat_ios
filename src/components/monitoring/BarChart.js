import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Text, View } from 'react-native';
import { colors, sizes, styles } from '../../data/theme';
import { formatDate } from '../../helpers/helpers';



const weekIntervalWidth = Dimensions.get('screen').width - 32;

function BarChart({ groupedData }) {
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
}

BarChart.propTypes = {}

export default BarChart