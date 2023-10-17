import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { generateDummyDataForPreviousWeeks, getMonday, initializeCurrentWeek } from '../data/dummyPanicAttackHistory';
import PrimaryButton from '../components/PrimaryButton';
import { colors, sizes, styles } from '../data/theme';
import { formatDate, getStandardTimestamp, initializeWeek } from '../helpers/helpers'
import BlurredEllipsesBackground from '../components/BlurredEllipsesBackground';
import BarChart from '../components/monitoring/BarChart';
import { useMonitoring } from '../context/MonitoringProvider';
import usePanicHistory, { weekIntervalWidth } from '../helpers/usePanicHistory';


function Monitoring(props) {

    const {
        data,
        handleNewData,
        handleClearData,
        handleClearAllData,
        scrollViewRef,
    } = usePanicHistory()



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
                            <BarChart groupedData={Object.values(data)} />
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




export default Monitoring

