import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'

function Settings({navigation}) {
    return (
        <SafeAreaView>
            <PrimaryButton text='Manage Emergency Contacts' color='green' onPress={() => navigation.navigate('Manage Emergency Contact')} />
        </SafeAreaView>

    )
}

Settings.propTypes = {}

export default Settings
