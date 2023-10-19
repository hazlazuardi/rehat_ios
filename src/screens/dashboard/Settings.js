import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { colors, sizes, styles } from '../../data/theme'
import { useGoalsConfig, useJournal, useJournalingConfig } from '../../context/Context'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import Divider from '../../components/Divider'
import useManageGoals from '../../helpers/useManageGoals'
import { trigger } from 'react-native-haptic-feedback'
import useManageJournaling from '../../helpers/useManageJournaling'
import { storage } from '../../../App'

function Settings({ navigation }) {
    const {
        eraseAllJournals,
        clearAllJournalingConfigs
    } = useManageJournaling()

    const {
        clearAllGoals,
        clearAllGoalConfigs
    } = useManageGoals()


    const handleAlert = (nextAction) => {
        Alert.alert('Are you sure?', "You won't be able to redo this action.", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dangerousAction(nextAction) },
        ]);
    }

    const dangerousAction = action => {
        switch (action) {
            case 'eraseAllGoals': {
                clearAllGoals()
                return
            }
            case 'clearGoalsConfig': {
                clearAllGoalConfigs()
                return
            }
            case 'clearJournalingConfig': {
                clearAllJournalingConfigs()
                return
            }
            case 'eraseAllJournals': {
                eraseAllJournals()
                return
            }
            case 'clearAllData': {
                storage.clearAll()
                trigger('impactHeavy')
                return
            }
            default: {
                throw Error(`Unknown action: ${action}`);
            }
        }
    }


    return (
        <BlurredEllipsesBackground>
            <ScrollView style={{ flex: 1 }} contentInsetAdjustmentBehavior='automatic'>
                <SafeAreaView>
                    <View style={{
                        flex: 1,
                        gap: sizes.gap.lg,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        paddingHorizontal: sizes.padding.md,
                        paddingBottom: sizes.padding.lg * 2,
                        paddingTop: sizes.padding.lg
                    }}
                    >

                        <Text style={styles.text.header2}>Settings</Text>

                        <View style={{
                            width: '100%',
                            gap: sizes.gap.sm,
                            backgroundColor: colors.darkGrey,
                            padding: sizes.padding.md,
                            borderRadius: sizes.radius.sm
                        }}>
                            <Pressable onPress={() => navigation.navigate('Manage Recovery Preferences')}>
                                <Text style={styles.text.semi1}>Recovery Preferences</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => navigation.navigate('Manage Emergency Contact')}>
                                <Text style={styles.text.semi1}>Emergency Contacts</Text>
                            </Pressable>

                            {/* <Divider color={colors.white} />
                            <Pressable onPress={() => navigation.navigate('Manage  Contact')}>
                                <Text style={styles.text.semi1}>Guided Breathing</Text>
                            </Pressable> */}
                        </View>


                        {/* Danger Zone */}
                        <View style={{
                            width: '100%',
                            gap: sizes.gap.sm,
                            backgroundColor: colors.darkGrey,
                            padding: sizes.padding.md,
                            borderRadius: sizes.radius.sm
                        }}>
                            <Pressable onPress={() => handleAlert('clearJournalingConfig')} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear Journaling Configurations</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => handleAlert('clearGoalsConfig')} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear Goals Configurations</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => handleAlert('eraseAllGoals')} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Goals</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => handleAlert('eraseAllJournals')} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Journals</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => handleAlert('clearAllData')} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Data</Text>
                            </Pressable>

                            {/* <Divider color={colors.white} />
                            <Pressable onPress={() => navigation.navigate('Manage Emergency Contact')}>
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Goals</Text>
                            </Pressable> */}

                            {/* <Divider color={colors.white} />
                            <Pressable onPress={() => navigation.navigate('Manage  Contact')}>
                                <Text style={styles.text.semi1}>Guided Breathing</Text>
                            </Pressable> */}
                        </View>


                        {/* <PrimaryButton text='Manage Emergency Contacts' color='green' onPress={() => navigation.navigate('Manage Emergency Contact')} />
                        <PrimaryButton text='Manage Recovery Preferences' color='green' onPress={() => navigation.navigate('Manage Recovery Preferences')} />
                        <PrimaryButton text='Clear Journaling Configurations' color='red' onPress={() => dispatchJournalingConfig({ type: 'clearJournalingConfig' })} /> */}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </BlurredEllipsesBackground >

    )
}

Settings.propTypes = {}

export default Settings
