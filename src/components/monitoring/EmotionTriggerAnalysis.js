import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { analyzeEmotionTriggers, formatDate, getMonday, toAssetCase } from '../../helpers/helpers';
import { colors, sizes, styles } from '../../data/theme';
import { getMondayTimestamp, weekIntervalWidth } from '../../helpers/usePanicHistory';
import Chip from '../Chip';
import SecondaryButton from '../SecondaryButton';
import Divider from '../Divider';


export function getSunday(mondayTimestamp) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const sundayTimestamp = mondayTimestamp + (6 * millisecondsPerDay);
    return sundayTimestamp;
}

function EmotionTriggerAnalysis({ weekData, handleScroll }) {

    const weekAnalysis = analyzeEmotionTriggers(weekData);

    console.log('emotrig', weekData[0]['dateAdded'])
    console.log('weekDataET', weekData[0])
    const weekKey = weekData[0]['dateAdded']
    console.log(formatDate(weekKey).dayString)
    // console.log('monday', getMondayTimestamp(weekKey))
    // console.log('friday', getMondayTimestamp(weekKey) + 86_400_000_000)

    const mondayThisWeek = getMondayTimestamp(weekKey)
    const sundayThisWeek = getSunday(mondayThisWeek)
    console.log(formatDate(mondayThisWeek).dayString)
    console.log(formatDate(sundayThisWeek).dayString)

    return (
        <View style={{
            // flexDirection: 'row',
            gap: sizes.gap.lg,
        }}>

            <View style={{
                // flexDirection: 'row',
                gap: sizes.gap.sm,
                justifyContent: 'space-between',
                flex: 1,
                // backgroundColor: 'red'
            }}>
                <Divider color={colors.whiteSoTransparent} />
                <View style={{
                    alignSelf: 'flex-start',
                }}>
                    <Chip
                        text={`${formatDate(mondayThisWeek).compactDateString} - ${formatDate(sundayThisWeek).compactDateString}`}
                        variant='outlined'
                        color={colors.whiteTransparent}
                        isBlurred
                    />
                </View>
            </View>
            {emotionOrder.map(emotionCategory => {
                const analysis = weekAnalysis[emotionCategory];
                if (analysis) {
                    return (
                        <View key={emotionCategory}
                            style={{
                                gap: sizes.gap.sm
                            }} >
                            {/* Emotion Title */}
                            <Text
                                style={{
                                    ...styles.text.semi2,
                                    color: colors.emotion[toAssetCase(emotionCategory)]
                                }}
                            >{emotionCategory} ({analysis.count})</Text>

                            {/* Bar */}
                            <View style={{
                                width: (analysis.count / 14) * weekIntervalWidth,
                                height: 64,
                                backgroundColor: colors.emotion[toAssetCase(emotionCategory)],
                                borderTopRightRadius: sizes.radius.lg,
                                borderBottomEndRadius: sizes.radius.lg
                            }} />

                            {/* Triggers */}
                            <View style={{
                                gap: sizes.gap.xs,
                                flexDirection: 'row'
                            }}>
                                {analysis.where?.map((location, index) => (
                                    <View key={`${location}-${index}`}
                                        style={{
                                            alignSelf: 'flex-start'
                                        }}>
                                        <Chip text={location} />
                                    </View>
                                ))}


                                {analysis.withWho?.map((person, index) => (
                                    <View key={`${person}-${index}`}
                                        style={{
                                            alignSelf: 'flex-start'
                                        }}>
                                        <Chip text={person} />
                                    </View>
                                ))}

                                {analysis.whatActivity?.map((activity, index) => (
                                    <View key={`${activity}-${index}`}
                                        style={{
                                            alignSelf: 'flex-start'
                                        }}>
                                        <Chip text={activity} />
                                    </View>
                                ))}
                            </View>

                        </View>
                    )
                }
                return null
            })}
        </View>
    );
}

export default EmotionTriggerAnalysis;

const emotionOrder = [ // Define the order of emotion categories
    'Very Pleasant',
    'Pleasant',
    'Neutral',
    'Slightly Unpleasant',
    'Unpleasant'
];