import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, SafeAreaView, Text, View } from 'react-native'
import { colors, sizes, styles } from '../../data/theme'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import TextArea from '../../components/TextArea'
import PrimaryButton from '../../components/PrimaryButton'
import useManageGoals from '../../helpers/useManageGoals'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Chip from '../../components/Chip'
import { useGoalsConfig } from '../../context/Context'
import ChipInput from '../../components/ChipInput'

function CreateGoal({ navigation, route }) {
    const { nextPage } = route.params

    const { goalsConfig, dispatchGoalsConfig } = useGoalsConfig()

    const { addGoal, goals } = useManageGoals()

    const [goal, setGoal] = useState({
        period: "",
        action: "",
        duration: "",
        method: "",
        outcome: ""
    })

    const [isShouldReturn, setIsShouldReturn] = useState(false)

    const handleAddGoalsConfig = (value, type) => {

        console.log('value', value)
        if (value.length !== 0) {
            dispatchGoalsConfig({
                type: 'addGoalsConfig',
                payload: { value, type }
            });
            setIsShouldReturn(false)
        }
        Keyboard.dismiss()
        setIsShouldReturn(false)
    };

    console.log('isshud', isShouldReturn)


    const handleEditGoal = (field, value) => {
        console.log(value)
        setGoal(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const onPressChip = (field, value) => {
        setGoal(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    };



    /**
     * Checks if a chip is selected based on the value and type.
     * @param {string} value - The value to check for selection.
     * @param {string} type - The type to determine the key.
     * @returns {boolean} True if the chip is selected; otherwise, false.
     */
    const isChipSelected = (field, value) => {
        return goal[field] === value;
    };


    const handleSaveGoal = () => {
        addGoal(goal);
        navigation.navigate(nextPage)
    }


    console.log('curr goal', goal)

    const insets = useSafeAreaInsets()

    const isGoalComplete = () => {
        const requiredFields = ['period', 'duration', 'method', 'outcome', 'action'];
        for (const field of requiredFields) {
            if (!goal[field]) {
                console.log('false', goal[field])
                return false;
            }
        }
        return true;
    };


    return (
        <BlurredEllipsesBackground>
            <KeyboardAwareScrollView
                extraScrollHeight={64}
                keyboardOpeningTime={10}
                enableResetScrollToCoords={false}
                keyboardDismissMode={isShouldReturn ? 'none' : 'interactive'}
                keyboardShouldPersistTaps={isShouldReturn ? 'always' : 'never'}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ paddingVertical: insets.top + sizes.padding.lg }} >

                    {/* Content */}
                    <View style={{ paddingVertical: sizes.padding.lg, paddingHorizontal: sizes.padding.md, flexDirection: 'column', gap: sizes.padding.lg }}>

                        {/* Heading */}
                        <Text style={styles.text.header3}>SMART Goal</Text>
                        <Text style={{ ...styles.text.body2, fontStyle: 'italic' }} >
                            "Over the next {goal.period || '[time period] '},
                            I will {goal.action || '[specific action(s) related to managing panic attacks] '} for {goal.duration || '[duration/frequency]'},
                            track my progress in {goal.method || '[method of tracking]'},
                            with the aim to {goal.outcome || '[specific outcome related to reducing the intensity/frequency of panic attacks]'}."
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

                            {/* Time Period */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Time Period</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sizes.gap.sm }}>
                                    {goalsConfig.periods?.map(period => {
                                        return (
                                            <Chip
                                                key={period}
                                                text={period}
                                                onPress={() => onPressChip('period', period)}
                                                isSelected={isChipSelected('period', period)}
                                            />
                                        )
                                    })}
                                    <ChipInput
                                        type="periods"
                                        onEndEditing={handleAddGoalsConfig}
                                        onFocus={() => setIsShouldReturn(true)}
                                    />
                                </View>
                            </View>

                            {/* Specific Action */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Specific Action(s)</Text>
                                <TextArea
                                    placeholder='Practice deep-breathing exercises'
                                    multiline={false}
                                    onEndEditing={(action) => handleEditGoal('action', action)}
                                    onFocus={() => setIsShouldReturn(false)}
                                    maxLength={50}
                                />
                            </View>

                            {/* Durations */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Duration / Frequency</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sizes.gap.sm }}>
                                    {goalsConfig.durations?.map(duration => {
                                        return (
                                            <Chip
                                                key={duration}
                                                text={duration}
                                                onPress={() => onPressChip('duration', duration)}
                                                isSelected={isChipSelected('duration', duration)}
                                            />
                                        )
                                    })}
                                    <ChipInput
                                        type="durations"
                                        onEndEditing={handleAddGoalsConfig}
                                        onFocus={() => setIsShouldReturn(true)}
                                    />
                                </View>
                            </View>

                            {/* Method */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Method of Tracking</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sizes.gap.sm }}>
                                    {goalsConfig.methods?.map(method => {
                                        return (
                                            <Chip
                                                key={method}
                                                text={method}
                                                onPress={() => onPressChip('method', method)}
                                                isSelected={isChipSelected('method', method)}
                                            />
                                        )
                                    })}
                                    <ChipInput
                                        type="methods"
                                        onEndEditing={handleAddGoalsConfig}
                                        onFocus={() => setIsShouldReturn(true)}
                                    />
                                </View>
                            </View>

                            {/* Outcome */}
                            <View style={{ gap: sizes.gap.sm }}>
                                <Text style={styles.text.semi2} >Specific Outcome Related to Your Goal</Text>
                                <TextArea
                                    placeholder='Reduce the frequency of my panic attacks from 4 times a month to once a month'
                                    multiline={false}
                                    // onChangeText={handleEditGoal}
                                    onEndEditing={(outcome) => handleEditGoal('outcome', outcome)}
                                    onFocus={() => setIsShouldReturn(false)}
                                    maxLength={50}
                                />
                            </View>

                        </View>


                        {/* TODO: Create Cancel Button so that the user can cancel not create a goal */}

                        {/* Button */}
                        <PrimaryButton
                            disabled={!isGoalComplete()}
                            color={colors.green}
                            text='Done'
                            onPress={handleSaveGoal}
                        />
                        {/* Button */}
                        <PrimaryButton
                            // disabled={!isGoalComplete()}
                            color={colors.darkGrey}
                            text='Cancel'
                            onPress={() => navigation.navigate("Journaling")}
                        />

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </BlurredEllipsesBackground>
    )
}

CreateGoal.propTypes = {}

export default CreateGoal
