import React, { Suspense, useCallback, useEffect, useReducer, useRef } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { generateDummyDataForPreviousWeeks, initializeCurrentWeek } from '../../data/dummyPanicAttackHistory';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, sizes, styles } from '../../data/theme';
import { formatDate, getMonday, getStandardTimestamp, getWeekStart, groupDataByWeek, initializeWeek } from '../../helpers/helpers'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground';
import BarChart from '../../components/monitoring/BarChart';
import { useMonitoring } from '../../context/MonitoringProvider';
import usePanicHistory, { currentEpochTime, weekIntervalWidth } from '../../helpers/usePanicHistory';
import { useJournal } from '../../context/Context';
import useManageJournaling from '../../helpers/useManageJournaling';
import EmotionTriggerAnalysis from '../../components/monitoring/EmotionTriggerAnalysis';
import PanicHistory from './PanicHistory';
import useEmotionHistory from '../../helpers/useEmotionHistory';
import SecondaryButton from '../../components/SecondaryButton';
import Divider from '../../components/Divider';

// const PanicHistory = React.lazy(() => import('./PanicHistory'));

export const screenHeight = Dimensions.get('screen').height
function Monitoring(props) {

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

    console.log('weeksData', weeksData)

    const sortedWeeksData = weeksData.sort((a, b) => a[0].dateAdded - b[0].dateAdded);
    const { scrollViewRef: scrollRefEmotions, scrollToCurrentWeek } = useEmotionHistory(sortedWeeksData);


    return (
        <BlurredEllipsesBackground >
            <ScrollView
                style={{ flex: 1 }}
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}
                snapToAlignment='center'
            // snapToInterval={ }
            >
                <SafeAreaView >

                    <View style={{
                        padding: sizes.padding.md,
                        gap: sizes.gap.lg,
                        paddingBottom: sizes.padding.lg * 2,
                    }}>
                        <Text style={{ ...styles.text.header2, color: colors.orange }}>Monitoring</Text>


                        {/* Panic Attack History */}
                        <View style={{
                            gap: sizes.gap.md,
                            paddingBottom: sizes.padding.lg
                            // backgroundColor: 'red'
                        }} >
                            <Suspense fallback={(
                                <Text style={styles.text.semi2}>Loading...</Text>
                            )} >
                                <PanicHistory />
                            </Suspense>
                        </View>



                        {/* Journaling Analysis */}
                        <View style={{
                            gap: sizes.gap.md
                        }} >
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        ...styles.text.header3,
                                        flex: 3 / 4
                                    }}>
                                        Emotions and Their Triggers
                                    </Text>
                                    <SecondaryButton
                                        text={'Go to Today'}
                                        onPress={scrollToCurrentWeek}
                                        color={colors.whiteSoTransparent}
                                        font={'caption'}
                                        size={'sm'}
                                    />
                                </View>
                            </View>

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
                                        }}>
                                        <EmotionTriggerAnalysis weekData={weekData} handleScroll={scrollToCurrentWeek} />
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

