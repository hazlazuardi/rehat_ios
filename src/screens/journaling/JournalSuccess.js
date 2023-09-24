import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pressable, SafeAreaView, Text } from 'react-native'
import { sizes } from '../../data/theme'
import { useJournal } from '../../context/Context'

function JournalSuccess({ navigation }) {

    const { dispatchJournal } = useJournal();

    function handlePress() {
        dispatchJournal({ type: 'saveJournal' })
        navigation.navigate('Journaling')
    }

    return (
        <SafeAreaView>
            <Text>Your daily journal has been saved</Text>
            <Pressable onPress={handlePress} style={{ backgroundColor: 'green', width: '100%', justifyContent: 'center', alignItems: 'center', padding: sizes.button.padding.sm, borderRadius: sizes.button.radius }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Done</Text>
            </Pressable>
        </SafeAreaView>
    )
}

JournalSuccess.propTypes = {}

export default JournalSuccess
