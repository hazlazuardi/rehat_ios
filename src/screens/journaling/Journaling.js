import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { sizes } from '../../data/theme'
import { useJournal } from '../../context/Context'



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







export default Journaling
