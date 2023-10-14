import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, View } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { sizes } from '../../data/theme'
import { useJournalingConfig } from '../../context/Context'

function Settings({ navigation }) {

    const { dispatchJournalingConfig } = useJournalingConfig()




    return (
        <SafeAreaView>
            <View style={{ gap: sizes.padding.sm, padding: sizes.padding.md }}>
                <PrimaryButton text='Manage Emergency Contacts' color='green' onPress={() => navigation.navigate('Manage Emergency Contact')} />
                <PrimaryButton text='Manage Recovery Preferences' color='green' onPress={() => navigation.navigate('Manage Recovery Preferences')} />
                <PrimaryButton text='Clear Journaling Configurations' color='red' onPress={() =>
                    dispatchJournalingConfig({ type: 'clearJournalingConfig' })} />
            </View>
        </SafeAreaView>

    )
}

Settings.propTypes = {}

export default Settings
