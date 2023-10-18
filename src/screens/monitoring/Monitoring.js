import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { generateDummyDataForPreviousWeeks, getMonday, initializeCurrentWeek } from '../../data/dummyPanicAttackHistory';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, sizes, styles } from '../../data/theme';
import { formatDate, getStandardTimestamp, getWeekStart, groupDataByWeek, initializeWeek } from '../../helpers/helpers'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import BarChart from '../../components/monitoring/BarChart';
import { useMonitoring } from '../../context/MonitoringProvider';
import usePanicHistory, { weekIntervalWidth } from '../../helpers/usePanicHistory';
import { useJournal } from '../../context/Context';
import useManageJournaling from '../../helpers/useManageJournaling';
import EmotionTriggerAnalysis from '../../components/monitoring/EmotionTriggerAnalysis';


function Monitoring(props) {

    const {
        data,
        handleNewData,
        handleClearData,
        handleClearAllData,
        scrollViewRef: scrollRefPanicAttackHistory,
        scrollToWeek,
        handleMonthButtonClick
    } = usePanicHistory()


    const {
        journals
    } = useManageJournaling()

    // Group data by week
    const groupedData = journals.reduce((acc, entry) => {
        const weekStart = getWeekStart(entry.dateAdded);
        if (!acc[weekStart]) {
            acc[weekStart] = [];
        }
        acc[weekStart].push(entry);
        return acc;
    }, {});
    const weeksData = Object.values(groupedData);

    const scrollRefEmotions = useRef(null);
    return (
        <BlurredEllipsesBackground >
            <ScrollView
                style={{ flex: 1 }}
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView>

                    <View style={{
                        padding: sizes.padding.md,
                        gap: sizes.gap.lg,
                        paddingBottom: sizes.padding.lg * 2
                    }}>
                        <Text style={{ ...styles.text.header2, color: colors.orange }}>Monitoring</Text>


                        {/* Panic Attack History */}
                        <View style={{
                            gap: sizes.gap.md,
                            paddingBottom: sizes.padding.md
                            // backgroundColor: 'red'
                        }} >
                            <Text style={styles.text.header3}>Panic Attack History</Text>

                            <ScrollView
                                ref={scrollRefPanicAttackHistory}
                                horizontal
                                snapToAlignment='center'
                                snapToInterval={weekIntervalWidth}
                                decelerationRate={'fast'}
                                showsHorizontalScrollIndicator={false}
                            >
                                <BarChart groupedData={Object.values(data)} />
                            </ScrollView>

                            {/* Debugging Purpose */}
                            {/* <PrimaryButton
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
                            /> */}
                            <PrimaryButton
                                color={colors.darkGrey}
                                text='Scroll to Today'
                                onPress={() => scrollToWeek(getMonday(currentEpochTime()).getTime())}
                            />
                            <PrimaryButton
                                color={colors.darkGrey}
                                text='Scroll to November 2023'
                                onPress={() => handleMonthButtonClick(2023, 10)}
                            />

                        </View>


                        {/* Journaling Analysis */}
                        <View style={{
                            gap: sizes.gap.md
                        }} >
                            <Text style={styles.text.header3}>Emotions and Their Triggers</Text>


                            <ScrollView
                                ref={scrollRefEmotions}
                                horizontal
                                snapToAlignment='center'
                                snapToInterval={weekIntervalWidth}
                                decelerationRate={'fast'}
                                showsHorizontalScrollIndicator={false}
                            >
                                {weeksData.map((weekData, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: weekIntervalWidth,
                                            // backgroundColor: 'red',
                                            // borderColor: 'blue',
                                            // borderWidth: 1
                                        }}>
                                        <EmotionTriggerAnalysis weekData={weekData} />
                                    </View>
                                ))}
                            </ScrollView>

                        </View>

                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground>
    );
}
Monitoring.propTypes = {}




export default Monitoring

