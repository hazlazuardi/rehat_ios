import React from 'react';
import { View, Text } from 'react-native';
import { analyzeEmotionTriggers, toAssetCase } from '../../helpers/helpers';
import { colors, sizes, styles } from '../../data/theme';
import { weekIntervalWidth } from '../../helpers/usePanicHistory';
import Chip from '../Chip';

function EmotionTriggerAnalysis({ weekData }) {

    const weekAnalysis = analyzeEmotionTriggers(weekData);

    return (
        <View style={{
            // flexDirection: 'row',
            gap: sizes.gap.lg,
        }}>
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