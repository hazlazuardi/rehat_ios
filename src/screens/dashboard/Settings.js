import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, View } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { sizes } from '../../data/theme'

function Settings({ navigation }) {
    return (
        <SafeAreaView>
            <View style={{ gap: sizes.padding.sm, padding: sizes.padding.md }}>
                <PrimaryButton text='Manage Emergency Contacts' color='green' onPress={() => navigation.navigate('Manage Emergency Contact')} />
                <PrimaryButton text='Manage Recovery Preferences' color='green' onPress={() => navigation.navigate('Manage Recovery Preferences')} />
            </View>
        </SafeAreaView>

    )
}

Settings.propTypes = {}

export default Settings
