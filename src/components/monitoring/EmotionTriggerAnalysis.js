// EmotionTriggerAnalysis.js
import React from 'react';
import { View, Text } from 'react-native';
import { analyzeEmotionTriggers } from '../../helpers/helpers';
import { sizes } from '../../data/theme';
import { weekIntervalWidth } from '../../helpers/usePanicHistory';

function EmotionTriggerAnalysis({ weekData }) {

    console.log('weekData', weekData)

    // Function to calculate top 3 most common values in an array
    const getTopThree = (arr) => {
        const frequency = {};
        arr.forEach(value => { frequency[value] = (frequency[value] || 0) + 1; });
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(item => item[0]);
    };

    const weekAnalysis = analyzeEmotionTriggers(weekData);

    console.log('anal', weekAnalysis)

    return (
        <View style={{
            // flexDirection: 'row',
            gap: sizes.gap.sm,
        }}>
            {Object.entries(weekAnalysis).map(([emotionCategory, analysis]) => (
                <View key={emotionCategory} >
                    <Text>{emotionCategory} x{analysis.count}</Text>

                    <Text>Top Locations</Text>
                    {analysis.where?.map((location, index) => (
                        <Text key={`${location}-${index}`}>{location}</Text>
                    ))}


                    <Text>Top People</Text>
                    {analysis.withWho?.map((person, index) => (
                        <Text key={`${person}-${index}`}>{person}</Text>
                    ))}

                    <Text>Top Activity</Text>
                    {analysis.whatActivity?.map((activity, index) => (
                        <Text key={`${activity}-${index}`}>{activity}</Text>
                    ))}

                </View>

            ))}
            {/* {Object.entries(emotionCategoryCounts).map(([category, count], index) => (
                <Text key={index}>{category}: {count}</Text>
            ))}
            <Text>Top 3 Locations: {topWhere.join(', ')}</Text>
            <Text>Top 3 Companions: {topWithWho.join(', ')}</Text>
            <Text>Top 3 Activities: {topActivity.join(', ')}</Text> */}
        </View>
    );
}

export default EmotionTriggerAnalysis;
