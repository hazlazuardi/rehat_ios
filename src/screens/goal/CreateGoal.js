import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, View } from 'react-native'
import { colors, sizes } from '../../data/theme'
import BlurredEllipsesBackground from '../../components/BlurredEllipsesBackground'
import TextArea from '../../components/TextArea'
import PrimaryButton from '../../components/PrimaryButton'
import useManageGoals from '../../helpers/useManageGoals'

function CreateGoal({ navigation, route }) {

    const { addGoal, goals } = useManageGoals()

    const [goal, setGoal] = useState('')

    const handleEditGoal = (text) => {
        console.log(text)
        setGoal(text)
    }

    const handleSaveGoal = () => {
        addGoal(goal);
        navigation.reset({
            index: 0,
            routes: [{name: 'Root', params: {screen: 'Recovery'}}],
          });
    }

    const { nextPage } = route.params

    console.log(goals)

    return (
        <BlurredEllipsesBackground>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, gap: sizes.gap.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: sizes.padding.md }}>
                    <Text>This is create goals</Text>

                    {/* Text Area */}
                    <View style={{ width: '100%' }}>
                        <TextArea
                            placeholder='Write a SMART goal'
                            multiline={false}
                            onChangeText={handleEditGoal}
                            // value={goal}
                        />
                    </View>

                    <PrimaryButton disabled={goal === '' || false} color={colors.green} text='Done' onPress={handleSaveGoal} />

                </View>
            </SafeAreaView>
        </BlurredEllipsesBackground>
    )
}

CreateGoal.propTypes = {}

export default CreateGoal
