import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import TextArea from '../../components/TextArea'
import PrimaryButton from '../../components/PrimaryButton'
import useManageGoals from '../../helpers/useManageGoals'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Chip from '../../components/Chip'

function CreateGoal({ navigation, route }) {

    const { addGoal, goals } = useManageGoals()

    const [goal, setGoal] = useState('')

    const handleEditGoal = (text) => {
        console.log(text)
        setGoal(text)
    }

    const handleSaveGoal = () => {
        addGoal(goal);
        navigation.navigate(nextPage)
    }

    const { nextPage } = route.params

    console.log(goals)

    const insets = useSafeAreaInsets()



    return (
        <BlurredEllipsesBackground>
            <KeyboardAwareScrollView
                extraScrollHeight={64}
                keyboardOpeningTime={10}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ paddingVertical: insets.top + sizes.padding.lg }} >

                    {/* Content */}
                    <View style={{ paddingVertical: sizes.padding.lg, paddingHorizontal: sizes.padding.md, flexDirection: 'column', gap: sizes.padding.lg }}>

                        {/* Heading */}
                        <Text style={styles.text.header3}>SMART Goal</Text>
                        <Text style={{ ...styles.text.body2, fontStyle: 'italic' }} >"Over the next [time period],
                            I will [specific action(s) related to managing panic attacks]
                            for [duration/frequency], track my progress in [method of tracking],
                            with the aim to [specific outcome related to reducing the intensity/frequency of panic attacks]."
                        </Text>

                        {/* Text Area */}
                        <View style={{ width: '100%', gap: sizes.gap.md }}>

                            {/* Your Goal */}
                            {/* <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >What's your goal?</Text>
                                <TextArea
                                    placeholder='Write a SMART goal'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                />
                            </View> */}

                            {/* Specific */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Time Period</Text>
                                <TextArea
                                    placeholder='6 months'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                />
                            </View>

                            {/* Measureable */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Specific Action(s)</Text>
                                <TextArea
                                    placeholder='Practice deep-breathing exercises'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                />
                            </View>

                            {/* Achievable */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Duration / Frequency</Text>
                                <TextArea
                                    placeholder='10 minutes daily'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                />
                            </View>

                            {/* Relevant */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Method of Tracking</Text>
                                {/* <TextArea
                                    placeholder='A journal'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                /> */}
                                <View style={{ flexDirection: 'row', gap: sizes.gap.sm }}>
                                    <Chip text='Journal' />
                                    <Chip text='Journal' />
                                </View>
                            </View>

                            {/* Time-bounded */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Specific Outcome Related to Your Goal</Text>
                                <TextArea
                                    placeholder='Reduce the frequency of my panic attacks from 4 times a month to once a month'
                                    multiline={false}
                                    onChangeText={handleEditGoal}
                                // value={goal}
                                />
                            </View>

                        </View>

                        {/* Button */}
                        <PrimaryButton disabled={goal === '' || false} color={colors.green} text='Done' onPress={handleSaveGoal} />

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </BlurredEllipsesBackground>
    )
}

CreateGoal.propTypes = {}

export default CreateGoal
