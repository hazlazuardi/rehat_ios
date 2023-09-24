import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { sizes } from '../../data/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Recovery from '../Recovery'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { useJournal } from '../../context/Context'

const emotionCategory = {
    unpleasant: 'Unpleasant',
    slightlyUnpleasant: 'Slightly Unpleasant',
    neutral: 'Neutral',
    pleasant: 'Pleasant',
    veryPleasant: 'Very Pleasant'
}


function Journaling({ navigation }) {

    const { journal } = useJournal();

    console.log('ctx journal', journal)

    return (
        <SafeAreaView>
            <Pressable onPress={() => navigation.navigate('Emotion Category')}>
                <Text>Create a Journal</Text>
            </Pressable>
        </SafeAreaView>
    )
}

Journaling.propTypes = {}


export const EmotionCategoryScreen = ({ navigation }) => {
    const EmotionCategoryButton = ({ title, color }) => {

        const { journal, dispatchJournal } = useJournal()

        const isSelected = journal.emotionCategory === title
        // const isSelected = true
        return (
            <>
                <Pressable onPress={() => dispatchJournal({type: 'setJournal', emotionCategory: title})} style={{ backgroundColor: isSelected ? 'green' : 'grey', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', padding: sizes.padding.sm, width: '40%', borderRadius: sizes.radius }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }} >{title}</Text>
                </Pressable>
            </>
        )
    }

    return (
        <SafeAreaView >
            {/* <BackButton /> */}
            <View style={{ alignItems: 'center', marginHorizontal: sizes.padding.md, gap: sizes.padding.md }}>
                <Text style={{ fontSize: sizes.text.header1 }} >Choose How You're Feeling Right Now</Text>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <EmotionCategoryButton title={emotionCategory.unpleasant} />
                        <EmotionCategoryButton title={emotionCategory.slightlyUnpleasant} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', margin: sizes.padding.md }}>
                        <EmotionCategoryButton title={emotionCategory.neutral} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <EmotionCategoryButton title={emotionCategory.pleasant} />
                        <EmotionCategoryButton title={emotionCategory.veryPleasant} />
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate('Emotions')} style={{ backgroundColor: 'green', width: '100%', justifyContent: 'center', alignItems: 'center', padding: sizes.button.padding.sm, borderRadius: sizes.button.radius }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }} >Done</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    )
}

export const EmotionsScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Emotions</Text>
        </SafeAreaView>
    )
}

export default Journaling
