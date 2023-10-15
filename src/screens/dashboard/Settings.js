import React from 'react'
import PropTypes from 'prop-types'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { colors, sizes, styles } from '../../data/theme'
import { useGoalsConfig, useJournal, useJournalingConfig } from '../../context/Context'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import Divider from '../../components/Divider'
import useManageGoals from '../../helpers/useManageGoals'

function Settings({ navigation }) {

    const { dispatchJournalingConfig } = useJournalingConfig()
    const { clearAllGoals } = useManageGoals()
    const { dispatchJournal } = useJournal()
    const { dispatchGoalsConfig } = useGoalsConfig()



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
                            <Pressable onPress={() => dispatchJournalingConfig({ type: 'clearJournalingConfig' })} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear Journaling Configurations</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => dispatchGoalsConfig({ type: 'clearGoalsConfig' })} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear Goals Configurations</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => clearAllGoals()} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Goals</Text>
                            </Pressable>

                            <Divider color={colors.white} />
                            <Pressable onPress={() => dispatchJournal({ type: 'eraseAllJournals' })} >
                                <Text style={{ ...styles.text.semi1, color: colors.red }}>Clear All Journals</Text>
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
